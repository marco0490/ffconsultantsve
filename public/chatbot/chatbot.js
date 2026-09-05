// ==========================================
// CONFIGURACIÓN - PERSONALIZA AQUÍ
// ==========================================

const CONFIG = {
  botName: "MaxProtect",
  botAvatar: "💬",
  companyName: "Aseguradora Digital",
  phone: "+58 412-9713806",
  email: "ffconsultantsve@outlook.com",
  whatsapp: "https://wa.me/584129713806",
  colors: {
    primary: "#3b5998",
    secondary: "#667eea",
  },
}

// Base de conocimiento de seguros - FFC Consultants
const ASEGURADORAS = {
  caracas: {
    id: "seguros-caracas",
    nombre: "Seguros Caracas",
    icono: "🦁",
  },
  estar: {
    id: "estar-seguros",
    nombre: "Estar Seguros",
    icono: "🛡️",
  },
  real: {
    id: "real-seguros",
    nombre: "Real Seguros",
    icono: "✅",
  },
}

// Coberturas genéricas por producto (comunes a las 3 aseguradoras aliadas).
const COBERTURAS_AUTO = [
  { value: "cobertura-amplia", label: "Cobertura Amplia" },
  { value: "perdida-total", label: "Pérdida Total" },
  { value: "rcv-basica", label: "RCV Básica" },
  { value: "rcv-basica-placa-extranjera", label: "RCV Básica Placa Extranjera" },
  { value: "rcv-basica-taxi", label: "RCV Básica (Taxi)" },
  { value: "rcv-internacional-colombia-venezuela", label: "RCV Internacional (Colombia-Venezuela)" },
  { value: "rcv-exceso-5000-grua", label: "RCV Exceso US$ 5.000 + Grúa" },
]

const COBERTURAS_PERSONAS = [
  { value: "hcm-50k", label: "HCM S.A. US$ 50.000" },
  { value: "hcm-100k", label: "HCM S.A. US$ 100.000" },
  { value: "hcm-200k", label: "HCM S.A. US$ 200.000" },
  { value: "accidentes-personales", label: "Accidentes Personales" },
  { value: "emergencias-medicas", label: "Emergencias Médicas" },
  { value: "servicios-funerarios", label: "Servicios Funerarios" },
  { value: "vida", label: "Vida" },
  { value: "pago-unico-cancer", label: "Pago Único por Cáncer" },
  { value: "viajes", label: "Viajes" },
]

const COBERTURAS_HOGAR = [
  { value: "hogar-20k", label: "Hogar US$ 20.000" },
  { value: "hogar-60k", label: "Hogar US$ 60.000" },
  { value: "hogar-100k", label: "Hogar US$ 100.000" },
  { value: "hogar-150k", label: "Hogar US$ 150.000" },
  { value: "hogar-200k", label: "Hogar US$ 200.000" },
  { value: "hogar-300k", label: "Hogar US$ 300.000" },
]

// Construye el bloque `aseguradoras` con la misma lista de coberturas para las 3 aliadas.
function aseguradorasCon(coberturas, precios) {
  return {
    caracas: { coberturas, precioDesde: precios && precios.caracas },
    estar: { coberturas, precioDesde: precios && precios.estar },
    real: { coberturas, precioDesde: precios && precios.real },
  }
}

const KNOWLEDGE_BASE = {
  seguros: {
    auto: {
      id: "auto",
      nombre: "Seguro de Automóvil",
      icono: "🚗",
      descripcion: "Protección completa para tu vehículo con cobertura nacional y asistencia 24/7",
      aseguradoras: aseguradorasCon(COBERTURAS_AUTO, { caracas: 38, estar: 36, real: 34 }),
    },
    vida: {
      id: "vida",
      nombre: "Seguro de Vida",
      icono: "❤️",
      descripcion: "Seguridad financiera para tu familia - Ramo Personas",
      ramo: "personas",
      aseguradoras: aseguradorasCon(COBERTURAS_PERSONAS),
    },
    hogar: {
      id: "hogar",
      nombre: "Seguro de Hogar",
      icono: "🏠",
      descripcion: "Protege tu patrimonio contra todo tipo de riesgos - Ramo Patrimoniales",
      ramo: "patrimoniales",
      aseguradoras: aseguradorasCon(COBERTURAS_HOGAR),
    },
    salud: {
      id: "salud",
      nombre: "Seguro de Salud",
      icono: "🏥",
      descripcion: "Acceso a la mejor red médica - Ramo Personas",
      ramo: "personas",
      aseguradoras: aseguradorasCon(COBERTURAS_PERSONAS),
    },
  },
}

