import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import About from '../src/components/About.astro';
import { ui } from '../src/i18n/ui';

// Astro escapes apostrophes in text, so decode the markup before comparing.
const decode = (html: string) =>
	html.replaceAll('&#39;', "'").replaceAll('&amp;', '&');

const skillTitles = [
	'skills.symfony.title',
	'skills.java.title',
	'skills.db.title',
	'skills.tooling.title',
] as const;

test('About renders the French section with its anchor and heading', async () => {
	const container = await AstroContainer.create();
	const html = decode(
		await container.renderToString(About, { props: { lang: 'fr' } }),
	);

	expect(html).toMatch(/<section[^>]*id="about"/);
	expect(html).toMatch(
		new RegExp(`<h2[^>]*id="about-title"[^>]*>\\s*${ui.fr['about.title']}`),
	);
	expect(html).toContain(ui.fr['about.p1']);
	expect(html).toContain(ui.fr['about.p2']);
	expect(html).toContain(ui.fr['about.chip.search']);
	expect(html).not.toContain(ui.en['about.p1']);
});

test('About renders English text for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = decode(
		await container.renderToString(About, { props: { lang: 'en' } }),
	);

	expect(html).toContain(ui.en['about.title']);
	expect(html).toContain(ui.en['about.p2']);
	expect(html).toContain(ui.en['skills.title']);
	expect(html).not.toContain(ui.fr['about.p2']);
});

test('Skills timeline lists every skill in order', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(About, {
		props: { lang: 'fr' },
	});

	const titles = [...html.matchAll(/<h4[^>]*>([^<]*)<\/h4>/g)].map((match) =>
		match[1].trim(),
	);
	expect(titles).toEqual(skillTitles.map((key) => ui.fr[key]));
});
