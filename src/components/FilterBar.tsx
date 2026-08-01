// src/components/FilterBar.tsx
'use client';

interface FilterBarProps {
  tags: string[];
  active: string[];
  onChange: (tags: string[]) => void;
}

export default function FilterBar({ tags, active, onChange }: FilterBarProps) {
  const toggle = (tag: string) => {
    onChange(active.includes(tag) ? active.filter((t) => t !== tag) : [...active, tag]);
  };

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => {
        const isActive = active.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              isActive
                ? 'bg-stone-100 text-stone-900 border-stone-100'
                : 'border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}