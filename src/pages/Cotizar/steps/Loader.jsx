import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiAlertTriangle, FiRefreshCw, FiMessageCircle } from 'react-icons/fi'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { construirPlanes } from '../../../data/planes'

const MENSAJES = [
  'Consultando Real Seguros…',
  'Consultando Estar Seguros…',
  'Consultando Seguros Caracas…',
  'Comparando las mejores opciones para ti…',
]

const MIN_MS = 2500 // se ven los mensajes rotativos aunque la API responda antes
const MAX_MS = 8000 // timeout duro de la llamada
const WHATSAPP = '584129713806'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Pide los planes al backend (api/cotizar) con timeout; si falla o expira,
// cae al cálculo local. Devuelve { planes, cotizacionId, via }.
async function obtenerPlanes(vehiculo, persona) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), MAX_MS)
  try {
    const res = await fetch('/api/cotizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehiculo, persona }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data.planes) || data.planes.length === 0) throw new Error('respuesta sin planes')
    return { planes: data.planes, cotizacionId: data.cotizacion_id, via: 'api' }
  } catch (apiError) {
    // Fallback local (tarifas demo).
    try {
      const planes = construirPlanes(vehiculo, persona)
      if (!Array.isArray(planes) || planes.length === 0) throw new Error('fallback sin planes')
      return { planes, cotizacionId: `cot_local_${Date.now()}`, via: 'fallback', apiError: apiError.message }
    } catch (fallbackError) {
      return { via: 'error', apiError: apiError.message, fallbackError: fallbackError.message }
    }
  } finally {
    clearTimeout(t)
  }
}

function Loader() {
  const navigate = useNavigate()
  const { state, update, next } = useCotizadorState()
  const [idx, setIdx] = useState(0)
  const [error, setError] = useState(false)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    // Entrada directa sin datos: volver al inicio del wizard.
    if (!state.vehiculo.valorUSD) {
      navigate('/cotizar', { replace: true })
      return
    }

    let cancelado = false
    setError(false)
    setIdx(0)
    const inicio = Date.now()
    const iv = setInterval(() => setIdx((i) => Math.min(i + 1, MENSAJES.length - 1)), 900)

    ;(async () => {
      const r = await obtenerPlanes(state.vehiculo, state.persona)

      // Garantizar el mínimo de tiempo para que se lean los mensajes.
      const transcurrido = Date.now() - inicio
      if (transcurrido < MIN_MS) await delay(MIN_MS - transcurrido)
      if (cancelado) return

      if (r.via === 'error') {
        console.warn('[cotizador] loader → ERROR (api y fallback fallaron):', r.apiError, '|', r.fallbackError)
        setError(true)
        return
      }
      console.log(
        `[cotizador] loader → ${r.via} (${r.planes.length} planes)` +
          (r.apiError ? ` · la API falló: ${r.apiError}` : ''),
      )
      update('resultado', { cotizaciones: r.planes, cotizacionId: r.cotizacionId })
      next('/cotizar/resultado')
    })()

    return () => {
      cancelado = true
      clearInterval(iv)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intento])

  if (error) {
    const waMsg = encodeURIComponent('Hola, tuve un problema al cotizar mi seguro de auto en la web.')
    return (
      <div className="min-h-screen w-full max-w-[480px] mx-auto flex flex-col items-center justify-center text-center px-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <FiAlertTriangle className="text-red-500" size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">No pudimos calcular tu cotización</h2>
        <p className="text-gray-500">
          Tuvimos un problema al comparar las aseguradoras. Puedes intentarlo de nuevo o
          escribirnos y un asesor te ayuda enseguida.
        </p>
        <button
          type="button"
          onClick={() => setIntento((n) => n + 1)}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 h-14 rounded-2xl font-bold text-white bg-primary hover:brightness-110"
        >
          <FiRefreshCw size={18} /> Intentar de nuevo
        </button>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-2xl font-bold text-white bg-[#25D366]"
        >
          <FiMessageCircle size={18} /> Hablar con un asesor
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full max-w-[480px] mx-auto flex flex-col items-center justify-center text-center px-6 gap-5">
      <Avatar size={72} />
      <p className="text-xs font-semibold text-gray-500">{AVATAR_NOMBRE}</p>
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-700 min-h-[3.5rem]">{MENSAJES[idx]}</p>
    </div>
  )
}

export default Loader
