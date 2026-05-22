# Pitfalls Research — planetapsilo

**Domain:** Static marketing/validation site (estética psicodélica) para acompañamientos psicológicos + retiros + arte, dirigido a C-Level / nómadas digitales, operado por psicóloga colegiada en Colombia que NO quiere figurar como cara visible.
**Researched:** 2026-05-21
**Confidence:** MEDIUM-HIGH
**Disclaimer:** Este documento es research operativo para guiar decisiones de roadmap. NO sustituye asesoría legal. Las recomendaciones legales (especialmente Sección A) deben ser validadas con abogado colombiano especializado en salud + datos personales antes del lanzamiento público con tráfico real. Marcadas con `[REVIEW: ABOGADO]` los puntos críticos.

---

## Severity Legend

- **CRITICAL** — Puede causar pérdida de tarjeta profesional, sanción regulatoria, o cierre del proyecto.
- **HIGH** — Puede causar pérdida material de leads / dinero / reputación significativa.
- **MEDIUM** — Causa fricción, mala UX o costos evitables a mediano plazo.
- **LOW** — Defecto cosmético / micro-optimización.

---

## Critical Pitfalls

### Pitfall 1: Atribuir "terapia psicodélica" a Sofía explícita o implícitamente — riesgo a tarjeta profesional

**Severity:** CRITICAL `[REVIEW: ABOGADO]`

**What goes wrong:**
El sitio menciona "terapia" + Sofía como psicóloga + psilocibina/hongos en el mismo plano semántico (aunque sea separados por párrafos). El Tribunal Deontológico de COLPSIC interpreta que ofrece tratamiento con sustancia controlada → proceso disciplinario, posible suspensión o cancelación de la tarjeta profesional vía Ley 1090 de 2006. Adicionalmente, si la psilocibina aparece como producto/servicio vinculado, riesgo penal por la Ley 1453 de 2011 (modifica Código Penal en narcotráfico).

**Why it happens:**
La línea entre "acompañamiento" y "terapia" se borra con copy aspiracional/poético. Frases tipo *"sesión transformadora con la medicina"*, *"proceso terapéutico de integración"*, *"viajes guiados por Sofía"* convierten la propuesta en oferta de servicios de salud mental + sustancia controlada. La Ley 1090 (art. 50–52) sanciona "publicar éxitos terapéuticos falsos, datos inexactos o resultados irreales" y exige veracidad/objetividad en la publicidad profesional.

**How to avoid:**
- **Léxico permitido en MVP** (compatible con la decisión de cliente):
  - "Acompañamiento" ✓ — actividad no clínica
  - "Espacio de exploración" ✓
  - "Encuentros" / "Sesiones de conversación" ✓
  - "Integración de experiencias" ✓ (sin nombrar sustancia)
  - "Bienestar", "claridad", "expansión de consciencia" ✓
- **Léxico prohibido en MVP**:
  - "Terapia", "tratamiento", "cura", "paciente", "diagnóstico" ✗
  - "Psilocibina", "hongos", "medicina" + Sofía como prestadora ✗
  - "Garantizado", "resultados comprobados", "% de éxito" ✗
- **Separación de identidades**: la marca es "planetapsilo" (entidad/proyecto). Sofía, si aparece, aparece como "guía", "creadora del espacio", "anfitriona" — NUNCA como "psicóloga prestando este servicio".
- **Si se menciona la credencial Andes** (fase 2): debe ir en bio narrativa separada del bloque de servicios, con disclaimer: *"Su formación como psicóloga informa su mirada, pero los espacios ofrecidos en planetapsilo no constituyen ejercicio clínico de la psicología ni prestación de servicios de salud."*
- **Disclaimer legal global** (footer + página de servicios): *"planetapsilo ofrece espacios de exploración personal y acompañamiento no clínico. No constituye terapia, tratamiento médico ni psicológico. Para necesidades de salud mental, consulte profesional habilitado."*

**Warning signs:**
- El copy actual usa la palabra "terapia" o "tratamiento" en cualquier página.
- La bio de Sofía aparece en la misma página que la descripción del servicio sin disclaimer separador.
- El usuario ICP, leyendo el sitio en frío, podría inferir "esta psicóloga me da hongos guiados".
- Cualquier sección menciona dosis, sustancias, protocolos farmacológicos.

**Phase to address:** Fase 1 (Foundation + Copy Guidelines) — establecer glosario permitido/prohibido ANTES de escribir cualquier copy. Verificación en cada fase con un pase de "linter de copy" antes de deploy.

---

### Pitfall 2: Promoción de retiros con psilocibina en sitio público alojado en Colombia — riesgo regulatorio múltiple

**Severity:** CRITICAL `[REVIEW: ABOGADO]`

**What goes wrong:**
La página `/retiros` describe explícitamente o sugiere fuertemente que el retiro incluye ingestión de psilocibina/hongos. Aunque los hongos *en sí* (cuerpo fructífero natural) están en zona gris en Colombia, **la venta/oferta comercial de productos derivados (extractos, capsulas, chocolates) y la promoción comercial de su consumo** se interpretan como narcotráfico bajo Ley 1453 de 2011. La psilocibina como sustancia sintetizada está explícitamente en Lista I del Convenio de 1971 (sin uso médico reconocido en Colombia).

Adicionalmente, si el sitio promete beneficios terapéuticos de la sustancia → publicidad engañosa SIC (Ley 1480 de 2011, Estatuto del Consumidor).

**Why it happens:**
El referente (sabiduriapsicodelica.com) opera con codificación "m3dicin4" y narrativa indirecta. Es tentador imitarlo sin medir que: (a) el referente opera en México con marco regulatorio distinto, (b) la codificación leetspeak NO blinda legalmente — un fiscal/SIC lee igual "m3dicin4" que "medicina".

**How to avoid:**
- **Sin mención de sustancia en el sitio MVP**. Las páginas `/retiros` describen el formato (días, ubicación, comidas, actividades de integración, naturaleza, meditación, círculos de palabra) sin nombrar la sustancia.
- **Si el retiro incluye sustancia**, esa información se entrega **off-site**, post-screening, en consentimiento informado privado firmado tras aplicación. Nunca en página pública.
- **No usar codificación leetspeak ("m3dicin4", "ps1l")** como estrategia legal — no funciona ante un fiscal y daña SEO/UX. Si se quiere connotación poética (no técnica): "la planta", "la medicina ancestral" en bio narrativa, sin ofertarla como producto.
- **Disclaimer en `/retiros`**: *"Los retiros son espacios de naturaleza, silencio, alimentación consciente, círculos de palabra y prácticas de integración personal. Los participantes son responsables de sus elecciones individuales conforme a la ley aplicable."*
- **Embudo de aplicación obligatorio** para retiros (no agendamiento abierto) — esto reduce exposición pública y permite screening + consentimiento legal antes de cualquier referencia a contenido sensible.

**Warning signs:**
- Cualquier página pública menciona "psilocibina", "hongos", "ayahuasca", "medicina sagrada" en contexto comercial.
- El precio aparece junto a la palabra "sustancia" o sinónimo.
- Imágenes de hongos o iconografía explícitamente psicodélica-sustancia (no abstracta-cósmica).
- "Booking inmediato" para retiros sin formulario de aplicación previa.

**Phase to address:** Fase 1 (Copy + Information Architecture) — diseñar la página `/retiros` como invitación abstracta + aplicación, no como ficha de producto. Reforzar en cada fase de copy.

---

### Pitfall 3: Codificación leetspeak ("m3dicin4") como estrategia de cumplimiento — falsa seguridad

**Severity:** HIGH

