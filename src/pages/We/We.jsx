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
          Somos una agencia con más de <b>40 años en el sector</b>, que brinda
          asesoría y soluciones digitales para el manejo de pólizas de seguros
          de salud a través de los mejores productos de distintas compañías del
          país, con múltiples opciones diseñados y especializados para que se
          adaptan a tus necesidades.
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
          allowfullscreen
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
                  <span>
                    1. Que tipos de planes existen en el universo del seguro?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta: Existen un sin fin de productos de salud pero hay
                  que estar claro que entre esos productos existe multiples
                  diferencias. Como productos de solo emergencia, que solo van
                  diridos atender reclamos del tipo emergencias y no solo eso si
                  no que los contratos pueden estar atados a patologías
                  especificas.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>2. Red de clinicas de las companias?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta: La mayoria de las poliza de salud son libre de
                  atenderse donde quieras cualquier situacion de salud, pero es
                  bueno saber que existen planes de salud muy economicos donde
                  te puedes atender, pero solo si es atendido bajo red de
                  instituciones que estan aparadas en el plan. Aqui es un buen
                  ejemplo lo importante de estar informado constatenmente de los
                  cambios que se generan en el tiempo en las redes de
                  intituciones medicas.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>3. Quien es un intermediario del seguro?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta: FFC es un vivo ejemplo de lo que puede ser
                  intermediario del seguro y su importancia ya que somos los
                  encargado de como la palabra lo dice interactuar el la
                  relacion de su poliza y usted atraves de la mejor experiencia
                  que podras disfrutar en tu vida.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>4. What will be delivered? And When?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta 4
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>
                    5. Cuanto duran los contra reeembolso de sus planes de
                    seguros?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-10 text-base md:text-2xl text-gray-500">
                  Respuesta: Cada compañia de seguro tienes sus politicas
                  particulares donde establecen los periodos de rembolso pero lo
                  que el mercado nos dice es que esta tardando un promedio de
                  hasta casi 2 meses en reeembolsar los reclamos.
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
