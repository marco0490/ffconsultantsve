// Configuración del orden de pasos del cotizador conversacional (ramo auto).
// El "paso" numérico se usa para la barra de progreso ("Paso X de 9").

export const TOTAL_PASOS = 9

// Pasos con barra de progreso (0..8). El loader, resultado y confirmación
// NO forman parte del conteo de progreso.
export const PASOS = [
  { paso: 0, key: 'bienvenida', path: '/cotizar' },
  { paso: 1, key: 'marca', path: '/cotizar/marca' },
  { paso: 2, key: 'modelo', path: '/cotizar/modelo' },
  { paso: 3, key: 'anio', path: '/cotizar/anio' },
  { paso: 4, key: 'tipo', path: '/cotizar/tipo' },
  { paso: 5, key: 'valor', path: '/cotizar/valor' },
  { paso: 6, key: 'uso', path: '/cotizar/uso' },
  { paso: 7, key: 'datos', path: '/cotizar/datos' },
  { paso: 8, key: 'contacto', path: '/cotizar/contacto' },
]

// Rutas posteriores al flujo de captura (fuera del conteo de progreso).
export const RUTA_LOADER = '/cotizar/calculando'
export const RUTA_RESULTADO = '/cotizar/resultado'
export const RUTA_CONFIRMACION = '/cotizar/listo'

export function pathSiguiente(paso) {
  const siguiente = PASOS.find((p) => p.paso === paso + 1)
  // Tras el último paso de captura (8) se va al loader.
  return siguiente ? siguiente.path : RUTA_LOADER
}

export function pathAnterior(paso) {
  const anterior = PASOS.find((p) => p.paso === paso - 1)
  // Desde el paso 0 (bienvenida) se vuelve al home.
  return anterior ? anterior.path : '/'
}
