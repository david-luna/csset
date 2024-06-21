/** @typedef {''|'='|'^'|'$'|'*'|'|'|'~'} MatcherSymbol */
// Attribute Matcher symbols
/** @type {MatcherSymbol} */
export const MATCHER_PRESENCE = '';
/** @type {MatcherSymbol} */
export const MATCHER_EQUAL = '=';
/** @type {MatcherSymbol} */
export const MATCHER_PREFIX = '^';
/** @type {MatcherSymbol} */
export const MATCHER_SUFFIX = '$';
/** @type {MatcherSymbol} */
export const MATCHER_CONTAINS = '*';
/** @type {MatcherSymbol} */
export const MATCHER_SUBCODE = '|';
/** @type {MatcherSymbol} */
export const MATCHER_OCCURRENCE = '~';

/** @typedef {''|'+'|'~'|' '|'>'} CombinatorSymbol */
// Selector combinator symbols
export const COMBINATOR_NONE = '';
export const COMBINATOR_ADJACENT = '+';
export const COMBINATOR_SIBLING = '~';
export const COMBINATOR_DESCENDANT = ' ';
export const COMBINATOR_CHILD = '>';

// String representation of an empty set
export const EMPTY_SET = '\u00f8';
