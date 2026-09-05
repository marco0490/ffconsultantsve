import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepInput from '../../../components/Cotizador/StepInput'
import StepSelectSearch from '../../../components/Cotizador/StepSelectSearch'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { TOTAL_EMISION, pathAnteriorEmision } from '../../../components/Cotizador/steps.config'

const OPERADORAS = ['0412', '0414', '0424', '0416', '0426', '0422']
const DOCS = ['V', 'E', 'J']

// DEMO: bancos de respaldo si /api/catalogos no responde.
const BANCOS_DEMO = [
  { codigo: '0102', nombre: 'Banco de Venezuela' },
  { codigo: '0105', nombre: 'Banco Mercantil' },
  { codigo: '0108', nombre: 'BBVA Provincial' },
  { codigo: '0134', nombre: 'Banesco' },
  { codigo: '0163', nombre: 'Banco del Tesoro' },
  { codigo: '0191', nombre: 'Banco Nacional de Crédito (BNC)' },
]

async function cargarBancos() {
  try {
    const res = await fetch('/api/catalogos?tipo=bancos')
    if (!res.ok) throw new Error('status')
    const data = await res.json()
    if (!Array.isArray(data.bancos) || !data.bancos.length) throw new Error('vacío')
    return data.bancos
  } catch {
    return BANCOS_DEMO // DEMO
  }
}

