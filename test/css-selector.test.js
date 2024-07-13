import assert from 'node:assert';
import { test } from 'node:test';

import { OPERATION_CHARS } from './constants.js';
import { CssAttr } from '../lib/css-attr.js';
import { CssRule } from '../lib/css-rule.js';
import { CssSelector } from '../lib/css-selector.js';
import {
  COMBINATOR_ADJACENT,
  COMBINATOR_CHILD,
  COMBINATOR_DESCENDANT,
  COMBINATOR_NONE,
  COMBINATOR_SIBLING,
} from '../lib/symbols.js';

/**
 * @typedef {import('../lib/symbols.js').MatcherSymbol} MatcherSymbol
 * @typedef {import('../lib/symbols.js').CombinatorSymbol} CombinatorSymbol
 */

test('CssSelector - toString', () => {
  const selector = new CssSelector();
  selector.addRule(createRule('section', 'id1', ['sectionCls'], [['attr', '=', 'value']]), COMBINATOR_CHILD);
  selector.addRule(createRule('p', 'id2', ['paragraphCls'], [['attr', '$', 'value']]), COMBINATOR_NONE);
  assert.equal(
    `${selector}`,
    'section#id1.sectionCls[attr="value"] > p#id2.paragraphCls[attr$="value"]',
    'should work',
  );

  const sel1 = new CssSelector();
  const sel2 = new CssSelector();
  const rule1 = createRule('section', 'id1', ['sectionCls'], [['attr', '=', 'value']]);
  const rule2 = createRule('p', 'id2', ['paragraphCls'], [['attr', '$', 'value']]);
  sel1.addRule(rule1, COMBINATOR_DESCENDANT);
  sel1.addRule(rule2, COMBINATOR_NONE);
  sel2.addRule(rule2, COMBINATOR_DESCENDANT);
  sel2.addRule(rule1, COMBINATOR_NONE);
  assert.notEqual(`${sel1}`, `${sel2}`, 'order matters');
});

