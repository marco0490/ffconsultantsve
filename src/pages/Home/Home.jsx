import { useEffect } from 'react'
import ActionSection from '../../components/ActionSection/ActionSection'
import CompaniesPlan from '../../components/CompaniesPlan/CompaniesPlan'
import Howto from '../../components/Howto/Howto'
import Testimonials from '../../components/Testimonials/Testimonials'
import { Helmet } from 'react-helmet'

function Home() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <>
      <Helmet>
        <title>
          Protege a tu familia con las mejores soluciones digitales en pólizas
          de seguros de salud.
        </title>
        <meta
          name="title"
          content="Protege a tu familia con las mejores soluciones digitales en pólizas
          de seguros de salud."
        />
        <meta
          name="description"
          content="Con Future Financial Consultants, puedes cotizar una póliza de salud
          en línea, comparar diferentes opciones y elegir la que mejor se adapte
          a tus necesidades y presupuesto."
        />
      </Helmet>
      <ActionSection />
      <CompaniesPlan />
      <Howto />
      <Testimonials />
    </>
  )
}

export default Home
