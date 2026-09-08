# Levantamiento de campos — Aseguradoras aliadas
**Fecha:** 8-sep-2026 · **Productos objetivo:** RCV · Accidentes Personales · Combinado Residencial · Vida · Servicios Funerarios · Apple Care (solo Real)

---

## 1. Resumen por aseguradora

| Aseguradora | ¿Cotizador público en web? | ¿Formularios oficiales de solicitud? | Estado |
|---|---|---|---|
| **Seguros Caracas** | No — "Solicítala a tu intermediario" | **Sí, en PDF, por producto** (ver §3) | ✅ Auto, AP, Vida y Hogar extraídos completos (§4, §11–§13) |
| **Estar Seguros** | Parcial — el portal `cotizador-online` es **solo de Salud (HCM)**; todos los botones "Quiero cotizar" (RCV, AP, Vida, Residencial) llevan al mismo cotizador de Salud | **Sí — Zona de Descargas con solicitudes de los 5 productos** (ver §6) | ✅ RCV, AP, Vida, Funerario y Residencial extraídos completos (§7, §14–§17) |
| **Real Seguros** | **Sí** — cotizadores cortos en `real-seguros.com/cotizador/{vehiculo,equipos_electronicos,personas}` (capturan lead + datos mínimos) | No encontrados (pedir como intermediario) | ✅ Cotizadores capturados (por Andrés); datos legales y solicitudes pendientes |

**Hallazgo clave:** las aseguradoras venezolanas no cotizan al público en su web (salvo Estar); trabajan por **intermediario**. Lo que sí publican es la **Solicitud de Seguro** oficial de cada producto — y ese documento es, literalmente, la lista de datos que exigen para emitir. Es la fuente correcta para el spec.

---

## 2. Datos legales encontrados (para `Legal.jsx`)

- **Seguros Caracas, C.A.** — RIF **J-00038923-3** — Inscrita en SUDEASEG bajo el **No. 13** (código ES-13). Sede: Av. Francisco de Miranda, CC Parque Canaima, Torre Seguros Caracas, Los Palos Grandes, Caracas.
- **Estar Seguros, S.A.** — RIF **J-00007587-5** — Inscrita en SUDEASEG bajo el **N° 23**. Sede: Centro Plaza, Torre D, 1ª Transversal de Los Palos Grandes, Caracas 1062-A. (Pie de página web y de la solicitud RCV.)
- Real Seguros: pendiente (tomar del pie de página de su web / condicionados).

---

## 3. Seguros Caracas — Formularios oficiales (PDF)

| Producto | Solicitud de seguro | Condicionado / anexos |
|---|---|---|
| **Auto (Casco + RCV)** | `https://www.seguroscaracas.com/portal/archivos/Solicitud%20de%20Seguro%20Auto.pdf` | Condicionado RCV, Casco, Asistencia Vial Plus / Para Ti, Combinado RCV-Ocupantes |
| **Accidentes Personales** | `https://www.seguroscaracas.com/portal/archivos/SuscripcionPersonasIndividual/Solicitud%20de%20Seguro%20de%20AP.pdf` | Póliza AP Individual + anexos dermatológico, psicológico, oftalmológico, odontológico |
| **Vida Individual** | `https://www.seguroscaracas.com/portal/archivos/SuscripcionPersonasIndividual/Solicitud%20de%20Seguro%20Vida%20Individual.pdf` | Vida Temporal en USD + anexos muerte accidental, gastos de entierro, atención psicológica |
| **Hogar (Combinado Residencial)** | `https://www.seguroscaracas.com/portal/archivos/Patrimoniales/Solicitud%20de%20Seguro%20Hogar.pdf` | Condicionado Hogar |
| **Servicios Funerarios** | No aparece como producto separado en la web; el amparo funerario existe como **anexo "Gastos de Entierro"** de Vida y AP. Confirmar con la aseguradora si venden Funerario como póliza independiente. | — |

---

## 4. Seguros Caracas — Solicitud de Seguro Auto (extraída completa, 5 páginas, form FSUAI001-0-V2.0)

### Encabezado
- Tipo: ☐ Casco ☐ Responsabilidad Civil, Accidentes Terrestres y Asistencia Vial

### I. Datos del Tomador (bloque de persona)
- Nombres y apellidos / Razón social
- C.I. / Pasaporte: ☐ V ☐ E + número · RIF
- Lugar y fecha de nacimiento · Sexo ☐ M ☐ F
- Estado civil: ☐ C ☐ S ☐ V ☐ D ☐ Otro
- Ingreso anual (U.T.): ☐ Menor a 3.500 ☐ Entre 3.501 y 6.500 ☐ Mayor a 6.501
- Actividad económica · Especifique el ramo
- Descripción de la actividad: ☐ Independiente ☐ Dependiente ☐ Societaria ☐ Otro
- Profesión · Ocupación · Lugar donde trabaja
- ¿Se dedica a la comercialización de criptoactivos? ☐ Sí ☐ No
- **Dirección de habitación:** Estado, Ciudad, Municipio, Parroquia, Urbanización/Sector/Barrio, Edif./Galpón/Casa/Quinta, Vía principal, Vía 1, Vía 2, Torre/Sección/Ala, Piso/Nivel, Local/Ofic./Apto, Referencia, Otro, Código postal, Teléfono habitación, Teléfono oficina, Teléfono celular
- **Dirección de oficina:** mismos campos
- E-mail · Fax

### Si el Tomador es Persona Jurídica (adicional)
- Fecha de constitución · Tipo de actividad económica · Naturaleza ☐ Pública ☐ Privada
- Productos y/o servicios que ofrece · Utilidad del ejercicio anterior · Patrimonio según último estado de resultados
- La factura debe salir a nombre de: ☐ Tomador ☐ Asegurado

### II. Datos del Representante Legal — mismo bloque de persona que I
### III. Datos del propuesto Asegurado Titular — mismo bloque de persona que I

### IV. Vigencia del seguro
- Desde __/__/__ · Hasta __/__/__

