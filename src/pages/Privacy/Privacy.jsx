import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Privacy() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className=" md:m-auto mb-5 mx-5 md:mt-[5rem] max-w-[800px] pt-7 lg:mt-[6rem] space-y-2">
      <Helmet>
        <title>Política de Privacidad</title>
        <meta name="title" content="Política de Privacidad" />
        <meta
          name="description"
          content="Política de Privacidad de la FFC App y del sitio web de Future Financial Consultants, C.A."
        />
      </Helmet>
      <h1 className="my-5 text-center text-3xl font-bold">
        Política de Privacidad — FFC App y sitio web
      </h1>

      <p>
        <span className="font-bold">Future Financial Consultants, C.A.</span>
        <br />
        Última actualización: 16 de agosto de 2026
      </p>

      <h2 className="font-bold text-xl">1. Quiénes somos</h2>

      <p>
        FUTURE FINANCIAL CONSULTANTS, C.A. (en adelante, “FFC”), sociedad de
        corretaje de seguros inscrita en el Registro Mercantil Primero del
        Distrito Capital en el año 1997 (expediente Nº 491019), con domicilio en
        el Centro Coinasa, piso 3, oficina Nº 34-A, Urb. La Castellana,
        Municipio Chacao, Caracas, Venezuela, e inscrita ante la
        Superintendencia de la Actividad Aseguradora (SUDEASEG) bajo el Nº
        INSURT-0004 (oficio Nº SAA-07-6002 de fecha 03-09-2025), es la
        responsable del tratamiento de los datos personales recabados a través
        de:
      </p>

      <ul className="list-disc pl-6 space-y-1">
        <li>
          La aplicación móvil <span className="font-bold">FFC App</span> (iOS y
          Android);
        </li>
        <li>El sitio web www.futurefinancialconsultantsve.com;</li>
        <li>
          El panel de gestión interno operado por el personal autorizado de FFC.
        </li>
      </ul>

      <p>
        Para cualquier asunto relacionado con esta política o con sus datos
        personales, puede contactarnos en:{' '}
        <a
          href="mailto:ffconsultantsve@outlook.com"
          className="text-primary hover:text-purple font-bold"
        >
          ffconsultantsve@outlook.com
        </a>
        .
      </p>

      <h2 className="font-bold text-xl">2. Qué datos recopilamos</h2>

      <p>
        Recopilamos únicamente los datos necesarios para prestar los servicios
        de intermediación de seguros que usted o su empleador contratan:
      </p>

      <p>
        <span className="font-bold">a) Datos de identificación y contacto.</span>{' '}
        Cédula de identidad, nombres y apellidos, fecha de nacimiento, sexo,
        correo electrónico y número de teléfono.
      </p>

      <p>
        <span className="font-bold">b) Datos de sus familiares cubiertos.</span>{' '}
        Cuando su póliza incluye beneficiarios adicionales: cédula (si aplica),
        nombres, fecha de nacimiento, sexo y parentesco. Usted declara contar
        con la autorización de sus familiares (o ejercer su representación
        legal) para proporcionarnos estos datos.
      </p>

      <p>
        <span className="font-bold">c) Datos de salud y siniestros.</span>{' '}
        Información contenida en sus solicitudes de reembolso, cartas avales,
        claves de emergencia y reclamos: diagnósticos, informes médicos,
        récipes, presupuestos, facturas y demás documentos que usted decida
        adjuntar, así como los mensajes que intercambie con nuestro personal a
        través del chat de la aplicación. Estos datos se consideran sensibles y
        reciben protección reforzada (ver sección 5).
      </p>

      <p>
        <span className="font-bold">d) Datos de ubicación.</span> Únicamente
        cuando usted utiliza la función de emergencia y autoriza expresamente el
        acceso a su ubicación, para indicar a qué centro de salud se dirige. La
        aplicación no rastrea su ubicación en segundo plano.
      </p>

      <p>
        <span className="font-bold">e) Fotografías y archivos.</span> Las
        imágenes y documentos que usted adjunta voluntariamente (por ejemplo,
        facturas para un reembolso), capturados con su cámara o seleccionados de
        su galería, con su autorización.
      </p>

      <p>
        <span className="font-bold">f) Datos técnicos y de seguridad.</span>{' '}
        Registros de acceso, identificador del dispositivo y eventos de sesión,
        utilizados para proteger su cuenta y mantener la trazabilidad exigida
        por la regulación.
      </p>

      <p>
        La aplicación móvil no utiliza cookies. El uso de cookies en nuestro
        sitio web se rige por la{' '}
        <Link to="/cookies" className="text-primary hover:text-purple">
          Política de Cookies
        </Link>
        .
      </p>

      <h2 className="font-bold text-xl">3. Para qué usamos sus datos</h2>

      <ul className="list-disc pl-6 space-y-1">
        <li>
          Gestionar su afiliación y la activación de su cuenta (solo pueden
          registrarse personas previamente incorporadas por FFC o su empleador);
        </li>
        <li>
          Tramitar ante las compañías de seguros sus solicitudes: claves de
          emergencia, cartas avales, reembolsos y reclamos, y mantenerle
          informado del estado de cada una;
        </li>
        <li>Mostrarle su información de pólizas, coberturas y consumo;</li>
        <li>
          Enviarle notificaciones operativas (códigos de recuperación de
          contraseña, cambios de estado de sus solicitudes, recordatorios de
          vencimiento de pólizas);
        </li>
        <li>
          Prestarle asistencia a través de nuestro centro de ayuda y del
          asistente virtual;
        </li>
        <li>
          Cumplir las obligaciones legales y regulatorias de FFC como sociedad
          de corretaje (incluyendo las normas de SUDEASEG y la normativa de
          prevención de legitimación de capitales);
        </li>
        <li>Mejorar la seguridad y el funcionamiento de nuestros servicios.</li>
      </ul>

      <p>
        No utilizamos sus datos para publicidad de terceros ni los vendemos a
        terceros bajo ninguna circunstancia.
      </p>

      <h2 className="font-bold text-xl">4. Con quién compartimos sus datos</h2>

      <p>
        Compartimos sus datos únicamente en la medida necesaria para prestar el
        servicio:
      </p>

      <p>
        <span className="font-bold">a) Compañías de seguros.</span> Para la
        emisión y gestión de pólizas y la tramitación de claves, cartas avales,
        reembolsos y reclamos. Las pólizas ofrecidas a través de FFC están
        suscritas por compañías de seguros debidamente autorizadas por SUDEASEG
        para operar en Venezuela. La identificación de las compañías aliadas
        vigentes está disponible en la aplicación y en nuestros canales
        oficiales, y será actualizada oportunamente cuando las alianzas
        comerciales cambien.
      </p>

      <p>
        <span className="font-bold">b) Centros de salud.</span> Los códigos de
        autorización (claves de emergencia y cartas avales) son gestionados con
        las clínicas donde usted recibe atención, como parte del servicio.
      </p>

      <p>
        <span className="font-bold">
          c) Proveedores de servicios tecnológicos.
        </span>{' '}
        Empresas que nos prestan servicios técnicos necesarios para operar la
        plataforma, bajo obligaciones de confidencialidad y únicamente en la
        medida indispensable: proveedores de infraestructura y almacenamiento en
        la nube, servicios de envío de correos electrónicos transaccionales, y
        proveedores de tecnología de inteligencia artificial que procesan
        exclusivamente las consultas que usted dirige voluntariamente al
        asistente virtual del centro de ayuda. Las conversaciones con el
        asistente no deben usarse para enviar información médica detallada; para
        gestiones formales utilice los módulos de la aplicación.
      </p>

      <p>
        <span className="font-bold">d) Autoridades.</span> Cuando una obligación
        legal o un requerimiento de autoridad competente así lo exija (por
        ejemplo, SUDEASEG).
      </p>

      <p>
        <span className="font-bold">
          e) Transferencia internacional de datos.
        </span>{' '}
        Nuestros proveedores de infraestructura tecnológica operan centros de
        datos ubicados fuera de Venezuela (principalmente en los Estados Unidos
        de América), por lo que sus datos personales pueden ser almacenados y
        procesados en dichas jurisdicciones. En todos los casos, los datos
        viajan y se almacenan cifrados conforme a la sección 5, y exigimos a
        nuestros proveedores obligaciones de confidencialidad y seguridad. Al
        aceptar esta política, usted consiente esta transferencia con las
        salvaguardas descritas.
      </p>

      <h2 className="font-bold text-xl">5. Cómo protegemos sus datos</h2>

      <ul className="list-disc pl-6 space-y-1">
        <li>
          Toda la comunicación entre su dispositivo y nuestros servidores viaja
          cifrada (TLS/HTTPS);
        </li>
        <li>
          Sus documentos médicos, mensajes de chat y datos de identificación
          sensibles se almacenan{' '}
          <span className="font-bold">cifrados a nivel de aplicación</span>{' '}
          mediante esquemas de cifrado por usuario, de forma que permanecen
          protegidos incluso frente al proveedor de almacenamiento;
        </li>
        <li>
          Su sesión se protege con credenciales cifradas almacenadas en el
          enclave seguro de su dispositivo;
        </li>
        <li>
          El acceso de nuestro personal está limitado por roles, se verifica en
          cada operación y queda registrado en bitácoras de auditoría;
        </li>
        <li>
          Las contraseñas se almacenan con algoritmos de hash robustos y nunca
          en texto plano.
        </li>
      </ul>

      <h2 className="font-bold text-xl">
        6. Cuánto tiempo conservamos sus datos
      </h2>

      <p>
        Conservamos sus datos mientras exista la relación de intermediación y,
        posteriormente, durante los plazos exigidos por la normativa venezolana
        aplicable a la actividad aseguradora y a la prevención de legitimación
        de capitales. El historial de pólizas, siniestros y solicitudes se
        conserva por obligación regulatoria incluso después de la baja de su
        cuenta.
      </p>

      <h2 className="font-bold text-xl">7. Sus derechos</h2>

      <p>Usted puede, en cualquier momento:</p>

      <ul className="list-disc pl-6 space-y-1">
        <li>
          <span className="font-bold">Acceder</span> a sus datos a través de la
          aplicación;
        </li>
        <li>
          <span className="font-bold">Corregir</span> sus datos de contacto
          directamente en la aplicación (correo electrónico) o solicitando la
          corrección a FFC como su corredor;
        </li>
        <li>
          <span className="font-bold">Solicitar la baja</span> de su cuenta
          desde la propia aplicación (Cuenta → Solicitar la baja). Al hacerlo,
          perderá el acceso de inmediato y FFC procesará la baja definitiva,
          conservando únicamente la información cuya retención exige la ley;
        </li>
        <li>
          <span className="font-bold">Revocar los permisos</span> de cámara,
          galería y ubicación desde la configuración de su dispositivo,
          entendiendo que ello puede limitar funciones de la aplicación;
        </li>
        <li>
          <span className="font-bold">Plantear cualquier consulta o reclamo</span>{' '}
          sobre el tratamiento de sus datos escribiendo a{' '}
          <a
            href="mailto:ffconsultantsve@outlook.com"
            className="text-primary hover:text-purple"
          >
            ffconsultantsve@outlook.com
          </a>
          .
        </li>
      </ul>

      <h2 className="font-bold text-xl">8. Menores de edad</h2>

      <p>
        La aplicación está dirigida a titulares de pólizas mayores de edad. Los
        datos de menores solo se tratan cuando forman parte de una póliza como
        familiares cubiertos, proporcionados por su representante.
      </p>

      <h2 className="font-bold text-xl">9. Cambios a esta política</h2>

      <p>
        Podemos actualizar esta política para reflejar cambios en nuestros
        servicios o en la normativa. Publicaremos la versión vigente en esta
        misma dirección, indicando su fecha de actualización, y le informaremos
        por los canales de la aplicación cuando los cambios sean significativos.
      </p>
    </div>
  )
}

export default Privacy
