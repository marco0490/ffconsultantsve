# 🏥 FFConsultantsVE - Sistema de Cotización de Seguros de Salud

**Future Financial Consultants Venezuela** - Plataforma digital completa para cotización y gestión de seguros de salud en línea.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

---

## 📖 Tabla de Contenidos

1. [¿Qué es este proyecto?](#-qué-es-este-proyecto)
2. [Funcionalidades principales](#-funcionalidades-principales)
3. [Requisitos del sistema](#-requisitos-del-sistema)
4. [Instalación paso a paso](#-instalación-paso-a-paso)
5. [Configuración inicial](#-configuración-inicial)
6. [Cómo usar el sistema](#-cómo-usar-el-sistema)
7. [Mantenimiento diario](#-mantenimiento-diario)
8. [Solución de problemas](#-solución-de-problemas)
9. [Actualización del sistema](#-actualización-del-sistema)
10. [Contacto y soporte](#-contacto-y-soporte)

---

## 🎯 ¿Qué es este proyecto?

FFConsultantsVE es una **aplicación web moderna** que permite a los clientes:

- ✅ **Cotizar seguros** para diferentes líneas de negocio:
  - Automóvil
  - Personas (salud, viajes, vida, accidentes, etc.)
  - Patrimoniales (hogar, comercios, etc.)
- ✅ **Comparar precios y coberturas** según la compañía y el producto
- ✅ **Enviar solicitudes** que llegan tanto por **email** como a **Dynamics 365 Sales** mediante Power Automate
- ✅ **Acceder desde cualquier dispositivo** (móvil, tablet, computadora)

### 🏢 Aseguradoras Integradas (actuales en el cotizador)

| Aseguradora | Emoji | Líneas | Ejemplos de productos |
|-------------|-------|--------|------------------------|
| **Seguros Caracas** | 🦁 | Auto, Personas, Patrimoniales | HCM hasta $1M USD, Asistencia en Viaje |
| **Real Seguros** | ✅ | Auto, Personas | Planes personalizados, tecnología moderna |
| **Estar Seguros** | 🛡️ | Auto, Personas | +75 años en el mercado, HCM |

En la página principal se muestra un **carrusel animado y scrolleable** con los logos de las compañías, que permite acceder rápidamente a los planes disponibles.

---

## ✨ Funcionalidades Principales

### 🎨 **Interfaz de Usuario**
- **Diseño moderno y profesional** con colores corporativos
- **100% responsive** - se adapta a móviles, tablets y computadoras
- **Navegación intuitiva** con menú claro
- **Carga rápida** optimizada para Venezuela

### 📋 **Sistema de Cotización**
- **Formularios inteligentes** que cambian según la aseguradora y el producto seleccionado (Auto / Personas / Patrimoniales)
- **Validación automática** de datos obligatorios en el navegador
- **Selección guiada** de coberturas según compañía y ramo
- **Envío automático** de la información tanto por **email** como hacia **Power Automate**

### 📧 **Gestión de Comunicaciones e Integraciones**
- **EmailJS integrado** como canal de respaldo para notificaciones por correo
- **Integración con Power Automate** mediante endpoints HTTP dedicados por producto:
  - `Auto` → Flow de creación en tabla AutoWeb / LeadWeb
  - `Personas` → Flow de creación en tabla PersonasWeb / LeadWeb
  - `Patrimoniales` → Flow de creación en tabla PatrimonialesWeb / LeadWeb
- **Datos alineados con los esquemas de Dataverse**:
  - Fechas enviadas en **formato ISO 8601** (ejemplo: `2025-01-31T00:00:00.000Z`)
  - Beneficiarios y acompañantes representados por **fechas de nacimiento** en lugar de flags booleanos
  - Campos específicos como `QueDeseaAsegurar` y `ServicioAsistenciaViajes30Dias` incluidos cuando aplica
- **Página de prueba técnica** (`/dynamics-365-sales`) para validar rápidamente la conexión con los Flows sin pasar por todo el cotizador.

### 🤖 **Chatbot Inteligente (MaxProtect)**
- **Asistente virtual con IA** powered by OpenAI GPT-4
- **Recolección guiada de datos** para cotizaciones
- **Envío automático a Dynamics 365** vía Power Automate
- **Backup por EmailJS** para redundancia
- **Encuesta de satisfacción** post-cotización (3 preguntas)
- **Demo animado** en la página principal

### 🔒 **Seguridad y Calidad**
- **Validación de datos** en tiempo real
- **Protección de información** personal
- **API Keys protegidas** en variables de entorno
- **Código limpio** y bien documentado
- **Actualizaciones automáticas** de seguridad

---

## 💻 Requisitos del Sistema

### 🖥️ **Para Usar el Sistema (Usuarios)**
- **Navegador web moderno**: Chrome, Firefox, Safari, Edge
- **Conexión a internet** estable
- **JavaScript habilitado** en el navegador

### 🛠️ **Para Desarrollar/Mantener (Técnicos)**
- **Node.js 22.x o superior** ([Descargar aquí](https://nodejs.org/))
- **npm 10.x o superior** (incluido con Node.js)
- **Git** para control de versiones ([Descargar aquí](https://git-scm.com/))
- **Editor de código** (recomendado: Visual Studio Code)

---

## 🚀 Instalación Paso a Paso

### 📥 **Paso 1: Descargar el Proyecto**

```bash
# Opción A: Clonar desde GitHub (recomendado)
git clone https://github.com/marco0490/ffconsultantsve.git
cd ffconsultantsve

# Opción B: Descargar ZIP desde GitHub
# 1. Ir a https://github.com/marco0490/ffconsultantsve
# 2. Hacer clic en "Code" > "Download ZIP"
# 3. Extraer el archivo ZIP
# 4. Abrir la carpeta en terminal/cmd
```

### 🔧 **Paso 2: Instalar Node.js**

1. **Ir a** https://nodejs.org/
2. **Descargar** la versión LTS (22.x)
3. **Ejecutar** el instalador
4. **Verificar** la instalación:

```bash
node --version    # Debe mostrar v22.x.x
npm --version     # Debe mostrar 10.x.x o superior
```

### 📦 **Paso 3: Instalar Dependencias**

```bash
# Instalar todas las dependencias del proyecto
npm install

# Si hay errores, intentar:
npm install --force
```

### 🗺️ **Paso 3.1: Instalar Dependencias del Mapa Interactivo**

El chatbot incluye un mapa interactivo para seleccionar direcciones. Instala las dependencias de Leaflet:

```bash
npm install leaflet --legacy-peer-deps
npm install react-leaflet --legacy-peer-deps
```

> ⚠️ **IMPORTANTE**: Si no instalas estas dependencias, el proyecto no compilará correctamente.

### ⚙️ **Paso 4: Configurar Variables de Entorno**

1. **Crear archivo `.env`** en la raíz del proyecto:

```bash
# En Windows (cmd)
copy NUL .env

# En Mac/Linux
touch .env
```

2. **Abrir `.env`** con un editor de texto y agregar:

```env
# ==================================================
# CONFIGURACIÓN DE EMAILJS (OBLIGATORIO)
# ==================================================
# Obtener credenciales en: https://www.emailjs.com/
VITE_EMAIL_SERVICE=tu_service_id_aqui
VITE_EMAIL_COTIZADOR=tu_template_id_aqui
VITE_EMAIL_USER=tu_public_key_aqui
VITE_EMAIL_PRIVATE_KEY=tu_private_key_aqui

# ==================================================
# CONFIGURACIÓN DE OPENAI (OBLIGATORIO PARA CHATBOT)
# ==================================================
# Obtener API Key en: https://platform.openai.com/api-keys
# IMPORTANTE: Esta key es SECRETA, nunca compartir ni subir a Git
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ==================================================
# POWER AUTOMATE - DYNAMICS 365 (OBLIGATORIO)
# ==================================================
# URLs de los Flows HTTP Trigger para cada producto
POWER_AUTOMATE_AUTO=https://prod-xx.westus.logic.azure.com/workflows/...
POWER_AUTOMATE_PERSONAS=https://prod-xx.westus.logic.azure.com/workflows/...
POWER_AUTOMATE_PATRIMONIALES=https://prod-xx.westus.logic.azure.com/workflows/...

# ==================================================
# CONFIGURACIÓN DE DESARROLLO (OPCIONAL)
# ==================================================
NODE_ENV=development
PORT=3000
```

> ⚠️ **IMPORTANTE**: El archivo `.env` contiene credenciales sensibles. NUNCA debe subirse a Git. Está incluido en `.gitignore` por defecto.

### � **Cómo obtener la API Key de OpenAI**

1. **Crear cuenta** en https://platform.openai.com/
2. **Ir a** API Keys: https://platform.openai.com/api-keys
3. **Click en** "Create new secret key"
4. **Nombrar la key** (ej: "FFC-Chatbot-Production")
5. **Copiar la key** inmediatamente (solo se muestra una vez)
6. **Pegar en** el archivo `.env` como valor de `OPENAI_API_KEY`

> 💡 **Tip**: OpenAI cobra por uso. Configurar límites de gasto en https://platform.openai.com/account/limits

### �📧 **Paso 5: Configurar EmailJS (Importante)**

1. **Crear cuenta** en https://www.emailjs.com/
2. **Crear un servicio** (Gmail, Outlook, etc.)
3. **Crear un template** para cotizaciones
4. **Copiar las credenciales** al archivo `.env`

**Ejemplo de template EmailJS:**
```
Asunto: Nueva Cotización de Seguro - {{name}}

Estimado equipo,

Se ha recibido una nueva solicitud de cotización:

DATOS PERSONALES:
- Nombre: {{name}}
- Email: {{email}}
- Teléfono: {{mobile}}
- Fecha de nacimiento: {{age}}

SEGURO SOLICITADO:
- Aseguradora: {{aseguradora}}
- Cobertura: {{cobertura}}
- Tipo de pago: {{pago}}

COMENTARIOS:
{{comment}}

Saludos,
Sistema FFConsultantsVE
```

---

## 🎮 Configuración Inicial

### 🏃‍♂️ **Ejecutar en Modo Desarrollo**

```bash
# Opción 1: Solo frontend (sin chatbot)
npm run dev

# Opción 2: Frontend + API del chatbot (RECOMENDADO)
npm run dev:api

# El sistema estará disponible en:
# http://localhost:3000
```

### 🤖 **Servidor de Desarrollo con Chatbot**

El comando `npm run dev:api` inicia un servidor Express que incluye:
- Frontend con Vite (hot reload)
- API `/api/chat` - Chatbot con OpenAI
- API `/api/cotizacion` - Envío a Power Automate
- API `/api/lead` - Captura de leads

**Flujo del Chatbot:**
1. Usuario interactúa con MaxProtect
2. GPT-4 recolecta datos de cotización
3. Al completar, genera JSON interno `LEAD_DATA`
4. Backend envía a Power Automate → Dynamics 365
5. Backend envía a EmailJS (backup)
6. Chatbot inicia encuesta de satisfacción (3 preguntas)
7. Encuesta se captura como `SURVEY_DATA`

### 🏗️ **Construir para Producción**

```bash
# Crear versión optimizada
npm run build

# Previsualizar la versión de producción
npm run preview
```

### 🌐 **Desplegar en Vercel (Recomendado)**

1. **Crear cuenta** en https://vercel.com/
2. **Conectar repositorio** de GitHub
3. **Configurar variables de entorno** en Vercel Dashboard (las mismas del `.env` local para EmailJS)
4. **Configurar las URLs de Power Automate** mediante variables de entorno `POWER_AUTOMATE_*` (usadas en `api/chat.js` y, en desarrollo, en `server.dev.js`)
5. **Desplegar automáticamente** con cada cambio a la rama principal

---

## 📱 Cómo Usar el Sistema

### 👥 **Para Clientes (Usuarios Finales)**

1. **Acceder** a https://ffconsultantsve.vercel.app
2. **Hacer clic** en "Cotizar póliza" o en algún plan de compañía
3. **Seleccionar**:
   - Compañía aseguradora (ej. Real Seguros, Estar Seguros o Seguros Caracas)
   - Qué desea asegurar (Auto / Personas / Patrimoniales)
   - Cobertura disponible según esa combinación
4. **Completar** datos personales mínimos (nombre, cédula, teléfono, email, fecha de nacimiento y sexo)
5. **Agregar**, cuando aplique:
   - Datos de cónyuge
   - Fechas de nacimiento de beneficiarios o acompañantes (viajes)
   - Información adicional de viaje (país origen/destino, fechas de salida y llegada)
6. **Elegir** tipo de pago (Cuotas / Anual)
7. **Aceptar** términos y condiciones
8. **Enviar** solicitud

### 👨‍💼 **Para Administradores / Equipo Comercial**

#### 📊 **Revisar Cotizaciones**
- Las cotizaciones llegan:
  - Al **email** configurado en EmailJS (como respaldo)
  - A **Dynamics 365 Sales**, a través de tres Flows de Power Automate (Auto, Personas, Patrimoniales)
- En Dynamics, los datos se guardan en tablas dedicadas (AutoWeb, PersonasWeb, PatrimonialesWeb) y/o relacionados con LeadWeb, según la lógica del Flow.

#### 📝 **Actualizar Información**
- **Coberturas y combinaciones compañía/producto**: editar la base de conocimiento del chatbot en `src/data/chatbot/` (`shared.js` y `ramos/*.js`) y las tarifas en `src/data/tarifas-seguros.js` / `src/data/tarifas-microseguros.js`.
- **Campos enviados a Dynamics 365 Sales**: revisar el manejo del lead (bloque `LEAD_DATA`) en `api/chat.js` (y `server.dev.js` en desarrollo).
- **Página de pruebas técnicas de integración**: `src/pages/Dynamics365Sales/Dynamics365Sales.jsx`.
- **Contacto**: Editar archivo `src/data/contactInfo.js`.
- **Contenido general del sitio**: Editar archivos en `src/pages/`.

#### 🎨 **Cambiar Diseño**
- **Colores**: Editar archivo `tailwind.config.js`
- **Estilos**: Editar archivos `.css` en `src/css/`
- **Imágenes**: Reemplazar archivos en `src/assets/images/`

---

## 🔧 Mantenimiento Diario

### ✅ **Tareas Diarias (5 minutos)**

```bash
# 1. Verificar que el sitio funciona
# Abrir: https://ffconsultantsve.vercel.app

# 2. Revisar emails de cotizaciones
# Revisar bandeja de entrada del email configurado

# 3. Verificar actualizaciones (opcional)
npm outdated
```

### 📅 **Tareas Semanales (15 minutos)**

```bash
# 1. Actualizar dependencias
npm update

# 2. Verificar seguridad
npm audit

# 3. Corregir vulnerabilidades (si las hay)
npm audit fix
```

### 🗓️ **Tareas Mensuales (30 minutos)**

```bash
# 1. Backup del código
git add .
git commit -m "Backup mensual - $(date)"
git push

# 2. Revisar analytics (si están configurados)
# 3. Actualizar información de contacto (si es necesario)
# 4. Revisar y actualizar precios de seguros
```

---

## 🚨 Solución de Problemas

### ❌ **Problema: El sitio no carga**

**Síntomas:** Página en blanco o error 404

**Soluciones:**
1. Verificar que Vercel esté funcionando
2. Revisar el dominio en el navegador
3. Limpiar caché del navegador (Ctrl+F5)

```bash
# Verificar estado del proyecto
npm run build
```

### ❌ **Problema: Los emails no se envían**

**Síntomas:** Formulario se envía pero no llegan emails

**Soluciones:**
1. Verificar configuración de EmailJS
2. Revisar variables de entorno en Vercel
3. Comprobar límites de EmailJS

```bash
# Verificar variables de entorno localmente
echo $VITE_EMAIL_SERVICE
echo $VITE_EMAIL_COTIZADOR
echo $VITE_EMAIL_USER
```

### ❌ **Problema: Errores al instalar dependencias**

**Síntomas:** `npm install` falla

**Soluciones:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Si persiste el error, usar yarn
npm install -g yarn
yarn install
```

### ❌ **Problema: El cotizador no funciona correctamente**

**Síntomas:** Dropdowns no cambian, validaciones fallan

**Soluciones:**
1. Verificar JavaScript habilitado en navegador
2. Revisar consola del navegador (F12)
3. Actualizar navegador

```bash
# Verificar errores en desarrollo
npm run dev
# Abrir http://localhost:3000 y revisar consola
```

---

## 🔄 Actualización del Sistema

### 🆕 **Actualizar Dependencias**

```bash
# Ver qué se puede actualizar
npm outdated

# Actualizar todo (cuidado con breaking changes)
npm update

# Actualizar una dependencia específica
npm install react@latest
```

### 🔧 **Actualizar Node.js**

1. **Descargar** nueva versión desde https://nodejs.org/
2. **Instalar** sobre la versión anterior
3. **Verificar** que todo funciona:

```bash
node --version
npm --version
npm run build
```

### 🚀 **Actualizar Deployment**

```bash
# Si usas Git (automático en Vercel)
git add .
git commit -m "Actualización del sistema"
git push

# Si subes archivos manualmente
# 1. Hacer npm run build
# 2. Subir carpeta dist/ a tu hosting
```

---

## 📞 Contacto y Soporte

### 🏢 **Información de la Empresa**

- **Nombre**: Future Financial Consultants Venezuela
- **Email**: ffconsultantsve@outlook.com
- **Teléfonos**: 0212 773 2367 (Horario de Oficina) / SOS +58 412-9713806
- **Dirección**: Av. San Felipe, Centro Coinasa, Caracas, Venezuela
- **Horarios**: Lun-Vie: 8:00 am - 5:00 pm

### 🌐 **Enlaces Importantes**

- **Sitio Web**: https://ffconsultantsve.vercel.app
- **Repositorio**: https://github.com/marco0490/ffconsultantsve
- **Vercel Dashboard**: https://vercel.com/dashboard
- **EmailJS Dashboard**: https://dashboard.emailjs.com/

### 🆘 **Soporte Técnico**

#### 📧 **Para Problemas Técnicos:**
1. **Describir** el problema detalladamente
2. **Incluir** capturas de pantalla si es posible
3. **Mencionar** qué navegador y dispositivo usas
4. **Enviar** a: ffconsultantsve@outlook.com

#### 🔧 **Para Cambios en el Sistema:**
1. **Especificar** qué quieres cambiar
2. **Explicar** por qué es necesario el cambio
3. **Proporcionar** el nuevo contenido/información
4. **Contactar** por teléfono para cambios urgentes

---

## 📚 Recursos Adicionales

### 🎓 **Documentación Técnica**
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

### 🛠️ **Herramientas Útiles**
- [Visual Studio Code](https://code.visualstudio.com/) - Editor de código
- [Git](https://git-scm.com/) - Control de versiones
- [Postman](https://www.postman.com/) - Testing de APIs
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging

### 📖 **Guías de Configuración**
- Ver archivo `CONFIGURACION-PC-DESARROLLO.md` para setup completo de desarrollo
- Ver archivo `TODO.md` para lista de tareas y mejoras pendientes

---

## 🤖 Arquitectura del Chatbot (MaxProtect)

### 📁 **Archivos Principales**

| Archivo | Descripción |
|---------|-------------|
| `src/components/Chatbot/Chatbot.jsx` | Componente UI del chatbot |
| `src/components/ChatbotDemo/ChatbotDemo.jsx` | Demo animado para la home |
| `src/data/chatbot-knowledge.js` | Base de conocimiento editable |
| `server.dev.js` | Servidor local de desarrollo |
| `api/chat.js` | API de producción (Vercel) |

### 📝 **Base de Conocimiento**

Edita `src/data/chatbot-knowledge.js` para actualizar:
- Información de la empresa
- Aseguradoras y productos
- Requisitos de emisión
- Preguntas frecuentes
- Flujo de conversación

### 🔄 **Campos Enviados a Dynamics 365**

Para cotización de **Auto**, el chatbot recolecta:

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| NombreCompleto | String | "Juan Pérez" |
| Cedula | String | "V-12345678" |
| Telefono | String | "+58 412-1234567" |
| CorreoElectronico | String | "juan@email.com" |
| FechaNacimiento | ISO Date | "2000-01-15T00:00:00.000Z" |
| Sexo | String | "M" o "F" |
| Marca | String | "Toyota" |
| Modelo | String | "Corolla" |
| Ano | Number | 2022 |
| Version | String | "Limited" |
| Transmision | String | "Automatica" o "Sincronica" |
| CeroKM | Boolean | true o false |
| Placa | String | "ABC123" |
| CompaniaAseguradora | String | "Real Seguros" |
| Cobertura | String | "RCV Amplia" |
| TipoPago | String | "Contado" o "Financiado" |
| Canal | String | "Web-Chatbot" (automático) |
| FechaRegistro | ISO Date | (automático) |

---

## ⚙️ Configuración de Dynamics 365

### 🏷️ **Crear Campo "Canal" para Leads**

1. Ir a **Power Apps** → make.powerapps.com
2. Seleccionar tu **entorno** de Dynamics
3. Ir a **Tablas** → **Lead** (Cliente potencial)
4. Click en **+ Nueva columna**
5. Configurar:
   - **Nombre**: Canal
   - **Tipo**: Opción
   - **Opciones**:
     - Web-Chatbot
     - Web-Formulario
     - WhatsApp
     - Instagram
     - Teléfono
     - Referido
6. **Guardar**

### 📊 **Crear Vistas Filtradas por Canal**

1. En la tabla **Lead**, ir a **Vistas**
2. Click en **+ Nueva vista**
3. Configurar:
   - **Nombre**: "Leads de Chatbot"
   - **Filtro**: Canal = Web-Chatbot
4. Repetir para cada canal (WhatsApp, Instagram, etc.)

### 🔗 **Configurar Power Automate**

1. Ir a **Power Automate** → make.powerautomate.com
2. Editar tu Flow de creación de leads
3. En el paso **Crear registro** (Dynamics 365):
   - Mapear el campo `Canal` del JSON al campo en Dynamics
4. **Guardar** y **Probar**

---

## 🎉 ¡Felicidades!

Si has llegado hasta aquí, ya tienes todo lo necesario para usar y mantener el sistema FFConsultantsVE. 

**Recuerda:**
- ✅ Hacer backups regulares
- ✅ Mantener las dependencias actualizadas
- ✅ Revisar los emails de cotizaciones diariamente
- ✅ Contactar soporte si tienes dudas

**¡El sistema está listo para generar más clientes y hacer crecer tu negocio de seguros!** 🚀

---

---

## 📅 Historial de Versiones

| Versión | Fecha | Cambios principales |
|---------|-------|---------------------|
| **2.2.0** | Mayo 2026 | Mapa interactivo para direcciones (Leaflet), flujo Cotización → Precio → Emisión, advertencia de tiempo en emisión |
| **2.1.0** | Mayo 2026 | +3 aseguradoras (Caracas, Real, Estar), PromoSection, FamilySection rediseñado, FAQs actualizadas |
| **2.0.0** | Abril 2026 | Chatbot MaxProtect con IA, integración Dynamics 365, encuestas |
| **1.0.0** | 2025 | Versión inicial con cotizador y EmailJS |

---

*Última actualización: **Mayo 2026** - Versión 2.2.0*

*Incluye: 5 aseguradoras, Chatbot MaxProtect con IA (OpenAI GPT-4), mapa interactivo de direcciones, integración Dynamics 365, encuestas de satisfacción*

*Desarrollado con ❤️ para facilitar el acceso a seguros en Venezuela*
