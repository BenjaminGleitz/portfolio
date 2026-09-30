import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Clouds from '../src/components/Clouds.astro';

test('Clouds renders five decorative clouds hidden from screen readers', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Clouds);

	const clouds = html.match(/<span[^>]*>/g) ?? [];
	expect(clouds).toHaveLength(5);
	for (const cloud of clouds) {
		expect(cloud).toMatch(/aria-hidden="true"/);
		// Each cloud sets its own speed and a negative delay so they start spread out.
		expect(cloud).toMatch(/animation-duration:\d+s;animation-delay:-\d+s/);
	}
});
