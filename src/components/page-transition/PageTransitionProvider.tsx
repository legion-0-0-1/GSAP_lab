"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import PageTransitionOverlay from "./PageTransitionOverlay";
import Preloader from "./Preloader";
import { defaultTransitionConfig } from "./config";
import type {
  PageTransitionConfig,
  PageTransitionContextValue,
  TransitionPhase,
} from "./types";

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mergeConfig(overrides?: Partial<PageTransitionConfig>): PageTransitionConfig {
  return {
    ...defaultTransitionConfig,
    ...overrides,
    panelCount: Math.max(1, Math.round(overrides?.panelCount ?? defaultTransitionConfig.panelCount)),
  };
}

type ProviderProps = {
  children: ReactNode;
  /** Partial overrides merged onto `defaultTransitionConfig`. */
  config?: Partial<PageTransitionConfig>;
  /** Set false to skip the first-load preloader. */
  showPreloader?: boolean;
};

export function PageTransitionProvider({
  children,
  config: configOverrides,
  showPreloader = true,
}: ProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const config = useMemo(() => mergeConfig(configOverrides), [configOverrides]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const intentionalNav = useRef(false);
  const shouldUncover = useRef(false);
  const animating = useRef(false);
  const coverTween = useRef<gsap.core.Timeline | null>(null);
  const isFirstPath = useRef(true);
  const bootstrapped = useRef(false);
  /** Blocks route-transition effects until the preloader finishes (and ignores that state flip). */
  const transitionsEnabled = useRef(!showPreloader);

  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [preloaderDone, setPreloaderDone] = useState(!showPreloader);

  const getPanels = useCallback(() => {
    const root = overlayRef.current;
    if (!root) return [] as HTMLElement[];
    return Array.from(root.querySelectorAll<HTMLElement>(".transition-panel"));
  }, []);

  const getUnderlay = useCallback(() => {
    return overlayRef.current?.querySelector<HTMLElement>(".transition-underlay") ?? null;
  }, []);

  const setCoveredInstant = useCallback(() => {
    const panels = getPanels();
    const underlay = getUnderlay();
    const vertical = config.direction === "vertical";

    gsap.killTweensOf(panels);
    if (underlay) gsap.killTweensOf(underlay);

    gsap.set(panels, vertical ? { scaleY: 1 } : { scaleX: 1 });
    if (underlay) gsap.set(underlay, { opacity: 1 });
    setPhase("covered");
  }, [config.direction, getPanels, getUnderlay]);

  const resetPanelsHidden = useCallback(() => {
    const panels = getPanels();
    const underlay = getUnderlay();
    const vertical = config.direction === "vertical";
    gsap.set(panels, vertical ? { scaleY: 0 } : { scaleX: 0 });
    if (underlay) gsap.set(underlay, { opacity: 0 });
    setPhase("idle");
  }, [config.direction, getPanels, getUnderlay]);

  const cover = useCallback(async () => {
    const panels = getPanels();
    const underlay = getUnderlay();
    if (!panels.length) return;

    setPhase("covering");
    gsap.killTweensOf(panels);
    if (underlay) gsap.killTweensOf(underlay);

    const vertical = config.direction === "vertical";
    const from = vertical
      ? { scaleY: 0, transformOrigin: "top center" }
      : { scaleX: 0, transformOrigin: "left center" };
    const to = vertical ? { scaleY: 1 } : { scaleX: 1 };

    const tl = gsap.timeline({ defaults: { ease: config.ease } });
    coverTween.current = tl;

    if (underlay) {
      tl.set(underlay, { opacity: 0 }, 0);
      tl.to(
        underlay,
        {
          opacity: 1,
          duration: Math.max(0.12, config.coverDuration * 0.3),
          ease: "power1.out",
        },
        Math.max(0, config.coverDuration * 0.5)
      );
    }

    tl.fromTo(
      panels,
      from,
      {
        ...to,
        duration: config.coverDuration,
        stagger: config.stagger,
      },
      0
    );

    await tl;
    if (underlay) gsap.set(underlay, { opacity: 1 });
    setPhase("covered");
  }, [config, getPanels, getUnderlay]);

  const uncover = useCallback(async () => {
    const panels = getPanels();
    const underlay = getUnderlay();
    if (!panels.length) return;

    setPhase("uncovering");
    gsap.killTweensOf(panels);
    if (underlay) gsap.killTweensOf(underlay);

    const vertical = config.direction === "vertical";
    const tl = gsap.timeline({ defaults: { ease: config.ease } });

    if (underlay) {
      tl.to(
        underlay,
        { opacity: 0, duration: Math.max(0.08, config.uncoverDuration * 0.2), ease: "power1.in" },
        0
      );
    }

    tl.to(
      panels,
      {
        ...(vertical
          ? { scaleY: 0, transformOrigin: "bottom center" }
          : { scaleX: 0, transformOrigin: "right center" }),
        duration: config.uncoverDuration,
        stagger: config.stagger * 0.85,
      },
      0
    );

    await tl;
    setPhase("idle");
  }, [config, getPanels, getUnderlay]);

  const navigate = useCallback(
    async (href: string) => {
      if (typeof window === "undefined") return;

      const current = window.location.pathname + window.location.search;
      if (href === current || href === pathname) return;
      if (animating.current) return;
      if (!transitionsEnabled.current) return;

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      animating.current = true;
      intentionalNav.current = true;
      shouldUncover.current = true;

      try {
        await cover();
        router.push(href);
      } catch {
        await uncover();
        shouldUncover.current = false;
        intentionalNav.current = false;
        animating.current = false;
      }
    },
    [cover, uncover, pathname, router]
  );

  // First load: preloader owns the reveal (zoom). Do not also run panel transitions.
  const finishBoot = useCallback(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    document.documentElement.classList.remove("is-booting");

    // Ensure no leftover transforms break sticky/fixed layout
    const app = document.querySelector<HTMLElement>("[data-app-root]");
    if (app) gsap.set(app, { clearProps: "transform" });

    resetPanelsHidden();
    shouldUncover.current = false;
    intentionalNav.current = false;
    animating.current = false;
    transitionsEnabled.current = true;
    setPreloaderDone(true);
  }, [resetPanelsHidden]);

  useEffect(() => {
    if (showPreloader) return;
    if (bootstrapped.current) return;
    finishBoot();
  }, [showPreloader, finishBoot]);

  // Back / forward only — keyed solely on pathname so finishing the preloader
  // does not re-trigger a cover/uncover cycle.
  useLayoutEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }

    if (!transitionsEnabled.current) return;
    if (intentionalNav.current) return;
    if (prefersReducedMotion()) return;

    animating.current = true;
    shouldUncover.current = true;
    setCoveredInstant();
  }, [pathname, setCoveredInstant]);

  useEffect(() => {
    if (!transitionsEnabled.current) return;
    if (!shouldUncover.current) return;

    let cancelled = false;

    const run = async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (cancelled) return;

      if (coverTween.current && coverTween.current.isActive()) {
        await coverTween.current;
      }
      if (cancelled) return;

      await uncover();
      shouldUncover.current = false;
      intentionalNav.current = false;
      animating.current = false;
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [pathname, uncover]);

  const value = useMemo(
    () => ({ phase, navigate, config }),
    [phase, navigate, config]
  );

  return (
    <PageTransitionContext.Provider value={value}>
      <div data-app-root className="min-h-full flex flex-col flex-1">
        {children}
      </div>
      <PageTransitionOverlay
        ref={overlayRef}
        active={phase !== "idle"}
        config={config}
      />
      {/* SSR’d immediately — never wait on a layout effect */}
      {showPreloader && !preloaderDone ? (
        <Preloader onComplete={finishBoot} />
      ) : null}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}
