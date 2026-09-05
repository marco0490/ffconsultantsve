import { useState } from 'react'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const ANIO_ACTUAL = new Date().getFullYear()
const DIAS = Array.from({ length: 31 }, (_, i) => i + 1)
const ANIOS_NAC = Array.from({ length: 90 - 18 + 1 }, (_, i) => ANIO_ACTUAL - 18 - i)

const selectCls =
  'h-12 px-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none bg-white text-gray-700'

function calcularEdad({ dia, mes, anio }) {
  if (!dia || !mes || !anio) return null
  const hoy = new Date()
  const nac = new Date(Number(anio), Number(mes) - 1, Number(dia))
  let edad = hoy.getFullYear() - nac.getFullYear()
  const dm = hoy.getMonth() - nac.getMonth()
  if (dm < 0 || (dm === 0 && hoy.getDate() < nac.getDate())) edad -= 1
  return edad
}

function PasoDatos() {
  const { state, update, next } = useCotizadorState()
  const { nombre, apellido, cedulaTipo, cedulaNumero, fechaNacimiento } = state.persona
  const [touched, setTouched] = useState({})
  const marcar = (campo) => setTouched((t) => ({ ...t, [campo]: true }))

  const nombreOk = nombre.trim().length >= 2
  const apellidoOk = apellido.trim().length >= 2
  const cedulaOk = /^\d{6,9}$/.test(cedulaNumero)
  const edad = calcularEdad(fechaNacimiento)
  const fechaCompleta = fechaNacimiento.dia && fechaNacimiento.mes && fechaNacimiento.anio
  const fechaOk = fechaCompleta && edad !== null && edad >= 18

  const valido = nombreOk && apellidoOk && cedulaOk && fechaOk

  const setFecha = (parte, val) => update('persona', { fechaNacimiento: { ...fechaNacimiento, [parte]: val } })

  return (
    <WizardLayout
      paso={7}
      avatarMsg="¡Gracias! Ahora cuéntame un poco de ti 🙏"
      backTo={pathAnterior(7)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(7))}
    >
      <StepForm>
        <Field label="Nombre" error={touched.nombre && !nombreOk ? 'Escribe tu nombre completo' : null}>
          <StepInput
            value={nombre}
            onChange={(v) => update('persona', { nombre: v })}
            onBlur={() => marcar('nombre')}
            placeholder="Ej: María"
            error={touched.nombre && !nombreOk}
          />
        </Field>

        <Field label="Apellido" error={touched.apellido && !apellidoOk ? 'Escribe tu nombre completo' : null}>
          <StepInput
            value={apellido}
            onChange={(v) => update('persona', { apellido: v })}
            onBlur={() => marcar('apellido')}
            placeholder="Ej: González"
            error={touched.apellido && !apellidoOk}
          />
        </Field>

        <Field label="Cédula" error={touched.cedula && !cedulaOk ? 'La cédula debe tener entre 6 y 9 números' : null}>
          <div className="flex gap-2">
            <div className="flex rounded-xl border-2 border-gray-200 overflow-hidden shrink-0">
              {['V', 'E'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update('persona', { cedulaTipo: t })}
                  className={`w-12 h-12 font-bold transition-colors ${
                    cedulaTipo === t ? 'bg-primary text-white' : 'bg-white text-gray-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <StepInput
              className="flex-1 min-w-0"
              value={cedulaNumero}
              onChange={(v) => update('persona', { cedulaNumero: v.replace(/\D/g, '').slice(0, 9) })}
              onBlur={() => marcar('cedula')}
              inputMode="numeric"
              placeholder="12345678"
              error={touched.cedula && !cedulaOk}
            />
          </div>
        </Field>

        <Field
          label="Fecha de nacimiento"
          error={fechaCompleta && !fechaOk ? 'Debes ser mayor de 18 años para cotizar' : null}
        >
          <div className="grid grid-cols-3 gap-2">
            <select
              className={selectCls}
              value={fechaNacimiento.dia}
              onChange={(e) => setFecha('dia', e.target.value)}
            >
              <option value="">Día</option>
              {DIAS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              className={selectCls}
              value={fechaNacimiento.mes}
              onChange={(e) => setFecha('mes', e.target.value)}
            >
              <option value="">Mes</option>
              {MESES.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              className={selectCls}
              value={fechaNacimiento.anio}
              onChange={(e) => setFecha('anio', e.target.value)}
            >
              <option value="">Año</option>
              {ANIOS_NAC.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </Field>
      </StepForm>
    </WizardLayout>
  )
}

export default PasoDatos
