import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

function PasoContacto() {
  const { next } = useCotizadorState()
  return (
    <WizardLayout
      paso={8}
      avatarMsg="Último paso. ¿Dónde te envío la cotización? 📲"
      nextLabel="Ver mi cotización"
      backTo={pathAnterior(8)}
      onNext={() => next(pathSiguiente(8))}
    >
      <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
        (Correo, WhatsApp y aceptación — en construcción)
      </div>
    </WizardLayout>
  )
}

export default PasoContacto