### V. Bien por asegurar (vehículo)
- Placa · Marca · Modelo · Año · Color
- Serial del motor · Número de cilindros · Serial de carrocería
- Transmisión: ☐ Automático ☐ Sincrónico
- Uso del vehículo · Tipo de carga · Número de pasajeros
- Peso en kilogramos · Cantidad de toneladas
- Uso habitual: ☐ Urbano ☐ Extraurbano
- Usado por: ☐ Propietario ☐ Cónyuge ☐ Chofer ☐ Hijos ☐ Otros · Experiencia: __ años
- Grado de licencia: ☐ Segunda ☐ Tercera ☐ Título ☐ Quinta ☐ Cuarta

### VI. Coberturas solicitadas (con suma asegurada cada una)
- **Automóvil – Casco:** Amplia · Amplia con deducible (%) · Amplia plan familiar · Pérdida total · Indemnización diaria
- **Accesorios:** Radio/Reproductor/CD · Aire acondicionado · Otro
- **Combinado Automóvil:** RCV básica · Asistencia legal y defensa penal · Exceso de límite · Asistencia Vial ☐ Plus ☐ Para ti
- **Accidentes Terrestres:** para ☐ Conductor ☐ Pasajeros ☐ Ayudantes → coberturas: Muerte · Invalidez · Gastos médicos o curación · Gastos de entierro
- Nota del formulario: "El asegurado no está obligado a tomar todas y cada una de las coberturas aquí señaladas."

### VII. Intermediario(s)
- Apellidos y nombres · Código · % Participación · Firma (lo llena FFC)

### VIII. Declaraciones (texto oficial PLAFT de Seguros Caracas)
> En mi carácter de solicitante de la póliza o en representación de este, declaro que la información aquí suministrada es exacta, sin omisión alguna de detalle, hecho o circunstancia.
>
> Yo, ________, C.I. No. ________, doy fe que el dinero utilizado para el pago de la Prima de la propuesta póliza y las que de esta se deriven, proviene de una fuente lícita y por lo tanto no tiene relación alguna con dinero, capitales, bienes, haberes, beneficios, valores o títulos producto de las actividades o acciones derivadas de operaciones ilícitas, conforme a lo dispuesto en el Título III de las "Normas sobre la Administración de Riesgos de Legitimación de Capitales, Financiamiento al Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva en la Actividad Aseguradora", publicada en la Gaceta Oficial de la República Bolivariana de Venezuela N° 42.128, de fecha 17 de mayo de 2021.

- Lugar · Fecha · Firma del Tomador · Firma del Asegurado · Huella dactilar de ambos (pulgar derecho)
- Pie: aprobado por SUDEASEG mediante Providencia N° FSAA-1-1-0579 del 23-nov-2022.

---

## 6. Estar Seguros — Formularios oficiales (Zona de Descargas)

Base: `https://www.estarseguros.com/app/ZonaDescarga/v2/public/documents/{id}/download` (cambiar `download` por `preview` para verlo en el navegador).

| Producto | Documento | ID |
|---|---|---|
| **RCV** | Solicitud Seguros de Responsabilidad Civil de Vehículos | **381** |
| **Accidentes Personales** | Solicitud de Póliza Producto Personales | **177** |
| AP para ocupantes de vehículo | Solicitud de Seguros Auto Producto APOV | 249 |
| **Vida** | Solicitud de Póliza Producto de Vida Individual | **191** |
| **Servicios Funerarios** | Solicitud de Póliza Producto de Seguros Funerario | **188** |
| **Combinado Residencial** | Solicitud Seguro Combinado Residencial | **368** |
| Casco (referencia) | Solicitud Seguros Casco de Vehículos Terrestres | 380 |

**Cotizador online de Estar (solo Salud):** portal APEX que primero captura un lead (nombre, cód. área + teléfono, email), luego pide "Edad titular" y después el bloque de persona. Campos y opciones exactas del bloque persona:
- Tipo de identificación: `CÉDULA VENEZOLANO (V)` · `CÉDULA EXTRANJERO (E)` · `PASAPORTE` · `JURIDICO` · `GUBERNAMENTAL` · `MENOR`
- Número · Nombre · Apellido · Fecha de nacimiento (datepicker) · Tipo de persona (Titular)
- ¿Está expuesto políticamente? · Sexo: `Femenino` · `Masculino` · `No aplica`
- Tipo domicilio (Habitación) · País (Venezuela) · **Estado** (lista de 24 + "No Declarado") · Dirección (texto libre) · Email
- Teléfono celular: operadora `0412 · 0414 · 0416 · 0424 · 0426` + número
- Ocupación (buscador con autocompletado; default "SIN OCUPACIÓN")
- Checkbox "Tomador distinto al Titular" · Sección "Recaudos" (subida de documentos)
- Toggle obligatorio "He leído cuidadosa y totalmente el contenido de la solicitud" con modal de condiciones (texto en §7).

---

## 7. Estar Seguros — Solicitud RCV (extraída completa, 2 páginas, Providencia SAA-09-0989-2025 del 25/09/2025)

### Encabezado
- N° Solicitud · ☐ Emisión ☐ Inclusión

### Datos del Propuesto Asegurado — Tipo persona ☐ Natural ☐ Jurídica
**Persona natural:**
- Apellidos · Nombres
- Cédula/Pasaporte ☐ V ☐ E + N° · R.I.F. · Nacionalidad
- Fecha de nacimiento · Sexo ☐ F ☐ M · Estado civil ☐ S ☐ C ☐ D ☐ V ☐ O
- Profesión · Ocupación u oficio · Ingreso anual Bs.
- Actividad comercial (si es comerciante indique el ramo) · La realiza como: ☐ Independiente ☐ Dependiente ☐ Societaria
- **Dirección de habitación:** Urbanización/Zona/Sector · Avenida · Calle/Transversal/Vereda · Casa · Edificio · Piso · Estado · Ciudad · Municipio
- **Dirección de oficina:** mismos campos
- Correo electrónico · Teléfonos: Oficina · Celular
- ¿Es persona expuesta políticamente? ☐ Sí ☐ No → si sí: ☐ Directo ☐ Relacionado

**Persona jurídica:** Siglas/Nombre comercial · Tipo ☐ Privada ☐ Pública · Fecha constitución · Ingreso anual Bs. · N° Registro · Tomo · Actividad económica ☐ Industrial ☐ Comercial ☐ Profesional ☐ Otra · Representante legal (nombres, cédula, RIF, nacionalidad) · Actividad comercial · Dirección de oficina · Correo · Teléfonos

