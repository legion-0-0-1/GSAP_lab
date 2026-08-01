// src/components/DemoGrid.tsx
'use client';

import { useMemo, useState } from 'react';
import type { DemoMeta } from '@/types/demo';
import { allComponents } from '@/gsap-components';
import DemoCard from './DemoCard';
import FilterBar from './FilterBar';

interface DemoGridProps {
  entries: DemoMeta[];
}

export default function DemoGrid({ entries }: DemoGridProps) {
  const [active, setActive] = useState<string[]>([]);

  const tags = useMemo(() => [...new Set(entries.flatMap((e) => e.tags))], [entries]);

  const filtered = useMemo(
    () => (active.length === 0 ? entries : entries.filter((e) => active.every((tag) => e.tags.includes(tag)))),
    [entries, active]
  );

  return (
    <div>
      <FilterBar tags={tags} active={active} onChange={setActive} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((entry) => {
          const Component = allComponents[entry.id];
          return (
            <DemoCard key={entry.id} entry={entry}>
              <Component />
            </DemoCard>
          );
        })}
      </div>
    </div>
  );
}