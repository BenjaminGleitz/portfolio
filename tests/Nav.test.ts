import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from '../src/components/Nav.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

test('Nav renders the name and French labels for lang "fr"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Nav, {
		props: { lang: 'fr' },
	});

	expect(html).toContain(profile.name);
	expect(html).toMatch(
		new RegExp(`<nav[^>]*aria-label="${ui.fr['nav.label']}"`),
	);
	for (const key of [
		'nav.home',
		'nav.about',
		'nav.projects',
		'nav.contact',
	] as const) {
		expect(html).toContain(ui.fr[key]);
	}
	expect(html).not.toContain(ui.en['nav.label']);
});

test('Nav renders English labels for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Nav, {
		props: { lang: 'en' },
	});

	expect(html).toContain(ui.en['nav.label']);
	expect(html).toContain(ui.en['nav.projects']);
	expect(html).not.toContain(ui.fr['nav.label']);
});

test('Nav links each section anchor', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Nav, {
		props: { lang: 'fr' },
	});

	for (const id of ['home', 'about', 'projects', 'contact']) {
		expect(html).toMatch(new RegExp(`<a[^>]*href="#${id}"`));
	}
});

test('Language switcher links to each locale and marks the current one', async () => {
	const container = await AstroContainer.create();

	const fr = await container.renderToString(Nav, { props: { lang: 'fr' } });
	const frLink = fr.match(/<a[^>]*href="\/"[^>]*>/)?.[0];
	const enLink = fr.match(/<a[^>]*href="\/en\/"[^>]*>/)?.[0];
	expect(frLink).toMatch(/hreflang="fr"/);
	expect(frLink).toMatch(/aria-current="page"/);
	expect(enLink).toMatch(/hreflang="en"/);
	expect(enLink).not.toMatch(/aria-current/);

	const en = await container.renderToString(Nav, { props: { lang: 'en' } });
	expect(en.match(/<a[^>]*href="\/en\/"[^>]*>/)?.[0]).toMatch(
		/aria-current="page"/,
	);
	expect(en.match(/<a[^>]*href="\/"[^>]*>/)?.[0]).not.toMatch(/aria-current/);
});

test('Menu button controls the section list and starts closed', async () => {
	const container = await AstroContainer.create();

	for (const lang of ['fr', 'en'] as const) {
		const html = await container.renderToString(Nav, { props: { lang } });
		const button = html.match(/<button[^>]*>/)?.[0];
		expect(button).toMatch(/aria-expanded="false"/);
		expect(button).toMatch(/aria-controls="nav-menu"/);
		expect(button).toMatch(new RegExp(`aria-label="${ui[lang]['nav.menu']}"`));
		expect(html).toMatch(/<ul[^>]*id="nav-menu"/);
	}
});
