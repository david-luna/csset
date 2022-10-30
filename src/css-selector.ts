import { CssRule } from './css-rule';
import { Combinators, CssTokenType } from './types';
import { CssSelectorLexer } from './css-selector-lexer';
import { CssAttribute } from './css-attribute';

interface CombinedRule {
  rule: CssRule;
  comb: Combinators;
}

type SelectorLevel = Array<CombinedRule>;

const isAncestor = (combinedRule: CombinedRule): boolean => {
  return [Combinators.DESCENDANT, Combinators.CHILD].indexOf(combinedRule.comb) !== -1;
};

export class CssSelector {
  levels: SelectorLevel[] = [[]];

  constructor(selectorStr: string) {
    this.parse(selectorStr);
  }

  addRule(combRule: CombinedRule): void {
    const currentLevel = this.levels[this.levels.length - 1];

    if (isAncestor(combRule)) {
      currentLevel.push(combRule);
      this.levels.push([]);
    } else {
      currentLevel.push(combRule);
    }
  }

  supersetOf(selector: CssSelector): boolean {
    return this.selectorSuperset(this.levels, selector.levels);
  }

  subsetOf(selector: CssSelector): boolean {
    return selector.supersetOf(this);
  }

  intersection(selector: CssSelector): CssSelector | void {
    if (this.supersetOf(selector)) {
      return selector;
    }

    if (selector.supersetOf(this)) {
      return this;
    }

    // TODO: other possible cases??
    return void 0;
  }

  toString(): string {
    let result = '';
    this.levels.forEach((level) => {
      level.forEach((combinedRule) => {
        const comb = combinedRule.comb ? ` ${combinedRule.comb} ` : ' ';
        result += `${combinedRule.rule}${comb}`;
      });
    });

    return result.trim();
  }

  /**
   * Fills the list of rules with it's combinators
   * @param selectorStr the selector to parse
   */
  private parse(selectorStr: string): void {
    const lexer = new CssSelectorLexer(selectorStr);
    let rule = new CssRule();
    let token;

    while ((token = lexer.nextToken())) {
      switch (token.type) {
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
          const comb = token.values[0] as Combinators;
          const combRule = { rule, comb };

          rule = new CssRule();
          this.addRule(combRule);
          break;
        default:
          throw new SyntaxError(`Unknown token ${token.values[0]} at position ${token.position}`);
      }
    }
    // last rule should be pushed in the layer
    this.addRule({ rule, comb: Combinators.NONE });
  }

  private selectorSuperset(selectorOne: SelectorLevel[], selectorTwo: SelectorLevel[]): boolean {
    // Base case: container is empty (meaning we have checked all its rules)
    // *
    // a
    if (selectorOne.length === 0) {
      return true;
    }

    // Base case: selectorTwo is empty (meaning we have checked all its rules)
    // a
    // *
    if (selectorTwo.length === 0) {
      return false;
    }

    // Base case: selectorOne is more specific than selectorTwo
    // a b c
    // a b
    if (selectorOne.length > selectorTwo.length) {
      return false;
    }

    const layerOne = selectorOne[selectorOne.length - 1];
    const layerTwo = selectorTwo[selectorTwo.length - 1];

    // Base case: layerOne has stronger relationship with descendant than layerTwo
    // a > b > (d
    // a > b (d
    const descendantCombOne = layerOne[layerOne.length - 1].comb;
    const descendantCombTwo = layerTwo[layerTwo.length - 1].comb;
    if (descendantCombOne === Combinators.CHILD && descendantCombTwo === Combinators.DESCENDANT) {
      return false;
    }

    // a > b > c
    // a > b > c > d > e
    if (this.levelSuperset(layerOne, layerTwo)) {
      return this.selectorSuperset(selectorOne.slice(0, -1), selectorTwo.slice(0, -1));
    }

    // If the deepest layer isn't a superset then selector can't be
    // c > e
    // a > c > (d
    // If CHILD it should had match before
    // a > b > (d
    // a > c > (d
    if (descendantCombOne === Combinators.CHILD || descendantCombOne === Combinators.NONE) {
      return false;
    }

    // For generic sibling walk up the second list of rules
    return this.selectorSuperset(selectorOne, selectorTwo.slice(0, -1));
  }

  private levelSuperset(levelOne: SelectorLevel, levelTwo: SelectorLevel): boolean {
    // Base case: container is empty (meaning we have checked all its rules)
    if (levelOne.length === 0) {
      return true;
    }

    // Base case: levelTwo is empty (meaning we have checked all its layer)
    if (levelTwo.length === 0) {
      return false;
    }

    // Base case: levelOne is more specific than levelTwo
    if (levelOne.length > levelTwo.length) {
      return false;
    }

    const combinedRuleOne = levelOne[levelOne.length - 1];
    const combinedRuleTwo = levelTwo[levelTwo.length - 1];

    // Base case: combinedRuleOne has stronger relationship with sibling than combinedRuleTwo
    // a + b + (d
    // a + b ~ (d
    const siblingCombOne = combinedRuleOne.comb;
    const siblingCombTwo = combinedRuleTwo.comb;
    if (siblingCombOne === Combinators.ADJACENT && siblingCombTwo === Combinators.SIBLING) {
      return false;
    }

    // a + b ~ d
    // a + b + c + d
    if (combinedRuleOne.rule.supersetOf(combinedRuleTwo.rule)) {
      return this.levelSuperset(levelOne.slice(0, -1), levelTwo.slice(0, -1));
    }

    // If ADJACENT it should had match before
    if (combinedRuleOne.comb === Combinators.ADJACENT) {
      return false;
    }

    // For generic sibling walk up the second list
    return this.levelSuperset(levelOne, levelTwo.slice(0, -1));
  }
}
