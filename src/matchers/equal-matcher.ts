import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

export class CssEqualMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Equal;

  supersetOf ( matcher: CssAttributeMatcher ): boolean {
    return matcher.symbol === CssMatcherSymbol.Equal && this.value === matcher.value;
  }
}
