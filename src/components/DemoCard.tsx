// src/components/DemoCard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Expand, Maximize2, Link2, X, Check } from 'lucide-react';
import type { DemoMeta } from '@/types/demo';

interface DemoCardProps {
  entry: DemoMeta;
  children: React.ReactNode;
}

export default function DemoCard({ entry, children }: DemoCardProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModalOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/all/${entry.category}/${entry.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openFullscreen = () => router.push(`/all/${entry.category}/${entry.id}`);

  return (
    <>
      <div className="group relative rounded-2xl border border-stone-800/80 bg-stone-950/60 backdrop-blur-sm p-6 flex flex-col gap-5 transition-all duration-300 hover:border-stone-700 hover:bg-stone-900/60 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-stone-100 font-medium tracking-tight text-[15px]">{entry.title}</h3>
            {entry.description && (
              <p className="text-stone-500 text-[13px] mt-1 leading-relaxed line-clamp-2">{entry.description}</p>
            )}
          </div>
          <div className="flex gap-2.5 text-stone-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button onClick={copyLink} className="hover:text-stone-200 transition-colors" title="Copy share link">
              {copied ? <Check size={15} /> : <Link2 size={15} />}
            </button>
            <button onClick={() => setModalOpen(true)} className="hover:text-stone-200 transition-colors" title="Quick preview">
              <Expand size={15} />
            </button>
            <button onClick={openFullscreen} className="hover:text-stone-200 transition-colors" title="Open fullscreen">
              <Maximize2 size={15} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[140px] rounded-xl bg-stone-900/40 ring-1 ring-inset ring-stone-800/50">
          {children}
        </div>

        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-stone-600 px-2 py-0.5 rounded-full border border-stone-800">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setModalOpen(false)}>
          <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-100 transition-colors">
            <X size={22} />
          </button>
          <div
            className="bg-stone-950 border border-stone-800 flex flex-col items-center justify-center gap-6 w-full max-w-2xl aspect-video rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-stone-100 font-medium tracking-tight">{entry.title}</h3>
              {entry.description && <p className="text-stone-500 text-sm mt-1">{entry.description}</p>}
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}