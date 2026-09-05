# SPEC — Cotizador Conversacional (Auto) · Future Financial Consultants

**Rama:** `feature/flujo-conversacional` (a partir de `AndresP`)
**Alcance de la demo:** ramo AUTO. Personas y Patrimoniales quedan como "próximamente".
**Objetivo:** reemplazar el cotizador actual por un wizard conversacional de una pregunta por pantalla, mobile-first, que termina comparando **Real Seguros, Estar Seguros y Seguros Caracas** y captura el lead para un asesor.
**Demo:** 100% local desde `localhost:5173`. Sin deploy.

---

## 0. Principios (no negociables)

1. **Una pregunta por pantalla.** Pregunta grande, opciones grandes, un solo botón primario.
2. **Mobile-first estricto.** Contenedor centrado de máx. 480px; en desktop se ve como una tarjeta centrada. Inputs y botones a ancho completo, padding generoso, área táctil ≥ 44px.
3. **Avatar guía persistente.** Foto circular + nombre + micro-mensaje conversacional en cada paso. Tono de "tú", amigable, emojis con moderación (máx. 1 por mensaje).
4. **Progreso siempre visible.** Barra fina que se llena de izquierda a derecha + texto "Paso X de 9".
5. **Atrás siempre disponible** (flecha arriba a la izquierda) y **conserva lo elegido** al volver.
6. **Validación en tiempo real, informativa.** Borde rojo + mensaje que dice exactamente qué regla no se cumple. Nunca bloquear en silencio.
7. **URL por paso** (`/cotizar/marca`, `/cotizar/modelo`, …) para que el botón atrás del navegador funcione y se pueda recargar sin perder el estado.
8. **Estado persistente** en `sessionStorage` (si recarga, sigue donde iba; si cierra la pestaña, se limpia).
9. **Transición** entre pasos: deslizamiento horizontal suave (~200ms). Adelante = entra por la derecha; atrás = entra por la izquierda.
10. **Reutilizar lo existente:** `tarifas-seguros.js` (`calcularCotizacionAuto`, `compararCotizaciones`), EmailJS para envío por correo, Dynamics 365 para registrar el lead, identidad visual y Tailwind del proyecto.

---

## 1. Layout de cada pantalla

```
┌─────────────────────────────────────┐
│  [<]        FUTURE FINANCIAL        │  header fijo, logo centrado, flecha atrás izq.
│  ─────────────────▓▓▓▓▓░░░░░░░░░    │  barra de progreso + "Paso 3 de 9"
│                                     │
│            ( avatar )               │  foto circular 64px
│      "Mensaje conversacional"       │  1–2 líneas, tono cercano
│                                     │
│   PREGUNTA / LABEL EN MAYÚSCULAS    │  label pequeño, tracking amplio
│   ┌─────────────────────────────┐   │
│   │  input / select / cards     │   │
│   └─────────────────────────────┘   │
│   texto de ayuda o error            │
│                                     │
│   ┌─────────────────────────────┐   │
│   │         SIGUIENTE           │   │  botón primario full-width, fijo abajo en móvil
│   └─────────────────────────────┘   │
│   🔒 Tus datos están protegidos     │  micro-confianza
└─────────────────────────────────────┘
```

**Componentes base a crear** (en `src/components/Cotizador/`):
- `WizardLayout` — header, progreso, avatar, contenedor, botón primario, footer de confianza.
- `StepSelectSearch` — select con buscador integrado que filtra en tiempo real (marca, modelo, estado).
- `StepCards` — tarjetas tipo radio (tipo de vehículo, uso). Estado seleccionado: borde de color primario + check.
- `StepInput` — campo de texto con validación y mensaje de error.
- `StepForm` — agrupación de 2–4 campos del mismo contexto.
- `StepLoader` — pantalla de "estamos comparando…".
- `StepResult` — comparativa de las 3 aseguradoras.
- `useCotizadorState` — hook con el estado global del wizard + persistencia en sessionStorage + navegación.

---

## 2. Mapa del flujo (9 pasos + resultado)

### Paso 0 · Bienvenida (ruta `/cotizar`)
- **Avatar:** "¡Hola! 👋 Soy [NOMBRE_AVATAR], tu asesora de Future Financial."
- **Texto:** "Cotizar tu seguro de auto toma menos de 2 minutos. Compararé por ti las mejores opciones de Real Seguros, Estar Seguros y Seguros Caracas."
- **Cards "¿Qué quieres asegurar?":** 🚗 Mi auto (activo) · 👨‍👩‍👧 Mi familia (próximamente, deshabilitado) · 🏠 Mi negocio o patrimonio (próximamente, deshabilitado).
- **Botón:** "¡Empecemos!"
- Sin barra de progreso todavía.

