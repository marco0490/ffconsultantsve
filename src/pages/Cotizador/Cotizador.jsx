import { useEffect } from 'react'

function Cotizador() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return <div>Cotizador</div>
}

export default Cotizador
