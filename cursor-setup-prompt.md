# Cursor Setup Prompt — EU4Reconstruction Website

> Paste this entire prompt into Cursor's AI chat (or a new Agent session) to scaffold the project.

---

## Prompt

You are setting up a **static HTML/CSS front-end prototype** for the **EU4Reconstruction** website — a European Union initiative supporting reconstruction in Ukraine. This is a design-to-code handoff environment where we will build and iterate on all pages before moving to a CMS-backed stack (Next.js 14 + Payload CMS).

---

### Design System

The project already has an extracted design system. Place the file `eu4r-design-system.css` (provided in this project) at the root of the `assets/css/` folder and import it in every page. **Do not override or duplicate its tokens** — always reference its CSS custom properties (e.g. `var(--color-navy)`, `var(--font-heading)`).

Key design tokens to remember:
- **Navy** `#1B2D6E` — primary brand, headings, dark backgrounds, navigation
- **Yellow** `#F5C318` — accent, badges, geometric decorations, highlights
- **Bright Blue** `#00A3D8` — secondary accents, chart bars, UI elements
- **Light Blue** `#C4E8F5` — backgrounds, subtle fills
- **Font** — Montserrat (all weights 400–900), headings UPPERCASE, already imported in the design system CSS
- Two EU programme streams: Stream 1 (navy) and Stream 2 (yellow)

For visual reference, open `eu4r-styleguide.html` (provided) in a browser — it shows every colour, type scale, component, and state rendered live.

---

### Project Folder Structure

Create the following structure:

```
eu4reconstruction/
├── assets/
│   ├── css/
│   │   ├── eu4r-design-system.css      ← copy from provided file, do not edit
│   │   ├── global.css                  ← global resets, layout utilities
│   │   └── components/
│   │       ├── nav.css
│   │       ├── footer.css
│   │       ├── hero.css
│   │       ├── card.css
│   │       ├── badge.css
│   │       ├── button.css
│   │       ├── form.css
│   │       ├── search.css
│   │       └── cookie-banner.css
│   ├── js/
│   │   ├── nav.js                      ← mobile menu toggle
│   │   ├── search.js                   ← live search filter (client-side)
│   │   └── cookie.js                   ← cookie consent toast
│   └── images/
│       └── placeholder.svg             ← generic placeholder image
├── components/
│   ├── _nav.html                       ← reusable nav snippet (for reference)
│   └── _footer.html                    ← reusable footer snippet (for reference)
├── index.html                          ← Home
├── about.html                          ← About the Programme
├── news/
│   ├── index.html                      ← News listing
│   └── article.html                    ← Single article template
├── reconstruction-works/
│   ├── index.html                      ← Reconstruction Works listing
│   └── article.html                    ← Single Reconstruction Works article template
├── call-for-proposals/
│   ├── index.html                      ← CfP listing (empty state if none active)
│   └── detail.html                     ← Single CfP detail template
├── partners.html                       ← Partners & Donors
├── contact.html                        ← Contact form
├── search.html                         ← Search results
├── privacy-policy.html
├── cookie-policy.html
├── accessibility.html
├── eu4r-design-system.css              ← source file (copy to assets/css/ too)
└── eu4r-styleguide.html                ← visual reference (open in browser)
```

---

### global.css

Create `assets/css/global.css` with:
- `@import './eu4r-design-system.css';` at the top
- CSS reset (box-sizing border-box, margin 0, padding 0)
- Base `body` styles: `font-family: var(--font-body)`, `color: var(--color-text-primary)`, `background: var(--color-bg-white)`
- A `.container` utility: `max-width: 1200px`, `margin: 0 auto`, `padding: 0 var(--space-6)`
- Responsive grid helper: `.grid-2`, `.grid-3`, `.grid-4` using CSS Grid with `gap: var(--space-6)`, collapsing to 1 column below 768px
- Skip-to-content link for accessibility

---

### Base HTML Template

Every HTML page must follow this template structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="[Page description — max 160 chars]" />
  <title>[Page Title] — EU4Reconstruction</title>
  <link rel="stylesheet" href="/assets/css/global.css" />
  <!-- Open Graph -->
  <meta property="og:title" content="[Page Title] — EU4Reconstruction" />
  <meta property="og:description" content="[Page description]" />
  <meta property="og:type" content="website" />