// Estado de la conversación
const state = {
  currentFlow: null,
  step: 0,
  data: {},
  history: [],
}

// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    showWelcome()
  }, 500)

  const input = document.getElementById("userInput")
  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  const sendBtn = document.getElementById("sendBtn")
  if (sendBtn) {
    sendBtn.addEventListener("click", () => sendMessage())
  }
})

function showWelcome() {
  showTyping()

  setTimeout(() => {
    hideTyping()

    const welcomeHTML = `
            <div class="welcome-message">
                <h2>¡Hola! Soy ${CONFIG.botName} ${CONFIG.botAvatar}</h2>
                <p>Tu asesor de seguros en FFC Consultants 24/7</p>
            </div>
            <p style="margin-top: 10px;">Estoy aquí para ayudarte a proteger lo que más valoras. ¿Qué necesitas hoy?</p>
        `

    addBotMessage(welcomeHTML, true)

    showQuickReplies(["🔍 Cotizar un seguro", "👨‍💼 Contactar asesor", "❓ Información general"])
  }, 800)
}

// Enviar mensaje
function sendMessage() {
  const input = document.getElementById("userInput")
  const message = input.value.trim()

  if (message) {
    addUserMessage(message)
    input.value = ""
    processMessage(message)
  }
}

// Procesar mensaje del usuario
function processMessage(message) {
  const lowerMsg = message.toLowerCase()

  showTyping()

  if (state.currentFlow) {
    handleFlow(message)
    return
  }

  setTimeout(
    () => {
      hideTyping()

      if (containsAny(lowerMsg, ["hola", "buenas", "hey", "hi"])) {
        showWelcome()
      } else if (containsAny(lowerMsg, ["cotizar", "precio", "cuanto", "costo", "presupuesto"])) {
        startQuoteFlow()
      } else if (containsAny(lowerMsg, ["comparar", "diferencia", "versus", "vs"])) {
        showComparison()
      } else if (containsAny(lowerMsg, ["reclamo", "siniestro", "accidente", "denuncia"])) {
        startClaimFlow()
      } else if (containsAny(lowerMsg, ["auto", "carro", "vehiculo", "moto"])) {
        showInsuranceDetails("auto")
      } else if (containsAny(lowerMsg, ["vida", "fallecimiento", "invalidez"])) {
        showInsuranceDetails("vida")
      } else if (containsAny(lowerMsg, ["casa", "hogar", "departamento", "vivienda"])) {
        showInsuranceDetails("hogar")
      } else if (containsAny(lowerMsg, ["salud", "medico", "hospital", "enfermedad"])) {
        showInsuranceDetails("salud")
      } else if (containsAny(lowerMsg, ["agente", "persona", "humano", "asesor"])) {
        escalateToHuman()
      } else if (containsAny(lowerMsg, ["gracias", "ok", "perfecto", "genial"])) {
        addBotMessage("¡Con mucho gusto! 😊 ¿Hay algo más en lo que pueda ayudarte?")
        showQuickReplies(["Sí, otra consulta", "No, gracias"])
      } else if (containsAny(lowerMsg, ["adios", "hasta luego", "chao", "bye"])) {
        addBotMessage(`¡Hasta luego! Recuerda que estoy aquí 24/7 cuando me necesites. ¡Que tengas un excelente día! 🛡️`)
      } else {
        addBotMessage("Entiendo. Para ayudarte mejor, elige una de estas opciones:")
        showQuickReplies(["🔍 Cotizar seguro", "📋 Comparar pólizas", "📄 Consultar reclamo", "👨‍💼 Hablar con asesor"])
      }
    },
    600 + Math.random() * 400,
  )
}

// ==========================================
// FLUJOS DE CONVERSACIÓN
// ==========================================

function startQuoteFlow() {
  state.currentFlow = "quote"
  state.step = 1
  state.data = {}

  addBotMessage("¡Excelente! Voy a ayudarte con tu cotización. ¿Qué tipo de seguro te interesa?")

  showQuickReplies(["🚗 Automóvil", "❤️ Vida", "🏠 Hogar", "🏥 Salud"])
}

function handleFlow(message) {
  const flow = state.currentFlow
  const step = state.step

  if (flow === "quote") {
    handleQuoteFlow(message, step)
  } else if (flow === "quoteConfirm") {
    handleQuoteConfirmFlow(message)
  } else if (flow === "claim") {
    handleClaimFlow(message, step)
  } else if (flow === "lead") {
    handleLeadFlow(message, step)
  }
}

// Flujo de confirmación de cotización (genérico)
function handleQuoteConfirmFlow(message) {
  const lowerMsg = message.toLowerCase()
  const tipo = state.data.tipo
  
  // Mapeo de tipo a producto para el cotizador
  const productoMap = {
    auto: "auto",
    vida: "personas",
    salud: "personas",
    hogar: "patrimoniales"
  }
  
  if (lowerMsg.includes("sí") || lowerMsg.includes("si") || lowerMsg.includes("solicitar")) {
    // Redirigir al cotizador web
    const asegSel = ASEGURADORAS[state.data.aseguradora]
    const aseguradora = (asegSel && asegSel.id) || "real-seguros"
    const producto = productoMap[tipo] || tipo
    const url = `/cotizar?aseguradora=${aseguradora}&producto=${producto}`
    
    const html = `
      <p>✅ <strong>¡Perfecto!</strong></p>
      <p>Para completar tu solicitud, te redirijo a nuestro cotizador:</p>
      <div style="margin-top: 10px;">
        <a href="${url}" target="_top" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold;">📝 Ir al Cotizador</a>
      </div>
      <p style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">También puedes contactarnos por WhatsApp:</p>
      <div style="margin-top: 5px;">
        <a href="${CONFIG.whatsapp}" target="_blank" style="display: inline-block; background: #25D366; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 0.85rem;">📱 WhatsApp</a>
      </div>
    `
    addBotMessage(html, true)
    showQuickReplies(["🔄 Nueva cotización", "❓ Otra consulta"])
    state.currentFlow = null
  } else if (lowerMsg.includes("cambiar") || lowerMsg.includes("cobertura")) {
    state.currentFlow = "quote"
    state.step = 3
    showCoberturasSelection()
  } else if (lowerMsg.includes("asesor") || lowerMsg.includes("hablar")) {
    escalateToHuman()
  } else if (lowerMsg.includes("más") || lowerMsg.includes("opciones")) {
    // Mostrar más coberturas
    showMoreCoberturas()
  } else {
    addBotMessage("¿Qué te gustaría hacer?")
    showQuickReplies(["✅ Sí, solicitar cotización", "🔄 Cambiar cobertura", "📞 Hablar con asesor"])
  }
}

// Mostrar más coberturas
function showMoreCoberturas() {
  const tipo = state.data.tipo
  const aseguradora = state.data.aseguradora
  const seguro = KNOWLEDGE_BASE.seguros[tipo]
  const coberturas = seguro.aseguradoras[aseguradora].coberturas
  
  if (coberturas.length > 6) {
    const coberturasLabels = coberturas.slice(6).map(c => c.label)
    coberturasLabels.push("⬅️ Ver anteriores")
    showQuickReplies(coberturasLabels)
  }
}

function handleQuoteFlow(message, step) {
  // Paso 1: Seleccionar tipo de seguro
  if (step === 1) {
    const tipo = detectInsuranceType(message)
    if (tipo) {
      state.data.tipo = tipo
      const seguro = KNOWLEDGE_BASE.seguros[tipo]
      state.step = 2
      addBotMessage(`${seguro.icono} ${seguro.nombre}. ¿Con qué aseguradora te gustaría cotizar?`)
      showQuickReplies(["🦁 Seguros Caracas", "🛡️ Estar Seguros", "✅ Real Seguros"])
    }
    return
  }

  // Paso 2: Seleccionar aseguradora (para todos los tipos)
  if (step === 2) {
    const lowerMsg = message.toLowerCase()
    if (lowerMsg.includes("caracas")) {
      state.data.aseguradora = "caracas"
    } else if (lowerMsg.includes("estar")) {
      state.data.aseguradora = "estar"
    } else if (lowerMsg.includes("real")) {
      state.data.aseguradora = "real"
    } else {
      addBotMessage("Por favor selecciona una aseguradora:")
      showQuickReplies(["🦁 Seguros Caracas", "🛡️ Estar Seguros", "✅ Real Seguros"])
      return
    }
    
    state.step = 3
    showCoberturasSelection()
    return
  }

  // Paso 3: Seleccionar cobertura
  if (step === 3) {
    state.data.cobertura = message
    state.step = 4
    showQuoteResult()
    return
  }
}

// Mostrar selección de coberturas (genérico)
function showCoberturasSelection() {
  const tipo = state.data.tipo
  const aseguradora = state.data.aseguradora
  const asegInfo = ASEGURADORAS[aseguradora]
  const seguro = KNOWLEDGE_BASE.seguros[tipo]
  const coberturas = seguro.aseguradoras[aseguradora].coberturas
  
  const html = `
    <p>${asegInfo.icono} <strong>${asegInfo.nombre}</strong></p>
    <p style="margin-top: 8px;">Selecciona la cobertura para tu ${seguro.nombre}:</p>
  `
  addBotMessage(html, true)
  
  // Mostrar coberturas como botones (máximo 6 para no saturar)
  const coberturasLabels = coberturas.slice(0, 6).map(c => c.label)
  if (coberturas.length > 6) {
    coberturasLabels.push("📝 Ver más opciones")
  }
  showQuickReplies(coberturasLabels)
}

// Mostrar resultado de cotización (genérico)
function showQuoteResult() {
  const tipo = state.data.tipo
  const aseguradora = state.data.aseguradora
  const cobertura = state.data.cobertura
  const asegInfo = ASEGURADORAS[aseguradora]
  const seguro = KNOWLEDGE_BASE.seguros[tipo]
  
  // Mapeo de tipo a producto para el cotizador
  const productoMap = {
    auto: "auto",
    vida: "personas",
    salud: "personas",
    hogar: "patrimoniales"
  }
  
  // Precio solo para auto, otros "Consultar"
  const precioInfo = tipo === "auto" 
    ? `<div class="price-tag">Desde $${seguro.aseguradoras[aseguradora].precioDesde}/mes</div>`
    : `<div class="price-tag">Consultar precio</div>`
  
  const quoteHTML = `
    <div style="text-align: center; margin-bottom: 10px;">
      <span style="font-size: 2rem;">${seguro.icono}</span>
    </div>
    <p><strong>¡Cotización de ${seguro.nombre}!</strong></p>
    <div class="insurance-card">
      <h4>${asegInfo.icono} ${asegInfo.nombre}</h4>
      <p><strong>Cobertura:</strong> ${cobertura}</p>
      ${precioInfo}
      <p style="margin-top: 8px; font-size: 0.8rem; color: #64748b;">
        *El precio final se calculará según tus datos
      </p>
    </div>
    <p style="margin-top: 10px;">¿Deseas solicitar esta cotización formal?</p>
  `

  addBotMessage(quoteHTML, true)
  showQuickReplies(["✅ Sí, solicitar cotización", "🔄 Cambiar cobertura", "📞 Hablar con asesor"])
  
  state.currentFlow = "quoteConfirm"
  state.step = 0
}

function showInsuranceDetails(type) {
  const seguro = KNOWLEDGE_BASE.seguros[type]
  
  // Info de precios solo para auto
  const precioInfo = type === "auto"
    ? `<p>🦁 Seguros Caracas - Desde $38/mes</p><p>🛡️ Estar Seguros - Desde $36/mes</p><p>✅ Real Seguros - Desde $34/mes</p>`
    : `<p>🦁 Seguros Caracas</p><p>🛡️ Estar Seguros</p><p>✅ Real Seguros</p>`
  
  const html = `
    <div style="text-align: center; margin-bottom: 10px;">
      <span style="font-size: 2rem;">${seguro.icono}</span>
    </div>
    <div class="insurance-card">
      <h4>${seguro.nombre}</h4>
      <p>${seguro.descripcion}</p>
      <p style="margin-top: 8px;"><strong>Aseguradoras disponibles:</strong></p>
      ${precioInfo}
    </div>
  `
  addBotMessage(html, true)
  addBotMessage("¿Con qué aseguradora te gustaría cotizar?")
  
  // Iniciar flujo de cotización con el tipo ya seleccionado
  state.currentFlow = "quote"
  state.step = 2
  state.data = { tipo: type }
  showQuickReplies(["🦁 Seguros Caracas", "🛡️ Estar Seguros", "✅ Real Seguros", "📞 Hablar con asesor"])
}

function showComparison() {
  const html = `
    <p>Nuestros ramos de seguros:</p>
    <div class="insurance-card" style="margin-bottom: 8px;">
      <h4>🚗 Automóvil</h4>
      <p style="font-size: 0.8rem;">Caracas, Estar y Real - Desde $34/mes</p>
    </div>
    <div class="insurance-card" style="margin-bottom: 8px;">
      <h4>❤️ Personas</h4>
      <p style="font-size: 0.8rem;">Vida, Salud, HCM - Próximamente</p>
    </div>
    <div class="insurance-card">
      <h4>🏠 Patrimoniales</h4>
      <p style="font-size: 0.8rem;">Hogar, Empresas - Próximamente</p>
    </div>
  `
  addBotMessage(html, true)
  addBotMessage("¿Qué ramo te interesa?")
  showQuickReplies(["🚗 Cotizar Automóvil", "📞 Hablar con asesor"])
}

function startClaimFlow() {
  state.currentFlow = "claim"
  state.step = 1

  addBotMessage("Lamento que hayas tenido un incidente. Voy a ayudarte con tu reclamo. ¿Qué tipo de siniestro ocurrió?")

  showQuickReplies(["🚗 Accidente vehicular", "🏠 Daño en propiedad", "🏥 Emergencia médica", "💼 Otro tipo"])
}

function handleClaimFlow(message, step) {
  if (step === 1) {
    state.data.tipoSiniestro = message
    state.step = 2

    addBotMessage("¿Cuándo ocurrió el incidente?")
    showQuickReplies(["Hoy", "Ayer", "Esta semana", "Hace más de una semana"])
  } else if (step === 2) {
    state.data.fecha = message
    state.step = 3

    addBotMessage("¿Tienes tu número de póliza a la mano? Si no lo recuerdas, puedo buscarlo con tus datos.")

    showQuickReplies(["Sí, tengo la póliza", "Buscar por datos personales", "No tengo póliza aquí"])
  } else if (step === 3) {
    const claimNumber = "REC-" + Math.random().toString(36).substr(2, 9).toUpperCase()

    const html = `
            <p>✅ <strong>¡Reclamo registrado!</strong></p>
            <div class="form-card">
                <h4>Detalles de tu caso</h4>
                <p><strong>Número de reclamo:</strong></p>
                <div style="background: #f1f5f9; padding: 12px; border-radius: 8px; text-align: center; font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #1e293b; margin: 10px 0;">
                    ${claimNumber}
                </div>
                <div class="status-badge status-review">
                    ⏱️ En revisión inicial
                </div>
                <p style="margin-top: 12px; font-size: 0.9rem;">
                    Un ajustador se contactará contigo en menos de 24 horas.
                </p>
            </div>
        `

    addBotMessage(html, true)
    addBotMessage("Guarda tu número de reclamo. ¿Necesitas algo más?")

    showQuickReplies(["📄 Ver estado del reclamo", "📞 Contactar ajustador", "❓ Preguntas frecuentes", "✅ Terminar"])

    state.currentFlow = null
  }
}

function escalateToHuman() {
  state.currentFlow = "lead"
  state.step = 1

  const html = `
        <p>Entiendo que prefieres hablar con un asesor especializado. 🧑‍💼</p>
        <div class="form-card">
            <h4>Déjame tus datos</h4>
            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 15px;">
                Un agente certificado te contactará en <strong>menos de 15 minutos</strong>
            </p>
            <div class="form-group">
                <label>Nombre completo</label>
                <input type="text" id="leadName" placeholder="Ej: Juan Pérez">
            </div>
        </div>
    `

  addBotMessage(html, true)

  const messagesDiv = document.getElementById("chatMessages")
  const btnContainer = document.createElement("div")
  btnContainer.className = "quick-replies"
  btnContainer.innerHTML = `<button class="quick-reply-btn" onclick="continueLead()">Continuar →</button>`
  messagesDiv.appendChild(btnContainer)
  scrollToBottom()
}

function continueLead() {
  const name = document.getElementById("leadName").value
  if (!name) {
    addBotMessage("Por favor ingresa tu nombre para continuar.")
    return
  }
  state.data.name = name
  state.step = 2

  const html = `
        <div class="form-card">
            <div class="form-group">
                <label>Teléfono de contacto</label>
                <input type="tel" id="leadPhone" placeholder="(55) 1234-5678">
            </div>
            <div class="form-group">
                <label>Mejor horario para llamar</label>
                <select id="leadTime">
                    <option value="manana">Mañana (9am - 12pm)</option>
                    <option value="tarde">Tarde (12pm - 6pm)</option>
                    <option value="noche">Noche (6pm - 9pm)</option>
                </select>
            </div>
            <button class="form-submit-btn" onclick="submitLead()">Solicitar llamada ahora</button>
        </div>
    `

  addBotMessage(html, true)
}

function submitLead() {
  const phone = document.getElementById("leadPhone").value
  const time = document.getElementById("leadTime").value

  if (!phone) {
    addBotMessage("Por favor ingresa tu número telefónico.")
    return
  }

  // Mapeo de horarios
  const horarioTexto = {
    manana: "Mañana (9am - 12pm)",
    tarde: "Tarde (12pm - 6pm)",
    noche: "Noche (6pm - 9pm)"
  }

  // Crear mensaje para WhatsApp
  const mensaje = `🔔 *Nueva Solicitud de Contacto*%0A%0A` +
    `👤 *Nombre:* ${state.data.name}%0A` +
    `📞 *Teléfono:* ${phone}%0A` +
    `🕐 *Horario preferido:* ${horarioTexto[time]}%0A%0A` +
    `_Enviado desde el chatbot MaxProtect_`

  // URL de WhatsApp con mensaje prellenado
  const whatsappUrl = `${CONFIG.whatsapp}?text=${mensaje}`

  addBotMessage(`✅ ¡Perfecto ${state.data.name}! Tu solicitud está siendo procesada.`)

  const html = `
        <div class="insurance-card" style="border-left-color: #10b981; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);">
            <h4 style="color: #047857;">📞 Solicitud de contacto</h4>
            <p><strong>Nombre:</strong> ${state.data.name}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Horario:</strong> ${horarioTexto[time]}</p>
        </div>
        <p style="margin-top: 10px;">Para confirmar tu solicitud, envía el mensaje por WhatsApp:</p>
        <div style="margin-top: 8px;">
          <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold;">📱 Enviar por WhatsApp</a>
        </div>
    `

  addBotMessage(html, true)
  addBotMessage("¿Hay algo más en lo que pueda ayudarte?")

  showQuickReplies(["💰 Cotizar un seguro", "❓ Información general", "❌ No, gracias"])

  state.currentFlow = null
}

