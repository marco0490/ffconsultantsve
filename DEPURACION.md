# Reporte de Depuración - FFC Consultants

## Archivos/Recursos NO Utilizados (Candidatos a Eliminar)

### 🖼️ Imágenes No Referenciadas

| Archivo | Tamaño | Estado |
|---------|--------|--------|
| `QualitasLogo.svg` | 78 KB | ❌ No usado (aseguradora eliminada) |
| `MercantilLogo.svg` | 73 KB | ❌ No usado (aseguradora eliminada) |
| `bombillo.svg` | 21 KB | ❌ No referenciado en código |
| `microfono.svg` | 16 KB | ❌ No referenciado en código |
| `huella.svg` | 51 KB | ❌ No referenciado en código |
| `people.png` | 246 KB | ❌ No referenciado en código |

**Total a liberar:** ~485 KB

### ✅ Imágenes EN USO (No eliminar)

| Archivo | Usado en |
|---------|----------|
| `car-insurance.mp4` | PromoSection.jsx |
| `mobile-insurance.mp4` | PromoSection.jsx |
| `family.png` | We.jsx |
| `contact-image.png` | ContactSection.jsx |
| `Ellipse-7.png` | Howto.jsx |
| `Ellipse-8.png` | Howto.jsx |
| `image1-home.png` | Howto.jsx |
| `isologo con s .png` | Header.jsx |
| `logo.png` | Varios |
| `insurance-bg-illustration.svg` | ActionSection.jsx |
| `NotFoundSVG.svg` | NotFound.jsx |
| `check.svg` | Varios |
| `OceanicaLogo.png` | PlansOceanica |
| `PiramideLogo.svg` | PlansPiramide |
| `logo-real-seguros.svg` | PlansReal |

---

## 📁 Carpetas/Páginas a Revisar

Las siguientes carpetas de páginas de planes existen pero deben verificarse:

- `src/pages/PlansReal/` - ✅ Nueva aseguradora
- `src/pages/PlansCaracas/` - ✅ Nueva aseguradora
- `src/pages/PlansEstar/` - ✅ Nueva aseguradora
- `src/pages/PlansOceanica/` - ✅ En uso
- `src/pages/PlansPiramide/` - ✅ En uso

**Nota:** Las páginas de Qualitas y Mercantil ya fueron eliminadas correctamente.

---

## 🧹 Código Comentado a Revisar

Buscar y eliminar código comentado en:
- [ ] Footer.jsx (posibles referencias antiguas)
- [ ] App.jsx (rutas comentadas)

---

## 📋 Acciones Recomendadas

### Eliminar Inmediatamente:
```
src/assets/images/QualitasLogo.svg
src/assets/images/MercantilLogo.svg
src/assets/images/bombillo.svg
src/assets/images/microfono.svg
src/assets/images/huella.svg
src/assets/images/people.png
```

### Verificar Antes de Eliminar:
- `image2-home.png` - Verificar si se usa en algún componente

---

## Comandos para Eliminar (Windows)

```batch
del "src\assets\images\QualitasLogo.svg"
del "src\assets\images\MercantilLogo.svg"
del "src\assets\images\bombillo.svg"
del "src\assets\images\microfono.svg"
del "src\assets\images\huella.svg"
del "src\assets\images\people.png"
```

---

*Reporte generado automáticamente - Mayo 2026*
