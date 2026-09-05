import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiDownload, FiSmartphone, FiMail, FiMessageCircle, FiCheckCircle } from 'react-icons/fi'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import Toast from '../../../components/Cotizador/Toast'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'

const WHATSAPP = '584129713806'
const STORAGE_KEY = 'ffc_cotizador_v1'
const ULTIMA_POLIZA_KEY = 'ffc_ultima_poliza'

function EmisionListo() {
  const navigate = useNavigate()
  const { state, reset } = useCotizadorState()
  const [toast, setToast] = useState('')

  // Datos a mostrar: del estado si venimos del flujo; si no (recarga), del
  // resumen guardado en sessionStorage.
  const [datos] = useState(() => {
    if (state.emision.poliza?.id) {
      return {
        poliza: state.emision.poliza,
        aseguradora: state.resultado.seleccion?.aseguradora || '',
        cobertura: state.resultado.seleccion?.cobertura || '',
        montoUSD: state.emision.montoUSD,
        nombre: state.persona.nombre || '',
        email: state.contacto.email || '',
      }
    }
    try {
      return JSON.parse(sessionStorage.getItem(ULTIMA_POLIZA_KEY) || 'null')
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!datos) {
      navigate('/cotizar', { replace: true })
      return
    }
    // Guardar la última póliza (para recargas) y limpiar el estado del cotizador.
    try {
      sessionStorage.setItem(ULTIMA_POLIZA_KEY, JSON.stringify(datos))
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignorar */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!datos) return null

  const { poliza, aseguradora, nombre } = datos
  const destino = poliza.provisioning?.destino || 'tu correo'

  const volverInicio = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="min-h-screen w-full max-w-[480px] mx-auto flex flex-col px-5 py-6">
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar size={64} />
        <p className="mt-2 text-xs font-semibold text-gray-500">{AVATAR_NOMBRE}</p>
        <p className="mt-2 text-lg text-gray-700">
          ¡Felicidades{nombre ? `, ${nombre}` : ''}! Tu póliza está emitida 🎉
        </p>
      </div>

      {/* Tarjeta de póliza */}
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 p-5">
        <div className="flex items-center gap-2 text-emerald-600 mb-2">
          <FiCheckCircle size={18} />
          <span className="text-sm font-semibold">Póliza emitida</span>
        </div>
        <p className="font-bold text-gray-800 text-lg">{aseguradora}</p>
        <p className="text-sm text-gray-600">N° {poliza.numero}</p>
        <p className="text-sm text-gray-600">Vigencia: 12 meses · Cobertura: {datos.cobertura || 'Casco'}</p>
        {datos.montoUSD != null && <p className="text-sm text-gray-600">Prima: USD {datos.montoUSD}</p>}
        <a
          href={poliza.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 h-12 rounded-2xl font-bold text-white bg-primary hover:brightness-110"
        >
          <FiDownload size={18} /> Descargar póliza (PDF)
        </a>
      </div>

      {/* Acceso a la app */}
      <div className="mt-4 rounded-3xl border-2 border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2 text-gray-800 mb-2">
          <FiSmartphone size={18} className="text-primary" />
          <span className="font-bold">Tu acceso a la app FFC</span>
        </div>
        <p className="text-sm text-gray-600">
          📩 Te enviamos tu <strong>clave temporal</strong> a <strong>{destino}</strong>.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Descarga la app FFC y entra con tu <strong>cédula</strong> y esa clave. Te pediremos crear
          una nueva al entrar.
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {['App Store', 'Google Play', 'Versión web'].map((t) => (
            <button
              key={t}
              type="button"
              /* DEMO: URLs de tienda pendientes */
              onClick={() => setToast('Enlace de la app disponible próximamente')}
              className="h-11 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-700"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Acciones secundarias */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          /* DEMO: envío por correo simulado */
          onClick={() => setToast(`Enviado a ${datos.email || 'tu correo'}`)}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold"
        >
          <FiMail size={18} /> Enviar póliza por correo
        </button>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, soy ${nombre}. Acabo de emitir mi póliza ${poliza.numero}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#25D366] text-white font-semibold"
        >
          <FiMessageCircle size={18} /> Hablar con un asesor
        </a>
      </div>

      <button type="button" onClick={volverInicio} className="mt-5 text-sm text-gray-400 font-semibold">
        Volver al inicio
      </button>

      <Toast msg={toast} onClose={() => setToast('')} />
    </div>
  )
}

export default EmisionListo
