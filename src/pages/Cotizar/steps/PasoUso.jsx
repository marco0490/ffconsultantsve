import { useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepCards from '../../../components/Cotizador/StepCards'
import StepSelectSearch from '../../../components/Cotizador/StepSelectSearch'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'
import { ESTADOS } from '../../../data/estados'

const USOS = [
  { value: 'particular', label: 'Particular', emoji: '🚗' },
  { value: 'comercial', label: 'Comercial / transporte', emoji: '🚕', desc: 'Taxi, delivery, viajes compartidos' },
]

const PLACA_RE = /^[A-Z0-9]{6,7}$/

function PasoUso() {
  const { state, update, next } = useCotizadorState()
  const [placaTouched, setPlacaTouched] = useState(false)
  const { uso, estado, placa } = state.vehiculo

  const placaOk = placa === '' || PLACA_RE.test(placa)
  const valido = Boolean(uso) && Boolean(estado) && placaOk
  const placaError = placaTouched && !placaOk ? 'La placa debe tener entre 6 y 7 caracteres' : null

  const onPlaca = (v) => {
    setPlacaTouched(true)
    const limpio = v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
    update('vehiculo', { placa: limpio })
  }

  return (
    <WizardLayout
      paso={8}
      avatarMsg="Dos preguntas rápidas más sobre el auto"
      backTo={pathAnterior(8)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(8))}
    >
      <StepForm>
        <Field label="Uso del vehículo">
          <StepCards options={USOS} value={uso} onChange={(v) => update('vehiculo', { uso: v })} />
        </Field>

        <Field label="Estado donde circula">
          <StepSelectSearch
            options={ESTADOS}
            value={estado}
            onChange={(v) => update('vehiculo', { estado: v })}
            placeholder="Buscar estado…"
          />
        </Field>

        <Field label="Placa (opcional)" error={placaError} help="Nos permite preparar tu póliza más rápido.">
          <StepInput
            value={placa}
            onChange={onPlaca}
            placeholder="Ej: AB123CD"
            maxLength={7}
            error={Boolean(placaError)}
          />
        </Field>
      </StepForm>
    </WizardLayout>
  )
}

export default PasoUso
