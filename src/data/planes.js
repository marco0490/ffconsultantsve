// Construcción de planes por aseguradora a partir de las tarifas demo locales.
// Compartido por api/cotizar.js (modo mock) y por el fallback del loader del
// cotizador (cuando el backend no está disponible).
import { compararCotizaciones } from './tarifas-seguros.js'

// DEMO: coberturas diferenciadas por aseguradora para que los badges
// (mejor precio / recomendada / mayor cobertura) se justifiquen a la vista.
const COBERTURAS_BASICAS = [
  'RCV a terceros',
  'Daños propios (casco)',
  'Robo e incendio',
  'Asistencia vial 24/7',
]
const COBERTURAS_POR_ASEG = {
  'Real Seguros': COBERTURAS_BASICAS, // 4 básicas
  'Estar Seguros': [...COBERTURAS_BASICAS, 'Defensa legal'], // 5
  'Seguros Caracas': [
    ...COBERTURAS_BASICAS,
    'Defensa legal',
    'Vehículo sustituto',
    'Accesorios y equipos',
  ], // 7
}

// DEMO: deducibles distintos por aseguradora (sustituyen al N/A de las tarifas).
const DEDUCIBLE_POR_ASEG = {
  'Real Seguros': '10%',
  'Estar Seguros': '8%',
  'Seguros Caracas': '5%',
}

function round2(n) {
  return Math.round(Number(n) * 100) / 100
}

// DEMO: factores de tarifa RCV por clase de uso y por grupo de peso
// (esquema clase + grupo de la Providencia, §10) en lugar de por valor.
const CLASE_FACTOR = { particular: 1.0, carga: 1.45, moto: 0.7, transporte: 1.6 }
const GRUPO_FACTOR = {
  'Hasta 800 kg': 0.9,
  '801-1500 kg': 1.0,
  '1501-2500 kg': 1.2,
  'Más de 2500 kg': 1.5,
}
// DEMO: valor estimado del vehículo por grupo de peso (para el precio de Casco,
// ya que en el flujo RCV no se pregunta el valor).
const VALOR_ESTIMADO = {
  'Hasta 800 kg': 8000,
  '801-1500 kg': 15000,
  '1501-2500 kg': 28000,
  'Más de 2500 kg': 45000,
}

// Devuelve la lista de planes (ordenada de menor a mayor prima) con precios
// por frecuencia, coberturas y un badge sugerido.
export function construirPlanes(vehiculo = {}, persona = {}) {
  const grupoPeso = vehiculo.grupoPeso
  const base = {
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    año: Number(vehiculo.anio) || new Date().getFullYear(),
    ceroKm: false,
    fechaNacimiento: persona.fechaNacimiento || '1990-01-01',
    // El Casco necesita un valor; en RCV no se pregunta, así que se estima
    // desde el grupo de peso.
    valorVehiculo: Number(vehiculo.valorUSD) || VALOR_ESTIMADO[grupoPeso] || 15000,
  }

  // Plan principal: Casco (cobertura amplia).
  const casco = compararCotizaciones({ ...base, cobertura: 'cobertura_amplia' })

  // RCV tarifado por clase de uso + grupo de peso (factores demo), tomando
  // como base el RCV por aseguradora de las tarifas. La línea "RCV desde…"
  // de las tarjetas sale de aquí.
  const rcvBase = compararCotizaciones({ ...base, cobertura: 'rcv' })
  const claseF = CLASE_FACTOR[vehiculo.claseUso] ?? 1
  const grupoF = GRUPO_FACTOR[grupoPeso] ?? 1
  const rcvPorAseg = Object.fromEntries(
    rcvBase.map((c) => [c.aseguradora, round2(c.primaMensual * claseF * grupoF)]),
  )

  return casco.map((c, i) => ({
    plan_id: `plan_${c.aseguradora.toLowerCase().replace(/\s+/g, '-')}`,
    aseguradora: c.aseguradora,
    cobertura: c.cobertura,
    deducible: DEDUCIBLE_POR_ASEG[c.aseguradora] || c.deducible, // DEMO
    sumaAsegurada: c.valorVehiculo,
    precios: {
      anual: round2(c.primaAnual),
      semestral: round2(c.primaAnual / 2),
      trimestral: round2(c.primaAnual / 4),
      mensual: round2(c.primaMensual),
    },
    rcvMensual: rcvPorAseg[c.aseguradora] ?? null,
    coberturas: COBERTURAS_POR_ASEG[c.aseguradora] || COBERTURAS_BASICAS, // DEMO
    badge: i === 0 ? 'mejor-precio' : i === casco.length - 1 ? 'mayor-cobertura' : 'recomendada',
  }))
}
