// src/components/text/SlotWord.tsx
'use client';

import { forwardRef } from 'react';
import { splitWord } from '@/lib/text/splitWord';
import styles from './SlotWord.module.css';

interface SlotWordProps {
  word: string;
}

// Renders a word as duplicated top/bottom letters so a GSAP timeline can
// translate the stack upward to reveal the "bottom" copy — the slot-machine
// flip mechanic. Reusable by any demo that wants this effect, not just this one.
const SlotWord = forwardRef<HTMLDivElement, SlotWordProps>(({ word }, ref) => (
  <div ref={ref} className={styles.word}>
    {splitWord(word).map((letter, i) => (
      <div key={i} className={styles.letter}>
        <span>{letter}</span>
        <span>{letter}</span>
      </div>
    ))}
  </div>
));

SlotWord.displayName = 'SlotWord';
export default SlotWord;