</head>
<body>
  <!-- Skip link -->
  <a class="skip-link" href="#main">Skip to main content</a>

  <!-- Navigation -->
  <header role="banner">
    <!-- nav component here -->
  </header>

  <!-- Main content -->
  <main id="main" role="main">
    <!-- page content here -->
  </main>

  <!-- Footer -->
  <footer role="contentinfo">
    <!-- footer component here -->
  </footer>

  <!-- Cookie consent toast -->
  <div id="cookie-banner" class="cookie-banner" role="alertdialog" aria-label="Cookie consent">
    <p>This site uses cookies. <a href="/cookie-policy.html">Learn more</a></p>
    <button class="btn btn--primary btn--sm" id="accept-cookies">Accept</button>
    <button class="btn btn--ghost btn--sm" id="decline-cookies">Decline</button>
  </div>

  <script src="/assets/js/nav.js"></script>
  <script src="/assets/js/cookie.js"></script>
</body>
</html>
```

---

### Navigation Component

Build the `<nav>` inside `<header>` with:
- **Logo**: EU4Reconstruction logotype (text-based placeholder until assets provided), linking to `/`
- **Primary nav links** (desktop horizontal, mobile hamburger):
  - About
  - News
  - Reconstruction Works
  - Call for Proposals
  - Partners
  - Contact
- **Search icon** — links to `/search.html`
- **Language switcher** — placeholder `EN` dropdown (UA, RU as options, non-functional for now)
- Active state: current page link gets `aria-current="page"` and an underline using `var(--color-yellow)`
- Background: `var(--color-navy)`, text: `var(--color-white)`
- Mobile: hamburger reveals a full-width dropdown, same navy background
- Use `nav.js` for the mobile toggle (vanilla JS, no libraries)

---

### Footer Component

Build the `<footer>` with:
- **Row 1**: EU4Reconstruction logo + short tagline + EU flag/emblem placeholder
- **Row 2**: Four columns — About, Quick Links, Streams (Stream 1 / Stream 2), Follow Us (social icon placeholders)
- **Row 3**: Legal links — Privacy Policy · Cookie Policy · Accessibility · © 2024–2026 EU4Reconstruction. All rights reserved.
- EU funding acknowledgment line: *"Funded by the European Union"*
- Background: `var(--color-navy)`, text: `var(--color-white)` / `var(--color-text-on-dark-muted)`

---

### Pages to Build

Build each page as a realistic prototype with real placeholder content — do not use Lorem Ipsum. Use plausible EU programme content.

#### `index.html` — Home
- **Hero**: Full-width, navy background, large white headline (UPPERCASE Montserrat Black), yellow CTA button "Explore Projects", bright-blue secondary CTA "Read News"
- **Statistics strip**: 4 stat cards — e.g. "€37M Committed", "4 Regions Supported", "120+ Projects", "2 Implementing Streams"
- **Latest News**: 3-column card grid, each card has category badge, headline, date, excerpt, "Read more" link
- **Reconstruction Works**: 2-column feature layout, image placeholder left, text right (and vice versa)
- **Active Call for Proposals**: Highlighted CfP card with deadline badge and yellow border
- **Partners strip**: Horizontal logo strip (placeholder boxes) for implementing partners and donors
- **Map section**: Placeholder `<div>` with note "Interactive map — regions covered" (Kharkiv, Mykolaiv, Kherson, Zaporizhzhia)

#### `about.html` — About the Programme
- Programme overview paragraph
- Two-column layout: Stream 1 (GIZ / Expertise France, navy) and Stream 2 (Denmark MFA / CPVA, yellow) cards
- Key objectives list
- Partners & implementing agencies section
- EU funding acknowledgment block

#### `news/index.html` — News Listing
- Page title + breadcrumb
- Filter bar: All · Press Release · Event · Project Update · Announcement (pill toggles, active = navy fill)
- 9-card grid (3×3), each card: category badge, image placeholder, title, date, 2-line excerpt
- Pagination: Previous / 1 2 3 … / Next

#### `news/article.html` — Single Article
- Breadcrumb: Home > News > [Article Title]
- Category badge + publish date
- Full-width article heading (H1, navy, uppercase)
- Body content area (prose styles)
- Author / source line
- Share buttons (Twitter/X, LinkedIn, Email — placeholder, no JS needed)
- "Related Articles" — 3-card row

#### `reconstruction-works/index.html` — Reconstruction Works Listing
- Same filter/grid pattern as News listing
- Filters: All · Infrastructure · Education · Healthcare · Housing · Energy
- Each card: stream badge (Stream 1 or Stream 2), region tag, title, short description

#### `reconstruction-works/article.html` — Single Project Article
- Project metadata sidebar: Status, Region, Sector, Budget, Implementing Agency, Stream
- Main content area: project description, objectives, progress
- Photo gallery placeholder (3-col grid of image boxes)

#### `call-for-proposals/index.html` — Call for Proposals
- **Active state**: Hero with deadline countdown (visual only — use a static date), CfP title card with yellow border, key dates table, eligibility summary, "How to Apply" button
- **Empty state** (comment out active state, show this when no active CfP): Centered icon + "No active calls at this time. Subscribe for updates." + email input

#### `call-for-proposals/detail.html` — CfP Detail
- Full CfP article layout
- Key dates table (Open date, Deadline, Results announcement)
- Eligibility criteria section
- Application process steps (numbered, navy circles)
- Downloads section (placeholder PDF links)
- Contact for queries block

#### `partners.html` — Partners
- Intro paragraph
- Two sections: Implementing Partners (Stream 1 / Stream 2) and Donors
- Logo grid placeholders with partner name beneath each

#### `contact.html` — Contact
- Two-column: form left, info right
- Form fields: Full Name, Organisation, Email, Subject (dropdown: General Inquiry / Media / Partnership / CfP Question), Message (textarea), GDPR checkbox
- On "success" show a green success message: "Your message has been sent. We'll be in touch within 5 working days." and a "Send another message" link
- Right column: address, email, social links

#### `search.html` — Search Results
- Search bar (large, full-width) with current query pre-filled as "reconstruction"
- Results summary: "12 results for "reconstruction""
- Result list: each item is title (linked, navy), URL breadcrumb (grey), excerpt with `<mark>` highlighting the search term
- No-results state: "No results found for "[query]". Try a different search term." (comment in, toggle by query)
- Pagination

#### `privacy-policy.html`, `cookie-policy.html`, `accessibility.html`
- Legal page layout: narrow max-width (760px), standard prose heading hierarchy, last updated date

---

### JavaScript

#### `nav.js`
Vanilla JS mobile hamburger toggle. Toggle `.nav--open` class on `<nav>`. Trap focus when open. Close on Escape key.

#### `cookie.js`
Show `#cookie-banner` unless `localStorage.getItem('eu4r_cookies_accepted')` is set. On Accept: set localStorage key to `'accepted'` and hide banner. On Decline: set to `'declined'` and hide banner.

