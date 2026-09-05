import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoDatos() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={7}
      avatarMsg="¡Gracias! Ahora cuéntame un poco de ti 🙏"
      backTo={pathAnterior(7)}
      onNext={() => next(pathSiguiente(7))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Nombre, cédula y fecha de nacimiento — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoDatos
