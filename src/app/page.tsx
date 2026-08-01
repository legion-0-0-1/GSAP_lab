// src/app/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Audiowide, Faculty_Glyphic } from 'next/font/google';
import Navigation from '@/components/Navigation';
import DemoCard from '@/components/DemoCard';
import { allMeta, allComponents } from '@/gsap-components';

const audiowide = Audiowide({ subsets: ['latin'], weight: '400' });
const facultyGlyphic = Faculty_Glyphic({ subsets: ['latin'], weight: '400' });

// Pick a small, deliberate spread across categories rather than the first N —
// avoids the featured row being 3 buttons just because buttons happen first in the registry.
const FEATURED_IDS = ['hover-slots-text', 'ripple-button', 'tilt-card'];

export default function Home() {
  const featured = FEATURED_IDS
    .map((id) => allMeta.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <div className="min-h-screen bg-stone-950">
      <Navigation />

      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-stone-200 text-lg font-medium ${facultyGlyphic.className}`}>
            Featured
          </h2>
          <Link
            href="/all"
            className={`text-stone-500 hover:text-stone-200 text-sm transition-colors flex items-center gap-1 ${facultyGlyphic.className}`}
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((entry) => {
            const Component = allComponents[entry.id];
            return (
              <DemoCard key={entry.id} entry={entry}>
                <Component />
              </DemoCard>
            );
          })}
        </div>
      </section>

      <footer className={`px-8 py-10 border-t border-stone-900 text-center text-stone-600 text-xs ${facultyGlyphic.className}`}>
        Built by Dilpreet Singh — a running collection, updated as new patterns get built.
      </footer>
    </div>
  );
}