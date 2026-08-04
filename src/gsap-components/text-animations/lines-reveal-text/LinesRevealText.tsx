'use client';

import { useRef } from 'react';
import { useLinesReveal } from '@/lib/text/useLinesReveal';
import styles from './LinesRevealText.module.css';

const DEFAULT_TEXT =
  'Every scroll is a reveal — line by line, letter by letter, considered.';

interface LinesRevealTextProps {
  text?: string;
}

export default function LinesRevealText({ text = DEFAULT_TEXT }: LinesRevealTextProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLinesReveal(containerRef, { deps: [text], scroller: scrollerRef });

  return (
    <div ref={scrollerRef} className={styles.scroller}>
      <div className={styles.spacer} aria-hidden />
      <h2 key={text} ref={containerRef} className={styles.title}>
        {text}
      </h2>
      <div className={styles.spacer} aria-hidden />
      <span className={styles.hint}>scroll</span>
    </div>
  );
}