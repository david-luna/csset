import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

const supersetSymbols = [
  CssMatcherSymbol.Prefix,
  CssMatcherSymbol.Suffix,
  CssMatcherSymbol.SubCode,
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
}
