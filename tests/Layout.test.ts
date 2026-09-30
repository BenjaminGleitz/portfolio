import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Layout from '../src/layouts/Layout.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

const site = 'https://benjamin-gleitz.com';

test('Layout renders its slot content after the skip link', async () => {
	const container = await AstroContainer.create({ astroConfig: { site } });
	const html = await container.renderToString(Layout, {
		props: { lang: 'fr' },
		slots: { default: '<p>Hello</p>' },
	});

	// Scoped styles and dev tooling add data-* attributes, so match tags loosely.
	expect(html).toMatch(/<html lang="fr"[^>]*>/);
	expect(html).toMatch(
		new RegExp(`<a href="#main"[^>]*>\\s*${ui.fr['a11y.skip']}\\s*</a>`),
	);
	expect(html).toMatch(/<p>Hello<\/p>\s*<\/body>/);
});

test('Layout sets a translated title, description and share preview', async () => {
	const container = await AstroContainer.create({ astroConfig: { site } });

	for (const lang of ['fr', 'en'] as const) {
		const html = await container.renderToString(Layout, { props: { lang } });
		const title = `${profile.name} — ${ui[lang]['hero.title']}`;
		expect(html).toContain(`<title>${title}</title>`);
		expect(html).toMatch(
			new RegExp(
				`<meta name="description" content="${ui[lang]['meta.description']}"`,
			),
		);
		expect(html).toMatch(
			new RegExp(`<meta property="og:title" content="${title}"`),
		);
		expect(html).toMatch(
			new RegExp(`<meta property="og:image" content="${site}/og.png"`),
		);
	}
});

test('Layout links both language versions with hreflang', async () => {
	const container = await AstroContainer.create({ astroConfig: { site } });
	const html = await container.renderToString(Layout, {
		props: { lang: 'en' },
	});

	expect(html).toMatch(new RegExp(`<link rel="canonical" href="${site}/en/"`));
	expect(html).toMatch(new RegExp(`hreflang="fr" href="${site}/"`));
	expect(html).toMatch(new RegExp(`hreflang="en" href="${site}/en/"`));
	expect(html).toMatch(new RegExp(`hreflang="x-default" href="${site}/"`));
	expect(html).not.toContain('noindex');
});

test('Layout marks noindex pages and skips canonical links', async () => {
	const container = await AstroContainer.create({ astroConfig: { site } });
	const html = await container.renderToString(Layout, {
		props: { lang: 'fr', title: '404', noindex: true },
	});

	expect(html).toContain('<title>404</title>');
	expect(html).toMatch(/<meta name="robots" content="noindex"/);
	expect(html).not.toContain('rel="canonical"');
	expect(html).not.toContain('hreflang');
});
