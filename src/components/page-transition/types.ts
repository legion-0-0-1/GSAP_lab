export type TransitionPhase = "idle" | "covering" | "covered" | "uncovering";

export type TransitionDirection = "vertical" | "horizontal";

export type TransitionMediaMode = "solid" | "text" | "image";

/** Tweak these in `config.ts` (or pass overrides to the provider). */
export interface PageTransitionConfig {
  /** How many cover strips. */
  panelCount: number;
  /** Vertical = top→bottom cover; horizontal = left→right. */
  direction: TransitionDirection;
  coverDuration: number;
  uncoverDuration: number;
  stagger: number;
  ease: string;
  /**
   * Extra pixels each panel overlaps its neighbour.
   * Hides subpixel gaps / “seams” when fully covered.
   */
  overlapPx: number;
  /** Panel fill when mode is `solid` (also used as underlay). */
  color: string;
  /** solid | text spanning the cover | image sliced across panels */
  mode: TransitionMediaMode;
  /** Shown across panels when mode is `text`. */
  text?: string;
  /** Full-bleed image sliced across panels when mode is `image`. */
  imageSrc?: string;
  textClassName?: string;
}

export interface PageTransitionContextValue {
  phase: TransitionPhase;
  navigate: (href: string) => void;
  config: PageTransitionConfig;
}
