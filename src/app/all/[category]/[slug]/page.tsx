// src/app/all/[category]/[slug]/page.tsx
'use client';

import { useParams, notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { allMeta, allComponents } from '@/gsap-components';
import { usePageTransition } from '@/components/page-transition';

export default function DemoSharePage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const { navigate } = usePageTransition();
  const entry = allMeta.find((m) => m.category === category && m.id === slug);

  if (!entry) return notFound();

  const Component = allComponents[entry.id];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-stone-950 relative">
      <button
        onClick={() => navigate(`/all/${entry.category}`)}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-stone-500 hover:text-stone-200 transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Back
      </button>
      <div className="text-center">
        <h1 className="text-stone-100 text-xl font-medium">{entry.title}</h1>
        {entry.description && <p className="text-stone-500 text-sm mt-1">{entry.description}</p>}
      </div>
      <Component />
    </main>
  );
}
