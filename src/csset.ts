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

const HierarchyCombinators = [CssCombinatorValues.DESCENDANT, CssCombinatorValues.CHILD];
const SiblingCombinators = [CssCombinatorValues.SIBLING, CssCombinatorValues.ADJACENT];

type CssRuleList = Array<{ rule: CssRule, combinator: CssCombinatorValues }>;

export class Csset {
  // These properties are exclusive if one is set the other is undefined
  rules  : CssRuleList = [];
  subsets: Csset[]     = [];

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
      return this.containsRule(this.rules.slice(), set.rules.slice());
    }
    // Case 2: both do contain subsets
    // Case 3: this does not & received Csset does
    if (this.rules.length && set.subsets.length) {
      let index = set.subsets.length;

      while(index--) {
        if (!this.supersetOf(set.subsets[index])) {
          return false;
        }
      }
      return true;
    }
    // Case 4: this does & received Csset does not
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


  /**
   * Fills the list of rules with it's combinators
   * @param selector the selector to parse
   */
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

  private containsRule (containerRules: CssRuleList, contentRules: CssRuleList): boolean {
    // Base case: container is empty (meaning we have checked all its rules)
    if (containerRules.length === 0) {
      return true;
    }

    // Base case: content is empty (meaning we have checked all its rules)
    if (contentRules.length === 0) {
      return false;
    }

    // Base case: container is more specific than content
    if (containerRules.length > contentRules.length) {
      return false;
    }

    // Base case: deepest container does not contain deepest content
    let containerRule = containerRules[containerRules.length - 1];
    let contentRule   = contentRules[contentRules.length - 1];

    if (!containerRule.rule.supersetOf(contentRule!.rule)) {
      return false;
    }

    // The container selector has sibling combinator and not the content selector
    // meaning container is more specific
    if (
      SiblingCombinators.indexOf(containerRule.combinator) !== -1 &&
      HierarchyCombinators.indexOf(contentRule.combinator) !== -1
    ) {
      return false;
    }

    // Align and reset
    this.alignLists(containerRules, contentRules);
    containerRule = containerRules.pop()!;
    contentRule   = contentRules.pop()!;

    // Check if container combinator is more specific that content
    if (
      containerRule.combinator === CssCombinatorValues.CHILD &&
      contentRule.combinator   === CssCombinatorValues.DESCENDANT
    ){
      return false;
    }
    if (
      containerRule.combinator === CssCombinatorValues.ADJACENT &&
      contentRule.combinator   === CssCombinatorValues.SIBLING
    ){
      return false;
    }

    return this.containsRule(containerRules, contentRules);
  }


  private alignLists(listOne: CssRuleList, listTwo: CssRuleList) {
    const oneHasHierarchy = HierarchyCombinators.indexOf(this.getCombinator(listOne)) !== -1;
    const twoHasHierarchy = HierarchyCombinators.indexOf(this.getCombinator(listTwo)) !== -1;
    const needAlignment   = oneHasHierarchy !== twoHasHierarchy;

    if (needAlignment) {
      const selectedList = oneHasHierarchy ? listTwo : listOne;

      while (
        SiblingCombinators.indexOf(this.getCombinator(selectedList)) !== -1 &&
        selectedList.length !== 1
      ) {
        selectedList.pop();
      }
    }
  }

  private getCombinator (list: CssRuleList): CssCombinatorValues {
    return list[list.length - 1].combinator;
  }

}
