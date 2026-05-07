/**
 * BASE DE CONOCIMIENTO DEL CHATBOT - FFC CONSULTANTS
 * 
 * Este archivo contiene toda la información que el chatbot puede usar para responder.
 * Puedes editar este archivo para agregar:
 * - Condicionados de pólizas
 * - Requisitos de emisión
 * - Información de coberturas
 * - FAQs
 * - Cualquier información que quieras que el chatbot conozca
 */

export const COMPANY_INFO = {
  nombre: 'Future Financial Consultants (FFC)',
  slogan: 'La primera Insurtech de Venezuela',
  telefono: '+58 412-971-3806',
  email: 'ffconsultantsve@outlook.com',
  whatsapp: '+58 412-971-3806',
  instagram: '@ffc_seguros',
  horario: 'Atención 24/7 por chatbot, asesores en horario laboral (8am-6pm)',
}

export const ASEGURADORAS = {
  piramide: {
    nombre: 'Seguros Pirámide',
    emoji: '🔺',
    descripcion: 'Amplia trayectoria en el mercado venezolano con variedad de coberturas',
  },
  oceanica: {
    nombre: 'Seguros Oceánica',
    emoji: '🌊',
    descripcion: 'Precios competitivos y excelente servicio al cliente',
  },
  real: {
    nombre: 'Real Seguros',
    emoji: '✅',
    descripcion: 'Soluciones de protección accesibles y confiables con tecnología moderna',
  },
  caracas: {
    nombre: 'Seguros Caracas',
    emoji: '🦁',
    descripcion: 'Una de las aseguradoras más reconocidas de Venezuela con amplia trayectoria',
  },
  estar: {
    nombre: 'Estar Seguros',
    emoji: '🛡️',
    descripcion: 'Compañía aseguradora venezolana con más de 75 años en el mercado',
  },
}

// ==========================================
// PRODUCTOS Y COBERTURAS
// ==========================================

export const PRODUCTOS = {
  auto: {
    nombre: 'Seguro de Automóvil',
    emoji: '🚗',
    descripcion: 'Protege tu vehículo contra accidentes, robo y responsabilidad civil',
    precioDesde: '$36-37/mes aproximadamente',
    
    coberturas: {
      piramide: [
        { nombre: 'Cobertura Amplia', descripcion: 'Todo riesgo - la más completa' },
        { nombre: 'Pérdida Total', descripcion: 'Cubre robo y pérdida total del vehículo' },
        { nombre: 'RCV Básica Placa Nacional', descripcion: 'Responsabilidad civil para vehículos con placa venezolana' },
        { nombre: 'RCV Básica Placa Extranjera', descripcion: 'Para vehículos con placa extranjera' },
        { nombre: 'RCV Básica Taxi', descripcion: 'Para vehículos de servicio de taxi' },
        { nombre: 'RCV Internacional Colombia-Venezuela', descripcion: 'Cobertura para viajes entre Colombia y Venezuela' },
        { nombre: 'RCV Exceso $5.000 + Grúa', descripcion: 'Cobertura extendida con servicio de grúa incluido' },
      ],
      oceanica: [
        { nombre: 'Cobertura Amplia', descripcion: 'Todo riesgo completo' },
        { nombre: 'Pérdida Total', descripcion: 'Robo y pérdida total' },
        { nombre: 'RCV Básica', descripcion: 'Responsabilidad civil vehicular básica' },
        { nombre: 'RCV Exceso US$ 5.000', descripcion: 'Cobertura extendida hasta $5.000' },
        { nombre: 'RCV Exceso US$ 5.000 + Grúa', descripcion: 'Cobertura extendida con grúa' },
        { nombre: 'RCV Básica (TAXI)', descripcion: 'Para taxis' },
        { nombre: 'RCV Exceso US$ 5.000 (TAXI)', descripcion: 'Cobertura extendida para taxis' },
      ],
    },
  },

  vida: {
    nombre: 'Seguro de Vida',
    emoji: '❤️',
    descripcion: 'Protección financiera para tu familia',
    
    coberturas: {
      general: [
        { nombre: 'Vida Individual', descripcion: 'Protección por fallecimiento' },
        { nombre: 'Accidentes Personales', descripcion: 'Cobertura por accidentes' },
        { nombre: 'Servicios Funerarios', descripcion: 'Gastos funerarios cubiertos' },
        { nombre: 'Pago Único por Cáncer', descripcion: 'Suma asegurada al diagnóstico de cáncer' },
      ],
    },
  },

  salud: {
    nombre: 'Seguro de Salud (HCM)',
    emoji: '🏥',
    descripcion: 'Hospitalización, Cirugía y Maternidad',
    
    coberturas: {
      general: [
        { nombre: 'HCM US$ 50.000', descripcion: 'Plan básico de salud' },
        { nombre: 'HCM US$ 75.000', descripcion: 'Plan intermedio' },
        { nombre: 'HCM US$ 100.000', descripcion: 'Plan completo' },
        { nombre: 'HCM US$ 200.000', descripcion: 'Plan premium' },
        { nombre: 'Emergencias Médicas', descripcion: 'Atención de emergencias' },
        { nombre: 'Viajes', descripcion: 'Cobertura médica en viajes' },
        { nombre: 'Deportes Extremos (Oceánica)', descripcion: 'Para practicantes de deportes de riesgo' },
      ],
    },
  },

  hogar: {
    nombre: 'Seguro de Hogar/Patrimoniales',
    emoji: '🏠',
    descripcion: 'Protege tu casa y bienes',
    
    coberturas: {
      piramide: [
        { nombre: 'Pirámide Productiva Grupo A', descripcion: 'US$ 20.000 - 300.000' },
        { nombre: 'Pirámide Hogar', descripcion: 'Cobertura residencial completa' },
      ],
      oceanica: [
        { nombre: 'Oceánica Hogar', descripcion: 'US$ 20.000 - 300.000' },
      ],
    },
  },
}

