import { CssAttr } from './css-attr.js';
import { CssRule } from './css-rule.js';
import { CssSelector } from './css-selector.js';
import { tokenize } from './parser/tokenize.js';
import { EMPTY_SET } from './symbols.js';

/**
 * @class
 */
export class Csset {
  /** @type {boolean} */
  empty = false;
  /** @type {Array<import('./css-selector').CssSelector>} */
  selectors = [];

  /**
   * @param {string} input
   */
  constructor(input) {
    /** @type {Array<Token>} */
    let tokens;

    // Check for problems in the input
    try {
      // @ts-ignore
      tokens = tokenize(input);
    } catch (err) {
      throw SyntaxError(`${err}`);
    }

    if (!tokens) {
      throw SyntaxError(`Input ${input} cannot be parsed.`);
    }

    const unknownToken = tokens.find((t) => typeof t === 'string');
    if (unknownToken) {
      throw SyntaxError(`Unknown string ${unknownToken} in input ${input}`);
    }

    // Consume tokens
    /** @type {Array<CssSelector>} */
    const selectorList = [];
    let currentSelector = new CssSelector();
    let currentRule = new CssRule();
    let attr;
    tokens.forEach((t) => {
      switch (t.type) {
        case 'universal':
          // rules are universal by default
          break;
        case 'id':
          currentRule.id = t.name;
          break;
        case 'type':
          currentRule.element = t.name;
          break;
        case 'class':
          currentRule.addClass(t.name);
          break;
        case 'attribute':
          attr = new CssAttr(t.name);
          // Notes:
          // - attribute pressence has no operator neither value
          // - attribute values can come surrounded by "
          attr.addMatcher(
            // @ts-ignore
            (t.operator && t.operator[0]) || '',
            // eslint-disable-next-line prettier/prettier
            t.value && t.value.startsWith('"') && t.value.endsWith('"') ?
              t.value.slice(1, -1) :
              t.value || '',
          );
          currentRule.addAttr(attr);
          break;
        case 'pseudo-class':
          // TODO: ???
          break;
        case 'pseudo-element':
          // TODO: ???
          break;
        case 'combinator':
          // @ts-ignore
          currentSelector.addRule(currentRule, t.content);
          currentRule = new CssRule();
          break;
        case 'comma':
          currentSelector.addRule(currentRule, '');
          selectorList.push(currentSelector);
          currentRule = new CssRule();
          currentSelector = new CssSelector();
          break;
      }
    });
    // Add current rule & selector when reach end of input
    currentSelector.addRule(currentRule, '');
    selectorList.push(currentSelector);

    // Calculate the final list of selectors. We will remove any selector
    // which is subset of any of the others
    selectorList.forEach((curr) => {
      // if one of the selectors is a superset do not add
      const hasSuperset = this.selectors.find((s) => s.supersetOf(curr));
      if (!hasSuperset) {
        // remove any subset of the incoming selector
        this.selectors = this.selectors.filter((s) => !s.subsetOf(curr));

        // add the incoming selector
        this.selectors.push(curr);
      }
    });
  }

  /**
   * @param {Csset} other
   * @returns {boolean}
   */
  supersetOf(other) {
    // To be superset all selectors from other must be a subset of any
    // of the selectors of this Csset
    return other.selectors.every((otherSel) => {
      return this.selectors.some((thisSel) => thisSel.supersetOf(otherSel));
    });
  }

  /**
   * @param {Csset} other
   * @returns {boolean}
   */
  subsetOf(other) {
    return other.supersetOf(this);
  }

  /**
   * @param {Csset} other
   * @returns {Csset}
   */
  union(other) {
    if (this.supersetOf(other)) {
      return this;
    }

    if (this.subsetOf(other)) {
      return other;
    }

    // Constructor takes care of duplicated and possible subsets
    // so it is as easy as create a new set
    return new Csset([...this.selectors, ...other.selectors].join(','));
  }

  /**
   * @param {Csset} other
   * @returns {Csset | undefined}
   */
  intersection(other) {
    if (this.supersetOf(other)) {
      return other;
    }

    if (this.subsetOf(other)) {
      return this;
    }

    // Make intersection of selectors if possible
    // 1st attempt brute force (intersecting every set with others)
    const intersections = this.selectors
      .map((thisSel) => other.selectors.map((otherSel) => thisSel.intersection(otherSel)))
      .reduce((flat, val) => flat.concat(val), [])
      .filter((val) => !!val && !val.empty)
      .map((val) => `${val}`);

    if (intersections.length) {
      return new Csset(`${intersections.join(',')}`);
    }

    const result = new Csset('*');
    result.empty = true;

    return result;
  }

  /**
   * @returns {string}
   */
  toString() {
    if (this.empty) {
      return EMPTY_SET;
    }

    return this.selectors.map((s) => `${s}`).join(', ');
  }
}
