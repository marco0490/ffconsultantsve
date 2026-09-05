import { useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguienteEmision, pathAnteriorEmision, TOTAL_EMISION } from '../../../components/Cotizador/steps.config'

const DOCS = ['V', 'E', 'J', 'G']

function EmisionTomador() {
  const { state, update, next } = useCotizadorState()
  const t = state.emision.tomador
  const [touched, setTouched] = useState({})
  const marcar = (c) => setTouched((x) => ({ ...x, [c]: true }))

  const set = (campo, val) => update('emision', { tomador: { ...state.emision.tomador, [campo]: val } })

  const nombreOk = t.nombre.trim().length >= 2
  const docOk = /^\d{6,10}$/.test(t.docNumero)
  const telOk = /^\d{10,11}$/.test(t.telefono.replace(/\D/g, ''))
  const valido = t.esMismo || (nombreOk && docOk && telOk)

  const p1 = state.persona
  const contacto = state.contacto

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
      {/* Toggle */}
      <div className="flex rounded-2xl border-2 border-gray-200 overflow-hidden mb-4">
        {[
          { v: true, label: 'Soy yo' },
          { v: false, label: 'Otra persona / empresa' },
        ].map((o) => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => set('esMismo', o.v)}
            className={`flex-1 h-12 font-semibold text-sm transition-colors ${
              t.esMismo === o.v ? 'bg-primary text-white' : 'bg-white text-gray-500'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {t.esMismo ? (
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">
            {p1.nombre} {p1.apellido}
          </p>
          <p>
            C.I. {p1.cedulaTipo}-{p1.cedulaNumero}
          </p>
          <p>{contacto.email}</p>
        </div>
      ) : (
        <StepForm>
          <Field label="Nombre completo / Razón social" error={touched.nombre && !nombreOk ? 'Escribe el nombre completo' : null}>
            <StepInput
              value={t.nombre}
              onChange={(v) => set('nombre', v)}
              onBlur={() => marcar('nombre')}
              placeholder="Nombre y apellido o razón social"
              error={touched.nombre && !nombreOk}
            />
          </Field>

          <Field label="Documento" error={touched.doc && !docOk ? 'El documento debe tener entre 6 y 10 números' : null}>
            <div className="flex gap-2">
              <div className="flex rounded-xl border-2 border-gray-200 overflow-hidden shrink-0">
                {DOCS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => set('docTipo', d)}
                    className={`w-10 h-12 font-bold transition-colors ${
                      t.docTipo === d ? 'bg-primary text-white' : 'bg-white text-gray-500'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <StepInput
                className="flex-1 min-w-0"
                value={t.docNumero}
                onChange={(v) => set('docNumero', v.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => marcar('doc')}
                inputMode="numeric"
                placeholder="12345678"
                error={touched.doc && !docOk}
              />
            </div>
          </Field>

          <Field label="Teléfono" error={touched.tel && !telOk ? 'Escribe un teléfono válido' : null}>
            <StepInput
              value={t.telefono}
              onChange={(v) => set('telefono', v.replace(/\D/g, '').slice(0, 11))}
              onBlur={() => marcar('tel')}
              inputMode="tel"
              prefix="+58"
              placeholder="4121234567"
              error={touched.tel && !telOk}
            />
          </Field>
        </StepForm>
      )}
    </WizardLayout>
  )
}

export default EmisionTomador
