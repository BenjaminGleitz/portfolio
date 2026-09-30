## Project status

Personal portfolio site (Astro 7, Node >= 22.12), bilingual FR/EN. Pages `src/pages/index.astro` (fr, `/`) and `src/pages/en/index.astro` (en, `/en/`) are identical: each resolves its language with `getLang(Astro.currentLocale)` and passes it as the `lang` prop to `Layout` and every section component, which call `useTranslations(lang)` from `src/i18n/utils.ts`.

`astro.config.mjs` configures i18n routing (`fr` default, unprefixed) and Tailwind CSS v4 via the `@tailwindcss/vite` plugin; the stylesheet is `src/styles/global.css` (`@import 'tailwindcss'`, theme tokens in `@theme`), imported once in `Layout.astro`. No content collections yet. Fully static output, no database.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. The server runs at `localhost:4321`.

Other commands:

- `npm run build` — static production build to `./dist/`
- `npm run preview` — serve the built `./dist/` locally
- `npm test` — Vitest (single file: `npx vitest run tests/Header.test.ts`; by name: `npx vitest run -t "<test name>"`)
- `npm run lint` — `astro check` (type-check `.astro`/`.ts`) then `prettier --check .`
- `npm run format` — rewrite files with Prettier (tabs, single quotes, `prettier-plugin-astro`)
- `npx astro add <integration>` — add integrations (e.g. `tailwind`); updates `astro.config.mjs` and `package.json` for you

TypeScript uses `astro/tsconfigs/strict`.

Tests live in `tests/*.test.ts`. `vitest.config.ts` wraps Astro's `getViteConfig()` so `.astro` files can be imported; components are rendered to HTML strings with `experimental_AstroContainer` from `astro/container` (no dev server needed). Rendered markup carries scoped-style `data-astro-*` attributes, so assert with loose regexes rather than exact tags.

## Architecture

- `src/pages/` — file-based routing; every `.astro`/`.md` file here becomes a route.
- `src/layouts/Layout.astro` — the single HTML shell (`<head>`, favicon, global `html/body` reset); pages wrap content in `<Layout>` and it renders them via `<slot />`.
- `src/components/` — reusable `.astro` components. `<style>` blocks in `.astro` files are component-scoped by default.
- `src/assets/` — imported assets processed by Astro (use `import x from '../assets/x.svg'` then `x.src`); `public/` — files served verbatim at the site root.

Design reference: `docs/design/Portfolio.html` (Claude Design export — open it in a browser; desktop 1440 and mobile 390 mockups plus annotated wireframes). Follow it for layout, colors, typography, and section order.

`CLAUDE.md` imports this file; put shared guidance here, not in `CLAUDE.md`.

## Code conventions

- **No JS framework**: only `.astro` components and plain HTML/CSS. Client-side `<script>` only where unavoidable (FR/EN toggle, dark mode), kept minimal.
- **No hard-coded UI text**: the site stays bilingual from the first component, using Astro's built-in i18n routing (`fr` default at `/`, `en` at `/en/`).
  - Text that differs by language (sentences, headings, labels) goes in `src/i18n/ui.ts`, with every key present in both `fr` and `en`. A sentence containing a proper noun stays whole in `ui.ts` — don't split it.
  - Data identical in every language (name, email, GitHub/LinkedIn URLs, technology names) goes once in `src/data/` (e.g. `src/data/profile.ts`), not duplicated per language.
- **Typed props**: every component that takes props declares `interface Props`.
- **One test per component**: each new component gets at least one Vitest test in `tests/` rendering it through the Container API.
- **Add integrations with `npx astro add <name>`**, never by hand-editing `astro.config.mjs`/`package.json`.
- **Official first**: prefer official/first-party Astro packages over third-party alternatives when one fits the need — but don't force an ill-fitting official one.
- **Follow documented patterns**: when the Astro docs prescribe a pattern for a need (i18n routing, content collections, `<Image />` for images, layouts, middleware…), use it rather than a custom equivalent. When unsure, check the docs before implementing.

## Git workflow

- Reference branch: `develop`. `main` receives only merges from `develop`.
- Branch names: `feature/<name>` or `fix/<name>`, always created from an up-to-date `develop`: `git checkout develop && git fetch origin develop && git pull`, then `git checkout -b feature/<name>`.
- No direct commits on `develop` or `main` (enforced by a PreToolUse hook in `.claude/settings.json`).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
