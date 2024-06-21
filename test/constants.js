/**
 * @typedef {'supersetOf' | 'notSupersetOf' | 'subsetOf' | 'union' | 'intersection'} MatcherOperation
 */

/** @type {Record<MatcherOperation, any>} */
export const OPERATION_CHARS = {
  supersetOf: '\u2283',
  notSupersetOf: '\u2285',
  subsetOf: '\u2282',
  union: '\u222A',
  intersection: '\u2229',
};
