import { CssAttributeMatcher } from "../css-attribute-matcher";
import { CssMatcherSymbol } from "../types";
import { CssPresenceMatcher } from "./presence-matcher";
import { CssPrefixMatcher } from "./prefix-matcher";
import { CssSuffixMatcher } from "./suffix-matcher";
import { CssEqualMatcher } from "./equal-matcher";
import { CssContainsMatcher } from "./contains-matcher";
import { CssOccurrenceMatcher } from "./occurrence-matcher";
import { CssSubcodeMatcher } from "./subcode-matcher";

interface CssMatcherConstructor {
  new (vale: string): CssAttributeMatcher
}

const clazzez: { [symbol: string]: CssMatcherConstructor }  = {
  [CssMatcherSymbol.Presence]  : CssPresenceMatcher,
  [CssMatcherSymbol.Prefix]    : CssPrefixMatcher,
  [CssMatcherSymbol.Suffix]    : CssSuffixMatcher,
  [CssMatcherSymbol.Equal]     : CssEqualMatcher,
  [CssMatcherSymbol.Contains]  : CssContainsMatcher,
  [CssMatcherSymbol.Occurrence]: CssOccurrenceMatcher,
  [CssMatcherSymbol.Subcode]   : CssSubcodeMatcher,
}


export class CssMatcherFactory {
  static create (s: string = ''): CssAttributeMatcher {

    const parts  = s.split('=');
    const symbol = parts.length > 1 ? parts[0] || '=' : '';
    const value  = parts.length > 1 ? parts[1] : '';

    return new clazzez[symbol](value);
  }
}