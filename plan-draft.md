# Phase 4.4: AI & Entity Leadership Optimization - Audit

## 1. Goal
Audit the entire website for AI/LLM understanding and create `phase-4-4-ai-entity-audit.md`.

## 2. Methodology
Analyze the following based on codebase files, data, and schema definitions.

1.  **Entity clarity (WHO, WHAT, WHERE):** Review `_data/company.yml`, `_config.yml`, `_pages/index.md`, and top-level pages.
2.  **Schema/entity relationships:** Inspect `_includes/seo.html`, `_includes/service-schema.html`, `_layouts/`, `_data/company.yml`. Check for Organization, LocalBusiness, Service, FAQ, Breadcrumb, SameAs.
3.  **AI extraction readiness:** Review `_pages/leistungen.md`, `_pages/bezirke.md`, `_services/umzug-wien.md`, etc., checking if they clearly answer WHO/WHAT/WHERE/WHY/NEXT.
4.  **Internal entity graph:** Check navigation and link structures (`_data/navigation.yml`, links in markdown content) between Organization → Services → Locations → Guides.
5.  **Content clarity issues:** Look for ambiguous wording, inconsistent brand names, weak definitions across the main pages.

## 3. Plan Steps
1. Create `phase-4-4-ai-entity-audit.md` with findings and recommendations based on the audit.
2. Ensure no content, schema, or URL changes are made during this step.
3. Complete pre-commit instructions for quality assurance.
4. Request code review / user input for approval of the audit report.
