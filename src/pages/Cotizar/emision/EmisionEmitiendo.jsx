import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiClock, FiMessageCircle } from 'react-icons/fi'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'

const WHATSAPP = '584129713806'

function maskEmail(email = '') {
  const [u, d] = String(email).split('@')
  if (!d) return '***'
  const um = u.length <= 2 ? `${u[0] || '*'}*` : `${u[0]}${'*'.repeat(u.length - 2)}${u[u.length - 1]}`
  return `${um}@${d}`
}

function EmisionEmitiendo() {
  const navigate = useNavigate()
  const { state, update } = useCotizadorState()
  const em = state.emision
  const [idx, setIdx] = useState(0)
  const [timeout60, setTimeout60] = useState(false)

  const MENSAJES = [
    'Pago confirmado ✅',
    `Emitiendo tu póliza con ${state.resultado.seleccion?.aseguradora || 'tu aseguradora'}…`,
    'Generando tu documento…',
    'Creando tu acceso a la app…',
  ]

  useEffect(() => {
    if (!em.solicitudId) {
      navigate('/cotizar/emision/verificar', { replace: true })
      return undefined
    }
    let cancel = false
    let fallos = 0
    const inicio = Date.now()
    const rot = setInterval(() => setIdx((i) => Math.min(i + 1, MENSAJES.length - 1)), 1200)

    const finalizar = (r) => {
      update('emision', {
        poliza: {
          id: r.poliza_id,
          numero: r.poliza_id,
          pdfUrl: r.pdf_url,
          provisioning: r.provisioning,
        },
      })
      navigate('/cotizar/emision/listo')
    }

    // DEMO: sin backend, sintetizar la póliza emitida.
    const localEmitida = () => ({
      poliza_id: `POL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 899999)}`,
      pdf_url: '/demo/poliza-ejemplo.pdf',
      provisioning: { enviado: true, canal: 'email', destino: maskEmail(state.contacto.email) },
    })

    const poll = async () => {
      if (cancel) return
      let r = null
      try {
        const res = await fetch(
          `/api/solicitud-estado?id=${encodeURIComponent(em.solicitudId)}&email=${encodeURIComponent(state.contacto.email || '')}`,
        )
        if (!res.ok) throw new Error('status')
        r = await res.json()
      } catch {
        fallos += 1
      }
      if (cancel) return
      if (r && r.estado === 'emitida') return finalizar(r)

      const elapsed = Date.now() - inicio
      if (fallos >= 2 && elapsed >= 4000) return finalizar(localEmitida()) // DEMO
      if (elapsed >= 60000) {
        setTimeout60(true)
        return undefined
      }
      setTimeout(poll, 2000)
      return undefined
    }
    setTimeout(poll, 1500)

    return () => {
      cancel = true
      clearInterval(rot)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (timeout60) {
    const waMsg = encodeURIComponent('Hola, pagué mi póliza y estoy esperando la confirmación de emisión.')
    return (
      <div className="min-h-screen w-full max-w-[480px] mx-auto flex flex-col items-center justify-center text-center px-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
          <FiClock className="text-amber-500" size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Estamos terminando tu emisión</h2>
        <p className="text-gray-500">
          Tu pago fue confirmado. En cuanto tu póliza esté lista te avisaremos por correo. No
          necesitas hacer nada más.
        </p>
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
      <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-700 min-h-[3.5rem]">{MENSAJES[idx]}</p>
    </div>
  )
}

export default EmisionEmitiendo
