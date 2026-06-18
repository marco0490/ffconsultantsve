import { useState, useRef, useEffect } from 'react'
import { FiSend, FiUser, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
import AddressMapPicker from './AddressMapPicker'
import { guardarConversacion, guardarCotizacion } from '../../lib/supabase'

const API_BASE = import.meta.env.PROD ? '' : ''

// Mapea acciones de producto inicial al ramo de seguros correspondiente.
// Backend espera: 'automovil' | 'personas' | 'patrimoniales' | null.
const PRODUCTO_A_RAMO = {
  cotizar_rcv: 'automovil',
  cotizar_ap: 'personas',
  cotizar_funerario: 'personas',
  cotizar_vida: 'personas',
  cotizar_hogar: 'patrimoniales',
}

// Normaliza el ramo proveniente de sessionStorage (legacy: 'auto') al ID actual ('automovil').
const normalizarRamo = (ramo) => {
  if (!ramo) return null
  if (ramo === 'auto' || ramo === 'automovil') return 'automovil'
  if (ramo === 'personas') return 'personas'
  if (ramo === 'patrimoniales' || ramo === 'hogar') return 'patrimoniales'
  return null
}

// Función para extraer datos del historial de chat
const extraerDatosDelChat = (messages, ramoActivo = null) => {
  const datos = {
    // 🎯 Ramo del seguro (clasificación principal): automovil | personas | patrimoniales
    ramo: ramoActivo || '',
    // Campos comunes
    producto: '',
    fecha_solicitud: new Date().toLocaleString('es-VE'),
    etapa: 'Cotización',
    aseguradora: '',
    precio_mensual: '',
    precio_anual: '',
    // Datos del cliente
    nombre: '',
    cedula: '',
    telefono: '',
    email_cliente: '',
    fecha_nacimiento: '',
    edad: '',
    estado: '',
    ciudad: '',
    direccion: '',
    // AP específicos
    tipo_plan: '',
    suma_asegurada: '',
    ocupacion: '',
    nivel_riesgo: '',
    coberturas: '',
    beneficiarios: '',
    actividades_riesgo: '',
    // Funerario específicos
    cobertura_funerario: '',
    monto_cobertura: '',
    num_personas: '',
    familiares: '',
    condicion_salud: '',
    // Vida específicos
    sexo: '',
    fumador: '',
    declaracion_salud: '',
    requiere_revision: '',
    // RCV específicos
    tipo_vehiculo: '',
    uso_vehiculo: '',
    marca: '',
    modelo: '',
    año_vehiculo: '',
    placa: '',
    color: '',
    serial_carroceria: '',
    serial_motor: '',
    plan_rcv: '',
    tipo_persona: '',
    // PATRIMONIALES (Combinado Residencial / Hogar)
    tipo_inmueble: '',
    uso_inmueble: '',
    valor_inmueble: '',
    valor_contenido: '',
    antiguedad_construccion: '',
    metros_cuadrados: '',
    habitado: '',
    coberturas_hogar: '',
    // Conversación completa
    historial_chat: ''
  }

  // Detectar producto
  const chatText = messages.map(m => m.content).join(' ').toLowerCase()
  if (chatText.includes('accidentes personales')) datos.producto = '🛡️ Accidentes Personales'
  else if (chatText.includes('funerario')) datos.producto = '⚱️ Servicio Funerario'
  else if (chatText.includes('combinado residencial') || chatText.includes('seguro de hogar') || chatText.includes('seguro patrimonial')) datos.producto = '🏠 Combinado Residencial'
  else if (chatText.includes('vida')) datos.producto = '💚 Póliza de Vida'
  else if (chatText.includes('rcv')) datos.producto = '🚗 RCV'

  // Si no se recibió ramo explícito, inferirlo a partir del producto detectado
  if (!datos.ramo) {
    const p = datos.producto
    if (p.includes('RCV')) datos.ramo = 'automovil'
    else if (p.includes('Accidentes') || p.includes('Funerario') || p.includes('Vida')) datos.ramo = 'personas'
    else if (p.includes('Residencial') || p.includes('Hogar')) datos.ramo = 'patrimoniales'
  }

  // Extraer datos analizando pregunta-respuesta del bot
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    const prevMsg = messages[i - 1]
    
    // Si es respuesta del usuario, analizar qué preguntó el bot antes
    if (msg.role === 'user' && prevMsg && prevMsg.role === 'assistant') {
      const pregunta = prevMsg.content.toLowerCase()
      const respuesta = msg.content.trim()
      
      // Datos personales
      if (pregunta.includes('nombre') && !datos.nombre) datos.nombre = respuesta
      if (pregunta.includes('cédula') || pregunta.includes('cedula')) datos.cedula = respuesta
      if (pregunta.includes('teléfono') || pregunta.includes('telefono') || pregunta.includes('celular')) datos.telefono = respuesta
      if (pregunta.includes('correo') || pregunta.includes('email')) datos.email_cliente = respuesta
      if (pregunta.includes('fecha de nacimiento') || pregunta.includes('nacimiento')) datos.fecha_nacimiento = respuesta
      if (pregunta.includes('edad')) datos.edad = respuesta
      if (pregunta.includes('estado') && pregunta.includes('resid')) datos.estado = respuesta
      if (pregunta.includes('ciudad')) datos.ciudad = respuesta
      if (pregunta.includes('dirección') || pregunta.includes('direccion')) datos.direccion = respuesta
      if (pregunta.includes('ocupación') || pregunta.includes('ocupacion') || pregunta.includes('dedicas')) datos.ocupacion = respuesta
      
      // RCV específicos
      if (pregunta.includes('tipo de vehículo') || pregunta.includes('tipo de vehiculo')) datos.tipo_vehiculo = respuesta
      if (pregunta.includes('uso') && pregunta.includes('vehículo')) datos.uso_vehiculo = respuesta
      if (pregunta.includes('marca')) datos.marca = respuesta
      if (pregunta.includes('modelo')) datos.modelo = respuesta
      if (pregunta.includes('año') && (pregunta.includes('vehículo') || pregunta.includes('vehiculo'))) datos.año_vehiculo = respuesta
      if (pregunta.includes('placa')) datos.placa = respuesta
      if (pregunta.includes('color')) datos.color = respuesta
      if (pregunta.includes('serial') && pregunta.includes('carrocería')) datos.serial_carroceria = respuesta
      if (pregunta.includes('serial') && pregunta.includes('motor')) datos.serial_motor = respuesta
      if (pregunta.includes('persona natural') || pregunta.includes('persona jurídica')) datos.tipo_persona = respuesta
      
      // AP/Vida específicos
      if (pregunta.includes('sexo') || pregunta.includes('género')) datos.sexo = respuesta
      if (pregunta.includes('fuma')) datos.fumador = respuesta
      if (pregunta.includes('suma asegurada') || pregunta.includes('monto de protección')) datos.suma_asegurada = respuesta
      if (pregunta.includes('cobertura')) datos.coberturas = respuesta
      if (pregunta.includes('beneficiario')) datos.beneficiarios = respuesta
      if (pregunta.includes('riesgo laboral')) datos.nivel_riesgo = respuesta
      if (pregunta.includes('actividades de alto riesgo')) datos.actividades_riesgo = respuesta
      
      // Funerario
      if (pregunta.includes('individual') || pregunta.includes('familiar')) datos.tipo_plan = respuesta
      if (pregunta.includes('personas') && pregunta.includes('incluir')) datos.num_personas = respuesta
      if (pregunta.includes('hospitalizada') || pregunta.includes('enfermedad terminal')) datos.condicion_salud = respuesta

      // PATRIMONIALES / Combinado Residencial
      if (pregunta.includes('casa o apartamento') || pregunta.includes('casa o apto')) datos.tipo_inmueble = respuesta
      if ((pregunta.includes('residencial') && pregunta.includes('alquil')) || pregunta.includes('uso residencial')) datos.uso_inmueble = respuesta
      if (pregunta.includes('valor aproximado') && pregunta.includes('inmueble')) datos.valor_inmueble = respuesta
      if (pregunta.includes('valor') && pregunta.includes('contenido')) datos.valor_contenido = respuesta
      if (pregunta.includes('antigüedad') || pregunta.includes('antiguedad') || pregunta.includes('años de la construcción') || pregunta.includes('años la construcción')) datos.antiguedad_construccion = respuesta
      if (pregunta.includes('metros cuadrados') || pregunta.includes('m2')) datos.metros_cuadrados = respuesta
      if (pregunta.includes('habitado') || pregunta.includes('actualmente vive')) datos.habitado = respuesta
      if (pregunta.includes('coberturas adicionales') && (pregunta.includes('incendio') || pregunta.includes('terremoto') || pregunta.includes('robo'))) datos.coberturas_hogar = respuesta
    }
    
    // Detectar aseguradora seleccionada (en cualquier mensaje del usuario)
    if (msg.role === 'user') {
      const msgLower = msg.content.toLowerCase()
      if (msgLower.includes('pirámide') || msgLower.includes('piramide')) datos.aseguradora = 'Seguros Pirámide'
      if (msgLower.includes('oceánica') || msgLower.includes('oceanica')) datos.aseguradora = 'Oceánica de Seguros'
      if (msgLower.includes('estar')) datos.aseguradora = 'Estar Seguros'
      if (msgLower.includes('real')) datos.aseguradora = 'Real Seguros'
      
      // Extraer patrones comunes
      const cedulaMatch = msg.content.match(/[VvEe]-?\d{6,8}/)
      if (cedulaMatch && !datos.cedula) datos.cedula = cedulaMatch[0].toUpperCase()
      
      const telefonoMatch = msg.content.match(/0?4\d{2}[- ]?\d{3}[- ]?\d{4}/)
      if (telefonoMatch && !datos.telefono) datos.telefono = telefonoMatch[0]
      
      const emailMatch = msg.content.match(/[\w.-]+@[\w.-]+\.\w+/)
      if (emailMatch && !datos.email_cliente) datos.email_cliente = emailMatch[0]
    }
  }

  // Extraer precios del último mensaje del bot que tenga tabla
  const botMessages = messages.filter(m => m.role === 'assistant')
  for (let i = botMessages.length - 1; i >= 0; i--) {
    const msg = botMessages[i].content
    if (msg.includes('$') && msg.includes('/mes')) {
      const precioMatch = msg.match(/\$(\d+\.?\d*)\/?mes/i)
      if (precioMatch) datos.precio_mensual = '$' + precioMatch[1] + '/mes'
      const anualMatch = msg.match(/\$(\d+\.?\d*)\/?año/i)
      if (anualMatch) datos.precio_anual = '$' + anualMatch[1] + '/año'
      break
    }
  }

  // Guardar historial completo para referencia
  datos.historial_chat = messages.map(m => 
    `${m.role === 'user' ? '👤 Cliente' : '🤖 Bot'}: ${m.content}`
  ).join('\n\n')

  return datos
}

