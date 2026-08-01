// src/demos/cards/registry.ts
import type { ComponentType } from 'react';
import type { DemoMeta } from '@/types/demo';
// import TiltCard from './TiltCard';

export const cardMeta: DemoMeta[] = [
  // {
  //   id: 'tilt-card',
  //   title: 'Tilt Card',
  //   description: '3D tilt on mousemove using GSAP quickTo.',
  //   category: 'cards',
  //   tags: ['scroll-trigger', 'mousemove'],
  // },
];

export const cardComponents: Record<string, ComponentType> = {
  // 'tilt-card': TiltCard,
};