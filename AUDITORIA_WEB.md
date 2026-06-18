# Auditoría Técnica — Web FFC Consultants (productor de leads)

**Fecha:** 2026-06-14
**Repositorio:** `ffconsultantsve`
**Rama auditada:** `AndresP`
**Objetivo:** Documentar el estado actual de la web antes de construir un CRM externo que tome posesión del Supabase y sea la fuente única de verdad de los leads.

> Esta auditoría es **solo de lectura**. No se modificó ningún archivo del proyecto.

---

## 1. Stack y versiones

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework UI | **React** | `18.2.0` |
| Build tool / dev server | **Vite** | `^6.3.5` (plugin `@vitejs/plugin-react ^4.3.4`) |
| Lenguaje | **JavaScript (JSX)**, ES Modules (`"type": "module"`) | — sin TypeScript (solo `@types/*` para tooling) |
| Gestor de paquetes | **npm** | `>=10.x` (engine declarado) / Node `>=22.x` |
| Routing | `react-router-dom` | `6.15.0` |
| Estilos | Tailwind CSS + `@tailwindcss/forms` | `^3.3.3` |
| Backend (serverless) | Vercel Functions (Node) | runtime `@vercel/node@3.0.0` |

### Librerías principales (`package.json`)

**Producción:**
- `@supabase/supabase-js ^2.105.4` — cliente Supabase (escritura de leads).
- `openai ^4.104.0` — cliente del LLM (usado en el backend `/api/chat`).
- `@emailjs/browser ^4.4.1` y `emailjs-com 3.2.0` — envío de correos (dos librerías de EmailJS conviven; ver hallazgos).
- `framer-motion ^12.38.0` — animaciones.
- `leaflet ^1.9.4` + `react-leaflet ^4.2.1` — mapa interactivo para seleccionar dirección en el chatbot.
- `sweetalert2 ^11.17.2` — alertas/modales.
- `@headlessui/react`, `@heroicons/react`, `react-icons`, `react-helmet` — UI.
- `express ^4.22.1`, `cors`, `dotenv` — **solo para el servidor de desarrollo local** (`server.dev.js`), no para producción.

**Desarrollo:** ESLint 8, Prettier, Husky 8 + lint-staged, PostCSS, autoprefixer.

> ⚠️ Nota: el `package.json` declara en `lint-staged` un hook a `tslint --fix` (proyecto sin TypeScript ni tslint instalado) — configuración muerta, sin impacto funcional.

---

## 2. Estructura del proyecto

Árbol a 2–3 niveles (excluyendo `node_modules`, `dist`, `.git`):

```
ffconsultantsve/
├── api/                      ← BACKEND serverless (Vercel Functions)
│   ├── chat.js               ← Chatbot: llama a OpenAI + reenvía leads a Power Automate
│   ├── cotizacion.js         ← Recibe cotización validada → Power Automate
│   └── lead.js               ← Genera enlace de WhatsApp (form "llámame")
├── server.dev.js             ← Réplica local de /api para desarrollo (Express+Vite)
├── supabase/
│   └── migrations/           ← Esquema SQL (fuente de verdad del schema actual)
│       ├── 001_add_ramo_and_hogar_fields.sql
│       ├── 002_split_into_three_tables.sql
│       └── 003_create_cotizaciones_table.sql
├── src/
│   ├── App.jsx               ← Definición de rutas (react-router)
│   ├── components/
│   │   ├── Chatbot/          ← ★ CÓDIGO DEL CHATBOT (frontend)
│   │   │   ├── ChatbotEmbedded.jsx   (1049 líneas — toda la lógica del bot)
│   │   │   └── AddressMapPicker.jsx  (mapa Leaflet)
│   │   ├── ContactForm/      ← Formulario de contacto (EmailJS)
│   │   ├── Header/ Footer/ Root/ ... ← Layout y secciones de la página
│   │   └── (ActionSection, Testimonials, InsuranceBanners, Stepper, etc.)
│   ├── data/
│   │   ├── chatbot/          ← ★ BASE DE CONOCIMIENTO del bot, segmentada por ramo
│   │   │   ├── index.js              (orquestador + generateSystemPrompt)
│   │   │   ├── shared.js             (info común)
│   │   │   └── ramos/{automovil,personas,patrimoniales}.js
│   │   ├── chatbot-knowledge.js  (fachada de compatibilidad → re-exporta chatbot/)
│   │   ├── tarifas-seguros.js    (cálculo de primas auto)
│   │   ├── tarifas-microseguros.js
│   │   ├── microseguros-formularios.js
│   │   └── contactInfo.js
│   ├── lib/
│   │   └── supabase.js       ← ★ CAPA DE ACCESO A SUPABASE (guardar/leer leads)
│   ├── pages/                ← PÁGINAS de la web (una carpeta por ruta)
│   │   ├── Home/ Contact/ Cotizar/ Agent/ We/ NotFound/ ...
│   │   ├── Plans{Caracas,Estar,Oceanica,Piramide,Real}/  (catálogos por aseguradora)
│   │   └── Pagar/            ← Página de pago (datos bancarios / transferencia)
│   ├── assets/ css/          ← Imágenes y estilos
│   └── (main.jsx)
├── public/chatbot/           ← Assets estáticos del widget
├── vercel.json               ← Config de deploy (Vercel)
├── vite.config.js / tailwind.config.js / postcss.config.js
└── .env / .env.local / .env.example   ← Variables de entorno (ver §3)
```

