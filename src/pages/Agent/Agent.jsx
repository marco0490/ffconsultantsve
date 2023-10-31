import { useEffect } from 'react'
import { MdFingerprint } from 'react-icons/md'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { GiOldMicrophone } from 'react-icons/gi'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Agent() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className="flex flex-col mt-40 mx-auto">
      <div className="md:flex md:max-w-[1900px] md:gap-32 md:mx-auto">
        <div className="flex flex-col w-2/3 mx-auto md:w-[514px] md:my-auto">
          <p className="text-primary font-semibold text-3xl text-start md:text-6xl">
            Sé un <span className="font-extrabold">Agente FFC</span>
            <br />
            con nosotros
          </p>
          <h1 className="text-gray-500 font-normal text-lg text-start mt-5 md:text-2xl md:mt-10">
            Capacítate con nuestro equipo y arma tu propia cartera de clientes.
          </h1>
          <div className="my-10 mx-auto flex justify-start md:justify-start gap-3">
            <Link to="/nosotros">
              <button
                className="w-28 bg-primary text-white text-sm py-2 md:w-48 md:h-12 font-semibold"
                type="button"
              >
               Nosotros 
              </button>
            </Link>
            <Link to="/blog">

            </Link>
            <button
              className="w-28 border border-primary text-sm py-2 text-primary font-bold md:w-48 md:h-12"
              type="button"
            >
              Leer más
            </button>
          </div>
        </div>
        <div className="flex justify-center mx-auto">
          <form className="bg-white shadow-xl border border-gray-300 rounded px-8 pt-6 pb-8 mb-4 md:w-80">
            <h2 className="text-center text-3xl pb-10">Agenda una Cita</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Nombre *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre Completo"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Email *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Nro de Teféfono *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="+58 xxx xxx xxx"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Cita *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="time"
                placeholder="4:00 PM"
              />
            </div>
            <button
              className="w-full bg-primary text-white text-sm py-2 flex justify-center mx-auto px-3 font-semibold"
              type="button"
            >
              Agendar
            </button>
          </form>
        </div>
      </div>
      <div className="w-full flex flex-col py-14 md:flex-row md:max-w-6xl md:mx-auto">
        <img
          src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="ffc1"
          className="w-96 flex justify-center mx-auto"
        />
        <img
          src="https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="ffc2"
          className="w-96 flex justify-center mx-auto"
        />
        <img
          src="https://images.pexels.com/photos/935743/pexels-photo-935743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="ffc3"
          className="w-96 flex justify-center mx-auto"
        />
      </div>
      <p className="text-primary font-semibold text-2xl text-center md:text-4xl">
        Beneficios de ser un <span className="font-extrabold">Agente FFC</span>
      </p>
      <div className="w-full flex flex-col mb-6">
        <div className="md:flex md:mt-10 md:justify-center md:gap-5 md:items-center">
          <div className="mx-auto mt-10 flex flex-col md:mx-0">
            <div className="w-20 h-20 rounded-full bg-primary flex mx-auto">
              <MdFingerprint size={40} className="mx-auto my-auto text-white" />
            </div>
            <p className="text-primary text-xl font-bold mt-4 text-center">
              Aumenta tu cartera
            </p>
            <p className="text-gray-500 text-base text-center max-w-xs mx-auto">
              Con nuestra capacitación de ventas de seguro podrás aprender
              nuevas estrategias y aumentar tu cartera de clientes
            </p>
          </div>
          <BsArrowRight
            size={40}
            className="hidden md:flex md:text-black md:mt-16"
          />
          <div className="mx-auto mt-10 flex flex-col md:mx-0">
            <div className="w-20 h-20 rounded-full bg-primary flex mx-auto">
              <HiOutlineLightBulb
                size={40}
                className="mx-auto my-auto text-white"
              />
            </div>
            <p className="text-primary text-xl font-bold mt-4 text-center">
              Perfil de Agente
            </p>
            <p className="text-gray-500 text-base text-center max-w-xs mx-auto">
              Crearás tu propio perfil de agente y podrás registrar tus nuevos
              clientes llevándoles un seguimiento de cobros y renovaciones.
            </p>
          </div>
          <BsArrowRight
            size={40}
            className="hidden md:flex md:text-black md:mt-16"
          />
          <div className="mx-auto mt-10 flex flex-col md:mx-0">
            <div className="w-20 h-20 rounded-full bg-primary flex mx-auto">
              <GiOldMicrophone
                size={40}
                className="mx-auto my-auto text-white"
              />
            </div>
            <p className="text-primary text-xl font-bold mt-4 text-center">
              Atención al cliente 24/7
            </p>
            <p className="text-gray-500 text-base text-center max-w-xs mx-auto">
              Podrás brindarle a tus clientes una atención en línea y soporte
              técnico las 24 horas del día todos los días de la semana.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agent
