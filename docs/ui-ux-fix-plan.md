# Master UI/UX & Audit Implementation Plan

This document outlines the confirmed issues, WCAG failures, and design improvements identified during the audit of the Jekyll + Tailwind project. All items listed here have been statically and/or behaviorally verified.

## Confirmed Issues & Fixes

### ISSUE-001 — JavaScript Fails to Execute (Layout Wrapping)
Priority: P0
Category: CONFIRMED BUG
Affected files:
- `assets/js/site.js`
- `browserconfig.xml`
Affected component:
- Global Interactions (Mobile Menu, Accordions, Form Validation, Contact Form Submit)
Observed problem:
- Interactive JS-driven elements like the mobile dropdown and FAQ accordion do not work. Clicking toggles does nothing. The browser console throws `TypeError: window.mobileMenuToggle is not a function`.
Root cause:
- `assets/js/site.js` (and `browserconfig.xml`) contains empty frontmatter (`---`). Because `_config.yml` defines a default `layout: page` for all files in the root path, Jekyll wraps the JavaScript inside the HTML page layout. The browser receives an HTML document instead of valid JavaScript.
Why it matters:
- Critical failure. Breaks all mobile navigation, breaking WCAG 4.1.2 (aria-expanded doesn't update), and breaks form AJAX submissions and validations.
Recommended solution:
- Add `layout: null` to the frontmatter of `assets/js/site.js` and `browserconfig.xml`.
Do not:
- Do not remove the frontmatter entirely, as `site.js` still relies on Liquid includes (`{% include svg/close.svg %}`).
Verification required:
- Test that navigating to `/assets/js/site.js` returns raw JavaScript. Verify that tapping the mobile menu accordion triggers `hidden` class removal and updates `aria-expanded` to `true`.

### ISSUE-002 — Material Symbols Icon Fallback
Priority: P0
Category: CONFIRMED BUG
Affected files:
- `assets/css/tailwind.css`
- `_layouts/home.html`
- `_includes/hero-content.html`
Affected component:
- Icons across the site (e.g., Hero contact pills, Trust badges, Features).
Observed problem:
- Words like "call", "chat", "verified", and "bolt" are rendering as visible fallback text instead of icons.
Root cause:
- `assets/css/tailwind.css` defines `@font-face` pointing to `url("../fonts/material-symbols-outlined.woff2")`, but the file `material-symbols-outlined.woff2` and the `assets/fonts/` directory do not exist in the repository. Furthermore, many parts of the codebase still use `<span class="material-symbols-outlined">icon_name</span>` instead of the inline SVG pattern.
Why it matters:
- Severely degrades visual quality. Seeing the word "chat" instead of a WhatsApp icon looks broken and confusing.
Recommended solution:
- Convert the remaining `<span class="material-symbols-outlined">...</span>` tags in `_layouts/home.html` and `_includes/hero-content.html` to inline SVGs following the `{% include svg/... %}` pattern used elsewhere, to fully eliminate the external font dependency.
- Remove the `@font-face` declaration for Material Symbols from `assets/css/tailwind.css`.
Do not:
- Do not download and re-introduce the `.woff2` font file. Stick strictly to the inline SVG migration.
Verification required:
- Ensure all instances of text fallbacks are replaced by actual SVG icons across all viewports.

### ISSUE-003 — Primary CTA Contrast Failure
Priority: P1
Category: ACCESSIBILITY ISSUE
Affected files:
- `_includes/header.html`
- `_includes/hero-content.html`
- `_includes/sticky-cta.html`
- `_layouts/home.html`
Affected component:
- Primary action buttons ("Gratis Angebot", "Gratis Besichtigung").
Observed problem:
- The contrast ratio between `text-slate-950` (or white) and the gradient/orange background (`bg-gradient-to-r from-amber-500 to-orange-500` or `bg-orange-500`) falls below the WCAG 2.2 AA threshold of 4.5:1.
Root cause:
- `orange-500` is too bright for white text, and `amber-500` creates low contrast spots against dark text.
Why it matters:
- Accessibility failure and reduces the clarity of the most critical conversion element on the site.
Recommended solution:
- Standardize the primary CTA to a solid, flat background (e.g., `bg-orange-500`) and ensure the text color is `text-slate-950` (verified contrast). Remove `bg-gradient-to-r` completely from buttons to improve legibility and premium feel.
Do not:
- Do not blindly change the `orange-500` hex value in the config if it breaks other semantic alignments; fix the text color instead.
Verification required:
- Contrast checker confirms ratio > 4.5:1 on all primary CTAs.

### ISSUE-004 — Hero Dark Overlay Contrast
Priority: P1
Category: ACCESSIBILITY ISSUE
Affected files:
- `_layouts/default.html`
Affected component:
- Text overlaid on the hero banner (`[data-hero-banner]`).
Observed problem:
- Text (like `text-slate-300` paragraphs) over the background image does not have sufficient contrast.
Root cause:
- The linear gradient overlay (`linear-gradient(rgba(2, 44, 34, 0.40), rgba(2, 44, 34, 0.75))`) is too transparent at the top (40%), causing text to blend into the underlying image.
Why it matters:
- The primary value proposition is difficult to read.
Recommended solution:
- Deepen the background overlay in `_layouts/default.html` (e.g., `rgba(2, 44, 34, 0.60)` to `rgba(2, 44, 34, 0.85)`) or brighten the text to `text-slate-100` / `text-white`.
Do not:
- Do not move the overlay to an absolute positioned element inside child includes, as it may break z-index layering globally. Keep it in `default.html`.
Verification required:
- Ensure hero subtitle text exceeds 4.5:1 ratio against the rendered background.

### ISSUE-005 — Generic Tailwind Template Aesthetic (Excessive Shadows/Radiuses)
Priority: P2
Category: DESIGN IMPROVEMENT
Affected files:
- `_layouts/home.html`
- `_layouts/service-index.html`
- `_layouts/state.html`
- `_layouts/service.html`
- `_layouts/guide.html`
- `_layouts/guide-index.html`
Affected component:
- Feature cards, Service cards, Layout containers.
Observed problem:
- Widespread use of `rounded-3xl`, `shadow-xl`, `border-gray-100`, and aggressive hover translation (`hover:-translate-y-1.5`).
Root cause:
- Inherited styling from a standard UI kit mentality. Premium Apple-like/SaaS design relies on subtlety, flat surfaces, and faint borders.
Why it matters:
- The site feels visually heavy and lacks the requested high-end, restrained polish.
Recommended solution:
- Standardize large containers to `rounded-2xl` and smaller components/buttons to `rounded-xl` or `rounded-lg`.
- Remove `shadow-xl` and `shadow-lg` from cards. Replace with subtle `shadow-sm` or purely background-color-based depth (e.g., `bg-white` on `bg-slate-50`).
- Replace aggressive `translate-y-1.5` with subtle background shifts (`hover:bg-slate-50`) on hover.
Do not:
- Do not blindly global find-and-replace `rounded-3xl`. Specifically target the main layout/card containers as listed. Do not touch pill badges (`rounded-full`).
Verification required:
- Visual check: Cards should look flat and integrated, rather than "floating" excessively on the screen.

### ISSUE-006 — Text Gradients Overuse
Priority: P2
Category: DESIGN IMPROVEMENT
Affected files:
- `_includes/header.html`
- `_includes/hero-content.html`
Affected component:
- Logo text ("TEAM") and Hero subheadings.
Observed problem:
- `bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent` is used on typography.
Root cause:
- Overly stylized gradient text detracts from a calm, minimal design.
Why it matters:
- Cheapens the brand perception.
Recommended solution:
- Remove gradient text classes on text. Use a solid brand color (e.g., `text-orange-500` or `text-amber-400` where contrast allows on dark backgrounds).
Do not:
- Do not modify non-text gradients (like the hero background overlay).
Verification required:
- No text clipping gradients exist in the DOM.

### ISSUE-007 — Focus Outline Inconsistencies
Priority: P3
Category: OPTIONAL POLISH
Affected files:
- `_includes/quote-form.html`
Affected component:
- Form Submit Button.
Observed problem:
- Legacy `focus-visible:ring-crimson` is still used on the quote form submit button, whereas other elements use `ring-primary-light` or `ring-amber-400`.
Root cause:
- Incomplete migration from a legacy color scheme (`crimson`).
Why it matters:
- Inconsistent keyboard navigation styling.
Recommended solution:
- Replace `ring-crimson` with `ring-orange-500` or `ring-amber-400` to match the current color palette.
Do not:
- Do not accidentally modify the base `bg-crimson` fallback if it is still relied upon in the CSS definition.
Verification required:
- Tabbing to the submit button displays an orange/amber ring, not crimson.

---

## Implementation Summary

- Total confirmed bugs: 2
- Total WCAG issues: 2
- Total responsive issues: 0
- Total JavaScript issues: 1
- Total design improvements: 2
- Total CRO improvements: 0
- Total optional polish items: 1

## Recommended Implementation Order

1. **Fix ISSUE-001 (JS Bug):** Add `layout: null` to `site.js` and `browserconfig.xml`. This instantly restores mobile navigation, accordions, and form logic.
2. **Fix ISSUE-002 (Icon Fallbacks):** Replace broken `<span class="material-symbols-outlined">` tags with inline SVG components. Remove the font reference from CSS.
3. **Fix ISSUE-003 & ISSUE-004 (Accessibility):** Correct CTA button contrast (remove gradients, ensure text is readable) and darken the hero overlay.
4. **Implement ISSUE-005 & ISSUE-006 (Premium Design):** Systematically replace `rounded-3xl` and excessive shadows. Remove text gradients.
5. **Implement ISSUE-007 (Polish):** Clean up legacy focus rings.
