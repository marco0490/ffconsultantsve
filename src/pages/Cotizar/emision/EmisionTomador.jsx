import { useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepInput from '../../../components/Cotizador/StepInput'
import StepCards from '../../../components/Cotizador/StepCards'
import StepSelectSearch from '../../../components/Cotizador/StepSelectSearch'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguienteEmision, pathAnteriorEmision, TOTAL_EMISION } from '../../../components/Cotizador/steps.config'
import { ESTADOS } from '../../../data/estados'

const DOCS = ['V', 'E', 'J', 'G']
const SEXOS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
]
const ESTADOS_CIVILES = ['Soltero/a', 'Casado/a', 'Viudo/a', 'Divorciado/a']
const selectCls =
  'w-full h-12 px-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none bg-white text-gray-700'

function EmisionTomador() {
  const { state, update, next } = useCotizadorState()
  const t = state.emision.tomador
  const a = state.emision.asegurado
  const d = state.emision.direccion
  const [touched, setTouched] = useState({})
  const marcar = (c) => setTouched((x) => ({ ...x, [c]: true }))

  const setTom = (campo, val) => update('emision', { tomador: { ...state.emision.tomador, [campo]: val } })
  const setAseg = (campo, val) => update('emision', { asegurado: { ...state.emision.asegurado, [campo]: val } })
  const setDir = (campo, val) => update('emision', { direccion: { ...state.emision.direccion, [campo]: val } })

  const nombreOk = t.nombre.trim().length >= 2
  const docOk = /^\d{6,10}$/.test(t.docNumero)
  const telOk = /^\d{10,11}$/.test(t.telefono.replace(/\D/g, ''))
  const tomadorOk = t.esMismo || (nombreOk && docOk && telOk)

  const asegOk = a.sexo && a.estadoCivil && a.ocupacion.trim().length >= 2 && a.pep !== ''
  const dirOk =
    d.estado && d.ciudad.trim() && d.municipio.trim() && d.urbanizacion.trim() && d.casaEdificio.trim()

  const valido = tomadorOk && asegOk && dirOk

  const p1 = state.persona

  return (
    <WizardLayout
      paso={1}
      total={TOTAL_EMISION}
      progresoPrefijo="Emisión · Paso"
      barClass="bg-emerald-500"
      avatarMsg="¿A nombre de quién va la póliza?"
      backTo={pathAnteriorEmision(1)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguienteEmision(1))}
    >
      {/* Toggle tomador */}
      <div className="flex rounded-2xl border-2 border-gray-200 overflow-hidden mb-4">
        {[
          { v: true, label: 'Soy yo' },
          { v: false, label: 'Otra persona / empresa' },
        ].map((o) => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => setTom('esMismo', o.v)}
            className={`flex-1 h-12 font-semibold text-sm transition-colors ${
              t.esMismo === o.v ? 'bg-primary text-white' : 'bg-white text-gray-500'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <StepForm>
        {t.esMismo ? (
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">{p1.nombre} {p1.apellido}</p>
            <p>C.I. {p1.cedulaTipo}-{p1.cedulaNumero}</p>
          </div>
        ) : (
          <>
            <Field label="Nombre completo / Razón social" error={touched.nombre && !nombreOk ? 'Escribe el nombre completo' : null}>
              <StepInput value={t.nombre} onChange={(v) => setTom('nombre', v)} onBlur={() => marcar('nombre')} placeholder="Nombre y apellido" error={touched.nombre && !nombreOk} />
            </Field>
            <Field label="Documento" error={touched.doc && !docOk ? 'El documento debe tener entre 6 y 10 números' : null}>
              <div className="flex gap-2">
                <div className="flex rounded-xl border-2 border-gray-200 overflow-hidden shrink-0">
                  {DOCS.map((dd) => (
                    <button key={dd} type="button" onClick={() => setTom('docTipo', dd)} className={`w-10 h-12 font-bold transition-colors ${t.docTipo === dd ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}>{dd}</button>
                  ))}
                </div>
                <StepInput className="flex-1 min-w-0" value={t.docNumero} onChange={(v) => setTom('docNumero', v.replace(/\D/g, '').slice(0, 10))} onBlur={() => marcar('doc')} inputMode="numeric" placeholder="12345678" error={touched.doc && !docOk} />
              </div>
            </Field>
            <Field label="Teléfono" error={touched.tel && !telOk ? 'Escribe un teléfono válido' : null}>
              <StepInput value={t.telefono} onChange={(v) => setTom('telefono', v.replace(/\D/g, '').slice(0, 11))} onBlur={() => marcar('tel')} inputMode="tel" prefix="+58" placeholder="4121234567" error={touched.tel && !telOk} />
            </Field>
          </>
        )}

        <Field label="Sexo">
          <StepCards options={SEXOS} value={a.sexo} onChange={(v) => setAseg('sexo', v)} columns={2} />
        </Field>

        <Field label="Estado civil">
          <select className={selectCls} value={a.estadoCivil} onChange={(e) => setAseg('estadoCivil', e.target.value)}>
            <option value="">Selecciona…</option>
            {ESTADOS_CIVILES.map((ec) => (
              <option key={ec} value={ec}>{ec}</option>
            ))}
          </select>
        </Field>

        <Field label="Ocupación" error={touched.ocup && !(a.ocupacion.trim().length >= 2) ? 'Indica tu ocupación' : null}>
          <StepInput value={a.ocupacion} onChange={(v) => setAseg('ocupacion', v)} onBlur={() => marcar('ocup')} placeholder="Ej: Ingeniero, comerciante…" error={touched.ocup && !(a.ocupacion.trim().length >= 2)} />
        </Field>

        <Field label="¿Persona expuesta políticamente (PEP)?" help="Cargos públicos relevantes, tú o un familiar cercano.">
          <StepCards options={[{ value: 'no', label: 'No' }, { value: 'si', label: 'Sí' }]} value={a.pep} onChange={(v) => setAseg('pep', v)} columns={2} />
        </Field>

        {/* Dirección de habitación (9 campos, modelo Estar) */}
        <div>
          <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">Dirección de habitación</span>
          <div className="space-y-2">
            <StepSelectSearch options={ESTADOS} value={d.estado} onChange={(v) => setDir('estado', v)} placeholder="Estado…" />
            <div className="grid grid-cols-2 gap-2">
              <StepInput value={d.ciudad} onChange={(v) => setDir('ciudad', v)} placeholder="Ciudad" />
              <StepInput value={d.municipio} onChange={(v) => setDir('municipio', v)} placeholder="Municipio" />
            </div>
            <StepInput value={d.urbanizacion} onChange={(v) => setDir('urbanizacion', v)} placeholder="Urbanización / Sector" />
            <div className="grid grid-cols-2 gap-2">
              <StepInput value={d.avenida} onChange={(v) => setDir('avenida', v)} placeholder="Avenida" />
              <StepInput value={d.calle} onChange={(v) => setDir('calle', v)} placeholder="Calle" />
            </div>
            <StepInput value={d.casaEdificio} onChange={(v) => setDir('casaEdificio', v)} placeholder="Casa / Edificio" />
            <div className="grid grid-cols-2 gap-2">
              <StepInput value={d.piso} onChange={(v) => setDir('piso', v)} placeholder="Piso (opcional)" />
              <StepInput value={d.apto} onChange={(v) => setDir('apto', v)} placeholder="Apto (opcional)" />
            </div>
          </div>
        </div>
      </StepForm>
    </WizardLayout>
  )
}

export default EmisionTomador