**What goes wrong:**
Se asume que escribir "m3dicin4" o "ps1l0c1b1n4" sortea filtros de Meta/Google Ads, COLPSIC, SIC. En la práctica: (a) Meta/Google usan modelos que detectan variantes obvias y suspenden cuentas igual; (b) un proceso administrativo o judicial colombiano interpreta el sentido, no el grafema; (c) destruye SEO orgánico y legibilidad; (d) señaliza al ICP profesional/C-Level que el proyecto es amateur o sospechoso.

**Why it happens:**
El referente lo usa y "parece funcionar". Realidad: el referente es marca consolidada en México, no en Colombia, y opera bajo otro marco — la imitación táctica sin contexto regulatorio es trampa.

**How to avoid:**
- **Cero leetspeak en copy del MVP**. El léxico permitido (Pitfall 1) ya resuelve el problema sin truco.
- Si se quiere "guiño" estético al referente, usarlo en *visuales* o en *un solo asset off-site* (e.g., post social), nunca en copy principal del sitio.
- Si en algún momento se hace publicidad pagada: usar plataformas alternativas (nicho psicodélico, podcasts directos, alianzas) y no Meta/Google Ads — el banneo es seguro y arrastra cuentas asociadas.

**Warning signs:**
- Aparece cualquier cadena tipo `[0-9]` reemplazando letras en headings, CTAs, metadescripciones.
- Se discute "para evitar filtros" como justificación de copy.

**Phase to address:** Fase 1 (Copy Guidelines) — banear explícitamente leetspeak en el style guide.

---

### Pitfall 4: Formulario de contacto sin aviso/política de tratamiento de datos — incumplimiento Ley 1581 de 2012 (Habeas Data)

**Severity:** HIGH `[REVIEW: ABOGADO]`

**What goes wrong:**
El sitio captura nombre + email + WhatsApp + (potencialmente) datos sensibles ("¿qué buscas resolver?", "edad", "estado emocional") sin: (1) aviso de privacidad explícito antes de la captura, (2) checkbox de autorización informada, (3) política de tratamiento de datos publicada accesible, (4) finalidad declarada, (5) canal de PQR. La SIC (autoridad colombiana de protección de datos) puede sancionar con multas hasta 2.000 SMMLV (~COP 2.600 millones en 2026) por incumplimiento del responsable.

**Why it happens:**
En MVP "rápido" se omite porque "es solo un formulario simple". Adicionalmente, en servicios de salud mental los datos capturados (incluso "¿cómo te sientes?") pueden calificar como **datos sensibles** (art. 5 Ley 1581) requiriendo autorización previa, expresa, e informada y refuerzo de medidas.

**How to avoid:**
- **Aviso corto pegado al formulario**: *"Al enviar este formulario autorizas a planetapsilo a tratar tus datos para contactarte. Consulta nuestra [Política de Tratamiento de Datos]. Puedes ejercer tus derechos (conocer, actualizar, suprimir) escribiendo a [email]."*
- **Checkbox obligatorio**: `[ ] He leído y acepto la Política de Tratamiento de Datos`.
- **Página `/privacidad`** publicada con: responsable (nombre + contacto), finalidad, datos recolectados, derechos del titular (art. 8), procedimiento PQR (10 días hábiles + posible extensión de 5, art. 14), seguridad, vigencia.
- **Minimizar captura de datos sensibles** en MVP. El formulario inicial pide solo lo mínimo (nombre, contacto, motivo en 1 línea). Profundidad emocional/clínica va offline o tras agendamiento.
- **NO usar Google Forms** para datos sensibles — transferencia internacional sin garantías formales. Preferir Formspree con cifrado + endpoint europeo o solución equivalente; documentar el encargado del tratamiento.

**Warning signs:**
- Formulario sin checkbox de autorización.
- No existe link a `/privacidad` desde footer y desde formulario.
- Se captura información de salud emocional en formulario público.

**Phase to address:** Fase 2 (Contact + Legal Pages) — política de privacidad y aviso son **bloqueantes** para activar formulario en producción con tráfico real. En MVP-deploy-de-hoy: formulario puede existir pero con disclaimer mínimo y link a "/privacidad — próximamente" si todavía no se redacta — registrar la deuda como gate de fase siguiente.

---

### Pitfall 5: Visitante de la UE → activación involuntaria de GDPR

**Severity:** MEDIUM `[REVIEW: ABOGADO]` — eleva a HIGH si se hace pauta pagada apuntada a EU

**What goes wrong:**
El ICP incluye "nómadas digitales" — muchos residen en UE temporal o permanentemente. Si planetapsilo "ofrece bienes o servicios" a personas en la UE (criterio del Art. 3.2 GDPR), el RGPD aplica extraterritorialmente: requiere base legal explícita, ejercicio de derechos del titular, eventualmente representante en UE (Art. 27), y notificación de brechas. Multas hasta €20M o 4% facturación.

**Why it happens:**
Se asume que un sitio colombiano solo está sujeto a ley colombiana. Falso si: el sitio está en español + inglés / acepta pagos en EUR / nombra países UE en marketing / hace remarketing a EU.

**How to avoid:**
- **En MVP solo-español + sin pauta a EU**: riesgo bajo. Mantener.
- **Cuando se evalúe bilingüe EN o pauta internacional**: añadir cookie banner con consentimiento granular (no solo "aceptar"), política dual ES/EN, mecanismo de ejercicio de derechos por email, y considerar representante UE si volumen lo amerita.
- Documentar en `/privacidad` que el tratamiento se rige por Ley 1581 y mencionar GDPR si aplicable.
- No instalar analytics (GA4) sin consentimiento si hay tráfico UE.

**Warning signs:**
- Se activa Google Analytics 4 sin banner de cookies.
- Se lanza versión EN o se hace anuncio dirigido a "nómadas en Europa".

**Phase to address:** Fase 4+ (Internacionalización) — registrar como gate para abrir EN o pauta.

---

### Pitfall 6: Testimonios "antes y después" / promesas de resultado — publicidad engañosa SIC

**Severity:** HIGH

**What goes wrong:**
Para captar al ICP C-Level se incluyen testimonios fuertes ("salí de mi burnout en una sesión", "tripliqué mi facturación post-retiro") o métricas tipo "95% de participantes reportan claridad". La SIC sanciona publicidad engañosa bajo Estatuto del Consumidor (Ley 1480 de 2011); en salud mental es especialmente sensible. Adicionalmente, Ley 1090 art. 52 prohíbe al psicólogo "publicar éxitos terapéuticos falsos, estadísticas ficticias o resultados irreales".

**Why it happens:**
La industria de coaching/transformación usa testimonios fuertes como su principal palanca de conversión. La mezcla con identidad profesional psicológica eleva el riesgo.

**How to avoid:**
- **Testimonios permitidos**: experiencia subjetiva, ambigua, no clínica. *"El espacio me ayudó a hacerme preguntas que no me hacía hace años"* ✓.
- **Testimonios prohibidos**: outcome clínico, financiero específico, "antes/después" implicando cura. *"Me curó la depresión"* ✗, *"+ 3x revenue"* ✗.
- **Disclaimer junto a cualquier testimonio**: *"Las experiencias son individuales y no constituyen garantía de resultados. planetapsilo no ofrece tratamiento ni promete resultados específicos."*
- **No usar nombres completos + foto + cargo** del testimonio sin autorización escrita (Habeas Data) — usar inicial + ciudad ("M., Bogotá").
- **Métricas agregadas**: si se usan, deben ser verificables y no implicar resultado clínico.

**Warning signs:**
- Aparecen porcentajes de éxito sin fuente.
- Testimonios mencionan diagnósticos ("depresión", "ansiedad", "TDAH") y mejoría.
- Imágenes "antes/después" o lenguaje de transformación medible.

**Phase to address:** Fase 3 (Social Proof / Bio) — establecer template de testimonio aprobado antes de publicar cualquiera.

---

### Pitfall 7: Trademark / marca "planetapsilo" sin búsqueda de antecedentes

