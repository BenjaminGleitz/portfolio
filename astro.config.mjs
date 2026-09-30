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
			name: 'Hanken Grotesk',
			cssVariable: '--font-hanken',
			weights: [300, 400, 500, 600],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-jetbrains',
			weights: [400, 500],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'Instrument Serif',
			cssVariable: '--font-instrument',
			weights: [400],
			styles: ['italic'],
			fallbacks: ['serif'],
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