### Paso 1 · Marca (`/cotizar/marca`)
- **Avatar:** "Cuéntame de tu auto 🚗"
- **Label:** ESCRIBE O SELECCIONA LA MARCA
- **Input:** `StepSelectSearch` con marcas del mercado venezolano, orden alfabético. Fuente: `src/data/vehiculos.js` (nuevo, ver §4).
- **Validación:** obligatorio.
- **Botón:** "Siguiente".

### Paso 2 · Modelo (`/cotizar/modelo`)
- **Avatar:** "Buena elección. ¿Qué modelo es?"
- **Label:** ESCRIBE O SELECCIONA EL MODELO
- **Input:** `StepSelectSearch` filtrado por la marca del paso 1. Última opción siempre: "Otro modelo" → habilita campo de texto libre.
- **Validación:** obligatorio.

### Paso 3 · Año (`/cotizar/anio`)
- **Avatar:** "¿De qué año es tu [Marca] [Modelo]?"
- **Label:** SELECCIONA EL AÑO
- **Input:** `StepSelectSearch` con años desde el actual hasta 1995, descendente. Puede ser una grilla de botones de 4 columnas en móvil (más rápido que un select).
- **Validación:** obligatorio.

### Paso 4 · Tipo de vehículo (`/cotizar/tipo`)
- **Avatar:** "¿Qué tipo de vehículo es?"
- **Input:** `StepCards` con ícono: Sedán · SUV / Camioneta · Pick-up · Hatchback · Moto (si las tarifas lo soportan; si no, omitir).
- **Comportamiento:** al tocar una card avanza automáticamente tras 300ms (no requiere "Siguiente"). Aun así mostrar el botón por accesibilidad.
- **Validación:** obligatorio.

### Paso 5 · Valor del vehículo (`/cotizar/valor`)
- **Avatar:** "¿Cuál es el valor aproximado de tu auto? Esto define la suma asegurada 💵"
- **Input:** campo numérico en USD con formato de miles + slider sincronizado (rango 1.000 – 150.000, paso 500). Texto de ayuda: "Si no estás seguro, indica un valor aproximado. Un asesor lo confirmará contigo."
- **Validación:** obligatorio, mínimo 1.000.

### Paso 6 · Uso y ubicación (`/cotizar/uso`)
- **Avatar:** "Dos preguntas rápidas más sobre el auto"
- **StepForm:**
  - USO DEL VEHÍCULO → `StepCards` en línea: Particular · Comercial / transporte (ej. taxi, delivery, viajes compartidos).
  - ESTADO DONDE CIRCULA → `StepSelectSearch` con los 23 estados + Distrito Capital.
  - PLACA (OPCIONAL) → input texto, mayúsculas automáticas, 6–7 caracteres alfanuméricos. Ayuda: "Nos permite preparar tu póliza más rápido."
- **Validación:** uso y estado obligatorios; placa opcional pero si se llena, 6–7 alfanuméricos.

### Paso 7 · Datos personales (`/cotizar/datos`)
- **Avatar:** "¡Gracias! Ahora cuéntame un poco de ti 🙏"
- **StepForm:**
  - NOMBRE (texto) · APELLIDO (texto)
  - CÉDULA → selector V / E + número (6 a 9 dígitos, solo números).
  - FECHA DE NACIMIENTO → tres selects (día / mes / año) — más rápido en móvil que un datepicker. Edad mínima 18.
- **Validación:** todos obligatorios con mensajes específicos ("La cédula debe tener entre 6 y 9 números", "Debes ser mayor de 18 años").

### Paso 8 · Contacto (`/cotizar/contacto`)
- **Avatar:** "Último paso. ¿Dónde te envío la cotización? 📲"
- **StepForm:**
  - CORREO ELECTRÓNICO (email).
  - WHATSAPP → prefijo fijo +58, selector de operadora (0412 / 0414 / 0424 / 0416 / 0426 / 0422) + 7 dígitos.
  - Checkbox obligatorio: "Acepto que Future Financial me contacte y las [políticas de privacidad] (enlace a Políticas y Legal)."
- **Validación:** email con formato válido; teléfono 7 dígitos; checkbox marcado.
- **Botón:** "Ver mi cotización".

