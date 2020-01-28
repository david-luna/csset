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
}
