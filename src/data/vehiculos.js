// Marcas y modelos comunes en el mercado venezolano (para el cotizador de auto).
// Lista mínima para la demo; ampliar según necesidad.
// Orden alfabético por marca, con "Otra marca" siempre al final.

export const MARCAS = [
  { marca: 'BYD', modelos: [] },
  { marca: 'Changan', modelos: [] },
  { marca: 'Chery', modelos: ['Arauca', 'Orinoco', 'Tiggo', 'QQ'] },
  { marca: 'Chevrolet', modelos: ['Aveo', 'Spark', 'Cruze', 'Optra', 'Captiva', 'Silverado', 'Tahoe'] },
  { marca: 'Dodge', modelos: ['Ram', 'Journey', 'Durango'] },
  { marca: 'Fiat', modelos: ['Palio', 'Siena', 'Uno'] },
  { marca: 'Ford', modelos: ['Fiesta', 'Focus', 'Explorer', 'EcoSport', 'F-150', 'Escape'] },
  { marca: 'Geely', modelos: [] },
  { marca: 'Great Wall', modelos: [] },
  { marca: 'Honda', modelos: ['Civic', 'Accord', 'CR-V', 'Fit'] },
  { marca: 'Hyundai', modelos: ['Accent', 'Elantra', 'Tucson', 'Santa Fe', 'Getz'] },
  { marca: 'JAC', modelos: [] },
  { marca: 'Jeep', modelos: ['Grand Cherokee', 'Wrangler', 'Compass', 'Renegade'] },
  { marca: 'Kia', modelos: ['Rio', 'Cerato', 'Sportage', 'Sorento', 'Picanto'] },
  { marca: 'Mazda', modelos: ['2', '3', '6', 'CX-5'] },
  { marca: 'Mitsubishi', modelos: ['Lancer', 'Montero', 'Outlander', 'L200'] },
  { marca: 'Nissan', modelos: ['Sentra', 'Versa', 'X-Trail', 'Frontier'] },
  { marca: 'Renault', modelos: ['Logan', 'Sandero', 'Duster', 'Symbol'] },
  { marca: 'Suzuki', modelos: ['Grand Vitara', 'Swift'] },
  { marca: 'Toyota', modelos: ['Corolla', 'Yaris', 'Hilux', 'Fortuner', '4Runner', 'Land Cruiser', 'RAV4'] },
  { marca: 'Volkswagen', modelos: ['Gol', 'Polo', 'Jetta', 'Tiguan'] },
  { marca: 'Otra marca', modelos: [] },
]

// Etiqueta de la última opción de modelo, que habilita texto libre.
export const OTRO_MODELO = 'Otro modelo'

export const LISTA_MARCAS = MARCAS.map((m) => m.marca)

// Devuelve los modelos de una marca + la opción "Otro modelo" al final.
export function modelosDe(marca) {
  const item = MARCAS.find((m) => m.marca === marca)
  const base = item ? item.modelos : []
  return [...base, OTRO_MODELO]
}
