/**
 * RAMO: PATRIMONIALES
 * Producto: Combinado Residencial (Hogar)
 *
 * Este archivo contiene TODA la base de conocimiento específica del ramo patrimonial.
 * En el futuro pueden agregarse más productos (ej: Combinado Comercial).
 */

export const ID = 'patrimoniales'
export const NOMBRE = 'Patrimoniales'
export const EMOJI = '🏠'

// ==========================================
// PRODUCTOS Y COBERTURAS
// ==========================================

export const productos = {
  hogar: {
    nombre: 'Combinado Residencial',
    emoji: '🏠',
    descripcion: 'Protege tu casa, apartamento y bienes contra incendio, robo, daños y responsabilidad civil',
    coberturas: [
      { nombre: 'Combinado Residencial', descripcion: 'US$ 20.000 - 300.000' },
      { nombre: 'Hogar Contenido', descripcion: 'Cobertura residencial completa (estructura y contenido)' },
    ],
  },
}

// ==========================================
// REQUISITOS DE EMISIÓN
// ==========================================

export const requisitosEmision = {
  hogar: {
    titulo: 'Requisitos para Combinado Residencial',
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
// FLUJO DE COTIZACIÓN
// ==========================================

export const flujoCotizacion = {
  hogar: {
    pasos: [
      { campo: 'tipoInmueble', pregunta: '¿Es casa o apartamento?', opciones: ['Casa', 'Apartamento'] },
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
// FAQs ESPECÍFICAS DEL RAMO
// ==========================================

export const faqs = [
  {
    pregunta: '¿Qué cubre el Combinado Residencial?',
    respuesta: 'Cubre principalmente: incendio, terremoto, robo, daños por agua, responsabilidad civil familiar, contenido del inmueble (mobiliario, electrodomésticos, equipos electrónicos) y gastos extra por inhabitabilidad.',
  },
  {
    pregunta: '¿Aseguran apartamentos en alquiler?',
    respuesta: 'Sí, tanto el inquilino como el propietario pueden tomar coberturas. El inquilino puede asegurar su contenido y RC, y el propietario asegura la estructura.',
  },
]

// ==========================================
// PROMPT SEGMENTADO DEL RAMO
// ==========================================

export const promptSegmento = `# 🏠 RAMO ACTIVO: PATRIMONIALES

El cliente está cotizando un seguro **patrimonial** (Combinado Residencial / Hogar).
SOLO trabaja temas de este ramo en esta conversación.
Si el cliente pregunta por seguros de auto/RCV o de personas (vida, salud, accidentes, funerario), indícale amablemente que para ese tipo de seguro debe iniciar una nueva conversación seleccionando el ramo correspondiente.

## PRODUCTO PRINCIPAL: COMBINADO RESIDENCIAL

### COBERTURAS TÍPICAS
- 🔥 **Incendio** y rayos
- 🌍 **Terremoto** y otros riesgos naturales
- 🦹 **Robo** y hurto
- 💧 **Daños por agua** (rotura de tuberías, filtraciones)
- ⚖️ **Responsabilidad Civil Familiar**
- 📺 **Contenido** (mobiliario, electrodomésticos, equipos electrónicos)
- 🏨 **Gastos extra por inhabitabilidad** (alojamiento alterno)

## 🏠 FLUJO COMBINADO RESIDENCIAL

### ETAPA 1: COTIZAR (datos básicos del inmueble)
1. "¿El inmueble es **casa** o **apartamento**?" [Casa] [Apartamento]
2. "¿Es de uso **residencial** (lo habitas) o lo tienes en **alquiler**?" [Residencial propio] [Alquilado por mí] [Lo alquilo a terceros]
3. "¿Cuál es el **valor aproximado** del inmueble (estructura)?" [USD < 30,000] [USD 30,000-80,000] [USD 80,000-150,000] [USD 150,000-300,000] [USD 300,000+]
4. "¿Quieres asegurar también el **contenido** (mobiliario, electrodomésticos)?" [Sí] [No]
5. (si Sí) "¿Cuál es el valor aproximado del contenido?"
6. "¿En qué **estado** y **ciudad** se encuentra el inmueble?"
7. "¿Cuál es la **antigüedad** de la construcción?" [Menos de 5 años] [5-15 años] [15-30 años] [Más de 30 años]
8. "¿Qué coberturas adicionales te interesan?" [Incendio] [Terremoto] [Robo] [Daños por agua] [RC Familiar] [Todas]

**→ MOSTRAR COMPARATIVA DE PRECIOS (3 ASEGURADORAS)**

### ETAPA 2: EMITIR (solo si acepta)
- Datos del **tomador**: nombre completo, cédula, teléfono, email
- Datos del **inmueble**: dirección completa, tipo de construcción, metros cuadrados, año de construcción
- **Documentos a recolectar (post-chat):** Cédula del propietario, documento de propiedad, fotos del inmueble (fachada e interiores)
- **Validación:** "¿El inmueble está actualmente habitado?" [Sí] [No]
- ⚠️ **Inspección física** puede ser requerida para sumas altas (USD 150,000+)
- **MENSAJE FINAL:** "✅ ¡Excelente! Hemos recibido toda tu información. Un asesor de ventas te contactará en las próximas 5 horas para coordinar el pago, la inspección (si aplica) y finalizar la emisión de tu póliza. ¡Gracias por confiar en nosotros!"

**❌ NO PEDIR (en cotización):** Inventario detallado, fotos, documento de propiedad
**❌ NO ACEPTAR PAGOS:** El chatbot NO procesa pagos. Solo recopila información.

---

## 💰 PRECIOS DE REFERENCIA (orientativo)
- Apartamento USD 50,000 (cobertura amplia): $15-25/mes
- Casa USD 100,000 (cobertura amplia): $25-45/mes
- Casa USD 200,000 (cobertura premium): $50-80/mes

> Las primas se cotizan típicamente como un % del valor asegurado (~0.4%-0.6% anual sobre estructura, ~0.8%-1.2% sobre contenido).

---

## 📋 FAQs DE PATRIMONIALES
${faqs.map(f => `**${f.pregunta}**\n${f.respuesta}`).join('\n\n')}
`
