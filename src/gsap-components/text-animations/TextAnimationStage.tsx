'use client';

import { useState, ComponentType } from 'react';

interface TextAnimationStageProps {
  /** The demo component being showcased — must accept an optional `text` prop */
  Demo: ComponentType<{ text?: string }>;
  /** Seeds the textarea and the initial render */
  defaultText: string;
  placeholder?: string;
}

/**
 * Wraps any text-animation demo with an editable textarea so visitors can drop
 * in their own copy and see it run through the animation live. Meant to be used
 * on every demo page under /all/text-animations/[slug] in place of rendering
 * the demo component directly — the demo stays "dumb" (just takes `text`),
 * this component owns the input state.
 */
export default function TextAnimationStage({
  Demo,
  defaultText,
  placeholder = 'Type your own text to preview it in this animation…',
}: TextAnimationStageProps) {
  const [text, setText] = useState(defaultText);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex min-h-80 items-center justify-center rounded-xl border border-stone-800 bg-stone-950">
        <Demo text={text} />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-stone-500">
          Try your own text
        </span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full resize-none rounded-lg border border-stone-800 bg-stone-900 px-4 py-3 text-stone-100 placeholder-stone-600 transition-colors focus:border-stone-500 focus:outline-none"
        />
      </label>
    </div>
  );
}