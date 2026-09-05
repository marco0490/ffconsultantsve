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

// Devuelve la lista de planes (ordenada de menor a mayor prima) con precios
// por frecuencia, coberturas y un badge sugerido.
export function construirPlanes(vehiculo = {}, persona = {}) {
  const base = {
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    año: Number(vehiculo.anio) || new Date().getFullYear(),
    ceroKm: false,
    fechaNacimiento: persona.fechaNacimiento || '1990-01-01',
    valorVehiculo: Number(vehiculo.valorUSD) || null,
  }

  // Plan principal: Casco (cobertura amplia). Además calculamos el RCV por
  // aseguradora para mostrar la línea "RCV desde $X/mes" en cada tarjeta.
  const casco = compararCotizaciones({ ...base, cobertura: 'cobertura_amplia' })
  const rcv = compararCotizaciones({ ...base, cobertura: 'rcv' })
  const rcvPorAseg = Object.fromEntries(rcv.map((c) => [c.aseguradora, round2(c.primaMensual)]))

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
