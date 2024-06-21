import assert from 'node:assert';
import { test } from 'node:test';

import { OPERATION_CHARS } from './constants.js';
import { CssAttr } from '../lib/css-attr.js';
import { MATCHER_CONTAINS, MATCHER_OCCURRENCE, MATCHER_PREFIX, MATCHER_SUFFIX } from '../lib/symbols.js';

/**
 * @typedef {import('../lib/symbols').MatcherSymbol} MatcherSymbol
 */

test('CssAttr - toString should be canonical', () => {
  /** @type {Array<[MatcherSymbol, string]>} */
  const matchers = [
    [MATCHER_CONTAINS, 'a'],
    [MATCHER_OCCURRENCE, 'b'],
    [MATCHER_PREFIX, 'c'],
    [MATCHER_SUFFIX, 'd'],
  ];

  const expected = '[attr$="d"][attr*="a"][attr^="c"][attr~="b"]';
  const attr1 = new CssAttr('attr');
  const attr2 = new CssAttr('attr');

  matchers.forEach(([s, v], i) => {
    const [s2, v2] = matchers[matchers.length - 1 - i];
    attr1.addMatcher(s, v);
    attr2.addMatcher(s2, v2);
  });

  assert.strictEqual(attr1.toString(), expected);
  assert.strictEqual(attr2.toString(), expected);
});

test('CssAttr - addMatcher', () => {
  const attr = new CssAttr('attr');
  attr.addMatcher(MATCHER_PREFIX, 'valueA');
  attr.addMatcher(MATCHER_SUFFIX, 'valueB');
  assert.strictEqual(
    attr.toString(),
    '[attr$="valueB"][attr^="valueA"]',
    'should keep matchers if they cannot intersect',
  );

  /** @type {Array<[string, string, string]>} */
  const data = [
    ['[attr^=value]', '[attr^=valueA]', '[attr^="valueA"]'],
    ['[attr*=value]', '[attr^=valueA]', '[attr^="valueA"]'],
    ['[attr]', '[attr$=valueA]', '[attr$="valueA"]'],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const [symbol1, value1] = parseMatcher(s1);
    const [symbol2, value2] = parseMatcher(s2);

    // eslint-disable-next-line no-shadow
    const attr = new CssAttr('attr');
    attr.addMatcher(symbol1, value1);
    attr.addMatcher(symbol2, value2);
    assert.strictEqual(attr.toString(), expected, 'should merge matchers if they can intersect');
  });
});

