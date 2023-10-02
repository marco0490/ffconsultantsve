import { useEffect } from 'react'

function Agent() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return <div>Agent</div>
}

export default Agent
