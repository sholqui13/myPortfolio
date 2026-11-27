/** Categorías del filtro de “Mi stack tecnológico” (lienzo Main). */
export type SkillCategory = 'dev' | 'design' | 'tools';

export interface Skill {
  name: string;
  cat: SkillCategory;
  /** Color de marca de la tecnología: barra inferior de la tarjeta. */
  color: string;
  /** Logo en `public/assets/logos/stack/`. */
  logo: string;
}

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  dev: 'Desarrollo',
  design: 'Diseño',
  tools: 'Herramientas',
};

const logo = (slug: string) => `assets/logos/stack/${slug}.svg`;

export const SKILLS: Skill[] = [
  { name: 'Angular', cat: 'dev', color: '#DD0031', logo: logo('angular') },
  { name: 'TypeScript', cat: 'dev', color: '#3178C6', logo: logo('typescript') },
  { name: 'JavaScript', cat: 'dev', color: '#F7DF1E', logo: logo('javascript') },
  { name: 'HTML5', cat: 'dev', color: '#E34F26', logo: logo('html5') },
  { name: 'CSS3', cat: 'dev', color: '#1572B6', logo: logo('css3') },
  { name: 'Sass', cat: 'dev', color: '#CC6699', logo: logo('sass') },
  { name: 'Bootstrap', cat: 'dev', color: '#7952B3', logo: logo('bootstrap') },
  { name: 'Leaflet', cat: 'dev', color: '#199900', logo: logo('leaflet') },
  { name: 'Vitest', cat: 'dev', color: '#6E9F18', logo: logo('vitest') },
  { name: 'Figma', cat: 'design', color: '#F24E1E', logo: logo('figma') },
  { name: 'Adobe XD', cat: 'design', color: '#FF61F6', logo: logo('adobe-xd') },
  { name: 'Git', cat: 'tools', color: '#F05032', logo: logo('git') },
  { name: 'GitHub', cat: 'tools', color: '#181717', logo: logo('github') },
  { name: 'Azure DevOps', cat: 'tools', color: '#0078D7', logo: logo('azure-devops') },
  { name: 'Umbraco', cat: 'tools', color: '#3544B1', logo: logo('umbraco') },
];
