import { useState } from 'react'
import { Link } from 'react-router-dom'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

const OPERADORAS = ['0412', '0414', '0424', '0416', '0426', '0422']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const selectCls =
  'h-12 w-[110px] px-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none bg-white text-gray-700 font-medium shrink-0'

function PasoContacto() {
  const { state, update, next } = useCotizadorState()
  const { email, operadora, telefono, aceptaContacto } = state.contacto
  const [touched, setTouched] = useState({})
  const marcar = (c) => setTouched((t) => ({ ...t, [c]: true }))

  const emailOk = EMAIL_RE.test(email)
  const telOk = /^\d{7}$/.test(telefono)
  const valido = emailOk && telOk && aceptaContacto

  return (
    <WizardLayout
      paso={8}
      avatarMsg="Último paso. ¿Dónde te envío la cotización? 📩"
      nextLabel="Ver mi cotización"
      backTo={pathAnterior(8)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(8))}
    >
      <StepForm>
        <Field label="Correo electrónico" error={touched.email && !emailOk ? 'El formato del correo no es válido' : null}>
          <StepInput
            value={email}
            onChange={(v) => update('contacto', { email: v })}
            onBlur={() => marcar('email')}
            type="email"
            inputMode="email"
            placeholder="tucorreo@ejemplo.com"
            error={touched.email && !emailOk}
          />
        </Field>

        <Field
          label="WhatsApp"
          error={touched.tel && !telOk ? 'El número debe tener 7 dígitos después de la operadora' : null}
        >
          <div className="flex gap-2">
            <span className="h-12 flex items-center px-1 text-gray-500 font-medium select-none shrink-0">
              +58
            </span>
            <select
              className={selectCls}
              value={operadora}
              onChange={(e) => update('contacto', { operadora: e.target.value })}
            >
              {OPERADORAS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <StepInput
              className="flex-1 min-w-0"
              value={telefono}
              onChange={(v) => update('contacto', { telefono: v.replace(/\D/g, '').slice(0, 7) })}
              onBlur={() => marcar('tel')}
              inputMode="numeric"
              placeholder="1234567"
              error={touched.tel && !telOk}
            />
          </div>
        </Field>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={aceptaContacto}
            onChange={(e) => update('contacto', { aceptaContacto: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
          />
          <span className="text-sm text-gray-600">
            Acepto que Future Financial me contacte y las{' '}
            <Link to="/privacidad" className="text-primary underline">políticas de privacidad</Link>.
          </span>
        </label>
      </StepForm>
    </WizardLayout>
  )
}

export default PasoContacto
