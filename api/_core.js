/* eslint-env node */
// Utilidades compartidas del backend delgado (proxy al core FastAPI / modo mock).
// Los archivos con prefijo "_" no se exponen como rutas en Vercel.

const ALLOWED_ORIGINS = [
  'https://ffconsultantsve.com',
  'https://www.ffconsultantsve.com',
  'https://futurefinancialconsultantsve.com',
  'https://www.futurefinancialconsultantsve.com',
  'http://localhost:3000',
  'http://localhost:5173',
]

// El modo mock está activo si MOCK_CORE lo pide explícitamente, o si no hay
// core configurado (así la demo funciona sin backend real).
export function isMock() {
  const v = String(process.env.MOCK_CORE || '').toLowerCase()
  if (v === 'false' || v === '0') return false
  if (v === 'true' || v === '1') return true
  return !process.env.CORE_BASE_URL
}

// Cabeceras de seguridad + CORS + guardas de método. Devuelve false si ya
// respondió (OPTIONS o método no permitido) y el handler debe cortar.
export function applyCommon(req, res, methods) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  const origin = req.headers.origin
  const esProd = process.env.NODE_ENV === 'production'
  const esLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '')
  if (origin && (ALLOWED_ORIGINS.includes(origin) || (!esProd && esLocalhost))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', `${methods.join(', ')}, OPTIONS`)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return false
  }
  if (!methods.includes(req.method)) {
    res.status(405).json({ error: 'Método no permitido' })
    return false
  }
  return true
}

export function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

export function rand(min, max) {
  return Math.floor(min + Math.random() * (max - min))
}

export function round2(n) {
  return Math.round(Number(n) * 100) / 100
}

export function maskEmail(email = '') {
  const [user, dom] = String(email).split('@')
  if (!dom) return '***'
  const u =
    user.length <= 2
      ? `${user[0] || '*'}*`
      : `${user[0]}${'*'.repeat(user.length - 2)}${user[user.length - 1]}`
  return `${u}@${dom}`
}

// Seguimiento en memoria de pagos para simular la transición pagada→emitida.
// Suficiente para la demo (un proceso). En producción el estado lo manda el core.
const pagos = new Map() // solicitudId -> { pagadoEn }

export function marcarPagada(solicitudId) {
  pagos.set(solicitudId, { pagadoEn: Date.now() })
}

export function estadoSimulado(solicitudId) {
  const p = pagos.get(solicitudId)
  if (!p) return 'pendiente_pago'
  return Date.now() - p.pagadoEn < 4000 ? 'pagada' : 'emitida'
}

// Proxy al core real (modo producción).
export async function proxyCore(path, { method = 'POST', body, headers } = {}) {
  const base = process.env.CORE_BASE_URL
  const resp = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.CORE_API_KEY ? { Authorization: `Bearer ${process.env.CORE_API_KEY}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await resp.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { raw: text }
  }
  return { status: resp.status, data }
}
