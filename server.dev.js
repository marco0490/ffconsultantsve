// Servidor de desarrollo local para probar las API routes
// Solo para desarrollo - NO se usa en producción
import express from 'express'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import { config } from 'dotenv'
import { generateSystemPrompt } from './src/data/chatbot-knowledge.js'

// Cargar variables de entorno (ambos archivos)
config({ path: '.env' })
config({ path: '.env.local' })

const app = express()
app.use(cors())
app.use(express.json())

// ==========================================
// API ROUTES (copias de /api para desarrollo)
// ==========================================

// POST /api/chat - Chat con OpenAI
app.post('/api/chat', async (req, res) => {
  const OpenAI = (await import('openai')).default
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Usar la base de conocimiento + instrucciones de recolección de datos
  const SYSTEM_PROMPT = generateSystemPrompt() + `

## INSTRUCCIÓN IMPORTANTE PARA RECOLECCIÓN DE DATOS
Para cotización de AUTO, debes recolectar TODOS estos datos:
- Nombre completo
- Cédula
- Teléfono
- Correo electrónico
- Fecha de nacimiento (DD/MM/AAAA)
- Sexo (M/F)
- Marca del vehículo
- Modelo
- Año
- Versión/Edición
- Transmisión (Automática/Sincrónica)
- ¿Es 0km? (Sí/No)
- Placa (si no es 0km)
- Compañía aseguradora preferida
- Tipo de cobertura (RCV, Amplia, etc.)
- Tipo de pago (Contado/Financiado)

Cuando tengas TODOS los datos confirmados, incluye este bloque JSON:

\`\`\`json:LEAD_DATA
{
  "tipo": "auto",
  "NombreCompleto": "...",
  "Cedula": "V-12345678",
  "Telefono": "+58...",
  "CorreoElectronico": "...",
  "FechaNacimiento": "DD/MM/AAAA",
  "Sexo": "M o F",
  "Marca": "...",
  "Modelo": "...",
  "Ano": 2022,
  "Version": "...",
  "Transmision": "Automatica o Sincronica",
  "CeroKM": "Si o No",
  "Placa": "...",
  "CompaniaAseguradora": "...",
  "Cobertura": "...",
  "TipoPago": "Contado o Financiado"
}
\`\`\`

Solo incluye este bloque cuando tengas TODOS los datos confirmados por el cliente.

## ENCUESTA DE SATISFACCIÓN
IMPORTANTE: Después de confirmar que los datos fueron enviados, realiza una breve encuesta de 3 preguntas:

1. "Del 1 al 5, ¿qué tan fácil fue usar nuestro asistente virtual?" (1=Muy difícil, 5=Muy fácil)
2. "¿Qué te pareció la experiencia? ¿Hay algo que podríamos mejorar?"
3. "¿Nos recomendarías a un amigo o familiar?" (Sí/No/Tal vez)

Hazlas UNA a la vez, espera la respuesta, y al final agradece por el feedback.
Cuando tengas las 3 respuestas, incluye:

\`\`\`json:SURVEY_DATA
{
  "facilidadUso": 1-5,
  "comentarioMejora": "...",
  "recomendaria": "si|no|talvez"
}
\`\`\``

  try {
    const { messages, context } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }

    const openaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    if (context) {
      openaiMessages[0].content += `\n\n## CONTEXTO ACTUAL\n${JSON.stringify(context, null, 2)}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: openaiMessages,
      max_tokens: 500,
      temperature: 0.7,
    })

    let reply = completion.choices[0].message.content
    let leadSent = false
    let surveySent = false

    // Detectar y procesar datos de lead
    const leadMatch = reply.match(/```json:LEAD_DATA\s*([\s\S]*?)```/)
    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1])
        reply = reply.replace(/```json:LEAD_DATA[\s\S]*?```/, '').trim()
        
        console.log('📋 LEAD CAPTURADO:', leadData)
        
        // Convertir formatos para Power Automate
        // FechaNacimiento: DD/MM/YYYY -> ISO date-time
        if (leadData.FechaNacimiento) {
          const parts = leadData.FechaNacimiento.split('/')
          if (parts.length === 3) {
            const [day, month, year] = parts
            leadData.FechaNacimiento = new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString()
          }
        }
        // CeroKM: "Si"/"No" -> true/false
        if (typeof leadData.CeroKM === 'string') {
          leadData.CeroKM = leadData.CeroKM.toLowerCase() === 'si' || leadData.CeroKM.toLowerCase() === 'sí'
        }
        
        console.log('📋 LEAD CONVERTIDO:', leadData)
        
        // 1. Enviar a Power Automate si está configurado
        const POWER_AUTOMATE_URLS = {
          auto: process.env.POWER_AUTOMATE_AUTO,
          vida: process.env.POWER_AUTOMATE_PERSONAS,
          salud: process.env.POWER_AUTOMATE_PERSONAS,
          hogar: process.env.POWER_AUTOMATE_PATRIMONIALES,
        }
        
        const paUrl = POWER_AUTOMATE_URLS[leadData.tipo]
        if (paUrl) {
          try {
            const paResponse = await fetch(paUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...leadData,
                Canal: 'Web-Chatbot',
                FechaRegistro: new Date().toISOString(),
              }),
            })
            const paText = await paResponse.text()
            console.log('📤 Power Automate Response:', paResponse.status, paText)
          } catch (paError) {
            console.error('❌ Error Power Automate:', paError.message)
          }
        } else {
          console.log('⚠️ No hay URL de Power Automate para tipo:', leadData.tipo)
        }

        // 2. Enviar también por EmailJS (backup)
        const emailjsServiceId = process.env.VITE_EMAIL_SERVICE
        const emailjsTemplateId = process.env.VITE_EMAIL_COTIZADOR
        const emailjsUserId = process.env.VITE_EMAIL_USER
        const emailjsPrivateKey = process.env.VITE_EMAIL_PRIVATE_KEY
        
        console.log('📧 EmailJS Config:', { emailjsServiceId, emailjsTemplateId, emailjsUserId, hasPrivateKey: !!emailjsPrivateKey })
        
        if (emailjsServiceId && emailjsTemplateId && emailjsUserId) {
          try {
            const emailPayload = {
              service_id: emailjsServiceId,
              template_id: emailjsTemplateId,
              user_id: emailjsUserId,
              accessToken: emailjsPrivateKey,
              template_params: {
                ...leadData,
                Canal: 'Web-Chatbot',
                FechaRegistro: new Date().toISOString(),
                to_email: 'ffconsultantsve@outlook.com',
              }
            }
            console.log('📧 EmailJS Payload:', JSON.stringify(emailPayload, null, 2))
            
            const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(emailPayload),
            })
            const emailText = await emailResponse.text()
            console.log('📧 EmailJS Response:', emailResponse.status, emailText)
          } catch (emailError) {
            console.error('❌ Error EmailJS:', emailError.message)
          }
        } else {
          console.log('⚠️ Faltan variables de EmailJS')
        }
        
        leadSent = true
      } catch (e) {
        console.error('Error parsing lead:', e)
      }
    }

    // Detectar y procesar datos de encuesta
    const surveyMatch = reply.match(/```json:SURVEY_DATA\s*([\s\S]*?)```/)
    if (surveyMatch) {
      try {
        const surveyData = JSON.parse(surveyMatch[1])
        reply = reply.replace(/```json:SURVEY_DATA[\s\S]*?```/, '').trim()
        
        console.log('📊 ENCUESTA CAPTURADA:', surveyData)
        surveySent = true
      } catch (e) {
        console.error('Error parsing survey:', e)
      }
    }

    return res.json({
      success: true,
      message: reply,
      usage: completion.usage,
      leadSent,
      surveySent,
    })
  } catch (error) {
    console.error('OpenAI API Error:', error.message)
    return res.status(500).json({
      success: false,
      error: 'Error al procesar tu mensaje. Por favor intenta de nuevo.',
    })
  }
})

// POST /api/cotizacion
app.post('/api/cotizacion', async (req, res) => {
  try {
    const { tipo, data } = req.body
    console.log('📋 Cotización recibida:', tipo, data)
    
    // En desarrollo, solo simulamos el envío
    return res.json({
      success: true,
      message: '¡Solicitud enviada! Un asesor te contactará pronto.',
      dev: true
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
})

// POST /api/lead
app.post('/api/lead', async (req, res) => {
  try {
    const { nombre, telefono, horario } = req.body
    console.log('👤 Lead recibido:', { nombre, telefono, horario })
    
    const whatsappNumber = '584129713806'
    const mensaje = `🔔 Nueva Solicitud de Contacto\n\n👤 Nombre: ${nombre}\n📞 Teléfono: ${telefono}\n🕐 Horario: ${horario}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`
    
    return res.json({
      success: true,
      message: '¡Perfecto! Tu solicitud ha sido registrada.',
      whatsappUrl
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
})

// ==========================================
// SERVIDOR VITE + EXPRESS
// ==========================================

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  })

  app.use(vite.middlewares)

  const PORT = 3000
  app.listen(PORT, () => {
    console.log('')
    console.log('🚀 ═══════════════════════════════════════════')
    console.log('   FFC Consultants - Servidor de Desarrollo')
    console.log('═══════════════════════════════════════════════')
    console.log('')
    console.log(`   🌐 Local:   http://localhost:${PORT}`)
    console.log('')
    console.log('   📡 API Routes disponibles:')
    console.log('      POST /api/chat')
    console.log('      POST /api/cotizacion')
    console.log('      POST /api/lead')
    console.log('')
    console.log('═══════════════════════════════════════════════')
    console.log('')
  })
}

startServer()