// Función para enviar email con los datos de cotización
const enviarEmailCotizacion = async (datos) => {
  const serviceId = import.meta.env.VITE_EMAIL_SERVICE
  const templateId = import.meta.env.VITE_EMAIL_COTIZADOR
  const userId = import.meta.env.VITE_EMAIL_USER
  
  if (!serviceId || !templateId || !userId) {
    return false
  }
  
  try {
    await emailjs.send(serviceId, templateId, datos, userId)
    return true
  } catch (error) {
    return false
  }
}

// Pasos del proceso de cotización y emisión estilo Lemonade
const PROGRESS_STEPS = [
  { id: 1, label: 'Tipo de Seguro', icon: '🎯' },
  { id: 2, label: 'Tus Datos', icon: '👤' },
  { id: 3, label: 'Detalles', icon: '📋' },
  { id: 4, label: 'Cotización', icon: '💰' },
  { id: 5, label: 'Emisión', icon: '✅' },
]

// Quick replies contextuales según la etapa
const CONTEXTUAL_REPLIES = {
  initial: [
    { text: '🛡️ Accidentes Personales', action: 'cotizar_ap' },
    { text: '⚱️ Servicio Funerario', action: 'cotizar_funerario' },
    { text: '💚 Póliza de Vida', action: 'cotizar_vida' },
    { text: '🚗 RCV (Vehículos)', action: 'cotizar_rcv' },
  ],
  datos_personales: [
    { text: '✅ Tengo cédula venezolana', action: 'cedula_v' },
    { text: '🌍 Soy extranjero', action: 'cedula_e' },
  ],
  confirmacion: [
    { text: '✅ Sí, es correcto', action: 'confirmar' },
    { text: '✏️ Corregir datos', action: 'corregir' },
  ],
  aceptar_precio: [
    { text: '✅ Sí, continuar con emisión', action: 'continuar_emision' },
    { text: '🔄 Ver otras opciones', action: 'otras_opciones' },
    { text: '❌ No por ahora', action: 'cancelar' },
  ],
  emision: [
    { text: '✅ Confirmar emisión', action: 'confirmar_emision' },
    { text: '📞 Hablar con asesor', action: 'asesor' },
  ],
  genero: [
    { text: '👨 Masculino', action: 'masculino' },
    { text: '👩 Femenino', action: 'femenino' },
  ],
  pago: [
    { text: '💵 Pago de contado', action: 'contado' },
    { text: '📅 Pago financiado', action: 'financiado' },
  ],
}

// Función para extraer botones del mensaje [Opción1] [Opción2]
const extractButtonsFromMessage = (message) => {
  const regex = /\[([^\]]+)\]/g
  const matches = []
  let match
  while ((match = regex.exec(message)) !== null) {
    matches.push(match[1])
  }
  // Solo devolver si hay 2 o más opciones
  if (matches.length >= 2) {
    return matches.map(text => ({ text, action: 'dynamic' }))
  }
  return null
}

function ChatbotEmbedded() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [contextualReplies, setContextualReplies] = useState(CONTEXTUAL_REPLIES.initial)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [showAddressMap, setShowAddressMap] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(false) // Para no volver a mostrar botones iniciales
  const [ramoActivo, setRamoActivo] = useState(null) // 'automovil' | 'personas' | 'patrimoniales' | null
  // Evita insertar varias filas en `cotizaciones` si el bot re-envía la tabla
  // de precios en la misma sesión (por ejemplo si el usuario hace una pregunta
  // intermedia y el bot vuelve a mostrar la cotización).
  const [cotizacionPreciosGuardada, setCotizacionPreciosGuardada] = useState(false)
  // Evita insertar varias filas en la tabla del ramo si el usuario hace click
  // en más de un botón de pago en la misma sesión.
  const [emisionGuardada, setEmisionGuardada] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    // Scroll solo dentro del contenedor, no en la página
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Verificar si hay contexto guardado (viene de una tarjeta de aseguradora)
    const savedContext = sessionStorage.getItem('chatbot_context')
    
    if (savedContext) {
      const context = JSON.parse(savedContext)
      sessionStorage.removeItem('chatbot_context') // Limpiar después de usar

      // Activar ramo desde contexto (tarjeta de aseguradora)
      const ramoNormalizado = normalizarRamo(context.ramo)
      if (ramoNormalizado) setRamoActivo(ramoNormalizado)

      const ramoTexto = {
        'auto': 'seguro de auto',
        'personas': 'seguro de personas/vida',
        'patrimoniales': 'seguro patrimonial'
      }[context.ramo] || context.ramo
      
      // Mensaje personalizado según el contexto
      setMessages([
        {
          role: 'assistant',
          content: `¡Hola! 👋 Soy **MaxProtect**, tu asesor de seguros virtual de FFC Consultants.\n\nVeo que te interesa cotizar un **${ramoTexto}** con **${context.aseguradora}**. ¡Excelente elección! 🎉\n\nComencemos con la cotización...`,
        },
      ])
      
      // Enviar automáticamente el mensaje de interés después de un breve delay.
      // Pasamos ramoNormalizado explícito porque el closure captura ramoActivo=null al montar.
      setTimeout(() => {
        const autoMessage = `Quiero cotizar un ${ramoTexto} con ${context.aseguradora}`
        sendMessage(autoMessage, ramoNormalizado ?? undefined)
      }, 1500)
    } else {
      // Mensaje de bienvenida normal
      setMessages([
        {
          role: 'assistant',
          content: '¡Hola! 👋 Soy **MaxProtect**, tu asesor de seguros virtual de FFC Consultants.\n\nEstoy aquí para ayudarte a cotizar el seguro perfecto para ti. Cuéntame, ¿qué tipo de seguro te interesa?',
        },
      ])
    }
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (text, ramoOverride) => {
    if (!text.trim()) return
    // ramoOverride permite forzar el ramo en la misma tick que se hizo setRamoActivo,
    // evitando el problema de stale state al hacer clic en un botón inicial.
    const ramoParaEsteEnvio = ramoOverride !== undefined ? ramoOverride : ramoActivo

    const userMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue('')
    setIsLoading(true)
    setShowQuickReplies(false)

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          ramo: ramoParaEsteEnvio, // 🎯 segmenta la KB del bot por ramo
        }),
      })

      const data = await response.json()

      if (data.success) {
        const updatedMessages = [...newMessages, { role: 'assistant', content: data.message }]
        setMessages(updatedMessages)
        detectStep(data.message)

        // 🎯 Detectar si el bot acaba de mostrar la TABLA DE COTIZACIÓN con precios.
        //    Si es así, guardamos en `cotizaciones` AUTOMÁTICAMENTE (sin esperar
        //    a que el usuario haga clic en una aseguradora). Esto captura a los
        //    leads que abandonan justo después de ver los precios.
        const msgLower = data.message.toLowerCase()
        const muestraCotizacion =
          (msgLower.includes('aseguradora') && msgLower.includes('deseas continuar')) ||
          (msgLower.includes('precio mensual') && msgLower.includes('precio anual')) ||
          (msgLower.includes('cotización') && msgLower.includes('comparativa'))

        if (muestraCotizacion && !cotizacionPreciosGuardada) {
          const datos = extraerDatosDelChat(updatedMessages, ramoParaEsteEnvio)
          datos.etapa = 'Cotización - Precios mostrados'
          datos.historial_chat = updatedMessages.map(m => `${m.role}: ${m.content}`).join('\n')
          await guardarCotizacion(datos)
          setCotizacionPreciosGuardada(true)
        }

        // Guardar automáticamente cuando el bot envía mensaje de finalización
        if (data.message.toLowerCase().includes('asesor de ventas te contactará') || 
            data.message.toLowerCase().includes('asesor te contactará') ||
            data.message.toLowerCase().includes('hemos recibido toda tu información')) {
          const datos = extraerDatosDelChat(updatedMessages, ramoParaEsteEnvio)
          datos.etapa = 'Finalizado - Pendiente pago'
          datos.historial_chat = updatedMessages.map(m => `${m.role}: ${m.content}`).join('\n')
          
          // Enviar email y guardar en Supabase como COTIZACIÓN pendiente (el pago aún no se confirmó)
          const enviado = await enviarEmailCotizacion(datos)
          const guardado = await guardarCotizacion(datos)
          
          // Generar fecha de expiración (hoy)
          const hoy = new Date()
          const fechaExp = `${hoy.getDate().toString().padStart(2, '0')}/${(hoy.getMonth() + 1).toString().padStart(2, '0')}/${hoy.getFullYear()}`
          
          // Mostrar datos de pago en el chat
          const mensajePago = `
💳 **¡Perfecto! Ahora solo falta el pago para emitir tu póliza.**

📋 **Resumen:**
• Producto: ${datos.producto || 'Seguro'}
• Aseguradora: ${datos.aseguradora || 'Por confirmar'}
• Prima: ${datos.precio_mensual || datos.precio_anual || 'Por confirmar'}

---

🏦 **Datos para transferencia:**

• **Banco:** Banco Mercantil
• **Cuenta:** 0105-0123-45-1234567890
• **Tipo:** Corriente
• **Titular:** Future Financial Consultants, C.A.
• **RIF:** J-30492843-2
• **Concepto:** Póliza - ${datos.cedula || 'Tu cédula'}

---

📱 **Pago Móvil:**
• **Teléfono:** 0412-1234567
• **Banco:** 0105 (Mercantil)
• **Cédula:** J-30492843-2

---

⏰ Este enlace expira hoy **${fechaExp}** a las **11:59 p.m.**

📲 **Una vez realizado el pago**, envía tu comprobante por WhatsApp y emitiremos tu póliza de inmediato.
`
          
          // Agregar mensaje de pago después del mensaje del bot
          setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: mensajePago }])
            // Mostrar botones de pago
            setContextualReplies([
              { text: '💳 Pago Inmediato', action: 'pago_inmediato' },
              { text: '📲 Enviar comprobante por WhatsApp', action: 'enviar_comprobante_whatsapp' },
            ])
            setShowQuickReplies(true)
          }, 2000)
          
          // Mostrar confirmación
          if (enviado || guardado.success) {
            Swal.fire({
              title: '✅ ¡Casi listo!',
              text: 'Revisa los datos de pago en el chat para finalizar.',
              icon: 'success',
              timer: 4000,
              timerProgressBar: true,
            })
          }
        }
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'Lo siento, hubo un problema. ¿Puedes intentar de nuevo? 🙏',
          },
        ])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'No pude conectarme. Por favor verifica tu conexión e intenta de nuevo.',
        },
      ])
    } finally {
      setIsLoading(false)
      // Mantener el focus en el input después de enviar
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickReply = async (reply) => {
    // SIEMPRE ocultar botones después de hacer clic (tanto dinámicos como fijos)
    setContextualReplies([])
    setShowQuickReplies(false)
    
    // Acción: Pago Inmediato - redirigir a página de pago
    if (reply.action === 'pago_inmediato') {
      // 🎯 El lead pasó de COTIZACIÓN a EMISIÓN: insertar en la tabla del ramo.
      if (!emisionGuardada) {
        const datos = extraerDatosDelChat(messages, ramoActivo)
        datos.etapa = 'Emisión - Pago iniciado'
        datos.historial_chat = messages.map(m => `${m.role}: ${m.content}`).join('\n')
        await guardarConversacion(datos)
        setEmisionGuardada(true)
      }
      window.open('/pagar', '_blank')
      return
    }
    
    // Acción: Enviar comprobante por WhatsApp
    if (reply.action === 'enviar_comprobante_whatsapp') {
      const datos = extraerDatosDelChat(messages, ramoActivo)

      // 🎯 El lead envía comprobante = emisión confirmada. Si todavía no se
      //    guardó en la tabla del ramo (porque no pasó por "pago inmediato"),
      //    lo insertamos ahora.
      if (!emisionGuardada) {
        const datosEmision = {
          ...datos,
          etapa: 'Emisión - Comprobante enviado',
          historial_chat: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        }
        await guardarConversacion(datosEmision)
        setEmisionGuardada(true)
      }

      const mensaje = `Hola, acabo de realizar el pago de mi póliza.\n\n` +
        `📋 Datos:\n` +
        `• Nombre: ${datos.nombre || 'Por confirmar'}\n` +
        `• Cédula: ${datos.cedula || 'Por confirmar'}\n` +
        `• Producto: ${datos.producto || 'Seguro'}\n` +
        `• Aseguradora: ${datos.aseguradora || 'Por confirmar'}\n\n` +
        `Adjunto mi comprobante de pago.`
      const telefono = '584121234567' // Número de WhatsApp de FFC
      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
      window.open(url, '_blank')
      
      // Agregar mensaje de confirmación en el chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '✅ ¡Perfecto! Te hemos redirigido a WhatsApp para que envíes tu comprobante. Un asesor verificará tu pago y emitirá tu póliza de inmediato. ¡Gracias por confiar en nosotros! 🎉' 
      }])
      return
    }
    
    // Marcar producto seleccionado si aplica + activar ramo correspondiente
    let ramoSeleccionadoAhora = null
    if (['cotizar_ap', 'cotizar_funerario', 'cotizar_vida', 'cotizar_rcv', 'cotizar_hogar'].includes(reply.action)) {
      setProductoSeleccionado(true)
      const ramo = PRODUCTO_A_RAMO[reply.action]
      if (ramo) {
        setRamoActivo(ramo)
        ramoSeleccionadoAhora = ramo
      }
    }
    
    // Detectar si seleccionó aseguradora (botón dinámico) - enviar email y guardar en Supabase
    const aseguradoras = ['pirámide', 'piramide', 'oceánica', 'oceanica', 'estar', 'real']
    const textoBoton = reply.text?.toLowerCase() || ''
    if (aseguradoras.some(a => textoBoton.includes(a))) {
      // Extraer datos y enviar email + guardar en Supabase como COTIZACIÓN
      const datos = extraerDatosDelChat(messages, ramoSeleccionadoAhora ?? ramoActivo)
      datos.etapa = 'Cotización - Aseguradora seleccionada'
      datos.aseguradora = reply.text
      datos.historial_chat = messages.map(m => `${m.role}: ${m.content}`).join('\n')
      
      // Enviar email y guardar en tabla `cotizaciones` (embudo de seguimiento)
      await enviarEmailCotizacion(datos)
      await guardarCotizacion(datos)
    }
    
    // Si confirma emisión, enviar email, guardar y mostrar datos de pago
    if (reply.action === 'confirmar_emision') {
      const datos = extraerDatosDelChat(messages, ramoActivo)
      datos.etapa = 'Emisión - Confirmada'
      datos.historial_chat = messages.map(m => `${m.role}: ${m.content}`).join('\n')
      
      // Enviar email
      const enviado = await enviarEmailCotizacion(datos)
      
      // Guardar en Supabase
      const guardado = await guardarConversacion(datos)
      
      // Generar fecha de expiración (hoy)
      const hoy = new Date()
      const fechaExp = `${hoy.getDate().toString().padStart(2, '0')}/${(hoy.getMonth() + 1).toString().padStart(2, '0')}/${hoy.getFullYear()}`
      
      // Mostrar datos de pago en el chat
      const mensajePago = `
✅ **¡Tu solicitud ha sido registrada!**

📋 **Resumen de tu póliza:**
• Producto: ${datos.producto || 'Seguro'}
• Aseguradora: ${datos.aseguradora || 'Por confirmar'}
• Prima: ${datos.precio_mensual || datos.precio_anual || 'Por confirmar'}

---

🏦 **Datos para realizar el pago:**

**Banco:** Banco Mercantil
**Cuenta:** 0105-0123-45-1234567890
**Tipo:** Corriente
**Titular:** Future Financial Consultants, C.A.
**RIF:** J-30492843-2
**Concepto:** Póliza - ${datos.cedula || 'Tu cédula'}

---

⏰ Este enlace de pago expira hoy **${fechaExp}** a las **11:59 p.m.**

📲 Una vez realizado el pago, envía el comprobante por WhatsApp y un asesor verificará tu pago y emitirá tu póliza.

[Enviar comprobante por WhatsApp] [Ver otras opciones de pago]
`
      
      // Agregar mensaje de pago al chat
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: mensajePago }])
      }, 1500)
      
      if (enviado || guardado.success) {
        Swal.fire({
          title: '✅ ¡Listo para pagar!',
          text: 'Revisa los datos de pago en el chat.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
        })
      }
    }
    
    const messageMap = {
      cotizar_ap: 'Quiero cotizar un seguro de Accidentes Personales',
      cotizar_funerario: 'Me interesa un Servicio Funerario',
      cotizar_vida: 'Quiero cotizar una Póliza de Vida',
      cotizar_rcv: 'Necesito cotizar un RCV para mi vehículo',
      asesor: 'Quiero hablar con un asesor humano',
      cedula_v: 'Tengo cédula venezolana',
      cedula_e: 'Soy extranjero',
      confirmar: 'Sí, es correcto',
      corregir: 'Necesito corregir mis datos',
      masculino: 'Masculino',
      femenino: 'Femenino',
      contado: 'Prefiero pago de contado',
      financiado: 'Prefiero pago financiado',
      continuar_emision: 'Sí, quiero continuar con la emisión de mi póliza',
      otras_opciones: 'Me gustaría ver otras opciones de cobertura',
      cancelar: 'No por ahora, gracias',
      confirmar_emision: 'Confirmo que deseo emitir mi póliza',
    }
    // Si se acaba de seleccionar el ramo en este mismo handler, lo pasamos
    // explícitamente para evitar leer el state "viejo" en sendMessage.
    sendMessage(messageMap[reply.action] || reply.text, ramoSeleccionadoAhora ?? undefined)
  }

  // Detectar el paso actual basado en el contenido del mensaje
  const detectStep = (message) => {
    const content = message.toLowerCase()
    
    // PRIMERO: Detectar botones dinámicos [Opción1] [Opción2] en el mensaje
    const dynamicButtons = extractButtonsFromMessage(message)
    if (dynamicButtons && dynamicButtons.length >= 2) {
      setContextualReplies(dynamicButtons)
      setShowQuickReplies(true)
    }
    
    // Paso 5: Emisión - cuando pide DIRECCIÓN (estado, ciudad, etc.)
    // NO mostrar mapa automáticamente - dejar que el usuario lea la pregunta primero
    if (content.includes('¿en qué estado') || content.includes('estado resides') || content.includes('dirección completa')) {
      setCurrentStep(5)
      if (!dynamicButtons) setContextualReplies([])
      // Mapa desactivado - el usuario debe leer la pregunta primero
      // setShowAddressMap solo se activa si el usuario lo pide
      return
    }
    // Paso 5: Otros datos de emisión
    if (content.includes('datos adicionales') || content.includes('15-20 minutos') || content.includes('inspección física') || content.includes('serial') || content.includes('placa')) {
      setCurrentStep(5)
      if (!dynamicButtons) setContextualReplies([])
      return
    }
    // Paso 4: Cotización - cuando muestra precio con símbolo $
    else if ((content.includes('$') && content.includes('mes')) || (content.includes('precio') && content.includes('$'))) {
      setCurrentStep(4)
      if (!dynamicButtons) setContextualReplies(CONTEXTUAL_REPLIES.aceptar_precio)
    }
    // Paso 1: Tipo de seguro - inicio (solo mostrar botones iniciales si NO ha seleccionado producto)
    else if (content.includes('qué tipo de seguro') || content.includes('cuéntame') || content.includes('¿qué seguro')) {
      setCurrentStep(1)
      if (!dynamicButtons && !productoSeleccionado) setContextualReplies(CONTEXTUAL_REPLIES.initial)
    }
    // Paso 1: Selección de cobertura
    else if (content.includes('tipo de cobertura') || content.includes('qué cobertura')) {
      setCurrentStep(1)
      // Los botones dinámicos ya están configurados arriba
    }
    // Paso 2: Datos personales
    else if (content.includes('nombre completo') || content.includes('tu nombre') || content.includes('nombres y apellidos')) {
      setCurrentStep(2)
      if (!dynamicButtons) setContextualReplies([])
    } else if (content.includes('cédula') || content.includes('teléfono') || content.includes('correo')) {
      setCurrentStep(2)
      if (!dynamicButtons) setContextualReplies([])
    } else if (content.includes('sexo') || content.includes('género')) {
      setCurrentStep(2)
      if (!dynamicButtons) setContextualReplies(CONTEXTUAL_REPLIES.genero)
    } 
    // Paso 3: Detalles del seguro/vehículo
    else if (content.includes('fecha de nacimiento') || content.includes('marca') || content.includes('modelo') || content.includes('año')) {
      setCurrentStep(3)
      if (!dynamicButtons) setContextualReplies([])
    } else if (content.includes('0km') || content.includes('0 kilómetros') || content.includes('usado')) {
      setCurrentStep(3)
      // Los botones dinámicos ya están configurados
    } else if (content.includes('tipo de pago') || content.includes('frecuencia')) {
      setCurrentStep(3)
      // Los botones dinámicos ya están configurados
    } else if (content.includes('confirma') || content.includes('correcto') || content.includes('resumen')) {
      setCurrentStep(3)
      if (!dynamicButtons) setContextualReplies(CONTEXTUAL_REPLIES.confirmacion)
    } else if (content.includes('gracias') || content.includes('encuesta')) {
      setCurrentStep(5)
      if (!dynamicButtons) setContextualReplies([])
    }
    setShowQuickReplies(true)
  }

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  }

  // Manejar confirmación de dirección desde el mapa
  const handleAddressConfirm = (address) => {
    setShowAddressMap(false)
    sendMessage(address)
  }

  // Cancelar selección de dirección
  const handleAddressCancel = () => {
    setShowAddressMap(false)
  }

  return (
    <>
      {/* Modal del mapa de dirección */}
      {showAddressMap && (
        <AddressMapPicker 
          onConfirm={handleAddressConfirm}
          onCancel={handleAddressCancel}
        />
      )}
    <div 
      className="w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        border: '2px solid #3146b4',
        height: '750px',
        maxHeight: '85vh'
      }}
    >
      {/* Header con barra de progreso estilo Lemonade */}
      <div style={{ backgroundColor: '#3146b4', color: '#ffffff' }}>
        {/* Info del asistente */}
        <div className="p-4 flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">🤖</span>
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">MaxProtect</h3>
            <p className="text-sm" style={{ color: '#a5b4fc' }}>
              Tu asesor virtual de seguros
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium hidden sm:inline">En línea</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            {PROGRESS_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentStep >= step.id
                        ? 'bg-white text-primary'
                        : 'bg-white/20 text-white/60'
                    }`}
                    animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {currentStep > step.id ? (
                      <FiCheck className="text-green-500" />
                    ) : (
                      <span>{step.icon}</span>
                    )}
                  </motion.div>
                  <span className={`text-[10px] mt-1 whitespace-nowrap hidden sm:block ${
                    currentStep >= step.id ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < PROGRESS_STEPS.length - 1 && (
                  <div className="flex-1 mx-2 h-1 rounded-full overflow-hidden bg-white/20">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: '0%' }}
                      animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ backgroundColor: '#f9fafb' }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {msg.role === 'assistant' && (
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md"
                style={{ 
                  background: '#3146b4',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <span className="text-lg">🤖</span>
              </motion.div>
            )}
            <motion.div
              className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={
                msg.role === 'user'
                  ? {
                      background: '#3146b4',
                      color: '#ffffff',
                      borderBottomRightRadius: '4px',
                      boxShadow: '0 4px 12px rgba(49, 70, 180, 0.3)',
                    }
                  : {
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      borderBottomLeftRadius: '4px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }
              }
              whileHover={{ scale: 1.01 }}
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
            {msg.role === 'user' && (
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center ml-2 flex-shrink-0 shadow-md"
                style={{ 
                  background: '#3146b4',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <FiUser className="text-white text-lg" />
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Typing Indicator mejorado */}
        {isLoading && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md"
              style={{ 
                background: '#3146b4',
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-lg">🤖</span>
            </motion.div>
            <div
              className="px-5 py-4 rounded-2xl rounded-bl-md"
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">MaxProtect está escribiendo</span>
                <div className="flex gap-1">
                  <motion.span
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Replies Contextuales con animación */}
        <AnimatePresence>
          {showQuickReplies && messages.length > 0 && contextualReplies.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 pt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {contextualReplies.map((reply, index) => (
                <motion.button
                  key={`${reply.action}-${index}-${reply.text}`}
                  onClick={() => handleQuickReply(reply)}
                  className="px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#3146b4',
                    border: '2px solid #3146b4',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#3146b4', color: '#ffffff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {reply.text}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area mejorado */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t flex gap-3 items-center"
        style={{ 
          borderColor: '#e5e7eb', 
          backgroundColor: '#ffffff',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
            className="w-full px-5 py-3.5 rounded-full border-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            style={{ borderColor: '#e5e7eb' }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="p-3.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ 
            background: '#3146b4',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(49, 70, 180, 0.3)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiSend size={20} />
        </motion.button>
      </form>
    </div>
    </>
  )
}

export default ChatbotEmbedded