test('CssAttr - supersetOf', () => {
  /** @type {Array<[string, string, boolean]>} */
  let data = [
    ['[attr]', '[attr]', true],
    ['[attr=value]', '[attr=value]', true],
    ['[attr=value]', '[attr=valu€]', false],
    ['[attr^=value]', '[attr^=value]', true],
    ['[attr^=value]', '[attr^=valuelong]', true],
    ['[attr^=value]', '[attr^=wrongvalue]', false],
    ['[attr$=value]', '[attr$=value]', true],
    ['[attr$=value]', '[attr$=longvalue]', true],
    ['[attr$=value]', '[attr$=valuewrong]', false],
    ['[attr*=value]', '[attr*=value]', true],
    ['[attr*=value]', '[attr*=longvaluelong]', true],
    ['[attr*=value]', '[attr*=valu€]', false],
    ['[attr|=value]', '[attr|=value]', true],
    ['[attr|=value]', '[attr|=valuelong]', false],
    ['[attr|=value]', '[attr|=wrongvalue]', false],
    ['[attr~=value]', '[attr~=value]', true],
    ['[attr~=value]', '[attr~=valu€]', false],
    ['[attr~=value]', '[attr~=wrongvalue]', false],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const [symbol1, value1] = parseMatcher(s1);
    const [symbol2, value2] = parseMatcher(s2);

    const attr1 = new CssAttr('attr');
    const attr2 = new CssAttr('attr');
    attr1.addMatcher(symbol1, value1);
    attr2.addMatcher(symbol2, value2);
    assert.strictEqual(
      `${attr1} ${OPERATION_CHARS.supersetOf} ${attr2} <=> ${attr1.supersetOf(attr2)}`,
      `${attr1} ${OPERATION_CHARS.supersetOf} ${attr2} <=> ${expected}`,
      'should work with simple matchers',
    );
  });

  data = [
    ['[attr],[attr^=test]', '[attr],[attr=test]', true],
    ['[attr$=test],[attr^=test]', '[attr=test]', true],
    ['[attr^=test],[attr*=value]', '[attr=value]', false],
    ['[attr^=start],[attr$=end]', '[attr^=startlong],[attr$=longend]', true],
    ['[attr^=start],[attr$=end]', '[attr^=startlong],[attr~=occurr],[attr$=longend]', true],
    ['[attr^=start],[attr*=contain],[attr$=end]', '[attr^=startlong],[attr$=longend]', false],
    ['[attr*=contain]', '[attr^=startcontaintext],[attr$=textcontainend]', true],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const attr1 = new CssAttr('attr');
    const attr2 = new CssAttr('attr');
    parseMatcherList(s1).forEach((sv) => attr1.addMatcher(sv[0], sv[1]));
    parseMatcherList(s2).forEach((sv) => attr2.addMatcher(sv[0], sv[1]));

    assert.strictEqual(
      `${attr1} ${OPERATION_CHARS.supersetOf} ${attr2} <=> ${attr1.supersetOf(attr2)}`,
      `${attr1} ${OPERATION_CHARS.supersetOf} ${attr2} <=> ${expected}`,
      'should work with multiple matchers',
    );
  });
});

test('CssAttr - union', () => {
  /** @type {Array<[string, string, string]>} */
  let data = [
    ['[attr]', '[attr]', '[attr]'],
    ['[attr=value]', '[attr=value]', '[attr="value"]'],
    ['[attr=value]', '[attr=valu€]', 'null'],
    ['[attr^=value]', '[attr^=value]', '[attr^="value"]'],
    ['[attr^=value]', '[attr^=valuelong]', '[attr^="value"]'],
    ['[attr^=value]', '[attr^=wrongvalue]', 'null'],
    ['[attr$=value]', '[attr$=value]', '[attr$="value"]'],
    ['[attr$=value]', '[attr$=longvalue]', '[attr$="value"]'],
    ['[attr$=value]', '[attr$=valuewrong]', 'null'],
    ['[attr*=value]', '[attr*=value]', '[attr*="value"]'],
    ['[attr*=value]', '[attr*=longvaluelong]', '[attr*="value"]'],
    ['[attr*=value]', '[attr*=valu€]', 'null'],
    ['[attr|=value]', '[attr|=value]', '[attr|="value"]'],
    ['[attr|=value]', '[attr|=valuelong]', 'null'],
    ['[attr|=value]', '[attr|=wrongvalue]', 'null'],
    ['[attr~=value]', '[attr~=value]', '[attr~="value"]'],
    ['[attr~=value]', '[attr~=valu€]', 'null'],
    ['[attr~=value]', '[attr~=wrongvalue]', 'null'],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const [symbol1, value1] = parseMatcher(s1);
    const [symbol2, value2] = parseMatcher(s2);

    const attr1 = new CssAttr('attr');
    const attr2 = new CssAttr('attr');
    attr1.addMatcher(symbol1, value1);
    attr2.addMatcher(symbol2, value2);
    assert.strictEqual(
      `${attr1} ${OPERATION_CHARS.union} ${attr2} <=> ${attr1.union(attr2)}`,
      `${attr1} ${OPERATION_CHARS.union} ${attr2} <=> ${expected}`,
      'should work with simple matchers',
    );
  });

  data = [
    ['[attr],[attr^=test]', '[attr],[attr=test]', '[attr^="test"]'],
    ['[attr$=test],[attr^=test]', '[attr=test]', '[attr$="test"][attr^="test"]'],
    ['[attr^=test],[attr*=value]', '[attr=value]', 'null'],
    ['[attr^=start],[attr$=end]', '[attr^=startlong],[attr$=longend]', '[attr$="end"][attr^="start"]'],
    ['[attr^=start],[attr$=end]', '[attr^=startlong],[attr~=occurr],[attr$=longend]', '[attr$="end"][attr^="start"]'],
    ['[attr^=start],[attr*=contain],[attr$=end]', '[attr^=startlong],[attr$=longend]', 'null'],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const attr1 = new CssAttr('attr');
    const attr2 = new CssAttr('attr');
    parseMatcherList(s1).forEach((sv) => attr1.addMatcher(sv[0], sv[1]));
    parseMatcherList(s2).forEach((sv) => attr2.addMatcher(sv[0], sv[1]));

    assert.strictEqual(
      `${attr1} ${OPERATION_CHARS.union} ${attr2} <=> ${attr1.union(attr2)}`,
      `${attr1} ${OPERATION_CHARS.union} ${attr2} <=> ${expected}`,
      'should work with multiple matchers',
    );
  });
});

