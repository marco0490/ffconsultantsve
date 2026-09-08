import { useEffect, useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepInput from '../../../components/Cotizador/StepInput'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguienteEmision, pathAnteriorEmision, TOTAL_EMISION } from '../../../components/Cotizador/steps.config'

// DEMO: valores razonables; ajustar a los que acepte el core.
const PUESTOS = [
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '7', label: '7' },
  { value: '9+', label: '9+' },
]
const USOS = [
  { value: 'particular', label: 'Particular' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'transporte', label: 'Transporte' },
]

const PLACA_RE = /^[A-Z0-9]{6,7}$/
const SERIAL_RE = /^[A-HJ-NPR-Z0-9]{17}$/ // 17 alfanum, sin I/O/Q (estándar VIN)

function EmisionVehiculo() {
  const { state, setState, update, next } = useCotizadorState()
  const ev = state.emision.vehiculo
  const [touched, setTouched] = useState({})
  const marcar = (c) => setTouched((t) => ({ ...t, [c]: true }))

  // Prefill desde la Parte 1 (placa y uso) la primera vez.
  useEffect(() => {
    const parche = {}
    if (!ev.placa && state.vehiculo.placa) parche.placa = state.vehiculo.placa
    if (!ev.uso && state.vehiculo.uso) parche.uso = state.vehiculo.uso
    if (Object.keys(parche).length) {
      setState((prev) => ({
        ...prev,
        emision: { ...prev.emision, vehiculo: { ...prev.emision.vehiculo, ...parche } },
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = (campo, val) =>
    update('emision', { vehiculo: { ...state.emision.vehiculo, [campo]: val } })

  const placaOk = PLACA_RE.test(ev.placa)
  const serialOk = SERIAL_RE.test(ev.serialCarroceria)
  const colorOk = ev.color.trim().length >= 3
  const valido = placaOk && serialOk && colorOk && Boolean(ev.puestos) && Boolean(ev.uso)

  return (
    <WizardLayout
      paso={0}
      total={TOTAL_EMISION}
      progresoPrefijo="Emisión · Paso"
      barClass="bg-emerald-500"
      avatarMsg={`Vamos a emitir tu póliza de ${state.resultado.seleccion?.aseguradora || 'tu aseguradora'} 🎉 Primero, los datos del auto`}
      backTo={pathAnteriorEmision(0)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguienteEmision(0))}
    >
      <StepForm>
        <Field label="Placa" error={touched.placa && !placaOk ? 'La placa debe tener entre 6 y 7 caracteres' : null}>
          <StepInput
            value={ev.placa}
            onChange={(v) => set('placa', v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7))}
            onBlur={() => marcar('placa')}
            placeholder="AB123CD"
            error={touched.placa && !placaOk}
          />
        </Field>

        <Field
          label="Serial de carrocería"
          error={touched.serial && !serialOk ? 'El serial debe tener 17 caracteres (sin I, O ni Q)' : null}
          help="17 caracteres. Está en el carnet de circulación o en la puerta del piloto."
        >
          <StepInput
            value={ev.serialCarroceria}
            onChange={(v) => set('serialCarroceria', v.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '').slice(0, 17))}
            onBlur={() => marcar('serial')}
            placeholder="8AJKB3CD1N1234567"
            error={touched.serial && !serialOk}
          />
        </Field>

        <Field label="Color" error={touched.color && !colorOk ? 'Indica el color del vehículo' : null}>
          <StepInput
            value={ev.color}
            onChange={(v) => set('color', v)}
            onBlur={() => marcar('color')}
            placeholder="Ej: Gris plata"
            error={touched.color && !colorOk}
          />
        </Field>

        <Field label="Serial del motor (opcional)" help="Si lo tienes a la mano; si no, lo completamos luego.">
          <StepInput
            value={ev.serialMotor}
            onChange={(v) => set('serialMotor', v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20))}
            placeholder="Ej: 2AZ1234567"
          />
        </Field>

        <Field label="Puestos / capacidad">
          <StepCards options={PUESTOS} value={ev.puestos} onChange={(v) => set('puestos', v)} columns={2} />
        </Field>

        <Field label="Uso del vehículo">
          <StepCards options={USOS} value={ev.uso} onChange={(v) => set('uso', v)} />
        </Field>
      </StepForm>
    </WizardLayout>
  )
}

export default EmisionVehiculo
