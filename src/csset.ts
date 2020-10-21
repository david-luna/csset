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
  rules: Array<{ rule: CssRule, combinator: CssCombinatorValues }> = [];
  subsets: Csset[] = [];

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
    // Case 1: both do not contain subsets (list of rules with values)
    if (this.rules.length && set.rules.length) {
      // more specific selector cannot be superset of one less specific
      if (this.rules.length > set.rules.length) {
        return false;
      }

      // iterate backwards to check
      let indexOne = this.rules.length - 1;
      let indexTwo = set.rules.length - 1;

      while(indexOne >= 0) {
        let ruleOne = this.rules[indexOne];
        let ruleTwo = set.rules[indexTwo];
        
        if (!ruleOne.rule.supersetOf(ruleTwo.rule)) {
          return false;
        }
        if (ruleOne.combinator !== ruleTwo.combinator) {

        }

        // everithing okay so decrease indexes
        indexOne--;
        indexTwo--;
      }
      return true;
    }
    // Case 2: both do contain subsets
    // Case 3: this does not & received Csset does
    // Case 3: this does & received Csset does not
    if (this.subsets.length && set.rules.length) {
      let index = this.subsets.length;

      while(index--) {
        if (this.subsets[index].supersetOf(set)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Returns true if this set is contained the one passed as parameter
   * @param set the set to check with
   */
  subsetOf(set: Csset): boolean {
    return set.subsetOf(this);
  }

  toString(): string {
    if (this.rules.length) {
      return this.rules.reduce((acc, rule) => `${acc} ${rule.combinator} ${rule.rule}`, '');
    }

    return this.subsets.reduce((acc, set) => `${acc} ${set}`, '');
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
