// src/demos/text-animations/HoverSlotsText.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SlotWord from '@/components/text/SlotWord';
import styles from './HoverSlotsText.module.css';

const WORDS = ['TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'TWITTER', 'FACEBOOK'];
const SIZE = 40; // px — scaled down from the codepen's 60px to fit inside a demo card

export default function HoverSlotsText() {
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      timelines.current = wordRefs.current.map((el) => {
        const tl = gsap.timeline({ paused: true });
        if (el) {
          tl.to(el.querySelectorAll('span'), {
            y: -SIZE,
            stagger: 0.05,
            color: '#ff3b30',
            scale: 1,
          });
        }
        return tl;
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} style={{ ['--slot-size' as string]: `${SIZE}px` }}>
      {WORDS.map((word, i) => (
        <div
          key={word}
          onMouseEnter={() => timelines.current[i]?.restart()}
          onMouseLeave={() => timelines.current[i]?.reverse()}
        >
          <SlotWord ref={(el) => (wordRefs.current[i] = el)} word={word} />
        </div>
      ))}
    </div>
  );
}