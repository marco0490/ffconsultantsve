import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoAnio() {
  const { state, next } = useCotizadorState()
  const { marca, modelo } = state.vehiculo
  const auto = [marca, modelo].filter(Boolean).join(' ') || 'auto'
  return (
    <WizardLayout
      paso={3}
      avatarMsg={`¿De qué año es tu ${auto}?`}
      label="Selecciona el año"
      backTo={pathAnterior(3)}
      onNext={() => next(pathSiguiente(3))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Selector de año — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoAnio
