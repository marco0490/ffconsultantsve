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

- ✅ **Cotizar seguros de salud** de 4 aseguradoras venezolanas
- ✅ **Comparar precios y coberturas** en tiempo real
- ✅ **Enviar solicitudes** directamente por email
- ✅ **Acceder desde cualquier dispositivo** (móvil, tablet, computadora)

### 🏢 Aseguradoras Integradas

| Aseguradora | Coberturas Disponibles | Especialidad |
|-------------|------------------------|--------------|
| **Seguros Mercantil** | 30.000, 50.000-100.000, 200.000-1.000.000 | Planes corporativos y familiares |
| **Seguros Qualitas** | HCM, APS, Emergencia, Colectivos, Administrados | Seguros especializados |
| **Seguros Caracas** | 20.000 - 1.000.000 | Amplia gama de coberturas |
| **Seguros Hispana** | 20.000 - 1.000.000 | Seguros tradicionales |

---

## ✨ Funcionalidades Principales

### 🎨 **Interfaz de Usuario**
- **Diseño moderno y profesional** con colores corporativos
- **100% responsive** - se adapta a móviles, tablets y computadoras
- **Navegación intuitiva** con menú claro
- **Carga rápida** optimizada para Venezuela

### 📋 **Sistema de Cotización**
- **Formulario inteligente** que cambia según la aseguradora
- **Validación automática** de datos
- **Cálculo dinámico** de coberturas
- **Envío por email** automático con toda la información

### 📧 **Gestión de Comunicaciones**
- **EmailJS integrado** para envío automático
- **Formulario de contacto** completo
- **Información de contacto** actualizada
- **Mapa interactivo** de ubicación

### 🔒 **Seguridad y Calidad**
- **Validación de datos** en tiempo real
- **Protección de información** personal
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
# Configuración de EmailJS (OBLIGATORIO para envío de emails)
VITE_EMAIL_SERVICE=tu_service_id_aqui
VITE_EMAIL_COTIZADOR=tu_template_id_aqui
VITE_EMAIL_USER=tu_user_id_aqui

# Configuración de desarrollo (OPCIONAL)
NODE_ENV=development
PORT=3000
```

### 📧 **Paso 5: Configurar EmailJS (Importante)**

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
# Iniciar servidor de desarrollo
npm run dev

# El sistema estará disponible en:
# http://localhost:3000
```

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
3. **Configurar variables de entorno** en Vercel Dashboard
4. **Desplegar automáticamente** con cada cambio

---

## 📱 Cómo Usar el Sistema

### 👥 **Para Clientes (Usuarios Finales)**

1. **Acceder** a https://ffconsultantsve.vercel.app
2. **Hacer clic** en "Cotizar póliza"
3. **Seleccionar** aseguradora deseada
4. **Elegir** cobertura según necesidades
5. **Completar** datos personales
6. **Agregar** información de cónyuge/beneficiarios (opcional)
7. **Aceptar** términos y condiciones
8. **Enviar** solicitud

### 👨‍💼 **Para Administradores**

#### 📊 **Revisar Cotizaciones**
- Las cotizaciones llegan al email configurado en EmailJS
- Cada email contiene toda la información del cliente
- Responder directamente al cliente desde el email

#### 📝 **Actualizar Información**
- **Precios**: Editar archivo `src/pages/Cotizador/Cotizador.jsx`
- **Contacto**: Editar archivo `src/data/contactInfo.js`
- **Contenido**: Editar archivos en `src/pages/`

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
- **Email**: ffconsultants124@outlook.com
- **Teléfonos**: +58 212-2675132 / 412-9713806
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
4. **Enviar** a: ffconsultants124@outlook.com

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

## 🎉 ¡Felicidades!

Si has llegado hasta aquí, ya tienes todo lo necesario para usar y mantener el sistema FFConsultantsVE. 

**Recuerda:**
- ✅ Hacer backups regulares
- ✅ Mantener las dependencias actualizadas
- ✅ Revisar los emails de cotizaciones diariamente
- ✅ Contactar soporte si tienes dudas

**¡El sistema está listo para generar más clientes y hacer crecer tu negocio de seguros!** 🚀

---

*Última actualización: Enero 2025 - Versión 1.0.0*
*Desarrollado con ❤️ para facilitar el acceso a seguros de salud en Venezuela*
