import { CssAttributeMatcher } from "../css-attribute-matcher";
import { CssMatcherSymbol, CssToken } from "../types";
import { CssPresenceMatcher } from "./presence-matcher";
import { CssPrefixMatcher } from "./prefix-matcher";
import { CssSuffixMatcher } from "./suffix-matcher";
import { CssEqualMatcher } from "./equal-matcher";
import { CssContainsMatcher } from "./contains-matcher";
import { CssOccurrenceMatcher } from "./occurrence-matcher";
import { CssSubCodeMatcher } from "./subcode-matcher";

interface CssMatcherConstructor {
  new (value: string): CssAttributeMatcher
}

const clazzez: { [symbol: string]: CssMatcherConstructor }  = {
  [CssMatcherSymbol.Presence]  : CssPresenceMatcher,
  [CssMatcherSymbol.Prefix]    : CssPrefixMatcher,
  [CssMatcherSymbol.Suffix]    : CssSuffixMatcher,
  [CssMatcherSymbol.Equal]     : CssEqualMatcher,
  [CssMatcherSymbol.Contains]  : CssContainsMatcher,
  [CssMatcherSymbol.Occurrence]: CssOccurrenceMatcher,
  [CssMatcherSymbol.SubCode]   : CssSubCodeMatcher,
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
      throw new SyntaxError(`Invalid attribute value in ${selector}`);
    }

    return new clazzez[symbol](value.replace(VALUE_REGEXPS.quotes, ''));
  }
}
