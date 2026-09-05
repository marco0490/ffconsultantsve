// PENDIENTE: tarifas DEMO — reemplazar por tarifas reales cuando las entreguen las aseguradoras
// ═══════════════════════════════════════════════════════════════════════════
// TARIFAS DE SEGUROS - BASE DE DATOS DE PRECIOS
// Última actualización: Mayo 2024
// ═══════════════════════════════════════════════════════════════════════════
// 
// INSTRUCCIONES PARA ACTUALIZAR:
// 1. Modificar los valores según las tarifas vigentes de cada aseguradora
// 2. Los precios están en USD
// 3. Las tasas son ANUALES (se dividen entre 12 para mostrar mensual)
// ═══════════════════════════════════════════════════════════════════════════

export const TARIFAS_AUTO = {
  // ═══════════════════════════════════════════════════════════════════════
  // SEGUROS CARACAS - AUTO (DEMO)
  // ═══════════════════════════════════════════════════════════════════════
  caracas: {
    nombre: "Seguros Caracas",
    vigente: true,
    ultimaActualizacion: "2024-05-01",
    coberturas: {
      rcv: {
        nombre: "RCV Básica",
        precioAnual: 52, // $52/año - DEMO, base de la escala re-anclada (Caracas = 1.00)
        incluyeAsistenciaVial: true,
      },
      cobertura_amplia: {
        nombre: "Cobertura Amplia",
        tasaAnual: 0.045,
        tasaMinima: 600,
        tasaMaxima: 3000,
      },
      perdida_total: {
        nombre: "Pérdida Total",
        tasaAnual: 0.025,
        tasaMinima: 350,
        tasaMaxima: 1500,
      }
    },
    factoresEdad: {
      "18-25": 1.35,
      "26-35": 1.00,
      "36-50": 0.95,
      "51-65": 1.00,
      "66+": 1.15,
    },
    factoresAntiguedad: {
      "0km": 1.00,
      "1-3": 1.00,
      "4-6": 1.05,
      "7-10": 1.15,
      "11-15": 1.25,
      "16+": 1.40,
    },
  },

  /* Estructura original de Seguros Caracas archivada como referencia (no usar):
  segurosCaracas: {
    nombre: "Seguros Caracas",
    vigente: true,
    ultimaActualizacion: "2024-05-01",
    
    // Coberturas disponibles
    coberturas: {
      // RCV - Responsabilidad Civil de Vehículos
      rcv: {
        nombre: "RCV Básica",
        descripcion: "Cobertura de daños a terceros",
        precioAnual: 420, // USD
        incluyeAsistenciaVial: true,
        incluyeDefensaLegal: true,
        limiteCobertura: 50000, // USD
      },
      
      // Cobertura Amplia (Casco)
      cobertura_amplia: {
        nombre: "Cobertura Amplia (Casco)",
        descripcion: "Protección total para tu vehículo",
        // La prima se calcula como % del valor del vehículo
        tasaAnual: 0.045, // 4.5% del valor del vehículo
        tasaMinima: 600, // Prima mínima anual
        tasaMaxima: 3000, // Prima máxima anual
        incluyeRCV: true,
        incluyeAsistenciaVial: true,
        incluyeDefensaLegal: true,
        deducible: 0.01, // 1% del valor asegurado
      },
      
      // Pérdida Total
      perdida_total: {
        nombre: "Pérdida Total",
        descripcion: "Cobertura por robo o pérdida total",
        tasaAnual: 0.025, // 2.5% del valor del vehículo
        tasaMinima: 350,
        tasaMaxima: 1500,
        incluyeRCV: true,
        incluyeAsistenciaVial: true,
      }
    },
    
    // Factores de ajuste por edad del conductor
    factoresEdad: {
      "18-25": 1.35, // +35% para conductores jóvenes
      "26-35": 1.00, // Tarifa base
      "36-50": 0.95, // -5% descuento
      "51-65": 1.00, // Tarifa base
      "66+": 1.15,   // +15% para mayores
    },
    
    // Factores por antigüedad del vehículo
    factoresAntiguedad: {
      "0km": 1.00,      // Sin ajuste
      "1-3": 1.00,      // 1-3 años
      "4-6": 1.05,      // +5%
      "7-10": 1.15,     // +15%
      "11-15": 1.25,    // +25%
      "16+": 1.40,      // +40% o rechazado según cobertura
    },
    
    // Valores de referencia por marca/modelo (para cálculo de Casco)
    valoresVehiculos: {
      toyota: {
        corolla: { 2024: 28000, 2023: 25000, 2022: 22000, 2021: 19000, 2020: 17000 },
        hilux: { 2024: 45000, 2023: 42000, 2022: 38000, 2021: 35000, 2020: 32000 },
        fortuner: { 2024: 55000, 2023: 50000, 2022: 46000, 2021: 42000, 2020: 38000 },
        yaris: { 2024: 22000, 2023: 20000, 2022: 18000, 2021: 16000, 2020: 14000 },
      },
      chevrolet: {
        aveo: { 2024: 18000, 2023: 16000, 2022: 14000, 2021: 12000, 2020: 10000 },
        spark: { 2024: 15000, 2023: 13000, 2022: 11000, 2021: 9000, 2020: 8000 },
        cruze: { 2024: 25000, 2023: 22000, 2022: 20000, 2021: 18000, 2020: 16000 },
        tahoe: { 2024: 65000, 2023: 60000, 2022: 55000, 2021: 50000, 2020: 45000 },
      },
      ford: {
        fiesta: { 2024: 20000, 2023: 18000, 2022: 16000, 2021: 14000, 2020: 12000 },
        explorer: { 2024: 55000, 2023: 50000, 2022: 45000, 2021: 40000, 2020: 36000 },
        ranger: { 2024: 42000, 2023: 38000, 2022: 35000, 2021: 32000, 2020: 28000 },
        f150: { 2024: 60000, 2023: 55000, 2022: 50000, 2021: 45000, 2020: 40000 },
      },
      hyundai: {
        accent: { 2024: 20000, 2023: 18000, 2022: 16000, 2021: 14000, 2020: 12000 },
        tucson: { 2024: 35000, 2023: 32000, 2022: 28000, 2021: 25000, 2020: 22000 },
        santafe: { 2024: 45000, 2023: 40000, 2022: 36000, 2021: 32000, 2020: 28000 },
      },
      kia: {
        rio: { 2024: 19000, 2023: 17000, 2022: 15000, 2021: 13000, 2020: 11000 },
        sportage: { 2024: 35000, 2023: 32000, 2022: 28000, 2021: 25000, 2020: 22000 },
        sorento: { 2024: 45000, 2023: 40000, 2022: 36000, 2021: 32000, 2020: 28000 },
      },
      // Valor genérico si no está en la lista
      _default: {
        sedan: { 2024: 22000, 2023: 20000, 2022: 18000, 2021: 16000, 2020: 14000 },
        suv: { 2024: 35000, 2023: 32000, 2022: 28000, 2021: 25000, 2020: 22000 },
        pickup: { 2024: 40000, 2023: 36000, 2022: 32000, 2021: 28000, 2020: 25000 },
      }
    }
  }, */

  // ═══════════════════════════════════════════════════════════════════════
  // REAL SEGUROS - AUTO
  // ═══════════════════════════════════════════════════════════════════════
  real: {
    nombre: "Real Seguros",
    vigente: true,
    ultimaActualizacion: "2024-05-01",
    coberturas: {
      rcv: {
        nombre: "RCV Básica",
        precioAnual: 42, // $42/año - precio real mercado VE (más económico)
        incluyeAsistenciaVial: true,
      },
      cobertura_amplia: {
        nombre: "Cobertura Amplia",
        tasaAnual: 0.040,
        tasaMinima: 520,
        tasaMaxima: 2600,
      },
      perdida_total: {
        nombre: "Pérdida Total",
        tasaAnual: 0.022,
        tasaMinima: 300,
        tasaMaxima: 1300,
      }
    },
    factoresEdad: {
      "18-25": 1.28,
      "26-35": 1.00,
      "36-50": 0.90,
      "51-65": 1.00,
      "66+": 1.08,
    },
    factoresAntiguedad: {
      "0km": 0.92,
      "1-3": 1.00,
      "4-6": 1.04,
      "7-10": 1.10,
      "11-15": 1.18,
      "16+": 1.30,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ESTAR SEGUROS - AUTO
  // ═══════════════════════════════════════════════════════════════════════
  estar: {
    nombre: "Estar Seguros",
    vigente: true,
    ultimaActualizacion: "2024-05-01",
    coberturas: {
      rcv: {
        nombre: "RCV Básica",
        precioAnual: 50, // $50/año - precio real mercado VE
        incluyeAsistenciaVial: true,
      },
      cobertura_amplia: {
        nombre: "Cobertura Amplia",
        tasaAnual: 0.043,
        tasaMinima: 540,
        tasaMaxima: 2700,
      },
      perdida_total: {
        nombre: "Pérdida Total",
        tasaAnual: 0.023,
        tasaMinima: 310,
        tasaMaxima: 1350,
      }
    },
    factoresEdad: {
      "18-25": 1.32,
      "26-35": 1.00,
      "36-50": 0.93,
      "51-65": 1.00,
      "66+": 1.12,
    },
    factoresAntiguedad: {
      "0km": 0.95,
      "1-3": 1.00,
      "4-6": 1.06,
      "7-10": 1.14,
      "11-15": 1.24,
      "16+": 1.38,
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIÓN: Calcular cotización de auto
// ═══════════════════════════════════════════════════════════════════════════
export function calcularCotizacionAuto({
  aseguradora = 'real',
  cobertura,           // 'rcv', 'cobertura_amplia', 'perdida_total'
  marca,
  modelo,
  año,
  ceroKm,
  fechaNacimiento,     // Para calcular edad del conductor
  valorVehiculo = null // Opcional: si el usuario sabe el valor
}) {
  const tarifas = TARIFAS_AUTO[aseguradora]
  if (!tarifas || !tarifas.vigente) {
    return { error: 'Aseguradora no disponible' }
  }

  const coberturaData = tarifas.coberturas[cobertura]
  if (!coberturaData) {
    return { error: 'Cobertura no disponible' }
  }

  // Calcular edad del conductor
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  
  // Determinar rango de edad
  let rangoEdad = '26-35' // default
  if (edad >= 18 && edad <= 25) rangoEdad = '18-25'
  else if (edad >= 26 && edad <= 35) rangoEdad = '26-35'
  else if (edad >= 36 && edad <= 50) rangoEdad = '36-50'
  else if (edad >= 51 && edad <= 65) rangoEdad = '51-65'
  else if (edad > 65) rangoEdad = '66+'

  const factorEdad = tarifas.factoresEdad?.[rangoEdad] || 1.0

  // Calcular antigüedad del vehículo
  const antiguedad = hoy.getFullYear() - año
  let rangoAntiguedad = '1-3'
  if (ceroKm || antiguedad === 0) rangoAntiguedad = '0km'
  else if (antiguedad >= 1 && antiguedad <= 3) rangoAntiguedad = '1-3'
  else if (antiguedad >= 4 && antiguedad <= 6) rangoAntiguedad = '4-6'
  else if (antiguedad >= 7 && antiguedad <= 10) rangoAntiguedad = '7-10'
  else if (antiguedad >= 11 && antiguedad <= 15) rangoAntiguedad = '11-15'
  else rangoAntiguedad = '16+'

  const factorAntiguedad = tarifas.factoresAntiguedad?.[rangoAntiguedad] || 1.0

  let primaAnual = 0
  let valorAsegurado = valorVehiculo

  // Para RCV, precio fijo
  if (cobertura === 'rcv') {
    primaAnual = coberturaData.precioAnual * factorEdad * factorAntiguedad
  } else {
    // Para Casco/Pérdida Total, calcular según valor del vehículo
    if (!valorAsegurado) {
      // Buscar valor en la tabla
      const marcaNorm = marca?.toLowerCase().replace(/\s+/g, '')
      const modeloNorm = modelo?.toLowerCase().replace(/\s+/g, '')
      
      const valoresMarca = tarifas.valoresVehiculos?.[marcaNorm]
      if (valoresMarca && valoresMarca[modeloNorm]) {
        valorAsegurado = valoresMarca[modeloNorm][año] || valoresMarca[modeloNorm][Math.max(...Object.keys(valoresMarca[modeloNorm]).map(Number))]
      } else {
        // Usar valor genérico
        const tipoDefault = marca?.toLowerCase().includes('pickup') || modelo?.toLowerCase().includes('pickup') ? 'pickup'
          : modelo?.toLowerCase().includes('suv') || ['tucson', 'sportage', 'fortuner', 'tahoe', 'explorer', 'santafe', 'sorento'].includes(modeloNorm) ? 'suv'
          : 'sedan'
        const valoresDefault = tarifas.valoresVehiculos?._default?.[tipoDefault]
        valorAsegurado = valoresDefault?.[año] || 20000 // Default fallback
      }
    }

    // Calcular prima
    primaAnual = valorAsegurado * coberturaData.tasaAnual * factorEdad * factorAntiguedad
    
    // Aplicar mínimos y máximos
    if (coberturaData.tasaMinima && primaAnual < coberturaData.tasaMinima) {
      primaAnual = coberturaData.tasaMinima
    }
    if (coberturaData.tasaMaxima && primaAnual > coberturaData.tasaMaxima) {
      primaAnual = coberturaData.tasaMaxima
    }
  }

  const primaMensual = primaAnual / 12

  return {
    aseguradora: tarifas.nombre,
    cobertura: coberturaData.nombre,
    valorVehiculo: valorAsegurado,
    primaAnual: Math.round(primaAnual * 100) / 100,
    primaMensual: Math.round(primaMensual * 100) / 100,
    factorEdad,
    factorAntiguedad,
    rangoEdad,
    rangoAntiguedad,
    incluyeRCV: coberturaData.incluyeRCV || cobertura === 'rcv',
    incluyeAsistenciaVial: coberturaData.incluyeAsistenciaVial || false,
    incluyeDefensaLegal: coberturaData.incluyeDefensaLegal || false,
    deducible: coberturaData.deducible ? `${coberturaData.deducible * 100}%` : 'N/A',
    vigenciaPrecios: tarifas.ultimaActualizacion,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIÓN: Comparar cotizaciones entre aseguradoras
// ═══════════════════════════════════════════════════════════════════════════
export function compararCotizaciones(datosVehiculo) {
  const aseguradoras = ['real', 'estar', 'caracas']
  const resultados = []

  for (const aseg of aseguradoras) {
    if (TARIFAS_AUTO[aseg]?.vigente) {
      const cotizacion = calcularCotizacionAuto({ ...datosVehiculo, aseguradora: aseg })
      if (!cotizacion.error) {
        resultados.push(cotizacion)
      }
    }
  }

  // Ordenar por prima mensual (menor a mayor)
  return resultados.sort((a, b) => a.primaMensual - b.primaMensual)
}

export default TARIFAS_AUTO
