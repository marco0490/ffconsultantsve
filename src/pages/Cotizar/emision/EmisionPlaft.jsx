import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepForm, { Field } from '../../../components/Cotizador/StepForm'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguienteEmision, pathAnteriorEmision, TOTAL_EMISION } from '../../../components/Cotizador/steps.config'

// DEMO: texto de declaración genérico y creíble. Reemplazar por el texto
// oficial que use el core/bot cuando esté disponible.
const TEXTO_PLAFT =
  'Declaro que actúo en nombre propio y que los fondos utilizados para el pago de esta póliza ' +
  'provienen de actividades lícitas. Autorizo a Future Financial Consultants y a la aseguradora ' +
  'a verificar la información suministrada conforme a la normativa vigente de prevención de ' +
  'legitimación de capitales, financiamiento al terrorismo y financiamiento de la proliferación ' +
  'de armas de destrucción masiva (LC/FT/FPADM). Me comprometo a informar cualquier cambio ' +
  'relevante en mis datos.'

// DEMO: opciones razonables; ajustar a las que exija el core.
const ACTIVIDADES = [
  { value: 'empleado', label: 'Empleado' },
  { value: 'comerciante', label: 'Comerciante' },
  { value: 'profesional', label: 'Profesional independiente' },
  { value: 'empresario', label: 'Empresario' },
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'jubilado', label: 'Jubilado' },
  { value: 'otro', label: 'Otro' },
]
const ORIGENES = [
  { value: 'salario', label: 'Salario / sueldo' },
  { value: 'comercial', label: 'Actividad comercial' },
  { value: 'honorarios', label: 'Honorarios profesionales' },
  { value: 'ahorros', label: 'Ahorros' },
  { value: 'otro', label: 'Otro' },
]

const selectCls =
  'w-full h-12 px-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none bg-white text-gray-700'

function EmisionPlaft() {
  const { state, update, next } = useCotizadorState()
  const pl = state.emision.plaft
  const set = (campo, val) => update('emision', { plaft: { ...state.emision.plaft, [campo]: val } })

  const valido = Boolean(pl.actividad) && Boolean(pl.origenFondos) && pl.esPEP !== '' && pl.aceptado

  return (
    <WizardLayout
      paso={2}
      total={TOTAL_EMISION}
      progresoPrefijo="Emisión · Paso"
      barClass="bg-emerald-500"
      avatarMsg="Una declaración obligatoria por ley, y ya casi terminamos 🙏"
      backTo={pathAnteriorEmision(2)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguienteEmision(2))}
    >
      {/* DEMO: declaración PLAFT genérica */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-600 mb-5">
        {TEXTO_PLAFT}
      </div>

      <StepForm>
        <Field label="Actividad económica">
          <select className={selectCls} value={pl.actividad} onChange={(e) => set('actividad', e.target.value)}>
            <option value="">Selecciona…</option>
            {ACTIVIDADES.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Origen de los fondos">
          <select className={selectCls} value={pl.origenFondos} onChange={(e) => set('origenFondos', e.target.value)}>
            <option value="">Selecciona…</option>
            {ORIGENES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="¿Eres Persona Expuesta Políticamente (PEP)?" help="Cargos públicos relevantes, tú o un familiar cercano.">
          <StepCards
            options={[
              { value: 'no', label: 'No' },
              { value: 'si', label: 'Sí' },
            ]}
            value={pl.esPEP}
            onChange={(v) => set('esPEP', v)}
            columns={2}
          />
        </Field>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={pl.aceptado}
            onChange={(e) => set('aceptado', e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
          />
          <span className="text-sm text-gray-600">
            Declaro que la información suministrada es verdadera y que los fondos utilizados tienen
            origen lícito.
          </span>
        </label>
      </StepForm>
    </WizardLayout>
  )
}

export default EmisionPlaft
