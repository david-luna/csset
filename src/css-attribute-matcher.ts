import { CssMatcherSymbol } from "./types";


export class CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol;
  value: string;

  constructor (val: string) {
    this.value = val;
  }

  supersetOf ( matcher: CssAttributeMatcher ): boolean {
    throw Error(`no supersetOf method implemented for matcher symbol ${this.symbol}`);
  }

  subsetOf ( matcher: CssAttributeMatcher ): boolean {
    return matcher.supersetOf(this);
  }

  union ( matcher: CssAttributeMatcher ): string | null {
    if ( this.supersetOf(matcher) ) {
      return `${this}`;
    }

    if ( matcher.supersetOf(this) ) {
      return `${matcher}`;
    }

    if ( this.value.includes(matcher.value) || matcher.value.includes(this.value) ) {
      const value = this.value.includes(matcher.value) ? matcher.value : this.value;

      return `*="${value}"`;
    }

    return null;
  }

  // intersection ( matcher: CssAttributeMatcher ): string | null;

  toString(): string {
    if (this.symbol === CssMatcherSymbol.Presence) {
      return ``
    }
    return `${this.symbol}="${this.value}"`.replace(/^=/, '');
  }
}