import { useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepSelectSearch from '../../../components/Cotizador/StepSelectSearch'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'
import { ESTADOS } from '../../../data/estados'

const PLACA_RE = /^[A-Z0-9]{6,7}$/

// El uso del vehículo ahora se captura como "Clase de uso" (paso anterior);
// aquí solo quedan el estado donde circula y la placa (opcional).
function PasoUso() {
  const { state, update, next } = useCotizadorState()
  const [placaTouched, setPlacaTouched] = useState(false)
  const { estado, placa } = state.vehiculo

  const placaOk = placa === '' || PLACA_RE.test(placa)
  const valido = Boolean(estado) && placaOk
  const placaError = placaTouched && !placaOk ? 'La placa debe tener entre 6 y 7 caracteres' : null

  const onPlaca = (v) => {
    setPlacaTouched(true)
    const limpio = v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
    update('vehiculo', { placa: limpio })
  }

  return (
    <WizardLayout
      paso={8}
      avatarMsg="¿Dónde circula tu auto? 📍"
      backTo={pathAnterior(8)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(8))}
    >
      <StepForm>
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
