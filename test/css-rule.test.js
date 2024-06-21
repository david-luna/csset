import assert from 'node:assert';
import { test } from 'node:test';

import { CssRule } from '../lib/css-rule.js';
import { CssAttr } from '../lib/css-attr.js';
import { EMPTY_SET, MATCHER_CONTAINS, MATCHER_PREFIX, MATCHER_SUFFIX } from '../lib/symbols.js';

/**
 * @typedef {import('../lib/symbols.js').MatcherSymbol} MatcherSymbol
 */

test('CssRule - toString should be canonical', () => {
  const expected = 'elem#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]';
  const attr1 = new CssAttr('attr1');
  attr1.addMatcher(MATCHER_CONTAINS, 'value1');
  const attr21 = new CssAttr('attr2');
  attr21.addMatcher(MATCHER_SUFFIX, 'value2suff');
  const attr22 = new CssAttr('attr2');
  attr22.addMatcher(MATCHER_PREFIX, 'value2pref');

  const rule1 = new CssRule();
  rule1.element = 'elem';
  rule1.id = 'id';
  rule1.addClass('class1');
  rule1.addClass('class2');
  rule1.addAttr(attr1);
  rule1.addAttr(attr21);
  rule1.addAttr(attr22);
  assert.strictEqual(rule1.toString(), expected);

  const rule2 = new CssRule();
  rule2.element = 'elem';
  rule2.id = 'id';
  rule2.addClass('class2');
  rule2.addClass('class1');
  rule2.addAttr(attr22);
  rule2.addAttr(attr1);
  rule2.addAttr(attr21);
  assert.strictEqual(rule2.toString(), expected);
});

test('CssRule - supersetOf', () => {
  let rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  let rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.ok(rule1.supersetOf(rule2), 'is TRUE for equal rules');

  rule1 = createRule('div', '', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.ok(rule1.supersetOf(rule2), 'is TRUE if has no id');

  rule1 = createRule('div', 'id2', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.ok(rule1.supersetOf(rule2) === false, 'is FALSE if ID is different');

  rule1 = createRule(undefined, 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.ok(rule1.supersetOf(rule2), 'is TRUE if element is *');

  rule1 = createRule('div', 'id', ['cls1']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.ok(rule1.supersetOf(rule2), 'is TRUE if contains less classes');

  rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2']);
  assert.ok(rule1.supersetOf(rule2) === false, 'is FALSE if contains more classes');

  rule1 = createRule('div', 'id', ['class1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.ok(rule1.supersetOf(rule2) === false, 'is FALSE if contains different classes');

  rule1 = createRule('div', 'id', ['cls1'], [['attr', '', '']]);
  rule2 = createRule('div', 'id', ['cls1'], [['attr', '', '']]);
  assert.ok(rule1.supersetOf(rule2), 'is TRUE if has the same attrib');

  rule1 = createRule('div', 'id', ['cls1'], [['attr', '', '']]);
  // eslint-disable-next-line prettier/prettier
  rule2 = createRule('div', 'id', ['cls1'], [['attr', '', ''], ['attr2', '', '']]);
  assert.ok(rule1.supersetOf(rule2), 'is TRUE if has less attribs');

  // eslint-disable-next-line prettier/prettier
  rule1 = createRule('div', 'id', ['cls1'], [['attr', '', ''], ['attr3', '', '']]);
  // eslint-disable-next-line prettier/prettier
  rule2 = createRule('div', 'id', ['cls1'], [['attr', '', ''], ['attr2', '', '']]);
  assert.ok(rule1.supersetOf(rule2) === false, 'is FALSE if has different attribs');

  /** @type {Array<[string, MatcherSymbol, string]>} */
  const data = [
    ['attr', '=', 'value'],
    ['attr', '=', 'valuelong'],
    ['attr', '^', 'value'],
    ['attr', '^', 'valuelong'],
    ['attr', '$', 'value'],
    ['attr', '$', 'valuelong'],
    ['attr', '|', 'value'],
    ['attr', '|', 'valuelong'],
    ['attr', '~', 'value'],
    ['attr', '~', 'valuelong'],
  ];

  rule1 = createRule('div', 'id', ['cls1'], [['attr', '*', 'value']]);
  data.forEach((d) => {
    const [name, symbol, value] = d;
    rule2 = createRule('div', 'id', ['cls1'], [[name, symbol, value]]);
    assert.ok(rule1.supersetOf(rule2), 'supersetOf sanity check with attrib.supersetOf');
  });
});

test('CssRule - union', () => {
  let rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  let rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.equal(stringify(rule1.union(rule2)), stringify([rule1]), 'should return one rule if both equal');

  rule1 = createRule('div', undefined, ['cls1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.equal(stringify(rule1.union(rule2)), stringify([rule1]), 'should return one rule if is superset');

  rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id2', ['cls2', 'cls1']);
  assert.equal(
    stringify(rule1.union(rule2)),
    stringify([rule1, rule2]),
    'should return both rules if no one is superset of the other',
  );

  rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id2', ['cls2', 'cls1']);
  assert.equal(
    stringify(rule1.union(rule2)),
    stringify([rule1, rule2]),
    'should return both rules if no one is superset of the other',
  );
});

test('CssRule - intersection', () => {
  let rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  let rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.equal(`${rule1.intersection(rule2)}`, `${rule1}`, 'should return one rule if both equal');

  rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', undefined, ['cls2', 'cls1']);
  assert.equal(`${rule1.intersection(rule2)}`, `${rule1}`, 'should return a rule if is subset of the other');

  rule1 = createRule('div', 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id2', ['cls2', 'cls1']);
  assert.equal(`${rule1.intersection(rule2)}`, EMPTY_SET, 'should return empty set if they have different id');

  rule1 = createRule('nav', 'id', ['cls1', 'cls2']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.equal(`${rule1.intersection(rule2)}`, EMPTY_SET, 'should return empty set if they have different element');

  rule1 = createRule('div', 'id', ['cls1', 'cls2'], [['attr', '=', 'value']]);
  rule2 = createRule('div', 'id', ['cls2', 'cls1'], [['attr', '^', 'value']]);
  assert.equal(`${rule1.intersection(rule2)}`, `${rule1}`, 'should return a rule intersecting attributes');

  rule1 = createRule('div', 'id', ['cls1', 'cls2', 'cls3']);
  rule2 = createRule('div', 'id', ['cls2', 'cls1']);
  assert.equal(`${rule1.intersection(rule2)}`, `${rule1}`, 'should return a rule intersecting classes');

  rule1 = createRule('div', 'id', ['cls1', 'cls2'], [['attr', '=', 'value']]);
  rule2 = createRule('div', 'id', ['cls2', 'cls1'], [['attr', '=', 'different']]);
  assert.equal(`${rule1.intersection(rule2)}`, EMPTY_SET, 'should return empty set if an attribute cannot intersect');
});

// helper functions

/**
 * @param {string} elem
 * @param {string} id
 * @param {Array<string>} [clss]
 * @param {Array<[string, MatcherSymbol, string]>} [attrs]
 * @returns {CssRule}
 */
function createRule(elem, id, clss, attrs) {
  const rule = new CssRule();
  rule.element = elem || '*';
  rule.id = id || '';
  (clss || []).forEach((c) => rule.addClass(c));
  (attrs || []).forEach(([name, symbol, value]) => {
    const attr = new CssAttr(name);
    attr.addMatcher(symbol, value);
    rule.addAttr(attr);
  });
  return rule;
}

/**
 * @param {Array<CssRule>} rules
 * @returns {string}
 */
function stringify(rules) {
  return rules.map((r) => `${r}`).join(', ');
}
