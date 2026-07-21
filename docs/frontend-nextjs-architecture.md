# Frontend Architecture — Next.js Migration

## Overview

Migrate `frontend/index.html` (single-file HTML/CSS/JS) into a structured Next.js application under `frontend/`. The goal is complete feature parity — every section, modal, interaction, and responsive behavior — with a scalable, maintainable component architecture.

---

## File Structure

```
frontend/
├── public/
│   └── images/                  # All existing images (SVGs, JPGs)
│       ├── portfolio-*.jpg
│       ├── team-*.jpg
│       ├── blog-*.jpg
│       ├── ongoing-*.jpg
│       └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout: fonts, metadata, theme provider
│   │   ├── page.tsx             # Main page — assembles all sections
│   │   └── globals.css          # CSS variables, resets, theme tokens
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Fixed nav, scroll spy, hamburger, lang toggle
│   │   │   ├── Footer.tsx       # Footer grid: brand, links, services, contact
│   │   │   └── ThemeToggle.tsx  # Moon/sun icon, data-theme toggle, localStorage
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Slideshow (crossfade), left text, right image strip
│   │   │   ├── About.tsx        # Image + text, values grid
│   │   │   ├── Services.tsx     # 6 service cards → modal
│   │   │   ├── Team.tsx         # 4 team cards with avatars
│   │   │   ├── Portfolio.tsx    # Selected work grid → portfolio modal
│   │   │   ├── Ongoing.tsx      # In-progress cards → ongoing modal
│   │   │   ├── Blog.tsx         # Blog cards → blog modal
│   │   │   └── Contact.tsx      # Info panel + form + map
│   │   ├── cards/
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── TeamCard.tsx
│   │   │   ├── PortfolioCard.tsx
│   │   │   ├── OngoingCard.tsx
│   │   │   └── BlogCard.tsx
│   │   ├── modals/
│   │   │   ├── ServiceModal.tsx       # Service detail modal
│   │   │   ├── PortfolioModal.tsx     # Two-column: gallery left, content right
│   │   │   ├── OngoingModal.tsx       # Two-column: gallery left, content + progress right
│   │   │   └── BlogModal.tsx          # Single-column: hero image + article body
│   │   ├── ui/
│   │   │   ├── Button.tsx             # Pill button: .btn, .btn-primary
│   │   │   ├── SectionTitle.tsx       # h2 + subtitle wrapper
│   │   │   ├── ProgressBar.tsx        # Animated fill bar + label
│   │   │   ├── TagBadge.tsx           # Pill badge (category, status)
│   │   │   ├── TechStack.tsx          # Row of tech tag pills
│   │   │   ├── ResourceLink.tsx       # Icon + label link pill
│   │   │   ├── Gallery.tsx           # Scrollable image gallery (used in modals)
│   │   │   └── SocialIcons.tsx        # LinkedIn, Facebook, Twitter, Instagram
│   │   └── providers/
│   │       └── ThemeProvider.tsx  # Reads/writes data-theme, manages dark/light
│   ├── hooks/
│   │   ├── useScrollSpy.ts       # IntersectionObserver → active nav link
│   │   ├── useFadeIn.ts          # IntersectionObserver → fade-up animation
│   │   ├── useTheme.ts           # Dark mode state + localStorage
│   │   └── useLanguage.ts        # EN/AM toggle + translations
│   ├── data/
│   │   ├── services.ts           # servicesData array
│   │   ├── portfolio.ts          # portfolioData array
│   │   ├── ongoing.ts            # ongoingData array
│   │   ├── blog.ts               # blogData array
│   │   ├── team.ts               # team members
│   │   ├── values.ts             # company values
│   │   └── translations.ts       # EN/AM key-value pairs
│   └── lib/
│       └── utils.ts              # cn() class merge, formatters
├── next.config.ts
├── tsconfig.json
├── package.json
└── tailwind.config.ts            # (optional — pure CSS modules also work)
```

---

## Component Hierarchy

