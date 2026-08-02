// src/app/all/[category]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import DemoGrid from '@/components/DemoGrid';
import { allMeta } from '@/gsap-components';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const entries = allMeta.filter((m) => m.category === category);

  return (
    <div className="min-h-screen bg-stone-950">
      <Navigation />
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto w-full">
        <h1 className="text-xl sm:text-2xl text-stone-100 font-medium mb-6 sm:mb-8 capitalize">
          {category.replace('-', ' ')}
        </h1>
        <DemoGrid entries={entries} />
      </main>
    </div>
  );
}