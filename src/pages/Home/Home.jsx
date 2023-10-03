import { useEffect } from 'react'
import ActionSection from '../../components/ActionSection/ActionSection'
import CompaniesPlan from '../../components/CompaniesPlan/CompaniesPlan'
import Howto from '../../components/Howto/Howto'
import Testimonials from '../../components/Testimonials/Testimonials'

function Home() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <>
      <ActionSection />
      <Howto />
      <CompaniesPlan />
      <Testimonials />
    </>
  )
}

export default Home
