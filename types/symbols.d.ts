/** @typedef {''|'='|'^'|'$'|'*'|'|'|'~'} MatcherSymbol */
/** @type {MatcherSymbol} */
export const MATCHER_PRESENCE: MatcherSymbol;
/** @type {MatcherSymbol} */
export const MATCHER_EQUAL: MatcherSymbol;
/** @type {MatcherSymbol} */
export const MATCHER_PREFIX: MatcherSymbol;
/** @type {MatcherSymbol} */
export const MATCHER_SUFFIX: MatcherSymbol;
/** @type {MatcherSymbol} */
export const MATCHER_CONTAINS: MatcherSymbol;
/** @type {MatcherSymbol} */
export const MATCHER_SUBCODE: MatcherSymbol;
/** @type {MatcherSymbol} */
export const MATCHER_OCCURRENCE: MatcherSymbol;
/** @typedef {''|'+'|'~'|' '|'>'} CombinatorSymbol */
export const COMBINATOR_NONE: "";
export const COMBINATOR_ADJACENT: "+";
export const COMBINATOR_SIBLING: "~";
export const COMBINATOR_DESCENDANT: " ";
export const COMBINATOR_CHILD: ">";
export const EMPTY_SET: "ø";
export type MatcherSymbol = '' | '=' | '^' | '$' | '*' | '|' | '~';
export type CombinatorSymbol = '' | '+' | '~' | ' ' | '>';
