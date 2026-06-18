/**
 * RAMO: PERSONAS
 * Productos:
 *   - Accidentes Personales (AP)
 *   - Pólizas de Vida
 *   - Servicio Funerario
 *   - Seguro de Salud / HCM (queda dentro de este ramo por su naturaleza)
 *
 * Este archivo contiene TODA la base de conocimiento específica del ramo de personas.
 */

export const ID = 'personas'
export const NOMBRE = 'Personas'
export const EMOJI = '👨‍👩‍👧'

// ==========================================
// PRODUCTOS Y COBERTURAS
// ==========================================

export const productos = {
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
  accidentesPersonales: {
    nombre: 'Accidentes Personales',
    emoji: '🛡️',
    descripcion: 'Cobertura ante accidentes (muerte accidental, invalidez, gastos médicos)',
  },
  funerario: {
    nombre: 'Servicio Funerario',
    emoji: '⚱️',
    descripcion: 'Cobertura de gastos funerarios para titular y familiares',
  },
}

// ==========================================
// REQUISITOS DE EMISIÓN
// ==========================================

export const requisitosEmision = {
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
}

// ==========================================
// FLUJO DE COTIZACIÓN
// ==========================================

export const flujoCotizacion = {
  // SEGURO DE SALUD/ACCIDENTES (Seguros Caracas - flujo extendido)
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
      ],
    },
    seccion2_direccion: {
      titulo: 'Dirección de Habitación',
      campos: [
        { campo: 'estado', pregunta: '¿En qué estado de Venezuela vives?', tipo: 'texto' },
        { campo: 'ciudad', pregunta: '¿En qué ciudad?', tipo: 'texto' },
        { campo: 'direccionCompleta', pregunta: 'Dame tu dirección completa', tipo: 'texto' },
      ],
    },
    seccion3_vigencia: {
      titulo: 'Vigencia y Pago',
      campos: [
        { campo: 'frecuenciaPago', pregunta: '¿Cómo prefieres pagar la prima?', tipo: 'opciones', opciones: ['Anual', 'Semestral', 'Trimestral'] },
      ],
    },
    seccion4_inscritos: {
      titulo: 'Personas a Asegurar',
      campos: [
        { campo: 'cantidadInscritos', pregunta: '¿Cuántas personas deseas asegurar (incluyéndote)?', tipo: 'numero' },
        { campo: 'datosInscritos', pregunta: 'Por cada persona, necesitaré: nombre, fecha de nacimiento, cédula, peso, estatura, sexo y parentesco contigo.', tipo: 'multiple' },
      ],
    },
    seccion5_coberturas: {
      titulo: 'Coberturas Solicitadas',
      campos: [
        { campo: 'muerteAccidental', pregunta: '¿Deseas cobertura por Muerte Accidental?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'invalidezPermanente', pregunta: '¿Deseas cobertura por Invalidez Permanente?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'gastosMedicos', pregunta: '¿Deseas cobertura de Gastos Médicos?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'gastosEntierro', pregunta: '¿Deseas cobertura de Gastos de Entierro?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'incapacidadTemporal', pregunta: '¿Deseas cobertura por Incapacidad Temporal?', tipo: 'binario', opciones: ['Sí', 'No'] },
      ],
    },
    seccion6_beneficiarios: {
      titulo: 'Beneficiarios',
      campos: [
        { campo: 'tieneBeneficiarios', pregunta: '¿Deseas agregar beneficiarios en caso de fallecimiento?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'datosBeneficiarios', pregunta: 'Por cada beneficiario, necesitaré: nombre, cédula, parentesco y porcentaje de participación.', tipo: 'multiple', condicion: 'si tiene beneficiarios' },
      ],
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
      ],
    },
  },

  // SEGURO DE VIDA (simplificado)
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
}

// ==========================================
// FAQs ESPECÍFICAS DEL RAMO PERSONAS
// ==========================================

export const faqs = [
  {
    pregunta: '¿Qué cubre el HCM?',
    respuesta: 'HCM significa Hospitalización, Cirugía y Maternidad. Cubre gastos médicos por hospitalización, cirugías programadas y de emergencia, y atención de maternidad (con periodo de espera).',
  },
  {
    pregunta: '¿Qué son las preexistencias?',
    respuesta: 'Son condiciones médicas que ya tenías antes de contratar el seguro. Pueden estar excluidas de cobertura o tener un periodo de espera especial.',
  },
]

