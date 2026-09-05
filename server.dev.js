// Servidor de desarrollo local para probar las API routes
// Solo para desarrollo - NO se usa en producción
import express from 'express'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import { config } from 'dotenv'
import { generateSystemPrompt } from './src/data/chatbot-knowledge.js'
import { calcularCotizacionAuto, compararCotizaciones } from './src/data/tarifas-seguros.js'

// Cargar variables de entorno (ambos archivos)
config({ path: '.env' })
config({ path: '.env.local' })

const app = express()
app.use(cors())
app.use(express.json())

// 🔐 SEGURIDAD: Ocultar información del servidor
app.disable('x-powered-by')

// ==========================================
// API ROUTES (copias de /api para desarrollo)
// ==========================================

// POST /api/chat - Chat con OpenAI
app.post('/api/chat', async (req, res) => {
  const OpenAI = (await import('openai')).default
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Instrucciones extendidas (tarifas, JSON, encuesta) que se añaden al prompt segmentado por ramo.
  const EXTRA_INSTRUCTIONS = `

## 🚨🚨🚨 REGLA ABSOLUTAMENTE OBLIGATORIA 🚨🚨🚨

**CUANDO MUESTRES CUALQUIER COTIZACIÓN, DEBES MOSTRAR SIEMPRE LOS PRECIOS DE LAS 3 ASEGURADORAS EN UNA TABLA COMPARATIVA.**

NUNCA muestres solo UN precio. El cliente DEBE ver las 3 opciones para decidir.

**4 PRODUCTOS DE MICROSEGUROS:**
1. 🛡️ Accidentes Personales
2. ⚱️ Servicio Funerario  
3. 💚 Póliza de Vida
4. 🚗 RCV (Vehículos)

## 💰 SISTEMA DE TARIFAS - CÁLCULO AUTOMÁTICO

### FACTORES DE ASEGURADORAS (aplica a TODOS los productos)
- 🦁 **Seguros Caracas**: precio base
- 🔵 **Estar Seguros**: -3%
- 🟣 **Real Seguros**: -7% (más económico)

---

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
- Seguros Caracas: $11.44 | Estar: $11.10 | Real: $10.64

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

### 🚗 RCV - CÓMO CALCULAR

**PASO 1: Prima anual base por tipo de vehículo**
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

**PASO 2: Factor por uso**
- Particular: ×1.0
- Comercial: ×1.35
- Transporte público: ×1.60
- Carga: ×1.45

**PASO 3: Factor por antigüedad**
- 0-2 años: ×1.0
- 3-5 años: ×1.05
- 6-10 años: ×1.15
- 11-15 años: ×1.25
- 15+ años: ×1.40

**PASO 4: Tipo de plan**
- Básico: ×1.0
- Con exceso de límites: ×1.25
- Con asistencia vial: ×1.35
- Completo: ×1.55

**EJEMPLO:** Toyota Corolla 2020, particular, plan con asistencia
$42 × 1.0 × 1.05 × 1.35 = $59.54/año = **$4.96/mes base**
- Seguros Caracas: $4.96/mes | Estar: $4.81/mes | Real: $4.61/mes

### INSTRUCCIÓN CRÍTICA PARA COTIZACIÓN RCV

**PREGUNTAS PROHIBIDAS EN RCV** (NO APLICAN A VEHÍCULOS):
- ❌ "¿Te encuentras en buena salud?" - NO PREGUNTAR
- ❌ "¿Cuántos beneficiarios deseas incluir?" - RCV NO TIENE BENEFICIARIOS
- ❌ "¿Tienes condición médica preexistente?" - NO PREGUNTAR
- ❌ "¿Practicas deportes extremos?" - NO PREGUNTAR

**Estas preguntas son de seguros de VIDA/AP, no de RCV. OMITIRLAS.**

Cuando el usuario pida cotización de RCV, SIEMPRE muestra los precios de TODAS las aseguradoras en formato comparativo:

"💰 **COTIZACIÓN RCV - COMPARATIVA**

🚗 Vehículo: [Marca] [Modelo] [Versión] [Año]

| Aseguradora | Precio Mensual | Precio Anual |
|-------------|----------------|--------------|
| **Seguros Caracas** | $4.33/mes | $52/año |
| **Estar Seguros** | $4.17/mes | $50/año |
| **Real Seguros** | $3.50/mes | $42/año |

✅ Todas incluyen Asistencia Vial 24/7

¿Con cuál aseguradora deseas continuar?" [Seguros Caracas] [Estar] [Real]

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

### FACTORES DE AJUSTE
- Conductor 18-25 años: +35%
- Conductor 26-50 años: precio base
- Conductor 51-65 años: precio base
- Conductor 66+ años: +15%
- Vehículo 0km: precio base
- Vehículo 4-6 años: +5%
- Vehículo 7-10 años: +15%
- Vehículo 11-15 años: +25%

### CÓMO CALCULAR EL PRECIO
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

## ⚠️ REGLAS CRÍTICAS - LEE CON ATENCIÓN

### 🚫 PROHIBIDO REPETIR PREGUNTAS
- NUNCA vuelvas a preguntar algo que el usuario ya respondió
- Mantén un registro mental de cada dato recopilado
- Si ya tienes nombre, cédula, teléfono, etc., NO los pidas de nuevo
- **EN EMISIÓN:** Los datos de cotización (fecha nacimiento, ocupación, etc.) YA LOS TIENES. NO los pidas de nuevo.

### 🧠 EXTRACCIÓN INTELIGENTE DE DATOS COMPUESTOS
**REGLA CRÍTICA:** Si el usuario responde con MÚLTIPLES datos en una sola respuesta, EXTRAE TODOS y NO vuelvas a preguntar ninguno.

**EJEMPLOS:**
- Usuario dice "Barquisimeto, edo Lara" → YA TIENES: ciudad=Barquisimeto, estado=Lara. NO preguntes ciudad.
- Usuario dice "Toyota Corolla 2022 automático" → YA TIENES: marca=Toyota, modelo=Corolla, año=2022, transmisión=automático. NO preguntes ninguno.
- Usuario dice "V-12345678, masculino, soltero" → YA TIENES: cédula, sexo, estado civil. NO preguntes ninguno.
- Usuario dice "Calle 5, Urbanización Las Mercedes, Caracas" → YA TIENES: vía, urbanización, ciudad. NO preguntes ninguno.

**SIEMPRE confirma lo que entendiste:** "Perfecto, registré: Ciudad: Barquisimeto, Estado: Lara. Ahora..."

### 📝 FORMATO DE CÉDULA
- ENTIENDE estos formatos: "v13268802", "V13268802", "V-13268802", "e5123456", "E-5123456"
- Si el usuario escribe "v13268802" = Venezolano + número 13268802. NO vuelvas a pedir el número.
- Extrae automáticamente: tipo (V o E) + número de la misma respuesta

### 📍 DIRECCIONES - EXTRACCIÓN INTELIGENTE
Cuando pidas dirección, el usuario puede dar varios datos juntos. EXTRAE TODO:
- "Barquisimeto edo lara" = Ciudad + Estado
- "Av. Bolívar, Centro, Caracas" = Vía + Urbanización + Ciudad
- "Edificio Torre Sur, piso 5, apt 5A" = Edificio + Piso + Apartamento
CONFIRMA lo extraído y continúa con lo que falta, NO repitas preguntas.

### ✅ BOTONES OBLIGATORIOS
SIEMPRE que hagas una pregunta binaria o de opciones, DEBES incluir los botones entre corchetes:
- Sí/No: "¿Deseas X?" [Sí] [No]
- Opciones: "¿Cuál prefieres?" [Opción1] [Opción2] [Opción3]
- NUNCA hagas preguntas de Sí/No sin los botones [Sí] [No]

### ⏱️ ADVERTENCIA DE TIEMPO
- ANTES de comenzar la emisión, advierte al usuario que el proceso tomará aproximadamente **15-20 minutos**.

### � VIGENCIA DE PÓLIZA - MICROSEGUROS (AP, VIDA, FUNERARIO)
🚫 **NO PREGUNTAR en Accidentes Personales, Póliza de Vida ni Servicio Funerario:**
- ❌ "¿Cuál es la fecha de inicio de la póliza?" - NO PREGUNTAR
- ❌ "¿Cuál es la fecha de fin de la póliza?" - NO PREGUNTAR

✅ **SÍ PREGUNTAR:**
- ✅ "¿Con qué frecuencia deseas realizar el pago?" [Anual] [Semestral] [Trimestral] [Mensual]

**La vigencia se calcula automáticamente según la frecuencia de pago seleccionada.**

### �� FLUJO SEGURO AUTO - SEGUROS CARACAS

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

---
**SI ES PERSONA NATURAL (51 campos):**

1. Cobertura [Casco] [RCV+Accidentes+Asistencia] [Ambas]
2-15. DATOS PERSONALES: Nombre, Doc [V][E], C.I., RIF, Lugar/Fecha nac, Sexo, Estado civil, Ingreso U.T., Actividad, Descripción [Indep][Dep][Societ], Profesión, Ocupación, Trabajo, Criptoactivos [No][Sí]
16-25. DIRECCIÓN: Estado, Ciudad, Urbanización, Edificio, Vía, C.P., Tel hab, Tel cel, Email, ¿Oficina igual? [Sí][No]
26-28. VIGENCIA: Fecha inicio, Fecha fin, Frecuencia [Anual][Semestral][Trimestral][Mensual]
29-41. VEHÍCULO: Placa, Color, Serial motor, Cilindros, Serial carrocería, Uso, Carga, Pasajeros, Peso, Uso hab [Urbano][Extraurbano], ¿Quién usa? [Propietario][Cónyuge][Chofer][Hijos], Años exp, Licencia
42-51. COBERTURAS: Casco [Sí][No]+Suma, RCV [Sí][No]+Montos, Asist Legal [Sí][No], Exceso [Sí][No], Asist Vial [Plus][Para Ti], Accidentes [Sí][No] para [Conductor][Pasajeros][Ayudante] + Muerte/Invalidez/Médicos/Entierro

→ GENERAR JSON NATURAL

---
**SI ES PERSONA JURÍDICA (64 campos):**

1. Cobertura [Casco] [RCV+Accidentes+Asistencia] [Ambas]
2-13. EMPRESA: Razón Social, RIF, Tipo [Pública][Privada], Fecha constitución, N° Registro, Tomo, Patrimonio, Utilidad, Actividad [Industrial][Comercial][Gubernamental], Descripción, Productos/Servicios, Factura a [Tomador][Asegurado]
14-27. REPRESENTANTE LEGAL: Nombre, Doc [V][E], C.I., RIF, Lugar/Fecha nac, Sexo, Estado civil, Ingreso U.T., Actividad, Descripción, Profesión, Ocupación, Trabajo, Criptoactivos [No][Sí]
28-37. DIRECCIÓN EMPRESA: Estado, Ciudad, Urbanización, Edificio, Vía, C.P., Tel, Cel, Email, Dir cobro [Habitación][Oficina]
38-39. ASEGURADO: ¿Mismo que tomador? [Sí][No] → Si No: repetir datos
40-42. VIGENCIA: Fecha inicio, Fecha fin, Frecuencia pago
43-55. VEHÍCULO: Placa, Color, Serial motor, Cilindros, Serial carrocería, Uso, Carga, Pasajeros, Peso, Uso hab, ¿Quién usa?, Años exp, Licencia
56-64. COBERTURAS: Casco+Suma, RCV+Montos, Asist Legal, Exceso, Asist Vial, Accidentes Terrestres + coberturas

→ GENERAR JSON JURÍDICA

**═══ JSON PERSONA NATURAL ═══**
\`\`\`json:LEAD_DATA
{
  "tipo": "auto",
  "aseguradora": "Seguros Caracas",
  "tipoPersona": "natural",
  "fase": "emision",
  "Cotizacion": { "Ano": 2024, "Marca": "...", "Modelo": "...", "Version": "...", "Transmision": "..." },
  "Cobertura": "Casco/RCV/Ambas",
  "DatosPersonales": {
    "Nombre": "...", "TipoDoc": "V/E", "CI": "...", "RIF": "...",
    "LugarNacimiento": "...", "FechaNacimiento": "DD/MM/AAAA",
    "Sexo": "M/F", "EstadoCivil": "...", "IngresoUT": "...",
    "Actividad": "...", "DescActividad": "...", "Profesion": "...",
    "Ocupacion": "...", "Trabajo": "...", "Criptoactivos": false
  },
  "Direccion": { "Estado": "...", "Ciudad": "...", "Urbanizacion": "...", "Edificio": "...", "Via": "...", "CP": "...", "TelHab": "...", "Celular": "...", "Email": "...", "OficinaIgual": true },
  "Vigencia": { "Inicio": "...", "Fin": "...", "Frecuencia": "..." },
  "Vehiculo": { "Placa": "...", "Color": "...", "SerialMotor": "...", "Cilindros": 4, "SerialCarroceria": "...", "Uso": "...", "Carga": "...", "Pasajeros": 5, "Peso": "...", "UsoHabitual": "...", "QuienUsa": "...", "AnosExp": 5, "Licencia": "..." },
  "Coberturas": { "Casco": { "Activo": true, "Suma": 25000 }, "RCV": { "Activo": true, "DanoCosas": 0, "DanoPersonas": 0 }, "AsistLegal": false, "Exceso": false, "AsistVial": "Plus", "AccidentesTerrestres": { "Activo": false, "Para": [], "Muerte": 0, "Invalidez": 0, "Medicos": 0, "Entierro": 0 } },
  "PrecioEstimado": "$XX.XX/mes"
}
\`\`\`

**═══ JSON PERSONA JURÍDICA ═══**
\`\`\`json:LEAD_DATA
{
  "tipo": "auto",
  "aseguradora": "Seguros Caracas",
  "tipoPersona": "juridica",
  "fase": "emision",
  "Cotizacion": { "Ano": 2024, "Marca": "...", "Modelo": "...", "Version": "...", "Transmision": "..." },
  "Cobertura": "Casco/RCV/Ambas",
  "Empresa": { "RazonSocial": "...", "RIF": "...", "Tipo": "Publica/Privada", "FechaConstitucion": "...", "NumRegistro": "...", "Tomo": "...", "Patrimonio": 0, "Utilidad": 0, "Actividad": "...", "Descripcion": "...", "Productos": "...", "FacturaA": "Tomador/Asegurado" },
  "RepresentanteLegal": { "Nombre": "...", "TipoDoc": "V/E", "CI": "...", "RIF": "...", "LugarNacimiento": "...", "FechaNacimiento": "...", "Sexo": "M/F", "EstadoCivil": "...", "IngresoUT": "...", "Actividad": "...", "DescActividad": "...", "Profesion": "...", "Ocupacion": "...", "Trabajo": "...", "Criptoactivos": false },
  "DireccionEmpresa": { "Estado": "...", "Ciudad": "...", "Urbanizacion": "...", "Edificio": "...", "Via": "...", "CP": "...", "Telefono": "...", "Celular": "...", "Email": "...", "DirCobro": "Habitacion/Oficina" },
  "AseguradoIgualTomador": true,
  "Vigencia": { "Inicio": "...", "Fin": "...", "Frecuencia": "..." },
  "Vehiculo": { "Placa": "...", "Color": "...", "SerialMotor": "...", "Cilindros": 4, "SerialCarroceria": "...", "Uso": "...", "Carga": "...", "Pasajeros": 5, "Peso": "...", "UsoHabitual": "...", "QuienUsa": "...", "AnosExp": 5, "Licencia": "..." },
  "Coberturas": { "Casco": { "Activo": true, "Suma": 25000 }, "RCV": { "Activo": true, "DanoCosas": 0, "DanoPersonas": 0 }, "AsistLegal": false, "Exceso": false, "AsistVial": "Plus", "AccidentesTerrestres": { "Activo": false, "Para": [], "Muerte": 0, "Invalidez": 0, "Medicos": 0, "Entierro": 0 } },
  "PrecioEstimado": "$XX.XX/mes"
}
\`\`\`

### 📋 FLUJO PARA ACCIDENTES PERSONALES (SEGUROS CARACAS)

**═══ FASE 1: COTIZACIÓN (Preguntas 1-8) ═══**
1. Nombre completo
2. Tipo de documento [V] [E] [RIF]
3. Número de C.I./Pasaporte/RIF
4. Fecha de nacimiento
5. Teléfono celular
6. Email
7. ¿Cuántas personas incluir?
8. ¿Qué coberturas? [Muerte Accidental] [Invalidez] [Gastos Médicos] [Todas]

→ DESPUÉS de pregunta 8: MOSTRAR PRECIO

**═══ FASE 2: MOSTRAR PRECIO ═══**
Precios de referencia:
- Individual básico: $15-25/mes
- Individual completo: $30-50/mes
- Familiar (2-4): $50-100/mes

**═══ FASE 3: EMISIÓN (Preguntas 9-70) ═══**
⚠️ NO repetir preguntas 1-8.

9-13. Datos personales: Sexo, Estado civil, Ingreso U.T., Actividad económica, Ocupación
14-29. Dirección completa (estado, ciudad, municipio, parroquia, urbanización, edificio, vía, piso, apto, referencia, código postal, teléfonos)
30. ¿Dirección de cobro igual? [Sí] [No]
31-33. Vigencia: Fecha inicio, Fecha fin, Frecuencia pago [Anual] [Semestral] [Trimestral]
34-41. Datos de cada inscrito adicional
42-48. Coberturas por inscrito [Sí] [No] cada una
49-53. Beneficiarios (nombre, cédula, parentesco, %)
54-63. Cuestionario laboral (maquinarias, voltaje, explosivos, vehículos, embarcaciones, aeronaves)
64-70. Cuestionario de salud (buena salud, accidentes, defectos, deportes, otras pólizas, rechazos)

→ DESPUÉS de pregunta 70: GENERAR JSON

**═══ JSON ACCIDENTES PERSONALES ═══**
\`\`\`json:LEAD_DATA
{
  "tipo": "accidentes_personales",
  "aseguradora": "Seguros Caracas",
  "fase": "emision",
  "NombreCompleto": "...",
  "TipoDocumento": "V/E/RIF",
  "NumeroDocumento": "...",
  "FechaNacimiento": "DD/MM/AAAA",
  "Telefono": "+58...",
  "CorreoElectronico": "...",
  "Sexo": "M o F",
  "EstadoCivil": "...",
  "IngresoAnualUT": "...",
  "ActividadEconomica": "Comercial/Profesional",
  "Ocupacion": "...",
  "DireccionHabitacion": {
    "Estado": "...",
    "Ciudad": "...",
    "Municipio": "...",
    "Parroquia": "...",
    "Urbanizacion": "...",
    "Edificio": "...",
    "ViaPrincipal": "...",
    "Piso": "...",
    "Apartamento": "...",
    "Referencia": "...",
    "CodigoPostal": "..."
  },
  "DireccionCobroIgual": true/false,
  "Vigencia": {
    "FechaInicio": "DD/MM/AAAA",
    "FechaFin": "DD/MM/AAAA",
    "FrecuenciaPago": "Anual/Semestral/Trimestral"
  },
  "NumeroInscritos": 1,
  "Inscritos": [...],
  "Coberturas": {
    "MuerteAccidental": true/false,
    "InvalidezPermanente": true/false,
    "GastosMedicos": true/false,
    "GastosEntierro": true/false,
    "IncapacidadTemporal": true/false,
    "IncapacidadProfesional": true/false
  },
  "Beneficiarios": [...],
  "CuestionarioLaboral": {...},
  "CuestionarioSalud": {
    "BuenaSalud": true/false,
    "Descripcion": "...",
    "Accidentes": "...",
    "DefectosFisicos": "...",
    "Deportes": "...",
    "OtraPoliza": "...",
    "RechazoPrevio": "..."
  },
  "PrecioEstimado": "$XX.XX/mes"
}
\`\`\`

## ENCUESTA DE SATISFACCIÓN
IMPORTANTE: Después de confirmar que los datos fueron enviados, realiza una breve encuesta de 3 preguntas:

1. "Del 1 al 5, ¿qué tan fácil fue usar nuestro asistente virtual?" (1=Muy difícil, 5=Muy fácil)
2. "¿Qué te pareció la experiencia? ¿Hay algo que podríamos mejorar?"
3. "¿Nos recomendarías a un amigo o familiar?" (Sí/No/Tal vez)

Hazlas UNA a la vez, espera la respuesta, y al final agradece por el feedback.
Cuando tengas las 3 respuestas, incluye:

\`\`\`json:SURVEY_DATA
{
  "facilidadUso": 1-5,
  "comentarioMejora": "...",
  "recomendaria": "si|no|talvez"
}
\`\`\``

  try {
    const { messages, context, ramo } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }

    // 🎯 SEGMENTACIóN POR RAMO: el frontend envía 'ramo' (automovil/personas/patrimoniales).
    const VALID_RAMOS = ['automovil', 'personas', 'patrimoniales']
    const ramoActivo = VALID_RAMOS.includes(ramo) ? ramo : null
    const SYSTEM_PROMPT = generateSystemPrompt(ramoActivo) + EXTRA_INSTRUCTIONS

    const openaiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    if (context) {
      openaiMessages[0].content += `\n\n## CONTEXTO ACTUAL\n${JSON.stringify(context, null, 2)}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: openaiMessages,
      max_tokens: 500,
      temperature: 0.7,
    })

    let reply = completion.choices[0].message.content
    let leadSent = false
    let surveySent = false

    // Detectar y procesar datos de lead
    const leadMatch = reply.match(/```json:LEAD_DATA\s*([\s\S]*?)```/)
    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1])
        reply = reply.replace(/```json:LEAD_DATA[\s\S]*?```/, '').trim()
        
        console.log('📋 LEAD CAPTURADO:', leadData)
        
        // Convertir formatos para Power Automate
        // FechaNacimiento: DD/MM/YYYY -> ISO date-time
        if (leadData.FechaNacimiento) {
          const parts = leadData.FechaNacimiento.split('/')
          if (parts.length === 3) {
            const [day, month, year] = parts
            leadData.FechaNacimiento = new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString()
          }
        }
        // CeroKM: "Si"/"No" -> true/false
        if (typeof leadData.CeroKM === 'string') {
          leadData.CeroKM = leadData.CeroKM.toLowerCase() === 'si' || leadData.CeroKM.toLowerCase() === 'sí'
        }
        
        console.log('📋 LEAD CONVERTIDO:', leadData)
        
        // 1. Enviar a Power Automate si está configurado
        const POWER_AUTOMATE_URLS = {
          auto: process.env.POWER_AUTOMATE_AUTO,
          vida: process.env.POWER_AUTOMATE_PERSONAS,
          salud: process.env.POWER_AUTOMATE_PERSONAS,
          hogar: process.env.POWER_AUTOMATE_PATRIMONIALES,
        }
        
        const paUrl = POWER_AUTOMATE_URLS[leadData.tipo]
        if (paUrl) {
          try {
            const paResponse = await fetch(paUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...leadData,
                Canal: 'Web-Chatbot',
                FechaRegistro: new Date().toISOString(),
              }),
            })
            const paText = await paResponse.text()
            console.log('📤 Power Automate Response:', paResponse.status, paText)
          } catch (paError) {
            console.error('❌ Error Power Automate:', paError.message)
          }
        } else {
          console.log('⚠️ No hay URL de Power Automate para tipo:', leadData.tipo)
        }

        // 2. Enviar también por EmailJS (backup)
        const emailjsServiceId = process.env.VITE_EMAIL_SERVICE
        const emailjsTemplateId = process.env.VITE_EMAIL_COTIZADOR
        const emailjsUserId = process.env.VITE_EMAIL_USER
        const emailjsPrivateKey = process.env.VITE_EMAIL_PRIVATE_KEY
        
        console.log('📧 EmailJS Config:', { emailjsServiceId, emailjsTemplateId, emailjsUserId, hasPrivateKey: !!emailjsPrivateKey })
        
        if (emailjsServiceId && emailjsTemplateId && emailjsUserId) {
          try {
            const emailPayload = {
              service_id: emailjsServiceId,
              template_id: emailjsTemplateId,
              user_id: emailjsUserId,
              accessToken: emailjsPrivateKey,
              template_params: {
                ...leadData,
                Canal: 'Web-Chatbot',
                FechaRegistro: new Date().toISOString(),
                to_email: 'ffconsultantsve@outlook.com',
              }
            }
            console.log('📧 EmailJS Payload:', JSON.stringify(emailPayload, null, 2))
            
            const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(emailPayload),
            })
            const emailText = await emailResponse.text()
            console.log('📧 EmailJS Response:', emailResponse.status, emailText)
          } catch (emailError) {
            console.error('❌ Error EmailJS:', emailError.message)
          }
        } else {
          console.log('⚠️ Faltan variables de EmailJS')
        }
        
        leadSent = true
      } catch (e) {
        console.error('Error parsing lead:', e)
      }
    }

    // Detectar y procesar datos de encuesta
    const surveyMatch = reply.match(/```json:SURVEY_DATA\s*([\s\S]*?)```/)
    if (surveyMatch) {
      try {
        const surveyData = JSON.parse(surveyMatch[1])
        reply = reply.replace(/```json:SURVEY_DATA[\s\S]*?```/, '').trim()
        
        console.log('📊 ENCUESTA CAPTURADA:', surveyData)
        surveySent = true
      } catch (e) {
        console.error('Error parsing survey:', e)
      }
    }

    return res.json({
      success: true,
      message: reply,
      usage: completion.usage,
      leadSent,
      surveySent,
    })
  } catch (error) {
    console.error('OpenAI API Error:', error.message)
    return res.status(500).json({
      success: false,
      error: 'Error al procesar tu mensaje. Por favor intenta de nuevo.',
    })
  }
})

// POST /api/cotizacion - Calcular cotización con tarifas reales
app.post('/api/cotizacion', async (req, res) => {
  try {
    const { tipo, data, comparar } = req.body
    console.log('📋 Cotización recibida:', tipo, data)
    
    if (tipo === 'auto') {
      // Mapear cobertura del chatbot al formato interno
      const coberturaMap = {
        'casco': 'cobertura_amplia',
        'cobertura amplia': 'cobertura_amplia',
        'rcv': 'rcv',
        'rcv básica': 'rcv',
        'pérdida total': 'perdida_total',
        'perdida total': 'perdida_total'
      }
      
      const coberturaNormalizada = coberturaMap[data.cobertura?.toLowerCase()] || 'rcv'
      
      // Si quiere comparar entre aseguradoras
      if (comparar) {
        const comparaciones = compararCotizaciones({
          cobertura: coberturaNormalizada,
          marca: data.marca,
          modelo: data.modelo,
          año: parseInt(data.año) || new Date().getFullYear(),
          ceroKm: data.ceroKm === true || data.ceroKm === 'Si' || data.ceroKm === 'Sí',
          fechaNacimiento: data.fechaNacimiento,
          valorVehiculo: data.valorVehiculo || null
        })
        
        return res.json({
          success: true,
          tipo: 'comparacion',
          cotizaciones: comparaciones,
          mensaje: `Encontramos ${comparaciones.length} opciones para ti`
        })
      }
      
      // Cotización individual
      const cotizacion = calcularCotizacionAuto({
        aseguradora: data.aseguradora || 'segurosCaracas',
        cobertura: coberturaNormalizada,
        marca: data.marca,
        modelo: data.modelo,
        año: parseInt(data.año) || new Date().getFullYear(),
        ceroKm: data.ceroKm === true || data.ceroKm === 'Si' || data.ceroKm === 'Sí',
        fechaNacimiento: data.fechaNacimiento,
        valorVehiculo: data.valorVehiculo || null
      })
      
      if (cotizacion.error) {
        return res.status(400).json({ success: false, error: cotizacion.error })
      }
      
      console.log('💰 Cotización calculada:', cotizacion)
      
      return res.json({
        success: true,
        tipo: 'cotizacion',
        cotizacion,
        mensaje: `Tu seguro con ${cotizacion.aseguradora} costaría $${cotizacion.primaMensual}/mes`
      })
    }
    
    // Para otros tipos de seguros (salud, etc.) - pendiente de implementar
    return res.json({
      success: true,
      message: 'Cotización recibida. Un asesor te contactará con el precio exacto.',
      pendiente: true
    })
  } catch (error) {
    console.error('Error en cotización:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
})

// POST /api/lead
app.post('/api/lead', async (req, res) => {
  try {
    const { nombre, telefono, horario } = req.body
    console.log('👤 Lead recibido:', { nombre, telefono, horario })
    
    const whatsappNumber = '584129713806'
    const mensaje = `🔔 Nueva Solicitud de Contacto\n\n👤 Nombre: ${nombre}\n📞 Teléfono: ${telefono}\n🕐 Horario: ${horario}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`
    
    return res.json({
      success: true,
      message: '¡Perfecto! Tu solicitud ha sido registrada.',
      whatsappUrl
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
})

// ==========================================
// SERVIDOR VITE + EXPRESS
// ==========================================

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  })

  app.use(vite.middlewares)

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log('')
    console.log('🚀 ═══════════════════════════════════════════')
    console.log('   FFC Consultants - Servidor de Desarrollo')
    console.log('═══════════════════════════════════════════════')
    console.log('')
    console.log(`   🌐 Local:   http://localhost:${PORT}`)
    console.log('')
    console.log('   📡 API Routes disponibles:')
    console.log('      POST /api/chat')
    console.log('      POST /api/cotizacion')
    console.log('      POST /api/lead')
    console.log('')
    console.log('═══════════════════════════════════════════════')
    console.log('')
  })
}

startServer()
