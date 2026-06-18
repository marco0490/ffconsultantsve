-- ============================================================================
-- Migración 002: Separar `conversaciones_chatbot` en 3 tablas por ramo
-- ============================================================================
--
-- Objetivo:
--   Crear 3 tablas independientes (una por cada ramo) para que el panel de
--   Supabase muestre SOLO las columnas relevantes a cada ramo, sin un mar de
--   NULLs irrelevantes.
--
-- Tablas creadas:
--   - conversaciones_automovil      (RCV / Auto)
--   - conversaciones_personas       (Accidentes Personales, Vida, Funerario, HCM)
--   - conversaciones_patrimoniales  (Combinado Residencial / Hogar)
--
-- Estrategia:
--   1) Crea las 3 tablas con columnas COMUNES + ESPECÍFICAS de su ramo.
--   2) Copia los datos existentes desde `conversaciones_chatbot` según `ramo`.
--   3) NO toca la tabla original (queda como respaldo).
--
-- Es IDEMPOTENTE: el CREATE TABLE usa IF NOT EXISTS y el INSERT puede
-- duplicar si se corre 2 veces. Por seguridad, los INSERT se ejecutan
-- SOLO si la tabla destino está vacía.
--
-- Cómo aplicarla:
--   Supabase Dashboard -> SQL Editor -> pegar este archivo -> RUN.
-- ============================================================================

-- ──────────────────────────────────────────────────────────────────────────
-- 🚗 TABLA: conversaciones_automovil
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversaciones_automovil (
  id                  BIGSERIAL PRIMARY KEY,
  created_at          TIMESTAMPTZ DEFAULT NOW(),

  -- Metadata del lead
  producto            TEXT,
  etapa               TEXT,
  aseguradora         TEXT,

  -- Datos del cliente
  nombre              TEXT,
  cedula              TEXT,
  fecha_nacimiento    TEXT,
  edad                TEXT,
  sexo                TEXT,
  estado_civil        TEXT,
  ocupacion           TEXT,
  telefono            TEXT,
  email_cliente       TEXT,

  -- Dirección
  estado              TEXT,
  ciudad              TEXT,
  municipio           TEXT,
  parroquia           TEXT,
  urbanizacion        TEXT,
  via                 TEXT,
  edificio            TEXT,
  piso_apto           TEXT,
  punto_referencia    TEXT,

  -- 🚗 Específicos del vehículo
  tipo_vehiculo       TEXT,
  uso_vehiculo        TEXT,
  marca               TEXT,
  modelo              TEXT,
  ano                 TEXT,
  version             TEXT,
  transmision         TEXT,
  color               TEXT,
  placa               TEXT,
  serial_motor        TEXT,
  serial_carroceria   TEXT,
  plan_rcv            TEXT,

  -- Cobertura y pago
  plan_cobertura      TEXT,
  suma_asegurada      TEXT,
  frecuencia_pago     TEXT,
  forma_pago          TEXT,
  precio              TEXT,

  -- Historial completo
  historial_chat      TEXT
);

