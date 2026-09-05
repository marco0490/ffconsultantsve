import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoModelo() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={2}
      avatarMsg="Buena elección. ¿Qué modelo es?"
      label="Escribe o selecciona el modelo"
      backTo={pathAnterior(2)}
      onNext={() => next(pathSiguiente(2))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Selector de modelo — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoModelo
