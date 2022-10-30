import { CssMatcherSymbol } from '../types';
import { CssAttributeMatcher } from '../css-attribute-matcher';

const supersetSymbols = [CssMatcherSymbol.Prefix, CssMatcherSymbol.SubCode, CssMatcherSymbol.Equal];

export class CssPrefixMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Prefix;

  supersetOf(matcher: CssAttributeMatcher): boolean {
    if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
      return matcher.value.startsWith(this.value);
    }

    return false;
  }

  union(matcher: CssAttributeMatcher): string | null {
    if (this.value === matcher.value && matcher.symbol === CssMatcherSymbol.SubCode) {
      return `${this}`;
    }

    return super.union(matcher);
  }

  intersection(matcher: CssAttributeMatcher): string | null | void {
    if (this.value === matcher.value) {
      if (matcher.symbol === CssMatcherSymbol.Equal) {
        return `="${this.value}"`;
      }
    }

    if (matcher.value.startsWith(this.value)) {
      if (matcher.symbol === CssMatcherSymbol.Prefix) {
        return `^="${matcher.value}"`;
      }
      if (matcher.symbol === CssMatcherSymbol.SubCode) {
        return `|="${matcher.value}"`;
      }
    }

    if (this.value.startsWith(matcher.value) && matcher.symbol === CssMatcherSymbol.Prefix) {
      return `^="${this.value}"`;
    }

    if (matcher.symbol === CssMatcherSymbol.Prefix && this.value !== matcher.value) {
      return void 0;
    }

    return super.intersection(matcher);
  }
}
