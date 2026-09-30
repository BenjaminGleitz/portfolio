import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import NotFound from '../src/pages/404.astro';
import { ui } from '../src/i18n/ui';

const site = 'https://benjamin-gleitz.com';

// The French strings use typographic apostrophes (’), which Astro does not escape.

test('404 page shows the message in both languages with links home', async () => {
	const container = await AstroContainer.create({ astroConfig: { site } });
	const html = await container.renderToString(NotFound);

	expect(html).toMatch(/<meta name="robots" content="noindex"/);
	expect(html).toMatch(/<main[^>]*id="main"/);
	expect(html).toContain(ui.fr['notFound.title']);
	expect(html).toContain(ui.en['notFound.title']);
	expect(html).toMatch(/<a href="\/"[^>]*>\s*Retour à l’accueil/);
	expect(html).toMatch(/<a href="\/en\/"[^>]*lang="en"[^>]*>\s*Back to home/);
});
