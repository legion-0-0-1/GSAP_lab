declare module 'split-type' {
  export interface SplitTypeOptions {
    types?: string;
    tagName?: string;
    lineClass?: string;
    wordClass?: string;
    charClass?: string;
    absolute?: boolean;
  }

  export default class SplitType {
    constructor(
      target: string | Element | Element[] | NodeListOf<Element>,
      options?: SplitTypeOptions
    );
    lines?: HTMLElement[];
    words?: HTMLElement[];
    chars?: HTMLElement[];
    split(options?: SplitTypeOptions): void;
    revert(): void;
  }
}