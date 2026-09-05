import { useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

const MIN = 1000
const MAX = 150000
const PASO = 500

function PasoValor() {
  const { state, update, next } = useCotizadorState()
  const [touched, setTouched] = useState(false)
  const valor = state.vehiculo.valorUSD

  const numero = Number(valor) || 0
  const valido = numero >= MIN
  const error = touched && !valido ? 'El valor mínimo asegurable es USD 1.000' : null

  const setValor = (n) => update('vehiculo', { valorUSD: n })

  const onInput = (v) => {
    setTouched(true)
    const limpio = parseInt(v.replace(/\D/g, ''), 10)
    setValor(Number.isNaN(limpio) ? '' : limpio)
  }

  const display = valor === '' || valor == null ? '' : Number(valor).toLocaleString('es-VE')

  return (
    <WizardLayout
      paso={5}
      avatarMsg="¿Cuál es el valor aproximado de tu auto? Esto define la suma asegurada 💵"
      label="Valor del vehículo (USD)"
      help={!error ? 'Si no estás seguro, indica un valor aproximado. Un asesor lo confirmará contigo.' : null}
      error={error}
      backTo={pathAnterior(5)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(5))}
    >
      <StepInput
        value={display}
        onChange={onInput}
        onEnter={() => valido && next(pathSiguiente(5))}
        inputMode="numeric"
        prefix="USD"
        placeholder="0"
        error={Boolean(error)}
        autoFocus
      />

      <input
        type="range"
        min={MIN}
        max={MAX}
        step={PASO}
        value={Math.min(Math.max(numero || MIN, MIN), MAX)}
        onChange={(e) => {
          setTouched(true)
          setValor(parseInt(e.target.value, 10))
        }}
        className="w-full mt-6 accent-primary"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>USD 1.000</span>
        <span>USD 150.000</span>
      </div>
    </WizardLayout>
  )
}

export default PasoValor
