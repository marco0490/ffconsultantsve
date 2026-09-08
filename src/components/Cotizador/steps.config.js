// Configuración del orden de pasos del cotizador conversacional (ramo auto).
// El "paso" numérico se usa para la barra de progreso ("Paso X de 9").

export const TOTAL_PASOS = 11

// Pasos con barra de progreso (0..10). El loader, resultado y confirmación
// NO forman parte del conteo de progreso. El paso de "grupo de peso" es un
// fallback condicional (ver PasoPeso) y NO se cuenta aquí.
export const PASOS = [
  { paso: 0, key: 'bienvenida', path: '/cotizar' },
  { paso: 1, key: 'marca', path: '/cotizar/marca' },
  { paso: 2, key: 'modelo', path: '/cotizar/modelo' },
  { paso: 3, key: 'version', path: '/cotizar/version' },
  { paso: 4, key: 'transmision', path: '/cotizar/transmision' },
  { paso: 5, key: 'anio', path: '/cotizar/anio' },
  { paso: 6, key: 'tipo', path: '/cotizar/tipo' },
  { paso: 7, key: 'valor', path: '/cotizar/valor' },
  { paso: 8, key: 'uso', path: '/cotizar/uso' },
  { paso: 9, key: 'datos', path: '/cotizar/datos' },
  { paso: 10, key: 'contacto', path: '/cotizar/contacto' },
]

// Rutas posteriores al flujo de captura (fuera del conteo de progreso).
export const RUTA_LOADER = '/cotizar/calculando'
export const RUTA_RESULTADO = '/cotizar/resultado'
export const RUTA_CONFIRMACION = '/cotizar/listo'

export function pathSiguiente(paso) {
  const siguiente = PASOS.find((p) => p.paso === paso + 1)
  // Tras el último paso de captura (8) se va al loader.
  return siguiente ? siguiente.path : RUTA_LOADER
}

export function pathAnterior(paso) {
  const anterior = PASOS.find((p) => p.paso === paso - 1)
  // Desde el paso 0 (bienvenida) se vuelve al home.
  return anterior ? anterior.path : '/'
}

// ==========================================
// ETAPA DE EMISIÓN (Parte 2) — 6 pasos
// El paso se usa 0-indexed para el progreso (se muestra paso+1 de 6).
// ==========================================

export const TOTAL_EMISION = 6

export const RUTA_EMISION_INICIO = '/cotizar/emision' // E0 requisitos

export const EMISION = [
  { paso: 0, key: 'vehiculo', path: '/cotizar/emision/vehiculo' },
  { paso: 1, key: 'tomador', path: '/cotizar/emision/tomador' },
  { paso: 2, key: 'plaft', path: '/cotizar/emision/plaft' },
  { paso: 3, key: 'verificar', path: '/cotizar/emision/verificar' },
  { paso: 4, key: 'pago', path: '/cotizar/emision/pago' },
]

export const RUTA_EMITIENDO = '/cotizar/emision/emitiendo'
export const RUTA_EMISION_LISTO = '/cotizar/emision/listo'

export function pathSiguienteEmision(paso) {
  const siguiente = EMISION.find((p) => p.paso === paso + 1)
  // Tras el último paso de captura (pago, paso 4) sigue el loader post-pago.
  // (El paso de pago maneja su propia navegación al confirmar.)
  return siguiente ? siguiente.path : RUTA_EMITIENDO
}

export function pathAnteriorEmision(paso) {
  const anterior = EMISION.find((p) => p.paso === paso - 1)
  // Desde el primer paso de emisión se vuelve a E0 (requisitos).
  return anterior ? anterior.path : RUTA_EMISION_INICIO
}
