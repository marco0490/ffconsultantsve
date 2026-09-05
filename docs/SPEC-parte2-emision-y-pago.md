# SPEC · Parte 2 — Emisión, Pago y Acceso a la App

**Continúa la Parte 1** (`docs/SPEC-flujo-conversacional.md`). Arranca cuando el cliente toca **"Me interesa este plan"** en la pantalla de resultado.
**Principio rector:** la web **espeja el flujo que ya funciona por WhatsApp**. No inventa campos, no emite, no cobra, no genera claves. Todo eso lo hace el **core** (FastAPI).

---

## 0. Arquitectura (supuestos fijos — no cuestionar)

| Pieza | Qué hace | Quién es dueño |
|---|---|---|
| **Web** (este repo) | Front de cotización + captura de datos de emisión + UI de pago | Nosotros |
| **Core** (FastAPI) | Cotiza, crea persona/póliza, cobra por Pago Móvil C2P (Quickpay), verifica el pago, **emite automáticamente**, genera PDF, dispara provisioning | Existente (mismo del bot de WhatsApp) |
| **Plataforma de servicio / provisioning** | Crea el usuario del cliente y envía la **clave temporal** (email vía Resend, o WhatsApp) | Existente |
| **App** (Expo: iOS/Android/web) | El cliente entra con **cédula + clave temporal**, cambio obligatorio de clave | Existente |
| ~~Supabase~~ | CRM viejo, vacío, se elimina | **Ignorar** |

**No hay aprobación humana en ningún paso.** Pago confirmado → póliza emitida en segundos → PDF → clave temporal enviada.

---

## 1. Decisión #1 — ¿La web habla con el core directo o pasa por un backend propio?

**Recomendación: Web → funciones `api/` en Vercel (backend delgado) → Core.** Es decir, el patrón que ya existe con `api/chat.js`.

Razones:
1. **Seguridad.** El navegador es territorio hostil. Si el core exige una API key o secreto, ese secreto **no puede vivir en el frontend** (sería el mismo problema del `.env` en el repo público, pero peor: visible en el bundle de producción para cualquiera). En WhatsApp, Meta → core es servidor-a-servidor con secreto; en web, el equivalente es Vercel function → core.
2. **Datos de pago.** Cédula, banco, teléfono afiliado y código SMS del C2P deben viajar por un canal que controlamos, con validación previa, y **nunca guardarse en la web**. El backend delgado los reenvía al core y los olvida.
3. **Desacople.** Si el core cambia rutas o formato, se ajusta una función en `api/` sin tocar el front. Y permite el **modo mock** para la demo (ver §6).
4. **CORS / rate limiting / idempotencia** se resuelven en un solo lugar.

**Única excepción aceptable:** si el core ya expone endpoints *diseñados para navegador* (sin secreto, con CORS abierto y tokens de sesión por cotización). Eso hay que **confirmarlo con Marco** — hasta entonces, el patrón es el proxy.

---

## 2. Contrato de API que la web necesita del core

Esta es la lista para **confirmar con Marco** qué existe, qué falta y con qué nombres reales. Nombres propuestos; los reales mandan.

| # | Endpoint (propuesto) | Entrada | Salida | Uso en la web |
|---|---|---|---|---|
| 1 | `POST /v1/cotizaciones` | vehículo (marca, modelo, año, tipo, valor, uso, estado), persona básica | `cotizacion_id`, lista de planes por aseguradora (precio, coberturas, deducible, frecuencias) | Reemplaza las tarifas demo locales en el loader de la Parte 1 |
| 2 | `POST /v1/solicitudes` (o `/emisiones`) | `cotizacion_id`, `plan_id`, datos de emisión (placa, serial carrocería, puestos, uso, tomador, PLAFT), contacto | `solicitud_id`, monto a pagar, estado `pendiente_pago` | Al terminar la verificación (E4) |
| 3 | `POST /v1/pagos/c2p/iniciar` | `solicitud_id`, cédula/RIF, banco, teléfono afiliado | `pago_id`, estado `esperando_codigo` | Pantalla de pago (E5), botón "Solicitar código" |
| 4 | `POST /v1/pagos/c2p/confirmar` | `pago_id`, código SMS | estado `aprobado` / `rechazado` + motivo | Botón "Confirmar pago" |
| 5 | `GET /v1/solicitudes/{id}` | — | estado (`pendiente_pago` → `pagada` → `emitida`), `poliza_id`, `pdf_url`, `provisioning`: `{ enviado: true, canal: 'email', destino: 'a***@gmail.com' }` | Polling en el loader post-pago hasta `emitida` |
| 6 | `GET /v1/catalogos/bancos` | — | lista de bancos C2P | Select de banco |
| 7 | `GET /v1/catalogos/vehiculos` (si existe) | — | marcas/modelos | Reemplaza `vehiculos.js` local (opcional) |

