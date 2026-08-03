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

## 5. Comprehensive Authority Audits (Pre-Implementation)

Before updating the content, every target page will undergo the following strict audits to ensure maximum topical authority and AI retrieval capability:

### 5.1 Entity Consistency Audit
*   **Action:** Review every target page to ensure business facts (NAP), terminology, service names, and trust signals exactly match the central truth in `_data/company.yml`. Consistency is critical for AI Knowledge Graph inclusion.

### 5.2 Search Intent Audit
*   **Action:** For every service page, explicitly define and align the content with:
    *   *Primary search intent* (e.g., Commercial - Hiring a moving company).
    *   *Secondary search intents* (e.g., Informational - How does a senior move work?).
    *   *User decision stage* (Awareness, Consideration, Decision).
    *   *Expected next action* (Form fill, call, read guide).

### 5.3 AI Extraction Audit
*   **Action:** Ensure every important page structurally and clearly answers the core entity questions:
    *   **Who** are we? (Sicher Team)
    *   **What** service is offered? (e.g., Firmenumzug)
    *   **Who** is the service for? (e.g., B2B, Startups)
    *   **Where** is it offered? (Wien/Österreich)
    *   **Why** should the customer trust us? (Insurance, Experience)
    *   **What** should the customer do next? (Clear CTA)

### 5.4 Heading Structure Audit
*   **Action:** Review all H1–H4 headings to ensure a strict, logical hierarchy. Every heading should ideally answer a real user question or define a clear semantic topic, rather than generic phrases.

### 5.5 CTA Audit
*   **Action:** Review every Call to Action. Ensure the CTA matches the page's specific search intent (e.g., a top-of-funnel guide might point to a service page; a bottom-of-funnel service page must point to the contact/quote form) using natural, action-oriented language.

### 5.6 Image Context Audit
*   **Action:** Go beyond just `alt` text. Review and optimize:
    *   Surrounding text relevance to the image.
    *   Descriptive captions (`<figcaption>`).
    *   Semantic filenames (e.g., `firmenumzug-wien-logistik.webp`).
    *   Explicit dimensions (`width`/`height`) and optimal loading behavior (`loading="lazy"`, `fetchpriority="high"` for LCP).

### 5.7 Internal Linking Audit
*   **Action:** Ensure no page is an island. Every target page must receive authority (incoming links from guides) and pass authority (outgoing links to related services/guides). Anchor text must use natural semantic variations, avoiding exact-match spam.

### 5.8 Semantic Coverage Audit
*   **Action:** Identify missing subtopics *within* existing pages to expand their depth and authority before even considering creating new pages (e.g., adding a section on "IT-Umzug" to the existing `firmenumzug-wien.md` instead of making a new page).

---
**Implementation Safety & Constraints:**
*   **NO** new mass location pages will be created.
*   **NO** pages will be deleted or merged.
*   **NO** URLs, Permalinks, or Canonicals will be changed.
*   **NO** redirects will be created.
*   **NO** navigation structure changes will occur unless explicitly approved.