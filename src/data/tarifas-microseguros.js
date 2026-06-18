/**
 * TARIFAS DE MICROSEGUROS - FFC CONSULTANTS
 * 
 * Este archivo contiene las tarifas y lógica de cálculo para los 4 productos:
 * 1. Accidentes Personales
 * 2. Servicio Funerario
 * 3. Póliza de Vida
 * 4. RCV (Responsabilidad Civil Vehicular)
 * 
 * Las 4 aseguradoras tienen precios ligeramente diferentes para competitividad.
 */

// ═══════════════════════════════════════════════════════════════
// ASEGURADORAS Y SUS FACTORES DE PRECIO
// ═══════════════════════════════════════════════════════════════
export const ASEGURADORAS = {
  piramide: {
    nombre: 'Seguros Pirámide',
    emoji: '🔴',
    factor: 1.05, // 5% más caro (mejor servicio)
    color: '#E53935'
  },
  oceanica: {
    nombre: 'Oceánica de Seguros',
    emoji: '🟢',
    factor: 1.00, // Precio base
    color: '#43A047'
  },
  estar: {
    nombre: 'Estar Seguros',
    emoji: '🔵',
    factor: 0.97, // 3% más económico
    color: '#1E88E5'
  },
  real: {
    nombre: 'Real Seguros',
    emoji: '🟣',
    factor: 0.93, // 7% más económico (más barato)
    color: '#8E24AA'
  }
}

