import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

const supersetSymbols = [
  CssMatcherSymbol.Prefix,
  CssMatcherSymbol.Suffix,
  CssMatcherSymbol.Subcode,
  CssMatcherSymbol.Occurrence,
  CssMatcherSymbol.Contains,
  CssMatcherSymbol.Equal,
];

export class CssContainsMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Contains;

  supersetOf ( matcher: CssAttributeMatcher ): boolean {

    if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
      return matcher.value.indexOf(this.value) !== -1;
    }

    return false;
  }

  union ( matcher: CssAttributeMatcher ): string | null {

    if (matcher.symbol !== CssMatcherSymbol.Presence) {
      const substring = this.longestSubstring(this.value, matcher.value);

      if ( substring.length ) {
        return `*="${substring}"`
      }
    }

    return super.union(matcher);
  }

  /**
   * Utility function to get the common longest string of 2
   * @param a 
   * @param b 
   */
  private longestSubstring (a: string, b: string): string {
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