import { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Family from '../../assets/images/family.png'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function We() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className="md:mt-12 mx-2 text-center">
      <Helmet>
        <title>Quiénes somos?</title>
        <meta name="title" content="Quiénes somos?" />
        <meta
          name="description"
          content="Somos una agencia con más de 40 años en el sector, que brinda
          asesoría y soluciones digitales para el manejo de pólizas de seguros
          de salud."
        />
      </Helmet>
      <figure className="flex justify-center mx-4">
        <img
          src={Family}
          alt="family"
          className="absolute items-center max-w-full mx-auto bg-gradient-to-r from-gray-500 to-gray-500"
        />
        <div className="absolute max-w-[1100px] mt-8 md:mt-48">
          <p className="flex justify-center items-center text-white font-normal text-xl md:text-5xl [text-shadow:_0_5px_0_rgb(0_0_0_/_70%)]">
            En FFC mejoramos la vida de nuestros clientes y su familia
          </p>
          <p className="flex justify-center items-center text-white font-bold text-md md:text-4xl [text-shadow:_0_5px_0_rgb(0_0_0_/_70%)]">
            asegurando su bienestar y protección
          </p>
          <p className="flex justify-center items-center text-white font-normal text-sm md:text-3xl [text-shadow:_0_5px_0_rgb(0_0_0_/_70%)]">
            para el futuro
          </p>
          <div className="flex justify-center pt-6 md:pt-12">
            <Link to="/cotizador">
              <button className="bg-primary text-white text-center text-xs w-36 md:text-lg md:w-48 md:py-4 py-2 font-semibold border border-white">
                Únete a nosotros
              </button>
            </Link>
          </div>
        </div>
      </figure>
      <div className="mt-[calc(85%-80px)] md:mt-[550px] lg:mt-[650px] flex flex-col">
        <h1 className="text-primary flex justify-center text-xl md:text-5xl font-bold">
          ¿Quiénes somos?
        </h1>
        <p className="max-w-[1100px] text-center mx-auto text-lg md:text-3xl mt-2 md:mt-10 font-normal">
          Future Financial Consultants (FFC) somos la primera Insuretech de
          Venezuela, especializada en ofrecer en un ambiente 100% digital, los
          productos y servicios desarrollados por el mercado asegurador
          venezolano y los prestadores de servicios de atención en salud, para
          promover el bienestar y la tranquilidad de quienes buscan productos
          innovadores, al alcance de su mano.
        </p>

        <p className="max-w-[1100px] text-center mx-auto text-lg md:text-3xl mt-2 md:mt-10 font-normal">
          En FFC nos enfocamos en acercar a los jóvenes profesionales,
          emprendedores o empresarios que buscan para sí, sus familiares o
          empleados, los mejores productos para atender su salud, de forma
          preventiva o ante emergencias, con la seguridad de contar con asesoría
          especializada, en una plataforma totalmente digital.
        </p>

        <p className="text-primary text-xl md:text-5xl font-bold flex justify-center mt-10 md:mt-12">
          Nuestro equipo 100% especializado
        </p>
        <p className="max-w-[1100px] text-center mx-auto text-lg md:text-3xl mt-10 font-normal">
          Conoce más sobre nosotros reproduciendo este video
        </p>
        <iframe
          src="https://www.youtube-nocookie.com/embed/kTBndgl6LCk?si=AMb6SfXoJQ2fa_y3"
          title="YouTube video player"
          width="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="mx-auto mt-12 md:w-[60%] md:h-[600px] w-100"
        ></iframe>
        <div className="bg-primary w-full h-48 md:h-[450px] -top-44 md:top-[-250px] z-[-1] relative"></div>
      </div>

      <p className="text-primary text-2xl md:text-7xl font-bold flex justify-center -mt-24">
        Preguntas frecuentes
      </p>
      <p className="max-w-[1100px] text-center mx-auto text-base md:text-4xl mt-8 font-semibold py-5">
        Si tienes alguna duda, chequea nuestras preguntas frecuentes aquí.
      </p>

      <div className="w-full flex mx-auto">
        <div className="py-2 mx-auto max-w-3xl">
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>1. ¿Qué tipos de planes existen?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Desde coberturas solo para emergencias con patologías limitadas
                  hasta planes integrales, cada uno con alcances, exclusiones y
                  beneficios distintos.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>2. ¿Tienen red de clínicas cerrada?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Pirámide: sí, acceso solo en su red, fuera de ella aplica
                  reembolso interno.
                  <br />
                  <br />
                  Oceánica: clínica dentro de red tras autorización previa.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>
                    3. ¿Qué enfermedades cubren de inmediato?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Ambas cubren 9 patologías específicas (cardio, renales,
                  traumas, quemaduras, infecciosas…), según listado condicionado
                  de cada póliza.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>
                    4. ¿Funciona cualquier clínica fuera de la red?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Pirámide: solo reembolso según tarifa.
                  <br />
                  <br />
                  Oceánica: no aceptado fuera de red, debe haber autorización.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>
                    5. ¿Cuánto tardan los reembolsos?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-10 text-base md:text-2xl text-gray-500">
                  Pirámide: presentación de documentos en 30 días, luego
                  proceso de pago.
                  <br />
                  <br />
                  Oceánica: sin plazo oficial, usualmente puede tardar hasta 60
                  días, dependiendo del caso.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  )
}

export default We