// ==========================================
// PROMPT SEGMENTADO DEL RAMO
// ==========================================

export const promptSegmento = `# 👨‍👩‍👧 RAMO ACTIVO: PERSONAS

El cliente está cotizando un seguro del ramo de **personas** (Accidentes Personales, Vida, Servicio Funerario o HCM).
SOLO trabaja temas de este ramo en esta conversación.
Si el cliente pregunta por seguros de auto/RCV o patrimoniales (hogar), indícale amablemente que para ese tipo de seguro debe iniciar una nueva conversación seleccionando el ramo correspondiente.

## PRODUCTOS DISPONIBLES EN ESTE RAMO
1. 🛡️ **Accidentes Personales (AP)** — Cobertura ante accidentes
2. ⚱️ **Servicio Funerario** — Cobertura de gastos funerarios
3. 💚 **Póliza de Vida** — Protección financiera por fallecimiento
4. 🏥 **HCM** — Hospitalización, Cirugía y Maternidad

**ASEGURADORAS:** Seguros Pirámide, Oceánica de Seguros, Real Seguros, Estar Seguros

---

## 🛡️ FLUJO 1: ACCIDENTES PERSONALES

### ETAPA 1: COTIZAR (7 campos mínimos)
1. "¿Es para una persona o para un grupo/empresa?" [Individual] [Colectivo/Grupo]
2. "¿Cuál es tu fecha de nacimiento?"
3. "¿A qué te dedicas? (ocupación)"
4. "¿Cuál es tu nivel de riesgo laboral?" [Oficina/Administrativo] [Comercio/Ventas] [Motorizado] [Construcción] [Seguridad] [Otro]
5. "¿Qué monto de protección deseas?" [USD 5,000] [USD 10,000] [USD 20,000] [Otro]
6. "¿Qué coberturas te interesan?" [Muerte accidental] [Invalidez permanente] [Gastos médicos] [Todas]
7. "¿En qué estado resides?"

**→ MOSTRAR COMPARATIVA DE PRECIOS (4 ASEGURADORAS)**

### ETAPA 2: EMITIR (solo si acepta)
- Datos completos del tomador (nombre, cédula, dirección, teléfono, email)
- Datos del asegurado (si es diferente al tomador)
- Beneficiarios (nombre, cédula, parentesco, porcentaje) - solo si incluye muerte accidental
- **Declaración simple:** "¿Realizas actividades de alto riesgo como motorizado profesional, construcción, minería, seguridad armada, deportes extremos o maquinaria pesada?" [Sí] [No]
- **MENSAJE FINAL:** "✅ ¡Excelente! Hemos recibido toda tu información. Un asesor de ventas te contactará en las próximas 5 horas para coordinar el pago y finalizar la emisión de tu póliza. ¡Gracias por confiar en nosotros!"

**❌ NO PEDIR:** Historia médica, médicos tratantes, clínicas, peso/talla, exámenes
**❌ NO ACEPTAR PAGOS:** El chatbot NO procesa pagos. Solo recopila información.

---

## ⚱️ FLUJO 2: SERVICIO FUNERARIO

### ETAPA 1: COTIZAR (6 campos mínimos)
1. "¿Deseas plan individual o familiar?" [Individual] [Familiar]
2. "¿Cuál es tu fecha de nacimiento?"
3. (Si familiar) "¿Cuántas personas deseas incluir?"
4. (Si familiar) "¿Qué edad y parentesco tiene cada uno?"
5. "¿Qué tipo de cobertura prefieres?" [Básica ($2,500)] [Media ($3,000)] [Alta ($4,000)]
6. "¿En qué estado residen?"

**→ MOSTRAR COMPARATIVA DE PRECIOS (4 ASEGURADORAS)**

### ETAPA 2: EMITIR (solo si acepta)
- Datos del titular (nombre, cédula, fecha nacimiento, dirección, teléfono, email)
- Lista de familiares (nombre, cédula, fecha nacimiento, parentesco)
- **Validación simple:** "¿Alguna persona está hospitalizada, en estado crítico o con enfermedad terminal?" [No] [Sí]
- ⚠️ Plazo de espera: 3 meses (excepto muerte accidental)
- **MENSAJE FINAL:** "✅ ¡Excelente! Hemos recibido toda tu información. Un asesor de ventas te contactará en las próximas 5 horas para coordinar el pago y finalizar la emisión de tu póliza. ¡Gracias por confiar en nosotros!"

**❌ NO PEDIR:** Historia clínica, enfermedades detalladas, médico tratante, exámenes
**❌ NO ACEPTAR PAGOS:** El chatbot NO procesa pagos. Solo recopila información.

---

## 💚 FLUJO 3: PÓLIZA DE VIDA

### ETAPA 1: COTIZAR (7 campos mínimos)
1. "¿Es seguro individual o colectivo?" [Individual] [Colectivo/Grupo]
2. "¿Cuál es tu fecha de nacimiento?"
3. "¿Cuál es tu sexo?" [Masculino] [Femenino]
4. "¿Fumas actualmente?" [Sí] [No]
5. "¿A qué te dedicas? (ocupación)"
6. "¿Qué monto deseas dejar protegido?" [USD 10,000] [USD 25,000] [USD 50,000] [Otro]
7. "¿Por cuánto tiempo?" [1 año (renovable)] [Temporal 5-10 años]

**→ MOSTRAR COMPARATIVA DE PRECIOS (4 ASEGURADORAS)**

### ETAPA 2: EMITIR (solo si acepta)
- Datos completos del asegurado
- Beneficiarios OBLIGATORIOS (nombre, cédula, parentesco, porcentaje = 100%)
- **Declaración simple de salud (6 preguntas Sí/No):**
  1. ¿Te encuentras hospitalizado actualmente?
  2. ¿Has sido diagnosticado con cáncer, infarto, ACV, insuficiencia renal, VIH, enfermedad terminal?
  3. ¿Tienes cirugía programada?
  4. ¿Recibes tratamiento médico permanente?
  5. ¿Fumas actualmente?
  6. ¿Practicas deportes extremos o actividades de alto riesgo?
- ⚠️ Si responde SÍ a alguna → "Requiere revisión manual antes de emitir"
- **MENSAJE FINAL:** "✅ ¡Excelente! Hemos recibido toda tu información. Un asesor de ventas te contactará en las próximas 5 horas para coordinar el pago y finalizar la emisión de tu póliza. ¡Gracias por confiar en nosotros!"

**❌ NO PEDIR:** Historia médica HCM, médicos tratantes, clínicas, exámenes, historial familiar
**❌ NO ACEPTAR PAGOS:** El chatbot NO procesa pagos. Solo recopila información.

---

## 🏥 FLUJO 4: HCM (Hospitalización, Cirugía y Maternidad)

Para HCM se aplica el flujo de cotización extendido tipo Seguros Caracas.
Hay un cuestionario de salud obligatorio. Periodo de espera: 30 días (enfermedades) y 10 meses (maternidad).

---

## 💰 SISTEMA DE TARIFAS - CÁLCULO AUTOMÁTICO (PERSONAS)

### 🛡️ ACCIDENTES PERSONALES - CÓMO CALCULAR

**PASO 1: Prima base según suma asegurada**
| Suma Asegurada | Prima Base/mes |
|----------------|----------------|
| $5,000 | $4 |
| $10,000 | $8 |
| $20,000 | $15 |
| $50,000 | $25 |

**PASO 2: Multiplicar por factor de plan**
- Individual: ×1.0
- Familiar (hasta 4): ×1.8
- Colectivo/Grupo: ×0.85

**PASO 3: Multiplicar por factor de riesgo ocupacional**
- Oficina/Administrativo: ×1.0
- Comercio/Ventas: ×1.25
- Motorizado: ×1.60
- Construcción/Seguridad: ×2.0

**PASO 4: Multiplicar por factor de edad**
- 18-30 años: ×1.0
- 31-45 años: ×1.1
- 46-60 años: ×1.3
- 61-70 años: ×1.6
- 70+ años: ×2.0

**PASO 5: Coberturas adicionales**
- Solo muerte accidental: +0%
- + Invalidez: +15%
- + Gastos médicos: +20%
- Paquete completo: +30%

**EJEMPLO:** Persona 35 años, oficina, $10,000, individual, paquete completo
$8 × 1.0 × 1.0 × 1.1 × 1.30 = **$11.44/mes base**
- Pirámide: $12.01 | Oceánica: $11.44 | Estar: $11.10 | Real: $10.64

---

### ⚱️ SERVICIO FUNERARIO - CÓMO CALCULAR

**PASO 1: Prima base según cobertura**
| Cobertura | Monto | Prima Base/mes |
|-----------|-------|----------------|
| Básica | $2,500 | $2 |
| Media | $3,500 | $4 |
| Alta | $5,000 | $6 |
| Premium | $7,500 | $8 |

**PASO 2: Factor por tipo de plan**
- Individual: ×1.0
- Familiar 2 personas: ×1.6
- Familiar 3 personas: ×2.1
- Familiar 4 personas: ×2.5
- Familiar 5+ personas: ×3.0

**PASO 3: Factor por edad del titular**
- Menor de 30: ×0.85
- 30-45 años: ×1.0
- 46-60 años: ×1.25
- 61-70 años: ×1.6
- 71-80 años: ×2.2

**EJEMPLO:** Titular 50 años, cobertura Alta, familiar 3 personas
$6 × 2.1 × 1.25 = **$15.75/mes base**

---

### 💚 PÓLIZA DE VIDA - CÓMO CALCULAR

**PASO 1: Tasa anual por cada $1,000 de cobertura**
| Edad | Masculino | Femenino |
|------|-----------|----------|
| 18-30 | $1.20 | $0.90 |
| 31-40 | $1.80 | $1.40 |
| 41-50 | $3.20 | $2.40 |
| 51-60 | $5.50 | $4.00 |
| 61-65 | $9.00 | $6.50 |

**PASO 2: Calcular prima anual**
Prima = (Suma asegurada ÷ 1000) × Tasa

**PASO 3: Factor fumador**
- No fuma: ×1.0
- Sí fuma: ×1.5

**PASO 4: Factor ocupación**
- Oficina: ×1.0
- Motorizado: ×1.5
- Construcción: ×1.6
- Seguridad: ×1.8

**EJEMPLO:** Hombre 40 años, no fumador, oficina, $25,000
Prima anual = (25,000 ÷ 1000) × $1.80 = $45/año
Mensual = $45 ÷ 12 = **$3.75/mes base**

---

## 💰 PRECIOS DE REFERENCIA

### 🛡️ ACCIDENTES PERSONALES
- Individual básico: $4-10/mes
- Individual completo: $10-20/mes
- Familiar (2-4 personas): $15-30/mes

### ⚱️ SERVICIO FUNERARIO
- Individual Básico ($2,500): $2-4/mes
- Individual Alta ($4,000): $4-6/mes
- Familiar (hasta 4): $8-15/mes

### 💚 PÓLIZA DE VIDA
- $10,000 cobertura: $3-8/mes
- $25,000 cobertura: $5-12/mes
- $50,000 cobertura: $10-20/mes

---

## 🚫 VIGENCIA DE PÓLIZA - MICROSEGUROS (AP, VIDA, FUNERARIO)
🚫 **NO PREGUNTAR en Accidentes Personales, Póliza de Vida ni Servicio Funerario:**
- ❌ "¿Cuál es la fecha de inicio de la póliza?" - NO PREGUNTAR
- ❌ "¿Cuál es la fecha de fin de la póliza?" - NO PREGUNTAR

✅ **SÍ PREGUNTAR:**
- ✅ "¿Con qué frecuencia deseas realizar el pago?" [Anual] [Semestral] [Trimestral] [Mensual]

**La vigencia se calcula automáticamente según la frecuencia de pago seleccionada.**

---

## 📋 FAQs DE PERSONAS
${faqs.map(f => `**${f.pregunta}**\n${f.respuesta}`).join('\n\n')}
`
