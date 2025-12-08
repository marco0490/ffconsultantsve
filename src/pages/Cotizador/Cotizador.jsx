import { useEffect, useState } from 'react'
import People from '../../assets/images/people.png'
import { Helmet } from 'react-helmet'
import { Link, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'

function Cotizador() {
  const [searchParams] = useSearchParams();
  
  const [company, setCompany] = useState('')
  const [product, setProduct] = useState('')
  const [extraBeneficiaries, setExtraBeneficiaries] = useState(0)

  useEffect(() => {
    window.scroll(0, 0);
    // Obtener parámetros de la URL
    const aseguradora = searchParams.get('aseguradora');
    const producto = searchParams.get('producto');
    if (aseguradora) {
      setCompany(aseguradora);
    }
    if (producto) {
      setProduct(producto);
    } else {
      setProduct('');
    }
  }, [searchParams])
  const [check, setCheck] = useState(false)

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i)

  const handleReset = () => {
    setCompany('')
    setProduct('')
    setExtraBeneficiaries(0)
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
                  {/*
                  <option value="seguros-qualitas">Seguros Qualitas</option>
                  <option value="seguros-caracas">Seguros Caracas</option>
                  <option value="seguros-hispana">Seguros Hispana</option>
                  */}
                  <option value="seguros-piramide">Seguros Piramide</option>
                  <option value="seguros-oceanica">Seguros Oceanica</option>
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
                  ) : company === 'seguros-piramide' && product === 'auto' ? (
                    <>
                      <option value="cobertura-amplia">Cobertura Amplia</option>
                      <option value="perdida-total">Pérdida Total</option>
                      <option value="rcv-basica-placa-nacional">RCV Básica Placa Nacional</option>
                      <option value="rcv-basica-placa-extranjera">RCV Básica Placa Extranjera</option>
                      <option value="rcv-basica-taxi">RCV Básica Taxi</option>
                      <option value="rcv-basica-taxi">RCV Internacional (Colombia-Venezuela)</option>
                      <option value="rcv-exceso-5000-grua">RCV Exceso $5.000 + Grúa</option>
                    </>
                  ) : company === 'seguros-oceanica' && product === 'auto' ? (
                    <>
                      <option value="cobertura-amplia">Cobertura Amplia</option>
                      <option value="perdida-total">Pérdida Total</option>
                      <option value="rcv-basica">RCV Básica</option>
                      <option value="rcv-exceso-5000">RCV Exceso US$ 5000</option>
                      <option value="rcv-exceso-5000-grua">RCV Exceso US$ 5.000 + Grúa</option>
                      <option value="rcv-basica-taxi">RCV Básica (TAXI)</option>
                      <option value="rcv-exceso-5000-taxi">RCV Exceso US$ 5.000 (TAXI)</option>
                    </>
                  ) : company === 'seguros-piramide' && product === 'personas' ? (
                    <>
                      <option value="hcm-50k">HCM S.A. US$ 50.000</option>
                      <option value="hcm-75k">HCM S.A. US$ 75.000</option>
                      <option value="hcm-200k">HCM S.A. US$ 200.000</option>
                      <option value="accidentes-personales">Accidentes Personales</option>
                      <option value="emergencias-medicas">Emergencias Médicas</option>
                      <option value="servicios-funerarios">Servicios Funerarios</option>
                      <option value="vida">Vida</option>
                      <option value="pago-unico-cancer">Pago Único por Cáncer</option>
                      <option value="viajes">Viajes</option>
                    </>
                  ) : company === 'seguros-oceanica' && product === 'personas' ? (
                    <>
                      <option value="hcm-50k">HCM S.A. US$ 50.000</option>
                      <option value="hcm-100k">HCM S.A. US$ 100.000</option>
                      <option value="hcm-200k">HCM S.A. US$ 200.000</option>
                      <option value="emergencias-medicas">Emergencias Médicas</option>
                      <option value="vida">Vida</option>
                      <option value="servicios-funerarios">Servicios Funerarios</option>
                      <option value="deportes-extremos">Deportes Extremos</option>
                      <option value="pago-unico-cancer">Pago Único por Cáncer</option>
                      <option value="viajes">Viajes</option>
                    </>
                  ) : company === 'seguros-piramide' && product === 'patrimoniales' ? (
                    <>
                      <option value="productiva-a-20k">Pirámide Productiva Grupo A - US$ 20.000,00</option>
                      <option value="productiva-a-60k">Pirámide Productiva Grupo A - US$ 60.000,00</option>
                      <option value="productiva-a-100k">Pirámide Productiva Grupo A - US$ 100.000,00</option>
                      <option value="productiva-a-150k">Pirámide Productiva Grupo A - US$ 150.000,00</option>
                      <option value="productiva-a-200k">Pirámide Productiva Grupo A - US$ 200.000,00</option>
                      <option value="productiva-a-250k">Pirámide Productiva Grupo A - US$ 250.000,00</option>
                      <option value="productiva-a-300k">Pirámide Productiva Grupo A - US$ 300.000,00</option>
                      <option value="hogar-20k">Pirámide Hogar US$ 20.000,00</option>
                    </>
                  ) : company === 'seguros-oceanica' && product === 'patrimoniales' ? (
                    <>
                      <option value="hogar-20k">Oceánica Hogar US$ 20.000,00</option>
                      <option value="hogar-60k">Oceánica Hogar US$ 60.000,00</option>
                      <option value="hogar-100k">Oceánica Hogar US$ 100.000,00</option>
                      <option value="hogar-150k">Oceánica Hogar US$ 150.000,00</option>
                      <option value="hogar-200k">Oceánica Hogar US$ 200.000,00</option>
                      <option value="hogar-250k">Oceánica Hogar US$ 250.000,00</option>
                      <option value="hogar-300k">Oceánica Hogar US$ 300.000,00</option>
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
                      className="flex flex-col col-span-2 text-[14px]"
                      required
                    >
                      <option value="" disabled selected>
                        D
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
                      className="flex flex-col col-span-2 text-[14px]"
                      required
                    >
                      <option value="" disabled selected>
                        M
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
                      className="flex flex-col col-span-2 text-[14px]"
                      required
                    >
                      <option value="" disabled selected>
                        A
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
                      className="flex flex-col col-span-2 text-[14px]"
                    >
                      <option value="" disabled selected>
                        D
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
                      className="flex flex-col col-span-2 text-[14px]"
                    >
                      <option value="" disabled selected>
                        M
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
                      className="flex flex-col col-span-2 text-[14px]"
                    >
                      <option value="" disabled selected>
                        A
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
              {extraBeneficiaries >= 1 && (
                <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                  <h3 className="inline pr-2">
                    Beneficiario / Fecha de nacimiento:{' '}
                  </h3>
                  <input
                    id="beneficiario3-si"
                    type="radio"
                    name="beneficiario3"
                    value="Si"
                    className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="beneficiario3"
                    aria-describedby="beneficiario3"
                  />
                  <label htmlFor="beneficiario3" className="l-2 block me-2">
                    Si
                  </label>
                  <input
                    id="beneficiario3-no"
                    type="radio"
                    name="beneficiario3"
                    value="No"
                    className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="beneficiario3-no"
                    aria-describedby="beneficiario3-no"
                    defaultChecked
                  />
                  <label htmlFor="beneficiario3-no" className="l-2 block ">
                    No
                  </label>
                  <div className="flex flex-col ms-2 w-full">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Fecha de nacimiento beneficiario 3
                    </label>
                    <div className="flex space-x-2">
                      <select name="beneficiario3_dia" className="w-full">
                        <option value="" disabled selected>
                          Día
                        </option>
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <select name="beneficiario3_mes" className="w-full">
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
                      <select name="beneficiario3_anio" className="w-full">
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
              )}

              {extraBeneficiaries >= 2 && (
                <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                  <h3 className="inline pr-2">
                    Beneficiario / Fecha de nacimiento:{' '}
                  </h3>
                  <input
                    id="beneficiario4-si"
                    type="radio"
                    name="beneficiario4"
                    value="Si"
                    className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="beneficiario4"
                    aria-describedby="beneficiario4"
                  />
                  <label htmlFor="beneficiario4" className="l-2 block me-2">
                    Si
                  </label>
                  <input
                    id="beneficiario4-no"
                    type="radio"
                    name="beneficiario4"
                    value="No"
                    className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                    aria-labelledby="beneficiario4-no"
                    aria-describedby="beneficiario4-no"
                    defaultChecked
                  />
                  <label htmlFor="beneficiario4-no" className="l-2 block ">
                    No
                  </label>
                  <div className="flex flex-col ms-2 w-full">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Fecha de nacimiento beneficiario 4
                    </label>
                    <div className="flex space-x-2">
                      <select name="beneficiario4_dia" className="w-full">
                        <option value="" disabled selected>
                          Día
                        </option>
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <select name="beneficiario4_mes" className="w-full">
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
                      <select name="beneficiario4_anio" className="w-full">
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
              )}

              {extraBeneficiaries < 2 && (
                <div className="flex justify-start mt-2">
                  <button
                    type="button"
                    className="flex items-center text-primary font-semibold text-sm hover:text-blue-700"
                    onClick={() =>
                      setExtraBeneficiaries((prev) => (prev < 2 ? prev + 1 : prev))
                    }
                  >
                    <span className="mr-1 text-lg font-bold">+</span>
                    Agregar Nuevo Beneficiario
                  </button>
                </div>
              )}

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
