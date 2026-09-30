import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Contact from '../src/components/Contact.astro';
import { profile } from '../src/data/profile';
import { ui } from '../src/i18n/ui';

test('Contact renders the French section with its anchor and text', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Contact, {
		props: { lang: 'fr' },
	});

	expect(html).toMatch(/<section[^>]*id="contact"/);
	expect(html).toMatch(/<h2[^>]*id="contact-title"/);
	expect(html).toContain(ui.fr['contact.text']);
	expect(html).toContain(ui.fr['contact.cvLink']);
	expect(html).not.toContain(ui.en['contact.text']);
});

test('Contact renders English text for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Contact, {
		props: { lang: 'en' },
	});

	expect(html).toContain(ui.en['contact.text']);
	expect(html).toContain(ui.en['contact.cvLink']);
	expect(html).not.toContain(ui.fr['contact.cvLink']);
});

test('Contact links email, LinkedIn, GitHub and the CV', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Contact, {
		props: { lang: 'fr' },
	});

	expect(html).toMatch(new RegExp(`<a[^>]*href="mailto:${profile.email}"`));
	for (const url of [profile.linkedin, profile.github]) {
		const link = html.match(new RegExp(`<a[^>]*href="${url}"[^>]*>`))?.[0];
		expect(link).toMatch(/target="_blank"/);
		expect(link).toMatch(/rel="noreferrer"/);
	}
	expect(html).toMatch(new RegExp(`<a[^>]*href="${profile.cv}"[^>]*download`));
	// URLs are displayed without protocol, "www." or trailing slash.
	expect(html).toContain('linkedin.com/in/benjamin-gleitz-bab1b5159<');
	expect(html).toContain('github.com/BenjaminGleitz<');
});
