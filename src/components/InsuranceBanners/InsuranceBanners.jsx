import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiShield, FiHeart, FiHome, FiTruck, FiUsers } from 'react-icons/fi'

// 🎯 4 MICROSEGUROS - Precios reales desde las tarifas base
const banners = [
  {
    id: 1,
    company: 'Seguros Pirámide',
    product: '🛡️ Accidentes Personales',
    title: '¡Protección ante imprevistos!',
    description: 'Cobertura por muerte accidental, invalidez y gastos médicos. Ideal para ti y tu familia.',
    price: '4',
    period: 'desde/mes',
    icon: FiShield,
    bgColor: '#ef4444',
    accent: '#eab308',
    features: ['Muerte accidental', 'Invalidez permanente', 'Gastos médicos'],
  },
  {
    id: 2,
    company: 'Oceánica de Seguros',
    product: '⚱️ Servicio Funerario',
    title: '¡Tranquilidad para tu familia!',
    description: 'Cobertura de gastos funerarios para que tu familia no tenga preocupaciones adicionales.',
    price: '2',
    period: 'desde/mes',
    icon: FiHeart,
    bgColor: '#14b8a6',
    accent: '#0d9488',
    features: ['Gastos funerarios', 'Traslado nacional', 'Trámites legales'],
  },
  {
    id: 3,
    company: 'Estar Seguros',
    product: '💚 Póliza de Vida',
    title: '¡Asegura el futuro de los tuyos!',
    description: 'Protección financiera para tu familia. Suma asegurada desde $10,000 hasta $50,000.',
    price: '5',
    period: 'desde/mes',
    icon: FiUsers,
    bgColor: '#a78bfa',
    accent: '#14b8a6',
    features: ['Suma asegurada flexible', 'Beneficiarios protegidos', 'Cobertura mundial'],
  },
  {
    id: 4,
    company: 'Real Seguros',
    product: '🚗 RCV Vehículos',
    title: '¡Tu vehículo siempre protegido!',
    description: 'Responsabilidad Civil Vehicular obligatoria con las mejores coberturas del mercado.',
    price: '42',
    period: 'al año',
    icon: FiTruck,
    bgColor: '#0891b2',
    accent: '#a3e635',
    features: ['Daños a terceros', 'Asistencia vial 24/7', 'Defensa legal'],
  },
  {
    id: 5,
    company: 'Seguros Caracas',
    product: '🏠 Hogar Protegido',
    title: '¡Tu hogar siempre seguro!',
    description: 'Protección integral para tu vivienda y contenido contra incendio, robo y más.',
    price: '8',
    period: 'desde/mes',
    icon: FiHome,
    bgColor: '#1e40af',
    accent: '#dc2626',
    features: ['Incendio y aliados', 'Robo y asalto', 'Responsabilidad civil'],
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
