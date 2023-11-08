import { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Family from '../../assets/images/family.png'
import { Link } from 'react-router-dom'

function We() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className="md:mt-12 mx-2 text-center">
      <div className={`w-[400px] h-[280px] mx-auto md:w-full md:h-screen flex items-center justify-center bg-['${Family}'] bg-cover bg-no-repeat bg-cente`}>
        <div className="w-1/2 text-center">
          <p className="flex justify-center items-center text-white font-normal text-xs md:text-3xl [text-shadow:_0_2px_0_rgb(0_0_0_/_70%)]">
            En FFC mejoramos la vida de nuestros clientes y su familia
          </p>
          <h1 className="flex justify-center items-center text-white font-bold text-sm md:text-4xl [text-shadow:_0_2px_0_rgb(0_0_0_/_70%)]">
            asegurando su bienestar y protección
          </h1>
          <p className="flex justify-center items-center text-white font-normal text-xs md:text-3xl [text-shadow:_0_2px_0_rgb(0_0_0_/_70%)]">
            para el futuro
          </p>
          <div className="flex justify-center pt-6 md:pt-12">
          <Link to="/cotizador">
            <button className="bg-[#3140B9] text-white text-center text-xs w-36 md:text-lg md:w-48 md:py-4 py-2">
              Únete a nosotros
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-20 flex flex-col">
        <h1 className="text-primary flex justify-center text-base md:text-5xl font-light">
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
        <div className="py-2 mx-auto max-w-7xl">
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>1. What services does TanahAir Offer?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta 1
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>
                    2. Why should i choose a Design studio like TanahAir over
                    full-service agency?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta 2
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-6">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full h-[80px] shadow-xl justify-between items-center border-2 bg-white px-5 md:px-12 py-2 text-left text-base md:text-2xl font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span>
                    3. How does TanahAir create website content without knowing
                    our Business plan?
                  </span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base md:text-2xl text-gray-500">
                  Respuesta 3
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
                  <span>5.What often will results be reported?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-7 w-7 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-10 text-base md:text-2xl text-gray-500">
                  Respuesta 5
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
