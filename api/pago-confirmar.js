/* eslint-env node */
// POST /api/pago-confirmar — confirma el C2P con el código SMS.
// Mock: el código 123456 aprueba; cualquier otro rechaza.
import { applyCommon, isMock, delay, rand, marcarPagada, proxyCore } from './_core.js'

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['POST'])) return

  const { pago_id, codigo } = req.body || {}
  if (!pago_id || !codigo) {
    return res.status(400).json({ error: 'Falta el código de confirmación' })
  }

  try {
    if (isMock()) {
      await delay(rand(1200, 2500))
      if (String(codigo).trim() === '123456') {
        // Extraer la solicitud del pago_id ("pago:<solicitud>:<n>") y marcarla pagada.
        const solicitudId = String(pago_id).split(':')[1]
        if (solicitudId) marcarPagada(solicitudId)
        return res.status(200).json({ estado: 'aprobado', mock: true })
      }
      return res.status(200).json({
        estado: 'rechazado',
        motivo: 'Código incorrecto o vencido',
        mock: true,
      })
    }

    const { status, data } = await proxyCore('/v1/pagos/c2p/confirmar', {
      method: 'POST',
      body: { pago_id, codigo },
    })
    return res.status(status).json(data)
  } catch (e) {
    console.error('pago-confirmar error:', e.message)
    return res.status(502).json({ error: 'No se pudo confirmar el pago. Intenta de nuevo.' })
  }
}