// ═══════════════════════════════════════════════════════════════
// 1. ACCIDENTES PERSONALES - TARIFAS
// ═══════════════════════════════════════════════════════════════
export const TARIFAS_AP = {
  // Tarifas base mensuales según suma asegurada (USD)
  sumaAsegurada: {
    5000: 12,    // $12/mes base
    10000: 20,   // $20/mes base
    20000: 35,   // $35/mes base
    50000: 70,   // $70/mes base
  },
  
  // Factor por tipo de plan
  tipoPlan: {
    individual: 1.0,
    familiar: 1.8,      // Hasta 4 personas
    colectivo: 0.85,    // Descuento grupal
  },
  
  // Factor por nivel de riesgo ocupacional
  riesgoOcupacional: {
    bajo: 1.0,          // Oficina, administrativo
    medio: 1.25,        // Comercio, ventas
    alto: 1.60,         // Motorizado, construcción
    muyAlto: 2.0,       // Seguridad, minería
  },
  
  // Factor por edad
  factorEdad: (edad) => {
    if (edad < 18) return 0.8;      // Menores
    if (edad <= 30) return 1.0;     // Jóvenes
    if (edad <= 45) return 1.1;     // Adultos
    if (edad <= 60) return 1.3;     // Mayores
    if (edad <= 70) return 1.6;     // Senior
    return 2.0;                      // 70+
  },
  
  // Coberturas adicionales (% sobre prima base)
  coberturas: {
    muerteAccidental: 0,      // Incluida
    invalidezPermanente: 0.15, // +15%
    gastosMedicos: 0.20,       // +20%
    todas: 0.30,               // +30% (paquete completo)
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. SERVICIO FUNERARIO - TARIFAS
// ═══════════════════════════════════════════════════════════════
export const TARIFAS_FUNERARIO = {
  // Tarifas base mensuales según cobertura (USD)
  cobertura: {
    basica: { monto: 2500, prima: 8 },    // $8/mes
    media: { monto: 3500, prima: 12 },    // $12/mes
    alta: { monto: 5000, prima: 18 },     // $18/mes
    premium: { monto: 7500, prima: 28 },  // $28/mes
  },
  
  // Factor por tipo de plan
  tipoPlan: {
    individual: 1.0,
    familiar2: 1.6,     // 2 personas
    familiar3: 2.1,     // 3 personas
    familiar4: 2.5,     // 4 personas
    familiar5plus: 3.0, // 5+ personas
  },
  
  // Factor por edad del titular
  factorEdad: (edad) => {
    if (edad < 30) return 0.85;
    if (edad <= 45) return 1.0;
    if (edad <= 60) return 1.25;
    if (edad <= 70) return 1.6;
    if (edad <= 80) return 2.2;
    return 3.0; // 80+
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. PÓLIZA DE VIDA - TARIFAS
// ═══════════════════════════════════════════════════════════════
export const TARIFAS_VIDA = {
  // Tasa anual por cada $1,000 de cobertura según edad y sexo
  // Expresado en USD por $1,000 de suma asegurada
  tasaBase: {
    // [edadMin, edadMax]: { masculino, femenino }
    '18-30': { M: 1.2, F: 0.9 },
    '31-40': { M: 1.8, F: 1.4 },
    '41-50': { M: 3.2, F: 2.4 },
    '51-60': { M: 5.5, F: 4.0 },
    '61-65': { M: 9.0, F: 6.5 },
  },
  
  // Sumas aseguradas disponibles
  sumasDisponibles: [10000, 25000, 50000, 75000, 100000],
  
  // Factor por fumador
  factorFumador: {
    si: 1.50,  // +50%
    no: 1.0,
  },
  
  // Factor por ocupación de riesgo
  factorOcupacion: {
    oficina: 1.0,
    comercio: 1.1,
    motorizado: 1.5,
    construccion: 1.6,
    seguridad: 1.8,
    mineria: 2.0,
  },
  
  // Obtener tasa según edad
  obtenerTasa: (edad, sexo) => {
    if (edad <= 30) return TARIFAS_VIDA.tasaBase['18-30'][sexo];
    if (edad <= 40) return TARIFAS_VIDA.tasaBase['31-40'][sexo];
    if (edad <= 50) return TARIFAS_VIDA.tasaBase['41-50'][sexo];
    if (edad <= 60) return TARIFAS_VIDA.tasaBase['51-60'][sexo];
    if (edad <= 65) return TARIFAS_VIDA.tasaBase['61-65'][sexo];
    return null; // Fuera de rango
  }
}

// ═══════════════════════════════════════════════════════════════
// 4. RCV - TARIFAS
// ═══════════════════════════════════════════════════════════════
export const TARIFAS_RCV = {
  // Prima anual base según tipo de vehículo (USD)
  tipoVehiculo: {
    particular: 380,
    moto: 280,
    camioneta: 420,
    rustico: 450,
    pickup: 440,
    taxi: 580,
    carga: 650,
    transporte: 750,
  },
  
  // Factor por uso
  factorUso: {
    particular: 1.0,
    comercial: 1.35,
    transporte_publico: 1.60,
    carga: 1.45,
  },
  
  // Factor por antigüedad del vehículo
  factorAntiguedad: (año) => {
    const antiguedad = new Date().getFullYear() - año;
    if (antiguedad <= 2) return 1.0;
    if (antiguedad <= 5) return 1.05;
    if (antiguedad <= 10) return 1.15;
    if (antiguedad <= 15) return 1.25;
    return 1.40; // Más de 15 años
  },
  
  // Planes disponibles
  planes: {
    basico: { factor: 1.0, incluye: ['RCV obligatorio', 'Defensa penal'] },
    excesoLimites: { factor: 1.25, incluye: ['RCV obligatorio', 'Defensa penal', 'Exceso de límites $10,000'] },
    conAsistencia: { factor: 1.35, incluye: ['RCV obligatorio', 'Defensa penal', 'Asistencia vial 24/7', 'Grúa'] },
    completo: { factor: 1.55, incluye: ['RCV obligatorio', 'Defensa penal', 'Exceso $20,000', 'Asistencia vial', 'Grúa', 'Conductor designado'] },
  }
}

// ═══════════════════════════════════════════════════════════════
// FUNCIONES DE CÁLCULO
// ═══════════════════════════════════════════════════════════════

/**
 * Calcula cotización de Accidentes Personales
 */
export function calcularAP(datos) {
  const { sumaAsegurada = 10000, tipoPlan = 'individual', riesgo = 'bajo', edad = 30, coberturas = 'muerteAccidental' } = datos;
  
  // Prima base
  let primaBase = TARIFAS_AP.sumaAsegurada[sumaAsegurada] || 20;
  
  // Aplicar factores
  primaBase *= TARIFAS_AP.tipoPlan[tipoPlan] || 1;
  primaBase *= TARIFAS_AP.riesgoOcupacional[riesgo] || 1;
  primaBase *= TARIFAS_AP.factorEdad(edad);
  primaBase *= (1 + (TARIFAS_AP.coberturas[coberturas] || 0));
  
  return generarComparativa(primaBase);
}

/**
 * Calcula cotización de Servicio Funerario
 */
export function calcularFunerario(datos) {
  const { cobertura = 'basica', tipoPlan = 'individual', edadTitular = 40 } = datos;
  
  // Prima base
  let primaBase = TARIFAS_FUNERARIO.cobertura[cobertura]?.prima || 12;
  
  // Aplicar factores
  primaBase *= TARIFAS_FUNERARIO.tipoPlan[tipoPlan] || 1;
  primaBase *= TARIFAS_FUNERARIO.factorEdad(edadTitular);
  
  return generarComparativa(primaBase);
}

/**
 * Calcula cotización de Póliza de Vida
 */
export function calcularVida(datos) {
  const { sumaAsegurada = 25000, edad = 35, sexo = 'M', fumador = 'no', ocupacion = 'oficina' } = datos;
  
  // Obtener tasa base
  const tasaBase = TARIFAS_VIDA.obtenerTasa(edad, sexo);
  if (!tasaBase) return null; // Fuera de rango de edad
  
  // Calcular prima anual
  let primaAnual = (sumaAsegurada / 1000) * tasaBase;
  
  // Aplicar factores
  primaAnual *= TARIFAS_VIDA.factorFumador[fumador] || 1;
  primaAnual *= TARIFAS_VIDA.factorOcupacion[ocupacion] || 1;
  
  // Convertir a mensual
  const primaMensual = primaAnual / 12;
  
  return generarComparativa(primaMensual);
}

/**
 * Calcula cotización de RCV
 */
export function calcularRCV(datos) {
  const { tipoVehiculo = 'particular', uso = 'particular', añoVehiculo = 2020, plan = 'basico' } = datos;
  
  // Prima base anual
  let primaAnual = TARIFAS_RCV.tipoVehiculo[tipoVehiculo] || 380;
  
  // Aplicar factores
  primaAnual *= TARIFAS_RCV.factorUso[uso] || 1;
  primaAnual *= TARIFAS_RCV.factorAntiguedad(añoVehiculo);
  primaAnual *= TARIFAS_RCV.planes[plan]?.factor || 1;
  
  // Convertir a mensual
  const primaMensual = primaAnual / 12;
  
  return generarComparativa(primaMensual);
}

/**
 * Genera tabla comparativa con las 4 aseguradoras
 */
function generarComparativa(primaMensualBase) {
  const resultado = {};
  
  for (const [key, aseg] of Object.entries(ASEGURADORAS)) {
    const mensual = primaMensualBase * aseg.factor;
    const anual = mensual * 12;
    
    resultado[key] = {
      nombre: aseg.nombre,
      emoji: aseg.emoji,
      mensual: Math.round(mensual * 100) / 100,
      anual: Math.round(anual * 100) / 100,
    };
  }
  
  return resultado;
}

/**
 * Formatea la comparativa como tabla Markdown
 */
export function formatearTablaComparativa(comparativa, producto) {
  const emojis = {
    ap: '🛡️',
    funerario: '⚱️',
    vida: '💚',
    rcv: '🚗'
  };
  
  let tabla = `💰 **COTIZACIÓN ${producto.toUpperCase()} - COMPARATIVA**\n\n`;
  tabla += `| Aseguradora | Mensual | Anual |\n`;
  tabla += `|-------------|---------|-------|\n`;
  
  for (const [key, datos] of Object.entries(comparativa)) {
    tabla += `| ${datos.emoji} **${datos.nombre}** | $${datos.mensual.toFixed(2)}/mes | $${datos.anual.toFixed(2)}/año |\n`;
  }
  
  tabla += `\n✅ Todas las opciones incluyen cobertura completa\n\n`;
  tabla += `¿Con cuál aseguradora deseas continuar? [Pirámide] [Oceánica] [Estar] [Real]`;
  
  return tabla;
}

// ═══════════════════════════════════════════════════════════════
// EXPORTAR PARA USO EN EL CHATBOT
// ═══════════════════════════════════════════════════════════════
export default {
  ASEGURADORAS,
  TARIFAS_AP,
  TARIFAS_FUNERARIO,
  TARIFAS_VIDA,
  TARIFAS_RCV,
  calcularAP,
  calcularFunerario,
  calcularVida,
  calcularRCV,
  formatearTablaComparativa,
}
