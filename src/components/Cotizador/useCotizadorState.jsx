/* eslint-disable react/prop-types, react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Estado global del cotizador conversacional con persistencia en sessionStorage.
// Si el usuario recarga, sigue donde iba; si cierra la pestaña, se limpia.

const STORAGE_KEY = 'ffc_cotizador_v1'

export const estadoInicial = {
  ramo: 'auto',
  vehiculo: {
    marca: '',
    modelo: '',
    modeloOtro: '',
    anio: '',
    tipo: '',
    valorUSD: '',
    uso: '',
    estado: '',
    placa: '',
  },
  persona: {
    nombre: '',
    apellido: '',
    cedulaTipo: 'V',
    cedulaNumero: '',
    fechaNacimiento: { dia: '', mes: '', anio: '' },
  },
  contacto: {
    email: '',
    operadora: '0412',
    telefono: '',
    aceptaContacto: false,
  },
  resultado: {
    frecuencia: 'anual',
    cotizaciones: [],
    seleccion: null,
  },
  // Etapa de emisión (Parte 2). emision.pago y los datos del pagador NO se
  // persisten en sessionStorage (ver sanitizar()).
  emision: {
    vehiculo: { placa: '', serialCarroceria: '', puestos: '', uso: '' },
    tomador: { esMismo: true, nombre: '', docTipo: 'V', docNumero: '', telefono: '' },
    plaft: { aceptado: false, actividad: '', origenFondos: '', esPEP: '' },
    terminosAceptados: false,
    solicitudId: null,
    montoUSD: null,
    montoBs: null,
    pago: { pagoId: null, estado: null, intentos: 0 },
    poliza: { id: null, numero: null, pdfUrl: null, provisioning: null },
  },
  meta: {
    pasoActual: 0,
    iniciadoEn: null,
    refId: null,
  },
}

// Quita del estado lo que no debe persistirse (datos volátiles del pago).
function sanitizar(state) {
  return {
    ...state,
    emision: { ...state.emision, pago: { pagoId: null, estado: null, intentos: 0 } },
  }
}

function cargar() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* sessionStorage no disponible o JSON inválido: usar estado inicial */
  }
  return null
}

const CotizadorContext = createContext(null)

export function CotizadorProvider({ children }) {
  const navigate = useNavigate()
  const [state, setState] = useState(() => cargar() || estadoInicial)
  // Dirección de la transición: 1 = avanza (entra por la derecha), -1 = retrocede.
  const [direction, setDirection] = useState(1)
  const primeraCarga = useRef(true)

  // Persistir en cada cambio (salta la primera carga para no reescribir de inmediato).
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false
      return
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizar(state)))
    } catch {
      /* ignorar errores de escritura en sessionStorage */
    }
  }, [state])

  // Actualiza una sección (merge superficial de sus campos).
  const update = useCallback((seccion, valores) => {
    setState((prev) => ({ ...prev, [seccion]: { ...prev[seccion], ...valores } }))
  }, [])

  // Reemplaza una sección completa.
  const setSeccion = useCallback((seccion, valor) => {
    setState((prev) => ({ ...prev, [seccion]: valor }))
  }, [])

  const reset = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignorar */
    }
    setState(estadoInicial)
  }, [])

  // Navegación con dirección para la animación de transición.
  const next = useCallback(
    (path) => {
      setDirection(1)
      navigate(path)
    },
    [navigate],
  )

  const back = useCallback(
    (path) => {
      setDirection(-1)
      if (path) navigate(path)
      else navigate(-1)
    },
    [navigate],
  )

  const value = { state, update, setSeccion, setState, reset, direction, next, back }
  return <CotizadorContext.Provider value={value}>{children}</CotizadorContext.Provider>
}

export function useCotizadorState() {
  const ctx = useContext(CotizadorContext)
  if (!ctx) {
    throw new Error('useCotizadorState debe usarse dentro de <CotizadorProvider>')
  }
  return ctx
}
