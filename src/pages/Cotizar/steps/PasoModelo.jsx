import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepSelectSearch from '../../../components/Cotizador/StepSelectSearch'
import StepInput from '../../../components/Cotizador/StepInput'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'
import { modelosDe, OTRO_MODELO } from '../../../data/vehiculos'

function PasoModelo() {
  const { state, update, next } = useCotizadorState()
  const { marca, modelo, modeloOtro } = state.vehiculo
  const opciones = modelosDe(marca)
  const esOtro = modelo === OTRO_MODELO

  const valido = Boolean(modelo) && (!esOtro || modeloOtro.trim().length >= 2)

  const seleccionar = (val) => {
    // Al cambiar de modelo, limpiar la versión previa.
    update('vehiculo', { modelo: val, version: '', ...(val !== OTRO_MODELO ? { modeloOtro: '' } : {}) })
  }

  return (
    <WizardLayout
      paso={2}
      avatarMsg="Buena elección. ¿Qué modelo es?"
      label="Escribe o selecciona el modelo"
      backTo={pathAnterior(2)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(2))}
    >
      <StepSelectSearch
        options={opciones}
        value={modelo}
        onChange={seleccionar}
        placeholder="Buscar modelo…"
        emptyLabel="No encontramos ese modelo. Prueba con “Otro modelo”."
      />

      {esOtro && (
        <div className="mt-4">
          <span className="block text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
            Escribe el modelo
          </span>
          <StepInput
            value={modeloOtro}
            onChange={(v) => update('vehiculo', { modeloOtro: v })}
            placeholder="Ej: Corsa, Sail, Sonic…"
            autoFocus
            maxLength={40}
            onEnter={() => valido && next(pathSiguiente(2))}
          />
        </div>
      )}
    </WizardLayout>
  )
}

export default PasoModelo