**Separación página vs. chatbot:**
- **Página (sitio público):** `src/pages/**` (rutas) + `src/components/**` salvo `Chatbot/`. Marketing, catálogos de planes por aseguradora, contacto, página de pago.
- **Chatbot (frontend):** `src/components/Chatbot/ChatbotEmbedded.jsx` (UI + orquestación de la conversación y captura de datos) y su base de conocimiento en `src/data/chatbot/**`.
- **Chatbot (backend):** `api/chat.js` (la llamada al LLM y el reenvío de leads viven aquí, no en el navegador).

---

## 3. Integración Supabase actual

### 3.1 Cliente y patrón de acceso
- Toda la interacción con Supabase está centralizada en **`src/lib/supabase.js`**.
- Cliente creado con `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)` — **clave `anon` pública**, ejecutándose **en el navegador**.
- Modelo de seguridad: **RLS habilitado** en todas las tablas; el rol `anon` **solo puede `INSERT`** (no `SELECT`/`UPDATE`/`DELETE`). Por eso los `insert` se hacen **sin `.select()`** (devolver la fila recién creada fallaría con 401).

### 3.2 Tablas existentes hoy (según migraciones SQL)

El esquema vive en `supabase/migrations/`. Tablas:

| Tabla | Origen | Propósito | Escritura desde |
|-------|--------|-----------|-----------------|
| `conversaciones_chatbot` | legacy (001) | Tabla monolítica original. Conservada como respaldo. RLS insert-only. | (legacy) |
| `conversaciones_automovil` | 002 | Leads del ramo **Auto / RCV** que **completaron emisión**. | `guardarConversacion()` |
| `conversaciones_personas` | 002 | Leads del ramo **Personas** (Vida, AP, Funerario, HCM) emitidos. | `guardarConversacion()` |
| `conversaciones_patrimoniales` | 002 | Leads del ramo **Patrimoniales** (Hogar / Combinado Residencial) emitidos. | `guardarConversacion()` |
| `cotizaciones` | 003 | **Embudo de seguimiento**: leads que cotizaron pero **NO** completaron emisión. Una sola tabla para los 3 ramos. | `guardarCotizacion()` |
| `cotizaciones_pendientes` | 003 (VIEW) | Vista que filtra `cotizaciones` excluyendo cédulas que ya aparecen en las 3 tablas por ramo. `security_invoker = true`. | — (solo lectura desde Dashboard) |

