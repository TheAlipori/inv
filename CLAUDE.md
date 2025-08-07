# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static site generator for creating personalized quinceañera invitations. The site uses a content-driven approach where each invitation is defined as a Markdown file with YAML frontmatter containing event details, and the UI is built with Astro components and Tailwind CSS.

## Commands

All commands should be run from the project root:

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview built site locally
- `npm install` - Install dependencies

## Architecture

### Content Structure
- Invitations are stored as Markdown files in `src/content/xv/`
- Each invitation contains YAML frontmatter with event data (quinceañera details, dates, venues, family members, images, colors)
- The content collection system uses Astro's `getCollection` and `getEntryBySlug` for data access

### Page Generation
- Dynamic routes use `[slug].astro` files with `getStaticPaths()` to generate static pages for each invitation
- Main invitation route: `src/pages/xv/divina/[slug].astro`
- Template variants can be created by adding new folders under `src/pages/xv/`

### Component Organization
- Components are organized by theme: `src/components/xv/divina/` for the current "divina" theme
- Each theme has its own set of components: Hero, Welcome, Date, Detalles, Galeria, Asistencia, Wishlist, Reproductor
- Icons are stored in `src/assets/icons/` and theme-specific `src/components/xv/{theme}/icons/`

### Styling
- Global styles in `src/styles/global.css`
- Uses Tailwind CSS via `@tailwindcss/vite` plugin
- Color schemes are configurable per invitation via frontmatter (`colorPrimario`, `colorBackground`)

### Assets
- Images stored in `public/quinceanera/{name}/` folders
- Audio files (background music) in `public/`
- SVG icons and assets in `src/assets/`

### Key Files
- `src/layouts/Layout.astro` - Base HTML layout template
- `src/js/main.js` - Client-side JavaScript
- `astro.config.mjs` - Astro configuration with Tailwind integration
- `tsconfig.json` - TypeScript configuration extending Astro strict settings

## Development Notes

- Uses AOS (Animate On Scroll) library for animations
- Font loading via Fontsource packages for consistent typography
- Static site generation means all invitation data must be available at build time
- WhatsApp integration for RSVP functionality