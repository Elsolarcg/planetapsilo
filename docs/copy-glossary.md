# Copy Glossary — planetapsilo

**Purpose:** Define the lexicon that any page of planetapsilo may use without exposing Sofía to deontological risk under **Ley 1090 de 2006** (Tribunal Deontológico COLPSIC — ejercicio de la psicología) or criminal exposure under **Ley 1453 de 2011** (modifica Código Penal en narcotráfico) or consumer-protection sanctions under **Ley 1480 de 2011** (SIC publicidad engañosa). Also protects against incumplimiento de **Ley 1581 de 2012** (Habeas Data) cuando se conecta con captura de datos.

This file is the source of truth consumed by:

- **Phase 2 copy authors** (manual review of every hero / page / CTA)
- **Phase 2 copy-linter** (grep against the PROHIBIDO table — pre-deploy gate)
- **Phase 3 legal review by abogado** (PERMITIDO list will receive `[REVIEW: ABOGADO]` annotations before noindex removal)

---

## PERMITIDO (use freely)

| Term | Notes |
|------|-------|
| acompañamiento | actividad NO clínica — núcleo de la propuesta |
| espacio de exploración | abstracto, no atribuye tratamiento |
| encuentros | reemplazo para "sesiones" en contextos sensibles |
| sesiones de conversación | OK siempre que se mantenga el registro no-clínico |
| integración de experiencias | sin nombrar sustancia |
| bienestar, claridad, expansión de consciencia | OK, registro filosófico |
| guía, anfitriona, creadora del espacio | rol de Sofía cuando aparece — NUNCA "psicóloga prestando este servicio" |
| preparación / inmersión / integración | estructura tres-fases de retiros (sin sustancia) |
| círculo de palabra, alimentación consciente, meditación, naturaleza | descripciones de formato de retiro |
| la planta, la medicina ancestral | SOLO en bio narrativa, NUNCA como producto/servicio ofertado |
| confidencialidad, suitability, aplicación | términos de proceso, no de tratamiento |

## PROHIBIDO (banned — copy MUST NOT use)

| Term | Why it's banned |
|------|-----------------|
| terapia | Ley 1090 — atribuye ejercicio clínico de psicología |
| tratamiento | implica intervención médica |
| cura, curación | promesa de resultado clínico (Ley 1090 art. 52) |
| paciente | reservado a relación médica/psicológica formal |
| diagnóstico | reservado a evaluación clínica |
| psilocibina | sustancia controlada (Convenio 1971 Lista I) |
| hongos (mágicos, sagrados) | mismo riesgo penal Ley 1453 |
| ayahuasca, DMT, MDMA, ketamina | sustancias — riesgo penal |
| medicina (cuando Sofía aparece como prestadora) | confluye con atribución psicodélica |
| garantizado, comprobado, % de éxito | publicidad engañosa SIC + Ley 1090 art. 52 |
| antes/después | testimonios prohibidos (Pitfall #6) |
| leetspeak (m3dicin4, ps1l, etc.) | no da cobertura legal Colombia, daña SEO/UX (Pitfall #3) |
| depresión, ansiedad, TDAH, burnout (como condición tratada) | atribución clínica — usar describir contexto, no condición |
| exclusivo, élite, selecto, solo para | gatekeeping anti-conversión (Pitfall #9) |

## Reglas de uso

1. **Sofía nunca aparece como prestadora del servicio.** La marca es "planetapsilo"; Sofía es "guía", "anfitriona", "creadora del espacio".
2. **Sin leetspeak** en ninguna página, post social, ni meta description. La codificación numérica no aporta cobertura legal y degrada la marca.
3. **`/retiros` describe formato, no sustancia.** Días, ubicación, comidas, círculos, naturaleza, integración. La sustancia (si existe) se trata off-site post-screening en consentimiento informado privado.
4. **Bio "Sobre la guía" (Phase 3) requiere disclaimer separador** cuando se menciona credencial Andes: *"Su formación como psicóloga informa su mirada, pero los espacios ofrecidos en planetapsilo no constituyen ejercicio clínico de la psicología ni prestación de servicios de salud."*
5. **Testimonios usan inicial + ciudad** ("M., Bogotá") nunca nombre completo + cargo + foto sin consentimiento escrito archivado.
6. **Disclaimer global obligatorio en footer + páginas de servicio** (texto exacto definido por abogado Phase 3):
   *"planetapsilo ofrece espacios de exploración personal y acompañamiento no clínico. No constituye terapia, tratamiento médico ni psicológico. Para necesidades de salud mental, consulte profesional habilitado."*
7. **Retiros nunca con Calendly directo** — siempre aplicación con screening previo.
8. **Idioma:** 100% español Colombia en MVP. Bilingüe (Phase 5d) requiere abogado en inglés + GDPR posture.

## Verification (Phase 2 pre-deploy linter)

Phase 2 ships with a grep-based linter that fails CI if any PROHIBIDO term appears in built HTML. Reference command:

```bash
# Run from project root post-build
FORBIDDEN='terapia|tratamiento|paciente|psilocibina|hongos|ayahuasca|cura|garantizado|antes/después'
! grep -rEi "$FORBIDDEN" dist/ 2>/dev/null
```

Exit 0 = clean. Exit 1 = violation found → block deploy.

## Sources

- Ley 1090 de 2006 (COLPSIC deontológico): http://www.secretariasenado.gov.co/senado/basedoc/ley_1090_2006.html
- Ley 1581 de 2012 (Habeas Data): http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html
- Ley 1453 de 2011 (Código Penal narcotráfico)
- Ley 1480 de 2011 (Estatuto Consumidor)
- SIC publicidad engañosa: https://sic.gov.co/informacion-enganosa
- PITFALLS.md (Pitfalls #1, #2, #3, #6, #9)
- SUMMARY.md (Critical Pitfalls + Decision #5)

---
*Authored: 2026-05-21 as part of Phase 1 Plan 03 — FOUND-15. Will receive `[REVIEW: ABOGADO]` annotations and abogado sign-off in Phase 3 (LEGAL-01).*
