import { createClient } from '@supabase/supabase-js'

// ============================================================================
// CLIENTE SUPABASE (singleton)
// ============================================================================

let supabaseClient = null

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

  if (supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

export const isSupabaseConfigured = () => getSupabaseClient() !== null
export const supabase = null // compat: usar getSupabaseClient() internamente

// ============================================================================
// ROUTING POR RAMO
// ============================================================================

/**
 * Cada ramo tiene su propia tabla con sus propias columnas relevantes.
 * El esquema vive en supabase/migrations/002_split_into_three_tables.sql.
 */
const TABLA_POR_RAMO = {
  automovil:     'conversaciones_automovil',
  personas:      'conversaciones_personas',
  patrimoniales: 'conversaciones_patrimoniales',
}

/**
 * Columnas que existen en LAS 3 tablas (datos del lead que no dependen del ramo).
 * Se incluyen en cualquier insert sin importar el ramo.
 */
const COLUMNAS_COMUNES = [
  'producto', 'etapa', 'aseguradora',
  // Cliente
  'nombre', 'cedula', 'fecha_nacimiento', 'edad', 'sexo', 'estado_civil',
  'ocupacion', 'telefono', 'email_cliente',
  // Dirección
  'estado', 'ciudad', 'municipio', 'parroquia', 'urbanizacion', 'via',
  'edificio', 'piso_apto', 'punto_referencia',
  // Cobertura y pago
  'plan_cobertura', 'suma_asegurada', 'frecuencia_pago', 'forma_pago', 'precio',
  // Historial
  'historial_chat',
]

/**
 * Columnas específicas de CADA tabla. Si el `datos` que llega trae
 * campos de otro ramo (porque `extraerDatosDelChat` los rellena todos
 * en el mismo objeto), se filtran para no romper el insert.
 */
const COLUMNAS_ESPECIFICAS = {
  automovil: [
    'tipo_vehiculo', 'uso_vehiculo', 'marca', 'modelo', 'ano', 'version',
    'transmision', 'color', 'placa', 'serial_motor', 'serial_carroceria',
    'plan_rcv',
  ],
  personas: [
    'beneficiario_1', 'parentesco_1', 'porcentaje_1',
    'beneficiario_2', 'parentesco_2', 'porcentaje_2',
  ],
  patrimoniales: [
    'tipo_inmueble', 'uso_inmueble', 'valor_inmueble', 'valor_contenido',
    'antiguedad_construccion', 'metros_cuadrados', 'habitado', 'coberturas_hogar',
  ],
}

/**
 * Construye el payload a insertar tomando SOLO las columnas que existen
 * en la tabla del ramo (común + específicas). Cualquier otro campo del
 * objeto `datos` se ignora silenciosamente.
 */
function construirPayload(datos, ramo) {
  const columnas = [...COLUMNAS_COMUNES, ...(COLUMNAS_ESPECIFICAS[ramo] || [])]
  const payload = {}
  for (const col of columnas) {
    // `datos.año_vehiculo` viene con 'ñ' desde el frontend pero la columna SQL es `ano`
    if (col === 'ano' && (datos.ano || datos.año_vehiculo)) {
      payload.ano = datos.ano || datos.año_vehiculo
      continue
    }
    payload[col] = datos[col] ?? null
  }
  payload.created_at = new Date().toISOString()
  return payload
}

// ============================================================================
// API PÚBLICA
// ============================================================================

/**
 * Guarda una conversación del chatbot en Supabase, en la tabla correspondiente
 * a su ramo. Si el ramo es inválido o desconocido, devuelve error sin insertar.
 *
 * @param {Object} datos - debe incluir `datos.ramo` ('automovil'|'personas'|'patrimoniales')
 * @returns {{ success: boolean, data?: Object, error?: any }}
 */
export const guardarConversacion = async (datos) => {
  const client = getSupabaseClient()
  if (!client) {
    return { success: false, error: 'Supabase no configurado' }
  }

  const ramo = datos.ramo
  const tabla = TABLA_POR_RAMO[ramo]
  if (!tabla) {
    console.warn('[supabase] Ramo no reconocido, no se guarda:', ramo)
    return { success: false, error: `Ramo inválido: ${ramo}` }
  }

  try {
    const payload = construirPayload(datos, ramo)
    // NOTA: no usamos .select() porque RLS no permite SELECT a `anon`.
    // Si se agrega .select(), el INSERT entero falla con 401 al intentar
    // devolver la fila recién creada.
    const { error } = await client.from(tabla).insert([payload])

    if (error) {
      console.error(`[supabase] Error al insertar en ${tabla}:`, JSON.stringify(error))
      return { success: false, error }
    }
    return { success: true, tabla }
  } catch (err) {
    return { success: false, error: err }
  }
}

/**
 * Guarda una COTIZACIÓN en la tabla `cotizaciones` (embudo de seguimiento).
 *
 * Se usa cuando el lead llega a cotizar (selecciona aseguradora) o llena
 * todos sus datos, pero AÚN NO ha confirmado la emisión. Si después
 * confirma emisión, el sistema llamará a `guardarConversacion()` que la
 * inserta en la tabla por ramo (no se borra de `cotizaciones`, queda como
 * histórico; la vista SQL `cotizaciones_pendientes` filtra correctamente).
 *
 * @param {Object} datos
 * @returns {{ success: boolean, data?: Object, error?: any }}
 */
export const guardarCotizacion = async (datos) => {
  const client = getSupabaseClient()
  if (!client) {
    return { success: false, error: 'Supabase no configurado' }
  }

  try {
    const payload = {
      ramo:           datos.ramo || null,
      producto:       datos.producto || null,
      etapa:          datos.etapa || null,
      aseguradora:    datos.aseguradora || null,
      precio:         datos.precio || datos.precio_mensual || datos.precio_anual || null,
      nombre:         datos.nombre || null,
      cedula:         datos.cedula || null,
      telefono:       datos.telefono || null,
      email_cliente:  datos.email_cliente || null,
      historial_chat: datos.historial_chat || null,
      created_at:     new Date().toISOString(),
    }

    // NOTA: no usamos .select() porque RLS no permite SELECT a `anon`.
    // Si se agrega .select(), el INSERT entero falla con 401 al intentar
    // devolver la fila recién creada.
    const { error } = await client
      .from('cotizaciones')
      .insert([payload])

    if (error) {
      console.error('[supabase] Error al insertar en cotizaciones:', JSON.stringify(error))
      return { success: false, error }
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err }
  }
}

/**
 * Obtiene conversaciones del chatbot.
 *
 * - Sin argumento: combina las 3 tablas (UNION lógico) y devuelve todas las
 *   filas ordenadas por `created_at DESC`. Cada fila incluye `__ramo` para
 *   saber de qué tabla viene.
 * - Con ramo: consulta solo esa tabla.
 *
 * @param {('automovil'|'personas'|'patrimoniales')} [ramo]
 * @returns {Promise<Array>}
 */
export const obtenerConversaciones = async (ramo) => {
  const client = getSupabaseClient()
  if (!client) return []

  // Caso 1: ramo específico → consulta directa a su tabla
  if (ramo && TABLA_POR_RAMO[ramo]) {
    const { data, error } = await client
      .from(TABLA_POR_RAMO[ramo])
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(`[supabase] Error consultando ${TABLA_POR_RAMO[ramo]}:`, error)
      return []
    }
    return (data || []).map(r => ({ ...r, __ramo: ramo }))
  }

  // Caso 2: sin ramo → consulta las 3 en paralelo y las combina
  try {
    const ramos = Object.keys(TABLA_POR_RAMO)
    const queries = await Promise.all(
      ramos.map(r =>
        client
          .from(TABLA_POR_RAMO[r])
          .select('*')
          .order('created_at', { ascending: false })
          .then(res => ({ ramo: r, data: res.data || [] }))
      )
    )

    const todas = queries.flatMap(({ ramo: r, data }) =>
      data.map(row => ({ ...row, __ramo: r }))
    )

    // Re-ordenar por created_at descendente (al combinar)
    todas.sort((a, b) => {
      const ta = new Date(a.created_at).getTime() || 0
      const tb = new Date(b.created_at).getTime() || 0
      return tb - ta
    })

    return todas
  } catch (err) {
    console.error('[supabase] Error obteniendo conversaciones combinadas:', err)
    return []
  }
}
