import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathAnterior } from '../../../components/Cotizador/steps.config'
import { pesoDe, grupoPesoRCV } from '../../../data/vehiculos'

// Clase de uso para tarifar el RCV (esquema de la solicitud oficial, §10).
const CLASES = [
  { value: 'particular', label: 'Particular', emoji: '🚗' },
  { value: 'carga', label: 'Carga', emoji: '🚚' },
  { value: 'moto', label: 'Moto', emoji: '🏍️' },
  { value: 'transporte', label: 'Transporte', emoji: '🚐' },
]

function PasoClaseUso() {
  const { state, update, next } = useCotizadorState()
  const { marca, modelo, modeloOtro, claseUso } = state.vehiculo
  const valido = Boolean(claseUso)

  // Deduce el grupo de peso del catálogo; si no hay peso, va al paso fallback.
  const avanzar = () => {
    if (!valido) return
    const nombreModelo = modelo === 'Otro modelo' ? modeloOtro : modelo
    const grupo = grupoPesoRCV(pesoDe(marca, nombreModelo))
    if (grupo) {
      update('vehiculo', { grupoPeso: grupo })
      next('/cotizar/uso')
    } else {
      next('/cotizar/peso')
    }
  }

  return (
    <WizardLayout
      paso={7}
      avatarMsg="¿Cuál es la clase de uso del vehículo?"
      label="Clase de uso"
      backTo={pathAnterior(7)}
      nextDisabled={!valido}
      onNext={avanzar}
    >
      <StepCards
        options={CLASES}
        value={claseUso}
        onChange={(v) => update('vehiculo', { claseUso: v })}
        columns={2}
        onAutoAdvance={avanzar}
      />
    </WizardLayout>
  )
}

export default PasoClaseUso
