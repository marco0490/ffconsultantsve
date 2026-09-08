import WizardLayout from '../../../components/Cotizador/WizardLayout'
import StepSelectSearch from '../../../components/Cotizador/StepSelectSearch'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { pathSiguiente, pathAnterior } from '../../../components/Cotizador/steps.config'
import { LISTA_MARCAS } from '../../../data/vehiculos'

function PasoMarca() {
  const { state, update, next } = useCotizadorState()
  const marca = state.vehiculo.marca
  const valido = Boolean(marca)

  const seleccionar = (val) => {
    // Al cambiar de marca, limpiar el modelo y la versión previos.
    update('vehiculo', { marca: val, modelo: '', modeloOtro: '', version: '' })
  }

  return (
    <WizardLayout
      paso={1}
      avatarMsg="Cuéntame de tu auto 🚗"
      label="Escribe o selecciona la marca"
      backTo={pathAnterior(1)}
      nextDisabled={!valido}
      onNext={() => valido && next(pathSiguiente(1))}
    >
      <StepSelectSearch
        options={LISTA_MARCAS}
        value={marca}
        onChange={seleccionar}
        placeholder="Buscar marca…"
        emptyLabel="No encontramos esa marca. Prueba con “Otra marca”."
      />
    </WizardLayout>
  )
}

export default PasoMarca
