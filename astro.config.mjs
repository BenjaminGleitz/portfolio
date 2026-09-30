// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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
});
