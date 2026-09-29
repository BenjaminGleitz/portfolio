## Project status

Personal portfolio site, freshly scaffolded from the Astro "basics" starter (Astro 7, Node >= 22.12). `src/pages/index.astro` still renders the placeholder `Welcome.astro` component — expect to replace it (along with `src/assets/astro.svg`, `background.svg`, and the "Astro Basics" `<title>` in `Layout.astro`) as real content is added.

No integrations (React, Tailwind, MDX, etc.) or content collections are configured yet. `astro.config.mjs` is empty, so the site builds as fully static output. No database.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. The server runs at `localhost:4321`.

Other commands:

- `npm run build` — static production build to `./dist/`
- `npm run preview` — serve the built `./dist/` locally
- `npm test` — Vitest (single file: `npx vitest run tests/Layout.test.ts`; by name: `npx vitest run -t "<test name>"`)
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

`CLAUDE.md` imports this file; put shared guidance here, not in `CLAUDE.md`.

## Code conventions

- **No JS framework**: only `.astro` components and plain HTML/CSS. Client-side `<script>` only where unavoidable (FR/EN toggle, dark mode), kept minimal.
- **No hard-coded UI text**: every visible string comes from the FR/EN translation files, using Astro's built-in i18n routing — the site stays bilingual from the first component.
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
