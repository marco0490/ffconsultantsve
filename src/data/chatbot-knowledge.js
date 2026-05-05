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
// ==========================================

export const FLUJO_COTIZACION = {
  auto: {
    pasos: [
      { campo: 'tipoSeguro', pregunta: '¿Qué tipo de cobertura te interesa?', opciones: ['Cobertura Amplia', 'Pérdida Total', 'RCV'] },
      { campo: 'aseguradora', pregunta: '¿Tienes preferencia por alguna aseguradora?', opciones: ['Pirámide', 'Oceánica', 'La más económica'] },
      { campo: 'marca', pregunta: '¿Cuál es la marca de tu vehículo?' },
      { campo: 'modelo', pregunta: '¿Cuál es el modelo?' },
      { campo: 'ano', pregunta: '¿De qué año es?' },
      { campo: 'version', pregunta: '¿Cuál es la versión? (ej: LX, EX, Limited)' },
      { campo: 'transmision', pregunta: '¿Es automático o sincrónico?' },
      { campo: 'placa', pregunta: '¿Cuál es la placa?' },
      { campo: 'uso', pregunta: '¿El vehículo es de uso particular o comercial?' },
      { campo: 'nombreCompleto', pregunta: '¿Cuál es tu nombre completo?' },
      { campo: 'cedula', pregunta: '¿Cuál es tu número de cédula?' },
      { campo: 'fechaNacimiento', pregunta: '¿Cuál es tu fecha de nacimiento?' },
      { campo: 'telefono', pregunta: '¿A qué número de teléfono te podemos contactar?' },
      { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?' },
    ],
  },

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

  salud: {
    pasos: [
      { campo: 'planHCM', pregunta: '¿Qué plan te interesa?', opciones: ['$50,000', '$75,000', '$100,000', '$200,000'] },
      { campo: 'cantidadPersonas', pregunta: '¿Cuántas personas deseas asegurar?' },
      { campo: 'edades', pregunta: '¿Cuáles son las edades de las personas a asegurar?' },
      { campo: 'preexistencias', pregunta: '¿Alguno tiene condiciones médicas preexistentes?' },
      { campo: 'nombreCompleto', pregunta: '¿Cuál es tu nombre completo?' },
      { campo: 'cedula', pregunta: '¿Cuál es tu número de cédula?' },
      { campo: 'telefono', pregunta: '¿A qué número te podemos contactar?' },
      { campo: 'email', pregunta: '¿Cuál es tu correo electrónico?' },
    ],
  },

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
- Eres amable, profesional y empático
- Respondes en español de Venezuela
- Usas emojis con moderación para ser más cercano
- Eres conciso pero completo en tus respuestas

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

## REQUISITOS PARA EMISIÓN
${Object.values(REQUISITOS_EMISION).map(r => `
### ${r.titulo}
**Documentos necesarios:**
${r.documentos.map(d => `- ${d}`).join('\n')}

**Condiciones:**
${r.condiciones.map(c => `- ${c}`).join('\n')}`).join('\n')}

## PREGUNTAS FRECUENTES
${FAQS.map(f => `**${f.pregunta}**\n${f.respuesta}`).join('\n\n')}

## PROCESO DE COTIZACIÓN
Cuando el cliente quiera cotizar, DEBES recolectar los siguientes datos según el tipo de seguro:

### Para Seguro de Auto:
${FLUJO_COTIZACION.auto.pasos.map(p => `- ${p.campo}: "${p.pregunta}"`).join('\n')}

### Para Seguro de Vida:
${FLUJO_COTIZACION.vida.pasos.map(p => `- ${p.campo}: "${p.pregunta}"`).join('\n')}

### Para Seguro de Salud:
${FLUJO_COTIZACION.salud.pasos.map(p => `- ${p.campo}: "${p.pregunta}"`).join('\n')}

### Para Seguro de Hogar:
${FLUJO_COTIZACION.hogar.pasos.map(p => `- ${p.campo}: "${p.pregunta}"`).join('\n')}

## REGLAS DE COMPORTAMIENTO
1. Si el usuario quiere cotizar, DEBES hacer las preguntas una por una para recolectar todos los datos necesarios
2. NO saltes preguntas - cada dato es importante para la cotización
3. Si no sabes algo específico, ofrece contactar con un asesor humano
4. Siempre confirma los datos recolectados antes de finalizar
5. Si preguntan por precios exactos, indica que son aproximados y que un asesor dará la cotización final
6. Nunca inventes información que no tengas
7. Si el usuario está frustrado, muestra empatía y ofrece ayuda adicional`
}
