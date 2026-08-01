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
    <>
      <Navigation />
      <main className="px-8 py-12 bg-stone-950 min-h-screen">
        <h1 className="text-2xl text-stone-100 font-medium mb-8 capitalize">
          {category.replace('-', ' ')}
        </h1>
        <DemoGrid entries={entries} />
      </main>
    </>
  );
}