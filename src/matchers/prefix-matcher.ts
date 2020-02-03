import { CssMatcherSymbol } from "../types";
import { CssAttributeMatcher } from "../css-attribute-matcher";

const supersetSymbols = [
  CssMatcherSymbol.Prefix,
  CssMatcherSymbol.Subcode,
  CssMatcherSymbol.Equal,
];

export class CssPrefixMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Prefix;

  supersetOf ( matcher: CssAttributeMatcher ): boolean {

    if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
      return matcher.value.startsWith(this.value);
    }

    return false;
  }

  union ( matcher: CssAttributeMatcher ): string | null {

    if ( this.value === matcher.value && matcher.symbol === CssMatcherSymbol.Subcode ) {
      return `${this}`;
    }

    return super.union(matcher);
  }

  intersection ( matcher: CssAttributeMatcher ): string | null {
    
    if ( this.value === matcher.value ) {
      if (matcher.symbol === CssMatcherSymbol.Occurrence ) {
        return `^="${this.value} "`;
      }

      if (matcher.symbol === CssMatcherSymbol.Subcode ) {
        return `^="${this.value}"`;
      }
    }

    if ( matcher.value.startsWith(this.value) ) {
      if (matcher.symbol === CssMatcherSymbol.Subcode ) {
        return `^="${matcher.value}"`;
      }
    }

    return super.intersection(matcher);
  }
}