async function iniciarPago(body) {
  try {
    const res = await fetch('/api/pago-iniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('status')
    return await res.json()
  } catch {
    return { pago_id: `pago:${body.solicitud_id}:local`, estado: 'esperando_codigo' } // DEMO
  }
}

async function confirmarPago(body) {
  try {
    const res = await fetch('/api/pago-confirmar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('status')
    return await res.json()
  } catch {
    // DEMO: 123456 aprueba; cualquier otro rechaza.
    return String(body.codigo).trim() === '123456'
      ? { estado: 'aprobado' }
      : { estado: 'rechazado', motivo: 'Código incorrecto o vencido' }
  }
}

function EmisionPago() {
  const navigate = useNavigate()
  const { state } = useCotizadorState()
  const em = state.emision

  // Datos del pagador: SOLO en memoria del componente (no en el estado global).
  const [cedTipo, setCedTipo] = useState(em.tomador.esMismo ? state.persona.cedulaTipo : em.tomador.docTipo)
  const [cedNum, setCedNum] = useState(em.tomador.esMismo ? state.persona.cedulaNumero : em.tomador.docNumero)
  const [banco, setBanco] = useState('')
  const [operadora, setOperadora] = useState(state.contacto.operadora || '0412')
  const [tel, setTel] = useState(state.contacto.telefono || '')
  const [codigo, setCodigo] = useState('')

  const [bancos, setBancos] = useState(BANCOS_DEMO)
  const [subfase, setSubfase] = useState('datos') // 'datos' | 'codigo'
  const [pagoId, setPagoId] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [intentos, setIntentos] = useState(0)
  const [rechazo, setRechazo] = useState(null)

  useEffect(() => {
    if (!em.solicitudId) {
      navigate('/cotizar/emision/verificar', { replace: true })
      return
    }
    cargarBancos().then(setBancos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const datosOk = /^\d{6,10}$/.test(cedNum) && Boolean(banco) && /^\d{7}$/.test(tel)

  const solicitarCodigo = async () => {
    if (!datosOk || cargando) return
    setCargando(true)
    setRechazo(null)
    const r = await iniciarPago({
      solicitud_id: em.solicitudId,
      cedula: `${cedTipo}${cedNum}`,
      banco,
      telefono: `${operadora}${tel}`,
    })
    setPagoId(r.pago_id)
    setIntentos((n) => n + 1)
    setSubfase('codigo')
    setCargando(false)
  }

  const confirmar = async () => {
    if (!/^\d{6,8}$/.test(codigo) || cargando) return
    setCargando(true)
    setRechazo(null)
    const r = await confirmarPago({ pago_id: pagoId, codigo })
    setCargando(false)
    if (r.estado === 'aprobado') {
      navigate('/cotizar/emision/emitiendo')
    } else {
      setRechazo(r.motivo || 'No pudimos confirmar el pago')
      setCodigo('')
    }
  }

  const reenviar = async () => {
    if (intentos >= 3 || cargando) return
    await solicitarCodigo()
  }

  return (
    <WizardLayout
      paso={4}
      total={TOTAL_EMISION}
      progresoPrefijo="Emisión · Paso"
      barClass="bg-emerald-500"
      avatarMsg="Pago seguro con Pago Móvil. Te llegará un código por SMS 📱"
      backTo={pathAnteriorEmision(4)}
      hideNext
    >
      {/* Resumen fijo */}
      <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4 mb-5 text-center">
        <p className="text-2xl font-extrabold text-gray-900">USD {em.montoUSD}</p>
        {em.montoBs != null && <p className="text-sm text-gray-500">≈ Bs. {em.montoBs}</p>}
        <p className="text-xs text-gray-500 mt-1">{state.resultado.seleccion?.aseguradora}</p>
      </div>

      {subfase === 'datos' ? (
        <>
          <StepForm>
            <Field label="Cédula / RIF del pagador">
              <div className="flex gap-2">
                <div className="flex rounded-xl border-2 border-gray-200 overflow-hidden shrink-0">
                  {DOCS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setCedTipo(d)}
                      className={`w-10 h-12 font-bold transition-colors ${cedTipo === d ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <StepInput
                  className="flex-1 min-w-0"
                  value={cedNum}
                  onChange={(v) => setCedNum(v.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                  placeholder="12345678"
                />
              </div>
            </Field>

            <Field label="Banco">
              <StepSelectSearch
                options={bancos.map((b) => ({ value: b.codigo, label: `${b.codigo} · ${b.nombre}` }))}
                value={banco}
                onChange={setBanco}
                placeholder="Buscar banco…"
              />
            </Field>

            <Field label="Teléfono afiliado a Pago Móvil">
              <div className="flex gap-2">
                <span className="h-12 flex items-center px-1 text-gray-500 font-medium select-none shrink-0">+58</span>
                <select
                  className="h-12 w-[110px] px-2 rounded-xl border-2 border-gray-200 focus:border-primary outline-none bg-white text-gray-700 font-medium shrink-0"
                  value={operadora}
                  onChange={(e) => setOperadora(e.target.value)}
                >
                  {OPERADORAS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <StepInput
                  className="flex-1 min-w-0"
                  value={tel}
                  onChange={(v) => setTel(v.replace(/\D/g, '').slice(0, 7))}
                  inputMode="numeric"
                  placeholder="1234567"
                />
              </div>
            </Field>
          </StepForm>

          <button
            type="button"
            onClick={solicitarCodigo}
            disabled={!datosOk || cargando}
            className={`mt-6 w-full h-14 rounded-2xl font-bold text-white text-lg inline-flex items-center justify-center gap-2 ${
              !datosOk || cargando ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:brightness-110'
            }`}
          >
            {cargando && <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {cargando ? 'Solicitando…' : 'Solicitar código'}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Revisa tus mensajes. Tu banco te envió un código de seguridad.
          </p>
          <StepInput
            value={codigo}
            onChange={(v) => setCodigo(v.replace(/\D/g, '').slice(0, 8))}
            inputMode="numeric"
            placeholder="Código de 6 dígitos"
            autoFocus
            error={Boolean(rechazo)}
          />
          {rechazo && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <FiAlertCircle size={15} /> {rechazo}
            </p>
          )}

          <button
            type="button"
            onClick={confirmar}
            disabled={!/^\d{6,8}$/.test(codigo) || cargando}
            className={`mt-5 w-full h-14 rounded-2xl font-bold text-white text-lg inline-flex items-center justify-center gap-2 ${
              !/^\d{6,8}$/.test(codigo) || cargando ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:brightness-110'
            }`}
          >
            {cargando && <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {cargando ? 'Confirmando…' : 'Confirmar pago'}
          </button>

          <button
            type="button"
            onClick={reenviar}
            disabled={intentos >= 3 || cargando}
            className="mt-3 w-full text-sm text-primary font-semibold disabled:text-gray-300"
          >
            {intentos >= 3 ? 'Máximo de reenvíos alcanzado' : 'No me llegó, reenviar'}
          </button>
          <p className="mt-4 text-center text-xs text-gray-400">🔒 Tus datos de pago no se guardan.</p>
        </>
      )}
    </WizardLayout>
  )
}

export default EmisionPago
