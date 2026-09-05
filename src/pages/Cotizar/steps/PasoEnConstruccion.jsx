import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'
import { PASOS } from '../../../components/Cotizador/steps.config'

// Placeholder temporal para las rutas aún no construidas del flujo
// (loader, resultado, confirmación). Se reemplazará en §9.5–§9.8.
function PasoEnConstruccion() {
  const { back } = useCotizadorState()
  const ultimoPaso = PASOS[PASOS.length - 1].path

  return (
    <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="text-4xl">🚧</div>
      <p className="text-gray-600">
        Esta pantalla está en construcción. La comparación de precios y el resultado se
        agregarán en el siguiente paso del desarrollo.
      </p>
      <button
        type="button"
        onClick={() => back(ultimoPaso)}
        className="mt-2 h-12 px-6 rounded-2xl font-bold text-white bg-primary hover:brightness-110"
      >
        Volver
      </button>
    </div>
  )
}

export default PasoEnConstruccion