// ==========================================
// REQUISITOS PARA EMISIÓN DE PÓLIZAS
// ==========================================

export const REQUISITOS_EMISION = {
  auto: {
    titulo: 'Requisitos para Seguro de Automóvil',
    documentos: [
      'Cédula de identidad del propietario (vigente)',
      'Carnet de circulación del vehículo',
      'Título de propiedad del vehículo',
      'Fotos del vehículo (4 ángulos: frente, trasera, laterales)',
      'Foto del serial de carrocería',
      'Foto del tablero (kilometraje visible)',
    ],
    datosRequeridos: [
      'Nombre completo del propietario',
      'Cédula de identidad',
      'Fecha de nacimiento',
      'Teléfono de contacto',
      'Email',
      'Dirección',
      'Marca del vehículo',
      'Modelo del vehículo',
      'Año del vehículo',
      'Placa',
      'Serial de carrocería',
      'Color',
      'Uso del vehículo (particular/comercial)',
    ],
    condiciones: [
      'Vehículo debe tener máximo 20 años de antigüedad para cobertura amplia',
      'Para pérdida total: máximo 25 años',
      'Debe estar en buen estado mecánico',
      'No debe tener modificaciones no declaradas',
    ],
  },

  vida: {
    titulo: 'Requisitos para Seguro de Vida',
    documentos: [
      'Cédula de identidad (vigente)',
      'Examen médico (según monto y edad)',
      'Declaración de salud',
    ],
    datosRequeridos: [
      'Nombre completo',
      'Cédula de identidad',
      'Fecha de nacimiento',
      'Teléfono',
      'Email',
      'Beneficiarios (nombre, cédula, parentesco, porcentaje)',
      'Ocupación',
      'Estado de salud actual',
    ],
    condiciones: [
      'Edad mínima: 18 años',
      'Edad máxima: varía según plan (consultar)',
      'Declaración de salud obligatoria',
      'Posible examen médico para sumas altas',
    ],
  },

  salud: {
    titulo: 'Requisitos para Seguro de Salud (HCM)',
    documentos: [
      'Cédula de identidad de todos los asegurados',
      'Partida de nacimiento (menores de edad)',
      'Acta de matrimonio (si aplica)',
      'Declaración de salud',
    ],
    datosRequeridos: [
      'Datos de todos los miembros a asegurar',
      'Historial médico',
      'Condiciones preexistentes',
      'Médico tratante actual (si tiene)',
    ],
    condiciones: [
      'Periodo de espera: 30 días para enfermedades',
      'Periodo de espera maternidad: 10 meses',
      'Preexistencias pueden tener exclusiones o recargos',
      'Edad máxima de ingreso: consultar según plan',
    ],
  },

  hogar: {
    titulo: 'Requisitos para Seguro de Hogar',
    documentos: [
      'Cédula del propietario',
      'Documento de propiedad del inmueble',
      'Fotos del inmueble (fachada e interiores)',
    ],
    datosRequeridos: [
      'Dirección completa del inmueble',
      'Tipo de construcción',
      'Año de construcción',
      'Metros cuadrados',
      'Valor estimado del inmueble',
      'Inventario de bienes a asegurar (opcional)',
    ],
    condiciones: [
      'Inmueble debe ser de uso residencial',
      'Debe estar habitado',
      'Inspección puede ser requerida para sumas altas',
    ],
  },
}

