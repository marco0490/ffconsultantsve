import { Link } from 'react-router-dom'
import Image from '../../assets/images/contact-image.png'

function ContactSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:pt-8 max-w-[1900px] mx-auto">
      <div className="space-x-6 xl:ps-52 ps-12">
        <h2 className="md:text-4xl text-2xl py-6 font-regular max-w-[650px] xl:pt-44 pt-12">
          Capacítate con nuestro equipo y aumenta tu propia cartera de clientes.
        </h2>
        <button className="bg-primary hover:bg-purple text-white font-bold py-2 px-4 rounded-none">
          <Link to="/">Registrate aquí</Link>
        </button>
        <button className="bg-transparent hover:bg-primary border border-primary hover:border-0 hover:text-white text-primary font-bold py-2 px-4 rounded-none">
          <Link to="/agentes">Leer más</Link>
        </button>
      </div>
      <div className="md:bg-gradient-to-r from-gray-100 to-transparent relative mt-12 md:mt-0">
        <img
          src={Image}
          alt="Chica con laptop en manos"
          className="w-full object-cover mix-blend-overlay"
        />
      </div>
    </div>
  )
}

export default ContactSection
