// Construcción de planes RCV por aseguradora a partir de las tarifas demo.
// Compartido por api/cotizar.js (modo mock) y por el fallback del loader.
//
// El producto de la web es RCV: el precio principal de cada tarjeta es el RCV,
// tarifado por CLASE DE USO + GRUPO DE PESO (esquema de la Providencia, §10).
// Las tarifas de Casco (cobertura_amplia) y el valorUSD siguen en el código
// (tarifas-seguros.js / estado) por si más adelante se vende Casco.
import { compararCotizaciones } from './tarifas-seguros.js'

// DEMO: coberturas reales de RCV diferenciadas por aseguradora para que los
// badges (mejor precio / recomendada / mayor cobertura) se justifiquen.
// Base RCV: daños a cosas y a personas. Las opcionales que el cliente active
// (exceso, defensa penal, ocupantes) se agregan en la emisión (E4).
const COBERTURAS_RCV = {
  'Real Seguros': ['RCV — Daños a cosas', 'RCV — Daños a personas', 'Asistencia vial 24/7'],
  'Estar Seguros': [
    'RCV — Daños a cosas',
    'RCV — Daños a personas',
    'Asistencia vial 24/7',
    'Asistencia legal y defensa penal',
  ],
  'Seguros Caracas': [
    'RCV — Daños a cosas',
    'RCV — Daños a personas',
    'Asistencia vial 24/7',
    'Asistencia legal y defensa penal',
    'Exceso de límite',
    'Asistencia en viaje',
  ],
}
const COBERTURAS_RCV_BASE = ['RCV — Daños a cosas', 'RCV — Daños a personas']

// DEMO: factores de tarifa RCV por clase de uso y por grupo de peso.
const CLASE_FACTOR = { particular: 1.0, carga: 1.45, moto: 0.7, transporte: 1.6 }
const GRUPO_FACTOR = {
  'Hasta 800 kg': 0.9,
  '801-1500 kg': 1.0,
  '1501-2500 kg': 1.2,
  'Más de 2500 kg': 1.5,
}

function round2(n) {
  return Math.round(Number(n) * 100) / 100
}

// Devuelve la lista de planes RCV (ordenada de menor a mayor prima) con precios
// por frecuencia, coberturas reales y un badge sugerido.
export function construirPlanes(vehiculo = {}, persona = {}) {
  const base = {
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    año: Number(vehiculo.anio) || new Date().getFullYear(),
    ceroKm: false,
    fechaNacimiento: persona.fechaNacimiento || '1990-01-01',
    valorVehiculo: null, // RCV no depende del valor
  }

  const claseF = CLASE_FACTOR[vehiculo.claseUso] ?? 1
  const grupoF = GRUPO_FACTOR[vehiculo.grupoPeso] ?? 1

  // RCV por aseguradora, ajustado por clase de uso + grupo de peso.
  const planes = compararCotizaciones({ ...base, cobertura: 'rcv' })
    .map((c) => ({ aseguradora: c.aseguradora, anual: round2(c.primaAnual * claseF * grupoF) }))
    .sort((a, b) => a.anual - b.anual)

  return planes.map((c, i) => ({
    plan_id: `plan_${c.aseguradora.toLowerCase().replace(/\s+/g, '-')}`,
    aseguradora: c.aseguradora,
    cobertura: 'RCV Básica',
    // El RCV no tiene deducible; la suma es la regulada.
    sumaAsegurada: 'según regulación vigente',
    precios: {
      anual: c.anual,
      semestral: round2(c.anual / 2),
      trimestral: round2(c.anual / 4),
      mensual: round2(c.anual / 12),
    },
    coberturas: COBERTURAS_RCV[c.aseguradora] || COBERTURAS_RCV_BASE,
    badge: i === 0 ? 'mejor-precio' : i === planes.length - 1 ? 'mayor-cobertura' : 'recomendada',
  }))
}
