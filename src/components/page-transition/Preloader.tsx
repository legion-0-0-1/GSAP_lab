"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

type PreloaderProps = {
  onComplete: () => void;
};

/**
 * Circular loader appears → brief spin → sharp zoom-in (portal hole + page scale).
 * Opaque from SSR so the site never paints first.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.remove("is-booting");
      onComplete();
      return;
    }

    const loader = root.querySelector<HTMLElement>(".boot-loader");
    const ring = root.querySelector<HTMLElement>(".boot-ring");
    const core = root.querySelector<HTMLElement>(".boot-core");
    const app = document.querySelector<HTMLElement>("[data-app-root]");

    let cancelled = false;
    const ctx = gsap.context(() => {
      gsap.set(loader, { scale: 0, opacity: 0 });
      gsap.set(root, { ["--hole" as string]: "0%" });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(loader, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.7)" }, 0.04)
        .fromTo(
          core,
          { scale: 0.35, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35 },
          0.12
        );

      gsap.to(ring, {
        rotate: 360,
        duration: 0.85,
        ease: "none",
        repeat: -1,
      });
    }, root);

    const minDelay = new Promise<void>((r) => setTimeout(r, 1000));
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));

    void Promise.all([minDelay, loaded]).then(async () => {
      if (cancelled || done.current) return;
      done.current = true;

      ctx.revert();
      gsap.set(root, { ["--hole" as string]: "0%" });

      const tl = gsap.timeline();

      tl.to(ring, { rotate: "+=90", duration: 0.2, ease: "power2.inOut" }, 0)
        .to(loader, { scale: 0.72, duration: 0.18, ease: "power2.inOut" }, 0)
        .to(
          loader,
          { scale: 0, opacity: 0, duration: 0.15, ease: "power3.in" },
          0.2
        )
        // Portal opens from center — reads as a sharp zoom into the page
        .to(
          root,
          {
            ["--hole" as string]: "150%",
            duration: 0.52,
            ease: "expo.in",
          },
          0.26
        );

      if (app) {
        tl.fromTo(
          app,
          { scale: 1.16 },
          {
            scale: 1,
            duration: 0.58,
            ease: "expo.out",
            transformOrigin: "50% 50%",
            // Inline transform would break position:sticky descendants
            onComplete: () => gsap.set(app, { clearProps: "transform" }),
          },
          0.26
        );
      }

      await tl;
      if (cancelled) return;

      if (app) gsap.set(app, { clearProps: "transform" });
      document.documentElement.classList.remove("is-booting");
      onComplete();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      id="boot-preloader"
      ref={rootRef}
      className={styles.root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0c0a09",
      }}
    >
      <div className={`${styles.loader} boot-loader`} aria-hidden>
        <div className={`${styles.ring} boot-ring`} />
        <div className={`${styles.core} boot-core`} />
      </div>
    </div>
  );
}
