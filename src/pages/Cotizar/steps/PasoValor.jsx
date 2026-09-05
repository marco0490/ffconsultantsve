import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoValor() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={5}
      avatarMsg="¿Cuál es el valor aproximado de tu auto? Esto define la suma asegurada 💵"
      label="Valor del vehículo (USD)"
      backTo={pathAnterior(5)}
      onNext={() => next(pathSiguiente(5))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Campo de valor + slider — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoValor
