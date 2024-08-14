/* eslint-disable max-classes-per-file */
import {
  MATCHER_CONTAINS,
  MATCHER_EQUAL,
  MATCHER_OCCURRENCE,
  MATCHER_PREFIX,
  MATCHER_PRESENCE,
  MATCHER_SUBCODE,
  MATCHER_SUFFIX,
} from './symbols.js';

/** @class */
class CssAttrMatcher {
  constructor(value) {
    /** @type {string} */
    this.value = value;
    /** @type {import('./symbols').MatcherSymbol} */
    this.symbol = undefined;
  }
  /**
   * @param {CssAttrMatcher} other
   * @returns {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  supersetOf(other) {
    throw new Error('method not implemented');
  }
  /**
   * @param {CssAttrMatcher} other
   * @returns {boolean}
   */
  subsetOf(other) {
    return this.supersetOf(other);
  }
  /**
   * @param {CssAttrMatcher} other
   * @returns {CssAttrMatcher | null}
   */
  union(other) {
    if (this.supersetOf(other)) {
      return this;
    }
    if (other.supersetOf(this)) {
      return other;
    }
    return null;
  }
  /**
   * @param {CssAttrMatcher} other
   * @returns {CssAttrMatcher | null | undefined}
   */
  intersection(other) {
    if (this.supersetOf(other)) {
      return other;
    } else if (other.supersetOf(this)) {
      return this;
    }

    // Equals intersect with any other matcher
    if (this.symbol === MATCHER_EQUAL || other.symbol === MATCHER_EQUAL) {
      if (other.value !== this.value) {
        return undefined;
      }
    }

    return null;
  }
  /**
   * @returns {string}
   */
  toString() {
    return `${this.symbol}="${this.value}"`;
  }
}

/** @extends CssAttrMatcher */
class ContainsMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_CONTAINS;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  supersetOf(other) {
    const supersetSymbols = {
      [MATCHER_PREFIX]: true,
      [MATCHER_SUFFIX]: true,
      [MATCHER_SUBCODE]: true,
      [MATCHER_OCCURRENCE]: true,
      [MATCHER_CONTAINS]: true,
      [MATCHER_EQUAL]: true,
    };
    if (supersetSymbols[other.symbol]) {
      return other.value.indexOf(this.value) !== -1;
    }
    return false;
  }
  /**
   * @override
   */
  toString() {
    return `*="${this.value}"`;
  }
}

/** @extends CssAttrMatcher */
class EqualsMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_EQUAL;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  supersetOf(other) {
    return other.symbol === MATCHER_EQUAL && this.value === other.value;
  }
  /**
   * @override
   */
  toString() {
    return `="${this.value}"`;
  }
}

/** @extends CssAttrMatcher */
class OccurenceMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_OCCURRENCE;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  supersetOf(other) {
    if (other.symbol === MATCHER_EQUAL || other.symbol === MATCHER_OCCURRENCE) {
      return other.value === this.value;
    }
    return false;
  }
  intersection(other) {
    if (this.value === other.value && other.symbol === MATCHER_EQUAL) {
      return other;
    }
    return super.intersection(other);
  }
}

/** @extends CssAttrMatcher */
class PrefixMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_PREFIX;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  supersetOf(other) {
    const supersetSymbols = {
      [MATCHER_PREFIX]: true,
      [MATCHER_SUBCODE]: true,
      [MATCHER_EQUAL]: true,
    };
    if (supersetSymbols[other.symbol]) {
      return other.value.startsWith(this.value);
    }
    return false;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  union(other) {
    if (this.value === other.value && other.symbol === MATCHER_SUBCODE) {
      return this;
    }
    return super.union(other);
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  intersection(other) {
    if (this.value === other.value && other.symbol === MATCHER_EQUAL) {
      return other;
    }
    if (other.value.startsWith(this.value) && (other.symbol === MATCHER_PREFIX || other.symbol === MATCHER_SUBCODE)) {
      return other;
    }
    if (this.value.startsWith(other.value) && other.symbol === MATCHER_PREFIX) {
      return this;
    }
    if (other.symbol === MATCHER_PREFIX && this.value !== other.value) {
      return undefined;
    }
    return super.intersection(other);
  }
}

/** @extends CssAttrMatcher */
class PresenceMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_PRESENCE;
  }
  /** @override */
  supersetOf() {
    return true;
  }
  /** @override */
  toString() {
    return '';
  }
}

/** @extends CssAttrMatcher */
class SubcodeMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_SUBCODE;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  supersetOf(other) {
    const supersetSymbols = {
      [MATCHER_EQUAL]: true,
      [MATCHER_SUBCODE]: true,
    };
    return !!supersetSymbols[other.symbol] && this.value === other.value;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  union(other) {
    if (other.symbol === MATCHER_SUBCODE && this.value === other.value) {
      return this;
    }
    return super.union(other);
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  intersection(other) {
    if (other.symbol === MATCHER_PREFIX && this.value.startsWith(other.value)) {
      return this;
    }
    return super.intersection(other);
  }
}

/** @extends CssAttrMatcher */
class SuffixMatcher extends CssAttrMatcher {
  constructor(value) {
    super(value);
    this.symbol = MATCHER_SUFFIX;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  supersetOf(other) {
    if (other.symbol === MATCHER_EQUAL || other.symbol == MATCHER_SUFFIX) {
      return other.value.endsWith(this.value);
    }
    return false;
  }
  /**
   * @override
   * @param {CssAttrMatcher} other
   */
  intersection(other) {
    if (other.symbol === MATCHER_SUFFIX) {
      if (this.value.endsWith(other.value)) {
        return this;
      } else if (other.value.endsWith(this.value)) {
        return other;
      } else if (this.value !== other.value) {
        return undefined;
      }
    }
    return super.intersection(other);
  }
}

/**
 * @param {import('./symbols').MatcherSymbol} symbol
 * @param {string} value
 * @return {CssAttrMatcher}
 */
export function createMatcher(symbol, value) {
  const CTOR_MAP = {
    [MATCHER_CONTAINS]: ContainsMatcher,
    [MATCHER_EQUAL]: EqualsMatcher,
    [MATCHER_OCCURRENCE]: OccurenceMatcher,
    [MATCHER_PREFIX]: PrefixMatcher,
    [MATCHER_PRESENCE]: PresenceMatcher,
    [MATCHER_SUBCODE]: SubcodeMatcher,
    [MATCHER_SUFFIX]: SuffixMatcher,
  };

  if (!CTOR_MAP[symbol]) {
    throw new SyntaxError(`Attribute matcher symbol "${symbol}" not recognized`);
  }

  return new CTOR_MAP[symbol](value);
}
