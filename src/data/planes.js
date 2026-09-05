// Construcción de planes por aseguradora a partir de las tarifas demo locales.
// Compartido por api/cotizar.js (modo mock) y por el fallback del loader del
// cotizador (cuando el backend no está disponible).
import { compararCotizaciones } from './tarifas-seguros.js'

export const COBERTURAS_DEMO = [
  'RCV a terceros',
  'Daños propios (casco)',
  'Robo e incendio',
  'Asistencia vial 24/7',
  'Defensa legal',
]

function round2(n) {
  return Math.round(Number(n) * 100) / 100
}

// Devuelve la lista de planes (ordenada de menor a mayor prima) con precios
// por frecuencia, coberturas y un badge sugerido.
export function construirPlanes(vehiculo = {}, persona = {}) {
  const cots = compararCotizaciones({
    cobertura: 'cobertura_amplia',
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    año: Number(vehiculo.anio) || new Date().getFullYear(),
    ceroKm: false,
    fechaNacimiento: persona.fechaNacimiento || '1990-01-01',
    valorVehiculo: Number(vehiculo.valorUSD) || null,
  })

  return cots.map((c, i) => ({
    plan_id: `plan_${c.aseguradora.toLowerCase().replace(/\s+/g, '-')}`,
    aseguradora: c.aseguradora,
    cobertura: c.cobertura,
    deducible: c.deducible,
    sumaAsegurada: c.valorVehiculo,
    precios: {
      anual: round2(c.primaAnual),
      semestral: round2(c.primaAnual / 2),
      trimestral: round2(c.primaAnual / 4),
      mensual: round2(c.primaMensual),
    },
    coberturas: COBERTURAS_DEMO,
    badge: i === 0 ? 'mejor-precio' : i === cots.length - 1 ? 'mayor-cobertura' : 'recomendada',
  }))
}
