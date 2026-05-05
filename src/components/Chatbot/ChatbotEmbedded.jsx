import { useState, useRef, useEffect } from 'react'
import { FiSend, FiUser } from 'react-icons/fi'

const API_BASE = import.meta.env.PROD ? '' : ''

function ChatbotEmbedded() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const inputRef = useRef(null)

  const quickReplies = [
    { text: '🚗 Cotizar Auto', action: 'cotizar_auto' },
    { text: '❤️ Seguro de Vida', action: 'cotizar_vida' },
    { text: '🏥 Seguro de Salud', action: 'cotizar_salud' },
    { text: '🏠 Seguro de Hogar', action: 'cotizar_hogar' },
    { text: '✈️ Seguro de Viaje', action: 'cotizar_viaje' },
    { text: '👨‍💼 Hablar con asesor', action: 'asesor' },
  ]

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
    }
    sendMessage(messageMap[reply.action] || reply.text)
  }

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  }

  return (
    <div 
      className="w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ 
        backgroundColor: '#ffffff',
        border: '2px solid #3146b4',
        height: '600px',
        maxHeight: '80vh'
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center gap-3"
        style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          <span className="text-2xl">💬</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">MaxProtect</h3>
          <p className="text-sm" style={{ color: '#a5b4fc' }}>
            Tu asesor virtual de seguros • En línea
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm font-medium">Activo</span>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ backgroundColor: '#f9fafb' }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                style={{ backgroundColor: '#3146b4' }}
              >
                <span className="text-white text-sm">🤖</span>
              </div>
            )}
            <div
              className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={
                msg.role === 'user'
                  ? {
                      backgroundColor: '#3146b4',
                      color: '#ffffff',
                      borderBottomRightRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }
                  : {
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      borderBottomLeftRadius: '4px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    }
              }
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
            {msg.role === 'user' && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center ml-2 flex-shrink-0"
                style={{ backgroundColor: '#6366f1' }}
              >
                <FiUser className="text-white text-sm" />
              </div>
            )}
          </div>
        ))}

        {/* Skeleton de carga */}
        {isLoading && (
          <div className="flex justify-start">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
              style={{ backgroundColor: '#3146b4' }}
            >
              <span className="text-white text-sm">🤖</span>
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-md w-48"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
            >
              <div className="space-y-2 mb-2">
                <div className="h-2.5 bg-gray-200 rounded-full animate-pulse w-full" />
                <div className="h-2.5 bg-gray-200 rounded-full animate-pulse w-3/4" />
                <div className="h-2.5 bg-gray-200 rounded-full animate-pulse w-1/2" />
              </div>
              <div className="flex gap-1.5 mt-3">
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Replies */}
        {showQuickReplies && messages.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-md"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#3146b4',
                  border: '2px solid #3146b4',
                }}
              >
                {reply.text}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t flex gap-3"
        style={{ borderColor: '#e5e7eb', backgroundColor: '#ffffff' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-full border-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          style={{ borderColor: '#e5e7eb' }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all hover:scale-105"
          style={{ backgroundColor: '#3146b4', color: '#ffffff' }}
        >
          <FiSend size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatbotEmbedded
