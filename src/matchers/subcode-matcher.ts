import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

const supersetSymbols = [
  CssMatcherSymbol.Subcode,
  CssMatcherSymbol.Equal,
];

export class CssSubcodeMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Subcode;

  supersetOf ( matcher: CssAttributeMatcher ): boolean {

    if ( supersetSymbols.indexOf(matcher.symbol) !== -1 ) {
      return matcher.value === this.value;
    }

    return false;
  }

  union ( matcher: CssAttributeMatcher ): string | null {
    if ( matcher.symbol === CssMatcherSymbol.Subcode ) {
      if ( this.value === matcher.value ) {
        return `${this}`;
      }
    }

    return super.union(matcher);
  }

  intersection ( matcher: CssAttributeMatcher ): string | null | void {
    if ( this.value === matcher.value ) {
      if (matcher.symbol === CssMatcherSymbol.Prefix ) {
        return `|="${this.value}"`;
      }
    }

    if ( this.value.startsWith(matcher.value) ) {
      if (matcher.symbol === CssMatcherSymbol.Prefix ) {
        return `|="${this.value}"`;
      }
    }

    return super.intersection(matcher);
  }
}