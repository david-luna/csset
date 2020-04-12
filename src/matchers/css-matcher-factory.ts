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

const VALUE_REGEXPS = {
  valid : /^('|")[^'"]+\1$|^[^'"]+$/,
  quotes: /^["']|["']$/g,
};


export class CssMatcherFactory {
  static create (selector: string = ''): CssAttributeMatcher {
    const parts  = selector.split('=');
    const symbol = parts.length > 1 ? parts[0] || '=' : '';
    const value  = parts.length > 1 ? parts[1] : '';

    if ( !!value && !VALUE_REGEXPS.valid.test(value) ) {
      throw new SyntaxError(`Invalid atrribute value in ${selector}`);
    }

    return new clazzez[symbol](value.replace(VALUE_REGEXPS.quotes, ''));
  }
}