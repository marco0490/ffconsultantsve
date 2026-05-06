import { motion } from 'framer-motion'
import InsuranceBanners from '../InsuranceBanners/InsuranceBanners'
import InsuranceBg from '../../assets/images/insurance-bg-illustration.svg'

function ActionSection() {
  return (
    <div
      id="promociones"
      className="w-full py-12 md:py-16 relative"
      style={{
        backgroundImage: `url(${InsuranceBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#fafbfc',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <motion.p
            className="text-lg md:text-xl text-gray-500 mb-2 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            ¿Listo para vivir la experiencia? ✨
          </motion.p>
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            Nuestros Seguros Destacados
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            Descubre las mejores ofertas de nuestras aseguradoras aliadas.{' '}
            <span className="font-semibold text-primary">¡Cotiza en segundos!</span>
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              5 Aseguradoras
            </span>
            <span className="mx-2">•</span>
            <span>Precios competitivos</span>
            <span className="mx-2">•</span>
            <span>Cotización instantánea</span>
          </motion.div>
        </div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <InsuranceBanners />
        </motion.div>
      </div>
    </div>
  )
}

export default ActionSection
