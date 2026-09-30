import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Hero from '../src/components/Hero.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

// hero.intro contains an apostrophe in English, which Astro escapes — build the
// expected text from the French key, which has none.

test('Hero renders the French text with the name inside the h1', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Hero, {
		props: { lang: 'fr' },
	});

	const intro = ui.fr['hero.intro'].replace('{name}', profile.name);
	expect(html).toMatch(new RegExp(`<h1[^>]*>[\\s\\S]*${intro}[\\s\\S]*</h1>`));
	expect(html).toContain(ui.fr['hero.greeting']);
	expect(html).toContain(ui.fr['hero.title']);
	expect(html).toContain(ui.fr['hero.available']);
	expect(html).not.toContain('{name}');
	expect(html).not.toContain(ui.en['hero.title']);
});

test('Hero renders English text for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Hero, {
		props: { lang: 'en' },
	});

	expect(html).toContain(profile.name);
	expect(html).toContain(ui.en['hero.title']);
	expect(html).toContain(ui.en['hero.cta.projects']);
	expect(html).not.toContain(ui.fr['hero.title']);
});

test('Hero lists the main stack and links both calls to action', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Hero, {
		props: { lang: 'fr' },
	});

	expect(html).toMatch(/<header[^>]*id="home"/);
	for (const tech of profile.mainStack) {
		expect(html).toContain(tech);
	}
	expect(html).toMatch(
		new RegExp(
			`<a[^>]*href="#projects"[^>]*>\\s*${ui.fr['hero.cta.projects']}`,
		),
	);
	expect(html).toMatch(
		new RegExp(`<a[^>]*href="${profile.cv}"[^>]*>\\s*${ui.fr['hero.cta.cv']}`),
	);
});
