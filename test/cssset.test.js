import assert from 'node:assert';
import { test } from 'node:test';

import { Csset } from '../lib/csset.js';
import { OPERATION_CHARS } from './constants.js';
import { EMPTY_SET } from '../lib/symbols.js';

test('Csset - constructor', () => {
  const inputs = [
    '*',
    'div#id.class1.class2[attr1=val1][attr2=val2]',
    'div p > a.active',
    'div > p + span > a#id',
    'div > section p ~ span',
    'div > section p ~ span, div > p',
  ];

  inputs.forEach((i) => {
    const set = new Csset(i);
    assert.ok(set, 'parses the input');
  });

  assert.strictEqual(
    new Csset('div, span#id, div.class, span#id[attr]').toString(),
    'div, span#id',
    'should remove subsets inside the same set',
  );
});

test('Csset - supersetOf', () => {
  /** @type {Array<[string, string, boolean]>} */
  const data = [
    // 1st selector with subsets
    ['div, a, p, span', 'div > p + span > a#id ~ p', true],
    ['section, span > a ~ p, article, nav.hidden', 'div > p + span > a#id ~ p', true],
    ['div, p, span', 'div > p + span > a', false],
    // 2nd selector with subsets
    ['div', 'div, div.class1, div#id', true],
    ['*', 'section, span > a ~ p, article, nav.hidden', true],
    ['div', 'div, p, span', false],
    // both selectors with subsets
    ['#id, span, .class1', 'span, a.class1, div#id', true],
    ['*, div', 'section, span > a ~ p, article, nav.hidden', true],
    ['div, p#id', 'div, p, span', false],
  ];

  data.forEach((d) => {
    const [i1, i2, res] = d;
    const s1 = new Csset(i1);
    const s2 = new Csset(i2);
    const oper = res ? OPERATION_CHARS.supersetOf : OPERATION_CHARS.notSupersetOf;

    assert.ok(s1.supersetOf(s2) === res, `${s1} ${oper} ${s2}`);
  });
});

test('Csset - union', () => {
  /** @type {Array<[string, string, string]>} */
  const data = [
    // 1st is superset of 2nd
    ['div, p, aside, section', 'div, p, section.class', 'div, p, aside, section'],
    ['div, p, section.class', 'div, p, aside, section', 'div, p, aside, section'],
    // result should remove rules that are subsets of others
    ['div, p, aside, section.class', 'div, p#id, span, a, section', 'div, p, aside, span, a, section'],
    // should do union based on attributes in subsets
    ['div, p, section[attr^=val]', 'div, p#id, a, section[attr=value]', 'div, p, section[attr^="val"], a'],
    // should join two sets if there is nothing to combine
    ['.firstClass', '.secondClass', '*.firstClass, *.secondClass'],
  ];

  data.forEach((d) => {
    const [i1, i2, res] = d;
    const s1 = new Csset(i1);
    const s2 = new Csset(i2);
    const oper = OPERATION_CHARS.union;

    assert.strictEqual(s1.union(s2).toString(), res, `${s1} ${oper} ${s2}`);
  });
});

test('Csset - intersection', () => {
  /** @type {Array<[string, string, string]>} */
  const data = [
    // 1st is subset of 2nd
    ['div, p, aside, section', 'div, p, section.class', 'div, p, section.class'],
    ['a, section.class', 'div > p, a, section', 'a, section.class'],
    // should return intersections between two sets
    ['div, p.class, aside, section', 'div.class, p, section.class', 'div.class, p.class, section.class'],
    [
      'section[attr], aside, div, a',
      'section, aside, div[attr], span , a[attr]',
      'section[attr], aside, div[attr], a[attr]',
    ],
    // should return EMPTY undefined if there is no intersection
    ['div, p, aside, section', 'span, a, quote', EMPTY_SET],
    ['div[attr=a], p, aside, section', 'div[attr=b], span, a, quote', EMPTY_SET],
  ];

  data.forEach((d) => {
    const [i1, i2, res] = d;
    const s1 = new Csset(i1);
    const s2 = new Csset(i2);
    const oper = OPERATION_CHARS.intersection;

    assert.strictEqual(s1.intersection(s2).toString(), res, `${s1} ${oper} ${s2}`);
  });
});
