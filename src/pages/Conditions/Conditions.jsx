import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Conditions() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <div className=" md:m-auto mb-5 mx-5 md:mt-[5rem] max-w-[800px] pt-7 lg:mt-[6rem] space-y-2">
      <Helmet>
        <title>Términos y Condiciones</title>
        <meta name="title" content="Términos y Condiciones" />
        <meta
          name="description"
          content="Información de nuestras Términos y Condiciones."
        />
      </Helmet>
      <h1 className="my-5 text-center text-3xl font-bold">
        Términos y Condiciones
      </h1>

      <p>
        Los presentes Términos y Condiciones contienen los acuerdos y
        condiciones de uso que regulan la utilización de la página web{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        y cuyo titular es{' '}
        <span className="font-bold">
          FUTURE FINANCIAL CONSULTANTS, C.A. (referida también como FFC),
        </span>{' '}
        inscrita en el Registro Mercantil Primero del Distrito Capital en el año
        1997, domiciliada en Caracas, Venezuela (Expediente 491019). En
        adelante, cualquier referencia en la página web señalada a Términos y
        Condiciones, se refiere al contenido del presente documento.
      </p>

      <p>
        Lea atentamente el presente documento antes de acceder y utilizar la
        página web{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        . Al acceder y utilizarla, usted expresa su reconocimiento y aceptación
        de los siguientes Términos y Condiciones de uso.
      </p>

      <p>
        El acceso y uso de la página web proporciona al Usuario acceso a
        información diversa sobre los distintos servicios, pólizas y demás
        productos ofrecidos por el sector asegurador venezolano autorizado por
        la Superintendencia de la Actividad Aseguradora, en lo adelante,
        SUDEASEG, así como diversos planes de atención en salud ofrecidos por
        prestadores de salud autorizados por el Ministerio del Poder Popular
        para la Salud. Igualmente, ofrece la posibilidad de contratarlos y
        gestionar el cumplimiento de las obligaciones de las partes durante la
        vida de los contratos, de forma 100% digital (página web, WhatsApp
        Business y otros), de forma confiable y segura; con la asesoría e
        intermediación del departamento dirigido por nuestro Corredor de Seguros
        Oliver Sierra Nº 4171 (Corredor de Seguros Autorizado), según
        autorización emanada de la SUDEASEG.
      </p>

      <h2 className="font-bold text-xl">1. Creación del Usuario</h2>

      <p>
        El Usuario podrá registrarse para acceder a la página web, mediante la
        creación de un usuario y contraseña. Al registrarse y crear una
        contraseña, el Usuario será responsable de hacer un uso diligente de
        dicha contraseña. El Usuario se compromete a hacer un uso adecuado de
        los contenidos y servicios ofrecidos en la página web{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        , obligándose a no utilizarlas para, incluyendo pero sin limitarse a: (i)
        participar en actividades ilegales o contrarias a la buena fe y al orden
        público; (ii) utilizar la plataforma digital o los servicios ofrecidos
        por FFC, para realizar actividades tipificadas como legitimación de
        capitales o lavado de activos conforme a la legislación venezolana o
        internacional; (iii) difundir contenidos o propaganda de carácter
        racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o
        atentatorio contra los derechos humanos; (iv) provocar daños en los
        sistemas físicos y lógicos de{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        , de sus proveedores o de terceras personas, (v) introducir o difundir
        virus informáticos u otro tipo de daños en los mencionados sistemas;
        (vi) intentar acceder y, en su caso, utilizar las cuentas de otros
        usuarios y modificar o manipular sus mensajes; (vii) utilizar la
        plataforma digital de FFC a partir de la creación de usuarios falsos o
        de cualquier otra manera; para realizar fraudes electrónicos). <br />
        En particular, el Usuario tendrá las siguientes obligaciones:
      </p>

      <p>
        <span className="font-bold">a.</span> No ingresar a la página web
        códigos maliciosos de ningún tipo.
      </p>

      <p>
        <span className="font-bold">b.</span> No utilizar la página web para
        actos ilícitos, engañosos, malintencionados, fraudulentos, de lavado de
        activos o discriminatorios.
      </p>

      <p>
        <span className="font-bold">c.</span> No realizar ninguna acción que
        pudiera inhabilitar, sobrecargar o afectar al funcionamiento correcto de
        la página web o a su aspecto.
      </p>

      <p>
        <span className="font-bold">d.</span> No proporcionar datos falsos. El
        Usuario entiende y, al acceder a la página, autoriza a FFC a entregar la
        información personal suministrada a las empresas de seguros cuyos
        servicios se estén cotizando o contratando, y la misma servirá de base
        para la eventual contratación de las pólizas o contrato de medicina
        prepagada. En caso de dudas, acerca de la información que le es
        requerida, podrá contactar a nuestro Corredor de Seguros Autorizado,
        mediante los distintos canales de soporte al usuario (Como por ejemplo,
        WhatsApp Business, correo electrónico, o cualquier otro software de
        comunicación digital que esté disponible, contacto directo vía
        telefónica).
      </p>

      <p>
        <span className="font-bold">e.</span> No publicar contenido, ni realizar
        ninguna acción en la página web, que infrinja o vulnere los derechos de
        terceros o que vulnere cualquier normativa legal de algún modo.
      </p>

      <p>
        <span className="font-bold">f.</span> No utilizar las marcas, signos
        distintivos, nombres comerciales, derechos de autor, o cualquier otro
        derecho de propiedad intelectual o industrial, copyrigth y demás
        derechos reservados, salvo previo consentimiento por escrito de FFC.
      </p>

      <h2 className="font-bold text-xl">
        2. Posibilidad de cobro de los servicios
      </h2>

      <p>
        Nuestro servicio es totalmente gratuito en esta primera fase (V-1.0) y
        está orientado a la intermediación de pólizas de seguro y medicina
        prepagada autorizadas y emitidas por empresas de seguros venezolanas, así
        como planes de atención en salud, en un ambiente 100% digital; pero
        podrá establecerse en el futuro un cobro por suscripción a la página web{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        , la cual será oportunamente informada de forma transparente a los
        Usuarios, a través de la propia página web.
      </p>

      <h2 className="font-bold text-xl">
        3. Política de Privacidad y Uso de Datos Personales
      </h2>

      <p>
        En FFC respetamos los derechos de privacidad y reconocemos la
        importancia de proteger la información personal. Para ello, queremos
        informarle sobre nuestra{' '}
        <span className="font-bold">
          Política de Privacidad y de Uso de Datos Personales:
        </span>
      </p>

      <p>
        La Política de privacidad le proporciona información sobre la
        recopilación y el uso de la Información Personal que nos proporciona
        cuando navega por nuestra página Web o App-móvil.
      </p>

      <p>
        Para la creación de la cuenta, el usuario deberá suministrar algunos
        datos, los cuales serán almacenados a través de la página web de nuestra
        propiedad{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        .
      </p>

      <p>
        Se informa a los posibles Usuarios que este portal está diseñado y sólo
        está permitido para el uso de aquellas personas mayores de 18 años; en
        consecuencia, la aceptación de las presentes condiciones legales
        implicará la declaración del Usuario de que es mayor de 18 años. En caso
        de suscribir a algún familiar, deberán obtener el consentimiento del
        mismo bajo su responsabilidad. Para el caso de los menores de edad, sólo
        podrán inscribirlos las personas que tengan la patria potestad sobre
        ellos.
      </p>

      <p>
        Usted es responsable de la veracidad de la información suministrada en
        el Formulario de Información Personal, y si los datos no son suyos o el
        titular no conoce o aprueba el contenido de esta página, no somos
        responsables de las condiciones y términos del contrato de seguro que
        suscriba con el asegurador o plan de atención en salud que  contrate con
        el prestador de servicios de salud, o cualquier Producto de los
        ofrecidos en la pagina web; ni de problemas o quejas que puedan surgir
        en su relación con el mismo. Las páginas web con las que puede conectar
        desde la nuestra, son propiedad y están gestionadas por entidades ajenas
        a nosotros, por tal motivo, no somos responsables de su funcionamiento,
        contenido, ni de productos o servicios obtenidos de ellas directamente o
        a través de éstas.
      </p>

      <p>
        No nos hacemos responsables de eventuales daños que sean responsabilidad
        del cliente por manipular o usar esta página web de forma indebida.
      </p>

      <p>
        La presente política de privacidad fue creada para ayudarle a entender
        cómo se recopila y almacena su información.
      </p>

      <p className="font-bold ">a. ¿Qué Información Personal recopila FFC?</p>

      <p>
        FFC recopila la información suministrada por el Usuario al momento de
        crear una cuenta en la página web o App-móvil, que es necesaria para
        obtener el registro, tales como: nombre, apellido, fecha de nacimiento y
        dirección de correo electrónico.
      </p>

      <p>
        En caso de cotización o contratación de los productos de seguros de
        salud, medicina prepagada o planes de servicios ofrecidos por
        prestadores de servicio de atención en salud (en adelante Los
        Productos); FFC recopila información de datos personales sensibles tales
        como datos de salud e identificación de las personas físicas. Los datos
        sensibles serán utilizados con el objeto de la elegibilidad e
        identificación de la persona en cuestión para la contratación de Los
        Productos.
      </p>

      <p>
        Cuando el Usuario visita nuestra página web, recopilamos información de
        registro estándar y, a través de cookies, detalles de su comportamiento
        en línea, siempre que nos haya dado su consentimiento, ya sea al
        continuar navegando o al aceptar explícitamente el uso de cookies.
        Usaremos estos datos para analizar y mejorar la experiencia de
        navegación de los usuarios. Puede acceder a nuestra Política de Cookies,
        más abajo. En este sentido, se recomienda revisar estos términos
        periódicamente.
      </p>

      <p>
        En caso de contratación de alguno de Los Productos, respecto a los
        medios de pago, FFC no almacena datos confidenciales ya que se hace a
        través de proveedores externos de plataformas de pagos autorizadas en
        Venezuela (ejm., zelle, zinlii, paypal, instituciones bancarias).
      </p>

      <p className="font-bold">b. ¿Cómo recopila información FFC?</p>

      <p>
        Los datos personales se recopilan mediante un formulario a través de la
        página web de FFC{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        . No se recopilará ningún dato hasta que no se acepte expresamente la
        Política de Privacidad dando click en la casilla correspondiente.
      </p>

      <p>
        Los datos se almacenan en bases de datos SQL bajo sistema de servidores
        en EE. UU., bajo la licencia de Microsoft service en la nube (cloud services).{' '}
      </p>

      <p className="font-bold">c. ¿Por qué FFC almacena información?</p>

      <p>
        Almacenamos información para mejorar y optimizar nuestros procesos, con
        el fin de prestar un mejor servicio a nuestros Usuarios.
      </p>

      <p>
        En el caso de datos de salud, se almacenan por motivos de elegibilidad
        de Los Productos, y que las empresas de seguros, reaseguros, medicina
        prepagada o prestadores de servicios de atención en salud, puedan
        autorizar dicha contratación. Es importante revisar y validar la
        veracidad de la información suministrada en estos formularios, pues la
        misma constituye la base de contratación de Los Productos, teniendo
        efectos en las obligaciones de las partes.
      </p>

      <p className="font-bold">d. ¿Cuánto tiempo almacena información FFC?</p>

      <p>
        FFC almacena información durante la vigencia del registro activo en los
        servicios web de FFC, o de la vigencia de la contratación de Los
        Productos, en concordancia con los períodos establecidos en la normativa
        vigente para datos de salud.
      </p>

      <p className="font-bold">e. ¿Cómo protege su Información Personal FFC?</p>

      <p>
        Estamos comprometidos a proteger su Información Personal. Contamos con
        las medidas técnicas y organizativas adecuadas para proteger la
        Información Personal que nos proporciona contra el uso no autorizado o
        ilegal y contra la pérdida, daño o destrucción accidentales.
      </p>

      <p className="font-bold">
        f. ¿Quién tiene acceso a su Información Personal?
      </p>

      <p>
        FFC puede compartir su Información Personal en los siguientes casos:
      </p>

      <p>
        <span className="font-bold">i.</span> Para poder proveer nuestros
        productos y servicios contratados con nuestras entidades asociadas
        (empresas de seguros, reaseguros, medicina prepagada o prestadores de
        servicios de atención en salud);
      </p>

      <p>
        <span className="font-bold">ii.</span> Con fines publicitarios y de marketing;{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        podrá enviarle una actualización del presupuesto obtenido en función de
        la fecha de cotización, así como para la realización de estudios
        estadísticos, el envío de boletines informativos generalistas, ofertas
        y/o promociones comerciales adecuadas a su perfil particular y la
        categoría de Los Productos que haya comparado en la página web.
      </p>

      <p>
        <span className="font-bold">iii.</span> Con fines de cumplir con la
        normativa de Prevención y Legitimación de Capitales, al reportar
        actividades sospechosas.
      </p>

      <p>
        <span className="font-bold">iv.</span> Podemos compartir su Información
        Personal a cualquier agencia o entidad de aplicación de la ley,
        tribunal, regulador, autoridad gubernamental u otro tercero cuando sea
        necesario para cumplir con una obligación legal o reglamentaria, o de
        otro modo para proteger nuestros derechos o los derechos de cualquier
        tercero; y/o
      </p>

      <p>
        <span className="font-bold">v.</span> Podemos compartir su información
        con nuestras empresas relacionadas actuales o futuras, subsidiarias,
        empresas conjuntas u otras empresas afiliadas, en cuyo caso
        solicitaremos a las mismas que respeten la presente Política de
        Privacidad. Si se vende nuestro negocio de conformidad con la ley,
        podremos compartir su Información Personal con el comprador.
      </p>

      <p className="font-bold">
        g. Derechos del Usuario respecto de su información personal:
      </p>

      <p>Para poder procesar sus datos, en todo momento, tiene derecho a:</p>

      <p>
        <span className="font-bold">i.</span> Saber si sus datos personales están
        siendo tratados y, en su caso, acceder a ellos;
      </p>

      <p>
        <span className="font-bold">ii.</span> Rectificar sus datos personales si
        fueran inexactos o incompletos;
      </p>

      <p>
        <span className="font-bold">iii.</span> Solicitar la eliminación de sus
        datos si no son necesarios para los fines indicados;
      </p>

      <p>
        <span className="font-bold">iv.</span> Exigir que se delimite el
        procesamiento de sus datos personales;
      </p>

      <p>
        <span className="font-bold">v.</span> Darse de baja del servicio y
        transferir sus datos personales a otro proveedor de su elección
        (portabilidad). En cualquier momento los Usuarios podrán darse de baja
        de los servicios de la presente página web, sin cargo alguno; y
      </p>

      <p>
        <span className="font-bold">vi.</span> Oponerse al tratamiento de sus
        datos personales en cualquier momento.
      </p>

      <p>
        Para darse de baja y/o transferir sus datos a otro prestador de
        servicios de los definidos en este documento, el Usuario deberá enviar
        una solicitud acompañada de un documento de identidad a{' '}
        <a
          href="mailto:ffconsultantsve@outlook.com"
          className="text-primary hover:text-purple"
        >
          ffconsultantsve@outlook.com
        </a>{' '}
        o solución digital que se ponga a su disposición en la página, con este
        fin. Quedan a salvo las previsiones legales en cuanto al cambio de
        intermediario de seguros, respecto a la vigencia de los contratos y el
        cobro de las comisiones correspondientes, cuando resultaren aplicables.
      </p>

      <h2 className="font-bold text-xl">
        4. Nuestros servicios. ¿Qué puede hacer en nuestra página web?
      </h2>

      <p>
        Los servicios de FFC han sido diseñados pensando en la necesidad del
        público en general, así como en personas
        jurídicas -principalmente pequeñas y medianas empresas- domiciliadas en
        Venezuela; que buscan la mejor opción de pólizas de seguro, medicina
        prepagada o servicios de asistencia en salud ofrecidos por prestadores
        de servicios; para sí mismos, sus familiares o sus empleados; donde las
        plataformas digitales tienen la potencialidad de ofrecer información
        segura y confiable, así como transacciones de contratación y pago, sobre
        los nuevos productos diseñados por las empresas de seguros, medicina
        prepagada, o prestadores de servicios de salud primaria o de emergencia,
        para este segmento generacional, haciendo cada vez más accesibles los
        mismos, lo que implica, la posibilidad de ampliar las coberturas de
        seguros y prestación de servicios de salud en la población venezolana, a
        más bajo costo, con transacciones 100% digitales, que hacen más
        eficiente el proceso y más accesibles estos servicios fundamentales para
        los Usuarios.
      </p>

      <p>
        Para contribuir al logro de ese objetivo, una vez haya accesado a la
        página{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        el Usuario podrá:
      </p>

      <p>
        <span className="font-bold">a.</span> Consultar sobre productos y
        servicios disponibles en materia de salud en el mercado venezolano,
        ofrecidos por empresas de seguros, reaseguros, medicina prepagada o
        directamante por prestadores de servicios de salud, legalmente
        autorizados para actuar como tales en Venezuela.
      </p>

      <p>
        <span className="font-bold">b.</span> Realizar cotizaciones de precio.
        Una vez leído los presentes “Términos y Condiciones”, incluyendo los
        apartados de “Aviso Legal”, “Política de Privacidad” y “Política de
        Cookies”; habiendo aceptado los mismos con la suscripción y acceso a la
        página y/o marcando la casilla de autorización correspondiente;
        seguidamente podrá llenar el Formulario de Información Personal (para
        personas naturales o jurídicas) para obtener una cotización comparativa
        e información sobre los seguros o servicios que desee.
      </p>

      <p>
        En caso de dudas, acerca de la información que le es requerida, podrá
        contactar a nuestro Corredor de Seguros Autorizado, mediante los
        distintos canales de soporte al usuario que ponemos a su disposición
        (Como por ejemplo, WhatsApp Business, correo electrónico, o cualquier
        otro software de comunicación digital que esté disponible en el futuro, o
        contacto directo via telefónica).
      </p>

      <p>
        <span className="font-bold">c.</span> Contratar los servicios o pólizas
        de su preferencia, en un ambiente 100% digital, de conformidad con la
        Legislación Venezolana en la materia, con la asesoría debida del
        Corredor de Seguros Autorizado. Una vez completado el cuestionario,
        revisado para evitar errores y aceptado por usted, se le presentará la
        comparativa de las cotizaciones. Igualmente recibirá un correo
        electrónico con la comparativa. Podrá hacer modificaciones en línea.
      </p>

      <p>
        <span className="font-bold">d.</span> Realizar pagos a través de medios
        electrónicos previstos y autorizados por el sistema bancario nacional
        (plataformas externas a nuestra página) obteniendo para ello los recibos
        correspondientes directamente de las empresas de seguros, reaseguros,
        medicina prepagada o servicios de atención en salud, correspondientes,
        de conformidad con la legislación venezolana.
      </p>

      <p>
        <span className="font-bold">e.</span> Intercambiar información durante
        la vida del contrato para, facilitar o canalizar el cumplimiento de las
        obligaciones que asuma el Usuario con la empresa de seguros, reaseguros,
        medicina prepagada o servicios de asistencia en salud; así como también,
        exigir el cumplimiento de las obligaciones de la otra parte (empresas
        aliadas). Esta información podrá ser suministrata también directamante a
        las empresas oferentes mediante los enlaces a sus páginas o plataformas
        digitales autorizadas a ellas y según sus términos y condiciones,
        dejando a salvo los derechos adquiridos por la intermediación del
        Corredor de Seguros Autorizado, de ser el caso. FFC no asume ninguna
        responsabilidad por la información suministrada en oportunidad y
        contenido, que se realice directamente a través de las páginas de estas
        empresas, por lo que deberán leer sus propios términos y condiciones, y
        aceptarlos de ser el caso.
      </p>

      <p>
        <span className="font-bold">f.</span> Luego de recibir sus instrucciones
        escritas vía correo electrónico al ffconsultantsve@outlook.com o a
        través de los enlaces correspondientes que se pongan a disposición del
        Usuario en la página; nos encargaremos de seguir el cumplimiento. Los
        Productos que decida contratar, manteniéndole informado en todo momento,
        sobre el desarrollo de las negociaciones y de cualquier eventualidad que
        pudiera surgir para realizar la contratación efectiva del Producto que
        requiere, o la cobertura de algún evento o canalización de orden de
        servicio, según corresponda; de forma 100% digital. Siempre y cuando se
        mantenga solvente con los prestadores de servicios de salud, o empresas
        de seguro, reaseguro o medicina prepagada que haya elegido, tomaremos
        todas las acciones razonables para estructurar los planes o programas
        derivados de Los Productos, según la disposición de los aseguradores o
        prestadores de servicios de salud, en los documentos legales
        establecidos al efecto (pólizas, condicionados generales, anexos o
        modificaciones de contratos de seguro, reaseguro, medicina prepagada, o
        contratos de planes de salud ofrecidos por los prestadores de servicios
        de atención en salud autorizados) antes de la fecha de inicio de la
        vigencia, renovación o extensión de cobertura o plan de salud (según sea
        el caso, conforme a Los Productos escogidos) y durante la vida de los
        mismos.
      </p>

      <p>
        Los usuarios podrán entonces, gestionar sus contratos de pólizas y de
        planes de atención en salud, de forma rápida, fácil y segura, sin
        papeleos ni complicaciones, a través de un ambiente 100% digital. Dando
        aviso de forma inmediata y oportuna por los canales digitales que
        ponemos a disposición del Usuario, de la ocurrencia de algún evento o la
        necesidad de una orden de servicio para los planes de salud, se activará
        y dará inicio a la atención del mismo pudiendo hacer seguimiento y
        acompañamiento digital en cada paso. Solo a manera de ejemplo, podrá
        avisar vía Whatsapp Business, que le ha ocurrido un evento amparado por
        Los Productos, o que requiere de una consulta médica de su plan de
        salud, en caso del Producto de atención en salud contratado; y FFC
        además de informar a su requerimiento, a la empresa respectiva; estará
        atenta a la emisión de la clave u orden de servicio; así como a la
        confirmación del usuario de que que está siendo atendido, y si existiera
        algún inconveniente o falta de información en este proceso; FFC podrá
        intervenir, para facilitar la información a cualquiera de las partes,
        para que el servicio sea prestado oportuna y efectivamante; todo,
        gestionado digitalmente.
      </p>

      <p>
        Es importante que revise todos los documentos que le suministremos como
        garantía de las pólizas contratadas, coberturas de seguros solicitadas o
        planes de atención en salud adquiridos; para ratificar que reflejen con
        precisión las condiciones, cláusulas, amparos y coberturas contratadas,
        límites, deducibles y demás términos y condiciones de los referidos
        contratos. Cuando se trate de contratos de seguros, reaseguros y
        medicina prepagada, le recomendamos hacer énfasis en las condiciones y
        garantías de todas las pólizas, ya que el no cumplirlas pudiera anular
        su cobertura. Además, lea detenidamente las disposiciones referidas a
        los plazos para la notificación de siniestros y presentación de
        documentos. En caso de discrepancias o dudas al respecto, es necesario
        que nos consulte inmediatamente a través de los canales de soporte
        puestos a su disposición.
      </p>

      <h2 className="font-bold text-xl">5. Política de seguridad</h2>

      <p>
        En Future{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        nos tomamos muy en serio la seguridad de la información, utilizando
        todos los protocolos tipo{' '}
        <span className="text-primary">httpS-SSL-Microsoft-VM</span> de
        encriptación de datos, antes de ser transmitidos, para asegurar que toda
        su información, tanto los datos personales como los datos de salud y los
        de transacción, estén protegidos de accesos no autorizados o de un uso
        inapropiado. Como medida adicional de seguridad, nuestra web cuenta con
        todos los certificados de identificación digital, y otros tipo de
        servicios más avanzados para salvaguardar su privacidad. Además, en FFC
        seguiremos implementando nueva tecnología bajo un esquema de mejora
        contínua, para aumentar la seguridad y protección de datos, según estén
        disponibles.
      </p>

      <p>
        Seguridad en los portales de aseguradoras o empresas de Servicios de
        Atención en Salud: Si Usted accede a portales de internet a través de
        nuestros enlaces, le recomendamos que revise sus políticas de seguridad
        cuando las visites. No podemos responsabilizarnos de las políticas de
        privacidad y prácticas de otras páginas web.
      </p>

      <p>
        Esta web{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        , es una marca comercial perteneciente a Future Financial Consultants
        C.A., (Ver Aviso Legal – Términos y Condiciones), dados bajo licencia al
        Corredor de Seguros y Analista de Riesgo{' '}
        <strong>Oliver Sierra Tua</strong>, debidamente registrado ante la
        Superintendencia de la Actividad Aseguradora, bajo el código CS-No 4171.
      </p>

      <h2 className="font-bold text-xl">
        6. Politica de Prevención y Control de Legitimación de Capitales y
        Financiamiento al Terrorismo
      </h2>

      <p>
        La legitimación de capitales, es el proceso por el cual se intenta
        ocultar o disfrazar el origen ilícito del dinero obtenido por
        actividades criminales. En Venezuela este es un delito grave, que
        también se conoce como lavado o blanqueo de dinero o activos. Como parte
        de nuestro compromiso y política de estricto cumplimiento a la Ley, FFC
        se trabaja para detectar operaciones o transacciones sospechosas que no
        tengan una justificación lógica y legal, las cuales serán reportadas
        -pudiendo utilizar la información suministrada por el Usuario, conforme
        a lo señalado en la Politica de Privacidad y Uso de Datos; siguiendo
        para ello las normas y procedimientos online puestos a disposición por
        la Superintendencia de la Actividad Aseguradora, para Reportar
        Actividades Sospechosas del Sector Seguros. Este formulario permite
        registrar la información detallada sobre las personas naturales o
        jurídicas involucradas en dichas operaciones. Las personas naturales y
        jurídicas del Sector Asegurador deben cumplir con las normas y pautas
        establecidas por los organismos reguladores para prevenir y controlar
        estos delitos. Esto implica adoptar medidas adecuadas y suficientes para
        evitar que se usen los servicios o productos del sector asegurador como
        medios para esconder, manejar, invertir o beneficiarse del dinero u
        otros bienes provenientes de actividades ilícitas, o para darles una
        apariencia legal.
      </p>

      <p>
        El Usuario debe tener en cuenta que el incumplimiento de las normas
        puede tener consecuencias legales.
      </p>

      <h2 className="font-bold text-xl">7. Política anti-spam</h2>

      <p>
        Para que podamos enviarle los resultados de la búsqueda que ha realizado
        para encontrar Los Productos que mejor se ajusten a sus necesidades,
        haremos uso de la dirección de correo electrónico que nos suministra al
        registrarse en la página web{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        . Su dirección de e-mail e información de contacto, serán utilizadas
        únicamente por nosotros, como viene indicado en nuestra Política de
        Privacidad y Uso de Datos Personales, y por la compañía que usted
        seleccione para contratar su póliza, contrato de medicina prepagada o
        plan de atención en salud.
      </p>

      <p>
        También disponemos de acuerdos con los proveedores, intermediarios y
        representantes, cuyas páginas visitamos utilizando nuestra tecnología,
        para prevenir el envío de comunicaciones por e-mail fuera de estos
        términos.
      </p>

      <p>
        Con el objeto de evitar e-mails innecesarios o intrusivos, por favor
        comuníquenos si tiene algún problema con el envío de este tipo de
        correos a{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        .
      </p>

      <h2 className="font-bold text-xl">8. Propiedad intelectual®</h2>

      <p>
        Todos los logos, lemas, marcas comerciales y nombres de dominio de la
        presente página web:{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        , son de propiedad intelectual o industrial de FFC, que ejerce tales
        derechos reservados, sobre cualquier información, contenido, datos o
        procesos contenidos en que sean subyacentes a esta web o al servicio que
        prestamos y pertenecen por tanto a Future Financial Consultants, C.A., o
        FFC. Todos los logos, lemas, marcas comerciales y nombres de dominio y
        todos los derechos de propiedad intelectual relacionados a las entidades
        aseguradoras, reaseguradoras, de medicina prepagada o de prestadores de
        atención en salud, y demás sociedades cuyos sitios web contactamos para
        prestar el servicio, pertenecen a esas sociedades y no se pueden copiar,
        reproducirse, difundirse o en cualquier forma usarse, sin su
        consentimiento previo.
      </p>

      <h2 className="font-bold text-xl">9. Copy-right©</h2>

      <p>
        El copyright del material contenido en esta web pertenece a Future
        Financial Consultants, C.A.; cualquier individuo actuando como persona
        privada puede imprimir una copia de cualquier parte de este material
        para su propio uso personal, sujeto a las siguientes condiciones:
      </p>

      <p>a. El material no puede ser usado para propósitos comerciales.</p>

      <p>
        b. La copia debe retener cualquier copyright u otros avisos contenidos
        en el material original.
      </p>

      <p>
        c. La tecnología y procesos utilizados o descritos en este sitio web
        pueden estar sujetos a otros derechos de propiedad intelectual
        reservados por{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
        (Licencias y otras formas legales de uso de derechos reservados).
      </p>

      <h2 className="font-bold text-xl">
        10. Idioma, legislación y jurisdicción
      </h2>

      <p>
        Los presentes Términos y Condiciones, Política de Privacidad y Uso de
        Datos Personales; Aviso Legal; Política Anti-Spam, Política sobre
        Cookies, Política de Seguridad y Política sobre Prevención y Control de
        Legitimación de Capitales y Financiamiento al Terrorismo; así como
        cualquier relación entre usted, como Usuario, y la página web de FFC
        incluida su App-móvil, se cumplirán en idioma español y se regirán por
        la legislación de la República Bolivariana de Venezuela.
      </p>

      <p>
        Ambas partes acuerdan que todas las reclamaciones y controversias que
        surjan entre las partes derivadas de los documentos antes mencionados,
        serán resueltas por los Tribunales de la República Bolivariana de
        Venezuela, ubicados en la ciudad de Caracas, con renuncia expresa a
        cualquier otro fuero aplicable.
      </p>

      <h2 className="font-bold text-xl">11. Enmiendas</h2>

      <p>
        FFC se reserva el derecho de introducir cambios en la página web, en los
        presentes Términos y Condiciones; Política de Privacidad y Uso de Datos
        Personales; Aviso Legal; Política Anti-Spam, Política sobre Cookies,
        Política de Seguridad y Política sobre Prevención y Control de
        Legitimación de Capitales y Financiamiento al Terrorismo, en cualquier
        momento, sin previo aviso, de conformidad con la legislación vigente,
        notificando oportunamente a los Usuarios de dichos cambios. En este
        sentido, se recomienda revisar estos Términos y Condiciones,
        periódicamente.
      </p>

      <p>
        Para más información sobre la página web podrá acceder a{' '}
        <Link to="/" className="text-primary hover:text-purple">
          www.futurefinancialconsultantsve.com
        </Link>{' '}
      </p>
    </div>
  )
}

export default Conditions