test('CssAttr - intersection', () => {
  /** @type {Array<[string, string, string]>} */
  let data = [
    ['[attr]', '[attr]', '[attr]'],
    ['[attr=value]', '[attr=valu€]', '\u00f8'],
    ['[attr=value]', '[attr=value]', '[attr="value"]'],
    ['[attr=value]', '[attr$=value]', '[attr="value"]'],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const [symbol1, value1] = parseMatcher(s1);
    const [symbol2, value2] = parseMatcher(s2);

    const attr1 = new CssAttr('attr');
    const attr2 = new CssAttr('attr');
    attr1.addMatcher(symbol1, value1);
    attr2.addMatcher(symbol2, value2);
    assert.strictEqual(
      `${attr1} ${OPERATION_CHARS.intersection} ${attr2} <=> ${attr1.intersection(attr2)}`,
      `${attr1} ${OPERATION_CHARS.intersection} ${attr2} <=> ${expected}`,
      'should work with simple matchers',
    );
  });

  data = [
    [
      '[attr^=start],[attr~=occur]',
      '[attr*=contain],[attr$=end]',
      '[attr$="end"][attr*="contain"][attr^="start"][attr~="occur"]',
    ],
    [
      '[attr^=start],[attr*=contain],[attr$=longend]',
      '[attr^=startlong],[attr*=xcontainx],[attr$=end]',
      '[attr$="longend"][attr*="xcontainx"][attr^="startlong"]',
    ],
  ];
  data.forEach((d) => {
    const [s1, s2, expected] = d;
    const attr1 = new CssAttr('attr');
    const attr2 = new CssAttr('attr');
    parseMatcherList(s1).forEach((sv) => attr1.addMatcher(sv[0], sv[1]));
    parseMatcherList(s2).forEach((sv) => attr2.addMatcher(sv[0], sv[1]));

    assert.strictEqual(
      `${attr1} ${OPERATION_CHARS.intersection} ${attr2} <=> ${attr1.intersection(attr2)}`,
      `${attr1} ${OPERATION_CHARS.intersection} ${attr2} <=> ${expected}`,
      'should work with multiple matchers',
    );
  });
});

// helper functions

/**
 * @param {string} str
 * @returns {Array<[MatcherSymbol, string]>}
 */
function parseMatcherList(str) {
  return str.split(',').map(parseMatcher);
}
/**
 * @param {string} sel
 * @returns {[MatcherSymbol, string]}
 */
function parseMatcher(sel) {
  if (sel.indexOf('=') === -1) {
    return ['', ''];
  }

  const parts = sel.substring(5, sel.length - 1).split('=');
  // eslint-disable-next-line prettier/prettier
  return [/** @type {MatcherSymbol} */(parts[0] || '='), parts[1]];
}