**Severity:** MEDIUM

**What goes wrong:**
Se invierte en branding (logo, copy, presencia social) sobre un nombre que (a) ya está registrado por un tercero en clase relevante (44 servicios médicos/bienestar; 41 educación/cultural; 35 publicidad), o (b) es indistinguible de marca existente. Tercero exige cese de uso y/o demanda. Pérdida total del activo de marca + costo de re-branding.

**Why it happens:**
"planetapsilo" suena disponible (es un constructo); pero "psilo" + variantes ("psilocybin", "psyloplanet", "psilo planet") son cada vez más comunes en el espacio psicodélico global.

**How to avoid:**
- **Antes de inversión fuerte en branding**: búsqueda gratuita en SIPI (Sistema de Información de Propiedad Industrial) de la SIC — `vue.gov.co/tramites-y-consultas/consulta-de-nombre-de-marca` o `sipi.sic.gov.co`. Buscar nominativa "planetapsilo", "planeta psilo", "psilo", en clases 35, 41, 44.
- **Búsqueda complementaria**: dominio (.co, .com.co, .com, .net), Instagram, TikTok, LinkedIn handles. WIPO Global Brand Database para internacional.
- **Si está libre**: considerar registro defensivo (~COP 1M en clase 41 + 44, vigencia 10 años).
- **Si NO está libre**: pivotar a alternativa antes de invertir más.

**Warning signs:**
- Se imprime merchandise / se compra dominio premium / se hace inversión publicitaria sin haber corrido la búsqueda.

**Phase to address:** Fase 1 (Foundation) — búsqueda SIPI como tarea de 30 min, registrar resultado en `.planning/PROJECT.md` como Key Decision.

---

## High Pitfalls

### Pitfall 8: Visuales psicodélicos = killer de conversión por accesibilidad

**Severity:** HIGH

**What goes wrong:**
La directiva estética "de otro mundo" → fondos animados WebGL + parallax + gradientes neón + tipografía estilizada. Resultado: (a) ilegibilidad (contraste < 4.5:1 falla WCAG AA), (b) 1/3 de usuarios susceptibles a mareo/desorientación con parallax y autoplay, (c) LCP > 4s en móviles colombianos promedio (15 Mbps download según CRC 2025), (d) ICP C-Level lee desde el avión/Uber/laptop ejecutiva — abandona en 3s si no escanea valor.

**Why it happens:**
Se confunde "estética psicodélica" con "saturación visual constante". El referente (sabiduriapsicodelica.com) en realidad usa estética calmada con acentos psicodélicos puntuales — no es fondo animado todo el tiempo.

**How to avoid:**
- **Psicodelia como acento, no como base**: hero impactante (gradiente + 1 elemento animado sutil) → resto del scroll en superficies oscuras o cálidas pero **legibles**.
- **Contraste mínimo WCAG AA**: 4.5:1 texto normal, 3:1 texto grande. Verificar con axe DevTools o WAVE.
- **`@media (prefers-reduced-motion: reduce)`**: desactivar todas las animaciones decorativas. **Bloqueante** — no es opcional.
- **Sin autoplay video/WebGL sobre el fold** en móvil. Si hay efecto WebGL, condicionar a `desktop + reduced-motion: no-preference + (pointer:fine)`.
- **Parallax: solo en backgrounds desktop**, no en bloques de texto.
- **Tipografía**: máximo 1 fuente decorativa (en H1) + 1 sans-serif legible (cuerpo). Tamaño mínimo cuerpo 16px móvil, 18px deseable.
- **Performance target**: LCP < 2.5s, CLS < 0.1, TBT < 200ms en Moto G Power (4G). Verificar con Lighthouse mobile + PageSpeed Insights.

**Warning signs:**
- Lighthouse Performance < 80 mobile.
- Lighthouse Accessibility < 95.
- Test informal: leer copy del hero en móvil con luz solar — ¿se lee?
- 3 testers reportan que les marea el scroll.

**Phase to address:** Fase 2 (Visual System) — checklist de accesibilidad/perf como gate de cada page-PR.

---

### Pitfall 9: Posicionamiento "para CEOs" leído como elitista/gatekeeping

**Severity:** MEDIUM-HIGH

**What goes wrong:**
Copy tipo *"Solo para líderes que ya alcanzaron el éxito y buscan algo más"* / *"Espacios exclusivos para quienes pueden permitirse pausar"* — lee como gatekeeping, repele a parte del ICP (founders que aún no se sienten "C-Level" pero pagan), y a ojos externos (incluyendo Sofía misma como psicóloga) genera disonancia con valores de cuidado/no-jerarquía propios del campo.

**Why it happens:**
Se confunde posicionamiento de precio premium con copy de exclusividad social. Son cosas distintas.

**How to avoid:**
- **Lenguaje aspiracional sin gatekeeping**: hablar del *momento* del visitante (no de su cargo). *"Si has llegado al borde de lo que el rendimiento puede darte, hay otro tipo de exploración esperando."* ✓
- **Especificidad sobre quién es el espacio**: no por título de cargo, sino por situación ("estás reordenando", "buscas integración tras crecimiento", "tu negocio funciona pero tú no").
- **Tono íntimo > tono de membresía privada**. Espejo del referente: máximas filosóficas en primera persona, no slogans de cuota.
- **Test rápido**: leer el copy en voz alta. ¿Suena a "no eres suficiente"? Reescribir.

**Warning signs:**
- Aparecen palabras tipo "exclusivo", "élite", "selecto", "solo para".
- Pricing sugerido como filtro social ("la inversión refleja el compromiso").

**Phase to address:** Fase 2 (Copy/Hero) — review con la cliente con foco en tono.

---

### Pitfall 10: 3 CTAs de contacto sin jerarquía → leads se pierden

**Severity:** MEDIUM-HIGH

**What goes wrong:**
Decisión MVP es ofrecer Calendly + WhatsApp + formulario. Sin jerarquía + sin tracking, ocurre: (a) lead WhatsApp se pierde porque Sofía no ve mensaje, (b) lead formulario se va a inbox secundario y se contesta a los 3 días, (c) lead Calendly agenda y nadie le confirma, (d) imposible saber qué canal convierte.

