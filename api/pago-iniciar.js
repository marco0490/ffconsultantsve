/* eslint-env node */
// POST /api/pago-iniciar — inicia el C2P (Pago Móvil): el core envía el código SMS.
// Los datos del pagador se reenvían al core y NO se guardan aquí.
import { applyCommon, isMock, delay, rand, proxyCore } from './_core.js'

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['POST'])) return

  const { solicitud_id, cedula, banco, telefono } = req.body || {}
  if (!solicitud_id || !cedula || !banco || !telefono) {
    return res.status(400).json({ error: 'Faltan datos del pago (solicitud, cédula, banco y teléfono)' })
  }

  try {
    if (isMock()) {
      await delay(rand(1200, 2500))
      return res.status(200).json({
        // El pago_id codifica la solicitud para simular su emisión luego del pago.
        pago_id: `pago:${solicitud_id}:${rand(1000, 9999)}`,
        estado: 'esperando_codigo',
        expiraEnSegundos: 120,
        mock: true,
      })
    }

    const { status, data } = await proxyCore('/v1/pagos/c2p/iniciar', {
      method: 'POST',
      body: { solicitud_id, cedula, banco, telefono },
    })
    return res.status(status).json(data)
  } catch (e) {
    console.error('pago-iniciar error:', e.message)
    return res.status(502).json({ error: 'No se pudo iniciar el pago. Intenta de nuevo.' })
  }
}
