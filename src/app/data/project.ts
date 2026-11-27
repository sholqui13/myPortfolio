/** Imagen con tamaño intrínseco declarado (evita saltos de layout). */
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Proyecto del carrusel. Igual a `Project` de components/index.d.ts, salvo que
 * las capturas llevan width/height (criterio de aceptación de handoff.md).
 */
export interface Project {
  slug: string;
  /** “Nombre: subtítulo”. */
  title: string;
  org: string;
  desc: string;
  tags: string[];
  /** Fondo de la imagen: un token, p. ej. `var(--teal-100)`. */
  tint?: string;
  desk?: ProjectImage;
  mob?: ProjectImage;
  caseHref?: string;
  demo?: string;
  repo?: string;
  figma?: string;
}