test('CssSelector - supersetOf', () => {
  let sel1 = new CssSelector();
  // div > p + span > a#id ~ p
  addRules(sel1, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_ADJACENT],
    [['span'], COMBINATOR_CHILD],
    [['a', 'id'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  let sel2 = new CssSelector();
  // *
  addRules(sel2, [[['*'], COMBINATOR_NONE]]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // div > a ~ p
  addRules(sel1, [
    [['div'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // div > p
  addRules(sel2, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // * > span#id > a
  addRules(sel1, [
    [['*'], COMBINATOR_CHILD],
    [['span', 'id'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // span > a
  addRules(sel2, [
    [['span'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // *
  addRules(sel1, [[['*'], COMBINATOR_NONE]]);
  sel2 = new CssSelector();
  // div > p + span > a#id ~ p
  addRules(sel2, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_ADJACENT],
    [['span'], COMBINATOR_CHILD],
    [['a', 'id'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // span > a ~ p
  addRules(sel1, [
    [['span'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // div > p + span > a#id ~ p
  addRules(sel2, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_ADJACENT],
    [['span'], COMBINATOR_CHILD],
    [['a', 'id'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // span#id > a
  addRules(sel1, [
    [['span', 'id'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // div > p + span > a
  addRules(sel2, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_ADJACENT],
    [['span'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section > article > h1 > p
  addRules(sel1, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_CHILD],
    [['h1'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 p
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section article h1 p
  addRules(sel1, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section > article > h1 > p
  addRules(sel2, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_CHILD],
    [['h1'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section article h1 p
  addRules(sel1, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section > article h1 p
  addRules(sel2, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section article h1 p
  addRules(sel1, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article > h1 p
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_CHILD],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section article h1 p
  addRules(sel1, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 > p
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section + article + h1 + p
  addRules(sel1, [
    [['section'], COMBINATOR_ADJACENT],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section ~ article ~ h1 ~ p
  addRules(sel2, [
    [['section'], COMBINATOR_SIBLING],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section ~ article ~ h1 ~ p
  addRules(sel1, [
    [['section'], COMBINATOR_SIBLING],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section + article h1 p
  addRules(sel2, [
    [['section'], COMBINATOR_ADJACENT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section ~ article ~ h1 ~ p
  addRules(sel1, [
    [['section'], COMBINATOR_SIBLING],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article + h1 p
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section ~ article ~ h1 ~ p
  addRules(sel1, [
    [['section'], COMBINATOR_SIBLING],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 + p
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section + article ~ h1 ~ p
  addRules(sel1, [
    [['section'], COMBINATOR_ADJACENT],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section ~ article ~ h1 + p
  addRules(sel2, [
    [['section'], COMBINATOR_SIBLING],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section ~ article ~ h1 ~ p
  addRules(sel1, [
    [['section'], COMBINATOR_SIBLING],
    [['article'], COMBINATOR_SIBLING],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section + article + h1 + p
  addRules(sel2, [
    [['section'], COMBINATOR_ADJACENT],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2), `${sel1} ${OPERATION_CHARS.supersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section > article + h1 p > a
  addRules(sel1, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 ~ p a
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_DESCENDANT],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section > article + h1 p > a
  addRules(sel1, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 ~ p > a
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section > article + h1 p > a
  addRules(sel1, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section > article h1 + p > a
  addRules(sel2, [
    [['section'], COMBINATOR_CHILD],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // section + article + h1 + p + a
  addRules(sel1, [
    [['section'], COMBINATOR_ADJACENT],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_ADJACENT],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 p > a
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // p > section + article + h1 + p + a
  addRules(sel1, [
    [['p'], COMBINATOR_CHILD],
    [['section'], COMBINATOR_ADJACENT],
    [['article'], COMBINATOR_ADJACENT],
    [['h1'], COMBINATOR_ADJACENT],
    [['p'], COMBINATOR_ADJACENT],
    [['a'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // section article h1 div p > a
  addRules(sel2, [
    [['section'], COMBINATOR_DESCENDANT],
    [['article'], COMBINATOR_DESCENDANT],
    [['h1'], COMBINATOR_DESCENDANT],
    [['div'], COMBINATOR_DESCENDANT],
    [['p'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);

  sel1 = new CssSelector();
  // div
  addRules(sel1, [[['div'], COMBINATOR_NONE]]);
  sel2 = new CssSelector();
  // div > p + span > a
  addRules(sel2, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_ADJACENT],
    [['span'], COMBINATOR_CHILD],
    [['a'], COMBINATOR_NONE],
  ]);
  assert.ok(sel1.supersetOf(sel2) === false, `${sel1} ${OPERATION_CHARS.notSupersetOf} ${sel2}`);
});

test('CssSelector - intersection', () => {
  let sel1 = new CssSelector();
  // p.classA
  addRules(sel1, [[['p', '', ['classA']], COMBINATOR_NONE]]);
  let sel2 = new CssSelector();
  // p.classB
  addRules(sel2, [[['p', '', ['classB']], COMBINATOR_NONE]]);
  assert.strictEqual(sel1.intersection(sel2).toString(), 'p.classA.classB');

  sel1 = new CssSelector();
  // p[attr^=val][attr2=val2]
  addRules(sel1, [
    [
      [
        'p',
        '',
        [],
        [
          ['attr', '^', 'val'],
          ['attr2', '', 'val2'],
        ],
      ],
      COMBINATOR_NONE,
    ],
  ]);
  sel2 = new CssSelector();
  // p[attr$=val][attr2^=val]
  addRules(sel2, [
    [
      [
        'p',
        '',
        [],
        [
          ['attr', '$', 'val'],
          ['attr2', '^', 'val'],
        ],
      ],
      COMBINATOR_NONE,
    ],
  ]);
  assert.strictEqual(sel1.intersection(sel2).toString(), 'p[attr$="val"][attr^="val"][attr2^="val"]');

  sel1 = new CssSelector();
  // p.classA ~ a[attr=val]
  addRules(sel1, [
    [['p', '', ['classA']], COMBINATOR_SIBLING],
    [['a', '', [], [['attr', '=', 'val']]], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // p.classA ~ a[attr*=val]
  addRules(sel2, [
    [['p', '', ['classB']], COMBINATOR_SIBLING],
    [['a', '', [], [['attr', '*', 'val']]], COMBINATOR_NONE],
  ]);
  assert.strictEqual(sel1.intersection(sel2).toString(), 'p.classA.classB ~ a[attr="val"]');

  sel1 = new CssSelector();
  // div > p + span > a#id ~ p
  addRules(sel1, [
    [['div'], COMBINATOR_CHILD],
    [['p'], COMBINATOR_ADJACENT],
    [['span'], COMBINATOR_CHILD],
    [['a', 'id'], COMBINATOR_SIBLING],
    [['p'], COMBINATOR_NONE],
  ]);
  sel2 = new CssSelector();
  // *
  addRules(sel2, [[['*'], COMBINATOR_NONE]]);
  assert.strictEqual(sel1.intersection(sel2).toString(), `${sel1}`);
});

// helper functions

/**
 * @param {CssSelector} sel
 * @param {Array<[Parameters<typeof createRule>, CombinatorSymbol]>} data
 */
function addRules(sel, data) {
  data.forEach(([params, symbol]) => {
    sel.addRule(createRule.apply(null, params), symbol);
  });
}

/**
 * @param {string} [elem]
 * @param {string} [id]
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
