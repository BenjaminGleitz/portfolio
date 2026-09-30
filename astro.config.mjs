// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// URL publique : sert aux liens absolus (sitemap, canonical, hreflang, aperçus de partage).
	site: 'https://benjamin-gleitz.com',

	i18n: {
		defaultLocale: 'fr',
		locales: ['fr', 'en'],
	},

	vite: {
		plugins: [tailwindcss()],
	},

	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Montserrat',
			cssVariable: '--font-montserrat',
			weights: [300, 400, 500],
			fallbacks: ['sans-serif'],
		},
	],

	integrations: [
		sitemap({
			// Ajoute dans le sitemap le lien entre / et /en/ (hreflang).
			i18n: {
				defaultLocale: 'fr',
				locales: { fr: 'fr-FR', en: 'en-US' },
			},
		}),
	],
});
