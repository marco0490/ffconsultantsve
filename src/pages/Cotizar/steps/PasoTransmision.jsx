import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

const TRANSMISIONES = [
  { value: 'automatica', label: 'Automática', emoji: '⚙️' },
  { value: 'sincronica', label: 'Sincrónica', emoji: '🕹️' },
]

function PasoTransmision() {
  const { state, update, next } = useCotizadorState()
  const transmision = state.vehiculo.transmision
  const valido = Boolean(transmision)

  return (
    <WizardLayout
      paso={4}
      avatarMsg="¿Qué transmisión tiene?"
      label="Transmisión"
      backTo={pathAnterior(4)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(4))}
    >
      <StepCards
        options={TRANSMISIONES}
        value={transmision}
        onChange={(v) => update('vehiculo', { transmision: v })}
        columns={2}
        onAutoAdvance={() => next(pathSiguiente(4))}
      />
    </WizardLayout>
  )
}

export default PasoTransmision
