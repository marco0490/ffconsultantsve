import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatbotEmbedded from '../../components/Chatbot/ChatbotEmbedded'

function Cotizar() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      className="min-h-screen w-full py-8 md:py-12 relative"
      style={{
        backgroundColor: '#f9fafb',
      }}
    >
      <div className="max-w-[900px] mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Tu Asesor de Seguros con IA
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            Pregunta lo que quieras sobre seguros.{' '}
            <span className="font-semibold text-primary">MaxProtect</span> te ayuda a
            cotizar y encontrar la póliza perfecta en segundos.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              En línea 24/7
            </span>
            <span className="mx-2">•</span>
            <span>100% Gratis</span>
            <span className="mx-2">•</span>
            <span>Sin compromiso</span>
          </motion.div>
        </div>

        <motion.div
          className="w-full max-w-[700px] mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <ChatbotEmbedded />
        </motion.div>
      </div>
    </div>
  )
}

export default Cotizar
