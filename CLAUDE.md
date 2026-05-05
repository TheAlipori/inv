# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static site generator for creating personalized digital invitations (quinceañeras and weddings). Each invitation is defined as a YAML file with event details, and the UI is built with Astro components and Tailwind CSS. The site supports multiple themes per event type.

## Commands

All commands should be run from the project root:

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview built site locally
- `npm install` - Install dependencies

**Important:** After adding new YAML content files or changing the schema in `src/content/config.ts`, always restart the dev server — Astro does not hot-reload new content files automatically.

## Architecture

### Content Structure
- Invitations are stored as **YAML files** (not Markdown) in `src/content/xv/` or `src/content/boda/`
- Each YAML file contains event data: quinceañera/couple details, dates, venues, family members, colors, music
- The `tema` field in each YAML determines which theme/page renders it
- The content collection schema is defined in `src/content/config.ts` using Zod
- Fields that are not needed by a theme should be marked `.optional()` in the schema

### Themes Available
- `src/pages/xv/divina/` — XV theme with photos, full scroll
- `src/pages/xv/floral/` — XV theme with photos, components in `src/components/xv/floral/`
- `src/pages/xv/justgreenfloral/` — XV theme **without photos**, snap scroll, components in `src/components/xv/justfloral/`
- `src/pages/boda/clasica/` — Wedding theme

### Creating a New Theme
1. Add a new folder under `src/pages/xv/` or `src/pages/boda/`
2. Create `[slug].astro` inside it with `getStaticPaths()` filtering by `tema` field:
   ```js
   const filtered = entries.filter((e) => e.data.tema === "your-theme-name");
   ```
3. Create a matching component folder under `src/components/xv/` or `src/components/boda/`
4. Create YAML files in `src/content/xv/` with `tema: "your-theme-name"`

### Page Generation
- Dynamic routes use `[slug].astro` with `getStaticPaths()` — each theme filters only its own entries via the `tema` field
- The slug matches the YAML filename (e.g. `flor.yaml` → `/xv/justgreenfloral/flor`)

### Component Organization
- Components are organized by theme: `src/components/xv/{theme}/`
- Note: the `justgreenfloral` page uses components from `src/components/xv/justfloral/` (shorter name)
- Shared icons: `src/assets/icons/` — includes `Ornamento1.astro`, `Ornamento2.astro`, `Ornamento3.astro`, `SalonIcon.astro`, `VestimentaIcon.astro`, etc. All accept `{...Astro.props}` so you can pass `style`, `class`, `fill` directly.

### justgreenfloral Theme — Snap Scroll Pattern
This theme uses full-page snap scroll instead of traditional scroll:
- The snap container is `#snap-container` with `scroll-snap-type: y mandatory` and `h-screen overflow-y-scroll`
- Each section has `h-screen` and `scroll-snap-align: start`
- Components inside sections use `h-full` (not `h-screen`) to fill their parent
- Navigation dots on the right side track active section via `IntersectionObserver` with `root: container`
- **AOS quirk:** AOS listens to `window.scroll`, not the container scroll. To trigger AOS animations in snap sections, the IntersectionObserver manually adds `aos-animate` class to `[data-aos]` elements when a section becomes active. Do NOT rely on `window.dispatchEvent(new Event("scroll"))` — it doesn't work reliably. Use the manual class approach instead.
- Background image: `position: fixed` div with `max-w-[768px] mx-auto` behind the snap container

### Styling
- Global styles in `src/styles/global.css`
- Uses Tailwind CSS via `@tailwindcss/vite` plugin
- Color schemes configurable per invitation via YAML fields (`color_primario`, `color_secundario`, `colorBackground`, etc.)
- Max width for mobile-first themes: `max-w-[768px]`

### Assets
- Theme background images: `public/{theme}/` (e.g. `public/justgreenfloral/greenflower.webp`)
- Per-invitation photos: `public/quinceanera/{name}/` folders
- Audio files: `public/{theme}/cancion.mp3` or `public/cancion.mp3`
- SVG icons and ornaments: `src/assets/icons/`

### Key Files
- `src/layouts/Layout.astro` — Base HTML layout with Open Graph meta tags; shared by all themes
- `src/content/config.ts` — Zod schema for all content collections; edit here to add/remove fields
- `src/js/main.js` — AOS initialization (exposed as `window.AOS` for manual refresh)
- `astro.config.mjs` — Astro configuration with Tailwind integration
- `tsconfig.json` — TypeScript configuration

## Development Notes

### Fonts
- Uses Fontsource packages (`@fontsource/great-vibes`, `@fontsource/josefin-sans`, etc.)
- Import fonts in the component frontmatter: `import "@fontsource/great-vibes"`
- TypeScript will show "Cannot find module" warnings for Fontsource imports — these are **harmless**, the fonts load correctly
- justgreenfloral theme uses: **Great Vibes** (script/cursive titles) + **Josefin Sans** (uppercase labels)

### AOS (Animate On Scroll)
- Initialized in `src/js/main.js` with `once: true, offset: 50`
- Exposed globally as `window.AOS`
- In snap scroll themes, AOS does NOT auto-trigger on section change — must manually add `aos-animate` class via IntersectionObserver

### WhatsApp RSVP
- WhatsApp number stored in YAML as `whatsapp: "521XXXXXXXXXX"` (international format, no +)
- URL format: `https://wa.me/{number}?text={encodedMessage}`

### Content Schema
- All fields that are theme-specific or optional should use `.optional()` in `config.ts`
- The `imagenes` object is `.optional()` to support themes without photos (like justgreenfloral)
- Adding new fields: update `config.ts` schema first, then use in YAML and components
