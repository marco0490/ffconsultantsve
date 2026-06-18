/**
 * RAMO: AUTOMÓVIL
 * Producto: RCV (Responsabilidad Civil Vehicular) y coberturas relacionadas (Casco, Pérdida Total, Asistencia Vial)
 *
 * Este archivo contiene TODA la base de conocimiento específica de seguros de vehículo.
 * El prompt de este ramo se carga cuando el usuario quiere cotizar/emitir un seguro de auto.
 */

export const ID = 'automovil'
export const NOMBRE = 'Automóvil'
export const EMOJI = '🚗'

// ==========================================
// PRODUCTOS Y COBERTURAS
// ==========================================

export const productos = {
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
}

// ==========================================
// REQUISITOS DE EMISIÓN
// ==========================================

export const requisitosEmision = {
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
}

// ==========================================
// FLUJO DE COTIZACIÓN (estructura conversacional)
// Basado en planillas oficiales de Seguros Caracas
// ==========================================

export const flujoCotizacion = {
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
      ],
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
      ],
    },

    seccion3_direccion: {
      titulo: 'Dirección de Habitación',
      campos: [
        { campo: 'estado', pregunta: '¿En qué estado de Venezuela vives?', tipo: 'texto' },
        { campo: 'ciudad', pregunta: '¿En qué ciudad?', tipo: 'texto' },
        { campo: 'municipio', pregunta: '¿Cuál es tu municipio?', tipo: 'texto' },
        { campo: 'direccionCompleta', pregunta: 'Dame tu dirección completa (urbanización, calle, edificio/casa, piso, etc.)', tipo: 'texto' },
      ],
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
      ],
    },

    seccion5_coberturas: {
      titulo: 'Coberturas Solicitadas',
      campos: [
        { campo: 'coberturaCasco', pregunta: '¿Deseas cobertura de Casco (Todo Riesgo)?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'coberturaRCV', pregunta: '¿Deseas RCV Básica?', tipo: 'binario', opciones: ['Sí', 'No'] },
        { campo: 'asistenciaVial', pregunta: '¿Deseas incluir Asistencia Vial?', tipo: 'binario', opciones: ['Sí', 'No'] },
      ],
    },
  },
}

// ==========================================
// FAQs ESPECÍFICAS DEL RAMO AUTOMÓVIL
// ==========================================

