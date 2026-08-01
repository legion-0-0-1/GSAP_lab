// src/lib/text/splitWord.ts
export function splitWord(word: string): string[] {
  // Spread instead of .split('') so multi-byte characters (accents, emoji) split correctly
  return [...word];
}