### Datos del Tomador (si es diferente al Asegurado) — mismo bloque que arriba
### Dirección de Cobro — Urbanización · Avenida · Calle · Casa · Edificio · Piso · Estado · Ciudad · Municipio

### Datos del Riesgo (vehículo)
- Placa · Marca · Modelo · Versión · Año · Color principal · Nro. de pasajeros
- Serial de carrocería · Nro. de cilindros · Peso
- Capacidad de carga (Tm.) · Tipo de uso: ☐ Particular ☐ Carga ☐ Moto ☐ Otro

### Información general del seguro
- Vigencia desde/hasta (a las 12 m) · Fecha de suscripción · Fecha de movimiento
- Frecuencia de pago: ☐ Anual ☐ Semestral ☐ Trimestral ☐ Mensual
- Intermediario de seguros · Código · Moneda · Sucursal

### Coberturas solicitadas
- **Básica:** Responsabilidad Civil de Vehículos Básica — Daños a cosas · Daños a personas — Suma asegurada "Según regulación vigente"
- **Opcionales (con suma asegurada):** ☐ Exceso de límite · ☐ Asistencia legal y defensa penal · ☐ Accidentes personales para ocupantes (Muerte accidental · Invalidez permanente · Gastos médicos/atención psicológica · Gastos por servicios funerarios) · ☐ Asistencia en viajes Plus
- Nota: "El Tomador NO está obligado a tomar todas y cada una de las coberturas aquí señaladas."

### Beneficiarios en caso de muerte del asegurado
- Apellidos y nombre · Parentesco · Cédula · Fecha de nacimiento · Sexo · % participación · Teléfono

### Declaración de Origen de Fondos (texto oficial Estar)
> Yo, ________, titular de la cédula de identidad N° ________ en mi carácter de TOMADOR, doy fe de que el dinero utilizado para el pago de la prima, proviene de una fuente lícita y su origen no guarda relación alguna con capitales, bienes, haberes, valores, títulos u operaciones, producto de actividades ilícitas o que provenga de los delitos de Delincuencia Organizada u otras conductas tipificadas en la legislación venezolana.

### Declaración de Fe (texto oficial Estar)
> Yo, el PROPUESTO ASEGURADO, ________ DECLARO que:
> I. He leído cuidadosa y totalmente el contenido de la solicitud; la información que proporciono es verdadera, amplia, completa y exacta y no he omitido, ocultado, ni disimulado datos que puedan modificar la opinión del Asegurador sobre el riesgo a asegurar.
> II. Esta solicitud forma parte del contrato de seguro, y es la base para apreciar el riesgo y fijar la prima de seguro correspondiente, y en caso de declaraciones falsas, omisiones o reticencias, la póliza podría ser objeto de nulidad absoluta de acuerdo a lo establecido en las condiciones de la misma.
> III. Autorizo formalmente a Estar Seguros, S.A. para que me notifique vía mensajería instantánea (SMS, correo electrónico y similares), sobre el estado de mis pólizas, siniestros y demás informaciones de interés.

- Fecha · Firma del Tomador + huella · Firma del Propuesto Asegurado + huella

---

## 8. Comparativa rápida Caracas vs Estar — RCV

| Dato | Seguros Caracas | Estar Seguros | Para la web |
|---|---|---|---|
| Placa, marca, modelo, año, color | ✅ | ✅ (+ versión) | **Pedir** (color y versión nuevos) |
| Serial de carrocería | ✅ | ✅ | **Pedir** |
| Serial del motor | ✅ | ❌ | Opcional (solo Caracas) |
| Nro. de cilindros / peso | ✅ | ✅ | Catálogo por modelo (no preguntar) |
| Nro. de pasajeros | ✅ | ✅ | **Pedir** (ya es "puestos") |
| Uso | Uso + tipo de carga + urbano/extraurbano | ☐ Particular ☐ Carga ☐ Moto ☐ Otro | **Pedir** con esas 4 opciones |
| Transmisión, licencia, experiencia, quién conduce | ✅ | ❌ | Solo para Casco, no RCV |
| Persona: cédula, nombre, nac., sexo, edo. civil | ✅ | ✅ | **Pedir** |
| Profesión / ocupación / actividad económica | ✅ | ✅ | **Pedir** (obligatorio PLAFT en ambas) |
| Ingreso anual | En U.T. (3 rangos) | En Bs. (monto) | Pedir rango; mapear después |
| PEP (expuesto políticamente) | ❌ (pregunta cripto) | ✅ | **Pedir** sí/no |
| Dirección estructurada | Muy detallada (16 campos) | Urbanización, avenida, calle, casa/edif., piso, estado, ciudad, municipio | **Pedir** la versión Estar (9 campos) — cubre a ambas |
| Email, celular | ✅ | ✅ (operadora + número) | **Pedir** |
| Beneficiarios | Solo en AP terrestres | ✅ tabla | Pedir solo si toma cobertura de ocupantes |
| Frecuencia de pago | — | Anual/Sem/Trim/Mensual | Ya está en la web |
| Declaración PLAFT | Texto largo Gaceta 42.128 | Origen de fondos + Declaración de fe (3 puntos) | Checkbox corto del core + "ver texto completo" por aseguradora |

---

## 9. Real Seguros — Cotizadores online (capturas de Andrés, 8-sep-2026)

Real es la única de las tres con cotización pública. Son formularios de una sola pantalla que capturan el lead y los datos mínimos de tarifa; el resultado (precio en pantalla o contacto de asesor) queda por confirmar.

### `/cotizador/vehiculo/` — "Cotiza tu seguro de Vehículo Terrestre" (RCV)
| Campo | Tipo | Ejemplo visto |
|---|---|---|
| Marca * | select | Chevrolet |
| Modelo * | select dependiente | Aveo |
| Año del vehículo * | select | 2015 |
| Transmisión * | select | Automático |
| Versión * | select dependiente | "Ls - Automatico" |
| **Clase RCV** * | select | Particular |
| **Grupo RCV** * | select | "Hasta 800 Kg. De Peso" |
| Nombre y apellido | texto | |
| Teléfono de contacto * | texto con máscara | (0412) 530-6659 |
| Correo electrónico * | email | |

