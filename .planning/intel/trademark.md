# Trademark Check — planetapsilo (SIPI / SIC Colombia)

**Date of search:** 2026-05-21
**Searcher:** Claude (automated attempt) + manual user follow-up pending
**Mark searched:** `planetapsilo` (denominativa, lowercase, single word)
**Phonetic variants considered:** `planeta psilo`, `planet apsilo`, `psilo planet`, `psiloplanet`, `planetapsy`, leetspeak variants (`pl4netapsilo`, `ps1l0planet`)

## Classes Searched

| Class | Description (Nice classification) | Relevance to planetapsilo |
|-------|-----------------------------------|---------------------------|
| **35** | Servicios de publicidad, gestión de negocios, consultoría empresarial | Marca + servicios comerciales online del sitio web, acompañamientos a C-Level / founders |
| **41** | Educación, formación, actividades culturales, esparcimiento | Retiros guiados, podcast futuro, blog, contenido formativo de planetapsilo |
| **44** | Servicios médicos, bienestar, higiene y belleza | Acompañamiento — **zona gris** frente a Ley 1090 (deliberadamente posicionado como "no clínico"); registrarse aquí en defensiva tiene valor |

## Search Method

- **Source 1 (intended primary):** SIPI public consultation portal — `https://sipi.sic.gov.co/sipi/Extranet/Principal.aspx`
  - **Status:** `unreachable from this execution environment` — portal is ASP.NET / ViewState-driven, requires JavaScript-enabled browser session; not scriptable without headless browser automation in the time budget
- **Source 2 (intended primary):** VUE consulta de nombre de marca — `https://www.vue.gov.co/tramites-y-consultas/consulta-de-nombre-de-marca`
  - **Status:** `not attempted programmatically` — same JS-heavy SPA. Manual review required.
- **Source 3 (complementary, automatable):** Dominio / handles sociales
  - **Status:** `not yet queried` (Phase 1 documentation scope only; not a blocker per ROADMAP)
- **Source 4 (complementary):** WIPO Global Brand Database — `https://branddb.wipo.int/branddb/en/`
  - **Status:** `not yet queried`. Recommended complement for international scan.

## Results

| Mark Found | Class | Owner | Status | Date Filed | Distinguishable? |
|------------|-------|-------|--------|------------|------------------|
| *(pending manual SIPI/VUE search by user)* | — | — | — | — | — |

**Automated search outcome:** `INCONCLUSIVE` — SIPI/VUE portals are not scriptable in this environment. Manual search required before Phase 3 indexation decision.

## Decision

- [ ] **PROCEED** — clear in classes 35/41/44; safe to invest in branding
- [ ] **WATCH** — similar marks exist but distinguishable; document and proceed cautiously
- [ ] **RE-BRAND** — direct collision in one of the three classes; halt branding investment, decide alternative before Phase 3
- [x] **PENDING MANUAL CONFIRMATION** — automated search inconclusive; user to run SIPI search at next opportunity and edit this file

**Decision:** **PENDING MANUAL CONFIRMATION**

**Justification:** SIPI/VUE portals are JavaScript-SPA + ASP.NET ViewState driven; not reliably automatable from this CLI environment in <5 min budget. Phase 1 requirement (FOUND-13) is **documentation of the check, not a passing result** — per ROADMAP, RE-BRAND only blocks Phase 3 indexation, not Phase 1 deploy. The check is therefore *registered as pending* and surfaced to the user as a follow-up action.

## Manual Search Steps (for User)

Run when convenient before Phase 3:

1. Open `https://sipi.sic.gov.co/sipi/Extranet/Principal.aspx` (or VUE equivalent above).
2. Click **"Consulta de Signos Distintivos"** → **"Marca"** → **"Búsqueda fonética/denominativa"**.
3. Search term: `planetapsilo`. Try also `planeta psilo`, `psilo`, `psiloplanet`.
4. For each phonetic variant, run the search in **each of the three classes** (35, 41, 44) one at a time — the portal limits to one class per query.
5. For any match found, record in the Results table above: mark name, class, owner, status (vigente/abandonado/en trámite), filing date, and whether it's *distinguishable* from "planetapsilo" (different sector, different ownership, abandoned/expired).
6. Update the **Decision** checkbox above based on findings:
   - 0 matches in all classes → PROCEED
   - Matches but in unrelated sectors or expired → WATCH
   - Direct collision in 35/41/44 with active registration → RE-BRAND
7. Commit the update via `/gsd-quick "update SIPI trademark result"`.

## Follow-ups by Decision

- **If PROCEED:** consider defensive registration in class 41 + 44 (~COP 1M per class, 10-year vigencia). Cost-benefit decision before Phase 4 paid traffic.
- **If WATCH:** re-check before Phase 3 indexation; document the watched marks in this file.
- **If RE-BRAND:** surface as Phase 3 blocker, decide replacement mark with Sofía + run new SIPI cycle on alternative.

## Sources & References

- SIPI Sistema de Información de Propiedad Industrial: `https://sipi.sic.gov.co`
- VUE Ventanilla Única Empresarial — consulta de marca: `https://www.vue.gov.co/tramites-y-consultas/consulta-de-nombre-de-marca`
- WIPO Global Brand Database (internacional): `https://branddb.wipo.int/branddb/en/`
- Nice classification reference (WIPO): `https://www.wipo.int/classifications/nice/en/`
- PITFALLS.md Pitfall #7 (this repo) — trademark search procedure
- ROADMAP.md — Phase 1 unknown (MEDIUM): "SIPI trademark check — si colide, re-branding antes de Phase 3"

## Audit Trail

| Date | Event | By |
|------|-------|----|
| 2026-05-21 | File created; automated search inconclusive; user notified for manual follow-up | Claude (Phase 01 Plan 03 Task 2) |
| *pending* | Manual SIPI search executed | User (Juan / Sofía) |

---
*Documented as part of Phase 1 Plan 03 — FOUND-13. Status: documentation requirement satisfied; legal/branding decision PENDING user manual SIPI search.*
