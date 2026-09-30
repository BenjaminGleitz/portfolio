// Compétences affichées dans « À propos », en deux groupes.
// Le titre du groupe est traduit (clé skills.<id>.title) ; les technos ne se traduisent pas.
interface SkillGroup {
	id: 'dev' | 'deploy';
	items: string[];
}

export const skills: SkillGroup[] = [
	{
		id: 'dev',
		items: ['PHP, Symfony, Twig', 'Java, Spring Boot', 'MySQL, Doctrine, JPA'],
	},
	{
		id: 'deploy',
		items: ['Docker, Traefik', 'VPS Linux, SSH', 'Git, GitHub Actions'],
	},
];