### Loader (`/cotizar/calculando`)
- Pantalla completa, 2–3 segundos, con avatar y mensajes rotativos:
  "Consultando Real Seguros…" → "Consultando Estar Seguros…" → "Consultando Seguros Caracas…" → "Comparando las mejores opciones para ti…"
- Aquí se ejecuta `compararCotizaciones()` con los datos del wizard y se envía el lead a Dynamics 365 (si falla, no bloquear: guardar en consola y continuar).

### Resultado (`/cotizar/resultado`)
- **Avatar:** "¡Listo, [Nombre] 🥳! Estas son tus opciones"
- **Selector de frecuencia** arriba: Anual · Semestral · Trimestral · Mensual (recalcula las 3 tarjetas en vivo).
- **3 tarjetas** (una por aseguradora), apiladas en móvil, en fila en desktop. Cada tarjeta:
  - Logo + nombre de la aseguradora.
  - **Precio grande** según frecuencia + "USD" + equivalente anual en pequeño.
  - Badge automático: "💰 Mejor precio" (la más barata) · "🛡️ Mayor cobertura" (más suma/coberturas) · "⭐ Recomendada" (mejor relación).
  - 4–5 coberturas clave con check (RCV, daños propios, robo, grúa/asistencia, etc.) según lo que tenga `tarifas-seguros.js`.
  - Deducible.
  - Botón "Me interesa este plan".
- **Resumen colapsable** del vehículo y datos ("[Marca Modelo Año] · Uso particular · Suma asegurada USD X · Editar" → vuelve al paso correspondiente).
- **Acciones secundarias** abajo: "📧 Enviarme la comparativa por correo" (EmailJS) · "💬 Hablar con un asesor" (WhatsApp).
- Nota legal pequeña: "Cotización referencial sujeta a confirmación por la aseguradora."

### Confirmación (`/cotizar/listo`) — al tocar "Me interesa este plan"
- **Avatar:** "¡Excelente elección! Un asesor te contactará por WhatsApp en menos de 24 horas."
- Resumen del plan elegido + aseguradora.
- **Botón primario:** "Escribir por WhatsApp ahora" → abre `wa.me/58XXXXXXXXXX?text=` con mensaje prellenado:
  "Hola, soy [Nombre] [Apellido]. Coticé un seguro para mi [Marca Modelo Año] y me interesa el plan de [Aseguradora] por USD [monto] [frecuencia]. Ref: [ID]."
- **Botón secundario:** "Volver al inicio".
- Al llegar aquí se limpia el `sessionStorage`.

---

## 3. Navegación y estado

- Router: rutas anidadas bajo `/cotizar/*`. Si el usuario entra directo a un paso sin haber completado los anteriores, redirigir al primer paso incompleto.
- Estado global (`useCotizadorState`):
  ```js
  {
    ramo: 'auto',
    vehiculo: { marca, modelo, modeloOtro, anio, tipo, valorUSD, uso, estado, placa },
    persona:  { nombre, apellido, cedulaTipo, cedulaNumero, fechaNacimiento },
    contacto: { email, operadora, telefono, aceptaContacto },
    resultado: { frecuencia, cotizaciones: [...], seleccion },
    meta: { pasoActual, iniciadoEn, refId }
  }
  ```
- Persistir en `sessionStorage` bajo la clave `ffc_cotizador_v1` en cada cambio.
- El botón "Siguiente" está deshabilitado (gris) hasta que el paso es válido; al tocarlo inválido, mostrar los errores.
- Tecla Enter avanza cuando el paso es válido.

---

## 4. Datos

**`src/data/vehiculos.js`** (nuevo): marcas y modelos comunes en Venezuela. Mínimo para la demo:
Toyota (Corolla, Yaris, Hilux, Fortuner, 4Runner, Land Cruiser, RAV4), Chevrolet (Aveo, Spark, Cruze, Optra, Captiva, Silverado, Tahoe), Ford (Fiesta, Focus, Explorer, EcoSport, F-150, Escape), Hyundai (Accent, Elantra, Tucson, Santa Fe, Getz), Kia (Rio, Cerato, Sportage, Sorento, Picanto), Chery (Arauca, Orinoco, Tiggo, QQ), Mitsubishi (Lancer, Montero, Outlander, L200), Nissan (Sentra, Versa, X-Trail, Frontier), Renault (Logan, Sandero, Duster, Symbol), Mazda (2, 3, 6, CX-5), Honda (Civic, Accord, CR-V, Fit), Jeep (Grand Cherokee, Wrangler, Compass, Renegade), Dodge (Ram, Journey, Durango), Fiat (Palio, Siena, Uno), Volkswagen (Gol, Polo, Jetta, Tiguan), BYD, Suzuki (Grand Vitara, Swift), Great Wall, JAC, Changan, Geely, Otra marca.

