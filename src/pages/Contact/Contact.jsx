import { useEffect } from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import ContactSection from '../../components/ContactSection/ContactSection'

function Contact() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <ContactSection />
      <ContactForm />
    </>
  )
}

export default Contact
