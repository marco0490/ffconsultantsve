import { useEffect } from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import ContactSection from '../../components/ContactSection/ContactSection'
import { Helmet } from 'react-helmet'

function Contact() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Información de contacto</title>
        <meta name="title" content="Información de contacto" />
        <meta
          name="description"
          content="Envíanos un mensaje - Capacítate con nuestro equipo y arma tu propia cartera de clientes."
        />
      </Helmet>
      <ContactSection />
      <ContactForm />
    </>
  )
}

export default Contact