**`src/data/estados.js`** (nuevo): 23 estados + Distrito Capital.

**`src/data/tarifas-seguros.js`** (existente): marcado como DEMO. El flujo debe consumir `compararCotizaciones()` pasándole `{ valorUSD, anio, tipo, uso, estado }`. Si la firma actual no acepta esos parámetros, adaptar la función sin cambiar los factores.

---

## 5. Validaciones (mensajes exactos)

| Campo | Regla | Mensaje |
|---|---|---|
| Marca / Modelo / Año / Tipo | requerido | "Selecciona una opción para continuar" |
| Valor USD | ≥ 1.000 | "El valor mínimo asegurable es USD 1.000" |
| Placa (opcional) | 6–7 alfanum. | "La placa debe tener entre 6 y 7 caracteres" |
| Nombre / Apellido | ≥ 2 letras | "Escribe tu nombre completo" |
| Cédula | 6–9 dígitos | "La cédula debe tener entre 6 y 9 números" |
| Fecha nacimiento | edad ≥ 18 | "Debes ser mayor de 18 años para cotizar" |
| Email | formato válido | "El formato del correo no es válido" |
| WhatsApp | 7 dígitos | "El número debe tener 7 dígitos después de la operadora" |
| Aceptación | marcado | "Necesitamos tu autorización para contactarte" |

---

## 6. Microcopy del avatar (resumen por paso)

| Paso | Mensaje |
|---|---|
| 0 | ¡Hola! 👋 Soy [NOMBRE_AVATAR], tu asesora de Future Financial. |
| 1 | Cuéntame de tu auto 🚗 |
| 2 | Buena elección. ¿Qué modelo es? |
| 3 | ¿De qué año es tu [Marca] [Modelo]? |
| 4 | ¿Qué tipo de vehículo es? |
| 5 | ¿Cuál es el valor aproximado de tu auto? 💵 |
| 6 | Dos preguntas rápidas más sobre el auto |
| 7 | ¡Gracias! Ahora cuéntame un poco de ti 🙏 |
| 8 | Último paso. ¿Dónde te envío la cotización? 📲 |
| Loader | Consultando Real Seguros… / Estar Seguros… / Seguros Caracas… |
| Resultado | ¡Listo, [Nombre] 🥳! Estas son tus opciones |
| Confirmación | ¡Excelente elección! Un asesor te contactará en menos de 24 horas. |

---

## 7. Fuera de alcance (esta demo)

- Emisión/pago en línea de la póliza.
- Creación de cuenta / contraseña.
- Ramos Personas y Patrimoniales (solo cards deshabilitadas).
- Autocompletado de dirección con mapas.
- Tarifas reales (se usan las demo existentes).

---

## 8. Pendientes de negocio (rellenar antes de la demo)

- [ ] **Nombre y foto del avatar guía** (foto real de una asesora del equipo o ilustración propia; 512×512, fondo neutro).
- [ ] **Número de WhatsApp de asesoría** para el botón de contacto.
- [ ] Confirmar si el ramo "Moto" entra o se omite.
- [ ] Coberturas y deducibles a mostrar por aseguradora (según lo que soporten las tarifas demo).
- [ ] Razón social + RIF de Real, Estar y Caracas (para Legal.jsx — pendiente ya existente).
- [ ] Tarifas reales de las tres aseguradoras (pendiente ya existente).

---

## 9. Orden de construcción sugerido (para Claude Code)

1. `useCotizadorState` + rutas anidadas + `WizardLayout` con progreso, avatar y transiciones.
2. `StepSelectSearch`, `StepCards`, `StepInput`, `StepForm` como componentes genéricos.
3. Datos: `vehiculos.js`, `estados.js`.
4. Pasos 0 → 8 conectados al estado, con validaciones.
5. Loader + integración con `compararCotizaciones()`.
6. Pantalla de resultado con las 3 tarjetas, badges y selector de frecuencia.
7. Confirmación + WhatsApp prellenado + EmailJS + lead a Dynamics.
8. Pulido: animaciones, estados de foco, teclado (Enter), responsive en desktop.
9. Prueba completa del flujo ida y vuelta, recarga a mitad de camino, entrada directa a una ruta intermedia.
