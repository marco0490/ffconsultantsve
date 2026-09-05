import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoMarca() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={1}
      avatarMsg="Cuéntame de tu auto 🚗"
      label="Escribe o selecciona la marca"
      backTo={pathAnterior(1)}
      onNext={() => next(pathSiguiente(1))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Selector de marca — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoMarca
