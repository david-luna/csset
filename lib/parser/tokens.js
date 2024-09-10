// MIT License

// Copyright (c) 2020 Lea Verou

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
