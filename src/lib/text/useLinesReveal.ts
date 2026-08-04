'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface UseLinesRevealOptions {
  deps?: unknown[];
  stagger?: number;
  ease?: string;
  rotation?: number;
  yPercent?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  /** Scoped scroll container — pass this when the demo owns its own internal
   *  scroll area (card/detail preview) instead of relying on page scroll */
  scroller?: RefObject<HTMLElement | null>;
}

export function useLinesReveal<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  {
    deps = [],
    stagger = 0.025,
    ease = 'power4.out',
    rotation = -12,
    yPercent = 120,
    scrub = 1,
    start = 'top 90%',
    end = 'bottom 65%',
    scroller,
  }: UseLinesRevealOptions = {}
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const split = new SplitType(containerRef.current, { types: 'lines,chars' });

    const ctx = gsap.context(() => {
      split.lines?.forEach((line) => {
        const chars = line.querySelectorAll<HTMLElement>('.char');

        gsap.set(chars, { yPercent, rotation, transformOrigin: 'bottom center' });

        gsap.to(chars, {
          yPercent: 0,
          rotation: 0,
          ease,
          stagger: { each: stagger, from: 'end' },
          scrollTrigger: {
            trigger: line,
            scroller: scroller?.current ?? undefined,
            start,
            end,
            scrub,
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}