/* eslint-env node */
// POST /api/cotizar — valida entrada y pide planes al core.
// En modo mock genera planes a partir de las tarifas demo locales.
import { applyCommon, isMock, delay, rand, proxyCore } from './_core.js'
import { construirPlanes } from '../src/data/planes.js'

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['POST'])) return

  const { vehiculo, persona } = req.body || {}
  if (!vehiculo || (!vehiculo.marca && !vehiculo.claseUso)) {
    return res.status(400).json({ error: 'Faltan datos del vehículo para cotizar' })
  }

  try {
    if (isMock()) {
      await delay(rand(1000, 2500))
      return res.status(200).json({
        cotizacion_id: `cot_${Date.now()}_${rand(1000, 9999)}`,
        planes: construirPlanes(vehiculo, persona),
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