**Lectura:** Real tarifa el RCV por **clase** (particular / carga / moto / transporte…) y **grupo de peso** del vehículo, que es exactamente el esquema de la Providencia SAA-01-0512-2024 (Gaceta 6.835). No pide valor del vehículo, ni placa, ni serial — eso va en la emisión.

### `/cotizador/equipos_electronicos/` — "Cotiza tu seguro de equipos electrónicos" (= Apple Care)
| Campo | Tipo |
|---|---|
| Tipo de equipo * | select |
| Marca * | select |
| Modelo | select |
| Capacidad | select (GB) |
| Nombre y apellido · Teléfono * · Correo * | texto |

**Lectura:** el producto "Apple Care" de FFC se mapea al ramo **Equipos Electrónicos** de Real. Para emitir seguramente pedirán IMEI/serial y factura, pero para cotizar basta tipo + marca + modelo + capacidad.

### `/cotizador/personas/` — "Cotiza tu seguro personas"
| Campo | Tipo |
|---|---|
| Edad del titular * | número |
| Edades del grupo familiar | texto (lista de edades) |
| Nombre y apellido · Teléfono * · Correo * | texto |

**Lectura:** un solo cotizador para todo el ramo personas (AP, Vida, Funerario, HCM): tarifa por edad del titular y del grupo. Igual que Estar (que también arranca con "Edad titular").

### Pendiente de Real
- Razón social, RIF y N° SUDEASEG (pie de página) para `Legal.jsx`.
- Qué muestra al tocar "Cotizar" (¿precio? ¿"te contactamos"?).
- Solicitudes oficiales de emisión (pedir como intermediario).

---

## 10. Comparativa final RCV — las tres aseguradoras

| Dato | Caracas (solicitud) | Estar (solicitud) | Real (cotizador) | **Decisión web** |
|---|---|---|---|---|
| Marca · Modelo · Año | ✅ | ✅ | ✅ | Pedir (ya está) |
| **Versión** | ❌ | ✅ | ✅ | **Agregar** select dependiente del modelo, con "Otra" |
| Transmisión | ✅ (casco) | ❌ | ✅ | Agregar (auto/sincrónico), un toque |
| Color | ✅ | ✅ | ❌ | Pedir en emisión |
| **Clase de uso** | uso + carga + urbano/extraurbano | Particular / Carga / Moto / Otro | Clase RCV | **Cards:** Particular · Carga · Moto · Transporte |
| **Grupo de peso** | peso en kg | peso + Tm. carga | Grupo RCV (rangos) | **No preguntar**: deducir de modelo/versión con catálogo; fallback select de rangos |
| Valor del vehículo | solo para casco | — | — | **Quitar del flujo RCV** (dejar para casco) |
| Nro. de pasajeros | ✅ | ✅ | — | Pedir (ya está como puestos) |
| Placa · Serial carrocería | ✅ | ✅ | — (emisión) | Emisión (ya está) |
| Serial motor · cilindros | ✅ | cilindros | — | Emisión, opcional |
| Persona básica (cédula, nombre, nac., sexo, edo. civil) | ✅ | ✅ | solo nombre/tel/email en cotización | Cotización: nombre + tel + email. Emisión: el resto |
| Ocupación / actividad económica | ✅ | ✅ | — | Emisión (PLAFT) |
| PEP | (cripto) | ✅ | — | Emisión, sí/no |
| Dirección | 16 campos | 9 campos | — | Emisión, 9 campos (modelo Estar) |
| Coberturas opcionales RCV | Exceso de límite · Defensa penal · Asistencia vial Plus/Para ti · AP ocupantes | Exceso de límite · Defensa penal · AP ocupantes (4 amparos) · Asistencia en viajes Plus | (no visible) | Ofrecer 3 toggles comunes: Exceso de límite · Defensa penal · Ocupantes; Asistencia vial como upsell |
| Beneficiarios | solo AP terrestres | tabla | — | Solo si toma cobertura de ocupantes |
| Declaración PLAFT | texto Gaceta 42.128 | Origen de fondos + Declaración de fe | — | Checkbox corto del core + enlace al texto de la aseguradora elegida |

### Conjunto mínimo común — cotización RCV en la web (propuesto)
1. Marca → Modelo → Año → Versión → Transmisión
2. Clase de uso (cards)
3. [Grupo de peso: automático por catálogo]
4. Nro. de pasajeros
5. Estado donde circula
6. Nombre · WhatsApp · Email → **resultado con las 3 aseguradoras**

### Conjunto mínimo común — emisión RCV (propuesto)
Placa · Serial de carrocería · Color · (Serial motor opcional) · Cédula · Fecha de nacimiento · Sexo · Estado civil · Ocupación · PEP sí/no · Dirección (9 campos) · Coberturas opcionales · Beneficiarios (si aplica) · PLAFT · Pago.

---

## 5. Lectura para el diseño de la web

1. **La solicitud es el formulario del intermediario, no del cliente.** Tiene ~60 campos porque cubre persona natural, jurídica, representante legal, casco, RCV y accidentes en un solo papel. **La web NO debe pedir todo esto.** Debe pedir lo que el **core** necesita para emitir (hoy: placa, serial de carrocería, puestos, uso, tomador, correo, dirección, PLAFT) y lo demás lo completa FFC como intermediario o se toma de catálogos.

2. **Campos que sí conviene agregar al flujo web de RCV** porque la aseguradora los exige y no son deducibles:
   - **Serial del motor** (además del de carrocería)
   - **Color**
   - **Número de pasajeros** (ya lo pedimos como "puestos")
   - **Estado civil** y **sexo** (bloque persona)
   - **Actividad económica / ocupación** (obligatorio PLAFT)
   - **Dirección estructurada**: al menos Estado, Ciudad, Municipio, Urbanización, Calle/Avenida, Edificio/Casa, Piso/Apto — no un solo campo libre.
   - Para Casco (no para RCV): grado de licencia, experiencia, quién usa el vehículo, transmisión.

3. **El bloque "persona" es idéntico en todos los productos** (tomador = asegurado en la mayoría de los casos). Se construye una vez como componente reutilizable y sirve para RCV, AP, Vida, Hogar y Funerario.