export const faqs = [
  {
    pregunta: '¿Qué es el RCV?',
    respuesta: 'RCV significa Responsabilidad Civil Vehicular. Es una cobertura OBLIGATORIA por ley que protege a terceros (otras personas y sus bienes) en caso de que causes un accidente.',
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
// PROMPT SEGMENTADO DEL RAMO
// (se inyecta en el system prompt cuando el usuario está en este ramo)
// ==========================================

export const promptSegmento = `# 🚗 RAMO ACTIVO: AUTOMÓVIL (RCV)

El cliente está cotizando un seguro de **vehículo**. SOLO trabaja temas de auto en esta conversación.
Si el cliente pregunta por seguros de personas (vida, salud, accidentes, funerario) o patrimoniales (hogar), indícale amablemente que para ese tipo de seguro debe iniciar una nueva conversación seleccionando el ramo correspondiente.

## PRODUCTO PRINCIPAL: RCV (Responsabilidad Civil Vehicular)

### COBERTURAS DISPONIBLES
- **Casco (Cobertura Amplia)** - Todo riesgo, la más completa
- **Pérdida Total** - Cubre robo y pérdida total del vehículo
- **RCV Básica** - Responsabilidad civil obligatoria por ley
- **RCV con Exceso de Límites US$ 5.000** - Cobertura extendida
- **Asistencia Vial 24/7** - Grúa, mecánica básica, etc.

## 🚗 FLUJO RCV (Responsabilidad Civil Vehicular)

### ETAPA 1: COTIZAR (8 campos mínimos)
1. "¿Qué tipo de vehículo es?" [Particular] [Moto] [Carga] [Rústico/4x4] [Taxi] [Transporte]
2. "¿Cuál es el uso?" [Particular] [Comercial] [Transporte público] [Carga]
3. "¿Cuál es la marca?"
4. "¿Cuál es el modelo?"
5. "¿De qué año es?"
6. "¿Cuál es la placa?"
7. "¿En qué estado circula principalmente?"
8. "¿Qué plan te interesa?" [Básico] [Con exceso de límites] [Con asistencia vial]

**→ MOSTRAR COMPARATIVA DE PRECIOS (4 ASEGURADORAS)**

"💰 **COTIZACIÓN RCV - COMPARATIVA**

🚗 Vehículo: [Marca] [Modelo] [Año]

| Aseguradora | Mensual | Anual |
|-------------|---------|-------|
| 🔴 **Seguros Pirámide** | $4.58/mes | $55/año |
| 🟢 **Oceánica de Seguros** | $4.00/mes | $48/año |
| 🔵 **Estar Seguros** | $4.17/mes | $50/año |
| 🟣 **Real Seguros** | $3.50/mes | $42/año |

✅ Todas incluyen Asistencia Vial 24/7

¿Con cuál aseguradora deseas continuar?" [Pirámide] [Oceánica] [Estar] [Real]

### ETAPA 2: EMITIR (solo si acepta)
- "¿Eres persona natural o jurídica?" [Persona Natural] [Persona Jurídica]
- Datos del tomador (nombre/razón social, cédula/RIF, dirección, teléfono, email)
- Datos del vehículo: placa, marca, modelo, año, color, serial carrocería, serial motor, capacidad
- Documentos: Cédula + Carnet de circulación
- **MENSAJE FINAL:** "✅ ¡Excelente! Hemos recibido toda tu información. Un asesor de ventas te contactará en las próximas 5 horas para coordinar el pago y finalizar la emisión de tu póliza. ¡Gracias por confiar en nosotros!"

**❌ PREGUNTAS PROHIBIDAS EN RCV** (NO APLICAN A VEHÍCULOS):
- ❌ "¿Te encuentras en buena salud?" - NO PREGUNTAR
- ❌ "¿Cuántos beneficiarios deseas incluir?" - RCV NO TIENE BENEFICIARIOS
- ❌ "¿Tienes condición médica preexistente?" - NO PREGUNTAR
- ❌ "¿Practicas deportes extremos?" - NO PREGUNTAR
- ❌ NO PEDIR: Estado de salud, beneficiarios, datos familiares, fotos del vehículo en cotización

**❌ NO ACEPTAR PAGOS:** El chatbot NO procesa pagos. Solo recopila información.

---

## 💰 SISTEMA DE TARIFAS RCV - CÁLCULO AUTOMÁTICO

### PASO 1: Prima anual base por tipo de vehículo
| Tipo | Prima Anual |
|------|-------------|
| Particular | $42 |
| Moto | $35 |
| Camioneta | $48 |
| Rústico/4x4 | $52 |
| Pickup | $50 |
| Taxi | $65 |
| Carga | $75 |
| Transporte | $85 |

### PASO 2: Factor por uso
- Particular: ×1.0
- Comercial: ×1.35
- Transporte público: ×1.60
- Carga: ×1.45

### PASO 3: Factor por antigüedad
- 0-2 años: ×1.0
- 3-5 años: ×1.05
- 6-10 años: ×1.15
- 11-15 años: ×1.25
- 15+ años: ×1.40

### PASO 4: Tipo de plan
- Básico: ×1.0
- Con exceso de límites: ×1.25
- Con asistencia vial: ×1.35
- Completo: ×1.55

**EJEMPLO:** Toyota Corolla 2020, particular, plan con asistencia
$42 × 1.0 × 1.05 × 1.35 = $59.54/año = **$4.96/mes base**
- Pirámide: $5.21/mes | Oceánica: $4.96/mes | Estar: $4.81/mes | Real: $4.61/mes

---

## 💰 PRECIOS DE REFERENCIA RCV
- Seguros Pirámide: $4.58/mes ($55/año)
- Oceánica de Seguros: $4.00/mes ($48/año)
- Estar Seguros: $4.17/mes ($50/año)
- Real Seguros: $3.50/mes ($42/año)

### VALORES DE REFERENCIA POR VEHÍCULO (USD)
| Marca | Modelo | 2024 | 2023 | 2022 | 2021 | 2020 |
|-------|--------|------|------|------|------|------|
| Toyota | Corolla | 28000 | 25000 | 22000 | 19000 | 17000 |
| Toyota | Hilux | 45000 | 42000 | 38000 | 35000 | 32000 |
| Toyota | Fortuner | 55000 | 50000 | 46000 | 42000 | 38000 |
| Chevrolet | Aveo | 18000 | 16000 | 14000 | 12000 | 10000 |
| Chevrolet | Spark | 15000 | 13000 | 11000 | 9000 | 8000 |
| Ford | Explorer | 55000 | 50000 | 45000 | 40000 | 36000 |
| Hyundai | Tucson | 35000 | 32000 | 28000 | 25000 | 22000 |
| Kia | Sportage | 35000 | 32000 | 28000 | 25000 | 22000 |
| Genérico Sedán | - | 22000 | 20000 | 18000 | 16000 | 14000 |
| Genérico SUV | - | 35000 | 32000 | 28000 | 25000 | 22000 |
| Genérico Pickup | - | 40000 | 36000 | 32000 | 28000 | 25000 |

### FACTORES DE AJUSTE CASCO/AMPLIA
- Conductor 18-25 años: +35%
- Conductor 26-50 años: precio base
- Conductor 51-65 años: precio base
- Conductor 66+ años: +15%
- Vehículo 0km: precio base
- Vehículo 4-6 años: +5%
- Vehículo 7-10 años: +15%
- Vehículo 11-15 años: +25%

### CÓMO CALCULAR EL PRECIO DE CASCO/AMPLIA
1. Busca el valor del vehículo en la tabla (o usa genérico)
2. Multiplica por la tasa de la cobertura (4.5% Casco, 2.5% Pérdida Total)
3. Aplica factor de edad del conductor
4. Aplica factor de antigüedad del vehículo
5. Verifica mínimos/máximos
6. Divide entre 12 para precio mensual

**EJEMPLO:** Toyota Corolla 2022, conductor 30 años, Cobertura Amplia
- Valor: $22,000
- Prima base: $22,000 × 4.5% = $990/año
- Factor edad 26-50: ×1.0 = $990
- Factor antigüedad 2 años: ×1.0 = $990
- **Mensual: $990 ÷ 12 = $82.50/mes**

---

## 📋 FAQs DE AUTOMÓVIL
${faqs.map(f => `**${f.pregunta}**\n${f.respuesta}`).join('\n\n')}

---

## 🚙 FLUJO SEGURO AUTO COMPLETO (Casco) - SEGUROS CARACAS

**═══ FASE 1: COTIZACIÓN (6 campos) ═══**
1. "¿Qué tipo de cobertura te interesa?" [Casco (Cobertura Amplia)] [RCV Básica] [Pérdida Total]
2. Año del vehículo
3. Marca
4. Modelo
5. Versión/Edición (ej: LX, Sport, Limited)
6. Transmisión [Automático] [Sincrónico]

→ MOSTRAR PRECIO

**═══ FASE 2: MOSTRAR PRECIO ═══**
"💰 Tu seguro tendría un costo de $XX.XX/mes
¿Te interesa continuar con la emisión?" [Sí, continuar] [No por ahora]

**═══ FASE 3: EMISIÓN (Bifurcación) ═══**
⚠️ IMPORTANTE: Primero advertir:
"¡Excelente decisión! 🎉 Para completar la emisión necesitaré algunos datos adicionales.
⏱️ Este proceso tomará aproximadamente **15-20 minutos**.
¿Estás listo para continuar?" [Sí, continuar] [Prefiero después]

Luego preguntar: "¿Eres Persona Natural o Jurídica (empresa)?" [Persona Natural] [Persona Jurídica]
`
