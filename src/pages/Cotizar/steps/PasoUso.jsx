import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoUso() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={6}
      avatarMsg="Dos preguntas rápidas más sobre el auto"
      backTo={pathAnterior(6)}
      onNext={() => next(pathSiguiente(6))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Uso, estado y placa — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoUso
