import { useState, useRef, useEffect } from 'react'
import { FiSend, FiUser, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import AddressMapPicker from './AddressMapPicker'

const API_BASE = import.meta.env.PROD ? '' : ''

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
    { text: '🚗 Seguro de Auto', action: 'cotizar_auto' },
    { text: '🏥 Seguro de Salud', action: 'cotizar_salud' },
    { text: '🏡 Seguro de Hogar', action: 'cotizar_hogar' },
    { text: '✈️ Seguro de Viaje', action: 'cotizar_viaje' },
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
    { text: '� Pago de contado', action: 'contado' },
    { text: '� Pago financiado', action: 'financiado' },
  ],
}

function ChatbotEmbedded() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [contextualReplies, setContextualReplies] = useState(CONTEXTUAL_REPLIES.initial)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [showAddressMap, setShowAddressMap] = useState(false)
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
    // Mensaje de bienvenida al montar
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! 👋 Soy **MaxProtect**, tu asesor de seguros virtual de FFC Consultants.\n\nEstoy aquí para ayudarte a cotizar el seguro perfecto para ti. Cuéntame, ¿qué tipo de seguro te interesa?',
      },
    ])
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (text) => {
    if (!text.trim()) return

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
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages([...newMessages, { role: 'assistant', content: data.message }])
        detectStep(data.message)
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

  const handleQuickReply = (reply) => {
    const messageMap = {
      cotizar_auto: 'Quiero cotizar un seguro de auto',
      cotizar_vida: 'Me interesa un seguro de vida',
      cotizar_salud: 'Necesito un seguro de salud',
      cotizar_hogar: 'Quiero proteger mi hogar',
      cotizar_viaje: 'Necesito un seguro de viaje',
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
      asesor: 'Prefiero hablar con un asesor humano',
    }
    sendMessage(messageMap[reply.action] || reply.text)
  }

  // Detectar el paso actual basado en el contenido del mensaje
  const detectStep = (message) => {
    const content = message.toLowerCase()
    
    // Paso 5: Emisión - cuando pide DIRECCIÓN, mostrar el mapa
    if (content.includes('dirección completa') || content.includes('estado, ciudad') || content.includes('municipio')) {
      setCurrentStep(5)
      setContextualReplies([])
      setTimeout(() => setShowAddressMap(true), 500)
      return
    }
    // Paso 5: Otros datos de emisión
    if (content.includes('datos adicionales') || content.includes('documentos adicionales') || content.includes('inspección física') || content.includes('serial') || content.includes('placa')) {
      setCurrentStep(5)
      setContextualReplies([])
      return
    }
    // Paso 4: Cotización - SOLO cuando muestra precio con símbolo $ y pregunta si continúa
    else if ((content.includes('$') && content.includes('mensuales')) || (content.includes('precio estimado') && content.includes('$'))) {
      setCurrentStep(4)
      setContextualReplies(CONTEXTUAL_REPLIES.aceptar_precio)
    }
    // Paso 1: Tipo de seguro - inicio
    else if (content.includes('qué tipo de seguro') || content.includes('cuéntame') || content.includes('¿qué seguro')) {
      setCurrentStep(1)
      setContextualReplies(CONTEXTUAL_REPLIES.initial)
    }
    // Paso 1: Selección de cobertura (aún estamos en tipo de seguro)
    else if (content.includes('tipo de cobertura') || content.includes('casco') || content.includes('rcv')) {
      setCurrentStep(1)
      setContextualReplies([])
    }
    // Paso 2: Datos personales
    else if (content.includes('nombre completo') || content.includes('tu nombre')) {
      setCurrentStep(2)
      setContextualReplies([])
    } else if (content.includes('cédula') || content.includes('teléfono') || content.includes('correo')) {
      setCurrentStep(2)
      setContextualReplies([])
    } else if (content.includes('sexo') || content.includes('género')) {
      setCurrentStep(2)
      setContextualReplies(CONTEXTUAL_REPLIES.genero)
    } 
    // Paso 3: Detalles del seguro/vehículo
    else if (content.includes('fecha de nacimiento') || content.includes('marca') || content.includes('modelo') || content.includes('año')) {
      setCurrentStep(3)
      setContextualReplies([])
    } else if (content.includes('0km') || content.includes('0 kilómetros') || content.includes('usado')) {
      setCurrentStep(3)
      setContextualReplies([])
    } else if (content.includes('tipo de pago') || content.includes('contado') || content.includes('financiado')) {
      setCurrentStep(3)
      setContextualReplies(CONTEXTUAL_REPLIES.pago)
    } else if (content.includes('confirma') || content.includes('correcto') || content.includes('resumen')) {
      setCurrentStep(3)
      setContextualReplies(CONTEXTUAL_REPLIES.confirmacion)
    } else if (content.includes('gracias') || content.includes('encuesta')) {
      setCurrentStep(5)
      setContextualReplies([])
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
                  key={reply.action}
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
