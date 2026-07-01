# trafti Design System Implementation Plan

**Status:** Draft  
**Version:** 1.0  
**Last Updated:** 2026-05-24  
**Document Purpose:** Implementation roadmap for integrating trafti Design System tokens and components into the Next.js landing page

---

## 1. Context & Overview

### 1.1 Design System Overview

The trafti Design System (v1.0) is a comprehensive, token-based design language currently documented as a living HTML style guide. It features:

- **CSS Custom Properties (Tokens)** for colors, typography, spacing, radii, and shadows
- **Dark Mode Support** via `[data-theme="dark"]` attribute
- **Three Typeface Families**: Instrument Serif (display), Plus Jakarta Sans (body), JetBrains Mono (code)
- **Semantic Color Palette**: Ink (primary), Clay (accent), Sage (secondary), Gold (tertiary) + semantic colors
- **Responsive Design Patterns** using CSS Grid and modern layout techniques
- **Component Examples**: Buttons, inputs, cards, typography specimens

### 1.2 Current State

- **Source:** `/specs/trafti_design_system.html` (HTML + embedded CSS)
- **Landing Page Tech Stack:** Next.js 16, Tailwind CSS 4, React 19
- **Current Styling Approach:** Tailwind CSS with Tailwind-based design tokens in `globals.css`
- **Conflict Area:** Design system tokens defined in HTML/CSS vs. Tailwind-first approach in Next.js

### 1.3 Implementation Goal

Create a seamless bridge between the trafti Design System tokens and the existing Tailwind CSS setup, ensuring:

- All design tokens are available in the Next.js application
- Component styling is consistent with design system specifications
- Dark mode works without JavaScript context switches
- Responsive behavior matches design system patterns
- Accessibility standards are maintained (WCAG 2.1 AA minimum)

---

## 2. Design System Audit

### 2.1 Color Palette

#### Light Mode (Default)

| Token        | Hex     | Role                | Usage                      |
| ------------ | ------- | ------------------- | -------------------------- |
| `--ink-900`  | #0F1B26 | Primary ink         | Body text, primary actions |
| `--ink-800`  | #1A2A38 | Ink secondary       | Hover states               |
| `--ink-700`  | #2A3B4A | Ink tertiary        | Muted text                 |
| `--ink-500`  | #5C6B79 | Ink muted           | Secondary text             |
| `--ink-300`  | #9CA8B3 | Ink light           | Borders, disabled states   |
| `--ink-200`  | #C7CDD3 | Ink lighter         | Light borders              |
| `--ink-100`  | #E4E7EA | Ink lightest        | Hover backgrounds          |
| `--ink-50`   | #F2F3F5 | Ink faintest        | Focus rings                |
| `--paper`    | #FBFAF6 | Primary bg          | Main background            |
| `--paper-2`  | #F4F1EA | Secondary bg        | Elevated surfaces          |
| `--paper-3`  | #EAE4D6 | Tertiary bg         | Sand/muted surfaces        |
| `--clay-600` | #C8552D | Accent (terracotta) | Primary CTA, highlights    |
| `--sage-600` | #3D8B7A | Secondary (teal)    | Alternative actions        |
| `--gold-600` | #B8893A | Tertiary (gold)     | Ratings, badges            |
| `--success`  | #2E7D5E | Semantic            | Success states             |
| `--warning`  | #B8893A | Semantic            | Warning states             |
| `--danger`   | #C8392C | Semantic            | Error/danger states        |
| `--info`     | #2C5F8A | Semantic            | Info states                |

#### Dark Mode Overrides

- `--bg` → #0B1620
- `--bg-elev` → #142231
- `--fg` → #F1E4CE (warm cream)
- `--clay-600` → #E07A56 (lifted for contrast)
- `--sage-600` → #5CAE9A

#### Semantic Roles

- `--fg` / `--fg-muted` / `--fg-faint` → Text hierarchy
- `--bg` / `--bg-elev` / `--bg-muted` → Surface hierarchy
- `--border` / `--border-strong` → Border colors

### 2.2 Typography System

#### Typefaces

