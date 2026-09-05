/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

// Toast simple, autodescartable. Controlado por el componente padre con
// [msg, setMsg]; al desaparecer llama onClose para limpiar el mensaje.
function Toast({ msg, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!msg) return undefined
    const t = setTimeout(() => onClose && onClose(), duration)
    return () => clearTimeout(t)
  }, [msg, duration, onClose])

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-xl max-w-[90vw]"
          role="status"
        >
          <FiCheckCircle className="text-green-400 shrink-0" size={18} />
          <span className="truncate">{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