**Lógica del funnel (importante para el CRM):**
- Un lead que **ve precios o elige aseguradora** → fila en `cotizaciones` (etapas: `Cotización - Precios mostrados`, `Cotización - Aseguradora seleccionada`, `Finalizado - Pendiente pago`).
- Un lead que **confirma emisión / inicia pago** → fila en `conversaciones_<ramo>` (etapas: `Emisión - Confirmada`, `Emisión - Pago iniciado`, `Emisión - Comprobante enviado`).
- Las filas en `cotizaciones` **no se borran**; la vista `cotizaciones_pendientes` se encarga de no mostrar a quien ya emitió (match por `cedula` normalizada).

### 3.3 Datos que la web guarda en Supabase

**Columnas comunes (las 3 tablas por ramo):**
`producto, etapa, aseguradora, nombre, cedula, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, telefono, email_cliente, estado, ciudad, municipio, parroquia, urbanizacion, via, edificio, piso_apto, punto_referencia, plan_cobertura, suma_asegurada, frecuencia_pago, forma_pago, precio, historial_chat, created_at`.

**Específicas por ramo:**
- **Auto:** `tipo_vehiculo, uso_vehiculo, marca, modelo, ano, version, transmision, color, placa, serial_motor, serial_carroceria, plan_rcv`.
- **Personas:** `beneficiario_1/2, parentesco_1/2, porcentaje_1/2`.
- **Patrimoniales:** `tipo_inmueble, uso_inmueble, valor_inmueble, valor_contenido, antiguedad_construccion, metros_cuadrados, habitado, coberturas_hogar`.

**Tabla `cotizaciones` (subset mínimo de contacto):**
`ramo, producto, etapa, aseguradora, precio, nombre, cedula, telefono, email_cliente, historial_chat, created_at`.

> `historial_chat` guarda **toda la conversación** del bot como texto plano (`role: content` por línea).

### 3.4 Credenciales / variables de entorno (nombres, sin valores)

Las env vars del navegador llevan prefijo `VITE_` (Vite las inyecta en el bundle → **públicas**). Las del backend (`process.env`) son **secretas** y solo viven en Vercel / `.env.local`.