**Why it happens:**
"Tres canales abiertos = más conversión" es intuición incorrecta. Más opciones sin priorización = parálisis del visitante (Hick's law) + entropía operativa.

**How to avoid:**
- **Jerarquía visual clara**: 1 CTA primario, 2 secundarios. Sugerencia (a validar):
  - **Primario**: agendar conversación (Calendly link, no embed inicial — ver Pitfall 14).
  - **Secundario**: WhatsApp con mensaje pre-cargado.
  - **Terciario / fallback**: formulario.
- **Operativa antes de publicar**:
  - WhatsApp: número configurado, Sofía/Juan responden en <24h, mensaje pre-cargado para contexto.
  - Formulario: notificación a email activo + responder automático con tiempos esperados.
  - Calendly: confirmación + recordatorio + integración con calendario real.
- **Tracking simple**: UTM o `?source=cta_hero` en cada CTA para distinguir orígenes sin analytics complejo.
- **Service Level**: definir explícitamente "respondemos en X horas hábiles" en cada canal y cumplirlo.

**Warning signs:**
- Lead reporta no haber recibido respuesta.
- No se puede responder "¿cuál canal trajo más conversaciones esta semana?".

**Phase to address:** Fase 2 (Contacto) — antes de cualquier deploy con tráfico real.

---

### Pitfall 11: Calendly abierto a la fría → quema agenda de Sofía, baja calidad de leads

**Severity:** MEDIUM-HIGH

**What goes wrong:**
Calendly público sin pre-screening permite que cualquiera agende — incluyendo curiosos, vendedores, journalists. Sofía/Juan invierten 30-60 min por sesión con visitantes que no son ICP. Para servicios high-ticket el embudo estándar es: aplicación → cualificación → conversación → propuesta. Calendly abierto rompe ese embudo.

**Why it happens:**
"Menos fricción = más conversión" es cierto para low-ticket (lead magnets), falso para high-ticket coaching/retiros donde el qualifier es el activo.

**How to avoke:**
- **MVP**: Calendly público con formulario integrado de Calendly (3-4 preguntas: "¿qué te trae?", "¿qué tipo de espacio buscas?", contexto profesional/personal). Reduce ruido sin frenar leads tempranos.
- **Fase 3 (post-validación de demanda)**: mover a aplicación primero (formulario o Typeform/Tally) → review manual → invitación a Calendly. Conversión esperada según industria: 20–50% de aplicaciones aceptadas → llamada.
- **Retiros nunca con Calendly directo** — siempre aplicación.
- **Coaching 1-on-1**: Calendly puede quedar abierto si el precio está publicado y filtra solo.

**Warning signs:**
- Sofía reporta sesiones con personas claramente fuera de ICP.
- Tasa show-up de Calendly < 70% (señal de baja intención).

**Phase to address:** Fase 2 (Contacto MVP) preguntas qualifier de Calendly; Fase 3 (Validación) decidir si pasar a aplicación gate.

---

### Pitfall 12: Marca sin cara visible sin sustitutos de confianza → "esto huele a estafa"

**Severity:** HIGH

**What goes wrong:**
La decisión legal (Sofía no es cara visible) deja al sitio sin el principal trust signal de servicios profesionales: "veo quién me va a atender, veo sus credenciales, veo otras personas que confiaron". Sin sustitutos, el ICP C-Level — que es escéptico por definición — descarta en 5s.

**Why it happens:**
Se asume que "marca de proyecto" + estética cuidada bastan. No bastan para high-ticket en salud/coaching.

**How to avoid:**
Sustitutos de cara visible:
1. **Bio narrativa de "la guía"** (sin nombre, sin título, con experiencia descrita en años + camino): *"Una década en círculos de exploración. Formación académica en ciencias del comportamiento por una universidad colombiana de primera línea. Maestra de yoga en formación. Pintora."* — entrega autoridad sin atribuir terapia psicodélica. `[REVIEW: ABOGADO]` línea exacta.
2. **Testimonios verificables** (Pitfall 6 — con consentimiento, inicial+ciudad).
3. **Borrowed authority**: logos de podcasts, eventos, comunidades donde haya participado (cuando exista).
4. **Manifiesto / filosofía propia**: una página `/manifiesto` o sección `/sobre` con la mirada que sustenta el espacio. Voz coherente = autoridad.
5. **Visual craft**: arte propio de Sofía (cuadros) integrado sutilmente — firma estética sin firma personal.
6. **Transparencia operativa**: explicar **proceso** ("así es un acompañamiento"), **qué incluye / qué no**, **qué pasa después**.
7. **Email + WhatsApp directos**: no contact-form-only — un humano accesible es trust signal fuerte.

**Warning signs:**
- Visitante pregunta "¿quién está detrás?" en primer mensaje.
- Bounce rate > 75% en home (no encuentran razón para confiar).

**Phase to address:** Fase 2 (Sobre planetapsilo) — bio narrativa + filosofía como bloqueante de Fase 3.

---

### Pitfall 13: GitHub Pages base path `/planetapsilo/` rompe assets, links, navegación

**Severity:** HIGH (técnico, bloqueante)

**What goes wrong:**
El sitio se sirve en `https://elsolarcg.github.io/planetapsilo/`. Cualquier ruta absoluta tipo `/css/main.css`, `/imagenes/hero.jpg`, `<a href="/retiros">` apunta a `elsolarcg.github.io/css/main.css` (404). Resultado: assets rotos, navegación rota, hojas sin estilo en producción mientras funciona perfecto en `localhost`.

**Why it happens:**
Es el bug #1 de deploys a project sites GH Pages. Frameworks como Next.js export, Astro, Vite requieren configuración explícita de `basePath` / `base`.

**How to avoid:**
- **Stack-específico**:
  - **Astro**: `astro.config.mjs` → `site: 'https://elsolarcg.github.io'`, `base: '/planetapsilo'`. Usar `<a href={import.meta.env.BASE_URL + 'retiros'}>` o helper `getRelativePath`.
  - **Next.js static export**: `next.config.js` → `basePath: '/planetapsilo'`, `assetPrefix: '/planetapsilo'`. Usar componente `<Link>` (maneja prefix) y `next/image` con `loader` apropiado.
  - **HTML puro**: usar `<base href="/planetapsilo/">` en `<head>` + rutas relativas tipo `href="retiros.html"` (no `/retiros.html`).
- **Verificación de deploy**: abrir DevTools Network al cargar el sitio en GH Pages; ningún recurso debe ser 404 ni cargarse desde root del dominio.
- **Custom domain** (futuro): si se compra dominio (e.g., `planetapsilo.co`) y se configura CNAME, el base path desaparece — diseñar el código para soportar ambos casos vía env var.

**Warning signs:**
- CSS no se aplica en GH Pages pero sí en local.
- Imágenes con icono "imagen rota" en producción.
- Click en navegación lleva a 404.
- Console: `Failed to load resource: 404`.

**Phase to address:** Fase 1 (Foundation + Stack Decision) — primera prueba después de scaffolding es deploy a GH Pages, no a local. Mantener "deploy after each phase" como ritual.

---

### Pitfall 14: Calendly inline embed móvil → scroll trap + CLS

**Severity:** MEDIUM-HIGH

**What goes wrong:**
Embed inline de Calendly en `/contacto` o footer crea iframe con scroll interno. En iOS Safari especialmente: dos scrolls (página + iframe) → usuario atrapado, no puede salir del widget sin gesto preciso. Adicionalmente, si no se reserva altura, el embed empuja layout = CLS alto = Core Web Vitals dañado.

**Why it happens:**
Documentación de Calendly muestra el inline embed como default — se copia/pega sin testear móvil.

**How to avoid:**
- **MVP**: usar **link directo a Calendly** (botón `<a href="https://calendly.com/...">`) en lugar de inline embed. Cero CLS, cero scroll trap, abre en nueva pestaña.
- **Si se prefiere embed por estética**: usar **popup widget** de Calendly (overlay completo, no inline) — `Calendly.initPopupWidget({...})`.
- **Si inline embed obligado**: (a) reservar altura fija con `min-height` en contenedor, (b) `data-resize="true"` en script de Calendly, (c) testear iOS Safari + Chrome Android + iPad, (d) `overflow-y: hidden` en `.calendly-inline-widget` si el doble-scroll persiste.
- **Verificar Core Web Vitals con embed cargado**: LCP, CLS, INP.

**Warning signs:**
- Test en iPhone real: el widget atrapa el scroll y no sales con swipe-up.
- CLS reporta > 0.1 en Lighthouse con embed presente.

**Phase to address:** Fase 2 (Contacto) — decisión: link vs popup vs inline en el diseño de la página.

---

### Pitfall 15: WhatsApp wa.me desktop → usuario aterriza en api.whatsapp.com sin contexto

**Severity:** MEDIUM

**What goes wrong:**
En desktop, `https://wa.me/57XXXXXXXXXX` no abre WhatsApp Web directo — primero muestra página intermedia "Continuar al chat" en api.whatsapp.com. Si el usuario no tiene WhatsApp Desktop instalado y no entiende qué pasa, abandona.

**Why it happens:**
Es comportamiento por diseño de WhatsApp. Sin mensaje pre-cargado y sin `target="_blank"` se siente como dead-end.

**How to avoid:**
- Formato del link: `https://wa.me/57XXXXXXXXXX?text=Hola%20planetapsilo%2C%20quiero%20saber%20m%C3%A1s%20sobre%20...`
- `target="_blank" rel="noopener noreferrer"` — siempre.
- Mostrar microcopy al lado del botón: *"Te abriremos WhatsApp (web o app)"*.
- Opcional: detectar desktop sin app instalada (no es posible 100% fiable) y mostrar fallback al formulario.
- **Mostrar el número visible** en el sitio (incluso si solo en formato copyable) — algunos usuarios prefieren copiar y abrir manual.

**Warning signs:**
- Tests en desktop: usuarios reportan no saber qué pasó al hacer click.
- Tasa de mensajes recibidos vía WhatsApp << clicks en el botón.

**Phase to address:** Fase 2 (Contacto) — micro-detalle del CTA.

---

## Medium Pitfalls

### Pitfall 16: Formulario sin protección anti-spam → inbox inservible

**Severity:** MEDIUM

**What goes wrong:**
Formulario público sin honeypot/captcha. Bots descubren el endpoint (cuestión de días) → 50+ submissions/día de spam → Sofía/Juan dejan de revisar → se pierden leads reales en el ruido.

**How to avoid:**
- **Mínimo**: honeypot field (input oculto, si tiene valor → descartar). Bloquea ~70% de spam barato.
- **Recomendado**: Cloudflare Turnstile (gratis, sin desafío visible al usuario) o ALTCHA (self-hosted, open-source).
- **Si se usa Formspree**: ya trae protección incluida en plan free + opción reCAPTCHA. Verificar activación.
- **No usar reCAPTCHA v2** (puzzles) — friction asesina conversión.
- **Rate limiting**: si el endpoint lo soporta, max 3 submissions/IP/hora.

**Phase to address:** Fase 2 (Contacto) antes de publicar formulario.

---

### Pitfall 17: Performance en redes móviles colombianas — assets pesados sin CDN

**Severity:** MEDIUM

**What goes wrong:**
GH Pages sirve assets desde Fastly CDN (decente), pero si el sitio mete: hero video 20MB, fotos sin comprimir, fuentes 5 weights × 2 familias = 1.5MB, fondo WebGL sin lazy load → en una red móvil colombiana promedio (descarga real efectiva ~15 Mbps, latencia 25-30ms, jitter alto en zonas rurales) → primera visita de 8-12s. Visitante abandona.

**How to avoid:**
- **Imágenes**: `WebP` o `AVIF` con fallback. Compresión agresiva. Hero ≤ 200KB. Galería ≤ 100KB por imagen.
- **Video**: nunca autoplay en móvil, nunca > 2MB de video on-page. Si se quiere movimiento, usar gradientes CSS / SVG animado / Lottie liviano.
- **Fuentes**: 1 sans-serif + 1 display, máximo 2 weights cada una. `font-display: swap`. Self-host (no Google Fonts CDN — bloqueado en algunos lugares, latencia variable).
- **Lazy load** imágenes below-the-fold (`loading="lazy"`).
- **Bundle JS**: < 100KB gzip inicial. Si se usa Astro: islands-only.
- **Lighthouse mobile budget**: Performance ≥ 85, LCP ≤ 2.5s, TBT ≤ 200ms.

**Phase to address:** Fase 2 (Visual / Assets) — verificación en cada fase con `npm run lighthouse:mobile`.

---

### Pitfall 18: Pricing — publicar vs "consultar"

**Severity:** MEDIUM

**What goes wrong:**
- **Publicar precio bajo**: filtra al ICP correcto (que descalifica "barato" en este vertical).
- **Publicar precio alto**: bounce sin contexto si no hay justificación de valor.
- **"Consultar" sin filtro**: agenda llena de personas pidiendo precio y desapareciendo.

**How to avoid:**
- **Acompañamientos 1-on-1**: publicar **rango** ("desde $X COP / sesión") con descripción clara de qué incluye. Reduce 80% de "¿cuánto cuesta?" sin filtrar el ICP correcto.
- **Retiros**: NO publicar precio en MVP. Aplicación → conversación → propuesta. Precio se entrega después de cualificar (high-ticket estándar).
- **Arte**: publicar precio por obra (es commerce, no servicio). Si no hay precio: "consultar" con foto + dimensiones.
- **Pricing psicológico**: usar anchors (sesión única vs paquete vs retiro) — paquete intermedio convierte mejor.

**Phase to address:** Fase 3 (Pricing strategy) — decisión por servicio.

---

### Pitfall 19: Cliente = pareja del developer → no hay gate de aprobación claro

**Severity:** MEDIUM (proceso, específico a este proyecto)

**What goes wrong:**
Sofía y Juan son pareja. Los feedbacks llegan por canales informales (cena, WhatsApp casual, "mira esto"), las decisiones se mezclan con conversación personal, no hay momento explícito de "fase aprobada → siguiente". Resultado: revisión perpetua, scope creep, MVP que nunca lanza porque "mejor agreguemos esto antes".

**How to avoid:**
- **Ritual de aprobación explícito por fase**: al cerrar fase, sentar 30 min, mostrar deploy en vivo, lista de checks, decisión binaria: "aprobado para Fase X+1 / requiere ajuste".
- **Decision log** en `.planning/PROJECT.md` (Key Decisions) — toda decisión va con timestamp y "validado por: Sofía/Juan".
- **MVP timebox**: hoy se lanza algo. Imperfecto. Iteramos sobre live, no sobre staging.
- **"Out of Scope" list activa**: cada vez que surge feature nueva, default es "Fase futura" + justificación.
- **Cliente revisa producto, no proceso**: Sofía valida copy, estética, posicionamiento. Juan decide tech, stack, deploy. Roles claros.

**Phase to address:** Continuo — gestión de proyecto, no técnico.

---

### Pitfall 20: Reorientar repo `Elsolarcg/planetapsilo` perdiendo continuidad GH Pages

**Severity:** LOW-MEDIUM

**What goes wrong:**
Force-push limpio sobre repo existente sin verificar settings de GH Pages → branch deploy roto, custom domain perdido (si lo hubiera), DNS sin propagar, URL pública cae.

**How to avoid:**
- **Antes de force-push**: documentar settings actuales de Pages (Branch, Folder, Custom Domain, HTTPS enforced) en `.planning/PROJECT.md`.
- **Backup branch**: crear `branch backup-v1` con el commit existente antes de force-push a `main`, por si hace falta volver atrás.
- **Después de force-push**: ir a Settings > Pages, reconfigurar si necesario (Branch: `main` / Folder: `/` o `/docs` según build). Verificar URL pública carga.
- **Mantener `Elsolarcg/planetapsilo`** confirmado en PROJECT.md — no mover en MVP.
- **Migración a org/personal futuro**: registrar como deuda de Fase 4+ con plan explícito (transfer ownership en GitHub no rompe URL si se mantiene mismo nombre).

**Phase to address:** Fase 1 (Foundation + Deploy) — verificación pre-push.

---

### Pitfall 21: Build-time vs runtime — secretos / IDs personales en bundle

**Severity:** MEDIUM (seguridad)

**What goes wrong:**
En un sitio estático todo lo que está en el bundle es público. Si se hardcodea: Calendly user-specific webhook tokens, email Sofía en plano (raspado por bots), formspree endpoint sin protección, API key analítica con permisos de escritura → exposición de credenciales / data leak.

**How to avoid:**
- **Calendly**: solo URL pública del schedule (`https://calendly.com/sofiapsy/30min`), nunca tokens de API/webhooks.
- **Email**: no en plano en HTML — usar formulario o JS para revelar tras click, o imagen, o `[at]` (poco amigable). Mejor: formulario único + WhatsApp.
- **Formspree**: endpoint OK público pero limitar al dominio en config (referer whitelist).
- **Analytics**: GA4 measurement ID es público OK, pero NO Property API keys.
- **Secrets de build** (si los hubiera): variables de entorno en GitHub Actions secrets, NUNCA en repo.
- **Scan pre-deploy**: `git-secrets` o `trufflehog` corre como hook si se quiere robusto.

**Phase to address:** Fase 1 (Foundation) — definir qué es público vs privado desde el inicio.

---

### Pitfall 22: SEO + indexación inicial sin querer

**Severity:** LOW-MEDIUM `[REVIEW: ABOGADO]`

**What goes wrong:**
Mientras el sitio no tiene legales finales, Google indexa páginas con copy en flux. Captura snippet con frase comprometedora, queda en cache + en Wayback Machine permanentemente. Riesgo legal + reputacional difícil de borrar.

**How to avoid:**
- **MVP**: `<meta name="robots" content="noindex, nofollow">` global hasta que copy y legales estén firmados.
- **`robots.txt`** con `Disallow: /` durante MVP de copy.
- **Una vez aprobado**: remover noindex, agregar sitemap, abrir indexación.
- **Wayback Machine opt-out** (parcial) si se quiere extra: `<meta name="robots" content="noarchive">`.

**Phase to address:** Fase 1 (deploy) — noindex por default. Fase 3 (post-aprobación legal) — abrir indexación.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| HTML+CSS puros sin framework | Deploy hoy en 2 horas | Difícil añadir páginas/secciones consistentes; refactor doloroso al pasar a 8+ páginas | Solo si MVP es 1-3 páginas máximo Y se sabe que se reescribirá en Fase 2 |
| Inline styles + clases ad-hoc sin design tokens | Velocidad inicial | Inconsistencia visual, imposible escalar tema psicodélico coherente | Nunca para >3 páginas |
| Formulario sin política de privacidad real | Lanzar hoy | Sanción SIC si tráfico real / multas Habeas Data | Solo si tráfico es 0 y se publica política en <7 días |
| Calendly con cuenta personal de Sofía | Funciona ya | Mezcla agenda personal con leads del proyecto; difícil separar después | Solo si se crea sub-calendario dedicado o se planea cuenta dedicada en Fase 2 |
| WhatsApp del celular personal | Funciona ya | Mezcla personal/proyecto; sin horario; sin templates; sin métricas | Aceptable en MVP — escalar a WhatsApp Business en Fase 3 |
| Sin analytics / sin tracking | Privacidad por default; cero config | Decisiones sin datos; no se sabe qué CTA convierte | Aceptable solo 30-60 días, después instalar (Plausible o Umami, no GA4) |
| Force-push sin backup branch | Limpia rápida | Recuperación dolorosa si algo sale mal | Solo si se hizo `git branch backup-v1` antes |
| Bilingüe pospuesto | Foco en español-Colombia | Pierdes nómadas digitales internacionales | Sí — alineado con PROJECT.md, Fase 4+ |
| Pasarela de pago pospuesta para arte | Validar interés primero | Fricción para venta real cuando llegue | Sí, alineado con PROJECT.md |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| **Calendly** | Inline embed sin reservar altura → CLS spike | Link directo o popup widget en MVP; reservar `min-height` si inline |
| **Calendly** | Sin preguntas qualifier → leads de mala calidad | Activar 2-3 preguntas en el evento desde día 1 |
| **WhatsApp wa.me** | Sin pre-filled text → conversación arranca sin contexto | `?text=URL-encoded message` siempre |
| **WhatsApp wa.me** | Sin `target="_blank"` → usuario sale del sitio | Siempre `target="_blank" rel="noopener"` |
| **Formspree** | Endpoint público sin referer whitelist → spam masivo | Configurar dominio whitelist en dashboard Formspree |
| **Google Fonts** | Cargar 4 familias + 6 weights | Self-host 1-2 fuentes; `font-display: swap` |
| **GH Pages** | Custom 404 olvidado → links rotos en 404 default GitHub | `404.html` propio en root |
| **GH Pages** | Cache de Pages tras push → ves versión vieja | Hard refresh (Cmd+Shift+R) + esperar 2-5 min |
| **Analytics (futuro)** | GA4 sin banner de cookies → riesgo GDPR | Plausible/Umami (cookieless) o consent banner |
| **OG / social share** | Sin meta og:image → preview roto en WhatsApp/Twitter | Imagen 1200×630 PNG/JPG, og:title, og:description por página |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Hero WebGL / canvas pesado | LCP > 4s mobile, batería al rojo en iPhone | Static gradient + 1 elemento Lottie/SVG; condicional desktop | Cualquier visita móvil en 4G |
| Imagen hero sin optimizar | LCP malo, peso > 1MB | WebP/AVIF, < 200KB, `loading="eager"` para hero, dimensiones explícitas | Visita móvil con red regular Colombia |
| Auto-play video background | Mareo + batería + datos + iOS bug | Static poster + opt-in con click | Inmediato |
| Calendly embed sin reservar espacio | CLS > 0.1 | `min-height: 700px` en contenedor; o link en vez de embed | Cada carga |
| Fuentes Google sin self-host | FOUT/FOIT visible; LCP afectado | Self-host + preload + `font-display: swap` | LCP en 3G/4G débil |
| Sin compresión Brotli/gzip | Bundle 3x más pesado de lo necesario | GH Pages ya sirve gzip; verificar headers | Siempre |
| Inline SVG enorme en cada página | DOM bloat | Sprite SVG o asset externo + `<use>` | Cuando hay 4+ páginas |
| Animaciones que pintan en hot path (top/left) | Janky scroll, low FPS | Solo `transform` + `opacity`; `will-change` puntual | Mobile mid-range |

Scale thresholds para este proyecto (no es escala SaaS): el sitio "se rompe" perceptualmente con 200-500 visitas/día en móvil colombiano si performance no se cuida. No hay riesgo de "escala server" — GH Pages aguanta lo que sea.

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Email Sofía en plano en HTML | Scraping → spam masivo + posible phishing | Formulario único o WhatsApp; si email visible, `[at]` o JS reveal |
| WhatsApp personal en sitio público | Spam, contactos no deseados, mezcla personal | Número dedicado proyecto o WhatsApp Business + horarios |
| Formulario sin honeypot/captcha | Spam, posible inundación maliciosa | Honeypot + Turnstile (Pitfall 16) |
| Política privacidad faltante | Sanción Habeas Data (Pitfall 4) | Página `/privacidad` activa antes de captura real |
| Foto Sofía + nombre completo + título psicología en sitio | Riesgo profesional (Pitfall 1) | Bio narrativa anónima o pseudónima en MVP |
| Capturar datos sensibles ("¿depresión?", "¿medicación?") en form público | Refuerzo de Habeas Data + ética profesional | Solo offline, en consentimiento informado privado |
| Subdomain takeover si DNS apunta a custom domain abandonado | Phishing en nombre de la marca | Si custom domain en futuro: monitor + DNSSEC |
| Repo público con `.env` accidentalmente commiteado | Tokens en historia git | `.gitignore` desde commit 1; `git-secrets` pre-commit |
| Source maps en producción exponiendo estructura | Info leak menor | Build con `sourceMap: false` para production |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Hero sin propuesta de valor leíble en 30s | Bounce inmediato | H1 claro de qué es planetapsilo + para quién + 1 frase. Estética acompaña, no obstruye |
| 3 CTAs equipotentes en hero | Parálisis | 1 CTA primario + 1 secundario menor |
| Tono místico sin claridad operativa | "Suena bonito pero no entiendo qué pasa si agendo" | Sección "Cómo es un acompañamiento" con pasos concretos |
| Auto-scroll / hijacking de scroll | Frustración, abandono | NUNCA hacer scroll-jacking. Scroll nativo siempre |
| Modal automático "subscríbete" en 5s | Cierra el navegador entero | Sin modal automático en MVP. Si lo hubiera: post-scroll 70% o exit intent |
| Música ambient autoplay | Pánico (cerrar la pestaña en oficina) | Nunca autoplay audio |
| Cursor custom psicodélico | Cool en demo, hostil en daily use | Solo en desktop, sutil, no oculta el cursor real |
| Menú hamburguesa sin label en móvil | Algunos no lo reconocen | "Menú" + icono |
| Footer sin info de contacto | "¿Cómo les escribo?" | Email/WhatsApp + links sociales + privacidad |
| Idioma mezclado (frases EN sueltas en sitio ES) | Lee como amateur | 100% español Colombia en MVP |

---

## "Looks Done But Isn't" Checklist

Para verificar al cerrar cada fase antes de declarar deploy.

- [ ] **Copy:** ninguna ocurrencia de "terapia", "tratamiento", "psilocibina", "hongos", "cura", "garantizado" sin disclaimer aprobado.
- [ ] **Copy:** disclaimer global presente en footer + página servicios.
- [ ] **Privacidad:** `/privacidad` existe (aunque sea v0); link visible desde footer y form.
- [ ] **Privacidad:** formulario tiene checkbox de autorización Habeas Data.
- [ ] **Performance mobile:** Lighthouse Mobile ≥ 80 perf, ≥ 95 accessibility, ≥ 90 SEO.
- [ ] **Contraste:** todo texto pasa WCAG AA 4.5:1 (verificar con axe).
- [ ] **Reduced motion:** `prefers-reduced-motion: reduce` desactiva animaciones decorativas.
- [ ] **Base path:** assets cargan desde `/planetapsilo/...`, no desde root. DevTools Network limpio.
- [ ] **404:** custom `404.html` con link de vuelta a home.
- [ ] **OG meta:** og:title, og:description, og:image por página. Test en `https://www.opengraph.xyz/`.
- [ ] **Calendly:** link funciona, mensaje de confirmación llega a email real, qualifier preguntas activas.
- [ ] **WhatsApp:** `wa.me` con número real + texto pre-cargado + `target="_blank"`.
- [ ] **Formulario:** submit llega a inbox monitoreado; honeypot activo; auto-responder configurado.
- [ ] **Mobile real:** probar iPhone real + Android real (no solo DevTools).
- [ ] **Cross-browser:** Chrome desktop + Safari desktop + Firefox + iOS Safari + Chrome Android.
- [ ] **noindex** durante MVP de copy; remover solo cuando aprobado por cliente + abogado.
- [ ] **Trademark check** SIPI corrido, resultado registrado en Key Decisions.
- [ ] **Backup**: branch `backup-v1` creado antes de force-push.
- [ ] **GH Pages settings**: branch + folder + HTTPS verificados post-push.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Copy comprometedor indexado por Google | MEDIUM-HIGH | (1) Reescribir copy. (2) Reindexar via Search Console. (3) Si está en cache: solicitar remoción URL en Search Console. (4) Wayback Machine: pedir remoción vía email (no garantizado). |
| Calendly llenándose de spam | LOW | Activar 2-3 qualifier preguntas + cancelar / no asistir explícitamente. Si severo: rotar URL Calendly. |
| Force-push borró v1 sin querer | LOW-MEDIUM si hay backup branch; HIGH si no | `git reflog` para rescatar SHA. Si reflog GC: pedir restore a GitHub support (no garantizado). |
| GH Pages URL cae post-deploy | LOW | Settings > Pages, reconfigurar branch. Hard refresh + 5 min de propagación. |
| Lead se pierde en WhatsApp/form/Calendly | MEDIUM (relacional) | Sistema de respuesta < 24h SLA; auditar todos los canales semanalmente. |
| Reclamo SIC Habeas Data | HIGH | Inmediato: publicar política, contestar requerimiento en plazo, contratar abogado. Costo legal +sanción potencial. |
| Reclamo COLPSIC sobre copy | CRITICAL | Inmediato: bajar el copy comprometedor del sitio. Contratar abogado deontológico. Responder al tribunal. |
| Marca colisionando con tercero registrado | HIGH | Re-branding completo. Asume 2-4 semanas + costo de assets ya producidos. |

---

## Pitfall-to-Phase Mapping

Asumiendo roadmap coarse de 3-5 fases (alineado a PROJECT.md).

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| #1 Atribuir terapia psicodélica | Fase 1 (Copy guidelines) | Linter de copy (lista palabras prohibidas) corre antes de deploy de cada fase |
| #2 Promo retiros con sustancia | Fase 1 + Fase 2 (`/retiros`) | Pase legal manual sobre `/retiros` antes de publicar |
| #3 Leetspeak | Fase 1 (Copy guidelines) | Search del repo: ningún `[0-9]` reemplazando letras |
| #4 Habeas Data formulario | Fase 2 (`/contacto` + `/privacidad`) | `/privacidad` existe y form linkea + checkbox presente |
| #5 GDPR EU | Fase 4+ (bilingüe / pauta) | Gate explícito antes de abrir EN |
| #6 Testimonios engañosos | Fase 3 (Social proof) | Template de testimonio firmado + disclaimer presente |
| #7 Trademark | Fase 1 (Foundation) | Búsqueda SIPI documentada en Key Decisions |
| #8 Visuales killer conversión | Fase 2 (Visual system) | Lighthouse mobile + axe a11y + 3 testers humanos |
| #9 Posicionamiento elitista | Fase 2 (Copy hero) | Review cliente + lectura en voz alta |
| #10 3 CTAs sin jerarquía | Fase 2 (Contacto) | Definir CTA primario + SLA por canal |
| #11 Calendly abierto | Fase 2 / Fase 3 | Qualifier preguntas activas; retiros sin Calendly |
| #12 Sin cara visible sin sustitutos | Fase 2 (`/sobre` + manifiesto) | Bio narrativa + testimonios + manifiesto presentes |
| #13 Base path GH Pages | Fase 1 (Foundation) | Primer deploy a GH Pages como gate de Fase 1 |
| #14 Calendly inline móvil | Fase 2 (Contacto) | Test iPhone real |
| #15 wa.me desktop | Fase 2 (Contacto) | Microcopy + test desktop sin app instalada |
| #16 Form sin anti-spam | Fase 2 (Contacto) | Honeypot + Turnstile activos |
| #17 Performance móvil Colombia | Fase 2 (Assets) | Lighthouse mobile ≥ 80 perf |
| #18 Pricing | Fase 3 (Pricing strategy) | Decisión documentada por servicio |
| #19 Sin gate de aprobación | Continuo | Ritual `gsd-transition` al cerrar cada fase |
| #20 Force-push sin backup | Fase 1 (Deploy) | Branch `backup-v1` antes de push |
| #21 Secretos en bundle | Fase 1 (Foundation) | `.gitignore` desde commit 1; review pre-deploy |
| #22 Indexación prematura | Fase 1 (Deploy) → Fase 3 | `noindex` por default; remover solo post-aprobación legal |

---

## Sources

### Colombia — Marco regulatorio
- [Ley 1090 de 2006 — Código Deontológico y Bioético del Psicólogo (Secretaría del Senado)](http://www.secretariasenado.gov.co/senado/basedoc/ley_1090_2006.html)
- [Ley 1090 de 2006 — Versión COLPSIC con anotaciones jurisprudencia](https://www.colpsic.org.co/wp-content/uploads/2021/03/Ley-1090-de-2006-anotaciones-jurisprudencia.pdf)
- [COLPSIC — Manual Deontológico y Bioético de Psicología (Acuerdo 17 de 2019)](https://www.colpsic.org.co/wp-content/uploads/2021/07/Acuerdo-N%C2%B0-17-de-mayo-del-2019.pdf)
- [COLPSIC — Doctrina 3: Consentimiento Informado (dic 2018)](https://www.colpsic.org.co/wp-content/uploads/2020/12/Doctrina-No.-3-CONSENTIMIENTO-INFORMADO-dic-5-2018.pdf)
- [COLPSIC — Preguntas Frecuentes Tribunales](https://www.colpsic.org.co/tribunales/preguntas-frecuentes/)
- [Ley 1581 de 2012 — Habeas Data (Función Pública)](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981)
- [Ley 1581 de 2012 — Texto completo (Secretaría Senado)](http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html)
- [SIC — Información Engañosa](https://sic.gov.co/informacion-enganosa)
- [Ley 1480 de 2011 — Estatuto del Consumidor (Función Pública)](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306)
- [DLA Piper — Colombia Data Protection Laws](https://www.dlapiperdataprotection.com/index.html?t=law&c=CO)
- [SIPI — Consulta de marcas registradas Colombia (VUE)](https://www.vue.gov.co/tramites-y-consultas/consulta-de-nombre-de-marca)

### Psilocibina / Psicodélicos Colombia
- [Hongos psicodélicos en Colombia — UNAL Agencia de Noticias](https://agenciadenoticias.unal.edu.co/detalle/colombia-debe-tomar-en-serio-a-los-hongos-medicinales-faltan-regulaciones-claras)
- [Eafit — Viabilidad jurídica de la psilocibina en Colombia](https://repository.eafit.edu.co/bitstreams/8b585550-6e7f-4ec5-a324-e664f09419fe/download)
- [Talking Drugs — El viaje de la regulación psicodélica en Colombia](https://www.talkingdrugs.org/from-demons-to-medicine-tracing-the-journey-of-colombias-psychedelic-regulation/)
- [Radio Nacional — Terapias psicodélicas en Colombia](https://www.radionacional.co/actualidad/salud/terapias-psicodelicas-en-colombia-enfoque-innovador-para-tratar-la-salud-mental)
- [Setas de Siecha — Guía jurídica hongos Colombia 2025](https://www.setasdesiecha.com/son-legales-los-hongos-alucinogenos-en-colombia-marco-normativo-y-contexto-actual-2025/)

### Retiros / consentimiento informado psicodélico
- [Harris Sliwoski — Psychedelic Retreat Organizer Legal Issues](https://harris-sliwoski.com/psychlawblog/psychedelic-retreats-organizer-legal-issues/)
- [Harris Sliwoski — Conducting Psychedelic Retreats Abroad](https://harris-sliwoski.com/psychlawblog/conducting-psychedelic-retreats-abroad-protecting-yourself-and-participants/)
- [Oregon — Informed Consent to Receive Psilocybin Services (template)](https://www.oregon.gov/oha/PH/PREVENTIONWELLNESS/Documents/Psilocybin%20Informed%20Consent%20Form%209-6-2021.pdf)
- [PMC — Informed Consent to Psychedelic-Assisted Psychotherapy: Ethical Considerations](https://pmc.ncbi.nlm.nih.gov/articles/PMC11032091/)

### GDPR / Habeas Data internacional
- [Pandectes — How GDPR Applies to Non-EU Businesses](https://pandectes.io/blog/how-gdpr-applies-to-non-eu-businesses/)
- [Cookie-Script — GDPR-Inspired Consent Models LATAM](https://cookie-script.com/privacy-laws/latin-american-alignment)
- [GDPR.eu — Does GDPR Apply Outside EU](https://gdpr.eu/companies-outside-of-europe/)

### Accesibilidad / motion sickness / performance
- [W3C WCAG 2.2 — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [A List Apart — Designing Safer Web Animation for Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)
- [Smashing Magazine — Designing With Reduced Motion](https://www.smashingmagazine.com/2020/09/design-reduced-motion-sensitivities/)
- [WebKit — Responsive Design for Motion](https://webkit.org/blog/7551/responsive-design-for-motion/)
- [Equal Entry — Why Motion on Websites Is a Problem](https://equalentry.com/why-motion-on-websites-and-digital-content-is-a-problem/)

### Conectividad Colombia
- [CRC — Calidad Internet Móvil Colombia jun 2025](https://www.crcom.gov.co/es/noticias/comunicado-prensa/calidad-internet-movil-en-colombia-lo-muestran-las-mediciones-junio-2025)
- [Postdata — Data Flash 2025 mediciones móvil](https://www.postdata.gov.co/dataflash/data-flash-2025-013-mediciones-de-calidad-desde-experiencia-del-usuario-servicio-movil)

### Integraciones (Calendly, WhatsApp, GH Pages, forms)
- [Calendly — Troubleshooting embeds](https://help.calendly.com/hc/en-us/articles/30969795467927-Troubleshooting-Calendly-embeds)
- [Branding Bytes — Remove Double Scrolling on Mobile in Calendly Widgets](https://brandingbytes.com/calendly-widget-responsive-design/)
- [WhatsApp — Click to Chat oficial](https://faq.whatsapp.com/5913398998672934)
- [GitHub Pages base path fix](https://devactivity.com/posts/apps-tools/mastering-github-pages-configure-base-paths-for-seamless-project-deployments/)
- [Pluralsight — Fixing Broken Relative Links on GitHub Pages](https://www.pluralsight.com/guides/fixing-broken-relative-links-on-github-pages)
- [Netlify Forms — Spam filters docs](https://docs.netlify.com/manage/forms/spam-filters/)
- [FormGrid — HTML Contact Form 2025 Guide](https://formgrid.dev/blog/how-to-handle-html-form-submissions-without-a-backend-2025-guide)

### Plataforma publicitaria (Meta/Google) sustancias controladas
- [Lexology — Legal Considerations Advertising Psychedelic Services](https://www.lexology.com/library/detail.aspx?g=bddf02a2-dcf7-4a95-8aff-287309db0fe1)
- [Meta Business — Drugs and Pharmaceuticals Policy](https://www.facebook.com/business/help/432240224665596)

### Trust signals coaching anónimo
- [Code Conspirators — 7 Trust Signals Missing From Professional Service Websites](https://www.codeconspirators.com/the-7-trust-signals-missing-from-most-professional-service-websites-with-examples/)
- [ContactOut — Psychology Behind High-Converting Coaching Websites](https://blog.contactout.com/2025/09/the-psychology-behind-high-converting-coaching-websites/)

---

## Open Questions / Flags para Abogado

Lista para validar con abogado colombiano antes de publicar versión "definitiva":

1. **Línea exacta de la bio de Sofía** que mencione formación Andes sin atribuir terapia psicodélica. ¿La frase propuesta en Pitfall 12 pasa filtro deontológico?
2. **¿Pueden ofrecerse "acompañamientos psicológicos" cobrados online si Sofía aún no tiene tarjeta profesional al momento de lanzar?** (Está próxima a graduarse — ¿qué se puede ofrecer pre-tarjeta vs post-tarjeta?)
3. **¿La marca "planetapsilo" tiene relación semántica con sustancia controlada lo suficientemente directa como para riesgo regulatorio en sí misma?** ¿Conviene registrarla o no?
4. **Texto exacto del aviso Habeas Data + política de tratamiento** — pedir plantilla certificada en lugar de redactar inhouse.
5. **¿Es necesario registro de base de datos ante SIC?** (Aplica si maneja >100K titulares — probablemente no en MVP, pero confirmar.)
6. **Disclaimer global del sitio** — ¿es legalmente suficiente para deslindar de práctica clínica? Redacción específica.
7. **Documentos legales del retiro** (waiver, informed consent, screening médico) — requieren versión colombiana, no traducción del Oregon template.
8. **GDPR**: si en 6 meses se abre versión EN, ¿qué representante en UE se requiere?

---

*Pitfalls research para: planetapsilo — psychedelic-aesthetic site Colombia, licensed psychologist behind the brand*
*Researched: 2026-05-21*
