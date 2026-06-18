/**
 * ORQUESTADOR DE LA BASE DE CONOCIMIENTO DEL CHATBOT
 *
 * Centraliza los 3 ramos de seguros y expone:
 *   - RAMOS: catálogo con metadata
 *   - generateSystemPrompt(ramo): construye el system prompt segmentado
 *   - detectarRamoPorProducto(producto): mapea un producto -> ramo
 *
 * Se mantiene un alias de compatibilidad para llamadas legacy a generateSystemPrompt()
 * sin argumentos: en ese caso devuelve el prompt "router" (sin segmentar).
 */

import {
  COMPANY_INFO,
  ASEGURADORAS,
  FAQS_GLOBALES,
  FAQS_BLOCK,
  INTRO_BOT,
  REGLAS_GLOBALES,
} from './shared.js'

import * as automovil from './ramos/automovil.js'
import * as personas from './ramos/personas.js'
import * as patrimoniales from './ramos/patrimoniales.js'

// ==========================================
// CATÁLOGO DE RAMOS
// ==========================================

export const RAMOS = {
  automovil: {
    id: automovil.ID,
    nombre: automovil.NOMBRE,
    emoji: automovil.EMOJI,
    productos: ['rcv', 'auto', 'casco', 'perdida_total'],
    modulo: automovil,
  },
  personas: {
    id: personas.ID,
    nombre: personas.NOMBRE,
    emoji: personas.EMOJI,
    productos: ['accidentes_personales', 'ap', 'vida', 'funerario', 'servicio_funerario', 'salud', 'hcm'],
    modulo: personas,
  },
  patrimoniales: {
    id: patrimoniales.ID,
    nombre: patrimoniales.NOMBRE,
    emoji: patrimoniales.EMOJI,
    productos: ['hogar', 'combinado_residencial', 'patrimoniales'],
    modulo: patrimoniales,
  },
}

// ==========================================
// HELPERS
// ==========================================

/**
 * Mapea un producto / intención a su ramo correspondiente.
 * @param {string} producto - identificador o nombre informal del producto
 * @returns {('automovil'|'personas'|'patrimoniales'|null)}
 */
export function detectarRamoPorProducto(producto) {
  if (!producto) return null
  const key = String(producto).toLowerCase().trim()

  for (const [ramoId, ramo] of Object.entries(RAMOS)) {
    if (ramo.productos.some(p => key.includes(p) || p.includes(key))) {
      return ramoId
    }
  }
  return null
}

/**
 * Devuelve el módulo del ramo o null si no existe.
 */
export function getRamo(ramoId) {
  if (!ramoId) return null
  const ramo = RAMOS[ramoId]
  return ramo || null
}

// ==========================================
// GENERADOR DE SYSTEM PROMPT
// ==========================================

/**
 * Genera el system prompt para OpenAI.
 *
 * @param {string} [ramo] - 'automovil' | 'personas' | 'patrimoniales'.
 *                          Si se omite o es inválido, devuelve el prompt "router"
 *                          (modo selección inicial, sin KB cargada).
 * @returns {string}
 */
export function generateSystemPrompt(ramo = null) {
  const ramoSeleccionado = getRamo(ramo)

  // === MODO ROUTER (sin ramo seleccionado) ===
  if (!ramoSeleccionado) {
    return `${INTRO_BOT}

## 🎯 MODO SELECCIÓN DE RAMO

El usuario aún NO ha seleccionado el tipo de seguro que desea. Tu ÚNICA tarea ahora es ayudarlo a elegir UNO de estos 3 ramos. NO pidas datos personales ni avances con ningún flujo de cotización todavía.

Pregúntale qué tipo de seguro le interesa y muéstrale los 3 ramos como botones:

"¡Hola! 👋 Soy MaxProtect. ¿Qué tipo de seguro te interesa cotizar hoy?

[🚗 Automóvil (RCV)] [👨‍👩‍👧 Personas (Vida, AP, Funerario)] [🏠 Patrimoniales (Hogar)]"

Cuando el usuario elija, **NO continúes cotizando** desde este prompt: el sistema recargará el prompt con el ramo correspondiente.

${FAQS_BLOCK}
`
  }

  // === MODO RAMO SEGMENTADO ===
  const { modulo } = ramoSeleccionado
  return `${INTRO_BOT}

${modulo.promptSegmento}

${REGLAS_GLOBALES}

${FAQS_BLOCK}
`
}

// ==========================================
// EXPORTS DE CONVENIENCIA (retrocompatibilidad)
// ==========================================

export { COMPANY_INFO, ASEGURADORAS, FAQS_GLOBALES, FAQS_BLOCK, INTRO_BOT, REGLAS_GLOBALES }

// Productos consolidados (todos los ramos en un solo objeto - útil para el legacy export PRODUCTOS)
export const productosConsolidados = {
  ...automovil.productos,
  ...personas.productos,
  ...patrimoniales.productos,
}

// Requisitos consolidados
export const requisitosConsolidados = {
  ...automovil.requisitosEmision,
  ...personas.requisitosEmision,
  ...patrimoniales.requisitosEmision,
}

// Flujos consolidados
export const flujosConsolidados = {
  ...automovil.flujoCotizacion,
  ...personas.flujoCotizacion,
  ...patrimoniales.flujoCotizacion,
}

// Todas las FAQs (globales + por ramo)
export const todasLasFaqs = [
  ...FAQS_GLOBALES,
  ...automovil.faqs,
  ...personas.faqs,
  ...patrimoniales.faqs,
]
