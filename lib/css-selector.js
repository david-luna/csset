import {
  COMBINATOR_ADJACENT,
  COMBINATOR_CHILD,
  COMBINATOR_DESCENDANT,
  COMBINATOR_NONE,
  COMBINATOR_SIBLING,
  EMPTY_SET,
} from './symbols.js';

/**
 * @typedef {Object} CombinedRule
 * @property {import('./css-rule').CssRule} rule
 * @property {import('./symbols').CombinatorSymbol} combinator
 */

/**
 * @class
 */
export class CssSelector {
  /** @type {boolean} */
  empty = false;
  /** @type {Array<Array<CombinedRule>>} */
  levels = [[]];

  /**
   * @param {import('./css-rule').CssRule} rule
   * @param {import('./symbols').CombinatorSymbol} combinator
   */
  addRule(rule, combinator) {
    const currLevel = this.levels[this.levels.length - 1];
    const item = { rule, combinator };

    currLevel.push(item);
    if (combinator === COMBINATOR_DESCENDANT || combinator === COMBINATOR_CHILD) {
      this.levels.push([]);
    }
  }

  /**
   * @param {CssSelector} other
   * @returns {boolean}
   */
  supersetOf(other) {
    const thisLevels = this.levels.slice();
    const otherLevels = other.levels.slice();

    // Base case: `this` is more specific than `other`
    // a b c
    // a b
    if (thisLevels.length > otherLevels.length) {
      return false;
    }

    return compareLevels(thisLevels, otherLevels);
  }

  /**
   * @param {CssSelector} other
   * @returns {boolean}
   */
  subsetOf(other) {
    return other.supersetOf(this);
  }

  /**
   * @param {CssSelector} other
   * @returns {CssSelector | undefined}
   */
  intersection(other) {
    if (this.supersetOf(other)) {
      return other;
    }

    if (other.supersetOf(this)) {
      return this;
    }

    // TODO: other possible cases??
    return undefined;
  }

  /**
   * @returns {string}
   */
  toString() {
    if (this.empty) {
      return EMPTY_SET;
    }

    let result = '';
    this.levels.forEach((level) => {
      level.forEach(({ rule, combinator }) => {
        const comb = combinator ? ` ${combinator} ` : ' ';
        result += `${rule}${comb}`;
      });
    });

    return result.trim();
  }
}

/**
 * Returns TRUE if layers of the left is a superset of the layers of the right
 * @param {Array<Array<CombinedRule>>} leftLevels
 * @param {Array<Array<CombinedRule>>} rightLevels
 */
function compareLevels(leftLevels, rightLevels) {
  // Base case: left is empty (meaning we have checked all its rules)
  // *
  // a
  if (leftLevels.length === 0) {
    return true;
  }

  // Base case: right is empty (meaning we have checked all its rules)
  // a
  // *
  if (rightLevels.length === 0) {
    return false;
  }

  const leftLevel = leftLevels.at(-1);
  const rightLevel = rightLevels.at(-1);

  // Base case: leftLevel has stronger relationship with its descendant than rightLevel
  // a > b > d
  // a > b d
  const leftComb = leftLevel.at(-1).combinator;
  const rightComb = rightLevel.at(-1).combinator;
  if (leftComb === COMBINATOR_CHILD && rightComb === COMBINATOR_DESCENDANT) {
    return false;
  }

  // Check the current layers and go deeper if left is superset of right
  // a > b > c
  // a > b > c > d > e
  if (compareSingleLevel(leftLevel, rightLevel)) {
    return compareLevels(leftLevels.slice(0, -1), rightLevels.slice(0, -1));
  }

  // If the deepest layer isn't a superset then selector can't be
  // c > e
  // a > c > (d
  // If CHILD it should had match before
  // a > b > (d
  // a > c > (d
  // if (descendantCombOne === Combinators.CHILD || descendantCombOne === Combinators.NONE) {
  if (leftComb === COMBINATOR_CHILD || leftComb === COMBINATOR_NONE) {
    return false;
  }

  // For generic sibling walk up the second list of rules
  return compareLevels(leftLevels, rightLevels.slice(0, -1));
}

/**
 * Returns TRUE the left level is superset of the right
 * @param {Array<CombinedRule>} leftLevel
 * @param {Array<CombinedRule>} rightLevel
 */
function compareSingleLevel(leftLevel, rightLevel) {
  // Base case: leftLevel is empty (meaning we have checked all its rules)
  if (leftLevel.length === 0) {
    return true;
  }

  // Base case: rightLevel is empty (meaning we have checked all its layer)
  if (rightLevel.length === 0) {
    return false;
  }

  // Base case: leftLevel is more specific than rightLevel
  if (leftLevel.length > rightLevel.length) {
    return false;
  }

  const leftCmbRule = leftLevel.at(-1);
  const rightCmbRule = rightLevel.at(-1);

  // Base case: combinator on the left has stronger relationship with sibling than combinator on the right
  // a + b + (d
  // a + b ~ (d
  if (leftCmbRule.combinator === COMBINATOR_ADJACENT && rightCmbRule.combinator === COMBINATOR_SIBLING) {
    return false;
  }

  // Check if current rule is superset and go deeper if so
  // a + b ~ d
  // a + b + c + d
  if (leftCmbRule.rule.supersetOf(rightCmbRule.rule)) {
    return compareSingleLevel(leftLevel.slice(0, -1), rightLevel.slice(0, -1));
  }

  // If ADJACENT or NONE it should had match before
  if (leftCmbRule.combinator === COMBINATOR_ADJACENT) {
    return false;
  }

  // For generic sibling walk up the second list
  return compareSingleLevel(leftLevel, rightLevel.slice(0, -1));
}
