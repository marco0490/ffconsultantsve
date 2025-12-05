import { useEffect, useState } from 'react'
import People from '../../assets/images/people.png'
import { Helmet } from 'react-helmet'
import { Link, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'

function Cotizador() {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    window.scroll(0, 0);
    // Obtener el parámetro de la aseguradora de la URL
    const aseguradora = searchParams.get('aseguradora');
    if (aseguradora) {
      setCompany(aseguradora);
    }
  }, [searchParams])

  const [company, setCompany] = useState('')
  const [check, setCheck] = useState(false)

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i)

  const handleReset = () => {
    setCompany('')
  }

  function sendEmail(e) {
    e.preventDefault()

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_COTIZADOR,
        e.target,
        import.meta.env.VITE_EMAIL_USER,
      )
      .then(
        (result) => {
          throw result.text
        },
        (error) => {
          throw error.text
        },
      )
    e.target.reset()
    handleReset()
  }

  const showAlert = () => {
    if (check) {
      Swal.fire({
        title: 'Confirmado',
        text: 'Hemos recibido tu mensaje, revisaremos la información y estaremos en contacto pronto.',
        icon: 'success',
        button: 'OK',
        timer: '3000',
        timerProgressBar: 'true',
      })
    } else {
      Swal.fire({
        title: 'Espera',
        text: 'Tienes que terminar de rellenar la información.',
        icon: 'info',
        button: 'OK',
        timer: '3000',
        timerProgressBar: 'true',
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>¡Cotiza ahora tu póliza de Seguro de salud en línea!</title>
        <meta
          name="title"
          content="¡Cotiza ahora tu póliza de Seguro de salud en línea!"
        />
        <meta
          name="description"
          content="El proceso es rápido y sencillo. Introduce tus datos para cotizar los
          planes y productos que mejor que adapten a tus necesidades."
        />
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[1900px] mx-auto">
        <div className="md:space-x-6 space-y-2 xl:ps-52 md:ps-12 text-center md:text-left px-2">
          <h2 className="md:text-4xl text-2xl py-6 font-regular max-w-[400px] xl:pt-32 font-bold text-primary md:ms-5 drop-shadow-md">
            Soluciones innovadoras en Seguros de salud
          </h2>
          <h2 className="text-xl text-primary">
            ¡Ahorra tiempo y papeleos engorrosos!
          </h2>
          <p className="max-w-[450px]">
            Con FFC puedes comparar todas las opciones disponibles para
            asegurarte 100% en línea y Gratis desde cualquier dispositivo.
          </p>
        </div>
        <div className="relative mt-12 md:mt-0 md:ms-48">
          <img
            src={People}
            alt="Chica con laptop en manos"
            className="object-cover mix-blend-overlay"
          />
        </div>
      </div>
      <div className="md:m-auto mb-5 mx-5 md:mt-[3rem] max-w-[800px]">
        <h1 className="text-center text-3xl font-bold text-blue">
          ¡Cotiza ahora tu póliza de Seguro de salud en línea!
        </h1>
        <p className="pt-12 text-center text-xl">
          El proceso es rápido y sencillo. Introduce tus datos para cotizar los
          planes y productos que mejor que adapten a tus necesidades
        </p>
        <div className="border md:px-12 md:py-5 shadow-xl my-12">
          <h2 className="font-bold text-xl m-2">Solicita tu cotización</h2>
          <div className="border-t-4 border-primary mt-5">
            <div className="flex items-center mb-4">
              <input
                id="datos-personales"
                type="checkbox"
                name="countries"
                value="Datos Personales"
                className="h-4 w-4 border-gray-300 ms-2 focus:ring-2 focus:ring-blue-300"
                aria-labelledby="datos-personales"
                aria-describedby="datos-personales"
                defaultChecked
              />
              <label
                htmlFor="datos-personales"
                className="text-sm font-medium text-gray-900 ml-2 block"
              >
                Datos Personales
              </label>
            </div>
            <form
              className="p-6 flex flex-col justify-center"
              onSubmit={sendEmail}
            >
              <div className="flex flex-col">
                <label htmlFor="aseguradora" className="hidden">
                  Aseguradoras
                </label>
                <select
                  name="aseguradora"
                  id="aseguradora"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  <option value="" disabled>
                    Elige tu Aseguradora
                  </option>
                  <option value="seguros-qualitas">Seguros Qualitas</option>
                  <option value="seguros-caracas">Seguros Caracas</option>
                  <option value="seguros-hispana">Seguros Hispana</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="cobertura" className="hidden">
                  Cobertura
                </label>
                <select name="cobertura" id="cobertura">
                  <option value="" disabled selected>
                    Elige tu Cobertura
                  </option>

                  {company === 'seguros-mercantil' ? (
                    <>
                      <option value="5000-30000">30.000</option>
                      <option value="50000-100000">50.000 - 100.000</option>
                      <option value="50000-100000">200.000 - 1.000.000</option>
                    </>
                  ) : company === 'seguros-qualitas' ? (
                    <>
                      <option value="HCM">HCM</option>
                      <option value="APS">APS</option>
                      <option value="EMERGERNCIA">EMERGERNCIA</option>
                      <option value="COLECTIVOS">COLECTIVOS</option>
                      <option value="ADMINISTRADOS">ADMINISTRADOS</option>
                    </>
                  ) : (
                    <>
                      <option value="20.000">20.000</option>
                      <option value="50.000">50.000</option>
                      <option value="100.000">100.000</option>
                      <option value="200.000">200.000</option>
                      <option value="500.000">500.000</option>
                      <option value="1.000.000">1.000.000</option>
                    </>
                  )}
                </select>
              </div>
              <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                <h3 className="inline pr-2">Tipo de pago: </h3>
                <input
                  id="pago-mensual"
                  type="radio"
                  name="pago"
                  value="Cuotas"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="pago"
                  aria-describedby="pago"
                  required
                />
                <label htmlFor="pago" className="l-2 block me-2">
                  Cuotas
                </label>
                <input
                  id="pago-anual"
                  type="radio"
                  name="pago"
                  value="Anual"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="pago"
                  aria-describedby="pago"
                  defaultChecked
                  required
                />
                <label htmlFor="pago" className="l-2 block ">
                  Anual
                </label>
              </div>
              <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 md:space-x-2">
                <div className="flex flex-col col-span-2">
                  <label htmlFor="name" className="hidden">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="hidden" htmlFor="titular_dia">
                    Fecha de nacimiento
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="titular_dia"
                      id="titular_dia"
                      className="flex flex-col col-span-2"
                      required
                    >
                      <option value="" disabled selected>
                        Día
                      </option>
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <select
                      name="titular_mes"
                      id="titular_mes"
                      className="flex flex-col col-span-2"
                      required
                    >
                      <option value="" disabled selected>
                        Mes
                      </option>
                      <option value="enero">Enero</option>
                      <option value="febrero">Febrero</option>
                      <option value="marzo">Marzo</option>
                      <option value="abril">Abril</option>
                      <option value="mayo">Mayo</option>
                      <option value="junio">Junio</option>
                      <option value="julio">Julio</option>
                      <option value="agosto">Agosto</option>
                      <option value="septiembre">Septiembre</option>
                      <option value="octubre">Octubre</option>
                      <option value="noviembre">Noviembre</option>
                      <option value="diciembre">Diciembre</option>
                    </select>
                    <select
                      name="titular_anio"
                      id="titular_anio"
                      className="flex flex-col col-span-2"
                      required
                    >
                      <option value="" disabled selected>
                        Año
                      </option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender" className="hidden">
                    Sexo
                  </label>
                  <select name="gender" id="gender" required>
                    <option value="" disabled selected>
                      Sexo
                    </option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="mobile" className="hidden">
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Número de teléfono"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                <h3 className="inline pr-2">Conyuge: </h3>
                <input
                  id="conyuge-si"
                  type="radio"
                  name="conyuge"
                  value="Si"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="conyuge"
                  aria-describedby="conyuge"
                  required
                />
                <label htmlFor="conyuge-si" className="l-2 block me-2">
                  Si
                </label>
                <input
                  id="conyuge-no"
                  type="radio"
                  name="conyuge"
                  value="No"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="conyuge"
                  aria-describedby="conyuge"
                  defaultChecked
                  required
                />
                <label htmlFor="conyuge-no" className="l-2 block">
                  No
                </label>
              </div>
              <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-4 md:space-x-2">
                <div className="flex flex-col col-span-2">
                  <label htmlFor="name2" className="hidden">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name2"
                    id="name2"
                    placeholder="Nombre"
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="hidden" htmlFor="conyuge_dia">
                    Fecha de nacimiento
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="conyuge_dia"
                      id="conyuge_dia"
                      className="flex flex-col col-span-2"
                    >
                      <option value="" disabled selected>
                        Día
                      </option>
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <select
                      name="conyuge_mes"
                      id="conyuge_mes"
                      className="flex flex-col col-span-2"
                    >
                      <option value="" disabled selected>
                        Mes
                      </option>
                      <option value="enero">Enero</option>
                      <option value="febrero">Febrero</option>
                      <option value="marzo">Marzo</option>
                      <option value="abril">Abril</option>
                      <option value="mayo">Mayo</option>
                      <option value="junio">Junio</option>
                      <option value="julio">Julio</option>
                      <option value="agosto">Agosto</option>
                      <option value="septiembre">Septiembre</option>
                      <option value="octubre">Octubre</option>
                      <option value="noviembre">Noviembre</option>
                      <option value="diciembre">Diciembre</option>
                    </select>
                    <select
                      name="conyuge_anio"
                      id="conyuge_anio"
                      className="flex flex-col col-span-2"
                    >
                      <option value="" disabled selected>
                        Año
                      </option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender2" className="hidden">
                    Sexo
                  </label>
                  <select name="gender2" id="gender2">
                    <option value="" disabled selected>
                      Sexo
                    </option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="email2" className="hidden">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email2"
                  id="email2"
                  placeholder="Correo electrónico"
                  autoComplete="off"
                />
              </div>
              <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                <h3 className="inline pr-2">
                  Beneficiario / Fecha de nacimiento:{' '}
                </h3>
                <input
                  id="beneficiario-si"
                  type="radio"
                  name="beneficiario"
                  value="Si"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="beneficiario"
                  aria-describedby="beneficiario"
                  required
                />
                <label htmlFor="beneficiario" className="l-2 block me-2">
                  Si
                </label>
                <input
                  id="beneficiario-no"
                  type="radio"
                  name="beneficiario"
                  value="No"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="beneficiario"
                  aria-describedby="beneficiario"
                  defaultChecked
                  required
                />
                <label htmlFor="beneficiario" className="l-2 block ">
                  No
                </label>
                <div className="flex flex-col ms-2 w-full">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Fecha de nacimiento beneficiario 1
                  </label>
                  <div className="flex space-x-2">
                    <select name="beneficiario1_dia" className="w-full">
                      <option value="" disabled selected>
                        Día
                      </option>
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <select name="beneficiario1_mes" className="w-full">
                      <option value="" disabled selected>
                        Mes
                      </option>
                      <option value="enero">Enero</option>
                      <option value="febrero">Febrero</option>
                      <option value="marzo">Marzo</option>
                      <option value="abril">Abril</option>
                      <option value="mayo">Mayo</option>
                      <option value="junio">Junio</option>
                      <option value="julio">Julio</option>
                      <option value="agosto">Agosto</option>
                      <option value="septiembre">Septiembre</option>
                      <option value="octubre">Octubre</option>
                      <option value="noviembre">Noviembre</option>
                      <option value="diciembre">Diciembre</option>
                    </select>
                    <select name="beneficiario1_anio" className="w-full">
                      <option value="" disabled selected>
                        Año
                      </option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                <h3 className="inline pr-2">
                  Beneficiario / Fecha de nacimiento:{' '}
                </h3>
                <input
                  id="beneficiario2-si"
                  type="radio"
                  name="beneficiario2"
                  value="Si"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="beneficiario2"
                  aria-describedby="beneficiario2"
                  required
                />
                <label htmlFor="beneficiario2" className="l-2 block me-2">
                  Si
                </label>
                <input
                  id="beneficiario2-no"
                  type="radio"
                  name="beneficiario2"
                  value="No"
                  className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="beneficiario2-no"
                  aria-describedby="beneficiario2-no"
                  defaultChecked
                  required
                />
                <label htmlFor="beneficiario2-no" className="l-2 block ">
                  No
                </label>
                <div className="flex flex-col ms-2 w-full">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Fecha de nacimiento beneficiario 2
                  </label>
                  <div className="flex space-x-2">
                    <select name="beneficiario2_dia" className="w-full">
                      <option value="" disabled selected>
                        Día
                      </option>
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <select name="beneficiario2_mes" className="w-full">
                      <option value="" disabled selected>
                        Mes
                      </option>
                      <option value="enero">Enero</option>
                      <option value="febrero">Febrero</option>
                      <option value="marzo">Marzo</option>
                      <option value="abril">Abril</option>
                      <option value="mayo">Mayo</option>
                      <option value="junio">Junio</option>
                      <option value="julio">Julio</option>
                      <option value="agosto">Agosto</option>
                      <option value="septiembre">Septiembre</option>
                      <option value="octubre">Octubre</option>
                      <option value="noviembre">Noviembre</option>
                      <option value="diciembre">Diciembre</option>
                    </select>
                    <select name="beneficiario2_anio" className="w-full">
                      <option value="" disabled selected>
                        Año
                      </option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="comment" className="hidden">
                  Consulta
                </label>
                <textarea
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Comentario - De haber mas beneficiarios, indique nombre y fecha de nacimiento de cada uno aquí."
                  autoComplete="off"
                />
              </div>
              <div className="flex mt-2">
                <input
                  type="checkbox"
                  value="1"
                  className="text-md indeterminate:bg-gray-300 mx-1 my-2 font-medium default:ring-2 checked:bg-primary inline-block"
                  id="contactFormAgree"
                  required
                  onChange={() => setCheck(!check)}
                />
                <label className="mx-1" htmlFor="contactFormAgree">
                  Doy mi consentimiento para el tratamiento de los datos
                  personales que facilito. He leído y acepto los{' '}
                  <Link
                    to="/terminos"
                    className="text-primary hover:text-purple font-semibold"
                  >
                    Términos y Condiciones
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className=" bg-primary hover:bg-blue-dark text-white font-bold py-3 px-6  mt-3 hover:bg-purple transition ease-in-out duration-300"
                onClick={showAlert}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cotizador
