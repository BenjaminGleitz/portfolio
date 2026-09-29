import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Layout from '../src/layouts/Layout.astro';

test('Layout renders its slot content inside the page body', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Layout, {
		props: { lang: 'fr' },
		slots: { default: '<p>Hello</p>' },
	});

	// Scoped styles and dev tooling add data-* attributes, so match tags loosely.
	expect(html).toMatch(/<html lang="fr"[^>]*>/);
	expect(html).toMatch(/<body[^>]*>\s*<p>Hello<\/p>\s*<\/body>/);
});
