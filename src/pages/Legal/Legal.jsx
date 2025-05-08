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
        Primero del Distrito Capital en el año 1997 (expediente 491019),
        domiciliada en Caracas, Venezuela, con sede en la Torre Coinasa, piso 3,
        oficina Nº 34-A, Urb. La Castellana, Municipio Chacao; en lo adelante
        tambien referida como “FFC”.
      </p>
      <p>
        Los servicios ofrecidos a través del presente sitio web{' '}
        <a href="https://www.futurefinancialconsultantsve.com/" className='text-primary hover:text-purple'>
          www.futurefinancialconsultantsve.com
        </a>
        , corresponden bajo uso de licencia a Oliver Antonio Sierra Túa, titular
        de la Cédula de Identidad Nº V-9.617.552, Corredor de Seguros
        debidamente autorizado bajo el Nº 4.171 por la Superintendencia de la
        Actividad Aseguradora, en lo adelante SUDEASEG, para actuar como tal, en
        adelante referido como “Corredor de Seguros Autorizado”.
      </p>
      <p>
        A través de esta página se recaba información del Usuario para acceder y
        poner a disposición de los mismos, beneficios y servicios de salud
        ofrecidos por el “Corredor de Seguros Autorizado” en alianza con FFC; y
        está presente actualmente sólo en Venezuela, pero podrá abrir
        subsidiarias y/o sucursales en el exterior previo cumplimiento de la
        normativa legal aplicable en cada jurisdicción de que se trate. Los
        servicios ofrecidos por FFC en alianza con el Corredor Autorizado, se
        prestan en colaboración con compañías de seguros, reaseguros, medicina
        prepagada, o prestadores de servicios de atención en salud, debidamente
        autorizados en el país.
      </p>
      <p>
        En la República Bolivariana de Venezuela los planes y pólizas de salud
        de FFC intermediados por el Corredor de Seguros Autorizado a través de
        la presente página web, están suscritos y amparados por MERCANTIL
        SEGUROS, C.A. (R.I.F. J-000901805), empresa de seguros inscrita y autorizada
        en la Superintendencia de la Actividad Aseguradora, SUDEASEG, bajo el Nº
        74, conforme a la Ley de la Actividad Aseguradora de 15 de marzo de 2016
        publicada en la Gaceta Oficial Nº6.220; y QUALITAS SEGUROS, C.A. (R.I.F.
        J-30668450-6), inscrita ante SUDEASEG con el Nº 118 Providencia
        Administrativa N° 585 del 18 de abril de 2000, publicada en la Gaceta
        Oficial de la República Bolivariana de Venezuela N° 5.464 Extraordinaria
        del 18 de mayo de 2000, modificada según Providencia Administrativa N°
        FSS-2-3-002943 del 13 de noviembre de 2008.
      </p>
      <p>
        Así mismo, los planes de atención en Salud ofrecidos a través de FFC
        están avalados por las empresas prestadoras de servicios de atención en
        salud inscritas y autorizadas para actuar como tales, ante el Ministerio
        del Poder Popular para la Salud, en Venezuela.
      </p>
      <p>
        La publicidad de las pólizas y demás productos y servicios amparados por
        las empresas de seguros, medicina prepagada ofrecidas en la página web{' '}
        <a href="https://www.futurefinancialconsultantsve.com/" className='text-primary hover:text-purple'>
          www.futurefinancialconsultantsve.com
        </a>
        , han sido autorizadas por la SUDEASEG, a FFC, bajo el código TVP-
        _________; a Seguros Mercantil, C.A. bajo el código TVP-2022-0063 y a
        Qualitas Seguros, C.A., bajo el código TVP-2023-0048.
      </p>
      Así mismo, el Corredor de Seguros Autorizado en el marco del acuerdo de
      intermediación que mantiene bajo "Código Activo” con las referidas
      empresas, se encuentra autorizado para utilizar tal publicidad en los
      mismos términos y condiciones en que SUDEASEG les aprobó la misma, y que
      continuamente éstas empresas, informan al Corredor de Seguros Autorizado
      por los canales de comunicación establecidos y utilizados en virtud del
      “Código Activo”, siguiendo los usos y costumbres del mercado asegurador
      venezolano.
      <p>
        En virtud de que las alianzas con compañías de seguros, reaseguros,
        medicina prepagada o prestadores de servicios de atención en salud,
        pueden cambiar en el tiempo, con la agilidad impuesta por la economía
        digital; lo que implica que constantemente se puedan ir suscribiendo o
        cambiando alianzas comerciales; las mismas le serán oportunamente
        informadas a los Usuarios, para que siempre conozcan en tiempo real, de
        las empresas que respaldan Los Productos ofrecidos a través de la página{' '}
        <a href="https://www.futurefinancialconsultantsve.com/" className='text-primary hover:text-purple'>
          www.futurefinancialconsultantsve.com
        </a>
        , por el Corredor de Seguros Autorizado, conforme a los Términos y
        Condiciones descritos en la presente página.
      </p>
      <h2 className='font-bold text-xl'>Contacto</h2>
      <p>
        Para contactar con FFC puede hacerlo a través del correo electrónico de
        contacto:{' '}
        <a href="mailto:ffconsultants124@outlook.com" className='text-primary hover:text-purple'>
          ffconsultants124@outlook.com
        </a>{' '}
        o a través de{' '}
        <a href="mailto:oliversierrat@gmail.com" className='text-primary hover:text-purple'>oliversierrat@gmail.com</a>.
      </p>
    </div>
  )
}

export default Legal
