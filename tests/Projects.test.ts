import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Projects from '../src/components/Projects.astro';
import { projects } from '../src/data/projects';
import { ui } from '../src/i18n/ui';

test('Projects renders every project title in order under the section anchor', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Projects, {
		props: { lang: 'fr' },
	});

	expect(html).toMatch(/<section[^>]*id="projects"/);
	expect(html).toMatch(
		new RegExp(
			`<h2[^>]*id="projects-title"[^>]*>\\s*${ui.fr['projects.title']}`,
		),
	);
	const titles = [...html.matchAll(/<h3[^>]*>([^<]*)<\/h3>/g)].map((match) =>
		match[1].trim(),
	);
	expect(titles).toEqual(
		projects.map((project) => ui.fr[`projects.${project.id}.title`]),
	);
});

test('Projects renders English text for lang "en"', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Projects, {
		props: { lang: 'en' },
	});

	expect(html).toContain(ui.en['projects.title']);
	expect(html).toContain(ui.en['projects.budget.desc']);
	expect(html).not.toContain(ui.fr['projects.budget.desc']);
});

test('Projects lists tags and only renders the links a project has', async () => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Projects, {
		props: { lang: 'fr' },
	});

	for (const tag of projects.flatMap((project) => project.tags)) {
		expect(html).toContain(tag);
	}
	const count = (text: string) => html.split(text).length - 1;
	expect(count(ui.fr['projects.code'])).toBe(
		projects.filter((project) => project.repo).length,
	);
	expect(count(ui.fr['projects.demo'])).toBe(
		projects.filter((project) => project.demo).length,
	);
});
