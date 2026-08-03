# Priority 1 Implementation Plan

This document outlines the proposed changes to fulfill Priority 1 (Strengthening Existing Authority) of the Phase 3 Blueprint. **No files have been modified yet.**

## 1. Existing Service Page Authority Improvements

**Goal:** Make current Umzug-related service pages the strongest resources for their search intent by injecting verified trust signals.

**Target Files:**
*   `_services/umzug-wien.md`
*   `_services/firmenumzug-wien.md`
*   `_services/seniorenumzug.md`
*   `_services/studentenumzug.md`

**Proposed Actions (Per File):**
*   **Inject Trust Signals:** Add a `trust_signals` YAML array to the front matter that dynamically pulls from `_data/company.yml` (e.g., `{{ site.data.company.trust_signals.experience_years }}`, `{{ site.data.company.trust_signals.insurance }}`).
*   **Enhance Process & Checklists:** Update the `process` and `checklist` descriptions to explicitly mention these trust signals (e.g., "Unser Fachpersonal mit 15 Jahren Erfahrung...").
*   **Refine Search Intent:** Ensure the content strictly answers transactional/local intent without straying into informational fluff (which belongs in guides).

## 2. Information Cluster Foundation

**Goal:** Strengthen top-of-funnel guides (Costs, Checklists, Preparation).

**Target Files:**
*   `_guides/umzugskosten-oesterreich-sparen.md` (Costs)
*   `_guides/umzug-checkliste-ultimativ.md` (Checklist)
*   `_guides/umzug-oesterreich-profi-guide.md` (General Preparation/Decision)

**Proposed Actions (Per File):**
*   **EEAT Injection:** Add explicit mentions of the company's established authority (e.g., "Als professionelle Umzugsfirma mit jahrelanger Erfahrung...").
*   **Deepen Content:** Ensure FAQs and main content blocks thoroughly answer the specific "What", "How", and "Why" of the topic.

## 3. Internal Linking Improvements

**Goal:** Create strong semantic relationships to flow authority between pages naturally.

**Proposed Actions:**
*   **Guide → Service:** In the Cost Guide (`umzugskosten-oesterreich-sparen.md`), add a natural CTA/link pointing to the core `umzug-wien.md` service page (e.g., "Fragen Sie uns direkt nach einem Angebot für Ihren Privatumzug").
*   **Service → Guide:** In the `umzug-wien.md` FAQs, link out to the Cost Guide when answering "Was kostet ein Umzug?".
*   **Service → Related Service:** In `firmenumzug-wien.md`, link to the related `firmenaufloesung.md` (Secondary Cluster) specifically where disposal of old office furniture is discussed.

## 4. EEAT Improvements (Global)

**Goal:** Ensure company trust signals are consistent.

**Proposed Actions:**
*   Rely entirely on Liquid variables pointing to `_data/company.yml` for all mentions of years of experience, insurance coverage, and guarantees. This ensures that if the company data changes, all Priority 1 pages update automatically, proving consistency to AI systems.

---
**Constraints Check:**
*   NO new pages will be created.
*   NO pages will be deleted.
*   NO pages will be merged.
*   NO URLs or permalinks will be changed.
*   NO redirects will be created.