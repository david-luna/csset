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

  intersection ( matcher: CssAttributeMatcher ): string | null | void {
    if ( matcher.symbol === CssMatcherSymbol.Suffix ) {
      if ( matcher.value.endsWith(this.value) || this.value.endsWith(matcher.value) ) {
        const longestValue = this.value.length > matcher.value.length ? this.value : matcher.value;

        return `$="${longestValue}"`
      }
      
      if ( this.value !== matcher.value ) {
        return void 0;
      }
    }
    
    return super.intersection(matcher);
  }
}