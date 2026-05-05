import { motion } from 'framer-motion'
import { FadeUpSection, FadeUpItem } from '../FadeUp/FadeUp'
import CarInsuranceVideo from '../../assets/images/car-insurance.mp4'
import MobileInsuranceVideo from '../../assets/images/mobile-insurance.mp4'

const cards = [
  {
    video: CarInsuranceVideo,
    badge: '🚗 Seguro de Auto',
    floatingBadge: { top: '24/7', bottom: 'Atención virtual' },
    align: 'left',
    rotation: -6,
    offsetTop: '',
    title: (
      <>
        Tu auto protegido,<br />
        <span className="text-primary">tu mente tranquila</span>
      </>
    ),
    description:
      'Cobertura amplia, RCV y más. Cotiza en minutos con nuestro asistente virtual.',
    checks: [
      'Desde $36/mes aproximadamente',
      '5 aseguradoras para elegir',
      'Asistencia 24/7',
    ],
  },
  {
    video: MobileInsuranceVideo,
    badge: '📱 100% Digital',
    floatingBadge: { top: '+500', bottom: 'Vehículos asegurados' },
    align: 'center',
    rotation: 6,
    offsetTop: 'mt-12 md:mt-20',
    title: (
      <>
        Todo desde<br />
        <span className="text-primary">tu celular</span>
      </>
    ),
    description:
      'Cotiza, compara y contrata sin salir de casa. La primera Insurtech de Venezuela.',
    checks: [
      'Cotización instantánea',
      'Sin papeleos innecesarios',
      'Asesoría personalizada con IA',
    ],
  },
]

function PromoSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">

        <FadeUpSection className="text-center mb-12">
          <FadeUpItem>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Protección <span className="text-primary">a tu medida</span>
            </h2>
          </FadeUpItem>
          <FadeUpItem>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Elige la cobertura que mejor se adapte a tus necesidades
            </p>
          </FadeUpItem>
        </FadeUpSection>

        <FadeUpSection className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cards.map(({ video, badge, floatingBadge, align, rotation, offsetTop, title, description, checks }) => (
            <FadeUpItem key={badge}>
              <div className={`flex flex-col ${offsetTop} bg-white rounded-3xl p-6 md:p-8 shadow-xl`}>
                {/* 1. VIDEO ARRIBA - pequeño, rotado, se endereza en hover */}
                <div className={`flex ${align === 'left' ? 'justify-start' : 'justify-center'} mb-2`}>
                  <motion.div
                    className="w-64 md:w-80 h-40 md:h-48 rounded-2xl overflow-hidden shadow-xl"
                    initial={{ rotate: rotation }}
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  </motion.div>
                </div>

                {/* 2. BADGES - con overlap parcial sobre el video */}
                <div className="flex items-center gap-3 mb-4 relative z-10 -mt-4">
                  <span className="bg-primary text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg">
                    {badge}
                  </span>
                  <div className="bg-white rounded-xl shadow-lg px-3 py-2 border border-gray-100">
                    <p className="text-xs font-bold text-primary">{floatingBadge.top}</p>
                    <p className="text-xs text-gray-500">{floatingBadge.bottom}</p>
                  </div>
                </div>

                {/* 3. TÍTULO */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {title}
                </h2>

                {/* 4. DESCRIPCIÓN */}
                <p className="text-gray-600 mb-4">
                  {description}
                </p>

                {/* 5. CHECKLIST */}
                <ul className="space-y-3">
                  {checks.map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 flex-shrink-0">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUpItem>
          ))}
        </FadeUpSection>

        <FadeUpSection className="text-center mt-12">
          <FadeUpItem>
            <p className="text-gray-600 text-lg">
              ¿Listo para protegerte? Habla con{' '}
              <strong className="text-primary">MaxProtect</strong> arriba y cotiza ahora 👆
            </p>
          </FadeUpItem>
        </FadeUpSection>

      </div>
    </section>
  )
}

export default PromoSection
