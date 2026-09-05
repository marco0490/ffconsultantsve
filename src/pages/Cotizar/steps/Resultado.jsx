import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheck, FiChevronDown, FiEdit2, FiMail, FiMessageCircle } from 'react-icons/fi'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import Toast from '../../../components/Cotizador/Toast'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'

const FRECUENCIAS = [
  { key: 'anual', label: 'Anual', sufijo: '/año' },
  { key: 'semestral', label: 'Semestral', sufijo: '/sem' },
  { key: 'trimestral', label: 'Trimestral', sufijo: '/trim' },
  { key: 'mensual', label: 'Mensual', sufijo: '/mes' },
]

const BADGES = {
  'mejor-precio': '💰 Mejor precio',
  'mayor-cobertura': '🛡️ Mayor cobertura',
  recomendada: '⭐ Recomendada',
}

const WHATSAPP = '584129713806'

function Resultado() {
  const navigate = useNavigate()
  const { state, update, setSeccion, next } = useCotizadorState()
  const { cotizaciones, frecuencia } = state.resultado
  const [resumenAbierto, setResumenAbierto] = useState(false)
  const [toast, setToast] = useState('')

  // Sin planes (entrada directa o estado limpio): recalcular.
  useEffect(() => {
    if (!cotizaciones || cotizaciones.length === 0) {
      navigate('/cotizar/calculando', { replace: true })
    }
  }, [cotizaciones, navigate])

  if (!cotizaciones || cotizaciones.length === 0) return null

  const nombre = state.persona.nombre || ''
  const freq = FRECUENCIAS.find((f) => f.key === frecuencia) || FRECUENCIAS[0]
  const setFrecuencia = (key) => update('resultado', { frecuencia: key })

  const elegir = (plan) => {
    setSeccion('resultado', { ...state.resultado, seleccion: plan })
    next('/cotizar/emision')
  }

  const autoTexto = [
    state.vehiculo.marca,
    state.vehiculo.modelo === 'Otro modelo' ? state.vehiculo.modeloOtro : state.vehiculo.modelo,
    state.vehiculo.anio,
  ]
    .filter(Boolean)
    .join(' ')

  const waMsg = encodeURIComponent(
    `Hola, soy ${nombre}. Coticé un seguro para mi ${autoTexto} y quiero hablar con un asesor.`,
  )

  return (
    <div className="min-h-screen w-full px-5 py-6">
      <div className="max-w-[960px] mx-auto">
        {/* Cabecera */}
        <header className="flex items-center justify-center h-12 mb-4">
          <span className="text-sm font-bold tracking-[0.2em] text-primary">FUTURE FINANCIAL</span>
        </header>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar size={56} />
          <p className="mt-2 text-xs font-semibold text-gray-500">{AVATAR_NOMBRE}</p>
          <p className="mt-2 text-lg text-gray-700">
            ¡Listo{nombre ? `, ${nombre}` : ''} 🥳! Estas son tus opciones
          </p>
        </div>

        {/* Selector de frecuencia */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 bg-gray-100 rounded-2xl max-w-full">
            {FRECUENCIAS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFrecuencia(f.key)}
                className={`px-4 h-10 rounded-xl text-sm font-semibold transition-all ${
                  frecuencia === f.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cotizaciones.map((plan) => (
            <div
              key={plan.plan_id}
              className="flex flex-col rounded-3xl border-2 border-gray-200 bg-white p-5 shadow-sm"
            >
              {plan.badge && (
                <span className="self-start text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                  {BADGES[plan.badge] || ''}
                </span>
              )}
              <h3 className="font-bold text-gray-800 text-lg">{plan.aseguradora}</h3>

              <div className="mt-3 mb-1">
                <span className="text-xs text-gray-400 uppercase tracking-wide">Desde</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-400 text-lg">USD</span>
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.precios[freq.key]}
                  </span>
                  <span className="text-gray-400 text-sm">{freq.sufijo}</span>
                </div>
                {frecuencia !== 'anual' && (
                  <p className="text-xs text-gray-400 mt-0.5">Equivale a USD {plan.precios.anual}/año</p>
                )}
                {/* DEMO: línea RCV como alternativa económica al casco */}
                {plan.rcvMensual != null && (
                  <p className="text-xs font-medium text-primary mt-1">
                    ¿Solo lo básico? RCV desde USD {plan.rcvMensual}/mes
                  </p>
                )}
              </div>

              <ul className="mt-3 space-y-1.5 flex-1">
                {plan.coberturas.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCheck className="text-green-500 shrink-0" size={16} />
                    {c}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 mt-3">Deducible: {plan.deducible}</p>

              <button
                type="button"
                onClick={() => elegir(plan)}
                className="mt-4 w-full h-12 rounded-2xl font-bold text-white bg-primary hover:brightness-110 active:scale-[0.99] transition-all"
              >
                Me interesa este plan
              </button>
            </div>
          ))}
        </div>

        {/* Resumen colapsable */}
        <div className="mt-6 max-w-[560px] mx-auto">
          <button
            type="button"
            onClick={() => setResumenAbierto((v) => !v)}
            className="w-full flex items-center justify-between px-4 h-12 rounded-2xl border-2 border-gray-200 bg-white text-gray-700"
          >
            <span className="text-sm font-medium truncate">
              {autoTexto || 'Tu vehículo'} · Uso {state.vehiculo.uso || '—'} · Suma USD{' '}
              {state.vehiculo.valorUSD}
            </span>
            <FiChevronDown className={`shrink-0 transition-transform ${resumenAbierto ? 'rotate-180' : ''}`} />
          </button>
          {resumenAbierto && (
            <div className="mt-2 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-600 space-y-1">
              <p>Estado: {state.vehiculo.estado || '—'}</p>
              <p>Tomador: {nombre} {state.persona.apellido}</p>
              <p>Contacto: {state.contacto.email}</p>
              <button
                type="button"
                onClick={() => navigate('/cotizar/marca')}
                className="mt-2 inline-flex items-center gap-1 text-primary font-semibold"
              >
                <FiEdit2 size={14} /> Editar datos
              </button>
            </div>
          )}
        </div>

        {/* Acciones secundarias */}
        <div className="mt-5 max-w-[560px] mx-auto flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            /* DEMO: envío por correo simulado (sin EmailJS real) */
            onClick={() => setToast(`Enviado a ${state.contacto.email || 'tu correo'}`)}
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold"
          >
            <FiMail size={18} /> Enviarme por correo
          </button>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#25D366] text-white font-semibold"
          >
            <FiMessageCircle size={18} /> Hablar con un asesor
          </a>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Cotización referencial sujeta a confirmación por la aseguradora.
        </p>
      </div>
      <Toast msg={toast} onClose={() => setToast('')} />
    </div>
  )
}

export default Resultado
