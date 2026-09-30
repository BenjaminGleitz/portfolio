import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import About from '../src/components/About.astro';
import { skills } from '../src/data/skills';
import { ui } from '../src/i18n/ui';

// Astro escapes apostrophes in text, so decode the markup before comparing.
const decode = (html: string) =>
	html.replaceAll('&#39;', "'").replaceAll('&amp;', '&');

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
	expect(html).toContain(ui.en['skills.deploy.title']);
	expect(html).not.toContain(ui.fr['about.p2']);
});

test('Skills are grouped in cards with every item in order', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(About, {
		props: { lang: 'fr' },
	});

	const titles = [...html.matchAll(/<h3[^>]*>([^<]*)<\/h3>/g)].map((match) =>
		match[1].trim(),
	);
	expect(titles).toEqual(
		skills.map((group) => ui.fr[`skills.${group.id}.title`]),
	);
	for (const item of skills.flatMap((group) => group.items)) {
		expect(html).toMatch(new RegExp(`<li[^>]*>\\s*${item}\\s*</li>`));
	}
});
