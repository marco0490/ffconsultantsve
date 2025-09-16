# 🖥️ Configuración PC para Desarrollo y Mantenimiento

## 📋 Guía Completa de Configuración para Servicios Digitales

Esta guía te ayudará a configurar completamente esta PC para desarrollo web, mantenimiento del proyecto FFConsultantsVE y futuros servicios digitales avanzados.

---

## 🚀 Software Esencial a Instalar

### 1. Node.js y Gestores de Paquetes
```bash
# Descargar Node.js 22.x LTS desde: https://nodejs.org/
# Verificar instalación:
node --version  # Debe mostrar v22.x.x
npm --version   # Debe mostrar 10.x.x o superior

# Instalar Yarn (alternativa a npm)
npm install -g yarn

# Instalar pnpm (gestor rápido)
npm install -g pnpm
```

### 2. Git y Control de Versiones
```bash
# Descargar Git desde: https://git-scm.com/
# Configurar Git:
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# Generar clave SSH para GitHub:
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
# Agregar la clave pública a GitHub
```

### 3. Editores de Código
- **Visual Studio Code** (Principal): https://code.visualstudio.com/
- **Extensiones Recomendadas**:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Auto Rename Tag
  - Bracket Pair Colorizer
  - GitLens
  - Thunder Client (para APIs)
  - Live Server

### 4. Bases de Datos
```bash
# PostgreSQL (Recomendado para producción)
# Descargar desde: https://www.postgresql.org/download/

# MySQL (Alternativa)
# Descargar desde: https://dev.mysql.com/downloads/

# MongoDB (Para NoSQL)
# Descargar desde: https://www.mongodb.com/try/download/community

# Herramientas GUI:
# - pgAdmin (PostgreSQL)
# - MySQL Workbench
# - MongoDB Compass
```

### 5. Herramientas de Desarrollo
```bash
# Docker (Para contenedores)
# Descargar desde: https://www.docker.com/products/docker-desktop

# Postman (Para testing de APIs)
# Descargar desde: https://www.postman.com/downloads/

# Insomnia (Alternativa a Postman)
# Descargar desde: https://insomnia.rest/download
```

---

## 🔧 Configuración del Entorno de Desarrollo

### 1. Configurar Variables de Entorno Globales
Crear archivo `.env` en el directorio del proyecto:
```env
# Configuración de desarrollo
NODE_ENV=development
PORT=3000

# Base de datos local
DATABASE_URL=postgresql://usuario:password@localhost:5432/ffconsultants_db
MONGODB_URI=mongodb://localhost:27017/ffconsultants

# EmailJS (ya configurado)
VITE_EMAIL_SERVICE=tu_service_id
VITE_EMAIL_COTIZADOR=tu_template_id
VITE_EMAIL_USER=tu_user_id

# Futuras APIs
JWT_SECRET=tu_jwt_secret_muy_seguro
API_BASE_URL=http://localhost:8000/api

# Servicios externos
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_URL=cloudinary://...
```

### 2. Scripts de Desarrollo Útiles
Agregar al `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint --fix . --ext .js,.jsx",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "analyze": "npm run build && npx vite-bundle-analyzer dist/stats.html"
  }
}
```

---

## 🗄️ Configuración de Base de Datos

### 1. PostgreSQL Setup
```sql
-- Crear base de datos
CREATE DATABASE ffconsultants_db;

-- Crear usuario
CREATE USER ffconsultants_user WITH PASSWORD 'password_seguro';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE ffconsultants_db TO ffconsultants_user;

-- Tablas básicas para el sistema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE insurance_quotes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    insurance_company VARCHAR(100),
    coverage_amount VARCHAR(50),
    payment_type VARCHAR(20),
    quote_data JSONB,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Estructura de Archivos para Backend
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── quotesController.js
│   │   └── usersController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Quote.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── quotes.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── package.json
└── server.js
```

---

## 🌐 Configuración de Servidor Local

### 1. Servidor Express.js Básico
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware de seguridad
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'https://ffconsultantsve.vercel.app'],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por IP
});
app.use(limiter);

// Middleware para parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/quotes', require('./src/routes/quotes'));
app.use('/api/users', require('./src/routes/users'));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
```

### 2. Docker Compose para Desarrollo
```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ffconsultants_db
      POSTGRES_USER: ffconsultants_user
      POSTGRES_PASSWORD: password_seguro
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://ffconsultants_user:password_seguro@postgres:5432/ffconsultants_db
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
      - /app/node_modules

volumes:
  postgres_data:
```

---

## 🔐 Configuración de Seguridad

### 1. Autenticación JWT
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de acceso requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
```

### 2. Validación de Datos
```javascript
// middleware/validation.js
const { body, validationResult } = require('express-validator');

const validateQuote = [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('phone').isMobilePhone('es-VE'),
    body('insurance_company').isIn(['seguros-mercantil', 'seguros-qualitas', 'seguros-caracas', 'seguros-hispana']),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateQuote };
```

---

## 📊 Monitoreo y Analytics

### 1. Logging
```javascript
// config/logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'ffconsultants-api' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

module.exports = logger;
```

### 2. Métricas y Performance
```javascript
// middleware/metrics.js
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code']
});

const metricsMiddleware = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        httpRequestDuration
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .observe(duration);
    });
    
    next();
};

module.exports = { metricsMiddleware };
```

---

## 🚀 Deployment y CI/CD

### 1. GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '22'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📝 Comandos Útiles para Mantenimiento

### Comandos Diarios
```bash
# Actualizar dependencias
npm update
npm audit fix

# Limpiar caché
npm cache clean --force
yarn cache clean

# Verificar estado del proyecto
npm run lint
npm run test
npm run build
```

### Comandos de Base de Datos
```bash
# Backup de PostgreSQL
pg_dump -U ffconsultants_user -h localhost ffconsultants_db > backup.sql

# Restaurar backup
psql -U ffconsultants_user -h localhost ffconsultants_db < backup.sql

# Monitorear conexiones
psql -U ffconsultants_user -c "SELECT * FROM pg_stat_activity;"
```

### Comandos de Docker
```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Limpiar contenedores
docker system prune -a
```

---

## 🎯 Próximos Pasos Recomendados

1. **Instalar Node.js 22.x** desde el sitio oficial
2. **Configurar Git** con tus credenciales
3. **Instalar Visual Studio Code** con las extensiones recomendadas
4. **Configurar PostgreSQL** para la base de datos
5. **Crear el backend** con Express.js
6. **Implementar autenticación** de usuarios
7. **Configurar Docker** para desarrollo local
8. **Establecer CI/CD** con GitHub Actions

---

## 📞 Recursos y Documentación

- **Node.js**: https://nodejs.org/docs/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Express.js**: https://expressjs.com/
- **Docker**: https://docs.docker.com/
- **Vercel**: https://vercel.com/docs

---

**¡Tu PC estará completamente configurada para desarrollo y mantenimiento de servicios digitales avanzados!** 🚀