4. **Texto PLAFT:** cada aseguradora tiene el suyo, pero todos citan la misma norma (Gaceta 42.128, 17-may-2021). El core usa una versión corta. Para la web, recomendación: mostrar la versión corta del core como checkbox + enlace "Ver declaración completa" con el texto largo de la aseguradora seleccionada.

5. **Persona jurídica:** el formulario la contempla (RIF J, representante legal, datos financieros). Para la primera versión web, limitar a persona natural y derivar jurídica a un asesor.

---

## 6. Próximos pasos

- [x] **Descargar los 4 PDFs de Seguros Caracas** (§3) a `docs/aseguradoras/caracas/` y extraer el texto (`pdftotext`) — matrices de AP, Vida y Hogar en §11–§13.
- [x] **Estar Seguros:** descargar los PDFs 177 (AP), 191 (Vida), 188 (Funerario) y 368 (Residencial) a `docs/aseguradoras/estar/` y extraer campos — matrices en §14–§17.
- [ ] **Real Seguros:** capturar el pie de página (razón social, RIF, N° SUDEASEG) y qué muestra el botón "Cotizar". Pedir a Marco las solicitudes oficiales de emisión como intermediario.
- [ ] **Servicios Funerarios:** confirmar con las tres si es póliza independiente o anexo de Vida/AP.
- [ ] **Apple Care (Real):** producto atípico; pedir a Real el formulario y condicionado.
- [ ] Con las tres matrices completas, construir la **matriz comparativa** (campo × aseguradora × producto) y definir el **conjunto mínimo común** que pedirá la web.

---

## 11. Seguros Caracas — Accidentes Personales (extraída completa, form FSUPI006-0-V3.0, Providencia SAA-09-0496-2025)

PDF: `docs/aseguradoras/caracas/ap.pdf`

### Bloque de persona
Idéntico a §4-I: Nombres y apellidos · C.I./Pasaporte ☐V ☐E + RIF · Lugar y fecha de nacimiento · Sexo ☐M ☐F · Estado civil ☐C ☐S ☐V ☐D ☐Otro · Ingreso anual (T.C.R.) ☐<3.500 ☐3.501–6.500 ☐>6.501 · Actividad económica ☐Comercial ☐Otra + ramo · Descripción ☐Independiente ☐Dependiente ☐Societaria ☐Otro · Profesión · Ocupación · Lugar de trabajo · Criptoactivos ☐Sí ☐No · Dirección de habitación estructurada (16 campos) · Dirección de oficina · Email · Fax. Incluye bloques de **Persona Jurídica**, **Representante Legal** y **Propuesto Asegurado**.

### IV. Vigencia
- Desde/Hasta · Frecuencia de pago.

### V. Inscritos (tabla, hasta 6 personas)
- N° · Apellidos y nombres · Fecha nac. · N° C.I. · Peso (kg) · Estatura · Sexo · Parentesco · Actividad económica/Ocupación.

### VI. Coberturas solicitadas (suma asegurada por inscrito) — Beneficio Acumulativo ☐Sí ☐No
- **Obligatorias:** Muerte Accidental · Invalidez Permanente.
- **Opcionales:** Gastos Médicos · Gastos de Entierro · Incapacidad Temporal · Incapacidad Profesional · Telemedicina · Entrega de Medicamentos · AMIS Para Ti.

### Beneficiarios (fallecimiento del titular)
- Apellidos y nombres · N° C.I. · Parentesco · % Participación.

### VII. Cuestionario (laboral + salud)
- ¿Trabaja por su cuenta? / ¿para quién? · actividades / cargo / ingreso mensual (e ingreso del cónyuge si toma Incapacidad Temporal) · ¿utiliza maquinarias? · ¿alto voltaje? · ¿explosivos o químicos? · ¿maneja vehículos? · ¿embarcaciones? · ¿tripula aeronaves? (N° licencia, horas de vuelo) · ¿buena salud? · ¿accidentes previos? · ¿defecto físico? · deportes / ¿deporte profesional? · ¿otra póliza de vida/accidente/hospitalización? · ¿le han rechazado alguna póliza?
- Anexo **XI. Datos bancarios para pago**: Banco · N° de cuenta · Tipo de cuenta.

### Declaraciones (XII)
- Texto PLAFT oficial (Gaceta 42.128, 17-may-2021), idéntico al de §4-VIII. Lugar · Fecha · Firma del Tomador y del Asegurado · Huella dactilar (pulgar derecho).

---

## 12. Seguros Caracas — Vida Individual (extraída completa)

PDF: `docs/aseguradoras/caracas/vida.pdf`

### Bloque de persona
Idéntico a §4 (Tomador / Representante Legal / Propuesto Asegurado). Dirección de habitación + Dirección de oficina y/o cobro.

### IV. Vigencia
- Desde/Hasta · Frecuencia de pago.

### V. Cobertura Básica — Temporal "N" años
- Moneda ☐Bs ☐US$ · Duración (años) · Edad · **Suma asegurada** (las básicas y opcionales deben ir en la misma moneda).

### VI. Coberturas opcionales (con suma asegurada)
- Muerte Accidental · Gastos de Entierro · Servicio de Atención Psicológica. (En el formulario, ejemplo de sumas: general 20.000,00 · Muerte Accidental 5.000,00.)

### VII. Beneficiarios (fallecimiento del titular)
- Apellidos y nombres · N° C.I. · Parentesco · % Participación.

### VIII. Cuestionario de salud
- ¿Fuma? (promedio diario) · ¿alcohol? (promedio) · Estatura/Peso · Actividad deportiva (☐Profesional ☐Aficionado, años) · ¿vuelos aéreos? · ¿otra póliza de vida? · ¿intervención quirúrgica / prevista? · ¿tratamiento/síntomas? · ¿enfermedad transitoria/crónica/defecto? · ¿gravidez? (si femenino) · ¿medicación prescrita? · ¿transfusiones? · antecedentes familiares (corazón, cáncer, diabetes, mental, tuberculosis, renal, hipertensión). Si alguna es afirmativa → **cuestionario de salud anexo**.

### X. Datos bancarios
- Domiciliación bancaria (Banco · N° cuenta · Tipo) o tarjeta de crédito (Banco · N° · Tipo · Vence).

