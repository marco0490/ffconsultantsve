/* eslint-disable react/prop-types */
import { FiCheck } from 'react-icons/fi'

/**
 * Tarjetas tipo radio.
 * - options: array de { value, label, emoji?, desc? }.
 * - value / onChange: selección actual.
 * - columns: 1 (apiladas) o 2 (grilla). Por defecto 1.
 * - onAutoAdvance: si se pasa, se llama ~300ms después de seleccionar
 *   (para avanzar automáticamente sin tocar "Siguiente").
 */
function StepCards({ options = [], value, onChange, columns = 1, onAutoAdvance }) {
  const handleSelect = (val) => {
    onChange(val)
    if (onAutoAdvance) {
      setTimeout(() => onAutoAdvance(val), 300)
    }
  }

  return (
    <div className={columns === 2 ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
      {options.map((o) => {
        const seleccionada = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={seleccionada}
            onClick={() => handleSelect(o.value)}
            className={`relative flex items-center gap-3 text-left p-4 rounded-2xl border-2 transition-all ${
              seleccionada
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${columns === 2 ? 'flex-col text-center items-center' : ''}`}
          >
            {o.emoji && <span className="text-2xl">{o.emoji}</span>}
            <span className="flex-1">
              <span className="block font-semibold text-gray-800">{o.label}</span>
              {o.desc && <span className="block text-xs text-gray-500 mt-0.5">{o.desc}</span>}
            </span>
            {seleccionada && (
              <FiCheck
                className={`text-primary ${columns === 2 ? 'absolute top-2 right-2' : ''}`}
                size={20}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default StepCards
