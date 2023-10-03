import { useEffect } from 'react'

function Legal() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return <div>Legal</div>
}

export default Legal
