/* eslint-env node */
// POST /api/cotizar — valida entrada y pide planes al core.
// En modo mock genera planes a partir de las tarifas demo locales.
import { applyCommon, isMock, delay, rand, round2, proxyCore } from './_core.js'
import { compararCotizaciones } from '../src/data/tarifas-seguros.js'

const COBERTURAS_DEMO = [
  'RCV a terceros',
  'Daños propios (casco)',
  'Robo e incendio',
  'Asistencia vial 24/7',
  'Defensa legal',
]

function planesMock(vehiculo = {}, persona = {}) {
  const cots = compararCotizaciones({
    cobertura: 'cobertura_amplia',
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    año: Number(vehiculo.anio) || new Date().getFullYear(),
    ceroKm: false,
    fechaNacimiento: persona.fechaNacimiento || '1990-01-01',
    valorVehiculo: Number(vehiculo.valorUSD) || null,
  })

  // compararCotizaciones ordena de menor a mayor prima.
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
    // Etiqueta sugerida: la más barata / la más completa / recomendada.
    badge: i === 0 ? 'mejor-precio' : i === cots.length - 1 ? 'mayor-cobertura' : 'recomendada',
  }))
}

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['POST'])) return

  const { vehiculo, persona } = req.body || {}
  if (!vehiculo || !vehiculo.valorUSD) {
    return res.status(400).json({ error: 'Faltan datos del vehículo (valorUSD requerido)' })
  }

  try {
    if (isMock()) {
      await delay(rand(1000, 2500))
      return res.status(200).json({
        cotizacion_id: `cot_${Date.now()}_${rand(1000, 9999)}`,
        planes: planesMock(vehiculo, persona),
        mock: true,
      })
    }

    const { status, data } = await proxyCore('/v1/cotizaciones', {
      method: 'POST',
      body: { vehiculo, persona },
    })
    return res.status(status).json(data)
  } catch (e) {
    console.error('cotizar error:', e.message)
    return res.status(502).json({ error: 'No se pudo obtener la cotización. Intenta de nuevo.' })
  }
}
