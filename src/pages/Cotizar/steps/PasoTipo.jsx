import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

const TIPOS = [
  { value: 'sedan', label: 'Sedán', emoji: '🚗' },
  { value: 'suv', label: 'SUV / Camioneta', emoji: '🚙' },
  { value: 'pickup', label: 'Pick-up', emoji: '🛻' },
  { value: 'hatchback', label: 'Hatchback', emoji: '🚘' },
  { value: 'moto', label: 'Moto', emoji: '🏍️' },
]

function PasoTipo() {
  const { state, update, next } = useCotizadorState()
  const tipo = state.vehiculo.tipo
  const valido = Boolean(tipo)

  return (
    <WizardLayout
      paso={6}
      avatarMsg="¿Qué tipo de vehículo es?"
      label="Tipo de vehículo"
      backTo={pathAnterior(6)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(6))}
    >
      <StepCards
        options={TIPOS}
        value={tipo}
        onChange={(v) => update('vehiculo', { tipo: v })}
        onAutoAdvance={() => next(pathSiguiente(6))}
      />
    </WizardLayout>
  )
}

export default PasoTipo
