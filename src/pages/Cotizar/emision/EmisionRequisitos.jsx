import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WizardLayout from '../../../components/Cotizador/WizardLayout'
import { useCotizadorState } from '../../../components/Cotizador/useCotizadorState'

const REQUISITOS = [
  { emoji: '🔢', titulo: 'Placa', desc: '6 a 7 caracteres, como aparece en tu carnet de circulación.' },
  { emoji: '🔩', titulo: 'Serial de carrocería', desc: '17 caracteres. Está en el carnet de circulación o en la puerta del piloto.' },
  { emoji: '🪪', titulo: 'Tu cédula a la mano', desc: 'La necesitarás para el pago móvil.' },
]

function EmisionRequisitos() {
  const navigate = useNavigate()
  const { state, next } = useCotizadorState()
  const plan = state.resultado.seleccion

  // Sin plan seleccionado: volver al resultado.
  useEffect(() => {
    if (!plan) navigate('/cotizar/resultado', { replace: true })
  }, [plan, navigate])
  if (!plan) return null

  return (
    <WizardLayout
      showProgress={false}
      backTo="/cotizar/resultado"
      avatarMsg={`Vamos a emitir tu póliza de ${plan.aseguradora} 🎉`}
      nextLabel="Continuar"
      onNext={() => next('/cotizar/emision/vehiculo')}
    >
      <h2 className="text-center font-bold text-gray-800 text-lg mb-1">
        Para emitir tu póliza necesitarás estos datos del auto
      </h2>
      <p className="text-center text-sm text-gray-500 mb-5">Ten a la mano lo siguiente:</p>
      <div className="space-y-3">
        {REQUISITOS.map((r) => (
          <div key={r.titulo} className="flex items-start gap-3 p-4 rounded-2xl border-2 border-gray-200 bg-white">
            <span className="text-2xl">{r.emoji}</span>
            <div>
              <p className="font-semibold text-gray-800">{r.titulo}</p>
              <p className="text-sm text-gray-500">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </WizardLayout>
  )
}

export default EmisionRequisitos
