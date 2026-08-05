'use client';

import { useEffect, useRef, useState } from 'react';
import { useLinesReveal } from '@/lib/text/useLinesReveal';
import styles from './LinesRevealText.module.css';

const DEFAULT_TEXT =
  'Every scroll is a reveal — line by line, letter by letter, considered.';

// Below this, there isn't enough room for a believable scroll-scrub well
// (card previews, cramped modal states) — render statically instead.
const MIN_SCRUB_HEIGHT = 420;

interface LinesRevealTextProps {
  text?: string;
  /** Force scrub mode — used in fullscreen views where scroll should work */
  forceScrub?: boolean;
}

export default function LinesRevealText({ 
  text = DEFAULT_TEXT,
  forceScrub = false 
}: LinesRevealTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrub, setCanScrub] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // If forceScrub is true, always enable scrub mode
    if (forceScrub) {
      setCanScrub(true);
      return;
    }

    const measure = () => setCanScrub(wrapper.clientHeight >= MIN_SCRUB_HEIGHT);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [forceScrub]);

  useLinesReveal(containerRef, {
    deps: [text, canScrub],
    scroller: scrollerRef,
    enabled: canScrub,
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {canScrub ? (
        <div ref={scrollerRef} className={styles.scroller}>
          <div className={styles.spacer} aria-hidden />
          <h2 key={text} ref={containerRef} className={styles.title}>
            {text}
          </h2>
          <div className={styles.spacer} aria-hidden />
          <span className={styles.hint}>scroll</span>
        </div>
      ) : (
        <div className={styles.staticStage}>
          <h2 className={styles.title}>{text}</h2>
        </div>
      )}
    </div>
  );
}