**Preguntas concretas para Marco:**
- ¿Cuáles de estos ya existen y con qué rutas exactas? ¿Hay Swagger/OpenAPI del core? (FastAPI lo genera en `/docs` — pedir la URL).
- ¿Autenticación del core: API key por header, JWT de servicio, IP allowlist?
- ¿El core acepta `Idempotency-Key`? (evita doble emisión si el cliente recarga).
- ¿El provisioning se dispara solo al emitir, o hay que llamarlo aparte?
- ¿Qué devuelve exactamente el core cuando el C2P es rechazado? (fondos, código vencido, teléfono no afiliado…) — para mostrar mensajes útiles.
- ¿Existe un **ambiente de pruebas** del core con pagos simulados? (imprescindible para la demo sin cobrar de verdad).

---

## 3. Flujo de emisión (pantallas E0 → E6)

Se conserva el `WizardLayout` de la Parte 1: avatar, progreso (ahora "Emisión · Paso X de 6"), atrás, botón primario. **La barra de progreso se reinicia** para la etapa de emisión, con un color ligeramente distinto para marcar que es una fase nueva.

### E0 · Aviso de requisitos (modal sobre la pantalla de resultado)
- **Título:** "Para emitir tu póliza necesitarás estos datos del auto"
- **Tarjetas informativas:**
  - 🔢 **Placa** — "6 a 7 caracteres, como aparece en tu carnet de circulación"
  - 🔩 **Serial de carrocería** — "17 caracteres. Está en el carnet de circulación o en la puerta del piloto" + enlace "¿Dónde lo encuentro?" (abre imagen/ayuda)
  - 🪪 **Tu cédula a la mano** — para el pago móvil
- **Botones:** "Continuar" · "Volver"

### E1 · Datos del vehículo (`/cotizar/emision/vehiculo`)
- **Avatar:** "Vamos a emitir tu póliza de [Aseguradora] 🎉 Primero, los datos del auto"
- **StepForm:**
  - PLACA → prellenada si la dio en la Parte 1; ahora **obligatoria**. Mayúsculas automáticas, 6–7 alfanuméricos.
  - SERIAL DE CARROCERÍA → texto, 17 caracteres alfanuméricos, mayúsculas automáticas, sin I/O/Q (estándar VIN). Mensaje: "El serial debe tener 17 caracteres".
  - PUESTOS / CAPACIDAD → `StepCards` en línea: 2 · 4 · 5 · 7 · 9+ (o input numérico si el core espera número libre).
  - USO DEL VEHÍCULO → prellenado desde la Parte 1, editable: Particular · Comercial · Transporte (espejar **exactamente** los valores que acepta el core).
- **Validación:** todos obligatorios.

### E2 · Datos del tomador (`/cotizar/emision/tomador`)
- **Avatar:** "¿A nombre de quién va la póliza?"
- **Toggle:** "Soy yo" (prellena con los datos de la Parte 1) · "Otra persona / empresa".
- Si "Otra persona": NOMBRE COMPLETO · CÉDULA/RIF (selector V/E/J/G + número) · TELÉFONO.
- **Nota:** si el core solo pide "nombre del tomador", mostrar solo eso y no más — **espejar el core**.

### E3 · Declaración PLAFT (`/cotizar/emision/plaft`)
- **Avatar:** "Una declaración obligatoria por ley, y ya casi terminamos 🙏"
- **Contenido:** el texto **exacto** de la declaración PLAFT que usa el bot de WhatsApp (Claude Code debe copiarlo del core/bot, no redactarlo).
- Si el core pide preguntas adicionales (actividad económica, origen de fondos, ¿es PEP?), van aquí como selects/radios, **con las mismas opciones del core**.
- **Checkbox obligatorio:** "Declaro que la información suministrada es verdadera y que los fondos utilizados tienen origen lícito."
- **Botón:** "Continuar".