| Family  | Font              | Usage                  | Weights                      |
| ------- | ----------------- | ---------------------- | ---------------------------- |
| Display | Instrument Serif  | Headlines, hero text   | 400 (regular), 1 (italic)    |
| Body    | Plus Jakarta Sans | Body text, UI labels   | 300, 400, 500, 600, 700, 800 |
| Mono    | JetBrains Mono    | Code, tokens, metadata | 400, 500, 600                |

#### Type Scale (CSS Custom Properties)

```
--text-xs:   12px   (labels, captions)
--text-sm:   14px   (secondary text, hints)
--text-base: 16px   (body text)
--text-md:   18px   (body alternate)
--text-lg:   20px   (section intro)
--text-xl:   24px   (section heading)
--text-2xl:  30px   (subheading)
--text-3xl:  38px   (heading alt)
--text-4xl:  48px   (major heading)
--text-5xl:  64px   (hero heading)
--text-6xl:  80px   (display)
```

#### Line Heights

- Display: 1.05–1.08
- Body: 1.55–1.6
- Mono: default (1.0)

#### Letter Spacing

- Display: -0.02em (tighter)
- Body: 0 (normal)
- Mono: varies (0.06em–0.14em for uppercase)

### 2.3 Spacing System (4px Base)

```
--s-0:  0px
--s-1:  4px
--s-2:  8px
--s-3:  12px
--s-4:  16px
--s-5:  20px
--s-6:  24px
--s-8:  32px
--s-10: 40px
--s-12: 48px
--s-16: 64px
--s-20: 80px
--s-24: 96px
```

### 2.4 Radii (Border Radius)

```
--r-xs:   4px    (small interactive elements)
--r-sm:   8px    (standard cards, inputs)
--r-md:   12px   (larger components)
--r-lg:   16px   (cards, dialogs)
--r-xl:   24px   (sections, hero)
--r-pill: 999px  (buttons, badges)
```

### 2.5 Shadows (Elevation)

```
--shadow-xs: 0 1px 2px rgba(15,27,38,0.04)     (subtle)
--shadow-sm: 0 2px 6px rgba(15,27,38,0.06)     (hover)
--shadow-md: 0 6px 18px rgba(15,27,38,0.08)    (elevated)
--shadow-lg: 0 20px 40px rgba(15,27,38,0.12)   (modal)
```

### 2.6 Component Patterns

#### Buttons

- **Variants:** Primary (ink-900), Secondary (outline), Accent (clay-600), Ghost (transparent)
- **Sizes:** Default (14px sm), Large (16px base), Small (12px xs)
- **Padding:** Default (14px 20px), Large (16px 28px), Small (10px 14px)
- **Border Radius:** `--r-pill` (rounded full)
- **States:** Default, Hover (transform, shadow), Focus (ring: clay-100 → clay-600), Disabled (opacity 0.4)

#### Inputs

- **Padding:** 14px 16px
- **Border:** 1.5px solid `--border-strong`
- **Border Radius:** `--r-md`
- **States:** Default, Hover (border-color → ink-300), Focus (border → ink-900, ring 4px `--ink-50`)
- **Error State:** Border → danger, background → rgba(200, 57, 44, 0.04)
- **Icon Variant:** 44px left padding for icons

#### Cards

- **Background:** `--bg-elev`
- **Border:** 1px solid `--border`
- **Border Radius:** `--r-lg`
- **Hover:** Shadow (md), transform translateY(-2px), border → `--border-strong`
- **Variants:**
  - **Merchant Card:** Image (4:3 aspect), gradient overlay, badge, pricing footer
  - **Stat Card:** Simple data container

#### Typography Specimens

- **Display (Serif):** Used in headings, uses italics for color accents
- **Body (Sans):** Primary UI text, weight hierarchy: 400/500/600
- **Mono:** Tokens, metadata, code examples

---

## 3. Current Landing Page Setup

### 3.1 Current Styling Architecture

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 with PostCSS
- **Global Styles:** `/app/globals.css`
- **Theme Variables:** Limited CSS custom properties (appears incomplete)
- **Dark Mode:** Not yet implemented
- **Responsive:** Tailwind breakpoints (sm, md, lg, xl)