**Frontend (públicas, prefijo `VITE_`):**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EMAIL_SERVICE`
- `VITE_EMAIL_TEMPLATE`
- `VITE_EMAIL_COTIZADOR`
- `VITE_EMAIL_USER`
- `VITE_EMAIL_PRIVATE_KEY` *(definida en `.env`; ver hallazgo de seguridad — una "private key" no debería estar en una var `VITE_`)*

**Backend (secretas, `process.env`):**
- `OPENAI_API_KEY`
- `POWER_AUTOMATE_AUTO`
- `POWER_AUTOMATE_PERSONAS`
- `POWER_AUTOMATE_PATRIMONIALES`
- `POWER_AUTOMATE_SURVEYS` *(referenciada en `api/chat.js`, opcional; cae a PERSONAS si falta)*
- `NODE_ENV`, `PORT` *(solo dev)*

**Ubicación de archivos:** `.env` y `.env.local` (locales, **ignorados por git** hoy); `.env.example` es la plantilla versionada. Los valores reales en producción se configuran en el dashboard de Vercel.

---

## 4. El chatbot

### 4.1 Cómo está implementado
- **Frontend:** `src/components/Chatbot/ChatbotEmbedded.jsx` — widget React embebido. Mantiene el estado de la conversación (`messages`), detecta el "ramo" (automovil / personas / patrimoniales), muestra botones rápidos, un *stepper* de progreso y un selector de dirección con mapa Leaflet (`AddressMapPicker.jsx`).
- **Backend:** `api/chat.js` (Vercel Function). El navegador hace `POST /api/chat` con `{ messages, ramo, context }`. La función arma el *system prompt* y llama al LLM.

### 4.2 Tecnología del LLM
- **Proveedor:** **OpenAI** (SDK `openai`), modelo **`gpt-4o-mini`** (`temperature 0.7`, `max_tokens 500`).
- El *system prompt* se genera dinámicamente por ramo con `generateSystemPrompt(ramo)` desde `src/data/chatbot/` y se le concatenan instrucciones de recolección de datos, tarifas y encuesta.
- La `OPENAI_API_KEY` vive **solo en el backend** (correcto: no se expone al navegador).
- Protecciones en el endpoint: CORS restringido a orígenes permitidos (`ffconsultantsve.com`, `www.`, localhost), rate-limit **en memoria** (20 req/min en `chat`), y headers de seguridad.

### 4.3 Dónde se guardan las conversaciones
Hay **dos destinos distintos**, según el camino del código:

1. **Backend (`api/chat.js`) → Power Automate (+ EmailJS):** cuando el LLM emite un bloque ` ```json:LEAD_DATA ` o ` ```json:SURVEY_DATA `, el backend lo parsea y hace `fetch` a la URL de Power Automate del ramo (`POWER_AUTOMATE_*`). En la versión local (`server.dev.js`) además envía un **correo de respaldo vía EmailJS**. **Este camino NO escribe en Supabase.**
2. **Frontend (`ChatbotEmbedded.jsx`) → Supabase:** independientemente del LLM, el componente detecta hitos de la conversación (mostró precios, eligió aseguradora, confirmó emisión, inició pago, envió comprobante) y llama a `guardarCotizacion()` / `guardarConversacion()` de `src/lib/supabase.js`, que insertan en las tablas descritas en §3. El historial completo se guarda en `historial_chat`.

> 🔎 **Hallazgo clave para el CRM:** el chatbot tiene **dos pipelines de captura paralelos y desacoplados** — Supabase (escrito desde el frontend con la `anon key`) y Power Automate/EmailJS (escrito desde el backend a partir del JSON que emite el LLM). No se sincronizan entre sí. La detección de hitos en el frontend es **frágil**: depende de coincidencias de texto en español dentro del mensaje del bot (`includes('asesor te contactará')`, `includes('comparativa')`, etc.).

### 4.4 Qué datos captura de los visitantes
A lo largo del flujo el bot recopila (vía `extraerDatosDelChat`): **nombre completo, cédula (V/E), teléfono, email, fecha de nacimiento, sexo, estado civil, ocupación/profesión, dirección detallada** (estado, ciudad, municipio, parroquia, urbanización, vía, edificio, piso/apto, referencia), **datos del bien asegurado** (vehículo: marca/modelo/año/versión/transmisión/placa/seriales; inmueble: tipo/uso/valor/m²; personas: beneficiarios y parentesco), **aseguradora elegida, cobertura, frecuencia y forma de pago, precio**, la **intención/etapa del funnel** y una **encuesta de satisfacción** (facilidad de uso 1-5, comentario, recomendaría). Para emisión de Seguros Caracas el prompt llega a pedir hasta 51 (persona natural) / 64 (jurídica) campos.

---

## 5. Captura de leads — inventario de puntos de entrada

| # | Punto de captura | Archivo | Datos | Destino actual |
|---|------------------|---------|-------|----------------|
| 1 | **Chatbot — funnel Supabase** | `ChatbotEmbedded.jsx` → `lib/supabase.js` | Lead completo + `historial_chat` | **Supabase** (`cotizaciones` y `conversaciones_<ramo>`) |
| 2 | **Chatbot — LEAD_DATA del LLM** | `api/chat.js` | JSON estructurado del lead | **Power Automate** (`POWER_AUTOMATE_<ramo>`); en dev también **EmailJS** → `ffconsultantsve@outlook.com` |
| 3 | **Chatbot — encuesta** | `api/chat.js` | facilidadUso, comentario, recomendaría | **Power Automate** (`POWER_AUTOMATE_SURVEYS`/PERSONAS) |
| 4 | **Chatbot — emails de cotización** | `ChatbotEmbedded.jsx` (`enviarEmailCotizacion`, `emailjs-com`) | Datos del lead | **EmailJS** (envío directo desde el navegador) |
| 5 | **Chatbot — "Pago / comprobante"** | `ChatbotEmbedded.jsx` → `/pagar` y `wa.me/...` | nombre, cédula, producto, aseguradora | **WhatsApp** (link `wa.me`) + Supabase (paso 1) |
| 6 | **Formulario de contacto** | `components/ContactForm/ContactForm.jsx` | nombre, email, teléfono, comentario | **EmailJS** (`emailjs.sendForm`, plantilla `VITE_EMAIL_TEMPLATE`) — **no toca Supabase** |
| 7 | **Form "llámame" / lead rápido** | `api/lead.js` | nombre, teléfono, horario, mensaje | Genera **link de WhatsApp** a `584129713806` (no persiste en ningún lado) |
| 8 | **Cotización validada** | `api/cotizacion.js` | Lead validado por tipo | **Power Automate** (`POWER_AUTOMATE_<tipo>`) |

> En resumen: los leads hoy se dispersan en **cuatro destinos** no unificados — **Supabase**, **Power Automate (→ Microsoft/Dynamics)**, **EmailJS (correo)** y **WhatsApp (links manuales)**. No existe una única fuente de verdad. El CRM nuevo debe consolidar esto.

---

## 6. Deploy

- **Plataforma:** **Vercel** (config en `vercel.json`).
- **Build:** `npm run build` (Vite) → salida en `dist/`.
- **Funciones serverless:** todo lo de `api/*.js` corre como Vercel Functions con runtime `@vercel/node@3.0.0`.
- **Rewrites:** API passthrough (`/api/:path*`), assets del chatbot (`/chatbot/*`) y **SPA fallback** (`/(.*) → /`) para react-router.
- **Desarrollo local:** `npm run dev:api` levanta `server.dev.js` (Express + Vite middleware en `:3000`) que **replica** los handlers de `/api` para poder probar el bot sin desplegar. Este servidor **no se usa en producción**.
- **Documentación:** `DEPLOYMENT.md` describe el alta de las env vars `VITE_EMAIL_*` en Vercel.

**Env vars necesarias en producción (Vercel):**
- Frontend: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_EMAIL_SERVICE`, `VITE_EMAIL_TEMPLATE`, `VITE_EMAIL_COTIZADOR`, `VITE_EMAIL_USER` (y `VITE_EMAIL_PRIVATE_KEY` si se usa el envío server-side de EmailJS).
- Backend: `OPENAI_API_KEY`, `POWER_AUTOMATE_AUTO`, `POWER_AUTOMATE_PERSONAS`, `POWER_AUTOMATE_PATRIMONIALES` (y opcional `POWER_AUTOMATE_SURVEYS`).

---

## 7. Hallazgos de seguridad / deuda técnica (relevantes para el CRM)

1. **Rate-limit en memoria:** los contadores (`Map`) de `api/chat.js`, `lead.js`, `cotizacion.js` viven en RAM. En Vercel (varias instancias / cold starts) el límite es por instancia y se reinicia. No es fiable como protección.
2. **Detección de hitos por texto:** la persistencia en Supabase depende de que el mensaje del bot contenga frases exactas en español. Cualquier cambio de wording del LLM **puede dejar de guardar leads silenciosamente**.
3. **Escritura a Supabase con `anon key` desde el navegador:** funciona porque RLS es insert-only, pero la clave es pública y cualquiera puede insertar filas arbitrarias (no hay validación server-side de lo que entra a las tablas). El CRM no debería confiar ciegamente en esos datos.
4. **Secretos de EmailJS en el historial de git:** `.env` estuvo versionado (commits `7d97ab8`, `9ed3909`) e incluyó `VITE_EMAIL_*` y `VITE_EMAIL_PRIVATE_KEY` antes de quitarse del tracking (`2d46599`). Aunque hoy está en `.gitignore`, **esas credenciales siguen en la historia** → conviene rotarlas. (La `OPENAI_API_KEY` y las URLs de Power Automate están en `.env.local`, que **nunca** se versionó — OK.)
5. **Datos sensibles en texto plano:** `historial_chat` y los campos de cédula/dirección/seriales se guardan sin cifrar. A considerar para cumplimiento al diseñar el CRM.
6. **Dos clientes EmailJS** (`@emailjs/browser` y `emailjs-com`) y `forma_pago`/datos bancarios hardcodeados en el componente del chat — limpieza recomendada, fuera del alcance de esta auditoría.

---

## 8. Recomendación de desacople (web → CRM externo)

**Contexto:** hoy la web es a la vez productora **y** dueña de los datos (escribe directo a su propio Supabase con la `anon key`, además de a Power Automate/EmailJS/WhatsApp). El objetivo es que pase a ser **solo productora** y que el **CRM sea la única fuente de verdad**.

### Opción recomendada: **endpoint propio del CRM (HTTP API) + un único punto de salida en la web**

Crear en el CRM un endpoint de ingest, p. ej. `POST /api/leads/ingest`, autenticado con un **API key de servidor** (header `Authorization`), y que la web envíe **todos** sus leads ahí. En concreto:

1. **Un solo "lead emitter" en la web.** Reemplazar las llamadas dispersas (`guardarConversacion`, `guardarCotizacion`, los `fetch` a Power Automate, EmailJS) por **una función `enviarLeadAlCRM(payload)`** que viva en el **backend** (`api/`), no en el navegador. El frontend solo hace `POST /api/chat` y `/api/lead`; el reenvío al CRM ocurre server-side, donde el API key del CRM está protegido como `process.env.CRM_API_KEY`.
2. **El CRM es dueño del esquema.** El endpoint del CRM recibe un payload normalizado (lead + ramo + etapa + `historial_chat` + canal + timestamp), valida, deduplica (por cédula/teléfono) y decide en qué estado del pipeline entra. La web deja de conocer las tablas.
3. **Idempotencia / no perder leads.** Enviar un `idempotency_key` (p. ej. hash de cédula+ramo+sesión) para que reintentos no dupliquen. Si el CRM no responde, encolar/reintentar en el backend.

**Por qué esta forma y no las otras:**

- **❌ Escritura directa al Supabase compartido (la web sigue haciendo `insert`):** es la opción más rápida pero la peor a largo plazo. Acopla el esquema del CRM a la web, obliga a exponer credenciales de escritura en el navegador, no permite validación/normalización antes de entrar, y mezcla "datos crudos de un productor no confiable" con "fuente de verdad". Si más adelante cambias el modelo de datos del CRM, rompes la web. **Solo aceptable como medida puente.**
- **➖ Webhook (la web dispara un webhook genérico):** es esencialmente lo mismo que el endpoint del CRM, pero "webhook" suele implicar *fire-and-forget* sin contrato fuerte ni reintentos. Útil si quieres bajo acoplamiento, pero conviene que ese webhook sea **el endpoint versionado y autenticado del CRM** con respuesta síncrona (para confirmar recepción) — es decir, converge con la opción recomendada.
- **✅ API endpoint del CRM (recomendado):** contrato explícito y versionado, autenticación de servidor, validación/dedup del lado del CRM, reintentos, y la web queda **totalmente ignorante** del almacenamiento. Es el desacople más limpio y el que mejor soporta que mañana añadas otros productores de leads (campañas, landing pages, IG) apuntando al mismo `/ingest`.

### Camino de migración sugerido (incremental, sin downtime)
1. **Fase 0 — doble escritura:** el backend de la web sigue escribiendo a Supabase **y** empieza a llamar a `enviarLeadAlCRM()`. Comparas que el CRM recibe todo.
2. **Fase 1 — CRM toma posesión del Supabase actual:** el CRM pasa a leer/ser dueño de las tablas existentes (o migra los datos a su propio esquema). La web deja de leer; solo escribe vía endpoint.
3. **Fase 2 — cortar la escritura directa:** eliminar de `ChatbotEmbedded.jsx` las llamadas a `lib/supabase.js` y mover toda la persistencia al backend → CRM. La web ya no tiene `VITE_SUPABASE_*`.
4. **Fase 3 — consolidar canales:** redirigir Power Automate, EmailJS y los links de WhatsApp para que sean **notificaciones** disparadas por el CRM (no fuentes de datos paralelas). Así el CRM queda como única fuente de verdad y la web como puro productor.

**Resultado final:** la web hace `POST` de cada lead a **un solo endpoint autenticado del CRM**; el CRM valida, deduplica, asigna etapa del funnel y notifica a asesores. Sin `anon key` en el navegador, sin esquema acoplado, y con un único punto donde auditar todos los leads.

---

*Fin de la auditoría. No se modificó código del proyecto; este archivo es el único entregable.*
