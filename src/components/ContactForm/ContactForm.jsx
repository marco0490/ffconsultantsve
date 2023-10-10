import { useState, useEffect } from 'react'
import { FaRegClock } from 'react-icons/fa'
import {
  AiOutlineMail,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { BsTelephoneForward } from 'react-icons/bs'
import { BiLogoFacebook } from 'react-icons/bi'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'

function ContactForm() {
  const [Check, setCheck] = useState(false)
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')
  const [Message, setMessage] = useState('')

  const handleReset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  function sendEmail(e) {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        e.target,
        import.meta.env.VITE_EMAIL_USER,
      )
      .then(
        (result) => {
          throw result.text
        },
        (error) => {
          throw error.text
        },
      )
    e.target.reset()
    handleReset()
  }
  const check = () => {
    const agree = document.querySelector('#contactFormAgree')

    const status = !!agree.checked
    setCheck(status)
  }

  const showAlert = () => {
    if (Check) {
      Swal.fire({
        title: 'Confirmado',
        text: 'Hemos recibido tu mensaje, revisaremos la información y estaremos en contacto pronto.',
        icon: 'success',
        button: 'OK',
        timer: '3000',
        timerProgressBar: 'true',
      })
    } else {
      Swal.fire({
        title: 'Espera',
        text: 'Tienes que terminar de rellenar la información.',
        icon: 'info',
        button: 'OK',
        timer: '3000',
        timerProgressBar: 'true',
      })
    }
  }

  return (
    <div className="bg-white mx-auto max-w-[1900px]">
      <div className="flex justify-center">
        <h2 className="md:text-4xl text-2xl md:py-12 py-4 font-bold text-primary max-w-[700px] text-center md:pt-28 px-4 underline underline-offset-8">
          Información de contacto
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:px-56 drop-shadow-2xl">
        <form className="p-6 flex flex-col justify-center" onSubmit={sendEmail}>
          <div className="flex flex-col">
            <h2 className="md:py-6 text-2xl">Envíanos un mensaje</h2>
            <label htmlFor="nombre" className="hidden">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={Name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nombre"
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="hidden">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Correo electrónico"
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="tel" className="hidden">
              Número de teléfono
            </label>
            <input
              type="number"
              name="tel"
              id="tel"
              value={Phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Número de teléfono"
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="comentario" className="hidden">
              Consulta
            </label>
            <textarea
              type="text"
              name="comentario"
              id="comentario"
              value={Message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Comentario"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex mt-2">
            <input
              type="checkbox"
              value="1"
              className="text-md indeterminate:bg-gray-300 mx-1 my-2 font-medium default:ring-2 checked:bg-primary inline-block"
              id="contactFormAgree"
              onChange={check}
              required
            />
            <label className="mx-1" htmlFor="contactFormAgree">
              Doy mi consentimiento para el tratamiento de los datos personales
              que facilito. He leído y acepto la{' '}
              <a
                href="/legal"
                className="text-primary hover:text-purple font-semibold"
              >
                Política de privacidad
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            className=" bg-primary hover:bg-blue-dark text-white font-bold py-3 px-6  mt-3 hover:bg-purple transition ease-in-out duration-300"
            onClick={showAlert}
          >
            Enviar
          </button>
        </form>

        <div className="flex flex-col justify-center text-primary px-6 gap-2">
          <div className="flex">
            <FaRegClock className="text-2xl relative top-1 pr-2" />
            <p className="text-lg">Lun-Vie: 8:00 am -5:00 pm</p>
          </div>

          <div className="flex">
            <AiOutlineMail className="text-2xl relative top-1 pr-2" />
            <a
              href="mailto:ffconsultants124@outlook.com?subject=Consulta enviada desde WEB"
              className="text-lg hover:text-purple"
            >
              ffconsultants124@outlook.com
            </a>
          </div>

          <div className="flex">
            <BsTelephoneForward className="text-2xl relative top-1 pr-2" />
            <p className="text-lg">+58 212-2675132 / 412-9713806 </p>
          </div>

          <div className="flex">
            <FiMapPin className="text-2xl relative top-1 pr-2" />
            <p className="text-lg">
              Av. San Felipe, Centro Coinasa,
              <br /> Caracas, Venezuela
            </p>
          </div>

          <div className="flex text-2xl gap-8">
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple"
            >
              <AiFillYoutube />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple"
            >
              <AiOutlineInstagram />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple"
            >
              <BiLogoFacebook />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple"
            >
              <AiOutlineTwitter />
            </a>
          </div>

          <iframe
            title="google"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.021478492362!2d-66.8540452240856!3d10.498972789633381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a59a968273f73%3A0xebf0d24d0f2d4a!2sCentro%20Coinasa%2C%20C.%20San%20Felipe%2C%20Caracas%201060%2C%20Miranda%2C%20Venezuela!5e0!3m2!1sen!2ses!4v1695600085516!5m2!1sen!2ses"
            style={{ border: 0, borderRadius: 10 }}
            allowFullScreen=""
            loading="lazy"
            className="my-4 w-11/12"
          />
        </div>
      </div>
    </div>
  )
}

export default ContactForm
