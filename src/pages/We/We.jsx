import { useEffect } from 'react'

function We() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return <div>We</div>
}

export default We
