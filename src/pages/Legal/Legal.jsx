import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

function Legal() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className=" md:m-auto mb-5 mx-5 md:mt-[5rem] max-w-[800px] pt-7 lg:mt-[6rem] space-y-2">
      <Helmet>
        <title>Aviso Legal</title>
        <meta name="title" content="Aviso Legal" />
        <meta
          name="description"
          content="Información sobre todas las leyes que respectan a FFC."
        />
      </Helmet>
      <h1 className="my-5 text-center text-3xl font-bold">Aviso Legal</h1>
      <p>
        El titular de la presente página web{' '}
        <a href="https://www.futurefinancialconsultantsve.com/" className='text-primary hover:text-purple'>
          www.futurefinancialconsultantsve.com
        </a>{' '}
        es FUTURE FINANCIAL CONSULTANTS, C.A. inscrita en el Registro Mercantil
        Primero del Distrito Capital en el año 1997 (expediente Nº 491019),
        domiciliada en Caracas, Venezuela, con sede en el Centro Coinasa, piso 3,
        oficina Nº 34-A, Urb. La Castellana, Municipio Chacao; en lo adelante
        también referida como “FFC”.
      </p>
      <p>
        Los servicios ofrecidos a través del presente sitio web{' '}
        <a href="https://www.futurefinancialconsultantsve.com/" className='text-primary hover:text-purple'>
          www.futurefinancialconsultantsve.com
        </a>
        , corresponden bajo uso de licencia e inscrita en la Superintendencia de la Actividad Aseguradora, en lo adelante SUDEASEG, con el Nº INSURT-0004, mediante oficio Nº SAA-07-6002 de fecha 03-09-2025.
      </p>
      <p>
        A través de esta página se recaba información del Usuario para acceder y
        poner a disposición de los mismos, beneficios y servicios ofrecidos por las Aseguradoras en alianza con FFC; y
        está presente actualmente sólo en Venezuela, pero podrá abrir
        subsidiarias y/o sucursales en el exterior previo cumplimiento de la
        normativa legal aplicable en cada jurisdicción de que se trate. Los
        servicios ofrecidos por FFC, se
        prestan en colaboración con compañías de seguros, debidamente
        autorizadas en el país.
      </p>
      <p>
        En la República Bolivariana de Venezuela, las pólizas y planes
        ofrecidas por FFC a través de la presente página web, están suscritos y amparados por SEGUROS PIRAMIDE, C.A. (R.I.F. J-00106474-5), empresa de seguros inscrita y autorizada
        en la Superintendencia de la Actividad Aseguradora, SUDEASEG, bajo el Nº
        ES-80 y OCEANICA DE SEGUROS, C.A. (R.I.F.
        J-30620632-9), inscrita ante SUDEASEG con el Nº ES-117.
      </p>
      <p>
      </p>
      <p>
        En virtud de que las alianzas con compañías de seguros, pueden cambiar en el tiempo, con la agilidad impuesta por la economía
        digital; lo que implica que constantemente se puedan ir suscribiendo o
        cambiando alianzas comerciales; las mismas le serán oportunamente
        informadas a los Usuarios, para que siempre conozcan en tiempo real, de
        las empresas que respaldan Los Productos ofrecidos a través de la página{' '}
        <a href="https://www.futurefinancialconsultantsve.com/" className='text-primary hover:text-purple'>
          www.futurefinancialconsultantsve.com
        </a>
      </p>
      <h2 className='font-bold text-xl'>Contacto</h2>
      <p>
        Para contactar con FFC puede hacerlo a través del correo electrónico de
        contacto:{' '}
        <a href="mailto:ffconsultantsve@outlook.com" className='text-primary hover:text-purple'>
          ffconsultantsve@outlook.com
        </a>{' '}
      </p>
    </div>
  )
}

export default Legal
