// ═══════════════════════════════════════════════════════════════════════════
// FORMULARIOS SIMPLIFICADOS PARA MICROSEGUROS
// FFC Consultants - Bot de WhatsApp / Web
// ═══════════════════════════════════════════════════════════════════════════
// 
// PRODUCTOS: Accidentes Personales, Servicio Funerario, Póliza de Vida, RCV
// ASEGURADORAS: Seguros Pirámide, Oceánica de Seguros, Real Seguros, Estar Seguros
// 
// ESTRUCTURA:
// - ETAPA 1 (COTIZAR): Datos mínimos para calcular prima
// - ETAPA 2 (EMITIR): Datos completos solo si acepta la cotización
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// DATOS COMUNES (REUTILIZABLES EN TODOS LOS PRODUCTOS)
// ═══════════════════════════════════════════════════════════════════════════

export const DATOS_COMUNES = {
  // ─────────────────────────────────────────────────────────────────────────
  // TOMADOR (quien contrata y paga)
  // ─────────────────────────────────────────────────────────────────────────
  tomador: {
    personaNatural: [
      { campo: 'nombre_completo', pregunta: '¿Cuál es tu nombre completo?', tipo: 'texto', requerido: true },
      { campo: 'cedula', pregunta: '¿Cuál es tu número de cédula?', tipo: 'cedula', requerido: true },
      { campo: 'rif', pregunta: '¿Cuál es tu RIF? (opcional)', tipo: 'rif', requerido: false },
      { campo: 'fecha_nacimiento', pregunta: '¿Cuál es tu fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'sexo', pregunta: '¿Cuál es tu sexo?', tipo: 'opciones', opciones: ['Masculino', 'Femenino'], requerido: true },
      { campo: 'telefono', pregunta: '¿A qué número de WhatsApp te contactamos?', tipo: 'telefono', requerido: true },
      { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?', tipo: 'email', requerido: true },
      { campo: 'estado', pregunta: '¿En qué estado resides?', tipo: 'estado', requerido: true },
      { campo: 'ciudad', pregunta: '¿En qué ciudad?', tipo: 'texto', requerido: true },
      { campo: 'direccion', pregunta: '¿Cuál es tu dirección completa?', tipo: 'texto', requerido: true },
    ],
    personaJuridica: [
      { campo: 'razon_social', pregunta: '¿Cuál es la razón social de la empresa?', tipo: 'texto', requerido: true },
      { campo: 'rif_empresa', pregunta: '¿Cuál es el RIF de la empresa?', tipo: 'rif', requerido: true },
      { campo: 'representante_legal', pregunta: '¿Nombre del representante legal?', tipo: 'texto', requerido: true },
      { campo: 'cedula_representante', pregunta: '¿Cédula del representante?', tipo: 'cedula', requerido: true },
      { campo: 'cargo', pregunta: '¿Cargo del representante?', tipo: 'texto', requerido: true },
      { campo: 'telefono_empresa', pregunta: '¿Teléfono de contacto?', tipo: 'telefono', requerido: true },
      { campo: 'email_empresa', pregunta: '¿Correo corporativo?', tipo: 'email', requerido: true },
      { campo: 'direccion_fiscal', pregunta: '¿Dirección fiscal de la empresa?', tipo: 'texto', requerido: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BENEFICIARIOS (para AP, Vida, Funerario)
  // ─────────────────────────────────────────────────────────────────────────
  beneficiario: [
    { campo: 'nombre_beneficiario', pregunta: '¿Nombre completo del beneficiario?', tipo: 'texto', requerido: true },
    { campo: 'cedula_beneficiario', pregunta: '¿Cédula del beneficiario?', tipo: 'cedula', requerido: true },
    { campo: 'parentesco', pregunta: '¿Qué parentesco tiene contigo?', tipo: 'opciones', opciones: ['Cónyuge', 'Hijo/a', 'Padre', 'Madre', 'Hermano/a', 'Otro'], requerido: true },
    { campo: 'porcentaje', pregunta: '¿Qué porcentaje le asignas?', tipo: 'numero', requerido: true, validacion: 'suma_100' },
    { campo: 'telefono_beneficiario', pregunta: '¿Teléfono del beneficiario? (opcional)', tipo: 'telefono', requerido: false },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. ACCIDENTES PERSONALES
// ═══════════════════════════════════════════════════════════════════════════

export const ACCIDENTES_PERSONALES = {
  nombre: 'Accidentes Personales',
  codigo: 'AP',
  descripcion: 'Cobertura por muerte accidental, invalidez permanente y gastos médicos por accidente',
  edadContratacion: { min: 18, max: 75 },
  
  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 1: COTIZAR (campos mínimos)
  // ─────────────────────────────────────────────────────────────────────────
  cotizar: {
    campos: [
      { campo: 'tipo_contratacion', pregunta: '¿Es para una persona o para un grupo/empresa?', tipo: 'opciones', opciones: ['Individual', 'Colectivo/Grupo'], requerido: true },
      { campo: 'fecha_nacimiento', pregunta: '¿Cuál es tu fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'ocupacion', pregunta: '¿A qué te dedicas?', tipo: 'texto', requerido: true },
      { campo: 'nivel_riesgo', pregunta: '¿Cuál es tu nivel de riesgo laboral?', tipo: 'opciones', opciones: ['Oficina/Administrativo', 'Comercio/Ventas', 'Motorizado', 'Construcción', 'Seguridad', 'Otro'], requerido: true },
      { campo: 'suma_asegurada', pregunta: '¿Qué monto de protección deseas?', tipo: 'moneda', requerido: true },
      { campo: 'coberturas', pregunta: '¿Qué coberturas te interesan?', tipo: 'multiple', opciones: ['Muerte accidental', 'Invalidez permanente', 'Gastos médicos', 'Asistencia en viaje'], requerido: true },
      { campo: 'estado', pregunta: '¿En qué estado resides?', tipo: 'estado', requerido: true },
      { campo: 'telefono', pregunta: '¿A qué WhatsApp enviamos la cotización?', tipo: 'telefono', requerido: true },
    ],
    // Campos mínimos absolutos para cotización rápida
    camposMinimos: ['fecha_nacimiento', 'ocupacion', 'suma_asegurada', 'coberturas', 'tipo_contratacion', 'estado', 'telefono'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 2: EMITIR (campos completos)
  // ─────────────────────────────────────────────────────────────────────────
  emitir: {
    // Usa DATOS_COMUNES.tomador según tipo
    datosAsegurado: [
      { campo: 'nombre_asegurado', pregunta: '¿Nombre completo del asegurado?', tipo: 'texto', requerido: true },
      { campo: 'cedula_asegurado', pregunta: '¿Cédula del asegurado?', tipo: 'cedula', requerido: true },
      { campo: 'fecha_nacimiento_asegurado', pregunta: '¿Fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'ocupacion_especifica', pregunta: '¿Ocupación específica?', tipo: 'texto', requerido: true },
      { campo: 'direccion_asegurado', pregunta: '¿Dirección del asegurado?', tipo: 'texto', requerido: true },
    ],
    // Beneficiarios solo si cubre muerte accidental
    requiereBeneficiarios: true,
    condicionBeneficiarios: 'coberturas.includes("Muerte accidental")',
    
    // Declaración simple de actividades peligrosas
    declaracion: {
      titulo: 'Declaración de Actividades',
      pregunta: '¿Realizas alguna de estas actividades de alto riesgo?',
      opciones: [
        'Motorizado profesional (delivery, mensajería)',
        'Construcción o trabajo en altura',
        'Minería o excavación',
        'Seguridad armada',
        'Deportes extremos (paracaidismo, alpinismo, buceo)',
        'Manejo de maquinaria pesada',
        'Ninguna de las anteriores',
      ],
      accionSiPositivo: 'marcar_revision_manual',
    },
    
    // Documentos requeridos
    documentos: {
      natural: ['Cédula del tomador', 'Cédula del asegurado (si es diferente)'],
      juridica: ['RIF de la empresa', 'Cédula del representante legal', 'Acta constitutiva'],
    },
    
    // Aceptación final
    aceptacion: [
      'Acepto los términos y condiciones de la póliza',
      'Confirmo que la información proporcionada es veraz',
      'Autorizo el débito/cargo del pago',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CAMPOS QUE NO SE DEBEN PEDIR (tipo HCM)
  // ─────────────────────────────────────────────────────────────────────────
  noPedir: [
    'Historia médica completa',
    'Médicos tratantes',
    'Clínicas frecuentes',
    'Peso y talla (salvo exigencia de aseguradora)',
    'Enfermedades familiares',
    'Exámenes médicos',
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SERVICIO FUNERARIO
// ═══════════════════════════════════════════════════════════════════════════

export const SERVICIO_FUNERARIO = {
  nombre: 'Servicio Funerario',
  codigo: 'FUN',
  descripcion: 'Cobertura de gastos de velatorio, cremación/inhumación, traslados y gestiones legales',
  sumasAseguradas: { min: 2500, max: 4000, moneda: 'USD' },
  plazoEspera: '3 meses (excepto muerte accidental)',
  
  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 1: COTIZAR (campos mínimos)
  // ─────────────────────────────────────────────────────────────────────────
  cotizar: {
    campos: [
      { campo: 'tipo_plan', pregunta: '¿Deseas plan individual o familiar?', tipo: 'opciones', opciones: ['Individual', 'Familiar'], requerido: true },
      { campo: 'nombre_titular', pregunta: '¿Quién será el titular del servicio?', tipo: 'texto', requerido: true },
      { campo: 'fecha_nacimiento_titular', pregunta: '¿Fecha de nacimiento del titular?', tipo: 'fecha', requerido: true },
      { campo: 'incluir_familiares', pregunta: '¿Deseas incluir familiares?', tipo: 'opciones', opciones: ['Sí', 'No'], requerido: true, condicion: 'tipo_plan === "Familiar"' },
      { campo: 'cantidad_familiares', pregunta: '¿Cuántas personas deseas incluir?', tipo: 'numero', requerido: true, condicion: 'incluir_familiares === "Sí"' },
      { campo: 'familiares_info', pregunta: 'Por cada familiar: edad y parentesco', tipo: 'lista_familiares', requerido: true, condicion: 'incluir_familiares === "Sí"' },
      { campo: 'tipo_cobertura', pregunta: '¿Qué tipo de cobertura prefieres?', tipo: 'opciones', opciones: ['Básica ($2,500)', 'Media ($3,000)', 'Alta ($4,000)'], requerido: true },
      { campo: 'estado', pregunta: '¿En qué estado residen?', tipo: 'estado', requerido: true },
      { campo: 'telefono', pregunta: '¿WhatsApp para enviar cotización?', tipo: 'telefono', requerido: true },
    ],
    camposMinimos: ['tipo_plan', 'fecha_nacimiento_titular', 'cantidad_familiares', 'tipo_cobertura', 'estado', 'telefono'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 2: EMITIR (campos completos)
  // ─────────────────────────────────────────────────────────────────────────
  emitir: {
    // Usa DATOS_COMUNES.tomador según tipo
    datosTitular: [
      { campo: 'nombre_titular', pregunta: '¿Nombre completo del titular?', tipo: 'texto', requerido: true },
      { campo: 'cedula_titular', pregunta: '¿Cédula del titular?', tipo: 'cedula', requerido: true },
      { campo: 'fecha_nacimiento_titular', pregunta: '¿Fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'direccion_titular', pregunta: '¿Dirección completa?', tipo: 'texto', requerido: true },
      { campo: 'telefono_titular', pregunta: '¿Teléfono de contacto?', tipo: 'telefono', requerido: true },
      { campo: 'email_titular', pregunta: '¿Correo electrónico?', tipo: 'email', requerido: true },
    ],
    
    // Lista de familiares asegurables
    datosFamiliar: [
      { campo: 'nombre_familiar', pregunta: '¿Nombre completo?', tipo: 'texto', requerido: true },
      { campo: 'cedula_familiar', pregunta: '¿Cédula o documento?', tipo: 'cedula', requerido: true },
      { campo: 'fecha_nacimiento_familiar', pregunta: '¿Fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'parentesco_familiar', pregunta: '¿Parentesco con el titular?', tipo: 'opciones', opciones: ['Cónyuge', 'Hijo/a', 'Padre', 'Madre', 'Otro'], requerido: true },
      { campo: 'telefono_familiar', pregunta: '¿Teléfono? (opcional)', tipo: 'telefono', requerido: false },
    ],
    
    // Declaración simple (si la aseguradora lo exige)
    declaracion: {
      titulo: 'Validación de Salud',
      pregunta: '¿Alguna de las personas a asegurar se encuentra actualmente hospitalizada, en estado crítico o con enfermedad terminal diagnosticada?',
      tipo: 'si_no',
      accionSiPositivo: 'rechazar_emision',
      mensajeRechazo: 'Lo sentimos, no podemos procesar la solicitud en este momento. Por favor contacta a un asesor.',
    },
    
    // Aceptación de plazos de espera
    aceptacionEspera: 'Entiendo que existe un plazo de espera de 3 meses para causas naturales. La cobertura por muerte accidental es inmediata.',
    
    documentos: {
      natural: ['Cédula del titular', 'Cédula de cada familiar asegurado'],
      juridica: ['RIF de la empresa', 'Cédula del representante', 'Lista de empleados a asegurar'],
    },
    
    aceptacion: [
      'Acepto los términos y condiciones del servicio funerario',
      'Acepto el plazo de espera de 3 meses para causas naturales',
      'Autorizo el débito/cargo del pago',
    ],
  },

  noPedir: [
    'Historia clínica',
    'Enfermedades previas detalladas',
    'Clínicas',
    'Médico tratante',
    'Exámenes médicos',
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. PÓLIZA DE VIDA
// ═══════════════════════════════════════════════════════════════════════════

export const POLIZA_VIDA = {
  nombre: 'Póliza de Vida',
  codigo: 'VIDA',
  descripcion: 'Protección financiera para beneficiarios en caso de fallecimiento del asegurado',
  
  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 1: COTIZAR (campos mínimos)
  // ─────────────────────────────────────────────────────────────────────────
  cotizar: {
    campos: [
      { campo: 'tipo_vida', pregunta: '¿Es seguro individual o colectivo?', tipo: 'opciones', opciones: ['Individual', 'Colectivo/Grupo'], requerido: true },
      { campo: 'fecha_nacimiento', pregunta: '¿Cuál es tu fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'sexo', pregunta: '¿Cuál es tu sexo?', tipo: 'opciones', opciones: ['Masculino', 'Femenino'], requerido: true },
      { campo: 'fumador', pregunta: '¿Fumas actualmente?', tipo: 'opciones', opciones: ['Sí', 'No'], requerido: true },
      { campo: 'ocupacion', pregunta: '¿A qué te dedicas?', tipo: 'texto', requerido: true },
      { campo: 'suma_asegurada', pregunta: '¿Qué monto deseas dejar protegido?', tipo: 'moneda', requerido: true },
      { campo: 'duracion', pregunta: '¿Por cuánto tiempo deseas la póliza?', tipo: 'opciones', opciones: ['1 año (renovable)', 'Temporal (5-10 años)', 'Vitalicia'], requerido: true },
      { campo: 'telefono', pregunta: '¿WhatsApp para enviar cotización?', tipo: 'telefono', requerido: true },
    ],
    camposMinimos: ['fecha_nacimiento', 'sexo', 'fumador', 'ocupacion', 'suma_asegurada', 'duracion', 'tipo_vida'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 2: EMITIR (campos completos)
  // ─────────────────────────────────────────────────────────────────────────
  emitir: {
    // Usa DATOS_COMUNES.tomador según tipo
    datosAsegurado: [
      { campo: 'nombre_asegurado', pregunta: '¿Nombre completo del asegurado?', tipo: 'texto', requerido: true },
      { campo: 'cedula_asegurado', pregunta: '¿Cédula del asegurado?', tipo: 'cedula', requerido: true },
      { campo: 'rif_asegurado', pregunta: '¿RIF? (opcional)', tipo: 'rif', requerido: false },
      { campo: 'fecha_nacimiento_asegurado', pregunta: '¿Fecha de nacimiento?', tipo: 'fecha', requerido: true },
      { campo: 'sexo_asegurado', pregunta: '¿Sexo?', tipo: 'opciones', opciones: ['Masculino', 'Femenino'], requerido: true },
      { campo: 'direccion_asegurado', pregunta: '¿Dirección completa?', tipo: 'texto', requerido: true },
      { campo: 'ocupacion_asegurado', pregunta: '¿Ocupación?', tipo: 'texto', requerido: true },
      { campo: 'ingreso_aproximado', pregunta: '¿Ingreso mensual aproximado?', tipo: 'opciones', opciones: ['Menos de $500', '$500-$1,000', '$1,000-$2,500', 'Más de $2,500'], requerido: false },
    ],
    
    // Beneficiarios OBLIGATORIOS (suma debe ser 100%)
    requiereBeneficiarios: true,
    validacionBeneficiarios: 'suma_porcentajes === 100',
    
    // Declaración SIMPLE de salud (6 preguntas cerradas)
    declaracionSalud: {
      titulo: 'Declaración Simple de Salud',
      instruccion: 'Por favor responde Sí o No a cada pregunta:',
      preguntas: [
        { id: 1, pregunta: '¿Te encuentras actualmente hospitalizado?', tipo: 'si_no' },
        { id: 2, pregunta: '¿Has sido diagnosticado con cáncer, infarto, ACV, insuficiencia renal, VIH/SIDA, enfermedad cardíaca grave o enfermedad terminal?', tipo: 'si_no' },
        { id: 3, pregunta: '¿Tienes alguna cirugía programada?', tipo: 'si_no' },
        { id: 4, pregunta: '¿Estás recibiendo tratamiento médico permanente?', tipo: 'si_no' },
        { id: 5, pregunta: '¿Fumas actualmente?', tipo: 'si_no' },
        { id: 6, pregunta: '¿Practicas deportes extremos o actividades de alto riesgo?', tipo: 'si_no' },
      ],
      accionSiPositivo: 'marcar_revision_manual',
      mensajeRevision: '⚠️ Tu solicitud será revisada por un asesor antes de la emisión. Te contactaremos en breve.',
    },
    
    documentos: {
      natural: ['Cédula del tomador', 'Cédula del asegurado'],
      juridica: ['RIF de la empresa', 'Cédula del representante', 'Nómina de empleados'],
    },
    
    aceptacion: [
      'Declaro que la información proporcionada es veraz y completa',
      'Acepto los términos y condiciones de la póliza de vida',
      'Autorizo el débito/cargo del pago',
    ],
  },

  noPedir: [
    'Historia médica completa tipo HCM',
    'Nombres de médicos tratantes',
    'Clínicas o centros de salud frecuentes',
    'Exámenes de laboratorio',
    'Historial familiar de enfermedades',
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. RCV - RESPONSABILIDAD CIVIL VEHICULAR
// ═══════════════════════════════════════════════════════════════════════════

export const RCV = {
  nombre: 'RCV - Responsabilidad Civil Vehicular',
  codigo: 'RCV',
  descripcion: 'Cobertura obligatoria de daños a terceros por uso del vehículo',
  
  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 1: COTIZAR (campos mínimos)
  // ─────────────────────────────────────────────────────────────────────────
  cotizar: {
    campos: [
      { campo: 'tipo_vehiculo', pregunta: '¿Qué tipo de vehículo es?', tipo: 'opciones', opciones: ['Particular', 'Moto', 'Carga', 'Rústico/4x4', 'Taxi', 'Transporte'], requerido: true },
      { campo: 'uso_vehiculo', pregunta: '¿Cuál es el uso del vehículo?', tipo: 'opciones', opciones: ['Particular', 'Comercial', 'Transporte público', 'Carga'], requerido: true },
      { campo: 'marca', pregunta: '¿Cuál es la marca?', tipo: 'texto', requerido: true },
      { campo: 'modelo', pregunta: '¿Cuál es el modelo?', tipo: 'texto', requerido: true },
      { campo: 'año', pregunta: '¿De qué año es?', tipo: 'año', requerido: true },
      { campo: 'placa', pregunta: '¿Cuál es la placa?', tipo: 'placa', requerido: true },
      { campo: 'estado_circulacion', pregunta: '¿En qué estado circula principalmente?', tipo: 'estado', requerido: true },
      { campo: 'plan', pregunta: '¿Qué plan te interesa?', tipo: 'opciones', opciones: ['Básico', 'Con exceso de límites', 'Con asistencia vial'], requerido: true },
      { campo: 'asistencia_vial', pregunta: '¿Deseas incluir asistencia vial 24/7?', tipo: 'opciones', opciones: ['Sí', 'No'], requerido: true },
      { campo: 'telefono', pregunta: '¿WhatsApp para enviar cotización?', tipo: 'telefono', requerido: true },
    ],
    camposMinimos: ['tipo_vehiculo', 'uso_vehiculo', 'marca', 'modelo', 'año', 'placa', 'estado_circulacion', 'plan'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ETAPA 2: EMITIR (campos completos)
  // ─────────────────────────────────────────────────────────────────────────
  emitir: {
    // Datos del tomador según DATOS_COMUNES
    
    datosVehiculo: [
      { campo: 'placa', pregunta: '¿Placa del vehículo?', tipo: 'placa', requerido: true },
      { campo: 'marca', pregunta: '¿Marca?', tipo: 'texto', requerido: true },
      { campo: 'modelo', pregunta: '¿Modelo?', tipo: 'texto', requerido: true },
      { campo: 'año', pregunta: '¿Año?', tipo: 'año', requerido: true },
      { campo: 'color', pregunta: '¿Color?', tipo: 'texto', requerido: true },
      { campo: 'tipo_vehiculo', pregunta: '¿Tipo de vehículo?', tipo: 'opciones', opciones: ['Sedán', 'SUV', 'Pickup', 'Moto', 'Camión', 'Bus'], requerido: true },
      { campo: 'uso', pregunta: '¿Uso del vehículo?', tipo: 'opciones', opciones: ['Particular', 'Comercial', 'Carga', 'Transporte'], requerido: true },
      { campo: 'serial_carroceria', pregunta: '¿Serial de carrocería (VIN)?', tipo: 'texto', requerido: true },
      { campo: 'serial_motor', pregunta: '¿Serial del motor?', tipo: 'texto', requerido: true },
      { campo: 'capacidad', pregunta: '¿Capacidad (puestos o carga)?', tipo: 'texto', requerido: false },
    ],
    
    // NO requiere beneficiarios
    requiereBeneficiarios: false,
    
    // NO requiere declaración de salud
    declaracionSalud: null,
    
    documentos: {
      natural: [
        'Cédula del tomador',
        'Carnet de circulación (o certificado de origen si no tiene)',
      ],
      juridica: [
        'RIF de la empresa',
        'Cédula del representante legal',
        'Carnet de circulación del vehículo',
      ],
      nota: 'Del carnet de circulación se pueden extraer: placa, marca, modelo, año, color, tipo, uso, serial de carrocería y serial de motor.',
    },
    
    aceptacion: [
      'Acepto los términos y condiciones de la póliza RCV',
      'Confirmo que los datos del vehículo son correctos',
      'Autorizo el débito/cargo del pago',
    ],
  },

  noPedir: [
    'Estado de salud',
    'Beneficiarios',
    'Datos familiares',
    'Historial de siniestros (salvo exigencia de aseguradora)',
    'Fotos del vehículo (solo para coberturas de casco)',
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// FLUJO DEL BOT - RESUMEN EJECUTIVO
// ═══════════════════════════════════════════════════════════════════════════

export const FLUJO_BOT = {
  // Paso 1: Identificar producto
  paso1: {
    pregunta: '¿Qué tipo de seguro te interesa?',
    opciones: [
      { valor: 'AP', texto: '🛡️ Accidentes Personales' },
      { valor: 'FUN', texto: '⚱️ Servicio Funerario' },
      { valor: 'VIDA', texto: '💚 Póliza de Vida' },
      { valor: 'RCV', texto: '🚗 RCV (Vehículos)' },
    ],
  },
  
  // Paso 2: Cotizar (campos mínimos según producto)
  paso2: 'Ejecutar flujo de cotización del producto seleccionado',
  
  // Paso 3: Mostrar cotización comparativa (4 aseguradoras)
  paso3: {
    formato: `
💰 **COTIZACIÓN - [PRODUCTO]**

| Aseguradora | Mensual | Anual |
|-------------|---------|-------|
| 🔴 Seguros Pirámide | $XX | $XXX |
| 🟢 Oceánica de Seguros | $XX | $XXX |
| 🔵 Estar Seguros | $XX | $XXX |
| 🟣 Real Seguros | $XX | $XXX |

¿Con cuál deseas continuar?
    `,
    botones: ['Pirámide', 'Oceánica', 'Estar', 'Real'],
  },
  
  // Paso 4: ¿Acepta cotización?
  paso4: {
    pregunta: '¿Deseas continuar con la emisión?',
    opciones: ['Sí, continuar', 'No por ahora'],
    siNo: 'Guardar lead para seguimiento',
    siSi: 'Continuar a paso 5',
  },
  
  // Paso 5: Tipo de persona
  paso5: {
    pregunta: '¿Eres persona natural o jurídica (empresa)?',
    opciones: ['Persona Natural', 'Persona Jurídica'],
  },
  
  // Paso 6: Emitir (campos completos según producto y tipo persona)
  paso6: 'Ejecutar flujo de emisión del producto seleccionado',
  
  // Paso 7: Declaraciones (si aplica)
  paso7: 'Ejecutar declaraciones según producto (salud, actividades, etc.)',
  
  // Paso 8: Beneficiarios (si aplica)
  paso8: 'Recopilar beneficiarios si el producto lo requiere',
  
  // Paso 9: Documentos
  paso9: 'Solicitar documentos requeridos',
  
  // Paso 10: Aceptación y pago
  paso10: {
    aceptacion: 'Mostrar términos y obtener aceptación digital',
    pago: 'Procesar pago o generar link de pago',
  },
  
  // Paso 11: Confirmación
  paso11: {
    mensaje: '✅ ¡Listo! Tu póliza ha sido emitida. Te enviaremos el documento a tu correo y WhatsApp.',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTAR TODOS LOS PRODUCTOS
// ═══════════════════════════════════════════════════════════════════════════

export const PRODUCTOS_MICROSEGUROS = {
  AP: ACCIDENTES_PERSONALES,
  FUN: SERVICIO_FUNERARIO,
  VIDA: POLIZA_VIDA,
  RCV: RCV,
}

export default PRODUCTOS_MICROSEGUROS
