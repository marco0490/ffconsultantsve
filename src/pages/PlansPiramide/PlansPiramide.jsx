import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import PiramideLogo from '../../assets/images/PiramideLogo.svg'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function PlansPiramide() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div id="Piramide" className="md:my-18 flex flex-col">
      <Helmet>
        <title>Planes de Cobertura HCM</title>
        <meta name="title" content="Planes de Cobertura HCM" />
        <meta
          name="description"
          content="Opciones de planes con Piramide para todo tipo de clientes. Aquí encontrarás lo que necesitas!"
        />
      </Helmet>
      <figure className="h-auto mx-auto my-8 flex justify-center">
        <img
          className="h-24 object-contain"
          src="https://segurospiramide.com/static/logo-piramides-d07524ef35db8b8403dff1b54884e9aa.svg"
          alt="Piramide"
        />
      </figure>
      <div className="w-full px-4 bg-white flex flex-col">
        <h1 className="font-bold text-4xl text-center">
          Consulta una Cobertura
        </h1>
        <p className="text-primary font-bold text-center text-xl mt-2">
          
        </p>
        <div className="text-center justify-center my-5 hidden">
          <p
            className={`${
              enabled ? 'text-gray-200 font-bold' : 'text-blue-600 font-bold'
            } px-4 text-primary font-semibold`}
          >
            Pago Mensual
          </p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-white border-2 border-blue-600"
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-primary transition`}
            />
          </Switch>
          <p
            className={`${
              enabled ? 'text-blue-600 font-bold' : 'text-gray-300 font-bold'
            } px-4 font-semibold`}
          >
            Pago Anual
          </p>
        </div>
        <div className="min-w-[280px] mx-auto grid md:grid-cols-3 gap-8 md:mt-12 md:mb-6">
          <div className="w-full shadow-xl border border-gray-200 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1">
              Desde/Prima Anual
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '490.00' : '37.00'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Automóvil
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200"></div>
            <Link to='/cotizador?aseguradora=seguros-piramide&producto=auto'>
              <button className="text-black w-[200px] border-solid border-2 border-[#efefef] font-bold my-10 mx-auto py-3 bg-white hover:bg-primary hover:text-white">
                Cotiza este Plan
              </button>
            </Link>
          </div>

          <div className="w-full shadow-xl border border-gray-200 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1 mt-8">
              Desde/Suma Asegurada
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '490.00' : '50.000'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Personas
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200"></div>
            <Link to='/cotizador?aseguradora=seguros-piramide&producto=personas'>
              <button className="text-white w-[200px] border-solid border-2 border-primary bg-primary font-bold my-6 mx-auto py-3 hover:bg-white hover:text-primary">
                Cotiza este Plan
              </button>
            </Link>
          </div>

          <div className="w-full shadow-xl border border-gray-200 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1">
              Desde/ Suma Asegurada
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '660.00' : '20.000'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Patrimoniales
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200"></div>
            <Link to='/cotizador?aseguradora=seguros-piramide&producto=patrimoniales'>
              <button className="text-black w-[200px] border-solid border-2 border-[#efefef] font-bold my-10 mx-auto py-3 bg-white hover:bg-primary hover:text-white">
                Cotiza este Plan
              </button>
            </Link>
          </div>
        </div>
        <div className="md:m-auto pb-12 max-w-[800px]">
          <p>
            <strong>Pirámide Seguros es una compañía de seguros venezolana,</strong>{' '}
            con una trayectoria de 48 años. Desde sus inicios su norte ha sido claro: velar por el bienestar de sus asegurados.
Ofreciendo una amplia gama de productos y servicios dentro de los ramos de:
          </p>
          <div className="my-4 md:leading-[0rem]">
            <BsCheckLg
              className="text-center text-[#36cd77] relative top-6 md:top-2 -left-3"
              size={18}
            />
            <p className="mx-3">Personas.</p>
            <BsCheckLg
              className="text-center text-[#36cd77] relative top-6 md:top-2 -left-3"
              size={18}
            />
            <p className="mx-3">Automovil.</p>
            <BsCheckLg
              className="text-center text-[#36cd77] relative top-6 md:top-2 -left-3"
              size={18}
            />
            <p className="mx-3">
              Patrimoniales.
            </p>
            <BsCheckLg
              className="text-center text-[#36cd77] relative top-6 md:top-2 -left-3"
              size={18}
            />
            <p className="mx-3">
              Fianzas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlansPiramide
