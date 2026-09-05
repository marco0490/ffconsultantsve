/* eslint-env node */
// GET /api/solicitud-estado?id=...&email=... — estado de la solicitud (para el polling).
// Mock: tras el pago pasa de "pagada" a "emitida" en ~4s.
import { applyCommon, isMock, estadoSimulado, maskEmail, rand, proxyCore } from './_core.js'

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['GET'])) return

  const id = req.query?.id
  const email = req.query?.email
  if (!id) {
    return res.status(400).json({ error: 'Falta el id de la solicitud' })
  }

  try {
    if (isMock()) {
      const estado = estadoSimulado(id)
      const base = { solicitud_id: id, estado, mock: true }
      if (estado === 'emitida') {
        return res.status(200).json({
          ...base,
          poliza_id: `POL-${new Date().getFullYear()}-${rand(100000, 999999)}`,
          pdf_url: '/demo/poliza-ejemplo.pdf',
          provisioning: { enviado: true, canal: 'email', destino: maskEmail(email) },
        })
      }
      return res.status(200).json(base)
    }

    const { status, data } = await proxyCore(`/v1/solicitudes/${encodeURIComponent(id)}`, {
      method: 'GET',
    })
    return res.status(status).json(data)
  } catch (e) {
    console.error('solicitud-estado error:', e.message)
    return res.status(502).json({ error: 'No se pudo consultar el estado. Intenta de nuevo.' })
  }
}
