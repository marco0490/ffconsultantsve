/* eslint-disable react/prop-types */
import { FiArrowLeft } from 'react-icons/fi'
import { useCotizadorState } from './useCotizadorState'
import Avatar, { AVATAR_NOMBRE } from './Avatar'
import { TOTAL_PASOS } from './steps.config'

/**
 * Estructura común de cada pantalla del wizard:
 * header (atrás + logo) · barra de progreso · avatar + mensaje ·
 * label · contenido (children) · ayuda/error · botón primario · footer de confianza.
 *
 * Props:
 * - paso: número 0..8 (para el progreso). Si showProgress=false se ignora.
 * - avatarMsg: micro-mensaje conversacional de la asesora.
 * - label: etiqueta en MAYÚSCULAS sobre el input.
 * - children: el input/contenido del paso.
 * - help / error: textos bajo el contenido (error tiene prioridad).
 * - onNext: acción del botón primario.
 * - nextLabel: texto del botón (por defecto "Siguiente").
 * - nextDisabled: deshabilita el botón primario.
 * - hideNext: oculta el botón (para pasos con auto-avance).
 * - backTo: ruta explícita del botón atrás (si se omite, vuelve al paso anterior).
 * - showProgress: muestra/oculta la barra de progreso (false en la bienvenida).
 */
function WizardLayout({
  paso = 0,
  avatarMsg,
  label,
  children,
  help,
  error,
  onNext,
  nextLabel = 'Siguiente',
  nextDisabled = false,
  hideNext = false,
  backTo,
  showProgress = true,
  total = TOTAL_PASOS,
  progresoPrefijo = 'Paso',
  barClass = 'bg-primary',
}) {
  const { back } = useCotizadorState()
  const progresoPct = Math.round(((paso + 1) / total) * 100)

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col px-5 pb-6">
      {/* Header */}
      <header className="relative flex items-center justify-center h-14 shrink-0">
        <button
          type="button"
          onClick={() => back(backTo)}
          aria-label="Atrás"
          className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors"
        >
          <FiArrowLeft size={22} />
        </button>
        <span className="text-sm font-bold tracking-[0.2em] text-primary">FUTURE FINANCIAL</span>
      </header>

      {/* Barra de progreso */}
      {showProgress && (
        <div className="mb-6 shrink-0">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${barClass}`}
              style={{ width: `${progresoPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-400 text-right">
            {progresoPrefijo} {paso + 1} de {total}
          </p>
        </div>
      )}

      {/* Avatar + mensaje */}
      <div className="flex flex-col items-center text-center mb-6 shrink-0">
        <Avatar size={64} />
        <p className="mt-2 text-xs font-semibold text-gray-500">{AVATAR_NOMBRE}</p>
        {avatarMsg && <p className="mt-2 text-base text-gray-700 max-w-[20rem]">{avatarMsg}</p>}
      </div>

      {/* Contenido */}
      <div className="flex-1">
        {label && (
          <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-3">
            {label}
          </span>
        )}
        {children}
        {error ? (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        ) : help ? (
          <p className="mt-2 text-sm text-gray-400">{help}</p>
        ) : null}
      </div>

      {/* Botón primario (anclado al fondo del contenedor) + footer de confianza */}
      {!hideNext && (
        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className={`w-full h-14 rounded-2xl font-bold text-white text-lg transition-all ${
              nextDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary hover:brightness-110 active:scale-[0.99]'
            }`}
          >
            {nextLabel}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">🔒 Tus datos están protegidos</p>
        </div>
      )}
    </div>
  )
}

export default WizardLayout
