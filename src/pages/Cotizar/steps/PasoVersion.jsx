import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepCards from '../../../components/Cotizador/StepCards'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'
import { versionesDe } from '../../../data/vehiculos'

function PasoVersion() {
  const { state, update, next } = useCotizadorState()
  const { marca, modelo, modeloOtro, version } = state.vehiculo
  const nombreModelo = modelo === 'Otro modelo' ? modeloOtro : modelo
  const opciones = versionesDe(marca, modelo).map((v) => ({ value: v, label: v }))
  const valido = Boolean(version)

  return (
    <WizardLayout
      paso={3}
      avatarMsg={`¿Qué versión es tu ${[marca, nombreModelo].filter(Boolean).join(' ') || 'auto'}?`}
      label="Versión / edición"
      backTo={pathAnterior(3)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(3))}
    >
      <StepCards
        options={opciones}
        value={version}
        onChange={(v) => update('vehiculo', { version: v })}
        columns={2}
      />
    </WizardLayout>
  )
}

export default PasoVersion
