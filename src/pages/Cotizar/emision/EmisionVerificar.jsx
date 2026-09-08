/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiChevronDown, FiEdit2, FiLock } from 'react-icons/fi'
import Avatar, { AVATAR_NOMBRE } from '../../../components/Cotizador/Avatar'
import Toast from '../../../components/Cotizador/Toast'
import StepInput from '../../../components/Cotizador/StepInput'
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
  const cob = state.emision.coberturas
  const beneficiarios = state.emision.beneficiarios

  const setCob = (campo, val) => {
    const patch = { coberturas: { ...cob, [campo]: val } }
    // Al activar "ocupantes", asegurar al menos un beneficiario.
    if (campo === 'ocupantes' && val && beneficiarios.length === 0) {
      patch.beneficiarios = [{ nombre: '', cedula: '', parentesco: '', porcentaje: '' }]
    }
    update('emision', patch)
  }
  const setBenef = (i, campo, val) =>
    update('emision', { beneficiarios: beneficiarios.map((b, idx) => (idx === i ? { ...b, [campo]: val } : b)) })
  const addBenef = () =>
    update('emision', { beneficiarios: [...beneficiarios, { nombre: '', cedula: '', parentesco: '', porcentaje: '' }] })
  const removeBenef = (i) =>
    update('emision', { beneficiarios: beneficiarios.filter((_, idx) => idx !== i) })

  const benefCompleto = (b) =>
    b.nombre.trim() && /^\d{6,9}$/.test(b.cedula) && b.parentesco.trim() && b.porcentaje
  const benefOk = !cob.ocupantes || (beneficiarios.length > 0 && beneficiarios.every(benefCompleto))
  const puedeContinuar = terminos && benefOk

  const pagar = async () => {
    if (!puedeContinuar || enviando) return
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
          <p className="text-sm text-gray-600">Suma asegurada: {plan.sumaAsegurada}</p>
          <div className="mt-3">
            <span className="text-xs text-gray-500 uppercase">Monto a pagar</span>
            <p className="text-3xl font-extrabold text-gray-900">USD {montoUSD}</p>
            <p className="text-xs text-gray-400">Frecuencia: {state.resultado.frecuencia}</p>
          </div>
        </div>

        {/* Coberturas opcionales */}
        <div className="rounded-2xl border-2 border-gray-200 p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Coberturas opcionales</p>
          {[
            { key: 'exceso', label: 'Exceso de límite' },
            { key: 'defensaPenal', label: 'Asistencia legal y defensa penal' },
            { key: 'ocupantes', label: 'Accidentes personales para ocupantes' },
          ].map((c) => (
            <div key={c.key} className="flex items-center justify-between gap-3">
              <span className="text-sm text-gray-700">{c.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={cob[c.key]}
                onClick={() => setCob(c.key, !cob[c.key])}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${cob[c.key] ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${cob[c.key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}

          {cob.ocupantes && (
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <p className="text-xs text-gray-500">Indica al menos un beneficiario:</p>
              {beneficiarios.map((b, i) => (
                <div key={i} className="space-y-2 rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">Beneficiario {i + 1}</span>
                    {beneficiarios.length > 1 && (
                      <button type="button" onClick={() => removeBenef(i)} className="text-xs text-red-500 font-semibold">
                        Quitar
                      </button>
                    )}
                  </div>
                  <StepInput value={b.nombre} onChange={(v) => setBenef(i, 'nombre', v)} placeholder="Nombre y apellido" />
                  <div className="grid grid-cols-2 gap-2">
                    <StepInput value={b.cedula} onChange={(v) => setBenef(i, 'cedula', v.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" placeholder="Cédula" />
                    <StepInput value={b.parentesco} onChange={(v) => setBenef(i, 'parentesco', v)} placeholder="Parentesco" />
                  </div>
                  <StepInput value={b.porcentaje} onChange={(v) => setBenef(i, 'porcentaje', v.replace(/\D/g, '').slice(0, 3))} inputMode="numeric" suffix="%" placeholder="Participación" />
                </div>
              ))}
              <button type="button" onClick={addBenef} className="text-sm text-primary font-semibold">
                + Agregar beneficiario
              </button>
            </div>
          )}
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
          disabled={!puedeContinuar || enviando}
          className={`w-full h-14 rounded-2xl font-bold text-white text-lg transition-all inline-flex items-center justify-center gap-2 ${
            !puedeContinuar || enviando ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:brightness-110 active:scale-[0.99]'
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
