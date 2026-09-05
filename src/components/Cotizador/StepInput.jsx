/* eslint-disable react/prop-types */

/**
 * Campo de texto/numérico estilizado con soporte de:
 * - prefix / suffix (nodos a izquierda/derecha, ej. "+58", "USD").
 * - error: si viene, pinta el borde de rojo (el mensaje lo muestra WizardLayout o el Field).
 * - onEnter: callback al presionar Enter.
 * Resto de props (type, inputMode, maxLength, placeholder, autoFocus…) pasan al <input>.
 */
function StepInput({
  value,
  onChange,
  prefix,
  suffix,
  error,
  onEnter,
  className = '',
  ...rest
}) {
  return (
    <div
      className={`flex items-center rounded-xl border-2 transition-colors overflow-hidden ${
        error ? 'border-red-400' : 'border-gray-200 focus-within:border-primary'
      } ${className}`}
    >
      {prefix != null && (
        <span className="pl-3 pr-2 text-gray-500 font-medium select-none">{prefix}</span>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) onEnter()
        }}
        className="flex-1 h-12 px-3 outline-none border-0 focus:ring-0 bg-transparent min-w-0"
        {...rest}
      />
      {suffix != null && (
        <span className="pr-3 pl-2 text-gray-500 font-medium select-none">{suffix}</span>
      )}
    </div>
  )
}

export default StepInput
