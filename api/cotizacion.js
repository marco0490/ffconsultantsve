// API endpoint para enviar cotizaciones a Power Automate de forma segura

const POWER_AUTOMATE_URLS = {
  auto: process.env.POWER_AUTOMATE_AUTO,
  personas: process.env.POWER_AUTOMATE_PERSONAS,
  patrimoniales: process.env.POWER_AUTOMATE_PATRIMONIALES,
}

// Rate limiting simple (en producción usar Redis)
const requestCounts = new Map()
const RATE_LIMIT = 5 // máximo 5 requests
const RATE_WINDOW = 60000 // por minuto

function checkRateLimit(ip) {
  const now = Date.now()
  const windowStart = now - RATE_WINDOW

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, [])
  }

  const requests = requestCounts.get(ip).filter((time) => time > windowStart)
  requestCounts.set(ip, requests)

  if (requests.length >= RATE_LIMIT) {
    return false
  }

  requests.push(now)
  return true
}

// Validar datos de cotización
function validateCotizacion(data, tipo) {
  const errors = []

  // Campos comunes requeridos
  if (!data.NombreCompleto || data.NombreCompleto.trim().length < 3) {
    errors.push('Nombre completo es requerido (mínimo 3 caracteres)')
  }

  if (!data.Cedula || !/^[VEJPvejp]-?\d{6,9}$/.test(data.Cedula.replace(/\s/g, ''))) {
    errors.push('Cédula inválida (formato: V-12345678)')
  }

  if (!data.Telefono || data.Telefono.replace(/\D/g, '').length < 10) {
    errors.push('Teléfono inválido')
  }

  // Validaciones específicas por tipo
  if (tipo === 'auto') {
    if (!data.Marca) errors.push('Marca del vehículo es requerida')
    if (!data.Modelo) errors.push('Modelo del vehículo es requerido')
    if (!data.Ano || data.Ano < 1990 || data.Ano > new Date().getFullYear() + 1) {
      errors.push('Año del vehículo inválido')
    }
    if (!data.Placa) errors.push('Placa es requerida')
  }

  return errors
}

// 🔐 Lista de orígenes permitidos
const ALLOWED_ORIGINS = [
  'https://ffconsultantsve.com',
  'https://www.ffconsultantsve.com',
  'http://localhost:3000',
  'http://localhost:5173',
]

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

  // Obtener IP para rate limiting
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    'unknown'

  // Verificar rate limit
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Demasiadas solicitudes. Por favor espera un momento.',
    })
  }

  try {
    const { tipo, data, honeypot } = req.body

    // Honeypot anti-bot (si el campo oculto tiene valor, es un bot)
    if (honeypot) {
      console.log('Bot detected via honeypot')
      // Responder como si fuera exitoso para no alertar al bot
      return res.status(200).json({ success: true })
    }

    // Validar tipo de producto
    if (!tipo || !POWER_AUTOMATE_URLS[tipo]) {
      return res.status(400).json({
        success: false,
        error: 'Tipo de producto inválido',
      })
    }

    // Validar datos
    const validationErrors = validateCotizacion(data, tipo)
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors,
      })
    }

    // Agregar metadata con canal de origen
    const enrichedData = {
      ...data,
      Canal: data.Canal || 'Web-Chatbot',
      FechaRegistro: new Date().toISOString(),
      IP: ip,
    }

    // Enviar a Power Automate
    const powerAutomateUrl = POWER_AUTOMATE_URLS[tipo]

    const response = await fetch(powerAutomateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedData),
    })

    if (!response.ok) {
      throw new Error(`Power Automate responded with ${response.status}`)
    }

    return res.status(200).json({
      success: true,
      message: '¡Solicitud enviada! Un asesor te contactará pronto.',
    })
  } catch (error) {
    console.error('Cotizacion API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Error al enviar la solicitud. Por favor intenta de nuevo.',
    })
  }
}