CREATE INDEX IF NOT EXISTS idx_conv_auto_created_at
  ON conversaciones_automovil (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_conv_auto_etapa
  ON conversaciones_automovil (etapa);

COMMENT ON TABLE conversaciones_automovil
  IS 'Leads del chatbot para el ramo Automóvil (RCV)';


-- ──────────────────────────────────────────────────────────────────────────
-- 👨‍👩‍👧 TABLA: conversaciones_personas
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversaciones_personas (
  id                  BIGSERIAL PRIMARY KEY,
  created_at          TIMESTAMPTZ DEFAULT NOW(),

  -- Metadata del lead
  producto            TEXT,   -- 'Vida' | 'Accidentes Personales' | 'Funerario' | 'HCM'
  etapa               TEXT,
  aseguradora         TEXT,

  -- Datos del cliente
  nombre              TEXT,
  cedula              TEXT,
  fecha_nacimiento    TEXT,
  edad                TEXT,
  sexo                TEXT,
  estado_civil        TEXT,
  ocupacion           TEXT,
  telefono            TEXT,
  email_cliente       TEXT,

  -- Dirección
  estado              TEXT,
  ciudad              TEXT,
  municipio           TEXT,
  parroquia           TEXT,
  urbanizacion        TEXT,
  via                 TEXT,
  edificio            TEXT,
  piso_apto           TEXT,
  punto_referencia    TEXT,

  -- 👨‍👩‍👧 Específicos del ramo Personas
  beneficiario_1      TEXT,
  parentesco_1        TEXT,
  porcentaje_1        TEXT,
  beneficiario_2      TEXT,
  parentesco_2        TEXT,
  porcentaje_2        TEXT,

  -- Cobertura y pago
  plan_cobertura      TEXT,
  suma_asegurada      TEXT,
  frecuencia_pago     TEXT,
  forma_pago          TEXT,
  precio              TEXT,

  -- Historial completo
  historial_chat      TEXT
);

CREATE INDEX IF NOT EXISTS idx_conv_personas_created_at
  ON conversaciones_personas (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_conv_personas_producto
  ON conversaciones_personas (producto);

CREATE INDEX IF NOT EXISTS idx_conv_personas_etapa
  ON conversaciones_personas (etapa);

COMMENT ON TABLE conversaciones_personas
  IS 'Leads del chatbot para el ramo Personas (Vida, Accidentes Personales, Funerario, HCM)';


-- ──────────────────────────────────────────────────────────────────────────
-- 🏠 TABLA: conversaciones_patrimoniales
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversaciones_patrimoniales (
  id                       BIGSERIAL PRIMARY KEY,
  created_at               TIMESTAMPTZ DEFAULT NOW(),

  -- Metadata del lead
  producto                 TEXT,   -- 'Combinado Residencial' por defecto
  etapa                    TEXT,
  aseguradora              TEXT,

  -- Datos del cliente
  nombre                   TEXT,
  cedula                   TEXT,
  fecha_nacimiento         TEXT,
  edad                     TEXT,
  sexo                     TEXT,
  estado_civil             TEXT,
  ocupacion                TEXT,
  telefono                 TEXT,
  email_cliente            TEXT,

  -- Dirección DEL CLIENTE
  estado                   TEXT,
  ciudad                   TEXT,
  municipio                TEXT,
  parroquia                TEXT,
  urbanizacion             TEXT,
  via                      TEXT,
  edificio                 TEXT,
  piso_apto                TEXT,
  punto_referencia         TEXT,

  -- 🏠 Específicos del inmueble (Combinado Residencial)
  tipo_inmueble            TEXT,
  uso_inmueble             TEXT,
  valor_inmueble           TEXT,
  valor_contenido          TEXT,
  antiguedad_construccion  TEXT,
  metros_cuadrados         TEXT,
  habitado                 TEXT,
  coberturas_hogar         TEXT,

  -- Cobertura y pago
  plan_cobertura           TEXT,
  suma_asegurada           TEXT,
  frecuencia_pago          TEXT,
  forma_pago               TEXT,
  precio                   TEXT,

  -- Historial completo
  historial_chat           TEXT
);

CREATE INDEX IF NOT EXISTS idx_conv_patrimoniales_created_at
  ON conversaciones_patrimoniales (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_conv_patrimoniales_etapa
  ON conversaciones_patrimoniales (etapa);

COMMENT ON TABLE conversaciones_patrimoniales
  IS 'Leads del chatbot para el ramo Patrimoniales (Combinado Residencial / Hogar)';


-- ============================================================================
-- 📦 BACKFILL: copiar datos existentes de `conversaciones_chatbot` a cada
--             tabla nueva, según el valor de `ramo`.
--
-- Solo copia si la tabla destino está VACÍA (evita duplicados al re-ejecutar).
-- ============================================================================

-- 🚗 Automóvil
INSERT INTO conversaciones_automovil (
  created_at, producto, etapa, aseguradora,
  nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente,
  estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia,
  tipo_vehiculo, uso_vehiculo, marca, modelo, ano, version, transmision, color, placa,
  serial_motor, serial_carroceria, plan_rcv,
  plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio,
  historial_chat
)
SELECT
  created_at, producto, etapa, aseguradora,
  nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente,
  estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia,
  tipo_vehiculo, uso_vehiculo, marca, modelo, ano, version, transmision, color, placa,
  serial_motor, serial_carroceria, plan_rcv,
  plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio,
  historial_chat
FROM conversaciones_chatbot
WHERE ramo = 'automovil'
  AND NOT EXISTS (SELECT 1 FROM conversaciones_automovil LIMIT 1);

-- 👨‍👩‍👧 Personas
INSERT INTO conversaciones_personas (
  created_at, producto, etapa, aseguradora,
  nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente,
  estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia,
  beneficiario_1, parentesco_1, porcentaje_1, beneficiario_2, parentesco_2, porcentaje_2,
  plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio,
  historial_chat
)
SELECT
  created_at, producto, etapa, aseguradora,
  nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente,
  estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia,
  beneficiario_1, parentesco_1, porcentaje_1, beneficiario_2, parentesco_2, porcentaje_2,
  plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio,
  historial_chat
FROM conversaciones_chatbot
WHERE ramo = 'personas'
  AND NOT EXISTS (SELECT 1 FROM conversaciones_personas LIMIT 1);

-- 🏠 Patrimoniales
INSERT INTO conversaciones_patrimoniales (
  created_at, producto, etapa, aseguradora,
  nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente,
  estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia,
  tipo_inmueble, uso_inmueble, valor_inmueble, valor_contenido, antiguedad_construccion,
  metros_cuadrados, habitado, coberturas_hogar,
  plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio,
  historial_chat
)
SELECT
  created_at, producto, etapa, aseguradora,
  nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente,
  estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia,
  tipo_inmueble, uso_inmueble, valor_inmueble, valor_contenido, antiguedad_construccion,
  metros_cuadrados, habitado, coberturas_hogar,
  plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio,
  historial_chat
FROM conversaciones_chatbot
WHERE ramo = 'patrimoniales'
  AND NOT EXISTS (SELECT 1 FROM conversaciones_patrimoniales LIMIT 1);

-- ============================================================================
-- 🔐 ROW LEVEL SECURITY (seguridad de filas)
-- ============================================================================
-- Modelo de seguridad:
--   • anon (chatbot público en el navegador)
--       → SOLO puede INSERTAR. No puede leer, modificar ni borrar nada.
--   • service_role (panel admin futuro desde backend Node)
--       → Bypassa RLS automáticamente. Puede hacer todo. NUNCA exponer en
--         el navegador; vive solo en variables de entorno del servidor.
--   • authenticated (no se usa actualmente, queda preparado por si más
--       adelante se agrega Supabase Auth para el panel admin)
--
-- Resultado: aunque alguien robe la VITE_SUPABASE_ANON_KEY de tu frontend
-- (es trivial verla en DevTools), NO podrá leer ni borrar leads.
-- ============================================================================

-- 1) Habilitar RLS en las 3 tablas nuevas + la legacy
ALTER TABLE conversaciones_automovil      ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones_personas       ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones_patrimoniales  ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones_chatbot        ENABLE ROW LEVEL SECURITY;

-- 2) Políticas: solo INSERT para anon (drop primero para idempotencia)

-- 🚗 Automóvil
DROP POLICY IF EXISTS "anon_insert_automovil" ON conversaciones_automovil;
CREATE POLICY "anon_insert_automovil"
  ON conversaciones_automovil
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 👨‍👩‍👧 Personas
DROP POLICY IF EXISTS "anon_insert_personas" ON conversaciones_personas;
CREATE POLICY "anon_insert_personas"
  ON conversaciones_personas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 🏠 Patrimoniales
DROP POLICY IF EXISTS "anon_insert_patrimoniales" ON conversaciones_patrimoniales;
CREATE POLICY "anon_insert_patrimoniales"
  ON conversaciones_patrimoniales
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 📦 Legacy (por si algún código viejo todavía intenta escribir aquí)
DROP POLICY IF EXISTS "anon_insert_chatbot_legacy" ON conversaciones_chatbot;
CREATE POLICY "anon_insert_chatbot_legacy"
  ON conversaciones_chatbot
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ❌ NO se crean políticas de SELECT / UPDATE / DELETE para anon.
--    Cualquier intento desde el navegador devolverá [] (vacío) o un error
--    de permisos. El panel admin (cuando exista) deberá usar service_role
--    desde un backend Node, no desde el navegador.

-- ============================================================================
-- ✅ Verificación rápida (descomenta y corre línea por línea después):
--
-- -- 1) Conteo por tabla
-- SELECT 'automovil' AS ramo, COUNT(*) FROM conversaciones_automovil
-- UNION ALL
-- SELECT 'personas',          COUNT(*) FROM conversaciones_personas
-- UNION ALL
-- SELECT 'patrimoniales',     COUNT(*) FROM conversaciones_patrimoniales
-- UNION ALL
-- SELECT 'legacy_total',      COUNT(*) FROM conversaciones_chatbot;
--
-- -- 2) Confirmar que RLS está habilitado en las 4 tablas
-- SELECT schemaname, tablename, rowsecurity
-- FROM   pg_tables
-- WHERE  tablename IN (
--   'conversaciones_automovil', 'conversaciones_personas',
--   'conversaciones_patrimoniales', 'conversaciones_chatbot'
-- );
-- -- (rowsecurity debe ser TRUE para las 4)
--
-- -- 3) Listar políticas creadas
-- SELECT schemaname, tablename, policyname, cmd, roles
-- FROM   pg_policies
-- WHERE  tablename LIKE 'conversaciones_%';
-- ============================================================================