### E4 · Verificación (`/cotizar/emision/verificar`)
- **Avatar:** "Perfecto, [Nombre]. Revisa que todo esté correcto"
- **Acordeones colapsables** (abiertos por defecto en desktop, cerrados en móvil), cada uno con botón "Editar" que vuelve al paso correspondiente:
  - DATOS PERSONALES
  - DATOS DEL AUTO
  - DATOS DE CONTACTO
  - TU PLAN — aseguradora, cobertura, deducible, suma asegurada, **monto a pagar** grande.
- **Checkbox obligatorio:** "Acepto los términos y condiciones y las condiciones generales de la póliza" (enlaces a Políticas y Legal + condicionado de la aseguradora si existe PDF).
- **Botón primario:** "Pagar USD [monto] con Pago Móvil"
- Al tocar: `POST /v1/solicitudes` → guarda `solicitud_id` en el estado → E5. Si falla, toast con error y reintento; no avanzar.

### E5 · Pago Móvil C2P (`/cotizar/emision/pago`)
- **Avatar:** "Pago seguro con Pago Móvil. Te llegará un código por SMS 📱"
- **Resumen fijo arriba:** "USD [monto] · Bs. [equivalente si el core lo devuelve] · [Aseguradora]"
- **Sub-paso 5a — Datos del pagador:**
  - CÉDULA / RIF → selector V/E/J + número (prellenado con el tomador, editable).
  - BANCO → `StepSelectSearch` con la lista del core (`/catalogos/bancos`).
  - TELÉFONO AFILIADO A PAGO MÓVIL → +58 + operadora + 7 dígitos (prellenado con el WhatsApp, editable).
  - **Botón:** "Solicitar código" → `POST /pagos/c2p/iniciar` → spinner en el botón → pasa a 5b.
- **Sub-paso 5b — Código:**
  - Texto: "Revisa tus mensajes. Tu banco te envió un código de seguridad."
  - Input de código (6–8 dígitos, teclado numérico, autoenfoque). Contador de expiración si el core lo informa.
  - Enlace: "No me llegó, reenviar" (vuelve a llamar `iniciar`; máx. 3 intentos).
  - **Botón:** "Confirmar pago" → `POST /pagos/c2p/confirmar`.
- **Estados de respuesta:**
  - `aprobado` → Loader post-pago.
  - `rechazado` → mensaje claro con el motivo del core ("Código incorrecto o vencido", "Fondos insuficientes", "Teléfono no afiliado") y botón "Intentar de nuevo".
- **Reglas de seguridad de la web:** los datos de pago **viven solo en memoria del componente** (no en `sessionStorage`); se envían al backend delgado y se descartan; no se loguean nunca.

### Loader post-pago (`/cotizar/emision/emitiendo`)
- Pantalla completa, mensajes rotativos: "Pago confirmado ✅" → "Emitiendo tu póliza con [Aseguradora]…" → "Generando tu documento…" → "Creando tu acceso a la app…"
- **Polling** `GET /v1/solicitudes/{id}` cada 2 s hasta `emitida` (timeout 60 s → pantalla de "estamos terminando, te avisamos por email" sin bloquear al cliente).

### E6 · Póliza emitida (`/cotizar/emision/listo`)
- **Avatar:** "¡Felicidades, [Nombre]! Tu póliza está emitida 🎉"
- **Tarjeta de póliza:** aseguradora, número de póliza, vigencia, cobertura, botón **"Descargar póliza (PDF)"** (`pdf_url` del core).
- **Bloque de acceso a la app** (el más importante de la pantalla):
  - "📩 Te enviamos tu **clave temporal** a **[email enmascarado]**" (o WhatsApp, según `provisioning.canal`).
  - "Descarga la app FFC y entra con tu **cédula** y esa clave. Te pediremos crear una nueva al entrar."
  - Botones de tiendas (App Store / Google Play / "Abrir versión web") — URLs pendientes (§7).
