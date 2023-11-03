import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

function Services() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div>
      <Helmet>
        <title>
          Servicios digitales para la contratación de pólizas de seguro de salud
        </title>
        <meta
          name="title"
          content="Servicios digitales para la contratación de pólizas de seguro de salud"
        />
        <meta
          name="description"
          content="Diseñamos soluciones digitales a través de productos innovadores para la venta y el manejo de pólizas de seguro de salud."
        />
      </Helmet>
      <h2 className="mx-auto max-w-[1100px] text-primary text-xl md:text-4xl font-bold mt-10">
        ¿Qué ofrecemos?
      </h2>
      <div className="container max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto mt-10">
        <p className="text-xl md:text-3xl">
          Servicios digitales para la contratación de pólizas de seguro de salud
        </p>
        <p className="text-right text-gray-400 md:max-w-[460px] md:ms-16 leading-5">
          Diseñamos soluciones digitales a través de productos innovadores para
          la venta y el manejo de pólizas de seguro de salud.
        </p>
      </div>

      <div className="container max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
      <div className="text-center">
        <p className="max-w-[1100px] text-primary text-xl md:text-5xl font-bold mx-auto mt-10 md:mt-12">
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
    </div>
  )
}

export default Services