function handleLeadFlow() {
  addBotMessage("Para continuar, por favor usa el formulario que aparece arriba.")
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function addUserMessage(text) {
  const messagesDiv = document.getElementById("chatMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = "message user-message"
  messageDiv.textContent = text
  messagesDiv.appendChild(messageDiv)
  scrollToBottom()
}

function addBotMessage(content, isHTML = false) {
  const messagesDiv = document.getElementById("chatMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = "message bot-message"

  if (isHTML) {
    messageDiv.innerHTML = `
            <div class="bot-label">${CONFIG.botName}</div>
            ${content}
        `
  } else {
    messageDiv.innerHTML = `
            <div class="bot-label">${CONFIG.botName}</div>
            ${content}
        `
  }

  messagesDiv.appendChild(messageDiv)
  scrollToBottom()
}

function showQuickReplies(options) {
  const messagesDiv = document.getElementById("chatMessages")
  const container = document.createElement("div")
  container.className = "quick-replies"

  options.forEach((option) => {
    const btn = document.createElement("button")
    btn.className = "quick-reply-btn"
    btn.textContent = option
    btn.onclick = () => handleQuickReply(option)
    container.appendChild(btn)
  })

  messagesDiv.appendChild(container)
  scrollToBottom()
}

function handleQuickReply(option) {
  addUserMessage(option)

  showTyping()
  setTimeout(() => {
    hideTyping()
    processQuickReplyAction(option)
  }, 400)
}

function processQuickReplyAction(option) {
  const lowerOption = option.toLowerCase()

  // Manejar flujos activos primero
  if (state.currentFlow) {
    handleFlow(option)
    return
  }

  if (lowerOption.includes("cotizar") && !lowerOption.includes("caracas") && !lowerOption.includes("estar") && !lowerOption.includes("real")) {
    startQuoteFlow()
  } else if (lowerOption.includes("más") || lowerOption.includes("opciones")) {
    showMoreCoberturas()
  } else if (lowerOption.includes("anteriores")) {
    showCoberturasSelection()
  } else if (lowerOption.includes("contactar") || lowerOption.includes("asesor") || lowerOption.includes("hablar")) {
    escalateToHuman()
  } else if (lowerOption.includes("información") || lowerOption.includes("info")) {
    showGeneralInfo()
  } else if (lowerOption.includes("auto") || lowerOption.includes("vehículo")) {
    showInsuranceDetails("auto")
  } else if (lowerOption.includes("vida")) {
    showInsuranceDetails("vida")
  } else if (lowerOption.includes("hogar")) {
    showInsuranceDetails("hogar")
  } else if (lowerOption.includes("salud")) {
    showInsuranceDetails("salud")
  } else if (lowerOption.includes("nueva")) {
    startQuoteFlow()
  } else if (lowerOption.includes("otra")) {
    showWelcome()
  } else if (lowerOption.includes("terminar") || lowerOption.includes("no, gracias") || lowerOption.includes("no gracias")) {
    addBotMessage("¡Perfecto! Estoy aquí si me necesitas. ¡Que tengas un excelente día! 🛡️")
  } else {
    processMessage(option)
  }
}

// Mostrar información general
function showGeneralInfo() {
  const html = `
    <p><strong>FFC Consultants</strong> - Tu broker de seguros de confianza</p>
    <div class="insurance-card">
      <p>📞 <strong>Teléfono:</strong> ${CONFIG.phone}</p>
      <p>📧 <strong>Email:</strong> ${CONFIG.email}</p>
      <p style="margin-top: 8px;"><strong>Ramos disponibles:</strong></p>
      <p>🚗 Automóvil</p>
      <p>❤️ Personas (Vida, Salud)</p>
      <p>🏠 Patrimoniales (Hogar)</p>
    </div>
  `
  addBotMessage(html, true)
  addBotMessage("¿En qué puedo ayudarte?")
  showQuickReplies(["🚗 Cotizar Automóvil", "📞 Contactar asesor"])
}

function showTyping() {
  document.getElementById("typingIndicator").classList.add("active")
  scrollToBottom()
}

function hideTyping() {
  document.getElementById("typingIndicator").classList.remove("active")
}

function scrollToBottom() {
  const messagesDiv = document.getElementById("chatMessages")
  messagesDiv.scrollTop = messagesDiv.scrollHeight
}

function containsAny(str, keywords) {
  return keywords.some((keyword) => str.includes(keyword))
}

function detectInsuranceType(message) {
  const lower = message.toLowerCase()
  if (lower.includes("auto") || lower.includes("carro") || lower.includes("vehiculo") || lower.includes("vehículo")) return "auto"
  if (lower.includes("vida")) return "vida"
  if (lower.includes("hogar") || lower.includes("casa") || lower.includes("patrimonial")) return "hogar"
  if (lower.includes("salud") || lower.includes("medico") || lower.includes("médico")) return "salud"
  return null
}
