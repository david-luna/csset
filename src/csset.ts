import { CssRule } from "./css-rule";
import { CssSelectorLexer } from "./css-selector-lexer";
import { CssTokenType, CssToken } from "./types";
import { CssAttribute } from "./css-attribute";

enum CssCombinatorValues {
  ADJACENT   = '+',
  SIBLING    = '~',
  DESCENDANT = ' ',
  CHILD      = '>',
  NONE       = '',
}


export class Csset {
  // These properties are exclusive if one is set the other is undefined
  rules: Array<{ rule: CssRule, combinator: CssCombinatorValues }>;
  subsets: Csset[];

  /**
   * Parses the given selector filing up its private properties with metadata
   * @param selector the selector string
   */
  constructor (selector: string) {
    // TODO: this is error prone since attr values may contain this char
    if (selector.indexOf(',') !== -1) {
      this.subsets = selector.split(',').map((sel) => new Csset(sel));
    } else {
      this.parseSelector(selector);
    }
  }

  /**
   * Returns true if this set contains the one passed as parameter
   * @param set the set to check with
   */
  supersetOf(set: Csset): boolean {
    return false;
  }

  /**
   * Returns true if this set is contained the one passed as parameter
   * @param set the set to check with
   */
  subsetOf(set: Csset): boolean {
    return set.subsetOf(this);
  }


  private parseSelector(selector: string): void {
    const lexer = new CssSelectorLexer(selector);
    let rule = new CssRule();
    let token;

    this.rules = [{ rule, combinator: CssCombinatorValues.NONE }];
    while(token = lexer.nextToken()) {
      switch(token.type) {
        case CssTokenType.Element:
          rule.element = token.values[0];
          break;
        case CssTokenType.Id:
          rule.id = token.values[0];
          break;
        case CssTokenType.Class:
          rule.addClass(token.values[0]);
          break;
        case CssTokenType.Attribute:
          rule.addAttribute(new CssAttribute(token.values));
          break;
        case CssTokenType.Combinator:
        case CssTokenType.Space:
          rule = new CssRule();
          this.rules.push({ rule, combinator: token.values[0] as CssCombinatorValues })
          break;
        default:
          throw new SyntaxError(`Unknown token ${token.values[0]} at position ${token.position}`);
      }
    }
  }

}