- **Acciones secundarias:** "Enviar póliza por correo" · "Hablar con un asesor" (WhatsApp).
- Al llegar aquí se limpia el `sessionStorage` del cotizador (excepto un `ultimaPolizaId` para que la página pueda volver a mostrar el PDF si recarga).

---

## 4. Estado (extensión de `useCotizadorState`)

```js
emision: {
  vehiculo: { placa, serialCarroceria, puestos, uso },
  tomador:  { esMismo, nombre, docTipo, docNumero, telefono },
  plaft:    { aceptado, respuestas: {...} },
  terminosAceptados,
  solicitudId, montoUSD, montoBs,
  pago: { pagoId, estado, intentos },     // NO persistir datos del pagador
  poliza: { id, numero, pdfUrl, provisioning: { canal, destino } }
}
```
`emision.pago` y los datos del pagador **no se guardan en sessionStorage**.

---

## 5. Backend delgado (`api/`)

Funciones Vercel, mismo estilo que `api/chat.js`:

| Archivo | Método | Hace |
|---|---|---|
| `api/cotizar.js` | POST | Valida entrada → `POST core/cotizaciones` → devuelve planes |
| `api/solicitud.js` | POST | Valida → `POST core/solicitudes` con `Idempotency-Key` |
| `api/pago-iniciar.js` | POST | Valida → `POST core/pagos/c2p/iniciar` |
| `api/pago-confirmar.js` | POST | Valida → `POST core/pagos/c2p/confirmar` |
| `api/solicitud-estado.js` | GET | `GET core/solicitudes/{id}` (para el polling) |
| `api/catalogos.js` | GET | Bancos / vehículos (cacheado 24 h) |

- Variables de entorno (en Vercel, **nunca en el repo**): `CORE_BASE_URL`, `CORE_API_KEY`, `MOCK_CORE`.
- Validar todo con un esquema (zod o similar) antes de reenviar.
- Rate limit básico por IP en `pago-*`.
- Nunca loguear cuerpo de requests de pago.

---

## 6. Modo mock para la demo

Mientras se confirman los endpoints reales, **toda la etapa de emisión debe funcionar con `MOCK_CORE=true`**:
- Las funciones `api/*` devuelven respuestas simuladas con delays realistas (1–3 s).
- `pago-confirmar` acepta el código `123456` como aprobado y cualquier otro como rechazado (para demostrar ambos caminos en la llamada).
- `solicitud-estado` pasa de `pagada` a `emitida` tras ~4 s.
- `pdf_url` apunta a un PDF de ejemplo en `public/demo/poliza-ejemplo.pdf`.
- Provisioning simulado: `{ canal: 'email', destino: enmascarar(email) }`.

Así la demo muestra el flujo **completo de punta a punta** aunque el core no esté conectado todavía, y el switch a producción es cambiar una variable.

---

## 7. Pendientes para cerrar la Parte 2

- [ ] **Marco:** rutas reales del core + Swagger + método de autenticación + ambiente de pruebas con pagos simulados (§2).
- [ ] **Marco:** texto exacto de la declaración PLAFT y preguntas adicionales que exige el core (E3).
- [ ] **Marco:** valores exactos que acepta el core para `uso` y `puestos`.
- [ ] **Claude Code:** leer qué hace hoy la ruta `/pagar` en AndresP antes de construir E5 — reutilizar lo que sirva.
- [ ] URLs de la app en App Store / Google Play / web (E6).
- [ ] Condicionados PDF de Real / Estar / Caracas para el enlace en E4 (opcional).
- [ ] PDF de ejemplo para el modo mock.

---

## 8. Orden de construcción (Parte 2)

1. Backend delgado `api/*` en modo mock + variables de entorno.
2. Extensión del estado + rutas `/cotizar/emision/*`.
3. E0 → E4 (formularios y verificación).
4. E5 pago C2P con ambos caminos (aprobado / rechazado).
5. Loader post-pago con polling + E6.
6. Conectar el loader de la Parte 1 a `api/cotizar` (mock) en lugar de las tarifas locales — dejando las tarifas locales como fallback si `MOCK_CORE` está apagado y el core no responde.
7. Prueba de punta a punta: cotizar → emitir → pagar (código bueno y malo) → emitida → recarga a mitad de camino.