// ==========================================
// PREGUNTAS FRECUENTES (FAQs)
// ==========================================

export const FAQS = [
  {
    pregunta: '¿Cuánto tiempo toma recibir la póliza?',
    respuesta: '24-48 horas hábiles después de aprobada la solicitud y realizado el pago.',
  },
  {
    pregunta: '¿Qué métodos de pago aceptan?',
    respuesta: 'Transferencias bancarias, pago móvil, Zelle, pagos en divisas (efectivo).',
  },
  {
    pregunta: '¿Puedo cancelar mi póliza?',
    respuesta: 'Sí, puedes cancelar en cualquier momento. El proceso y posible reembolso depende de los términos de cada aseguradora.',
  },
  {
    pregunta: '¿Cómo hago un reclamo/siniestro?',
    respuesta: `Para hacer un reclamo:
1. Contacta a tu asesor o usa este chat
2. Ten a mano tu número de póliza
3. Describe el siniestro con fecha, lugar y detalles
4. Envía fotos y documentos de soporte
5. Un ajustador te contactará en menos de 24 horas`,
  },
  {
    pregunta: '¿Qué es el RCV?',
    respuesta: 'RCV significa Responsabilidad Civil Vehicular. Es una cobertura OBLIGATORIA por ley que protege a terceros (otras personas y sus bienes) en caso de que causes un accidente.',
  },
  {
    pregunta: '¿Qué cubre el HCM?',
    respuesta: 'HCM significa Hospitalización, Cirugía y Maternidad. Cubre gastos médicos por hospitalización, cirugías programadas y de emergencia, y atención de maternidad (con periodo de espera).',
  },
  {
    pregunta: '¿Qué son las preexistencias?',
    respuesta: 'Son condiciones médicas que ya tenías antes de contratar el seguro. Pueden estar excluidas de cobertura o tener un periodo de espera especial.',
  },
  {
    pregunta: '¿Cuál es el deducible?',
    respuesta: 'El deducible es la cantidad que pagas de tu bolsillo antes de que el seguro comience a cubrir. Varía según el plan y tipo de seguro.',
  },
  {
    pregunta: '¿Puedo asegurar un carro viejo?',
    respuesta: 'Sí, pero las opciones de cobertura varían según la antigüedad. Vehículos de hasta 20 años pueden tener cobertura amplia. Vehículos más antiguos generalmente solo califican para RCV.',
  },
  {
    pregunta: '¿El seguro cubre en todo el país?',
    respuesta: 'Sí, los seguros tienen cobertura nacional. Algunos planes de auto incluyen cobertura internacional (ej: RCV Internacional Colombia-Venezuela).',
  },
]

// ==========================================
// PROCESO DE COTIZACIÓN - DATOS A RECOLECTAR
// Basado en planillas oficiales de Seguros Caracas
// ==========================================

