export const TOKENS = {
  attribute:
    // eslint-disable-next-line max-len
    /\[\s*(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(\s(?<caseSensitive>[iIsS]))?\s*)?\]/gu,
  id: /#(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
  class: /\.(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
  comma: /\s*,\s*/g, // must be before combinator
  combinator: /\s*[\s>+~]\s*/g, // this must be after attribute
  'pseudo-element': /::(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶+)\))?/gu, // this must be before pseudo-class
  'pseudo-class': /:(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶+)\))?/gu,
  universal: /(?:(?<namespace>\*|[-\w]*)\|)?\*/gu,
  type: /(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)|\*/gu, // this must be last
};

export const TOKENS_WITH_PARENS = new Set(['pseudo-class', 'pseudo-element']);
export const TOKENS_WITH_STRINGS = new Set([...TOKENS_WITH_PARENS, 'attribute']);
export const TRIM_TOKENS = new Set(['combinator', 'comma']);
export const RECURSIVE_PSEUDO_CLASSES = new Set([
  'not',
  'is',
  'where',
  'has',
  'matches',
  '-moz-any',
  '-webkit-any',
  'nth-child',
  'nth-last-child',
]);

const childRegexp = /(?<index>[\dn+-]+)\s+of\s+(?<subtree>.+)/;
/** @type {Record<string, RegExp>} */
export const RECURSIVE_PSEUDO_CLASSES_ARGS = {
  'nth-child': childRegexp,
  'nth-last-child': childRegexp,
};

export const TOKENS_FOR_RESTORE = Object.assign({}, TOKENS);
for (const pseudoType of ['pseudo-element', 'pseudo-class']) {
  const key = pseudoType;
  TOKENS_FOR_RESTORE[key] = RegExp(TOKENS[key].source.replace('(?<argument>¶+)', '(?<argument>.+)'), 'gu');
}