### Declaraciones
- PLAFT (Gaceta 42.128). El intermediario verifica conforme al art. 49 (LC/FT/FPADM).

---

## 13. Seguros Caracas — Hogar / Combinado Residencial (extraída completa)

PDF: `docs/aseguradoras/caracas/hogar.pdf`

### Bloque de persona
Idéntico a §4 (Tomador / Asegurado).

### V. Bienes por asegurar (con suma asegurada)
- **a) Edificaciones** e instalaciones permanentes, mejoras o bienhechurías.
- **b) Mobiliario, efectos personales y de uso doméstico** (Grupos A–F; tabla al dorso según la suma de Edificaciones; puede detallarse el Grupo F).
- **c) Joyas, colecciones, antigüedades, objetos de arte o de lujo, equipos suntuosos.**

### VI. Coberturas solicitadas (con límites/sumas)
- **Básica:** Incendio, rayo, explosión, impacto de aeronaves u objetos; Humo y hollín; Extensión de cobertura; Daños por agua; Motín, disturbios populares/laborales y daños maliciosos.
- **Opcionales:** Robo, asalto, atraco y hurto · Infidelidad de empleados domésticos · Terremoto (edificación / mobiliario / objetos) · Inundación (edificación / mobiliario / objetos) · Rotura de vidrios, espejos y cristales · Tarjetas de crédito y débito · Equipo electrónico · Responsabilidad Civil del Hogar (Básica · Exceso · Ante vecinos · Riesgo locativo) · Accidentes Personales (Muerte · Invalidez · Gastos médicos · Gastos de entierro) · Asistencia del Hogar.

### VII. Información complementaria
- Descripción de bienes del Grupo F (marca, modelo, serial, año) · Grupo familiar/doméstico para la cobertura de AP · Empleados domésticos (para Infidelidad) · Tarjetas de crédito/débito · Datos para inspección del riesgo · Siniestros anteriores · Otros seguros vigentes sobre los mismos bienes.

### Beneficiarios
- Beneficiario(s) preferencial(es): apellido y nombre o razón social · C.I./RIF · Partida en garantía.

### IX. Datos bancarios + Declaraciones
- Domiciliación / tarjeta de crédito. PLAFT (Gaceta 42.128).

---

## 14. Estar Seguros — Accidentes Personales (doc 177, extraída completa, Oficio 000668 del 18-ene-2008)

PDF: `docs/aseguradoras/estar/177.pdf`

### Bloque de persona (Tomador)
- Apellidos · Nombres · C.I. ☐V ☐E + Pasaporte · Fecha nac + **Edad** · Sexo ☐F ☐M · País/Ciudad de nacimiento · Estado civil (Soltero/Casado/Divorciado/Viudo/Concubino) · Profesión u oficio · Empresa donde labora · Cargo · Fecha de ingreso · **Ingreso anual Bs.F (6 rangos):** ≤10.000 · 10.001–30.000 · 30.001–60.000 · 60.001–90.000 · 90.001–150.000 · >150.000 · **Condición de la vivienda** ☐Propia ☐Alquilada ☐Hipotecada · Dirección de habitación y de oficina (urbanización, país, estado, ciudad, teléfono, email, celular).
- **Persona Jurídica / Gubernamental:** RIF · Nombre comercial / Razón social · Actividad · **Patrimonio (6 rangos)** · Domicilio fiscal · Registro Mercantil (circunscripción, fecha, número, tomo) · Representante legal.
- **Dirección para el cobro de la prima** ☐Habitación/Domicilio fiscal ☐Oficina.
- **Datos del Propuesto Asegurado** (si es diferente al Tomador).

