// src/demos/text-animations/registry.ts
import type { ComponentType } from 'react';
import type { DemoMeta } from '@/types/demo';
import HoverSlotsText from './hover-slots-text/HoverSlotsText';

export const textAnimationMeta: DemoMeta[] = [
  {
    id: 'hover-slots-text',
    title: 'Hover Slots Text',
    description: 'Slot-machine style letter flip on hover.',
    category: 'text-animations',
    tags: ['hover', 'timeline'],
  },
];

export const textAnimationComponents: Record<string, ComponentType> = {
  'hover-slots-text': HoverSlotsText,
};