// API endpoint para enviar leads/contactos

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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
