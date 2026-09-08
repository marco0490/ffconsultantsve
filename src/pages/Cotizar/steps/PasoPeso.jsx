import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { GRUPOS_PESO } from '../../../data/vehiculos'

// Fallback condicional: se muestra solo cuando no conocemos el peso del modelo.
// No forma parte del conteo de progreso (showProgress=false).
function PasoPeso() {
  const { state, update, next } = useCotizadorState()
  const grupoPeso = state.vehiculo.grupoPeso
  const opciones = GRUPOS_PESO.map((g) => ({ value: g, label: g }))
  const valido = Boolean(grupoPeso)

  return (
    <WizardLayout
      showProgress={false}
      avatarMsg="Un dato más para tarifar tu RCV: ¿cuánto pesa tu vehículo aprox.? 📦"
      label="Grupo de peso del vehículo"
      backTo="/cotizar/clase-uso"
      nextDisabled={!valido}
      onNext={() => valido && next('/cotizar/uso')}
    >
      <StepCards
        options={opciones}
        value={grupoPeso}
        onChange={(v) => update('vehiculo', { grupoPeso: v })}
        onAutoAdvance={() => next('/cotizar/uso')}
      />
    </WizardLayout>
  )
}

export default PasoPeso
