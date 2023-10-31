import { useEffect } from 'react'
import Check from '../../assets/images/check.svg'
import { Link } from 'react-router-dom'

function Complete() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className="md:m-auto mb-5 mx-5 md:mt-[3rem] max-w-[800px] lg:mt-[6rem]">
      <h1 className="text-center text-3xl font-bold text-blue">
        ¡Cotiza ahora tu póliza de Seguro de salud en línea!
      </h1>
      <p className="pt-12 text-center text-xl">
        El proceso es rápido y sencillo. Introduce tus datos para cotizar los
        planes y productos que mejor que adapten a tus necesidades
      </p>
      <div className="border md:px-12 md:py-5 shadow-xl my-12">
        <h2 className="font-bold text-xl">Solicita tu cotización</h2>
        <div className="border-t-4 border-primary mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-1">
            <div className="flex items-center mb-4">
              <input
                id="datos-personales"
                type="checkbox"
                name="countries"
                value="Datos Personales"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                aria-labelledby="datos-personales"
                aria-describedby="datos-personales"
                checked
              />
              <label
                htmlFor="datos-personales"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Datos Personales
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="cotizacion-enviada"
                type="checkbox"
                name="countries"
                value="Cotización Enviada"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                aria-labelledby="cotizacion-enviada"
                aria-describedby="cotizacion-enviada"
                checked
              />
              <label
                htmlFor="cotizacion-enviada"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Cotización Enviada
              </label>
            </div>
          </div>

          <div className="text-center pt-12">
         

            <img src={Check} alt="Imagen de operacion completada"  className='inline'/>
        
            <h2 className='font-bold text-xl mt-5'>Solicitud de cotización enviada</h2>
            <p className='text-xl pt-5 pb-20'>
              Listo! tu mensaje ha sido enviado, nuestro equipo de expertos se
              encargará de enviar la cotización a la dirección de email
              ingresada, en un plazo de 24 - 48 horas.
            </p>
            <button className="text-left mb-5 bg-transparent hover:bg-primary border border-primary hover:border-0 hover:text-white text-primary font-bold py-2 px-4 rounded-none">
              <Link to="/">Regresar</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Complete
