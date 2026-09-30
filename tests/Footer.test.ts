import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Footer from '../src/components/Footer.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

test('Footer shows the current year, the name and the translated tagline', async () => {
	const container = await AstroContainer.create();

	for (const lang of ['fr', 'en'] as const) {
		const html = await container.renderToString(Footer, { props: { lang } });
		expect(html).toMatch(/<footer/);
		expect(html).toContain(`© ${new Date().getFullYear()} ${profile.name}`);
		expect(html).toContain(ui[lang]['footer.made']);
	}
});
