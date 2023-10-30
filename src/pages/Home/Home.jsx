import { useEffect } from 'react'
import ActionSection from '../../components/ActionSection/ActionSection'
import CompaniesPlan from '../../components/CompaniesPlan/CompaniesPlan'
import Howto from '../../components/Howto/Howto'
import ActionAgente from '../../components/AcionAgente/AcionAgente'
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
      <ActionAgente />
      <Testimonials />
    </>
  )
}

export default Home