import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { construirPlanes } from '../../../data/planes'

const MENSAJES = [
  'Consultando Real Seguros…',
  'Consultando Estar Seguros…',
  'Consultando Seguros Caracas…',
  'Comparando las mejores opciones para ti…',
]

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Pide los planes al backend delgado (api/cotizar). Si no está disponible
// (p. ej. corriendo solo con Vite, sin server.dev.js), cae al cálculo local.
async function obtenerPlanes(vehiculo, persona) {
  try {
    const res = await fetch('/api/cotizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehiculo, persona }),
    })
    if (!res.ok) throw new Error('status')
    const data = await res.json()
    if (!data.planes || !data.planes.length) throw new Error('sin planes')
    return { planes: data.planes, cotizacionId: data.cotizacion_id }
  } catch {
    return { planes: construirPlanes(vehiculo, persona), cotizacionId: `cot_local_${Date.now()}` }
  }
}

function Loader() {
  const navigate = useNavigate()
  const { state, update, next } = useCotizadorState()
  const [idx, setIdx] = useState(0)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    // Entrada directa sin datos: volver al inicio del wizard.
    if (!state.vehiculo.valorUSD) {
      navigate('/cotizar', { replace: true })
      return
    }

    let vivo = true
    const iv = setInterval(() => setIdx((i) => Math.min(i + 1, MENSAJES.length - 1)), 900)

    const run = async () => {
      const [{ planes, cotizacionId }] = await Promise.all([
        obtenerPlanes(state.vehiculo, state.persona),
        delay(2600),
      ])
      if (!vivo) return
      update('resultado', { cotizaciones: planes, cotizacionId })
      next('/cotizar/resultado')
    }
    run()

    return () => {
      vivo = false
      clearInterval(iv)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
