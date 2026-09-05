/* eslint-env node */
// POST /api/solicitud — crea la solicitud de emisión (estado pendiente_pago).
import { applyCommon, isMock, delay, rand, round2, proxyCore } from './_core.js'

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['POST'])) return

  const { cotizacion_id, plan_id, emision, contacto, montoUSD } = req.body || {}
  if (!plan_id) {
    return res.status(400).json({ error: 'Falta el plan seleccionado (plan_id)' })
  }

  try {
    if (isMock()) {
      await delay(rand(800, 1800))
      const monto = round2(montoUSD || 0) || null
      return res.status(200).json({
        solicitud_id: `sol_${Date.now()}_${rand(1000, 9999)}`,
        estado: 'pendiente_pago',
        montoUSD: monto,
        montoBs: monto ? round2(monto * 40) : null, // tasa demo
        mock: true,
      })
    }

    const idempotencyKey = req.headers['idempotency-key'] || undefined
    const { status, data } = await proxyCore('/v1/solicitudes', {
      method: 'POST',
      body: { cotizacion_id, plan_id, emision, contacto },
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    })
    return res.status(status).json(data)
  } catch (e) {
    console.error('solicitud error:', e.message)
    return res.status(502).json({ error: 'No se pudo crear la solicitud. Intenta de nuevo.' })
  }
}