export const FLUJO_COTIZACION = {
  // ==========================================
  // SEGURO DE AUTO - SEGUROS CARACAS
  // ==========================================
  auto: {
    advertenciaInicial: '⏱️ Este proceso tomará aproximadamente **10 minutos**. Necesitaré algunos datos para generar tu cotización. ¿Estás listo para comenzar?',
    
    condicionesEspeciales: {
      autoUsado: '🔍 **Importante:** Como tu vehículo es usado, será necesario programar una **inspección física** del auto antes de emitir la póliza. Un inspector verificará el estado del vehículo. ¡No te preocupes, es un proceso rápido!',
      auto0km: '✨ **¡Excelente!** Al ser un vehículo 0km, no necesitas inspección previa. El proceso de emisión será más rápido.',
    },

    seccion1_tipoCobertura: {
      titulo: 'Tipo de Cobertura',
      campos: [
        { campo: 'tipoPlan', pregunta: '¿Qué tipo de cobertura te interesa?', tipo: 'opciones', opciones: ['Casco (Todo Riesgo)', 'RCV + Asistencia Vial'] },
      ]
    },

    seccion2_datosPersonales: {
      titulo: 'Datos del Tomador',
      campos: [
        { campo: 'nombreCompleto', pregunta: '¿Cuál es tu nombre completo?', tipo: 'texto' },
        { campo: 'tipoCedula', pregunta: '¿Tu cédula es venezolana o extranjera?', tipo: 'opciones', opciones: ['Venezolana (V)', 'Extranjera (E)'] },
        { campo: 'numeroCedula', pregunta: '¿Cuál es el número de tu cédula?', tipo: 'texto' },
        { campo: 'fechaNacimiento', pregunta: '¿Cuál es tu fecha de nacimiento? (DD/MM/AAAA)', tipo: 'fecha' },
        { campo: 'sexo', pregunta: '¿Cuál es tu sexo?', tipo: 'opciones', opciones: ['Masculino', 'Femenino'] },
        { campo: 'estadoCivil', pregunta: '¿Cuál es tu estado civil?', tipo: 'opciones', opciones: ['Soltero/a', 'Casado/a', 'Viudo/a', 'Divorciado/a'] },
        { campo: 'profesion', pregunta: '¿Cuál es tu profesión u ocupación?', tipo: 'texto' },
        { campo: 'telefono', pregunta: '¿A qué número de teléfono te podemos contactar?', tipo: 'telefono' },
        { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?', tipo: 'email' },
      ]
    },

    seccion3_direccion: {
      titulo: 'Dirección de Habitación',
      campos: [
        { campo: 'estado', pregunta: '¿En qué estado de Venezuela vives?', tipo: 'texto' },
        { campo: 'ciudad', pregunta: '¿En qué ciudad?', tipo: 'texto' },
        { campo: 'municipio', pregunta: '¿Cuál es tu municipio?', tipo: 'texto' },
        { campo: 'direccionCompleta', pregunta: 'Dame tu dirección completa (urbanización, calle, edificio/casa, piso, etc.)', tipo: 'texto' },
      ]
    },

    seccion4_vehiculo: {
      titulo: 'Datos del Vehículo',
      campos: [
        { campo: 'marca', pregunta: '¿Cuál es la marca de tu vehículo?', tipo: 'texto' },
        { campo: 'modelo', pregunta: '¿Cuál es el modelo?', tipo: 'texto' },
        { campo: 'ano', pregunta: '¿De qué año es?', tipo: 'numero' },
        { campo: 'color', pregunta: '¿De qué color es?', tipo: 'texto' },
        { campo: 'es0km', pregunta: '¿Tu vehículo es 0 kilómetros (nuevo)?', tipo: 'binario', opciones: ['Sí, es 0km', 'No, es usado'] },
        { campo: 'placa', pregunta: '¿Cuál es la placa del vehículo?', tipo: 'texto', condicion: 'si no es 0km' },
        { campo: 'serialMotor', pregunta: '¿Cuál es el serial del motor?', tipo: 'texto' },
        { campo: 'serialCarroceria', pregunta: '¿Cuál es el serial de carrocería?', tipo: 'texto' },
        { campo: 'transmision', pregunta: '¿Qué tipo de transmisión tiene?', tipo: 'opciones', opciones: ['Automática', 'Sincrónica'] },
        { campo: 'usoVehiculo', pregunta: '¿Cuál es el uso principal del vehículo?', tipo: 'opciones', opciones: ['Particular', 'Comercial', 'Taxi'] },
        { campo: 'usoHabitual', pregunta: '¿El uso habitual es urbano o extraurbano?', tipo: 'opciones', opciones: ['Urbano', 'Extraurbano', 'Ambos'] },
      ]
    },

    seccion5_coberturas: {
      titulo: 'Coberturas Solicitadas',
      campos: [
        { campo: 'coberturaCasco', pregunta: '¿Deseas cobertura de Casco (Todo Riesgo)?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'coberturaRCV', pregunta: '¿Deseas RCV Básica?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'asistenciaVial', pregunta: '¿Deseas incluir Asistencia Vial?', tipo: 'binario', opciones: ['Sí', 'No'] },
      ]
    },
  },

  // ==========================================
  // SEGURO DE SALUD/ACCIDENTES - SEGUROS CARACAS  
  // ==========================================
  salud: {
    advertenciaInicial: '⏱️ Este proceso tomará aproximadamente **10 minutos**. Vamos a recopilar la información necesaria para tu cotización de forma conversacional. ¿Comenzamos?',
    
    condicionesEspeciales: {
      buenaSalud: '✨ **¡Excelente noticia!** Al gozar de buena salud, tu proceso de emisión será más ágil y directo.',
      conEnfermedad: '📋 **Importante:** Como indicaste alguna condición de salud, será necesario que asistas a una **evaluación médica** con un médico de la aseguradora o uno de tu preferencia. Esto es un requisito estándar para determinar las coberturas. ¡No te preocupes, te guiaremos en el proceso!',
      conAccidente: '📋 **Nota:** Los accidentes previos serán evaluados por la aseguradora. Puede que algunas condiciones tengan cobertura limitada inicialmente.',
    },

    seccion1_datosPersonales: {
      titulo: 'Datos del Solicitante',
      campos: [
        { campo: 'nombreCompleto', pregunta: '¿Cuál es tu nombre completo?', tipo: 'texto' },
        { campo: 'tipoCedula', pregunta: '¿Tu documento es cédula venezolana, extranjera o RIF?', tipo: 'opciones', opciones: ['Venezolana (V)', 'Extranjera (E)', 'RIF (J)'] },
        { campo: 'numeroCedula', pregunta: '¿Cuál es el número?', tipo: 'texto' },
        { campo: 'fechaNacimiento', pregunta: '¿Cuál es tu fecha de nacimiento? (DD/MM/AAAA)', tipo: 'fecha' },
        { campo: 'sexo', pregunta: '¿Cuál es tu sexo?', tipo: 'opciones', opciones: ['Masculino', 'Femenino'] },
        { campo: 'estadoCivil', pregunta: '¿Cuál es tu estado civil?', tipo: 'opciones', opciones: ['Soltero/a', 'Casado/a', 'Viudo/a', 'Divorciado/a'] },
        { campo: 'ocupacion', pregunta: '¿Cuál es tu ocupación?', tipo: 'opciones', opciones: ['Socio/Empresario', 'Empleado', 'Profesional Independiente', 'Otro'] },
        { campo: 'telefono', pregunta: '¿A qué número de teléfono te podemos contactar?', tipo: 'telefono' },
        { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?', tipo: 'email' },
      ]
    },

    seccion2_direccion: {
      titulo: 'Dirección de Habitación',
      campos: [
        { campo: 'estado', pregunta: '¿En qué estado de Venezuela vives?', tipo: 'texto' },
        { campo: 'ciudad', pregunta: '¿En qué ciudad?', tipo: 'texto' },
        { campo: 'direccionCompleta', pregunta: 'Dame tu dirección completa', tipo: 'texto' },
      ]
    },

    seccion3_vigencia: {
      titulo: 'Vigencia y Pago',
      campos: [
        { campo: 'frecuenciaPago', pregunta: '¿Cómo prefieres pagar la prima?', tipo: 'opciones', opciones: ['Anual', 'Semestral', 'Trimestral'] },
      ]
    },

    seccion4_inscritos: {
      titulo: 'Personas a Asegurar',
      campos: [
        { campo: 'cantidadInscritos', pregunta: '¿Cuántas personas deseas asegurar (incluyéndote)?', tipo: 'numero' },
        { campo: 'datosInscritos', pregunta: 'Por cada persona, necesitaré: nombre, fecha de nacimiento, cédula, peso, estatura, sexo y parentesco contigo.', tipo: 'multiple' },
      ]
    },

    seccion5_coberturas: {
      titulo: 'Coberturas Solicitadas',
      campos: [
        { campo: 'muerteAccidental', pregunta: '¿Deseas cobertura por Muerte Accidental?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'invalidezPermanente', pregunta: '¿Deseas cobertura por Invalidez Permanente?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'gastosMedicos', pregunta: '¿Deseas cobertura de Gastos Médicos?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'gastosEntierro', pregunta: '¿Deseas cobertura de Gastos de Entierro?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'incapacidadTemporal', pregunta: '¿Deseas cobertura por Incapacidad Temporal?', tipo: 'binario', opciones: ['Sí', 'No'] },
      ]
    },

    seccion6_beneficiarios: {
      titulo: 'Beneficiarios',
      campos: [
        { campo: 'tieneBeneficiarios', pregunta: '¿Deseas agregar beneficiarios en caso de fallecimiento?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'datosBeneficiarios', pregunta: 'Por cada beneficiario, necesitaré: nombre, cédula, parentesco y porcentaje de participación.', tipo: 'multiple', condicion: 'si tiene beneficiarios' },
      ]
    },

    seccion7_cuestionarioSalud: {
      titulo: 'Cuestionario de Salud (Muy Importante)',
      campos: [
        { campo: 'trabajaPorCuenta', pregunta: '¿Trabajas por tu cuenta propia?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'paraQuienTrabaja', pregunta: '¿Para quién trabajas?', tipo: 'texto', condicion: 'si no trabaja por cuenta propia' },
        { campo: 'usaMaquinarias', pregunta: '¿En tu trabajo utilizas maquinarias pesadas?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'usaAltoVoltaje', pregunta: '¿Trabajas con alto voltaje?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'manipulaQuimicos', pregunta: '¿Manipulas explosivos o preparados químicos?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'manejaVehiculos', pregunta: '¿Manejas vehículos como parte de tu trabajo?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'usaEmbarcaciones', pregunta: '¿Utilizas embarcaciones?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'tripulaAeronaves', pregunta: '¿Tripulas aeronaves?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'gozaBuenaSalud', pregunta: '⚕️ **Pregunta importante:** ¿Tú y los inscritos gozan de buena salud y NO padecen ninguna enfermedad?', tipo: 'binario', opciones: ['Sí, todos gozamos de buena salud', 'No, alguien tiene alguna condición'] },
        { campo: 'detalleEnfermedad', pregunta: 'Por favor, detalla qué condición de salud tienen:', tipo: 'texto', condicion: 'si no gozan de buena salud' },
        { campo: 'haSufridoAccidente', pregunta: '¿Tú o algún inscrito ha sufrido algún accidente anteriormente?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'detalleAccidente', pregunta: 'Cuéntame: ¿Quién, cuándo y qué consecuencias tuvo?', tipo: 'texto', condicion: 'si ha sufrido accidente' },
        { campo: 'tieneDefectoFisico', pregunta: '¿Alguno tiene algún defecto físico?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'practicaDeportes', pregunta: '¿Qué deportes practican los inscritos?', tipo: 'texto' },
        { campo: 'deporteProfesional', pregunta: '¿Alguno practica deportes de forma profesional?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'tieneOtraPoliza', pregunta: '¿Tienes o estás contratando otra póliza de vida, accidentes u hospitalización?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'leHanRechazadoPoliza', pregunta: '¿Alguna vez te han rechazado una póliza de seguros?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'razonesRechazo', pregunta: '¿Cuáles fueron las razones del rechazo?', tipo: 'texto', condicion: 'si le han rechazado' },
      ]
    },
  },

  // ==========================================
  // SEGURO DE VIDA (simplificado)
  // ==========================================
  vida: {
    pasos: [
      { campo: 'tipoCobertura', pregunta: '¿Qué tipo de protección buscas?', opciones: ['Vida', 'Accidentes Personales', 'Servicios Funerarios'] },
      { campo: 'sumaAsegurada', pregunta: '¿Qué suma asegurada te interesa?' },
      { campo: 'nombreCompleto', pregunta: '¿Cuál es tu nombre completo?' },
      { campo: 'cedula', pregunta: '¿Cuál es tu número de cédula?' },
      { campo: 'fechaNacimiento', pregunta: '¿Cuál es tu fecha de nacimiento?' },
      { campo: 'ocupacion', pregunta: '¿Cuál es tu ocupación?' },
      { campo: 'telefono', pregunta: '¿A qué número te podemos contactar?' },
      { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?' },
    ],
  },

  // ==========================================
  // SEGURO DE HOGAR (simplificado)
  // ==========================================
  hogar: {
    pasos: [
      { campo: 'tipoInmueble', pregunta: '¿Es casa o apartamento?' },
      { campo: 'valorInmueble', pregunta: '¿Cuál es el valor aproximado del inmueble?' },
      { campo: 'ubicacion', pregunta: '¿En qué ciudad/zona está ubicado?' },
      { campo: 'nombreCompleto', pregunta: '¿Cuál es tu nombre completo?' },
      { campo: 'cedula', pregunta: '¿Cuál es tu número de cédula?' },
      { campo: 'telefono', pregunta: '¿A qué número te podemos contactar?' },
      { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?' },
    ],
  },
}

// ==========================================
// GENERAR PROMPT DEL SISTEMA
// ==========================================

export function generateSystemPrompt() {
  return `Eres MaxProtect, el asistente virtual de ${COMPANY_INFO.nombre}, ${COMPANY_INFO.slogan}.

## TU PERSONALIDAD
- Eres amable, profesional, empático y CONVERSACIONAL
- Respondes en español de Venezuela (usa "tú", no "usted" a menos que el cliente lo prefiera)
- Usas emojis con moderación para ser más cercano 😊
- Eres conciso pero completo - NO abrumes con mucho texto
- Haces UNA pregunta a la vez, nunca varias juntas
- Celebras las respuestas positivas del cliente

## INFORMACIÓN DE LA EMPRESA
- Nombre: ${COMPANY_INFO.nombre}
- Teléfono: ${COMPANY_INFO.telefono}
- Email: ${COMPANY_INFO.email}
- WhatsApp: ${COMPANY_INFO.whatsapp}
- Instagram: ${COMPANY_INFO.instagram}
- Horario: ${COMPANY_INFO.horario}

## ASEGURADORAS ALIADAS
${Object.values(ASEGURADORAS).map(a => `- **${a.nombre}** ${a.emoji}: ${a.descripcion}`).join('\n')}

## PRODUCTOS DISPONIBLES
${Object.values(PRODUCTOS).map(p => `
### ${p.emoji} ${p.nombre}
${p.descripcion}
${p.precioDesde ? `Precio desde: ${p.precioDesde}` : ''}`).join('\n')}

## PREGUNTAS FRECUENTES
${FAQS.map(f => `**${f.pregunta}**\n${f.respuesta}`).join('\n\n')}

## 🚗 FLUJO DE COTIZACIÓN - SEGURO DE AUTO

### FASE COTIZACIÓN (Rápida - sin advertencias)
Cuando el cliente quiera cotizar AUTO, ve directo al grano:

**Datos básicos para cotizar (preguntar uno por uno):**
1. ¿Qué tipo de cobertura te interesa? (Casco/RCV)
2. Nombre completo
3. Cédula
4. Fecha de nacimiento
5. Teléfono
6. Email
7. Marca del vehículo
8. Modelo
9. Año
10. ¿Es 0km o usado?

**Luego MOSTRAR PRECIO y preguntar si desea continuar con emisión.**

---

## 🏥 FLUJO DE COTIZACIÓN - SEGURO DE SALUD

### FASE COTIZACIÓN (Rápida - sin advertencias)
Cuando el cliente quiera cotizar SALUD, ve directo al grano:

**Datos básicos para cotizar (preguntar uno por uno):**
1. Nombre completo
2. Cédula
3. Fecha de nacimiento
4. Teléfono
5. Email
6. ¿Cuántas personas deseas asegurar?
7. Edades de las personas

**Luego MOSTRAR PRECIO y preguntar si desea continuar con emisión.**

---

## 💰 FLUJO GENERAL: COTIZACIÓN → PRECIO → EMISIÓN

### FASE 1: COTIZACIÓN (Rápida y directa)
Solo preguntar datos básicos para calcular precio:
- Tipo de cobertura
- Datos personales (nombre, cédula, fecha nacimiento, teléfono, email)
- Para AUTO: marca, modelo, año, ¿es 0km?
- Para SALUD: cantidad de personas, edades

### FASE 2: MOSTRAR PRECIO ESTIMADO
Una vez tengas los datos básicos, muestra el precio así:

"💰 **PRECIO ESTIMADO DE TU COTIZACIÓN**

Basándome en los datos que me proporcionaste, tu seguro de **[Auto/Salud]** tendría un costo aproximado de:

🏷️ **$XX.XX mensuales** (equivalente a $XXX.XX anuales)

✅ Este precio incluye:
- [Cobertura principal]
- [Beneficios incluidos]

⚠️ *Precio estimado. El monto final se confirma al emitir la póliza.*

¿Te parece bien este precio? ¿Deseas continuar con la **emisión de tu póliza**?"

### FASE 3: EMISIÓN (Solo si acepta el precio)
⚠️ **AQUÍ VA LA ADVERTENCIA DE TIEMPO:**
Si el cliente acepta continuar, di:

"¡Excelente decisión! 🎉 

⏱️ **Importante:** Para completar la emisión de tu póliza necesitaré algunos datos adicionales. Este proceso tomará aproximadamente **10 minutos**.

¿Estás listo para continuar?"

**Si dice SÍ, entonces preguntar los datos completos de las planillas:**

**Para AUTO:**
- Dirección completa (estado, ciudad, municipio, dirección)
- Sexo, estado civil, profesión
- Color del vehículo
- Si es usado: Placa + advertencia de inspección
- Serial del motor y carrocería
- Transmisión, uso del vehículo
- Tipo de pago

**Para SALUD:**
- Dirección completa
- Cuestionario de salud completo
- Si NO goza de buena salud: advertencia de evaluación médica
- Beneficiarios
- Forma de pago

Luego continúa con las preguntas restantes de las planillas:
- Dirección completa
- Datos del vehículo (seriales, placa si es usado)
- Cuestionario de salud (para salud)
- Beneficiarios
- Forma de pago

### PRECIOS DE REFERENCIA (usar como estimados)
**AUTO:**
- RCV Básica: $35-45/mes
- Cobertura Amplia: $80-150/mes (según valor del vehículo)
- Pérdida Total: $50-80/mes

**SALUD/ACCIDENTES:**
- Individual: $25-50/mes
- Familiar (2-4 personas): $60-120/mes

---

## REGLAS DE COMPORTAMIENTO

1. **UNA PREGUNTA A LA VEZ** - Nunca hagas varias preguntas juntas
2. **SÉ CONVERSACIONAL** - No suenes como un formulario. Ejemplo:
   - ❌ "Ingrese su nombre completo"
   - ✅ "¡Perfecto! Para comenzar, ¿cuál es tu nombre completo?"
3. **CELEBRA LAS RESPUESTAS** - "¡Excelente!", "Perfecto", "Muy bien" antes de la siguiente pregunta
4. **OFRECE BOTONES** para preguntas binarias (Sí/No) y opciones múltiples
5. **APLICA LAS CONDICIONES** según las respuestas (0km vs usado, buena salud vs enfermedad)
6. **MOSTRAR PRECIO** antes de pedir datos de emisión - pregunta si desea continuar
7. **NO INVENTES** - Si no sabes algo, ofrece contactar con un asesor
8. **EMPATÍA** - Si el cliente está frustrado, muestra comprensión

## FORMATO DE BOTONES
Cuando ofrezcas opciones, usa este formato para que el frontend pueda renderizar botones:
- Para Sí/No: "¿...? [Sí] [No]"
- Para opciones: "¿...? [Opción1] [Opción2] [Opción3]"
- Para aceptar precio: "[Sí, continuar con emisión] [Ver otras opciones] [No por ahora]"`
}