### 3.2 Existing Issues / Gaps

1. **Design System Not Integrated:** Colors, spacing tokens differ from design system
2. **No Dark Mode:** Current setup missing `data-theme` support
3. **Typography Incomplete:** Font families imported (Geist) differ from design system (Instrument Serif, Plus Jakarta Sans, JetBrains Mono)
4. **Spacing Misaligned:** Tailwind's 4px base doesn't fully match design system token names
5. **Component Patterns Missing:** Buttons, inputs, cards not following design system
6. **No CSS Custom Properties:** Difficult to maintain consistency across components

---

## 4. Implementation Strategy

### 4.1 Approach: Hybrid (Tailwind + CSS Variables)

**Rationale:**

- Keep Tailwind for productivity and responsive utilities
- Layer CSS custom properties for design system tokens
- Use Tailwind's `@apply` to map design system patterns to Tailwind classes where applicable
- Maintain gradual migration without breaking current pages

**Benefits:**

- Non-destructive (existing Tailwind classes remain valid)
- Enables incremental component updates
- Supports dark mode via native CSS media queries + explicit attribute
- Aligns with modern CSS architecture practices

### 4.2 Step-by-Step Implementation

#### Phase 1: Token Layer (Week 1)

**Goal:** Define all design tokens as CSS custom properties

**Tasks:**

1. Create `/app/_design-system/tokens.css`
   - Copy all `:root` variables from design system HTML
   - Add `[data-theme="dark"]` overrides
   - Organize variables by category (colors, type, space, radii, shadows)

2. Create `/app/_design-system/fonts.css`
   - Import Instrument Serif from Google Fonts
   - Update Plus Jakarta Sans import (already imported; verify weight range)
   - Add JetBrains Mono import
   - Define `@font-face` or `@import` rules

3. Update `/app/globals.css`
   - Import tokens and fonts
   - Apply base typography rules using CSS custom properties
   - Set default text color, background, line-height via custom properties

4. Update `/app/layout.tsx`
   - Add data-theme provider/context (initially "light", enhance with user toggle later)
   - Ensure `[data-theme="dark"]` attribute propagates to `<html>` element

**Deliverable:**

- Design tokens accessible globally via CSS custom properties
- All 3 typefaces loaded and ready
- Dark mode toggle infrastructure in place (manual attribute swap for now)

#### Phase 2: Component Refactor (Weeks 2–3)

**Goal:** Create reusable component library aligned with design system

**Tasks:**

1. Create component directory: `/app/_design-system/components/`

2. **Typography Components** (`text-styles.tsx`)
   - `<H1>`, `<H2>`, `<H3>` (Instrument Serif, display weights)
   - `<Body>`, `<BodySmall>` (Plus Jakarta Sans)
   - `<Mono>`, `<MonoSmall>` (JetBrains Mono)
   - Use `className` + CSS custom properties, NOT Tailwind text sizes

3. **Button Component** (`button.tsx`)
   - Variants: primary, secondary, accent, ghost
   - Sizes: sm, md, lg
   - States: default, hover, focus, disabled
   - Use CSS custom properties for colors, use `--r-pill` for border-radius

4. **Input Component** (`input.tsx`)
   - Standard input
   - Error state variant
   - Icon input (left icon support)
   - Use `--border-strong` and focus shadow

5. **Card Component** (`card.tsx`)
   - Base card (bg-elev, border, r-lg)
   - Merchant card variant (image, gradient, badge, rating, pricing)
   - Stat card variant
   - Hover animation (shadow-md, translateY)

6. **Surface/Layout Components**
   - `<Surface>` (bg-elev, optional border/shadow)
   - `<Hero>` (layout, eyebrow, lede, meta)
   - `<SectionHead>` (stamp, heading, description layout)

7. Refactor existing page components
   - Replace hardcoded colors with component usage
   - Update `app/[lang]/page.tsx`, `for-business/page.tsx`, etc.
   - Test each page in light & dark modes

**Deliverable:**

- Reusable component library (8–10 core components)
- All pages migrated to use new components
- Consistent look & feel across the site
- Dark mode fully functional

#### Phase 3: Advanced Features (Week 4+)

