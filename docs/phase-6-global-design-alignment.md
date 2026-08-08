# Global Design System Alignment Report

## 1. Pages/Layouts Audited

- `_includes/breadcrumbs.html`
- `_includes/quote-form.html`
- `_layouts/service.html`
- `_layouts/state.html`
- `_layouts/guide.html`
- `_layouts/service-index.html`
- `_layouts/guide-index.html`
- `_layouts/page.html`

## 2. Global Components Changed

- **Cards:** All standard content cards (services, pillars, related articles) were upgraded to the homepage's `rounded-3xl` pattern with `shadow-sm`, `border-gray-100`, and `hover:shadow-lg` properties to look consistent and premium.
- **Buttons (CTAs):** Standardized across all layouts.
  - Primary actions (e.g., "Kostenloses Angebot anfordern") now use the homepage token `bg-orange-500 hover:bg-orange-600 text-slate-950`.
  - Secondary/Tertiary actions (e.g., "Mehr erfahren", "Zum Artikel") now use the deep slate token `bg-primary hover:bg-primary-light text-white` or `bg-primary/10 text-primary`.
- **Forms (`quote-form.html`):** The input boxes and text areas now use `border-gray-300` and `rounded-xl`. Focus states are standard `focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20`. The submit button matches the primary CTA token (`bg-orange-500`).
- **Section Spacing:** Upgraded standard content section vertical padding from `py-12` to `py-16` to match the homepage's spacing rhythm.
- **Breadcrumbs:** Aligned to use `bg-white`, subdued text (`text-text-light`), and the standard `text-primary` token for the active element, removing legacy styles.

## 3. Page-Specific Components Changed

- **Guides (`guide.html`):**
  - Updated the "Nächster Schritt" box to adopt the unified `rounded-3xl` card design.
  - Retained the narrower reading column for `richtext` prose to preserve readability.
- **Service & State Layouts:**
  - Standardized the FAQ dropdown styles across pages (border color and hover states).
  - Adopted the global `rounded-3xl` card logic for Process Steps and Location Checks.

## 4. Design Inconsistencies Discovered

- Many internal pages were using older border colors (`border-gray-200` instead of `border-gray-100`).
- Card radius was inconsistent (`rounded-2xl` vs `rounded-3xl`).
- Internal CTAs heavily relied on the deprecated `bg-crimson` token or generic `bg-primary` where an `orange-500` CTA would match the homepage hierarchy better.
- Form focus states used harsh rings instead of the soft SaaS-like shadow/ring combination from the homepage.

## 5. Design System Patterns Standardized

- Standardized the Card pattern: `flex h-full flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 text-left shadow-sm hover:shadow-lg transition-opacity duration-200`.
- Standardized Primary CTA: `bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold`.
- Unified the shadow and hover physics (`transition-opacity duration-200`).

## 6. Accessibility Issues Found/Fixed

- Improved the visual focus ring for form inputs, ensuring WCAG 2.2 AA compliant contrast (`orange-500`).
- Removed instances of the deprecated "crimson" utility classes, mapping them to the proper orange tokens which have been validated for AA text contrast against dark backgrounds.

## 7. Responsive Issues Found/Fixed

- Verified that on small mobile devices (320px - 414px) the cards scale appropriately due to the Tailwind `p-8` rules. The flex-box layout properly contains elements without overflow.
- Ensured breadcrumbs remain horizontally scrollable without breaking the layout `overflow-x-auto whitespace-nowrap scrollbar-none`.

## 8. Intentional Exceptions

- The `richtext` content in `_layouts/guide.html` (Ratgeber) intentionally retains a narrower `max-w-3xl` reading column to ensure long-form typography remains readable, avoiding stretching text across the full container width.
- Hero images were retained on internal service pages (using absolute positioning behind a dark gradient overlay), rather than adopting a purely solid color background, to maintain visual context for the user without breaking the design system overlay pattern.

## 9. Playwright Validation Results

- Successfully ran a Playwright script across `375px` (Mobile) and `1920px` (Desktop) testing the following paths:
  - Homepage (`/`)
  - Service Page (`/leistungen/entruempelung-wien/`)
  - Guide Page (`/ratgeber/wohnungsentruempelung-wien-guide/`)
  - Quote Page (`/angebot/`)
- **Outcome:** The layout changes render accurately with no console errors, no horizontal overflow, and the CTA buttons now match the homepage design tokens perfectly. Video artifacts have been generated in the workspace.

## 10. Remaining Inconsistencies

- None observed in the primary UI layout structures. The global design alignment is complete.