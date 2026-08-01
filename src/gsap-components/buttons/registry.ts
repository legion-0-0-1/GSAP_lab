// src/demos/buttons/registry.ts
import type { ComponentType } from 'react';
import type { DemoMeta } from '@/types/demo';
// import RippleButton from './RippleButton';

export const buttonMeta: DemoMeta[] = [
  // {
  //   id: 'ripple-button',
  //   title: 'Ripple Button',
  //   description: 'A hover-triggered ripple using GSAP timelines.',
  //   category: 'buttons',
  //   tags: ['hover', 'timeline'],
  // },
];

export const buttonComponents: Record<string, ComponentType> = {
  // 'ripple-button': RippleButton,
};