**Goal:** Enhance design system integration with tooling & documentation

**Tasks:**

1. **Dark Mode Toggle UI**
   - Add theme switcher in header/sidebar (optional for MVP)
   - Persist user preference to localStorage
   - Use system preference as fallback

2. **Design Tokens Documentation**
   - Create `/specs/design-tokens.md` listing all tokens with usage examples
   - Link to component stories where applicable
   - Include design rationale

3. **Accessibility Audits**
   - Validate color contrast (WCAG AA minimum for all text/components)
   - Test keyboard navigation (focus rings, tab order)
   - Verify semantic HTML structure
   - Test with screen readers (brief spot check)

4. **Performance Optimization**
   - Audit font loading (lazy load non-critical fonts)
   - Optimize CSS file size (minify tokens.css)
   - Remove unused Tailwind utilities

5. **Testing Setup** (Optional for MVP)
   - Visual regression tests (Percy, Chromatic)
   - Component Storybook setup (showcase components in isolation)

**Deliverable:**

- Production-ready design system
- Comprehensive documentation
- User-facing dark mode toggle
- Performance optimized

---

## 5. Technical Details

### 5.1 CSS Variables Implementation

**Location:** `/app/_design-system/tokens.css`

```css
/* ============================================================
   trafti DESIGN SYSTEM TOKENS v1.0
   ============================================================ */

:root {
  /* ——— Colors: Light Mode ——— */
  --ink-900: #0f1b26;
  --ink-800: #1a2a38;
  /* ... (all color tokens) ... */

  /* ——— Typography ——— */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* ——— Type Scale ——— */
  --text-xs: 12px;
  --text-sm: 14px;
  /* ... (all size tokens) ... */

  /* ——— Spacing ——— */
  --s-0: 0;
  --s-1: 4px;
  /* ... (all spacing tokens) ... */

  /* ——— Radii ——— */
  --r-xs: 4px;
  --r-sm: 8px;
  /* ... (all radius tokens) ... */

  /* ——— Shadows ——— */
  --shadow-xs: 0 1px 2px rgba(15, 27, 38, 0.04);
  /* ... (all shadow tokens) ... */

  /* ——— Surface Roles ——— */
  --bg: var(--paper);
  --bg-elev: #ffffff;
  --fg: var(--ink-900);
  /* ... (all role tokens) ... */
}

/* ——— Dark Mode ——— */
[data-theme="dark"] {
  --bg: #0b1620;
  --bg-elev: #142231;
  --fg: #f1e4ce;
  --clay-600: #e07a56;
  --sage-600: #5cae9a;
  /* ... (other dark overrides) ... */
}
```

### 5.2 Global Styles Update

**Location:** `/app/globals.css`

```css
@import "./_design-system/tokens.css";
@import "./_design-system/fonts.css";

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  transition:
    background-color 0.3s,
    color 0.3s;
}

/* Remove or redefine any conflicting Tailwind base styles */
@layer base {
  /* Ensure custom properties take precedence */
}
```

### 5.3 Component Example: Button

**Location:** `/app/_design-system/components/Button.tsx`

```tsx
import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const baseClass = styles.btn;
    const variantClass = styles[`btn-${variant}`];
    const sizeClass = styles[`btn-${size}`];

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
```

**Location:** `/app/_design-system/components/Button.module.css`

```css
.btn {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--text-sm);
  line-height: 1;
  padding: 14px 20px;
  border-radius: var(--r-pill);
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  letter-spacing: -0.005em;
  text-decoration: none;
}

.btn:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px var(--clay-100),
    0 0 0 5px var(--clay-600);
}

.btn-primary {
  background-color: var(--ink-900);
  color: var(--paper);
}

.btn-primary:hover {
  background-color: var(--ink-800);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

[data-theme="dark"] .btn-primary {
  background-color: var(--clay-600);
  color: #0b1620;
}

[data-theme="dark"] .btn-primary:hover {
  background-color: var(--clay-500);
}

/* ... (other variants and sizes) ... */
```

### 5.4 Fonts Import

**Location:** `/app/_design-system/fonts.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap");
```

### 5.5 Layout Theme Provider

