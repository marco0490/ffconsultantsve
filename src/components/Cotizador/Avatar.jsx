/* eslint-disable react/prop-types */
// Avatar guía del cotizador.
// PLACEHOLDER temporal: círculo con iniciales "FF" y nombre "Asesora FFC".
// Reemplazar por la foto/ilustración definitiva cuando esté disponible.

export const AVATAR_NOMBRE = 'Asesora FFC'

function Avatar({ size = 64 }) {
  return (
    <div
      className="rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md select-none"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      role="img"
      aria-label={AVATAR_NOMBRE}
    >
      FF
    </div>
  )
}

export default Avatar
