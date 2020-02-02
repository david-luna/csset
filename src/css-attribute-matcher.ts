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
    // If one is superset then it is the union
    if ( this.supersetOf(matcher) ) {
      return `${this}`;
    } else if ( matcher.supersetOf(this) ) {
      return `${matcher}`;
    }

    // TODO: add min lenght for this?
    let substring = this.longestSubstring(this.value, matcher.value);

    if ( substring.length ) {
      return `*="${substring}"`;
    }

    return null;
  }

  intersection ( matcher: CssAttributeMatcher ): string | null {
    // If one is superset then the other is the intersection
    if ( this.supersetOf(matcher) ) {
      return `${matcher}`;
    } else if ( matcher.supersetOf(this) ) {
      return `${this}`;
    }

    return null;
  }

  toString(): string {
    if (this.symbol === CssMatcherSymbol.Presence) {
      return ``
    }
    return `${this.symbol}="${this.value}"`.replace(/^=/, '');
  }

  /**
   * Utility function to get the common longest string of 2
   * @param a 
   * @param b 
   */
  protected longestSubstring (a: string, b: string): string {
    let longest: string = '';

    // loop through the first string
    for (var i = 0; i < a.length; ++i) {
      // loop through the second string
      for (var j = 0; j < b.length; ++j) {
        // if it's the same letter
        if (a[i] === b[j]) {
          var str = a[i];
          var k = 1;
          // keep going until the letters no longer match, or we reach end
          while (i+k < a.length && j+k < b.length // haven't reached end
                && a[i+k] === b[j+k]) { // same letter
            str += a[i+k];
            ++k;
          }
          // if this substring is longer than the longest, save it as the longest
          if (str.length > longest.length) { longest = str }
        }
      }
    }
    return longest;
  }
}