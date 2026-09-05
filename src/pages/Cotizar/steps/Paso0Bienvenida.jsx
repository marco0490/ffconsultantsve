import { Helmet } from 'react-helmet'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { pathSiguiente } from '../../../components/Cotizador/steps.config'

const OPCIONES = [
  { id: 'auto', emoji: '🚗', titulo: 'Mi auto', disponible: true },
  { id: 'familia', emoji: '👨‍👩‍👧', titulo: 'Mi familia', disponible: false },
  { id: 'patrimonio', emoji: '🏠', titulo: 'Mi negocio o patrimonio', disponible: false },
]

function Paso0Bienvenida() {
  const { next } = useCotizadorState()

  return (
    <>
      <Helmet>
        <title>Cotiza tu seguro de auto | Future Financial Consultants</title>
      </Helmet>
      <WizardLayout
        paso={0}
        showProgress={false}
        backTo="/"
        avatarMsg="¡Hola! 👋 Soy Asesora FFC, tu asesora de Future Financial."
        nextLabel="¡Empecemos!"
        onNext={() => next(pathSiguiente(0))}
      >
        <p className="text-gray-600 text-center mb-6">
          Cotizar tu seguro de auto toma menos de 2 minutos. Compararé por ti las mejores
          opciones de <strong>Real Seguros</strong>, <strong>Estar Seguros</strong> y{' '}
          <strong>Seguros Caracas</strong>.
        </p>

        <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">
          ¿Qué quieres asegurar?
        </span>
        <div className="space-y-3">
          {OPCIONES.map((op) => {
            const activo = op.id === 'auto'
            return (
              <div
                key={op.id}
                aria-disabled={!op.disponible}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  activo
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-white opacity-60'
                }`}
              >
                <span className="text-2xl">{op.emoji}</span>
                <span className="font-semibold text-gray-800 flex-1">{op.titulo}</span>
                {op.disponible ? (
                  activo && <span className="text-primary font-bold">✓</span>
                ) : (
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    Próximamente
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </WizardLayout>
    </>
  )
}

export default Paso0Bienvenida