**Location:** `/app/layout.tsx` (Update)

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  // ... existing metadata ...
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-theme="light">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        {/* Optional: Theme toggle component */}
      </body>
    </html>
  );
}
```

---

## 6. Migration Checklist

### Before Implementation

- [ ] Design System HTML reviewed and all tokens cataloged
- [ ] Current styling conflicts identified
- [ ] Tailwind config reviewed (verify breakpoints, spacing, colors)
- [ ] Team alignment on approach (Hybrid Tailwind + CSS Variables)

### Phase 1: Tokens

- [ ] Create `/app/_design-system/tokens.css` with all tokens
- [ ] Create `/app/_design-system/fonts.css` with font imports
- [ ] Update `/app/globals.css` to import and apply tokens
- [ ] Verify light & dark mode tokens in browser DevTools
- [ ] Test dark mode toggle (manual `data-theme` attribute change)

### Phase 2: Components

- [ ] Create component directory structure
- [ ] Build typography components (H1–H3, Body, Mono)
- [ ] Build Button component (all variants & sizes)
- [ ] Build Input component (with error state & icon variant)
- [ ] Build Card components (base, merchant, stat)
- [ ] Build layout components (Surface, Hero, SectionHead)
- [ ] Test all components in light & dark modes
- [ ] Refactor existing pages to use new components
- [ ] Visual regression testing (before/after screenshots)

### Phase 3: Refinement

- [ ] Add dark mode toggle UI to header
- [ ] Implement localStorage persistence for theme preference
- [ ] Create `/specs/design-tokens.md` documentation
- [ ] WCAG color contrast audit
- [ ] Keyboard navigation & focus ring audit
- [ ] Screen reader spot check
- [ ] Performance audit (font loading, CSS size)
- [ ] Final QA on all pages (light & dark modes)

### Post-Launch

- [ ] Monitor performance metrics
- [ ] Collect user feedback on dark mode
- [ ] Plan Storybook setup for component library
- [ ] Document design system update process

---

## 7. Accessibility Considerations

### 7.1 Color Contrast

All text/component color combinations must meet **WCAG AA** (4.5:1 for normal text, 3:1 for large text).

**Critical Pairs to Verify:**

- `--fg` (#0F1B26) on `--bg` (#FBFAF6) ✓
- `--fg-muted` (#5C6B79) on `--bg` (#FBFAF6) ✓
- `--clay-600` (#C8552D) on `--paper` (#FBFAF6) ✓
- Dark mode: `--fg` (#F1E4CE) on `--bg` (#0B1620) ✓

**Tools:**

- WCAG Contrast Checker (online tool)
- WebAIM Contrast Checker
- axe DevTools browser extension

### 7.2 Focus Indicators

- All interactive elements must have visible focus rings
- Use design system ring style: `0 0 0 3px var(--clay-100), 0 0 0 5px var(--clay-600)`
- Sufficient color contrast on focus states

### 7.3 Motion & Animation

- All animations respect `prefers-reduced-motion`
- Use `@media (prefers-reduced-motion: reduce)` to disable transforms/transitions

### 7.4 Semantic HTML

- Use native `<button>`, `<input>`, `<a>` elements
- Avoid `<div>` for interactive elements (unless ARIA roles applied)
- Proper heading hierarchy (h1 → h2 → h3)

### 7.5 Dark Mode

- Ensure dark mode is NOT hardcoded; respect system preference + user preference
- No flashing between modes during page load
- Text remains readable in dark mode (sufficient contrast)

---

## 8. Documentation & Maintenance

### 8.1 Component Documentation Template

Each component should document:

```markdown
# Component: [Name]

## Purpose

Brief description of what this component does.

## Variants

- **Primary:** Used for main CTAs
- **Secondary:** Used for alternative actions
- **Accent:** Used for highlight actions

## Accessibility

- Keyboard navigation: [Tab order, Enter/Space behavior]
- Screen readers: [ARIA labels, semantic HTML]
- Focus indicators: [Design system ring applied]

## Props

| Prop    | Type   | Default   | Description          |
| ------- | ------ | --------- | -------------------- |
| variant | string | "primary" | Button style variant |
| size    | string | "md"      | Button size          |

