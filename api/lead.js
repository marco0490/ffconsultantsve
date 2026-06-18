// API endpoint para enviar leads/contactos

// 🔐 Lista de orígenes permitidos
const ALLOWED_ORIGINS = [
  'https://ffconsultantsve.com',
  'https://www.ffconsultantsve.com',
  'http://localhost:3000',
  'http://localhost:5173',
]

// 🔐 Rate limiting simple
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60000 // 1 minuto
const RATE_LIMIT_MAX = 10 // 10 requests por minuto

function checkRateLimit(ip) {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }
  
  const requests = rateLimitMap.get(ip).filter(time => time > windowStart)
  requests.push(now)
  rateLimitMap.set(ip, requests)
  
  return requests.length <= RATE_LIMIT_MAX
}

export default async function handler(req, res) {
  // 🔐 SEGURIDAD: Headers de protección
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // 🔐 SEGURIDAD: CORS restrictivo
  const origin = req.headers.origin
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // 🔐 SEGURIDAD: Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' })
  }

  try {
    const { nombre, telefono, horario, mensaje, honeypot } = req.body

    // Honeypot anti-bot
    if (honeypot) {
      return res.status(200).json({ success: true })
    }

    // Validaciones
    if (!nombre || nombre.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Nombre es requerido',
      })
    }

    if (!telefono || telefono.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Teléfono inválido',
      })
    }

    // Crear mensaje para WhatsApp
    const horarioTexto = {
      manana: 'Mañana (9am - 12pm)',
      tarde: 'Tarde (12pm - 6pm)',
      noche: 'Noche (6pm - 9pm)',
    }

    const whatsappMessage =
      `🔔 *Nueva Solicitud de Contacto*\n\n` +
      `👤 *Nombre:* ${nombre}\n` +
      `📞 *Teléfono:* ${telefono}\n` +
      `🕐 *Horario preferido:* ${horarioTexto[horario] || horario}\n` +
      (mensaje ? `💬 *Mensaje:* ${mensaje}\n` : '') +
      `\n_Enviado desde el chatbot MaxProtect_\n` +
      `_${new Date().toLocaleString('es-VE')}_`

    // Generar URL de WhatsApp
    const whatsappNumber = '584129713806'
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    return res.status(200).json({
      success: true,
      message: '¡Perfecto! Tu solicitud ha sido registrada.',
      whatsappUrl: whatsappUrl,
      data: {
        nombre,
        telefono,
        horario: horarioTexto[horario] || horario,
      },
    })
  } catch (error) {
    console.error('Lead API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Error al procesar tu solicitud. Por favor intenta de nuevo.',
    })
  }
}
