import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

// Años desde el actual hasta 1995 (descendente).
const ANIO_ACTUAL = new Date().getFullYear()
const ANIOS = Array.from({ length: ANIO_ACTUAL - 1995 + 1 }, (_, i) => ANIO_ACTUAL - i)

function PasoAnio() {
  const { state, update, next } = useCotizadorState()
  const { marca, modelo, modeloOtro, anio } = state.vehiculo
  const nombreAuto = [marca, modelo === 'Otro modelo' ? modeloOtro : modelo].filter(Boolean).join(' ') || 'auto'
  const valido = Boolean(anio)

  return (
    <WizardLayout
      paso={3}
      avatarMsg={`¿De qué año es tu ${nombreAuto}?`}
      label="Selecciona el año"
      backTo={pathAnterior(3)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(3))}
    >
      <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto pr-1">
        {ANIOS.map((y) => {
          const sel = anio === y
          return (
            <button
              key={y}
              type="button"
              onClick={() => update('vehiculo', { anio: y })}
              className={`h-12 rounded-xl border-2 font-semibold transition-all ${
                sel
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {y}
            </button>
          )
        })}
      </div>
    </WizardLayout>
  )
}

export default PasoAnio
