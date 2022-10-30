import { CssMatcherSymbol } from '../types';
import { CssAttributeMatcher } from '../css-attribute-matcher';

export class CssPresenceMatcher extends CssAttributeMatcher {
  readonly symbol: CssMatcherSymbol = CssMatcherSymbol.Presence;

  supersetOf(matcher: CssAttributeMatcher): boolean {
    return true;
  }
}
