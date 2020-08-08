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
    } else if ( matcher.supersetOf(this) ) {
      return `${matcher}`;
    }

    return null;
  }

  intersection ( matcher: CssAttributeMatcher ): string | null | void {
    if ( this.supersetOf(matcher) ) {
      return `${matcher}`;
    } else if ( matcher.supersetOf(this) ) {
      return `${this}`;
    }

    // Equals intersect with any other matcher
    // Return void indicating the intersection is an empty set
    if ( [this.symbol, matcher.symbol].indexOf(CssMatcherSymbol.Equal) !== -1 ) {
      if (matcher.value !== this.value) {
        return void 0;
      }
    }

    return null;
  }

  toString(): string {
    if (this.symbol === CssMatcherSymbol.Presence) {
      return ``
    }
    return `${this.symbol}="${this.value}"`.replace(/^=/, '');
  }
}
