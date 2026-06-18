-- ============================================================================
-- Migración 003: Tabla `cotizaciones` (embudo de seguimiento de leads)
-- ============================================================================
--
-- Objetivo:
--   Separar el funnel del chatbot en dos niveles:
--
--     1) Persona COTIZÓ (eligió aseguradora o llenó datos) pero NO pagó
--        → se guarda en `cotizaciones`
--        → para que un asesor le haga seguimiento por llamada/WhatsApp.
--
--     2) Persona COMPLETÓ la emisión (confirmar_emision)
--        → se guarda en la tabla por ramo:
--          conversaciones_automovil / conversaciones_personas / conversaciones_patrimoniales
--        → cliente real.
--
--   Una sola tabla `cotizaciones` para todos los ramos (más simple para
--   "lista diaria de a quién llamar"). La columna `ramo` permite filtrar.
--
-- BONUS: vista `cotizaciones_pendientes` que excluye automáticamente a
--        quienes ya completaron la emisión (su cédula ya aparece en una
--        de las 3 tablas por ramo). Así sólo ves los que de verdad
--        necesitan seguimiento.
--
-- Es IDEMPOTENTE: puede ejecutarse varias veces sin romper nada.
--
-- Cómo aplicarla:
--   Supabase Dashboard -> SQL Editor -> pegar este archivo -> RUN.
-- ============================================================================

-- ──────────────────────────────────────────────────────────────────────────
-- 1) TABLA: cotizaciones
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cotizaciones (
  id                BIGSERIAL PRIMARY KEY,
  created_at        TIMESTAMPTZ DEFAULT NOW(),

  -- Clasificación
  ramo              TEXT,   -- 'automovil' | 'personas' | 'patrimoniales'
  producto          TEXT,   -- ej: '🚗 RCV' | '💚 Póliza de Vida' | '🏠 Combinado Residencial'
  etapa             TEXT,   -- 'Cotización - Aseguradora seleccionada' | 'Finalizado - Pendiente pago'

  -- Aseguradora elegida (si llegó a ese punto)
  aseguradora       TEXT,
  precio            TEXT,

  -- Datos mínimos del lead (para que el asesor pueda contactarlo)
  nombre            TEXT,
  cedula            TEXT,
  telefono          TEXT,
  email_cliente     TEXT,

  -- Historial completo de la conversación (para contexto del asesor)
  historial_chat    TEXT
);

COMMENT ON TABLE cotizaciones
  IS 'Embudo de leads que cotizaron pero NO completaron la emisión. Para seguimiento por parte de un asesor.';

-- Índices útiles para los reportes más comunes
CREATE INDEX IF NOT EXISTS idx_cotizaciones_created_at
  ON cotizaciones (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_cotizaciones_ramo
  ON cotizaciones (ramo);

CREATE INDEX IF NOT EXISTS idx_cotizaciones_cedula
  ON cotizaciones (cedula);

-- ──────────────────────────────────────────────────────────────────────────
-- 2) RLS (mismo modelo que las 3 tablas de conversaciones)
-- ──────────────────────────────────────────────────────────────────────────
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;

-- Solo INSERT desde anon (el chatbot puede guardar cotizaciones)
DROP POLICY IF EXISTS "anon_insert_cotizaciones" ON cotizaciones;
CREATE POLICY "anon_insert_cotizaciones"
  ON cotizaciones
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ❌ No se crean políticas SELECT/UPDATE/DELETE para anon.
--    Tú lees todo desde el Dashboard de Supabase con tu cuenta dueña.

-- ──────────────────────────────────────────────────────────────────────────
-- 3) VISTA: cotizaciones_pendientes
--     Excluye automáticamente a quienes ya completaron la emisión
--     (es decir: cuya cédula ya aparece en alguna tabla por ramo).
-- ──────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW cotizaciones_pendientes AS
SELECT c.*
FROM   cotizaciones c
WHERE  c.cedula IS NOT NULL
  AND  c.cedula <> ''
  AND  NOT EXISTS (
         SELECT 1 FROM conversaciones_automovil a
         WHERE  LOWER(TRIM(a.cedula)) = LOWER(TRIM(c.cedula))
       )
  AND  NOT EXISTS (
         SELECT 1 FROM conversaciones_personas p
         WHERE  LOWER(TRIM(p.cedula)) = LOWER(TRIM(c.cedula))
       )
  AND  NOT EXISTS (
         SELECT 1 FROM conversaciones_patrimoniales pt
         WHERE  LOWER(TRIM(pt.cedula)) = LOWER(TRIM(c.cedula))
       )

UNION ALL

-- También incluir cotizaciones sin cédula (chat abandonado muy temprano)
-- — esas obviamente no pueden estar en las tablas finales.
SELECT c.*
FROM   cotizaciones c
WHERE  c.cedula IS NULL OR c.cedula = '';

COMMENT ON VIEW cotizaciones_pendientes
  IS 'Cotizaciones de personas que NO completaron la emisión (no aparecen en las tablas por ramo). Para seguimiento del asesor.';

-- 🔐 SEGURIDAD: hacer que la vista respete RLS de las tablas subyacentes.
--    Sin esto, una vista en Postgres se ejecuta con permisos del OWNER
--    (postgres en Supabase) y BYPASSA RLS → alguien con anon key podría
--    leer la vista aunque las tablas subyacentes tengan políticas estrictas.
--    Con `security_invoker = true`, la vista se ejecuta con permisos del
--    CALLER. Si el caller es anon (sin política SELECT en cotizaciones),
--    la vista devolverá [] correctamente.
ALTER VIEW cotizaciones_pendientes SET (security_invoker = true);

-- ============================================================================
-- ✅ Verificación rápida (descomenta para correr después):
--
-- -- 1) Total de cotizaciones
-- SELECT COUNT(*) AS total_cotizaciones FROM cotizaciones;
--
-- -- 2) Cotizaciones realmente pendientes de seguimiento
-- SELECT COUNT(*) AS pendientes FROM cotizaciones_pendientes;
--
-- -- 3) Lista de a quién llamar hoy (las más recientes pendientes)
-- SELECT created_at, ramo, producto, nombre, telefono, aseguradora, precio
-- FROM   cotizaciones_pendientes
-- ORDER BY created_at DESC
-- LIMIT 50;
-- ============================================================================
