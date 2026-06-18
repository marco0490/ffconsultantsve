/**
 * BASE DE CONOCIMIENTO DEL CHATBOT - FFC CONSULTANTS
 *
 * ⚠️ FACHADA DE COMPATIBILIDAD ⚠️
 *
 * El contenido real fue segmentado por RAMOS en `./chatbot/`:
 *   - src/data/chatbot/shared.js          (info común a todos los ramos)
 *   - src/data/chatbot/ramos/automovil.js (RCV / Auto)
 *   - src/data/chatbot/ramos/personas.js  (Accidentes Personales, Vida, Funerario, HCM)
 *   - src/data/chatbot/ramos/patrimoniales.js (Combinado Residencial / Hogar)
 *   - src/data/chatbot/index.js           (orquestador + generateSystemPrompt)
 *
 * Este archivo re-exporta todo con los nombres antiguos para no romper imports
 * existentes (api/chat.js, server.dev.js). Para nuevo código, importa desde
 * `./chatbot/index.js` directamente.
 */

import {
  generateSystemPrompt as _generateSystemPrompt,
  COMPANY_INFO as _COMPANY_INFO,
  ASEGURADORAS as _ASEGURADORAS,
  productosConsolidados,
  requisitosConsolidados,
  flujosConsolidados,
  todasLasFaqs,
  RAMOS as _RAMOS,
  detectarRamoPorProducto as _detectarRamoPorProducto,
} from './chatbot/index.js'

// ==========================================
// EXPORTS LEGACY (mantienen los nombres originales)
// ==========================================

export const COMPANY_INFO = _COMPANY_INFO
export const ASEGURADORAS = _ASEGURADORAS
export const PRODUCTOS = productosConsolidados
export const REQUISITOS_EMISION = requisitosConsolidados
export const FLUJO_COTIZACION = flujosConsolidados
export const FAQS = todasLasFaqs

// ==========================================
// EXPORTS NUEVOS (segmentación por ramo)
// ==========================================

export const RAMOS = _RAMOS
export const detectarRamoPorProducto = _detectarRamoPorProducto

/**
 * Genera el system prompt para OpenAI.
 * Llamado SIN argumentos -> prompt "router" (modo selección de ramo).
 * Llamado CON un ramo válido ('automovil'|'personas'|'patrimoniales') -> prompt segmentado.
 *
 * Compatibilidad: el código antiguo que llama generateSystemPrompt() seguirá
 * funcionando, pero ahora recibirá el prompt router (más liviano). Para
 * mantener el comportamiento monolítico anterior, se puede pedir un ramo
 * específico desde el caller.
 */
export const generateSystemPrompt = _generateSystemPrompt
