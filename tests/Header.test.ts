import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Header from '../src/components/Header.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

// header.title contains "&", which Astro escapes to "&amp;" — assert on header.goal instead.

test('Header renders the name and French text for lang "fr"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Header, {
		props: { lang: 'fr' },
	});

	expect(html).toMatch(new RegExp(`<h1[^>]*>${profile.name}</h1>`));
	expect(html).toContain(ui.fr['header.goal']);
	expect(html).not.toContain(ui.en['header.goal']);
});

test('Header renders English text for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Header, {
		props: { lang: 'en' },
	});

	expect(html).toContain(profile.name);
	expect(html).toContain(ui.en['header.goal']);
	expect(html).not.toContain(ui.fr['header.goal']);
});
