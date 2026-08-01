// src/demos/index.ts
import { buttonMeta, buttonComponents } from './buttons/registry';
import { cardMeta, cardComponents } from './cards/registry';
import { textAnimationMeta, textAnimationComponents } from './text-animations/registry';
import type { DemoMeta } from '@/types/demo';
import type { ComponentType } from 'react';

export const allMeta: DemoMeta[] = [...buttonMeta, ...cardMeta, ...textAnimationMeta];

export const allComponents: Record<string, ComponentType> = {
  ...buttonComponents,
  ...cardComponents,
  ...textAnimationComponents,
};