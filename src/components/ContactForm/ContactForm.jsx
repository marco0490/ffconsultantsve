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

function ContactForm() {
  return (
    <div className='bg-white'>
      <div className="flex justify-center">
        <h2 className="md:text-4xl text-2xl py-12 font-bold text-primary max-w-[700px] text-center md:pt-28 px-4 underline underline-offset-8">
          Información de contacto
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:px-56 drop-shadow-2xl">
        <form className="p-6 flex flex-col justify-center">
          <div className="flex flex-col">
            <h2 className="py-6 text-2xl">Envíanos un mensaje</h2>
            <label htmlFor="name" className="hidden">
              Nombre
            </label>
            <input type="text" name="name" id="name" placeholder="Nombre" />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="hidden">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="tel" className="hidden">
              Número de teléfono
            </label>
            <input
              type="tel"
              name="tel"
              id="tel"
              placeholder="Número de teléfono"
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="Comentario" className="hidden">
              Consulta
            </label>
            <textarea
              type="text"
              name="Comentario"
              id="Comentario"
              placeholder="Comentario"
            />
          </div>

          <button
            type="submit"
            className=" bg-primary hover:bg-blue-dark text-white font-bold py-3 px-6  mt-3 hover:bg-purple transition ease-in-out duration-300"
          >
            Enviar
          </button>
        </form>

        <div className="flex flex-col justify-center text-primary px-6 gap-2">
          <div className="flex">
          <FaRegClock className='text-2xl relative top-1 pr-2'/>
            <p className="text-lg">Lun-Vie: 8:00 am -5:00 pm</p>
          </div>

          <div className="flex">
            <AiOutlineMail className='text-2xl relative top-1 pr-2'/>
            <p className="text-lg">futurefc@example.com</p>
          </div>

          <div className="flex">
          <BsTelephoneForward className='text-2xl relative top-1 pr-2'/>
            <p className="text-lg">+58 212-2675132 / 412-9713806 </p>
          </div>

          <div className="flex">
          <FiMapPin className='text-2xl relative top-1 pr-2'/>
            <p className="text-lg">
              Av. San Felipe, Centro Coinasa,
              <br /> Caracas, Venezuela
            </p>
          </div>

          <div className="flex text-2xl gap-8">
            <a href="https://youtube.com/" target='_blank' rel='noreferrer' className='hover:text-purple'><AiFillYoutube /></a>
            <a href="https://instagram.com/" target='_blank' rel='noreferrer' className='hover:text-purple'><AiOutlineInstagram /></a>
            <a href="https://facebook.com/" target='_blank' rel='noreferrer' className='hover:text-purple'><BiLogoFacebook /></a>
            <a href="https://twitter.com/" target='_blank' rel='noreferrer' className='hover:text-purple'><AiOutlineTwitter /></a>
            
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
