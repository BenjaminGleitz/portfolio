import type { ImageMetadata } from 'astro';
import { profile } from './profile';

// Projets de la maquette, à remplacer par les vrais.
// Titre et description sont traduits dans ui.ts (clés projects.<id>.title / .desc).
interface Project {
	id: 'budget' | 'booking' | 'bixi';
	tags: string[];
	repo?: string;
	demo?: string;
	// Capture d'écran importée depuis src/assets/ ; sans image, un cadre vide s'affiche.
	image?: ImageMetadata;
}

export const projects: Project[] = [
	{
		id: 'budget',
		tags: ['Symfony', 'PHP', 'Doctrine', 'MySQL', 'Twig'],
		repo: profile.github,
		demo: '#',
	},
	{
		id: 'booking',
		tags: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'Docker'],
		repo: profile.github,
	},
	{
		id: 'bixi',
		tags: ['Astro', 'JavaScript', 'Leaflet'],
		repo: profile.github,
		demo: '#',
	},
];
