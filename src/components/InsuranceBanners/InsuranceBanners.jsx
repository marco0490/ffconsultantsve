import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiShield, FiHeart, FiHome, FiTruck, FiUsers } from 'react-icons/fi'

const banners = [
  {
    id: 1,
    company: 'Seguros Piramide',
    product: 'Seguro de Vehículo',
    title: '¡Protege tu vehículo hoy!',
    description: 'Cobertura completa para tu auto con asistencia 24/7 en todo el país.',
    price: '45',
    period: 'al mes',
    icon: FiTruck,
    bgColor: '#1e40af',
    accent: '#2563eb',
    features: ['Cobertura amplia', 'Grúa incluida', 'Defensa legal'],
  },
  {
    id: 2,
    company: 'Seguros Oceanica',
    product: 'Seguro de Salud',
    title: '¡Calcula tu seguro en 2 minutos!',
    description: 'Invierte en tu salud y bienestar hoy mismo. Compra ya tu póliza online.',
    price: '215',
    period: 'al año',
    icon: FiHeart,
    bgColor: '#059669',
    accent: '#10b981',
    features: ['Emergencias médicas', 'Equipos electrónicos', 'Vehículo RCV'],
  },
  {
    id: 3,
    company: 'Real Seguros',
    product: 'Seguro Familiar',
    title: '¡Tu familia protegida!',
    description: 'Plan familiar con cobertura médica completa y beneficios exclusivos.',
    price: '180',
    period: 'al mes',
    icon: FiUsers,
    bgColor: '#7c3aed',
    accent: '#7c3aed',
    features: ['Consultas ilimitadas', 'Medicinas cubiertas', 'Hospitalización'],
  },
  {
    id: 4,
    company: 'Seguros Caracas',
    product: 'Seguro de Hogar',
    title: '¡Protege lo que más importa!',
    description: 'Cobertura integral para tu hogar contra robos, incendios y más.',
    price: '35',
    period: 'al mes',
    icon: FiHome,
    bgColor: '#ea580c',
    accent: '#f97316',
    features: ['Incendio y robo', 'Daños por agua', 'Responsabilidad civil'],
  },
  {
    id: 5,
    company: 'Estar Seguros',
    product: 'Seguro de Vida',
    title: '¡Asegura tu futuro!',
    description: 'Protección financiera para ti y tu familia ante cualquier eventualidad.',
    price: '25',
    period: 'al mes',
    icon: FiShield,
    bgColor: '#db2777',
    accent: '#ec4899',
    features: ['Muerte accidental', 'Invalidez total', 'Gastos funerarios'],
  },
]

function InsuranceBanners() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef(null)

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [])

  const goToPrevious = () => {
    stopAutoPlay()
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
    startAutoPlay()
  }

  const goToNext = () => {
    stopAutoPlay()
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % banners.length)
    startAutoPlay()
  }

  const goToSlide = (index) => {
    stopAutoPlay()
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    startAutoPlay()
  }

  const currentBanner = banners[currentIndex]
  const IconComponent = currentBanner.icon

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ minHeight: '480px' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 p-4 sm:p-6 md:p-10"
            style={{ backgroundColor: currentBanner.bgColor }}
          >
            <div className="h-full flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6">
              {/* Icono y producto */}
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <IconComponent className="text-white text-2xl sm:text-3xl md:text-4xl" />
                </motion.div>
                <div className="text-white/90 font-semibold text-sm sm:text-base text-center">
                  {currentBanner.product}
                </div>
              </div>

              {/* Contenido principal */}
              <div className="text-center w-full">
                <motion.div
                  className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentBanner.company}
                </motion.div>
                
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {currentBanner.title}
                </motion.h2>
                
                <motion.p
                  className="text-white/80 text-xs sm:text-sm md:text-base max-w-md mx-auto mb-3 sm:mb-4 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentBanner.description}
                </motion.p>

                {/* Precio */}
                <motion.div
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="text-white/70 text-xs sm:text-sm">DESDE</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-white/70 text-lg sm:text-xl">$</span>
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                      {currentBanner.price}
                    </span>
                    <span className="text-white/70 text-sm sm:text-lg">{currentBanner.period}</span>
                  </div>
                </motion.div>

                {/* Botón */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/cotizar"
                    className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-900 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    style={{ color: currentBanner.accent }}
                  >
                    Cotizar ahora
                    <FiChevronRight className="text-xl" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegación - fuera del banner en desktop */}
        <button
          onClick={goToPrevious}
          className="absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors z-10 shadow-lg"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute -right-6 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors z-10 shadow-lg"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Indicadores de puntos */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      </div>
  )
}

export default InsuranceBanners
