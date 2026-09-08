// Marcas, modelos y versiones comunes del mercado venezolano (cotizador de auto).
// Lista mínima DEMO; ampliar según necesidad. Orden alfabético por marca,
// con "Otra marca" al final. Los modelos pueden ser un string (sin versiones)
// o un objeto { nombre, versiones: [...] }.

export const MARCAS = [
  { marca: 'BYD', modelos: [] },
  { marca: 'Changan', modelos: [] },
  {
    marca: 'Chery',
    modelos: ['Arauca', 'Orinoco', { nombre: 'Tiggo', versiones: ['Comfort', 'Luxury'] }, { nombre: 'QQ', versiones: ['Confort'] }],
  },
  {
    marca: 'Chevrolet',
    modelos: [
      { nombre: 'Aveo', versiones: ['LS', 'LT', 'Family'] },
      { nombre: 'Spark', versiones: ['LS', 'LT', 'GT'] },
      { nombre: 'Cruze', versiones: ['LS', 'LT', 'LTZ'] },
      { nombre: 'Optra', versiones: ['Limited', 'Advance', 'Design'] },
      'Captiva',
      'Silverado',
      'Tahoe',
    ],
  },
  {
    marca: 'Dodge',
    modelos: [{ nombre: 'Ram', versiones: ['1500', '2500'] }, { nombre: 'Journey', versiones: ['SE', 'SXT'] }, 'Durango'],
  },
  {
    marca: 'Fiat',
    modelos: [{ nombre: 'Palio', versiones: ['EL', 'Fire'] }, { nombre: 'Siena', versiones: ['EL', 'Fire'] }, { nombre: 'Uno', versiones: ['Fire', 'Way'] }],
  },
  {
    marca: 'Ford',
    modelos: [
      { nombre: 'Fiesta', versiones: ['SE', 'Titanium', 'Power'] },
      { nombre: 'Focus', versiones: ['SE', 'Titanium'] },
      { nombre: 'Explorer', versiones: ['XLT', 'Limited'] },
      { nombre: 'EcoSport', versiones: ['SE', 'Titanium'] },
      { nombre: 'F-150', versiones: ['XL', 'XLT', 'Lariat'] },
      'Escape',
    ],
  },
  { marca: 'Geely', modelos: [] },
  { marca: 'Great Wall', modelos: [] },
  {
    marca: 'Honda',
    modelos: [
      { nombre: 'Civic', versiones: ['LX', 'EX', 'EXL'] },
      { nombre: 'Accord', versiones: ['LX', 'EXL'] },
      { nombre: 'CR-V', versiones: ['LX', 'EX'] },
      { nombre: 'Fit', versiones: ['LX', 'EX'] },
    ],
  },
  {
    marca: 'Hyundai',
    modelos: [
      { nombre: 'Accent', versiones: ['GL', 'GLS'] },
      { nombre: 'Elantra', versiones: ['GLS', 'Limited'] },
      { nombre: 'Tucson', versiones: ['GL', 'Limited'] },
      'Santa Fe',
      { nombre: 'Getz', versiones: ['GL'] },
    ],
  },
  { marca: 'JAC', modelos: [] },
  {
    marca: 'Jeep',
    modelos: [
      { nombre: 'Grand Cherokee', versiones: ['Laredo', 'Limited'] },
      { nombre: 'Wrangler', versiones: ['Sport', 'Sahara'] },
      { nombre: 'Compass', versiones: ['Sport', 'Limited'] },
      { nombre: 'Renegade', versiones: ['Sport', 'Longitude'] },
    ],
  },
  {
    marca: 'Kia',
    modelos: [
      { nombre: 'Rio', versiones: ['LX', 'EX'] },
      { nombre: 'Cerato', versiones: ['LX', 'EX'] },
      { nombre: 'Sportage', versiones: ['LX', 'EX'] },
      'Sorento',
      { nombre: 'Picanto', versiones: ['LX', 'EX'] },
    ],
  },
  {
    marca: 'Mazda',
    modelos: [{ nombre: '2', versiones: ['Sport', 'Touring'] }, { nombre: '3', versiones: ['Sport', 'Touring'] }, '6', 'CX-5'],
  },
  {
    marca: 'Mitsubishi',
    modelos: [
      { nombre: 'Lancer', versiones: ['GLX', 'Touring'] },
      { nombre: 'Montero', versiones: ['GLS', 'Dakar'] },
      'Outlander',
      { nombre: 'L200', versiones: ['4x2', '4x4'] },
    ],
  },
  {
    marca: 'Nissan',
    modelos: [
      { nombre: 'Sentra', versiones: ['B13', 'Advance', 'SR'] },
      { nombre: 'Versa', versiones: ['Sense', 'Advance'] },
      'X-Trail',
      { nombre: 'Frontier', versiones: ['4x2', '4x4'] },
    ],
  },
  {
    marca: 'Renault',
    modelos: [
      { nombre: 'Logan', versiones: ['Authentique', 'Expression'] },
      { nombre: 'Sandero', versiones: ['Authentique', 'Stepway'] },
      { nombre: 'Duster', versiones: ['Expression', 'Dynamique'] },
      'Symbol',
    ],
  },
  {
    marca: 'Suzuki',
    modelos: [{ nombre: 'Grand Vitara', versiones: ['JLX'] }, { nombre: 'Swift', versiones: ['GL', 'GLX'] }],
  },
  {
    marca: 'Toyota',
    modelos: [
      { nombre: 'Corolla', versiones: ['LE', 'SE', 'XLI', 'GLI'] },
      { nombre: 'Yaris', versiones: ['Sport', 'XLS', 'Sedán'] },
      { nombre: 'Hilux', versiones: ['2.4 4x2', '2.7 4x4', '2.8 4x4'] },
      { nombre: 'Fortuner', versiones: ['2.7', 'SR5', 'Dubai'] },
      '4Runner',
      'Land Cruiser',
      { nombre: 'RAV4', versiones: ['LE', 'XLE'] },
    ],
  },
  {
    marca: 'Volkswagen',
    modelos: [
      { nombre: 'Gol', versiones: ['Power', 'Comfortline'] },
      { nombre: 'Polo', versiones: ['Comfortline'] },
      { nombre: 'Jetta', versiones: ['Trendline', 'Comfortline'] },
      'Tiguan',
    ],
  },
  { marca: 'Otra marca', modelos: [] },
]

// Etiqueta de la última opción de modelo, que habilita texto libre.
export const OTRO_MODELO = 'Otro modelo'
// Última opción del selector de versión.
export const OTRA_VERSION = 'Otra / no la sé'

export const LISTA_MARCAS = MARCAS.map((m) => m.marca)

const nombreModelo = (m) => (typeof m === 'string' ? m : m.nombre)

function buscarModelo(marca, modelo) {
  const item = MARCAS.find((m) => m.marca === marca)
  if (!item) return null
  return item.modelos.find((m) => nombreModelo(m) === modelo) || null
}

// Devuelve los modelos de una marca + la opción "Otro modelo" al final.
export function modelosDe(marca) {
  const item = MARCAS.find((m) => m.marca === marca)
  const base = item ? item.modelos.map(nombreModelo) : []
  return [...base, OTRO_MODELO]
}

// Devuelve las versiones de un modelo + "Otra / no la sé" al final.
export function versionesDe(marca, modelo) {
  const mod = buscarModelo(marca, modelo)
  const vers = mod && typeof mod === 'object' && Array.isArray(mod.versiones) ? mod.versiones : []
  return [...vers, OTRA_VERSION]
}

// DEMO: peso de referencia (kg) por modelo, para deducir el grupo de peso RCV.
// Los modelos sin entrada disparan el paso de fallback (grupo de peso manual).
const PESOS_KG = {
  'Toyota|Corolla': 1300, 'Toyota|Yaris': 1100, 'Toyota|Hilux': 2000, 'Toyota|Fortuner': 2100, 'Toyota|RAV4': 1600,
  'Chevrolet|Aveo': 1100, 'Chevrolet|Spark': 1000, 'Chevrolet|Cruze': 1350, 'Chevrolet|Optra': 1250,
  'Ford|Fiesta': 1150, 'Ford|Focus': 1300, 'Ford|Explorer': 2100, 'Ford|F-150': 2300, 'Ford|EcoSport': 1300,
  'Hyundai|Accent': 1150, 'Hyundai|Elantra': 1300, 'Hyundai|Tucson': 1500,
  'Kia|Rio': 1150, 'Kia|Cerato': 1300, 'Kia|Sportage': 1500,
  'Nissan|Sentra': 1300, 'Nissan|Versa': 1150, 'Nissan|Frontier': 2000,
  'Honda|Civic': 1300, 'Honda|Accord': 1500, 'Honda|CR-V': 1600, 'Honda|Fit': 1100,
  'Renault|Logan': 1150, 'Renault|Sandero': 1150, 'Renault|Duster': 1400,
  'Mazda|2': 1050, 'Mazda|3': 1300,
  'Volkswagen|Gol': 1050, 'Volkswagen|Polo': 1150, 'Volkswagen|Jetta': 1350,
  'Jeep|Grand Cherokee': 2200, 'Jeep|Wrangler': 1900,
  'Mitsubishi|Lancer': 1300, 'Mitsubishi|L200': 1900,
  'Fiat|Palio': 1000, 'Fiat|Siena': 1050, 'Fiat|Uno': 950,
}

// Grupos de peso para tarifar el RCV (esquema de la solicitud oficial).
export const GRUPOS_PESO = ['Hasta 800 kg', '801-1500 kg', '1501-2500 kg', 'Más de 2500 kg']

// Peso demo del modelo (kg) o null si no se conoce.
export function pesoDe(marca, modelo) {
  return PESOS_KG[`${marca}|${modelo}`] ?? null
}

// Devuelve el grupo de peso RCV a partir de los kg (o null si no hay peso).
export function grupoPesoRCV(pesoKg) {
  if (pesoKg == null) return null
  if (pesoKg <= 800) return 'Hasta 800 kg'
  if (pesoKg <= 1500) return '801-1500 kg'
  if (pesoKg <= 2500) return '1501-2500 kg'
  return 'Más de 2500 kg'
}
