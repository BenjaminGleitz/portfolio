## Project status

Personal portfolio site, freshly scaffolded from the Astro "basics" starter (Astro 7, Node >= 22.12). `src/pages/index.astro` still renders the placeholder `Welcome.astro` component — expect to replace it (along with `src/assets/astro.svg`, `background.svg`, and the "Astro Basics" `<title>` in `Layout.astro`) as real content is added.

No integrations (React, Tailwind, MDX, etc.), content collections, test runner, or linter are configured yet. `astro.config.mjs` is empty, so the site builds as fully static output.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. The server runs at `localhost:4321`.

Other commands:

- `npm run build` — static production build to `./dist/`
- `npm run preview` — serve the built `./dist/` locally
- `npx astro add <integration>` — add integrations (e.g. `react`, `tailwind`, `mdx`); updates `astro.config.mjs` for you
- `npx astro check` — type-check `.astro` files (prompts to install `@astrojs/check` on first run)

TypeScript uses `astro/tsconfigs/strict`.

## Architecture

- `src/pages/` — file-based routing; every `.astro`/`.md` file here becomes a route.
- `src/layouts/Layout.astro` — the single HTML shell (`<head>`, favicon, global `html/body` reset); pages wrap content in `<Layout>` and it renders them via `<slot />`.
- `src/components/` — reusable `.astro` components. `<style>` blocks in `.astro` files are component-scoped by default.
- `src/assets/` — imported assets processed by Astro (use `import x from '../assets/x.svg'` then `x.src`); `public/` — files served verbatim at the site root.

`CLAUDE.md` imports this file; put shared guidance here, not in `CLAUDE.md`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
