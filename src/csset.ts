import { CssRule } from "./css-rule";
import { CssSelectorLexer } from "./css-selector-lexer";
import { CssAttribute } from "./css-attribute";
import { CssTokenType, CombinatorValues } from "./types";

const isAncestor = (combinedRule: CombinedRule): boolean => {
  return [CombinatorValues.DESCENDANT, CombinatorValues.CHILD].indexOf(combinedRule.comb) !== -1;
};

interface CombinedRule {
  rule: CssRule;
  comb: CombinatorValues;
}

type SiblingRules = Array<CombinedRule>;
type LayeredRules = Array<SiblingRules>;


export class Csset {
  // These properties are exclusive if one is set the other is undefined
  layers : LayeredRules;
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
      this.layers = [[]];
      this.parseSelector(selector);
    }
  }

  /**
   * Returns true if this set contains the one passed as parameter
   * @param set the set to check with
   */
  supersetOf(set: Csset): boolean {
    // Case 1: both do not contain subsets (list of rules with values)
    if (this.layers && set.layers) {
      return this.rulesSuperset(this.layers, set.layers);
    }
    // Case 2: both do contain subsets (all subsets must be contained)
    if (this.subsets?.length && set.subsets?.length) {
      let index = set.subsets.length;

      while(index--) {
        const containerIndex = this.subsets.findIndex(s => s.supersetOf(set.subsets[index]));

        if (containerIndex === -1) {
          return false;
        }
      }
      return true;
    }
    // Case 3: this does not & received Csset does (all subsets must be contained)
    if (this.layers?.length && set.subsets?.length) {
      let index = set.subsets.length;

      while(index--) {
        if (!this.supersetOf(set.subsets[index])) {
          return false;
        }
      }
      return true;
    }
    // Case 4: this does & received Csset does not (one of my subsets must contain)
    if (this.subsets?.length && set.layers?.length) {
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
    return set.supersetOf(this);
  }

  /**
   * Returns a new CSS set which is the union of this one and the passed as parameter
   * @param set the other CSS set to be united with
   */
  union(set: Csset): Csset {
    if (this.supersetOf(set)) {
      return this;
    }

    if (this.subsetOf(set)) {
      return set;
    }

    // If one of the sets does not have subsets just return a set with all
    if (this.layers || set.layers) {
      return new Csset(`${this},${set}`);
    }

    // Make union of subsets if possible
    const equalSets = this.subsets.filter(thisSet => set.subsets.some(otherSet => `${thisSet}` === `${otherSet}`));
    const uniqueOne = this.subsets.filter(s => !s.subsetOf(set));
    const uniqueTwo = set.subsets.filter(s => !s.subsetOf(this));
    
    const equSelector = equalSets.map(s => `${s}`).join(',');
    const oneSelector = uniqueOne.map(s => `${s}`).join(',');
    const twoSelector = uniqueTwo.map(s => `${s}`).join(',');


    return new Csset(`${equSelector},${oneSelector},${twoSelector}`);
  }

  /**
   * Returns a new CSS set which is the intersection of this one and the passed as parameter
   * or void if the intersection is an empty set
   * @param set the other CSS set to be united with
   */
  intersection(set: Csset): Csset | void {
    if (this.supersetOf(set)) {
      return set;
    }

    if (this.subsetOf(set)) {
      return this;
    }

    // If non of them has subsets means they're just single selectors so there is no
    // selector to represent intersection
    if (this.layers && set.layers) {
      return void 0;
    }

    return void 0;

    // // Make intersection of subsets if possible
    // const equalSets = this.subsets.filter(thisSet => set.subsets.some(otherSet => `${thisSet}` === `${otherSet}`));
    // // TODO: calculate all crossed intersections
    // // TODO: maybe merge subsets while parsing to simplify other operations?
    // // so now we do not need to calculate intersection between subsets of the same Csset
    // const uniqueOne = this.subsets.filter(s => !s.subsetOf(set));
    // const uniqueTwo = set.subsets.filter(s => !s.subsetOf(this));
    
    // const equSelector = equalSets.map(s => `${s}`).join(',');
    // const oneSelector = uniqueOne.map(s => `${s}`).join(',');
    // const twoSelector = uniqueTwo.map(s => `${s}`).join(',');


    // return new Csset(`${equSelector},${oneSelector},${twoSelector}`);
  }

  toString(): string {
    if (this.layers?.length) {
      let result = '';
      this.layers.forEach(layer => {
        layer.forEach(combinedRule => {
          const comb = combinedRule.comb ? ` ${combinedRule.comb} ` : ' ';
          result += `${combinedRule.rule}${comb}`;
        });
      });

      return result.trim();
    }

    return this.subsets.map(s => `${s}`).join(',');
  }


  /**
   * Fills the list of rules with it's combinators
   * @param selector the selector to parse
   */
  private parseSelector(selector: string): void {
    const lexer = new CssSelectorLexer(selector);
    let rule    = new CssRule();
    let layer   = this.layers[0];
    let token;

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
          const comb     = token.values[0] as CombinatorValues;
          const combRule = { rule, comb };
          
          rule = new CssRule();
          if (isAncestor(combRule)) {
            layer.push(combRule)
            this.layers.push([]);
            layer = this.layers[this.layers.length - 1];
          } else {
            layer.push(combRule);
          }
          break;
        default:
          throw new SyntaxError(`Unknown token ${token.values[0]} at position ${token.position}`);
      }
    }
    // last rule should be pushed in the layer
    layer.push({ rule, comb: CombinatorValues.NONE });
  }

  private rulesSuperset(rulesOne: LayeredRules, rulesTwo: LayeredRules): boolean {
    // Base case: container is empty (meaning we have checked all its rules)
    // *
    // a
    if (rulesOne.length === 0) {
      return true;
    }

    // Base case: rulesTwo is empty (meaning we have checked all its rules)
    // a
    // *
    if (rulesTwo.length === 0) {
      return false;
    }

    // Base case: rulesOne is more specific than rulesTwo
    // a b c
    // a b
    if (rulesOne.length > rulesTwo.length) {
      return false;
    }

    const layerOne = rulesOne[rulesOne.length - 1];
    const layerTwo = rulesTwo[rulesTwo.length - 1];

    // Base case: layerOne has stronger relationship with descendant than layerTwo
    // a > b > (d
    // a > b (d
    const descendantCombOne = layerOne[layerOne.length - 1].comb;
    const descendantCombTwo = layerTwo[layerTwo.length - 1].comb;
    if (descendantCombOne === CombinatorValues.CHILD && descendantCombTwo === CombinatorValues.DESCENDANT) {
      return false;
    }

    // a > b > c
    // a > b > c > d > e
    if (this.layerSuperset(layerOne, layerTwo)) {
      return this.rulesSuperset(rulesOne.slice(0, -1), rulesTwo.slice(0, -1));
    }

    // If the deepest layer isn't a superset then selector can't be
    // c > e
    // a > c > (d
    // If CHILD it should had match before
    // a > b > (d
    // a > c > (d
    if (descendantCombOne === CombinatorValues.CHILD || descendantCombOne === CombinatorValues.NONE) {
      return false;
    }

    // For generic sibling walk up the second list of rules
    return this.rulesSuperset(rulesOne, rulesTwo.slice(0, -1));
  }


  private layerSuperset(layerOne: SiblingRules, layerTwo: SiblingRules): boolean {
    // Base case: container is empty (meaning we have checked all its rules)
    if (layerOne.length === 0) {
      return true;
    }

    // Base case: layerTwo is empty (meaning we have checked all its layer)
    if (layerTwo.length === 0) {
      return false;
    }

    // Base case: layerOne is more specific than layerTwo
    if (layerOne.length > layerTwo.length) {
      return false;
    }

    const combinedRuleOne = layerOne[layerOne.length - 1];
    const combinedRuleTwo = layerTwo[layerTwo.length - 1];

    // Base case: combinedRuleOne has stronger relationship with sibling than combinedRuleTwo
    // a + b + (d
    // a + b ~ (d
    const siblingCombOne = combinedRuleOne.comb;
    const siblingCombTwo = combinedRuleTwo.comb;
    if (siblingCombOne === CombinatorValues.ADJACENT && siblingCombTwo === CombinatorValues.SIBLING) {
      return false;
    }

    // a + b ~ d
    // a + b + c + d
    if (combinedRuleOne.rule.supersetOf(combinedRuleTwo.rule)) {
      return this.layerSuperset(layerOne.slice(0, -1), layerTwo.slice(0, -1));
    }

    // If ADJACENT it should had match before
    if (combinedRuleOne.comb === CombinatorValues.ADJACENT) {
      return false;
    }

    // For generic sibling walk up the second list
    return this.layerSuperset(layerOne, layerTwo.slice(0, -1));
  }
}
