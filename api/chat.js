import OpenAI from 'openai'
import { generateSystemPrompt } from '../src/data/chatbot-knowledge.js'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Instrucciones de recolección de datos (comunes a todos los ramos)
// Estas se concatenan al final del prompt segmentado por ramo.
const LEAD_INSTRUCTIONS = `

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

El campo "tipo" del JSON debe coincidir con el RAMO actual del cliente:
- Ramo Automóvil  -> tipo: "auto"
- Ramo Personas   -> tipo: "personas" (o más específico: "vida", "accidentes_personales", "funerario", "salud")
- Ramo Patrimoniales -> tipo: "patrimoniales" (o "hogar")

## ENCUESTA DE SATISFACCIÓN
IMPORTANTE: Después de confirmar que los datos fueron enviados exitosamente, realiza una breve encuesta de 3 preguntas:

1. "Del 1 al 5, ¿qué tan fácil fue usar nuestro asistente virtual?" (1=Muy difícil, 5=Muy fácil)
2. "¿Qué te pareció la experiencia? ¿Hay algo que podríamos mejorar?"
3. "¿Nos recomendarías a un amigo o familiar?" (Sí/No/Tal vez)

Hazlas UNA a la vez, espera la respuesta, y al final agradece por el feedback.
Cuando tengas las 3 respuestas, incluye un bloque JSON así:

\`\`\`json:SURVEY_DATA
{
  "facilidadUso": 1-5,
  "comentarioMejora": "...",
  "recomendaria": "si|no|talvez"
}
\`\`\``

// 🔐 Lista de orígenes permitidos
const ALLOWED_ORIGINS = [
  'https://ffconsultantsve.com',
  'https://www.ffconsultantsve.com',
  'http://localhost:3000',
  'http://localhost:5173',
]

// 🔐 Rate limiting simple en memoria (para Vercel)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60000 // 1 minuto
const RATE_LIMIT_MAX = 20 // 20 requests por minuto

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
    const { messages, context, ramo } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }

    // 🎯 SEGMENTACIÓN POR RAMO: si el frontend envía un ramo válido,
    // se carga la base de conocimiento de ese ramo. Si no, prompt router.
    const VALID_RAMOS = ['automovil', 'personas', 'patrimoniales']
    const ramoActivo = VALID_RAMOS.includes(ramo) ? ramo : null
    const SYSTEM_PROMPT = generateSystemPrompt(ramoActivo) + LEAD_INSTRUCTIONS

    // Construir mensajes para OpenAI
    const openaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    // Si hay contexto adicional (datos de cotización en progreso), agregarlo
    if (context) {
      openaiMessages[0].content += `\n\n## CONTEXTO ACTUAL DE LA CONVERSACIÓN\n${JSON.stringify(context, null, 2)}`
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

    // Detectar si hay datos de lead en la respuesta
    const leadMatch = reply.match(/```json:LEAD_DATA\s*([\s\S]*?)```/)
    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1])
        reply = reply.replace(/```json:LEAD_DATA[\s\S]*?```/, '').trim()
        
        const POWER_AUTOMATE_URLS = {
          auto: process.env.POWER_AUTOMATE_AUTO,
          personas: process.env.POWER_AUTOMATE_PERSONAS,
          vida: process.env.POWER_AUTOMATE_PERSONAS,
          salud: process.env.POWER_AUTOMATE_PERSONAS,
          patrimoniales: process.env.POWER_AUTOMATE_PATRIMONIALES,
          hogar: process.env.POWER_AUTOMATE_PATRIMONIALES,
        }
        
        const powerAutomateUrl = POWER_AUTOMATE_URLS[leadData.tipo]
        if (powerAutomateUrl) {
          await fetch(powerAutomateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...leadData,
              Canal: 'Web-Chatbot',
              FechaRegistro: new Date().toISOString(),
            }),
          })
          leadSent = true
        }
      } catch (e) {
        console.error('Error parsing lead data:', e)
      }
    }

    // Detectar si hay datos de encuesta en la respuesta
    const surveyMatch = reply.match(/```json:SURVEY_DATA\s*([\s\S]*?)```/)
    if (surveyMatch) {
      try {
        const surveyData = JSON.parse(surveyMatch[1])
        reply = reply.replace(/```json:SURVEY_DATA[\s\S]*?```/, '').trim()
        
        const surveyUrl = process.env.POWER_AUTOMATE_SURVEYS || process.env.POWER_AUTOMATE_PERSONAS
        if (surveyUrl) {
          await fetch(surveyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...surveyData,
              TipoRegistro: 'Encuesta',
              Canal: 'Web-Chatbot',
              FechaRegistro: new Date().toISOString(),
            }),
          })
          surveySent = true
        }
      } catch (e) {
        console.error('Error parsing survey data:', e)
      }
    }

    return res.status(200).json({
      success: true,
      message: reply,
      usage: completion.usage,
      leadSent,
    })
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Error al procesar tu mensaje. Por favor intenta de nuevo.',
    })
  }
}
