import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

// Clase de uso para tarifar el RCV (esquema de la solicitud oficial, §10).
const CLASES = [
  { value: 'particular', label: 'Particular', emoji: '🚗' },
  { value: 'carga', label: 'Carga', emoji: '🚚' },
  { value: 'moto', label: 'Moto', emoji: '🏍️' },
  { value: 'transporte', label: 'Transporte', emoji: '🚐' },
]

function PasoClaseUso() {
  const { state, update, next } = useCotizadorState()
  const claseUso = state.vehiculo.claseUso
  const valido = Boolean(claseUso)

  return (
    <WizardLayout
      paso={7}
      avatarMsg="¿Cuál es la clase de uso del vehículo?"
      label="Clase de uso"
      backTo={pathAnterior(7)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(7))}
    >
      <StepCards
        options={CLASES}
        value={claseUso}
        onChange={(v) => update('vehiculo', { claseUso: v })}
        columns={2}
        onAutoAdvance={() => next(pathSiguiente(7))}
      />
    </WizardLayout>
  )
}

export default PasoClaseUso
