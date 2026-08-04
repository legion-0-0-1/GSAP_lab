// src/demos/text-animations/registry.ts
import type { ComponentType } from 'react';
import type { DemoMeta } from '@/types/demo';
import HoverSlotsText from './hover-slots-text/HoverSlotsText';
import LinesRevealText from './lines-reveal-text/LinesRevealText';

export const textAnimationMeta: DemoMeta[] = [
  {
    id: 'hover-slots-text',
    title: 'Hover Slots Text',
    description: 'Slot-machine style letter flip on hover.',
    category: 'text-animations',
    tags: ['hover', 'timeline'],
  },
  {
    id: 'lines-reveal-text',
    title: 'Lines Reveal Text',
    description: 'Reveal text line by line with GSAP.',
    category: 'text-animations',
    tags: ['reveal', 'gsap'],
  }
];

export const textAnimationComponents: Record<string, ComponentType> = {
  'hover-slots-text': HoverSlotsText,
  'lines-reveal-text': LinesRevealText,
};