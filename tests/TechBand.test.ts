import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import TechBand from '../src/components/TechBand.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

test('TechBand lists every technology in order', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(TechBand, {
		props: { lang: 'fr' },
	});

	const items = [...html.matchAll(/<li[^>]*>([^<]*)<\/li>/g)].map((match) =>
		match[1].trim(),
	);
	expect(items).toEqual(profile.techs);
});

test('TechBand labels the section in the page language', async () => {
	const container = await AstroContainer.create();

	for (const lang of ['fr', 'en'] as const) {
		const html = await container.renderToString(TechBand, {
			props: { lang },
		});
		expect(html).toMatch(
			new RegExp(`<section[^>]*aria-label="${ui[lang]['techBand.label']}"`),
		);
	}
});
