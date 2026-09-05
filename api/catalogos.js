/* eslint-env node */
// GET /api/catalogos?tipo=bancos|vehiculos — catálogos para los selects.
import { applyCommon, isMock, proxyCore } from './_core.js'
import { MARCAS } from '../src/data/vehiculos.js'

// Bancos afiliados a Pago Móvil C2P en Venezuela (demo).
const BANCOS = [
  { codigo: '0102', nombre: 'Banco de Venezuela' },
  { codigo: '0104', nombre: 'Venezolano de Crédito' },
  { codigo: '0105', nombre: 'Banco Mercantil' },
  { codigo: '0108', nombre: 'BBVA Provincial' },
  { codigo: '0114', nombre: 'Bancaribe' },
  { codigo: '0115', nombre: 'Banco Exterior' },
  { codigo: '0128', nombre: 'Banco Caroní' },
  { codigo: '0134', nombre: 'Banesco' },
  { codigo: '0151', nombre: 'BFC Banco Fondo Común' },
  { codigo: '0156', nombre: '100% Banco' },
  { codigo: '0163', nombre: 'Banco del Tesoro' },
  { codigo: '0166', nombre: 'Banco Agrícola de Venezuela' },
  { codigo: '0168', nombre: 'Bancrecer' },
  { codigo: '0169', nombre: 'Mi Banco' },
  { codigo: '0171', nombre: 'Banco Activo' },
  { codigo: '0172', nombre: 'Bancamiga' },
  { codigo: '0174', nombre: 'Banplus' },
  { codigo: '0175', nombre: 'Banco Bicentenario' },
  { codigo: '0191', nombre: 'Banco Nacional de Crédito (BNC)' },
]

export default async function handler(req, res) {
  if (!applyCommon(req, res, ['GET'])) return

  const tipo = req.query?.tipo || 'bancos'

  try {
    if (isMock()) {
      // Cachear en el navegador/CDN 24 h.
      res.setHeader('Cache-Control', 'public, max-age=86400')
      if (tipo === 'vehiculos') {
        return res.status(200).json({ marcas: MARCAS, mock: true })
      }
      return res.status(200).json({ bancos: BANCOS, mock: true })
    }

    const path = tipo === 'vehiculos' ? '/v1/catalogos/vehiculos' : '/v1/catalogos/bancos'
    const { status, data } = await proxyCore(path, { method: 'GET' })
    return res.status(status).json(data)
  } catch (e) {
    console.error('catalogos error:', e.message)
    return res.status(502).json({ error: 'No se pudieron cargar los catálogos.' })
  }
}
