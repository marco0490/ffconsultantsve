/* eslint-disable react/prop-types */

/**
 * Agrupación de 2–4 campos del mismo contexto en una pantalla.
 * StepForm es solo el contenedor con espaciado uniforme.
 * Field envuelve cada control con su label (MAYÚSCULAS) y su mensaje de error/ayuda.
 */
export function Field({ label, error, help, children }) {
  return (
    <div>
      {label && (
        <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
          {label}
        </span>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      ) : help ? (
        <p className="mt-1.5 text-sm text-gray-400">{help}</p>
      ) : null}
    </div>
  )
}

function StepForm({ children, className = '' }) {
  return <div className={`space-y-5 ${className}`}>{children}</div>
}

export default StepForm