## Examples

[Code examples for each variant]

## Related Components

- [Link to related components]
```

### 8.2 Token Documentation

Keep `/specs/design-tokens.md` as the source of truth:

```markdown
# trafti Design Tokens

## Colors

### Inks (Primary)

- **ink-900** (#0F1B26): Primary text, headings
- **ink-800** (#1A2A38): Hover backgrounds
- ...

### Accents

- **clay-600** (#C8552D): Primary CTA buttons, highlights
- **sage-600** (#3D8B7A): Secondary actions
- ...

## Typography

- **Display (Instrument Serif):** Headings, hero text
- **Body (Plus Jakarta Sans):** Primary body text
- **Mono (JetBrains Mono):** Code, tokens

## Spacing

- **4px base:** All spacing tokens are multiples of 4px
- **Use cases:** s-4 (standard button padding), s-6 (section padding), etc.

## Dark Mode

Dark mode is automatically applied when `[data-theme="dark"]` is set on `<html>`.
```

### 8.3 Update Process

When design system changes are made to the HTML file:

1. Update `/app/_design-system/tokens.css` with new token values
2. Test in browser (light & dark modes)
3. Update `/specs/design-tokens.md` with rationale
4. Notify team of changes
5. Monitor for regressions in CI/CD

---

## 9. Risk Mitigation

### 9.1 Risks & Mitigation Strategies

| Risk                     | Impact                                             | Mitigation                                                            |
| ------------------------ | -------------------------------------------------- | --------------------------------------------------------------------- |
| **Tailwind conflicts**   | Some utilities override CSS variables              | Use `@layer` to establish precedence; audit critical classes          |
| **Dark mode flicker**    | FOUC (Flash of Unstyled Content) on dark mode load | Pre-set `data-theme` attribute in HTML before body renders            |
| **Performance hit**      | Extra CSS variables + font requests                | Lazy load secondary fonts; minify tokens.css; monitor Core Web Vitals |
| **Browser support**      | CSS custom properties not supported in IE11        | IE11 out of support; use modernizr if needed for older browsers       |
| **Migration complexity** | Existing pages break during refactor               | Incremental migration; keep old classes until new components stable   |

### 9.2 Testing Strategy

- **Unit Tests:** Component props, variants, states (Jest + React Testing Library)
- **Visual Tests:** Screenshots in light & dark modes (Percy or similar)
- **Accessibility Tests:** axe DevTools, WAVE, manual keyboard testing
- **Performance Tests:** Lighthouse, Core Web Vitals monitoring
- **Cross-browser Tests:** Chrome, Firefox, Safari (desktop + mobile)

---

## 10. Timeline & Ownership

### Suggested Timeline

- **Week 1:** Phase 1 (Tokens) — 1 developer
- **Weeks 2–3:** Phase 2 (Components) — 2 developers
- **Week 4+:** Phase 3 (Features & Docs) — 1–2 developers

### Ownership

- **Design System Lead:** [Team member responsible for design system accuracy]
- **Implementation Lead:** [Engineer leading integration]
- **QA & Accessibility:** [Designer or accessibility specialist]

---

## 11. Appendix: Design System Sources

### Files Referenced

- **Source:** `/specs/trafti_design_system.html`
- **Landing Page:** `/app/[lang]/page.tsx` and related
- **Config:** `tailwind.config.ts`, `globals.css`

### External Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 12. Success Criteria

✅ **Implementation is successful when:**

1. All design tokens are available as CSS custom properties throughout the app
2. All pages render consistently in light & dark modes
3. All components (buttons, inputs, cards, etc.) follow design system specifications
4. WCAG AA color contrast passes on all text/interactive elements
5. Keyboard navigation works seamlessly (Tab, Enter, Escape)
6. No visual regressions compared to current site
7. Performance metrics remain stable or improve (LCP, FID, CLS)
8. Design system documentation is up-to-date and accessible to team
9. Dark mode toggle works without JavaScript errors or FOUC
10. Code is maintainable and extensible for future design updates

---

**Document Status:** Ready for implementation review  
**Next Step:** Team alignment meeting + technical design review
