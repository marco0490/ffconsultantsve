-- ============================================================================
-- Migración 001: agregar columna `ramo` y campos del ramo Patrimoniales (Hogar)
-- ============================================================================
--
-- Contexto:
-- El chatbot ahora segmenta su base de conocimiento en 3 ramos:
--   - automovil      (RCV / Auto)
--   - personas       (Accidentes Personales, Vida, Funerario, HCM)
--   - patrimoniales  (Combinado Residencial / Hogar)
--
-- La tabla `conversaciones_chatbot` originalmente sólo tenía campos para
-- auto + personas. Esta migración:
--   1) Agrega la columna `ramo` (para poder filtrar/agrupar leads).
--   2) Agrega campos específicos de Combinado Residencial.
--   3) Crea un índice por `ramo` para acelerar reportes/filtros.
--
-- Es IDEMPOTENTE: puede ejecutarse varias veces sin romper nada.
-- Cómo aplicarla:
--   Supabase Dashboard -> SQL Editor -> pegar este archivo -> RUN.
-- ============================================================================

-- 1) RAMO (clasificación principal del lead)
ALTER TABLE conversaciones_chatbot
  ADD COLUMN IF NOT EXISTS ramo TEXT;

COMMENT ON COLUMN conversaciones_chatbot.ramo
  IS 'Ramo del seguro cotizado: automovil | personas | patrimoniales';

-- 2) Campos específicos del ramo PATRIMONIALES (Combinado Residencial / Hogar)
ALTER TABLE conversaciones_chatbot
  ADD COLUMN IF NOT EXISTS tipo_inmueble TEXT,           -- 'Casa' | 'Apartamento'
  ADD COLUMN IF NOT EXISTS uso_inmueble TEXT,            -- 'Residencial propio' | 'Alquilado por mí' | 'Lo alquilo a terceros'
  ADD COLUMN IF NOT EXISTS valor_inmueble TEXT,          -- rango o monto en USD
  ADD COLUMN IF NOT EXISTS valor_contenido TEXT,         -- valor estimado del mobiliario/equipos
  ADD COLUMN IF NOT EXISTS antiguedad_construccion TEXT, -- rango: '<5 años', '5-15 años', etc.
  ADD COLUMN IF NOT EXISTS metros_cuadrados TEXT,
  ADD COLUMN IF NOT EXISTS habitado TEXT,                -- 'Sí' | 'No'
  ADD COLUMN IF NOT EXISTS coberturas_hogar TEXT;        -- 'Incendio, Robo, Daños por agua, ...'

-- 3) Índice por ramo (filtrar leads por tipo de seguro es la query más común)
CREATE INDEX IF NOT EXISTS idx_conversaciones_chatbot_ramo
  ON conversaciones_chatbot (ramo);

-- 4) Backfill (opcional): inferir el ramo en filas antiguas a partir del producto.
--    Se ejecuta SOLO si la columna existe y hay filas con ramo NULL.
UPDATE conversaciones_chatbot
SET ramo = CASE
  WHEN LOWER(COALESCE(producto, '')) LIKE '%rcv%'           THEN 'automovil'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%auto%'          THEN 'automovil'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%vehículo%'      THEN 'automovil'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%accidentes%'    THEN 'personas'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%funerari%'      THEN 'personas'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%vida%'          THEN 'personas'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%hcm%'           THEN 'personas'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%salud%'         THEN 'personas'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%hogar%'         THEN 'patrimoniales'
  WHEN LOWER(COALESCE(producto, '')) LIKE '%residencial%'   THEN 'patrimoniales'
  ELSE NULL
END
WHERE ramo IS NULL;

-- ============================================================================
-- Verificación rápida (descomenta para correr):
--
-- SELECT ramo, COUNT(*) AS leads
-- FROM conversaciones_chatbot
-- GROUP BY ramo
-- ORDER BY leads DESC;
-- ============================================================================
