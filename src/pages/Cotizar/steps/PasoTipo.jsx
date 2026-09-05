import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoTipo() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={4}
      avatarMsg="¿Qué tipo de vehículo es?"
      label="Tipo de vehículo"
      backTo={pathAnterior(4)}
      onNext={() => next(pathSiguiente(4))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Tarjetas de tipo de vehículo — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoTipo
