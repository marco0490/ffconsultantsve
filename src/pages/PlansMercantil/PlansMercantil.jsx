import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import MercantilLogo from '../../assets/images/MercantilLogo.PNG'
import { Helmet } from 'react-helmet'

function PlansMercantil() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div className="md:my-18 flex flex-col">
      <Helmet>
        <title>Plan de pagos Mercantil</title>
        <meta name="title" content="Plan de pagos Mercantil" />
        <meta
          name="description"
          content="Opciones de planes con Mercantil para todo tipo de clientes. Aqui encontrarás lo que necesitas!"
        />
      </Helmet>
      <figure className=" h-auto mx-auto my-8 flex justify-center">
        <img
          className="object-cover  h-auto"
          src={MercantilLogo}
          alt="Mercantil_logo"
        />
      </figure>
      <div className="w-full px-4 bg-white flex flex-col">
        <p className="text-primary font-medium text-center">Planes y precios</p>
        <h1 className="font-bold text-4xl text-center">
          Plan de pagos Mercantil
        </h1>
        <div className="text-center flex justify-center my-5">
          <p
            className={`${
              enabled ? 'text-gray-300 font-bold' : 'text-primary font-bold'
            } px-4 font-semibold`}
          >
            Pago Mensual
          </p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-white border-2 border-primary"
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-5' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-primary transition`}
            />
          </Switch>
          <p
            className={`${
              enabled ? 'text-primary font-bold' : 'text-gray-300 font-bold'
            } px-4 font-semibold`}
          >
            Pago Anual
          </p>
        </div>
        <div className="min-w-[280px] mx-auto grid md:grid-cols-3 gap-8 py-6">
          <div className="w-full shadow-xl border border-gray-200 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <h2 className="text-lg text-primary font-light text-center py-1">
              Desde/
            </h2>
            <p className="text-center text-4xl font-bold">
              ${enabled ? '270.00' : '27.00'}
            </p>
            <h2 className="text-center text-primary font-semibold">
              Global Benefits Access
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200">
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-14 left-2"
                size={18}
              />
              <p className="mx-1 mt-8 text-[#8492a7]">
                Desde USD 5.000 - 30.000
              </p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-1"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Planes de fraccionamiento</p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-8"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Seguro de viajero</p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-3"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Cobertura sin deducible</p>
            </div>
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
              Global Benefits Premium
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200">
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-14 "
                size={18}
              />
              <p className="mx-1 mt-8 text-[#8492a7]">
                Desde USD 50.000 - 100.000
              </p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-3"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Cobertura sin deducible</p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Maternidad hasta USD 10.000</p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">
                Libre elección de hospitales
              </p>
            </div>
            <button className="text-white w-[200px] border-solid border-2 border-primary bg-primary font-bold my-6 mx-auto py-3 mt-14 hover:bg-white hover:text-primary">
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
              Global Benefits Elite
            </h2>
            <div className="text-center font-semibold mt-4 border-t-2 border-gray-200">
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-14 -left-2"
                size={18}
              />
              <p className="mx-1 mt-8 text-[#8492a7]">
                Desde USD 200.000 - 1.000.000
              </p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-0"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">
                Libre elección de hospitales
              </p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-3"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Cobertura sin deducible</p>
              <BsCheckLg
                className="text-center text-[#36cd77] relative top-6 left-0"
                size={18}
              />
              <p className="mx-3 text-[#8492a7]">Maternidad hasta USD 25.000</p>
            </div>
            <button className="text-black w-[200px] border-solid border-2 border-[#efefef] font-bold my-10 mx-auto py-3 bg-white hover:bg-primary hover:text-white">
              Cotiza este Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlansMercantil
