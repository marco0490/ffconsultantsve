import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

function Cookies() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className=" md:m-auto mb-5 mx-5 md:mt-[5rem] max-w-[800px] pt-7 lg:mt-[6rem] space-y-2">
      <Helmet>
        <title>Politica de Cookies</title>
        <meta name="title" content="Politica de Cookies" />
        <meta name="description" content="Información de nuestras cookies." />
      </Helmet>
      <h1 className="my-5 text-center text-3xl font-bold">
        Politica de Cookies
      </h1>
      <p>
        En{' '}
        <a
          href="https://www.futurefinancialconsultantsve.com/"
          className="text-primary hover:text-purple"
        >
          www.futurefinancialconsultantsve.com
        </a>{' '}
        respetamos su privacidad y solo usaremos cookies cuando su navegador nos
        lo permita. Una cookie es una pequeña pieza de código que los sitios web
        pueden colocar en su ordenador cuando los visita, y actúa como un
        identificador que puede usarse para recuperar sus datos en las bases de
        datos y para seguir su navegación dentro de la web. Nosotros usamos
        cookies para ayudarlo a navegar en nuestra web, facilitar el seguimiento
        del servicio con el asegurador, empresa de medicina prepagada o
        prestador de servicios de atención en salud, y mejorar su seguridad, y
        mejorar la experiencia del usuario, para mostrarle información acorde a
        sus necesidades, preferencias y elecciones. Si no desea tener una de
        nuestras cookies en su ordenador, por favor asegúrese de que su buscador
        está configurado para bloquearlas. No se recogerá ningún dato de
        carácter personal a través de las cookies. Ni nosotros ni ningún tercero
        podremos identificarle personalmente de esta manera. Puede utilizar
        nuestra web aún si bloquea las cookies. Sin embargo, tenga en cuenta que
        al eliminar o deshabilitar las cookies podría afectar la funcionalidad
        de nuestro sitio web y la posibilidad de acceder a ciertas áreas o
        características de nuestro sitio.
      </p>

      <p>
        Tenga en cuenta que nuestro sitio contiene enlaces hacia y desde otros
        sitios web. No aceptamos ninguna responsabilidad por el contenido de
        dichos sitios web ni de las cookies que utilizan. Si usted decide
        visitar otro sitio web a través de nuestra web, tendrá que contactar con
        ellos para saber el uso de las cookies que ellos realizan.
      </p>

      <p>
        Para controlar las cookies la mayoría de los navegadores le permiten
        aceptar o rechazar todas las cookies, aceptar sólo determinadas cookies
        o hacer que se le pregunte cada vez que una página web quiere guardar
        una cookie. Además, puede eliminar las cookies que el navegador ya ha
        guardado en su equipo. Los procesos para controlar y eliminar cookies
        varían dependiendo del navegador que utilice. Para informarse de cómo
        hacerlo en un determinado navegador, puede utilizar la función de Ayuda
        del mismo.
      </p>
    </div>
  )
}

export default Cookies