```
layout.tsx
├── <ThemeProvider>
│   ├── <Navbar>
│   │   ├── Logo
│   │   ├── NavLinks (scroll spy active state)
│   │   ├── ThemeToggle
│   │   ├── LangToggle
│   │   └── Hamburger (mobile)
│   ├── <main>
│   │   ├── <Hero>
│   │   │   ├── Left panel (headline, subtitle, CTA)
│   │   │   └── Right panel (slideshow: 5 images, crossfade)
│   │   ├── <About>
│   │   │   ├── Image panel
│   │   │   ├── Text panel
│   │   │   └── <ValuesGrid>
│   │   │       └── ValueCard × 4
│   │   ├── <Services>
│   │   │   └── ServiceCard × 6
│   │   ├── <Team>
│   │   │   └── TeamCard × 4
│   │   ├── <Portfolio>
│   │   │   └── PortfolioCard × 3
│   │   ├── <Ongoing>
│   │   │   └── OngoingCard × 4
│   │   ├── <Blog>
│   │   │   └── BlogCard × 3
│   │   └── <Contact>
│   │       ├── ContactInfo (address, phone, email, social)
│   │       ├── ContactForm
│   │       └── Map (Leaflet)
│   ├── <ServiceModal>
│   ├── <PortfolioModal>
│   ├── <OngoingModal>
│   ├── <BlogModal>
│   └── <Footer>
```

---

## Data Flow

- All content data lives in `src/data/*.ts` as typed arrays/objects
- Sections import their data and pass it down to card components
- Modals receive an `index` prop (or the full object) via a callback or URL state
- Theme state is managed in `<ThemeProvider>` via React context + localStorage
- Language state is managed via React context; components use `useLanguage()` to get translated strings

### Modal Pattern

Each section has a corresponding modal. Open state can be managed with:
- **Option A**: URL query params (`?modal=portfolio&index=2`) — shareable, back-button friendly
- **Option B**: React state in the page component — simpler, faster

Recommended: URL-based for portfolio/ongoing/blog (deep-linkable), state-based for service modal.

---

## Design System Tokens

Define in `globals.css` as CSS custom properties (same as current HTML):

```css
:root {
  --primary: #FE6811;
  --text: #111;
  --text-subtle: #555;
  --text-faint: #999;
  --text-muted: #777;
  --bg: #fff;
  --bg-alt: #f8f8f8;
  --card-bg: #fff;
  --border: #eee;
  --border-light: #ddd;
  --shadow: rgba(0,0,0,.04);
}

[data-theme="dark"] {
  --text: #eee;
  --text-subtle: #aaa;
  --text-faint: #666;
  --text-muted: #888;
  --bg: #0a0a0a;
  --bg-alt: #111;
  --card-bg: #151515;
  --border: #222;
  --border-light: #333;
  --shadow: rgba(0,0,0,.3);
}
```

---

## Animation Strategy

- **Fade-up on scroll**: use a custom `useFadeIn` hook with IntersectionObserver
- **Modal open/close**: CSS transitions on `opacity` + `scale` with a portal
- **Slideshow**: `useEffect` interval with `opacity` crossfade between images
- **Hover effects**: CSS `transition` on `transform`, `border-color`, `box-shadow`

---

## Key Implementation Notes

| Feature | Implementation |
|---|---|
| Nav scroll spy | `useScrollSpy` hook observes `section[id]`, applies `.active` class to matching anchor |
| Theme toggle | `useTheme` hook reads `localStorage`, sets `data-theme` on `<html>` |
| Language switch | `useLanguage` hook swaps nav labels using `data-key` attributes |
| Progress bars | CSS `width` transition driven by inline style or state |
| Image gallery | CSS `overflow-y: auto` with thin scrollbar in a fixed-height container |
| Map | Leaflet loaded dynamically (lazy) to avoid SSR issues |
| Responsive | CSS Grid with `repeat(auto-fit, minmax(...))` + media queries at 768px |
| Modals | React portal rendered at document body, closed by overlay click / Escape key |

---

## Migration Steps

1. `npx create-next-app@latest frontend --typescript`
2. Copy `images/` to `public/images/`
3. Extract CSS variables and resets into `globals.css`
4. Build `ui/` primitives (Button, SectionTitle, etc.)
5. Build `layout/` components (Navbar, Footer, ThemeProvider)
6. Build `cards/` for each section
7. Build `sections/` composing cards together
8. Build `modals/` using React portals
9. Extract all data into `data/` files
10. Add `hooks/` for scroll spy, fade-in, theme, language
11. Test all interactions: modals, theme toggle, language switch, scroll spy, form
