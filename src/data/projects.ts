import type { ImageMetadata } from 'astro';
import { profile } from './profile';

// Projets d'exemple (budget, booking) à remplacer par les vrais ; « portfolio » est ce site.
// Titre et description sont traduits dans ui.ts (clés projects.<id>.title / .desc).
interface Project {
	id: 'budget' | 'booking' | 'portfolio';
	tags: string[];
	repo?: string;
	demo?: string;
	// Capture d'écran importée depuis src/assets/ ; sans image, un cadre vide s'affiche.
	image?: ImageMetadata;
	// Couleur de fond de la zone de capture (teinte du ciel).
	tint: string;
}

export const projects: Project[] = [
	{
		id: 'budget',
		tags: ['Symfony', 'PHP', 'Doctrine', 'MySQL', 'Twig'],
		repo: profile.github,
		demo: '#',
		tint: '#dce7f3',
	},
	{
		id: 'booking',
		tags: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'Docker'],
		repo: profile.github,
		tint: '#ede2ee',
	},
	{
		id: 'portfolio',
		tags: ['Astro', 'Tailwind', 'Vitest', 'Docker', 'Traefik'],
		repo: 'https://github.com/BenjaminGleitz/portfolio',
		tint: '#f7e1d6',
	},
];
