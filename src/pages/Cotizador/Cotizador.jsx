import { useEffect, useState } from 'react'
import People from '../../assets/images/people.png'
import { Helmet } from 'react-helmet'
import { Link, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import emailjs from 'emailjs-com'
import AutoFields from './AutoFields'

function Cotizador() {
  const [searchParams] = useSearchParams();
  
  const [company, setCompany] = useState('')
  const [product, setProduct] = useState('')
  const [extraBeneficiaries, setExtraBeneficiaries] = useState(0)
  const [coverage, setCoverage] = useState('')
  const [viajaSolo, setViajaSolo] = useState('si')

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

  const isAutoPiramideOceanica =
    product === 'auto' &&
    (company === 'seguros-piramide' || company === 'seguros-oceanica')

  const isViajesPiramideOceanicaPersonas =
    product === 'personas' &&
    coverage === 'viajes' &&
    (company === 'seguros-piramide' || company === 'seguros-oceanica')

  const isPatrimonialesPiramideOceanica =
    product === 'patrimoniales' &&
    (company === 'seguros-piramide' || company === 'seguros-oceanica')

  const handleReset = () => {
    setCompany('')
    setProduct('')
    setExtraBeneficiaries(0)
  }

  function sendEmail(e) {
    e.preventDefault()

    console.log('>>> Enviando a Power Automate + EmailJS desde Cotizador')

    const formData = new FormData(e.target)

    const day = formData.get('titular_dia')
    const monthName = formData.get('titular_mes')
    const year = formData.get('titular_anio')

    const monthMap = {
      enero: 0,
      febrero: 1,
      marzo: 2,
      abril: 3,
      mayo: 4,
      junio: 5,
      julio: 6,
      agosto: 7,
      septiembre: 8,
      octubre: 9,
      noviembre: 10,
      diciembre: 11,
    }

    let fechaNacimientoIso = null

    if (day && monthName && year && monthMap[monthName] !== undefined) {
      const dateObj = new Date(
        Number(year),
        monthMap[monthName],
        Number(day),
        0,
        0,
        0,
      )
      fechaNacimientoIso = dateObj.toISOString()
    }

    if (product === 'auto') {
      const dataAuto = {
        NombreCompleto: formData.get('name'),
        Cedula: formData.get('cedula'),
        Telefono: formData.get('mobile'),
        CorreoElectronico: formData.get('email'),
        FechaNacimiento: fechaNacimientoIso,
        Sexo: formData.get('gender'),
        Ano: Number(formData.get('vehiculo_ano')),
        Marca: formData.get('vehiculo_marca'),
        Modelo: formData.get('vehiculo_modelo'),
        Version: formData.get('vehiculo_version'),
        Transmision: formData.get('vehiculo_transmision'),
        Blindaje: formData.get('blindaje') ? 'Si' : 'No',
        Cobertura: formData.get('cobertura'),
        CeroKM: !!formData.get('cero_km'),
        CompaniaAseguradora: formData.get('aseguradora'),
        QueDeseaAsegurar: formData.get('producto'),
        TipoPago: formData.get('pago'),
      }

      fetch(
        'https://70819f504490ecc695be32d38329fd.e1.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d726397078a24769abbdb929d4e75263/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jQdHR1WDCrkvkkq-MfOKoiQ2aKfOaWKXfPjP0ydRCEc',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataAuto),
        },
      )
        .then((response) => {
          if (!response.ok) {
            console.error('Error al enviar datos a Power Automate (Auto)')
          }
        })
        .catch((error) => {
          console.error('Error de conexión con Power Automate (Auto):', error)
        })
    }

    if (product === 'personas') {
      const toIsoDate = (d, m, y) => {
        if (!d || !m || !y || monthMap[m] === undefined) return null
        const dateObj = new Date(Number(y), monthMap[m], Number(d), 0, 0, 0)
        return dateObj.toISOString()
      }

      const fechaNacimientoConyugeIso = toIsoDate(
        formData.get('conyuge_dia'),
        formData.get('conyuge_mes'),
        formData.get('conyuge_anio'),
      )

      const fechaNacBenef1Iso = toIsoDate(
        formData.get('beneficiario1_dia'),
        formData.get('beneficiario1_mes'),
        formData.get('beneficiario1_anio'),
      )

      const fechaNacBenef2Iso = toIsoDate(
        formData.get('beneficiario2_dia'),
        formData.get('beneficiario2_mes'),
        formData.get('beneficiario2_anio'),
      )

      const fechaNacBenef3Iso = toIsoDate(
        formData.get('beneficiario3_dia'),
        formData.get('beneficiario3_mes'),
        formData.get('beneficiario3_anio'),
      )

      const fechaNacBenef4Iso = toIsoDate(
        formData.get('beneficiario4_dia'),
        formData.get('beneficiario4_mes'),
        formData.get('beneficiario4_anio'),
      )

      const fechaSalidaIso = toIsoDate(
        formData.get('fecha_salida_dia'),
        formData.get('fecha_salida_mes'),
        formData.get('fecha_salida_anio'),
      )

      const fechaLlegadaIso = toIsoDate(
        formData.get('fecha_llegada_dia'),
        formData.get('fecha_llegada_mes'),
        formData.get('fecha_llegada_anio'),
      )

      const dataPersonas = {
        QueDeseaAsegurar: formData.get('producto'),
        CompaniaAseguradora: formData.get('aseguradora'),
        Cobertura: formData.get('cobertura'),
        TipoPago: formData.get('pago'),
        ServicioAsistenciaViajes30Dias: !!formData.get('asistencia_viajes_oceanica'),
        NombreCompleto: formData.get('name'),
        FechaNacimiento: fechaNacimientoIso,
        Sexo: formData.get('gender'),
        CorreoElectronico: formData.get('email'),
        Telefono: formData.get('mobile'),
        Cedula: formData.get('cedula'),
        MaternidadComplicaciones: !!formData.get('maternidad_complicaciones'),
        TieneConyuge: formData.get('conyuge') === 'Si',
        ViajaSolo: formData.get('viaja_solo') === 'si',
      }

      const nombreConyuge = formData.get('name2')
      if (nombreConyuge) {
        dataPersonas.NombreConyuge = nombreConyuge
      }
      if (fechaNacimientoConyugeIso) {
        dataPersonas.FechaNacimientoConyuge = fechaNacimientoConyugeIso
      }
      const sexoConyuge = formData.get('gender2')
      if (sexoConyuge) {
        dataPersonas.SexoConyuge = sexoConyuge
      }
      const correoConyuge = formData.get('email2')
      if (correoConyuge) {
        dataPersonas.CorreoConyuge = correoConyuge
      }

      if (fechaNacBenef1Iso) {
        dataPersonas.FechaNacimientoBeneficiario1 = fechaNacBenef1Iso
      }
      if (fechaNacBenef2Iso) {
        dataPersonas.FechaNacimientoBeneficiario2 = fechaNacBenef2Iso
      }
      if (fechaNacBenef3Iso) {
        dataPersonas.FechaNacimientoBeneficiario3 = fechaNacBenef3Iso
      }
      if (fechaNacBenef4Iso) {
        dataPersonas.FechaNacimientoBeneficiario4 = fechaNacBenef4Iso
      }

      const profesion = formData.get('profesion')
      if (profesion) {
        dataPersonas.ProfesionOcupacion = profesion
      }

      const paisOrigen = formData.get('pais_origen')
      if (paisOrigen) {
        dataPersonas.PaisOrigen = paisOrigen
      }
      const paisDestino = formData.get('pais_destino')
      if (paisDestino) {
        dataPersonas.PaisDestino = paisDestino
      }

      if (fechaSalidaIso) {
        dataPersonas.FechaSalida = fechaSalidaIso
      }
      if (fechaLlegadaIso) {
        dataPersonas.FechaLlegada = fechaLlegadaIso
      }

      fetch(
        'https://70819f504490ecc695be32d38329fd.e1.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/68b90ffbd8864ce5832965b58f9aa545/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6FQUtJ1UyVDd4yeg9JCr3yo7Id5ApZGN9XX8peDtUFE',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataPersonas),
        },
      )
        .then((response) => {
          if (!response.ok) {
            console.error('Error al enviar datos a Power Automate (Personas)')
          }
        })
        .catch((error) => {
          console.error('Error de conexión con Power Automate (Personas):', error)
        })
    }

    if (product === 'patrimoniales') {
      const dataPatrimoniales = {
        CompaniaAseguradora: formData.get('aseguradora'),
        QueDeseaAsegurar: formData.get('producto'),
        Cobertura: formData.get('cobertura'),
        TipoPago: formData.get('pago'),
        NombreCompleto: formData.get('name'),
        FechaNacimiento: fechaNacimientoIso,
        Sexo: formData.get('gender'),
        CorreoElectronico: formData.get('email'),
        Telefono: formData.get('mobile'),
        Cedula: formData.get('cedula'),
      }

      fetch(
        'https://70819f504490ecc695be32d38329fd.e1.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/8eebb1a298d742dfa1a17844016e66a2/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BVTA61wp98XEV7-hy_ZNP2FP-gNZDWtuePzRfv8vHuc',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataPatrimoniales),
        },
      )
        .then((response) => {
          if (!response.ok) {
            console.error(
              'Error al enviar datos a Power Automate (Patrimoniales)',
            )
          }
        })
        .catch((error) => {
          console.error(
            'Error de conexión con Power Automate (Patrimoniales):',
            error,
          )
        })
    }

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
          content="El proceso es rápido y sencillo. Introduce tus datos para cotizar los planes y productos que mejor se adapten a tus necesidades."
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
                  onChange={(e) => {
                    setCompany(e.target.value)
                    setCoverage('')
                  }}
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
              <div className="flex flex-col mt-2">
                <label htmlFor="producto" className="hidden">
                  Qué desea asegurar
                </label>
                <select
                  name="producto"
                  id="producto"
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value)
                    setCoverage('')
                  }}
                  required
                >
                  <option value="" disabled>
                    Qué desea asegurar
                  </option>
                  <option value="auto">Automóvil</option>
                  <option value="personas">Personas</option>
                  <option value="patrimoniales">Patrimoniales</option>
                </select>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="cobertura" className="hidden">
                  Cobertura
                </label>
                <select
                  name="cobertura"
                  id="cobertura"
                  value={coverage}
                  onChange={(e) => setCoverage(e.target.value)}
                >
                  <option value="" disabled>
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
                      <option value="rcv-internacional-colombia-venezuela">RCV Internacional (Colombia-Venezuela)</option>
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
                  ) : null}
                </select>
              </div>
              {company === 'seguros-piramide' &&
                product === 'personas' &&
                coverage === 'accidentes-personales' && (
                  <div className="flex flex-col mt-2">
                    <label htmlFor="profesion" className="hidden">
                      Profesión y/u Ocupación
                    </label>
                    <input
                      type="text"
                      name="profesion"
                      id="profesion"
                      placeholder="Profesión y/u Ocupación"
                      autoComplete="off"
                      required
                    />
                  </div>
                )}
              {isViajesPiramideOceanicaPersonas && (
                <>
                  <div className="flex flex-col mt-2">
                    <label htmlFor="pais_origen" className="hidden">
                      País de origen
                    </label>
                    <input
                      type="text"
                      name="pais_origen"
                      id="pais_origen"
                      placeholder="País de origen"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label htmlFor="pais_destino" className="hidden">
                      País destino
                    </label>
                    <input
                      type="text"
                      name="pais_destino"
                      id="pais_destino"
                      placeholder="País destino"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:space-x-2 mt-2">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Fecha de salida
                      </label>
                      <div className="flex space-x-2">
                        <select
                          name="fecha_salida_dia"
                          className="w-full"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Día
                          </option>
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <select
                          name="fecha_salida_mes"
                          className="w-full"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                          name="fecha_salida_anio"
                          className="w-full"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                    <div className="flex flex-col mt-2 sm:mt-0">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Fecha de llegada
                      </label>
                      <div className="flex space-x-2">
                        <select
                          name="fecha_llegada_dia"
                          className="w-full"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Día
                          </option>
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <select
                          name="fecha_llegada_mes"
                          className="w-full"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                          name="fecha_llegada_anio"
                          className="w-full"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                    <h3 className="inline pr-2">Viaja solo: </h3>
                    <input
                      id="viaja-solo-si"
                      type="radio"
                      name="viaja_solo"
                      value="si"
                      className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                      checked={viajaSolo === 'si'}
                      onChange={() => setViajaSolo('si')}
                    />
                    <label htmlFor="viaja-solo-si" className="l-2 block me-2">
                      Si
                    </label>
                    <input
                      id="viaja-solo-no"
                      type="radio"
                      name="viaja_solo"
                      value="no"
                      className="h-4 w-4 border-gray-300 mt-1 mx-1 focus:ring-2 focus:ring-blue-300"
                      checked={viajaSolo === 'no'}
                      onChange={() => setViajaSolo('no')}
                    />
                    <label htmlFor="viaja-solo-no" className="l-2 block ">
                      No
                    </label>
                  </div>
                </>
              )}
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
                    placeholder="Nombres/Apellidos"
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
                      defaultValue=""
                    >
                      <option value="" disabled>
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
                      defaultValue=""
                    >
                      <option value="" disabled>
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
                      defaultValue=""
                    >
                      <option value="" disabled>
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
                  <select name="gender" id="gender" required defaultValue="">
                    <option value="" disabled>
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
              <div className="flex flex-col mt-2">
                <label htmlFor="cedula" className="hidden">
                  Cédula de identidad
                </label>
                <input
                  type="text"
                  name="cedula"
                  id="cedula"
                  placeholder="Cédula de identidad"
                  autoComplete="off"
                  required
                />
              </div>
              {product === 'personas' &&
                (coverage === 'hcm-50k' ||
                  coverage === 'hcm-75k' ||
                  coverage === 'hcm-100k' ||
                  coverage === 'hcm-200k') && (
                  <div className="flex mt-2">
                    <input
                      type="checkbox"
                      value="1"
                      className="text-md indeterminate:bg-gray-300 mx-1 my-2 font-medium default:ring-2 checked:bg-primary inline-block"
                      id="maternidadComplicaciones"
                      name="maternidad_complicaciones"
                    />
                    <label className="mx-1" htmlFor="maternidadComplicaciones">
                      Maternidad y sus complicaciones
                    </label>
                  </div>
                )}
              {company === 'seguros-oceanica' &&
                product === 'personas' &&
                coverage === 'viajes' && (
                  <div className="flex mt-2">
                    <input
                      type="checkbox"
                      value="1"
                      className="text-md indeterminate:bg-gray-300 mx-1 my-2 font-medium default:ring-2 checked:bg-primary inline-block"
                      id="asistenciaViajesOceanica"
                      name="asistencia_viajes_oceanica"
                    />
                    <label className="mx-1" htmlFor="asistenciaViajesOceanica">
                      Servicio de Asistencia en Viajes Internacionales, máx 30 días de viaje
                    </label>
                  </div>
                )}
              {isAutoPiramideOceanica && (
                <AutoFields
                  company={company}
                  product={product}
                  days={days}
                  years={years}
                />
              )}

              {!isAutoPiramideOceanica && !isPatrimonialesPiramideOceanica && (
                <>
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
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                      <select name="gender2" id="gender2" defaultValue="">
                        <option value="" disabled>
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
                  {(!isViajesPiramideOceanicaPersonas || viajaSolo === 'no') && (
                    <>
                      <div className="text-gray-500 font-semibold items-center my-4 ms-3 flex">
                        <h3 className="inline pr-2">Fecha de nacimiento:</h3>
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
                            {isViajesPiramideOceanicaPersonas && viajaSolo === 'no'
                              ? 'Acompañante 1'
                              : 'Beneficiario 1'}
                          </label>
                          <div className="flex space-x-2">
                            <select
                              name="beneficiario1_dia"
                              className="w-full"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Día
                              </option>
                              {days.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                            <select
                              name="beneficiario1_mes"
                              className="w-full"
                              defaultValue=""
                            >
                              <option value="" disabled>
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
                              name="beneficiario1_anio"
                              className="w-full"
                              defaultValue=""
                            >
                              <option value="" disabled>
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
                        <h3 className="inline pr-2">Fecha de nacimiento:</h3>
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
                            {isViajesPiramideOceanicaPersonas && viajaSolo === 'no'
                              ? 'Acompañantes 2'
                              : 'Beneficiarios 2'}
                          </label>
                          <div className="flex space-x-2">
                            <select
                              name="beneficiario2_dia"
                              className="w-full"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Día
                              </option>
                              {days.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                            <select
                              name="beneficiario2_mes"
                              className="w-full"
                              defaultValue=""
                            >
                              <option value="" disabled>
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
                              name="beneficiario2_anio"
                              className="w-full"
                              defaultValue=""
                            >
                              <option value="" disabled>
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
                            Fecha de nacimiento:
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
                              {isViajesPiramideOceanicaPersonas && viajaSolo === 'no'
                                ? 'Acompañante 3'
                                : 'Beneficiario 3'}
                            </label>
                            <div className="flex space-x-2">
                              <select
                                name="beneficiario3_dia"
                                className="w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Día
                                </option>
                                {days.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                              <select
                                name="beneficiario3_mes"
                                className="w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>
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
                                name="beneficiario3_anio"
                                className="w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>
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
                            Fecha de nacimiento:
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
                              {isViajesPiramideOceanicaPersonas && viajaSolo === 'no'
                                ? 'Acompañante 4'
                                : 'Beneficiario 4'}
                            </label>
                            <div className="flex space-x-2">
                              <select
                                name="beneficiario4_dia"
                                className="w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Día
                                </option>
                                {days.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                              <select
                                name="beneficiario4_mes"
                                className="w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>
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
                                name="beneficiario4_anio"
                                className="w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>
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
                              setExtraBeneficiaries((prev) =>
                                prev < 2 ? prev + 1 : prev,
                              )
                            }
                          >
                            <span className="mr-1 text-lg font-bold">+</span>
                            {isViajesPiramideOceanicaPersonas
                              ? 'Agregar Nuevo Acompañante'
                              : 'Agregar Nuevo Beneficiario'}
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
                    </> 
                  )}
                </> 
              )} 
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
