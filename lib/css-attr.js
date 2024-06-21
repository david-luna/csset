import { EMPTY_SET } from './symbols.js';
import { createMatcher } from './css-attr-matcher.js';

/**
 * @typedef {ReturnType<import('./css-attr-matcher').createMatcher>} AttrMatcher
 */

/**
 * @class
 */
export class CssAttr {
  /**
   * @param {string} name
   */
  constructor(name) {
    /** @type {string} */
    this.name = name;
    /** @type {Array<AttrMatcher>} */
    this.matchers = [];
    /** @type {boolean} */
    this.empty = false;
  }

  /**
   * TODO: explain about intersections
   * @param {import('./symbols').MatcherSymbol} symbol
   * @param {string} value
   */
  addMatcher(symbol, value) {
    const matcher = createMatcher(symbol, value);

    // Already empty CssAttr continues empty
    if (this.empty) {
      this.matchers.push(matcher);
      return;
    }

    const becomesEmpty = this.matchers.find((m) => m.intersection(matcher) === undefined);
    if (becomesEmpty) {
      this.empty = true;
      this.matchers.push(matcher);
      return;
    }

    /** @type {boolean} */
    let hasIntersection;
    this.matchers = this.matchers.map((m) => {
      const intersect = m.intersection(matcher);
      hasIntersection = hasIntersection || !!intersect;
      return intersect || m;
    });

    if (!hasIntersection) {
      this.matchers.push(matcher);
    }
  }

  /**
   * @param {CssAttr} other
   * @returns {boolean}
   */
  supersetOf(other) {
    if (this.empty) {
      return false;
    }

    const thisMatchers = this.matchers;
    const otherMatchers = other.matchers;

    // To be a superset all matchers in this attribute
    // - must have at least a matcher from the other attr whichis a subset
    // - must not have a void intersection with any matcher from other
    for (const matcher of thisMatchers) {
      const hasSubset = otherMatchers.some((m) => matcher.supersetOf(m));
      const hasVoid = otherMatchers.some((m) => matcher.intersection(m) === undefined);

      if (!hasSubset || hasVoid) {
        return false;
      }
    }

    return true;
  }

  /**
   * @param {CssAttr} other
   * @returns {boolean}
   */
  subsetOf(other) {
    return other.supersetOf(this);
  }

  /**
   * @param {CssAttr} other
   * @returns {CssAttr | null}
   */
  union(other) {
    if (this.empty || other.supersetOf(this)) {
      return other;
    }
    if (this.supersetOf(other)) {
      return this;
    }
    return null;
  }

  /**
   * @param {CssAttr} other
   * @returns {CssAttr}
   */
  intersection(other) {
    if (this.empty) {
      return undefined;
    }
    if (this.supersetOf(other)) {
      return other;
    }
    if (other.supersetOf(this)) {
      return this;
    }
    const intersectAttr = new CssAttr(this.name);
    [...this.matchers, ...other.matchers].forEach((m) => {
      intersectAttr.addMatcher(m.symbol, m.value);
    });
    return intersectAttr;
  }

  /**
   * @returns {string}
   */
  toString() {
    if (this.empty) {
      return EMPTY_SET;
    }

    return this.matchers
      .map((m) => `${m}`)
      .sort()
      .reduce((prev, matcher) => `${prev}[${this.name}${matcher}]`, '');
  }
}
