# Changelog - FFC Consultants

## Fecha: Mayo 2026

### Resumen de Cambios Realizados

---

## 1. Nuevas Aseguradoras Agregadas

Se agregaron 3 nuevas compañías aseguradoras al sistema:

| Aseguradora | Emoji | Descripción |
|-------------|-------|-------------|
| **Real Seguros** | ✅ | Soluciones de protección accesibles y confiables |
| **Seguros Caracas** | 🦁 | Una de las más reconocidas de Venezuela |
| **Estar Seguros** | 🛡️ | +75 años en el mercado venezolano |

### Archivos modificados:
- `src/data/chatbot-knowledge.js` - Base de conocimiento del chatbot
- `src/components/Footer/Footer.jsx` - Menú de planes en footer
- `src/App.jsx` - Rutas de navegación

---

## 2. Componente PromoSection (Nuevo)

**Ubicación:** `src/components/PromoSection/PromoSection.jsx`

Sección promocional con dos cards que muestran:
- Video de seguro de auto (rotado -6°, se endereza en hover)
- Video de seguro digital (rotado +6°, se endereza en hover)
- Badges informativos (24/7 Atención, +500 Vehículos)
- Checklist de beneficios
- Layout escalonado (segunda card con offset)

### Características:
- Videos con animación de rotación usando Framer Motion
- Diseño responsive
- Cards con sombras y bordes redondeados

---

## 3. Componente FamilySection (Rediseñado)

**Ubicación:** `src/components/FamilySection/FamilySection.jsx`

Cambió de "Protege a tu familia" a dos secciones:

### Sección 1: "Todo instantáneo"
- Mockups de teléfonos animados
- Estadísticas: "90 segundos para cotizar", "3 segundos de respuesta IA"

### Sección 2: "¿Ya estás asegurado?"
- Bubbles animados con estadísticas (40% ahorro, 5 aseguradoras, 24/7, +500, 100% digital, $36/mes)
- Botón CTA que redirige al chatbot

---

## 4. Header/Navbar - Indicador Activo

**Ubicación:** `src/components/Header/Header.jsx`

- El subrayado ahora sigue la página activa dinámicamente
- Antes: subrayado fijo en "Inicio"
- Ahora: basado en `pathname` de React Router

---

## 5. ActionSection - ID para Scroll

**Ubicación:** `src/components/ActionSection/ActionSection.jsx`

- Agregado `id="chatbot"` para permitir scroll desde otros componentes
- Los botones de "Cotizar" ahora hacen scroll suave al chatbot

---

## 6. Página Nosotros (We.jsx) - FAQs Actualizadas

**Ubicación:** `src/pages/We/We.jsx`

### Cambios:
1. **Botón "Únete a nosotros"**: Ahora redirige a `/agentes` en lugar de `/`

2. **5 Preguntas Frecuentes**: Agregada información de las 3 nuevas aseguradoras:
   - ¿Qué tipos de planes existen?
   - ¿Tienen red de clínicas cerrada?
   - ¿Qué enfermedades cubren de inmediato?
   - ¿Funciona cualquier clínica fuera de la red?
   - ¿Cuánto tardan los reembolsos?

---

## 7. Rutas Eliminadas/Deprecadas

Se eliminaron rutas de aseguradoras no utilizadas:
- `/planes-qualitas` (Qualitas)
- `/planes-mercantil` (Mercantil)

---

## 8. Chatbot - Base de Conocimiento

**Ubicación:** `src/data/chatbot-knowledge.js`

- Agregadas las 3 nuevas aseguradoras
- Sistema de prompts actualizado
- Información de productos y requisitos de emisión

---

## Archivos Clave del Proyecto

```
src/
├── components/
│   ├── ActionSection/ActionSection.jsx    # Chatbot embebido
│   ├── FamilySection/FamilySection.jsx    # Sección rediseñada
│   ├── PromoSection/PromoSection.jsx      # Nueva sección promo
│   ├── Header/Header.jsx                  # Navbar con indicador activo
│   ├── Footer/Footer.jsx                  # Footer con nuevas aseguradoras
│   └── Chatbot/ChatbotEmbedded.jsx        # Componente chatbot
├── pages/
│   ├── Home/Home.jsx                      # Página principal
│   ├── We/We.jsx                          # Página Nosotros
│   ├── PlansReal/                         # Nueva aseguradora
│   ├── PlansCaracas/                      # Nueva aseguradora
│   └── PlansEstar/                        # Nueva aseguradora
├── data/
│   └── chatbot-knowledge.js               # Base de conocimiento IA
└── assets/
    └── images/
        ├── car-insurance.mp4              # Video promo auto
        └── mobile-insurance.mp4           # Video promo digital
```

---

## Próximos Pasos Sugeridos

1. [ ] Revisar y eliminar imágenes no utilizadas
2. [ ] Depurar código comentado
3. [ ] Verificar rutas huérfanas
4. [ ] Optimizar assets (comprimir imágenes/videos)
5. [ ] Actualizar información de condicionados de pólizas

---

*Documentación generada automáticamente - Mayo 2026*