### Información del riesgo
- Peso · Estatura · ¿buen estado de salud? · ¿defecto físico (vista/oído)? · ¿practica deportes? · ¿actividades con maquinarias, herramientas, andamios, inflamables/explosivos, vehículos, motos, alta tensión? · ¿vehículo propio / del cónyuge / otro? (marca, modelo, año) · **Nivel educativo** (asegurado y cónyuge) · ¿hijos? · N° dependientes económicos · años de experiencia laboral · clubes/asociaciones · casa vacacional · tiempo compartido · tarjetas de crédito · **componentes del hogar** (TV >25", DVD, cable, DirecTV, computadora de mesa/portátil, banda ancha) · ¿otras pólizas vigentes? · pólizas rechazadas/anuladas · reclamaciones previas.

### Coberturas solicitadas (con suma asegurada Bs.F)
- **Básica:** Muerte Accidental.
- **Opcionales:** Incapacidad Total y Permanente y Pérdida de Extremidades, Audición y Vista · Incapacidad Total Temporal (hasta N semanas; requiere ingreso anual estimado) · Gastos Médicos y Gastos por Fallecimiento · **ampliación por deportes/actividades de riesgo** (alpinismo, ciclismo, esquí acuático/nieve, boxeo/lucha, motociclismo, automovilismo, canoa, caza, coleador, equitación, espeleología, motonáutica, polo, submarinismo, velero/yachting, skydiving, ícaro…) · cobertura como pasajero en aviones no comerciales/helicópteros · **Gastos de Entierro (anexo)**.

### Beneficiarios
- En caso de Muerte Accidental: Apellidos y nombres · Parentesco · C.I. · % Distribución.
- Familiares amparados bajo Gastos de Entierro: Apellidos y nombres · Fecha nac · C.I. · Parentesco.

### Declaraciones
- Declaración de fe (I, II) + Origen de fondos + Autorización médica (relevo de secreto profesional). Firmas + huella del Tomador y del Propuesto Asegurado.

---

## 15. Estar Seguros — Vida Individual (doc 191, extraída completa, Oficio 00012825 del 01-abr-2012)

PDF: `docs/aseguradoras/estar/191.pdf`

### Bloque de persona
Similar a §7 (Tomador / Propuesto Asegurado).

### Plan a contratar (con periodo de pago de primas [años] y suma asegurada)
- Vida Entera (Vitalicio) · Vida Entera (Pago Limitado) · Temporal.

### Actividades y deportes
- ¿practica deportes? · actividades extremas (paracaidismo, alpinismo, submarinismo, competencia en autos/motos/lanchas, militar…) · ¿vuelos en avión/avioneta/helicóptero? · ¿pasajero, piloto o tripulación? · aviación comercial/civil (si piloto → cuestionario para pilotos).

### Declaración de salud del propuesto asegurado
- Preguntas Sí/No con detalles (causa/diagnóstico, fecha de comienzo, duración en meses, exámenes/tratamiento, resultado, médico, hospital) · ¿rechazado como donante de sangre? · **antecedentes familiares** (diabetes, tuberculosis, epilepsia, cardiopatía, hipertensión, cáncer, enfermos mentales) · relaciones familiares (padre/madre/hijos/hermanos: edad, estado de salud, fallecido/causa).

### Beneficiarios (muerte del asegurado)
- Apellidos y nombres · Fecha nac · C.I. · Parentesco · % Suma asegurada. + Otros seguros sobre los mismos riesgos.

### Declaraciones y autorizaciones
- Declaración de fe + Origen de fondos (Ley Orgánica contra la Delincuencia Organizada) + Autorización. Firmas + huella del Tomador y del Asegurado.

---

## 16. Estar Seguros — Servicios Funerarios (doc 188, extraída completa)

PDF: `docs/aseguradoras/estar/188.pdf` · Encabezado: ☐Individual ☐Colectivo · ☐Emisión ☐Inclusión ☐Exclusión.

### Bloque de persona (Tomador y Propuesto Asegurado)
- Apellidos · Nombres · C.I. ☐V ☐E + RIF · Nacionalidad · Fecha nac · Sexo ☐F ☐M · Estado civil (S/C/D/V/O) · Profesión · Ocupación u oficio · Actividad comercial + ramo · Ingreso promedio anual · La actividad la realiza como ☐Profesional Independiente ☐Socio ☐Empleado · Dirección de habitación / oficina / cobro.
- **Persona Jurídica:** razón social · siglas/nombre comercial · tipo ☐Privada ☐Pública · fecha constitución · patrimonio · N° registro · tomo · actividad económica ☐Industrial ☐Comercial ☐Gubernamental ☐Otra · representante legal.

### Información general de la póliza
- Vigencia desde/hasta (a las 12 m) · Fecha de suscripción · Fecha de movimiento · **Frecuencia de pago** ☐Anual ☐Semestral ☐Trimestral ☐Mensual · Intermediario · Código · Moneda · Sucursal.

### Coberturas solicitadas
- **Básica: Gastos Funerarios** — Suma asegurada.

### Dependientes (personas a asegurar además del titular)
- Código · Nombres · Apellidos · Ocupación · Parentesco · C.I. · Fecha de nacimiento.

### Declaración de salud y actividades (Sí/No por código A–I)
- Buena salud del grupo · alcohol/tabaco/drogas · tratamiento o cirugía prevista · VIH-SIDA / enfermedades tropicales / hepatitis · hospitalizado · tripula aeronaves (tipo, horas, licencia) · deportes (cuáles, frecuencia) · enfermedad de algún incluido · deporte profesional · ¿otro seguro funerario vigente? · ¿seguro de vida/HCM/AP/funerario negado o anulado?

### Beneficiarios (muerte del asegurado titular)
- Apellidos y nombres · Parentesco · C.I. · Fecha nac · Sexo · % Participación · Teléfono.

### Declaraciones
- Declaración de fe (8 puntos, incluye salud del grupo) + Autorización médica + **Declaración del Tomador** (origen lícito de los fondos).

---

## 17. Estar Seguros — Combinado Residencial (doc 368, extraída completa)

PDF: `docs/aseguradoras/estar/368.pdf`

### Bloque de persona (Tomador / Propuesto Asegurado, natural + jurídica)
Similar a §7 / §16.

### Información general del riesgo (inmueble)
- **Tipo de riesgo:** ☐Apartamento ☐Casa ☐Apto vacacional ☐Casa vacacional.
- **Relación con el asegurado:** ☐Propiedad ☐Alquiler ☐Otros.
- Año de construcción · N° de pisos / entrepisos / sótanos / mezzaninas · pisos ocupados/desocupados.
- **Ubicación del riesgo:** país, estado, ciudad, municipio, avenida/calle/transversal, N° apto/casa, urbanización/edificio, piso/nivel, teléfono/fax · **Linderos** (Norte/Sur/Este/Oeste).
- **Materiales de construcción:** Estructura · Techos · Pared · Fachada · elementos especiales · tanques (subterráneos / a nivel).
- **Sistema de prevención y protección:** contra Incendio (alarma, hidrantes, rociadores, detección, extinción portátil/con o sin impulsión, automáticos) · contra Robo (alarma, puerta MultiLock, rejas, ventanas con rejas, vigilancia).

### Bienes a asegurar (con suma asegurada Bs)
- Partida a. Edificaciones · b. Contenido · c. Objetos de Alto Riesgo (menores / mayores) · Equipos Electrónicos.

### Coberturas a contratar (con sumas aseguradas)
- **Básica:** Incendio · Extensión de cobertura · Daño por agua · Motín, disturbios populares/laborales y daños maliciosos · Sustracción ilegítima · Hurto · Daños accidentales a equipos electrónicos no portátiles.
- **Complementarias:** Deterioro de bienes refrigerados o congelados · Responsabilidad Civil empresarial de empleados domésticos.
- **Opcionales:** Pérdida de dinero en efectivo · Terremoto o temblor de tierra · Equipos electrónicos.

### Beneficiarios / Declaraciones
- Beneficiario(s) preferencial(es) si aplica (hipoteca) + PLAFT (origen de fondos + declaración de fe).

---

## 18. Comparativa Caracas vs Estar — AP · Vida · Funerario · Residencial

> El **bloque de persona** es prácticamente idéntico en ambas aseguradoras y en todos los productos (ver §5.3): un solo componente reutilizable cubre RCV, AP, Vida, Funerario y Hogar. La diferencia real está en **datos del riesgo, coberturas y cuestionarios** por producto.

### 18.1 Accidentes Personales
| Dato | Caracas (§11) | Estar (§14) | **Decisión web** |
|---|---|---|---|
| Ingreso anual | U.T. (3 rangos) | Bs.F (6 rangos) | Pedir **rango**; mapear después |
| Inscritos / grupo | Tabla (peso, estatura, parentesco, actividad) | Individual (grupo vía coberturas) | Pedir grupo si es familiar |
| Cobertura básica | Muerte Accidental **+ Invalidez Permanente** | Muerte Accidental | Muerte Accidental (común); Invalidez como toggle |
| Opcionales | Gastos médicos · Gastos de entierro · Incap. temporal · Incap. profesional · Telemedicina · Medicamentos · AMIS | Incap. total/permanente · Incap. temporal · Gastos médicos+fallecimiento · deportes de riesgo · aviones · Gastos de entierro | **Toggles comunes:** Invalidez · Gastos médicos · Gastos de entierro · Incapacidad temporal |
| Cuestionario | Laboral + salud (maquinarias, explosivos, embarcaciones, aeronaves, deportes) | Salud + deportes de riesgo + vehículos + nivel educativo + componentes del hogar | Declaración corta del core; "requiere revisión" si marca riesgo |
| Beneficiarios | ✅ | ✅ (+ familiares de Gastos de entierro) | Pedir si incluye muerte |
| Suma asegurada | Por cobertura (Bs o US$) | Por cobertura (Bs.F) | Selección de suma por cobertura |
| PLAFT | Gaceta 42.128 | Origen de fondos + Declaración de fe | Checkbox corto + "ver texto" por aseguradora |

### 18.2 Vida Individual
| Dato | Caracas (§12) | Estar (§15) | **Decisión web** |
|---|---|---|---|
| Plan | Temporal "N" años | Vida Entera (Vitalicio) · Vida Entera (Pago Limitado) · **Temporal** | Ofrecer **Temporal** (común); Vida Entera solo Estar |
| Moneda / suma | ☐Bs ☐US$ + suma | Suma + periodo de pago de primas (años) | Pedir suma + moneda + duración |
| Coberturas opcionales | Muerte Accidental · Gastos de Entierro · Atención Psicológica | Anexos por plan | Toggles: Muerte accidental · Gastos de entierro |
| Cuestionario salud | Fuma/alcohol, cirugías, gravidez, antecedentes familiares | Salud + antecedentes familiares detallados (padre/madre/hijos/hermanos) | Declaración corta; anexo si hay banderas |
| Beneficiarios | ✅ | ✅ | Pedir (obligatorio, % = 100) |
| Deportes/vuelos | En cuestionario | Sección específica (extremos, piloto) | Pregunta sí/no; deriva a revisión |
| PLAFT | Gaceta 42.128 | Origen de fondos + Declaración de fe | Checkbox + texto |

### 18.3 Servicios Funerarios
| Dato | Caracas | Estar (§16) | **Decisión web** |
|---|---|---|---|
| ¿Póliza independiente? | **No** — es **anexo "Gastos de Entierro"** de Vida (§12) y AP (§11). *Confirmar con la aseguradora* (pendiente §3). | **Sí**, póliza propia | Vender como producto propio; en Caracas mapear al anexo de Vida/AP |
| Cobertura básica | Gastos de Entierro (anexo, suma asegurada) | Gastos Funerarios (suma asegurada) | Suma asegurada + frecuencia de pago |
| Grupo asegurado | Inscritos del AP/Vida | Tabla de **dependientes** (parentesco, C.I., fecha nac) | Pedir grupo familiar |
| Cuestionario salud | El de Vida/AP | Declaración de salud del grupo (VIH, hospitalizado, deportes, otro funerario) | Declaración corta |
| Frecuencia de pago | Según Vida/AP | ☐Anual ☐Semestral ☐Trimestral ☐Mensual | Ya está en la web |
| Beneficiarios | ✅ (vía Vida/AP) | ✅ (+ teléfono) | Pedir |
| PLAFT | Gaceta 42.128 | Origen de fondos + Declaración de fe | Checkbox + texto |

### 18.4 Combinado Residencial
| Dato | Caracas (§13) | Estar (§17) | **Decisión web** |
|---|---|---|---|
| Tipo de inmueble | (no explícito) | ☐Apartamento ☐Casa ☐Vacacional | **Cards** de tipo |
| Relación con el inmueble | — | ☐Propiedad ☐Alquiler ☐Otros | Pedir |
| Datos de construcción | — | Año, pisos, materiales (estructura/techo/pared/fachada), linderos | Emisión / inspección para sumas altas |
| Sistemas de prevención | Asistencia del hogar | Incendio + Robo detallados | Emisión |
| Bienes a asegurar (sumas) | Edificaciones · Mobiliario (Grupos A–F) · Joyas/objetos de arte | Edificaciones · Contenido · Objetos de alto riesgo · Equipos electrónicos | Pedir **estructura + contenido**; objetos valiosos si aplica |
| Cobertura básica | Incendio/rayo/explosión/agua/motín | Incendio/extensión/agua/motín/sustracción/hurto/equipos no portátiles | Básica común |
| Opcionales | Robo · Terremoto · Inundación · Vidrios · RC Hogar · AP familiar · Asistencia | Efectivo · Terremoto · Equipos electrónicos · (compl.: refrigerados, RC empleados) | **Toggles:** Robo/sustracción · Terremoto · RC del hogar |
| Objetos valiosos | Joyas, colecciones, arte (item c) | Objetos de alto riesgo (menores/mayores) | Pedir solo si aplica |
| Beneficiarios | Preferenciales (partida en garantía) | Preferenciales si hipoteca | Emisión si hay hipoteca |
| PLAFT | Gaceta 42.128 | Origen de fondos + Declaración de fe | Checkbox + texto |

### 18.5 Conjunto mínimo común por producto (propuesto para la web)
- **AP / Vida / Funerario** comparten el arranque de Real y Estar (portal de Salud): **edad del titular + edades del grupo** → cotización; luego bloque de persona + suma asegurada + beneficiarios + PLAFT en emisión.
- **Residencial:** tipo de inmueble (card) → valor de estructura + contenido → estado/ciudad → persona + PLAFT. Datos de construcción, materiales y sistemas de prevención → **emisión/inspección**, no cotización.
- **Cuestionarios de salud/riesgo:** la web usa una **declaración corta** ("¿gozas de buena salud / practicas actividades de riesgo?"); si el cliente marca banderas, se emite igual pero se etiqueta **"requiere revisión del asegurador"** (no bloquear el flujo).
