import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Hero from '../src/components/Hero.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

// Astro escapes apostrophes and "&" in text, so decode the markup before comparing.
const decode = (html: string) =>
	html.replaceAll('&#39;', "'").replaceAll('&amp;', '&');

test('Hero renders the French text with the name inside the h1', async () => {
	const container = await AstroContainer.create();
	const html = decode(
		await container.renderToString(Hero, { props: { lang: 'fr' } }),
	);

	const intro = ui.fr['hero.intro'].replace('{name}', profile.name);
	const h1 = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/)?.[0];
	expect(h1).toContain(intro);
	expect(h1).toContain(ui.fr['hero.title']);
	expect(h1).toContain(ui.fr['hero.titleAccent']);
	expect(html).toContain(ui.fr['hero.lead']);
	expect(html).toContain(ui.fr['hero.available']);
	expect(html).not.toContain('{name}');
	expect(html).not.toContain(ui.en['hero.lead']);
});

test('Hero renders English text for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = decode(
		await container.renderToString(Hero, { props: { lang: 'en' } }),
	);

	expect(html).toContain(ui.en['hero.intro'].replace('{name}', profile.name));
	expect(html).toContain(ui.en['hero.titleAccent']);
	expect(html).toContain(ui.en['hero.cta.contact']);
	expect(html).not.toContain(ui.fr['hero.lead']);
});

test('Hero lists the main stack and links the three calls to action', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Hero, {
		props: { lang: 'fr' },
	});

	expect(html).toMatch(/<header[^>]*id="home"/);
	expect(html).toContain(profile.mainStack.join(' · '));
	for (const [href, key] of [
		['#projects', 'hero.cta.projects'],
		[profile.cv, 'hero.cta.cv'],
		['#contact', 'hero.cta.contact'],
	] as const) {
		expect(html).toMatch(
			new RegExp(`<a[^>]*href="${href}"[^>]*>\\s*${ui.fr[key]}`),
		);
	}
});

test('Hero shows the portrait with a translated alt, loaded first', async () => {
	const container = await AstroContainer.create();

	for (const lang of ['fr', 'en'] as const) {
		const html = await container.renderToString(Hero, { props: { lang } });
		const alt = ui[lang]['hero.photoAlt'].replace('{name}', profile.name);
		expect(html).toMatch(new RegExp(`<img[^>]*alt="${alt}"`));
		expect(html).toMatch(/<img[^>]*fetchpriority="high"/);
	}
});
