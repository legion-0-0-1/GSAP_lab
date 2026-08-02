import type { PageTransitionConfig } from "./types";

/**
 * Global transition defaults — edit here (or pass `config` to `<PageTransitionProvider />`).
 *
 * Text across panels:
 *   mode: "text", text: "GSAP LAB", panelCount: 6
 *
 * Image sliced across panels (put the file in /public):
 *   mode: "image", imageSrc: "/transitions/cover.jpg", panelCount: 8
 *
 * Horizontal wipe:
 *   direction: "horizontal"
 */
export const defaultTransitionConfig: PageTransitionConfig = {
  panelCount: 10,
  direction: "vertical",
  coverDuration: 0.55,
  uncoverDuration: 0.5,
  stagger: 0.06,
  ease: "power3.inOut",
  overlapPx: 4,
  color: "#0c0a09",
  mode: "solid",
  // mode: "image",
  text: "GSAP LAB",
  imageSrc: undefined,
  // imageSrc: "",
  textClassName: undefined,
};
