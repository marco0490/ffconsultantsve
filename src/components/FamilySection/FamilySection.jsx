import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeUpSection, FadeUpItem } from '../FadeUp/FadeUp'

const bubbles = [
  { value: '40%', label: 'Ahorro promedio', size: 'w-28 h-28 md:w-32 md:h-32', textSize: 'text-2xl md:text-3xl' },
  { value: '5', label: 'Aseguradoras', size: 'w-24 h-24 md:w-28 md:h-28', textSize: 'text-xl md:text-2xl' },
  { value: '24/7', label: 'Atención', size: 'w-20 h-20 md:w-24 md:h-24', textSize: 'text-lg md:text-xl' },
]

const bubbles2 = [
  { value: '+500', label: 'Vehículos', size: 'w-24 h-24 md:w-28 md:h-28', textSize: 'text-xl md:text-2xl' },
  { value: '100%', label: 'Digital', size: 'w-28 h-28 md:w-32 md:h-32', textSize: 'text-2xl md:text-3xl' },
  { value: '$36', label: 'Desde/mes', size: 'w-20 h-20 md:w-24 md:h-24', textSize: 'text-lg md:text-xl' },
]

function Bubble({ value, label, size, textSize }) {
  return (
    <motion.div
      className={`${size} bg-white rounded-full shadow-lg flex flex-col items-center justify-center border border-gray-100`}
      whileHover={{ scale: 1.08, boxShadow: '0 12px 28px rgba(49,70,180,0.15)' }}
      transition={{ duration: 0.25 }}
    >
      <span className={`${textSize} font-bold text-primary`}>{value}</span>
      <span className="text-[10px] md:text-xs text-gray-500 text-center px-2">{label}</span>
    </motion.div>
  )
}

function FamilySection() {
  return (
    <div className="w-full">
      {/* Sección 1: Todo instantáneo */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUpSection>
            <FadeUpItem>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Todo instantáneo
              </h2>
            </FadeUpItem>
            <FadeUpItem>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Utilizamos IA para encontrar la póliza perfecta para ti y resolver tus
                dudas al instante. No podría ser más fácil ni rápido.
              </p>
            </FadeUpItem>
          </FadeUpSection>

          <FadeUpSection className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Teléfono 1 */}
            <FadeUpItem>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-gray-800 font-medium">Tan solo</p>
                  <p className="text-2xl font-bold text-primary">90 segundos</p>
                  <p className="text-gray-500 text-sm">para cotizar</p>
                </div>
                <motion.div
                  className="relative"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-40 md:w-48 bg-gray-200 rounded-[2rem] p-2">
                    <div className="bg-white rounded-[1.5rem] p-3 h-64 md:h-72 flex flex-col justify-center items-center">
                      <div className="w-full space-y-2 mb-4">
                        <div className="bg-gray-100 h-8 rounded-lg"></div>
                        <div className="bg-gray-100 h-8 rounded-lg w-3/4"></div>
                      </div>
                      <Link
                        to="/cotizar"
                        className="bg-primary text-white text-xs py-2 px-6 rounded-full font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                      >
                        Cotizar ✓
                      </Link>
                    </div>
                  </div>
                  <p className="text-center mt-3 md:hidden">
                    <span className="text-primary font-bold">90 seg</span> para cotizar
                  </p>
                </motion.div>
              </div>
            </FadeUpItem>

            <FadeUpItem>
              <div className="hidden md:block text-gray-300 text-4xl">→</div>
            </FadeUpItem>

            {/* Teléfono 2 */}
            <FadeUpItem>
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-40 md:w-48 bg-gray-200 rounded-[2rem] p-2">
                    <div className="bg-white rounded-[1.5rem] p-3 h-64 md:h-72 flex flex-col justify-center items-center">
                      <div className="text-4xl mb-2">💬</div>
                      <div className="bg-primary/10 rounded-xl p-3 w-full">
                        <p className="text-xs text-gray-600">MaxProtect dice:</p>
                        <p className="text-sm font-medium text-primary">
                          "¡Tu póliza está lista!"
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1">
                        <span className="text-2xl">💰</span>
                        <span className="font-bold text-gray-800">$58/mes</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-3 md:hidden">
                    <span className="text-primary font-bold">3 seg</span> de respuesta
                  </p>
                </motion.div>
                <div className="text-left hidden md:block">
                  <p className="text-gray-800 font-medium">Solo</p>
                  <p className="text-2xl font-bold text-primary">3 segundos</p>
                  <p className="text-gray-500 text-sm">de respuesta con IA</p>
                </div>
              </div>
            </FadeUpItem>
          </FadeUpSection>
        </div>
      </div>

      {/* Sección 2: ¿Ya estás asegurado? */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUpSection>
            <FadeUpItem>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                ¿Ya estás asegurado?{' '}
                <span className="text-primary">¡Te ayudamos a mejorar!</span>
              </h2>
            </FadeUpItem>
            <FadeUpItem>
              <p className="text-gray-600 mb-12">
                Nuestros clientes obtuvieron estos beneficios al cotizar con nosotros:
              </p>
            </FadeUpItem>
          </FadeUpSection>

          <FadeUpSection className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10" amount={0.2}>
            {bubbles.map((b) => (
              <FadeUpItem key={b.value}>
                <Bubble {...b} />
              </FadeUpItem>
            ))}
          </FadeUpSection>

          <FadeUpSection className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10" amount={0.2}>
            {bubbles2.map((b) => (
              <FadeUpItem key={b.value}>
                <Bubble {...b} />
              </FadeUpItem>
            ))}
          </FadeUpSection>

          <FadeUpSection>
            <FadeUpItem>
              <Link to="/cotizar">
                <motion.span
                  className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(49,70,180,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  COTIZA Y COMPARA AHORA
                </motion.span>
              </Link>
            </FadeUpItem>
          </FadeUpSection>
        </div>
      </div>
    </div>
  )
}

export default FamilySection
