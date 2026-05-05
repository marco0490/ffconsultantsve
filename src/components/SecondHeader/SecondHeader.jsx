import { useState, useEffect } from 'react'

const FRASES = [
  "Compra tu seguro de salud 100% en línea.",
  "Con los mejores precios del mercado venezolano.",
  "Una familia que asiste a la tuya.",
  "Cotiza con nuestro asistente virtual MaxProtect.",
]

function SecondHeader() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FRASES.length)
        setIsAnimating(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden md:block w-full py-2 bg-primary text-white max-w-[1900px] mx-auto overflow-hidden">
      <p className="flex justify-center items-center">
        <span 
          className="inline-block min-w-[420px] text-center transition-all duration-500"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(-20px)' : 'translateY(0)',
          }}
        >
          {FRASES[currentIndex]}
        </span>
      </p>
    </div>
  )
}

export default SecondHeader
