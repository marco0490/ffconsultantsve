import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import QualitasLogo from '../../assets/images/QualitasLogo.svg'
import { Helmet } from 'react-helmet'

function PlansQualitas() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div className="md:my-18 flex flex-col">
      <Helmet>
        <title>Planes de Cobertura HCM</title>
        <meta name="title" content="Planes de Cobertura HCM" />
        <meta
          name="description"
          content="Opciones de planes con Qualitas para todo tipo de clientes. Aqui encontrarás lo que necesitas!"
        />
      </Helmet>
      <figure className=" h-auto mx-auto my-8 flex justify-center">
        <img
          className="object-cover  h-auto"
          src={QualitasLogo}
          alt="Qualitas_logo"
        />
      </figure>
      <div className="w-full px-4 bg-white flex flex-col">
        <p className="text-primary font-medium text-center">
          Coberturas APS-EMERGENCIAS-COLECTIVOS
        </p>
        <h1 className="font-bold text-4xl text-center">
          Planes de Cobertura HCM
        </h1>
        <div className="text-center flex justify-center my-5">
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
        <div className="min-w-[280px] mx-auto grid md:grid-cols-3 gap-8 md:my-12">
          <div className="w-full shadow-xl border border-gray-200 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1">
              Desde/
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '490.00' : '49.00'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Cobertura HCM
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200"></div>
            <button className="text-black w-[200px] border-solid border-2 border-[#efefef] font-bold my-10 mx-auto py-3 bg-white hover:bg-primary hover:text-white">
              Cotiza este Plan
            </button>
          </div>

          <div className="min-w-[280px] shadow-xl border border-gray-200 flex flex-col p-4 my-1 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1">
              Desde/
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '490.00' : '49.00'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Cobertura HCM
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200"></div>
            <button className="text-white w-[200px] border-solid border-2 border-primary bg-primary font-bold my-6 mx-auto py-3 hover:bg-white hover:text-primary">
              Cotiza este Plan
            </button>
          </div>

          <div className="min-w-[280px] shadow-xl border border-gray-200 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1">
              Desde/
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '660.00' : '66.00'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Cobertura HCM
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200"></div>
            <button className="text-black w-[200px] border-solid border-2 border-[#efefef] font-bold my-10 mx-auto py-3 bg-white hover:bg-primary hover:text-white">
              Cotiza este Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlansQualitas
