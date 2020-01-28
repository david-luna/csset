import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

const supersetSymbols = [
  CssMatcherSymbol.Suffix,
  CssMatcherSymbol.Equal,
];

export class CssSuffixMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Suffix;

  supersetOf ( matcher: CssAttributeMatcher ): boolean {

    if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
      return matcher.value.endsWith(this.value);
    }

    return false;
  }
}