#### `search.js`
On `search.html` only. Read `?q=` URL parameter, pre-fill the search input, and filter visible results by the query (simple `includes()` match on title and excerpt text).

---

### Accessibility Requirements (WCAG 2.1 AA)

- All images must have descriptive `alt` attributes (use `alt="[description]"` on placeholders)
- All form inputs must have `<label>` elements, not just placeholders
- Colour contrast must meet AA: white on navy ✓, navy on yellow ✓, navy on white ✓
- Focus indicators must be visible — use `outline: 3px solid var(--color-yellow)` on `:focus-visible`
- `aria-label`, `aria-current`, `role` attributes on interactive components as specified
- `lang="en"` on `<html>`

---

### Reference Documents

The following documents were produced during design and requirements phases. Keep them in a `/docs/` folder at project root for reference — do not serve them as web pages:

| File | Purpose |
|---|---|
| `EU4R_Information_Architecture.docx` | Full site map, URL schema, content types, page states |
| `EU4R_User_Flows.docx` | 8 user flows (visitor and CMS editor journeys) |
| `EU4R_PRD.docx` | ~65 functional and non-functional requirements |
| `EU4R_Tech_Stack_Proposal.docx` | Next.js + Payload CMS rationale for stakeholders |
| `EU4R_Technical_Proposal_Template.docx` | Tender response template for bidding agencies |
| `eu4r-design-system.css` | Full CSS design token system (use this actively) |
| `eu4r-styleguide.html` | Visual styleguide — open in browser for reference |

---

### Do Not

- Do not use any CSS frameworks (Bootstrap, Tailwind, etc.) — the design system CSS handles everything
- Do not use Lorem Ipsum — write plausible EU programme placeholder content
- Do not create a build system (no webpack, vite, etc.) — this is a pure HTML/CSS/vanilla JS prototype
- Do not add any analytics or tracking scripts yet
- Do not invent a logo — use a text placeholder `[EU4R LOGO]` inside a navy box until brand assets are provided

---

### First Steps

1. Create the full folder structure above
2. Copy `eu4r-design-system.css` into `assets/css/`
3. Create `global.css` with the reset and utilities
4. Build `_nav.html` and `_footer.html` components first — these repeat on every page
5. Build `index.html` (Home) as the primary design reference page
6. Then build remaining pages in the order listed above

Start now with step 1.
