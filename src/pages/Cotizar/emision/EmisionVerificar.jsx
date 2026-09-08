/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiChevronDown, FiEdit2, FiLock } from 'react-icons/fi'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import Toast from '../../../components/Cotizador/Toast'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { TOTAL_EMISION, pathAnteriorEmision } from '../../../components/Cotizador/steps.config'

function Acordeon({ titulo, editarA, children, abiertoInicial = false }) {
  const [abierto, setAbierto] = useState(abiertoInicial)
  const navigate = useNavigate()
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between px-4 h-12 text-left"
      >
        <span className="font-semibold text-gray-800 text-sm uppercase tracking-wide">{titulo}</span>
        <FiChevronDown className={`transition-transform ${abierto ? 'rotate-180' : ''}`} />
      </button>
      {abierto && (
        <div className="px-4 pb-4 text-sm text-gray-600 space-y-1">
          {children}
          {editarA && (
            <button
              type="button"
              onClick={() => navigate(editarA)}
              className="mt-2 inline-flex items-center gap-1 text-primary font-semibold"
            >
              <FiEdit2 size={14} /> Editar
            </button>
          )}
        </div>
      )}
    </div>
  )
}

async function crearSolicitud(body) {
  try {
    const res = await fetch('/api/solicitud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const data = await res.json()
    if (!data.solicitud_id) throw new Error('sin solicitud_id')
    return data
  } catch {
    // DEMO: fallback local para que el flujo no se corte sin backend.
    return {
      solicitud_id: `sol_local_${Date.now()}`,
      montoUSD: body.montoUSD,
      montoBs: body.montoUSD ? Math.round(body.montoUSD * 40) : null,
    }
  }
}

function EmisionVerificar() {
  const navigate = useNavigate()
  const { state, update, next, back } = useCotizadorState()
  const [terminos, setTerminos] = useState(state.emision.terminosAceptados)
  const [enviando, setEnviando] = useState(false)
  const [toast, setToast] = useState('')

  const plan = state.resultado.seleccion
  if (!plan) {
    navigate('/cotizar/resultado', { replace: true })
    return null
  }

  const montoUSD = plan.precios[state.resultado.frecuencia] ?? plan.precios.anual
  const p = state.persona
  const ev = state.emision.vehiculo
  const tom = state.emision.tomador

  const pagar = async () => {
    if (!terminos || enviando) return
    setEnviando(true)
    update('emision', { terminosAceptados: true })
    const data = await crearSolicitud({
      cotizacion_id: state.resultado.cotizacionId,
      plan_id: plan.plan_id,
      montoUSD,
      emision: state.emision,
      contacto: state.contacto,
    })
    update('emision', {
      solicitudId: data.solicitud_id,
      montoUSD: data.montoUSD ?? montoUSD,
      montoBs: data.montoBs ?? null,
    })
    next('/cotizar/emision/pago')
  }

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col px-5 pb-6">
      <header className="relative flex items-center justify-center h-14 shrink-0">
        <button
          type="button"
          onClick={() => back(pathAnteriorEmision(3))}
          aria-label="Atrás"
          className="absolute left-0 w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10"
        >
          ‹
        </button>
        <span className="text-sm font-bold tracking-[0.2em] text-primary">FUTURE FINANCIAL</span>
      </header>

      <div className="mb-6 shrink-0">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((4 / TOTAL_EMISION) * 100)}%` }} />
        </div>
        <p className="mt-2 text-xs text-gray-400 text-right">Emisión · Paso 4 de {TOTAL_EMISION}</p>
      </div>

      <div className="flex flex-col items-center text-center mb-6 shrink-0">
        <Avatar size={56} />
        <p className="mt-2 text-xs font-semibold text-gray-500">{AVATAR_NOMBRE}</p>
        <p className="mt-2 text-base text-gray-700">
          Perfecto{p.nombre ? `, ${p.nombre}` : ''}. Revisa que todo esté correcto
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <Acordeon titulo="Datos personales" editarA="/cotizar/datos" abiertoInicial>
          <p>{p.nombre} {p.apellido}</p>
          <p>C.I. {p.cedulaTipo}-{p.cedulaNumero}</p>
        </Acordeon>

        <Acordeon titulo="Datos del auto" editarA="/cotizar/emision/vehiculo" abiertoInicial>
          <p>{state.vehiculo.marca} {state.vehiculo.modelo} {state.vehiculo.anio}</p>
          <p>Placa {ev.placa} · Serial {ev.serialCarroceria}</p>
          <p>Puestos {ev.puestos} · Uso {ev.uso}</p>
        </Acordeon>

        <Acordeon titulo="Datos de contacto" editarA="/cotizar/contacto">
          <p>{state.contacto.email}</p>
          <p>+58 {state.contacto.operadora} {state.contacto.telefono}</p>
          <p>Tomador: {tom.esMismo ? `${p.nombre} ${p.apellido}` : tom.nombre}</p>
        </Acordeon>

        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tu plan</p>
          <p className="font-bold text-gray-800 mt-1">{plan.aseguradora} · {plan.cobertura}</p>
          <p className="text-sm text-gray-600">Deducible: {plan.deducible} · Suma USD {plan.sumaAsegurada}</p>
          <div className="mt-3">
            <span className="text-xs text-gray-500 uppercase">Monto a pagar</span>
            <p className="text-3xl font-extrabold text-gray-900">USD {montoUSD}</p>
            <p className="text-xs text-gray-400">Frecuencia: {state.resultado.frecuencia}</p>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={terminos}
            onChange={(e) => setTerminos(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
          />
          <span className="text-sm text-gray-600">
            Acepto los términos y condiciones y las condiciones generales de la póliza (
            <Link to="/terminos" className="text-primary underline">Términos y Condiciones</Link>).
          </span>
        </label>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={pagar}
          disabled={!terminos || enviando}
          className={`w-full h-14 rounded-2xl font-bold text-white text-lg transition-all inline-flex items-center justify-center gap-2 ${
            !terminos || enviando ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:brightness-110 active:scale-[0.99]'
          }`}
        >
          {enviando ? (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <FiLock size={18} />
          )}
          {enviando ? 'Procesando…' : `Pagar USD ${montoUSD} con Pago Móvil`}
        </button>
      </div>
      <Toast msg={toast} onClose={() => setToast('')} />
    </div>
  )
}

export default EmisionVerificar
