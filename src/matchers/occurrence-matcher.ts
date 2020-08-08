import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

const supersetSymbols = [
  CssMatcherSymbol.Equal,
  CssMatcherSymbol.Occurrence,
];

export class CssOccurrenceMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Occurrence;

  supersetOf ( matcher: CssAttributeMatcher ): boolean {
    if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
      return matcher.value === this.value;
    }

    return false;
  }

  intersection ( matcher: CssAttributeMatcher ): string | null | void {
    if ( this.value === matcher.value ) {
      if ( matcher.symbol === CssMatcherSymbol.Equal ) {
        return `="${this.value}"`;
      }
    }

    return super.intersection(matcher);
  }
}