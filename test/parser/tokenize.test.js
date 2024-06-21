import assert from 'node:assert';
import { test } from 'node:test';

import { tokenize } from '../../lib/parser/tokenize.js';

/**
 * @param {unknown} obj
 * @returns {Object}
 */
const removeVoids = (obj) => JSON.parse(JSON.stringify(obj));

test('tokenize', () => {
  assert.strictEqual(tokenize(''), null, 'should return null if there is no input');

  assert.deepStrictEqual(
    tokenize('div'),
    [
      {
        type: 'type',
        name: 'div',
        namespace: void 0,
        content: 'div',
        pos: [0, 3],
      },
    ],
    'should return null if there is no input',
  );

  assert.deepStrictEqual(
    tokenize('#id'),
    [
      {
        type: 'id',
        name: 'id',
        content: '#id',
        pos: [0, 3],
      },
    ],
    'should tokenize an ID selector',
  );

  assert.deepStrictEqual(
    tokenize('.class'),
    [
      {
        type: 'class',
        name: 'class',
        content: '.class',
        pos: [0, 6],
      },
    ],
    'should tokenize an class selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute="value"]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '=',
        value: '"value"',
        content: '[attribute="value"]',
        pos: [0, 19],
      },
    ],
    'should tokenize an attribute equals with selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute^="value"]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '^=',
        value: '"value"',
        content: '[attribute^="value"]',
        pos: [0, 20],
      },
    ],
    'should tokenize an attribute starts with selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute$="value"]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '$=',
        value: '"value"',
        content: '[attribute$="value"]',
        pos: [0, 20],
      },
    ],
    'should tokenize an attribute ends with selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute*="value"]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '*=',
        value: '"value"',
        content: '[attribute*="value"]',
        pos: [0, 20],
      },
    ],
    'should tokenize an attribute ends occurence selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute~="value"]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '~=',
        value: '"value"',
        content: '[attribute~="value"]',
        pos: [0, 20],
      },
    ],
    'should tokenize an attribute ends sibling selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute|="value"]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value"]',
        pos: [0, 20],
      },
    ],
    'should tokenize an attribute ends hypen selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute|="value" i]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value" i]',
        caseSensitive: 'i',
        pos: [0, 22],
      },
    ],
    'should tokenize setting the caseSensitive property to insensitive',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[attribute|="value" s]')),
    [
      {
        type: 'attribute',
        name: 'attribute',
        operator: '|=',
        value: '"value"',
        content: '[attribute|="value" s]',
        caseSensitive: 's',
        pos: [0, 22],
      },
    ],
    'should tokenize setting the caseSensitive property to sensitive',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('a[attribute="value"][attribute="123"]')),
    [
      {
        type: 'type',
        name: 'a',
        content: 'a',
        pos: [0, 1],
      },
      {
        type: 'attribute',
        name: 'attribute',
        operator: '=',
        value: '"value"',
        content: '[attribute="value"]',
        pos: [1, 20],
      },
      {
        type: 'attribute',
        name: 'attribute',
        operator: '=',
        value: '"123"',
        content: '[attribute="123"]',
        pos: [20, 37],
      },
    ],
    'should tokenize multiple attribute selector',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('[foo=ss][bar=ii]')),
    [
      {
        type: 'attribute',
        name: 'foo',
        operator: '=',
        value: 'ss',
        content: '[foo=ss]',
        pos: [0, 8],
      },
      {
        type: 'attribute',
        name: 'bar',
        operator: '=',
        value: 'ii',
        content: '[bar=ii]',
        pos: [8, 16],
      },
    ],
    'should tokenize without taking the last leter as caseSensitive modifier',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('::test(a()f)')),
    [
      {
        type: 'pseudo-element',
        argument: 'a()f',
        name: 'test',
        content: '::test(a()f)',
        pos: [0, 12],
      },
    ],
    'should tokenize pseudo-elements',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('::test(a()f)')),
    [
      {
        type: 'pseudo-element',
        argument: 'a()f',
        name: 'test',
        content: '::test(a()f)',
        pos: [0, 12],
      },
    ],
    'should tokenize pseudo-elements with parens',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('::before')),
    [
      {
        type: 'pseudo-element',
        name: 'before',
        content: '::before',
        pos: [0, 8],
      },
    ],
    'should tokenize pseudo-elements',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize(':hover')),
    [
      {
        type: 'pseudo-class',
        name: 'hover',
        content: ':hover',
        pos: [0, 6],
      },
    ],
    'should tokenize pseudo-classes',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('div:not(:where(#yolo))')),
    [
      {
        type: 'type',
        content: 'div',
        name: 'div',
        pos: [0, 3],
      },
      {
        type: 'pseudo-class',
        content: ':not(:where(#yolo))',
        name: 'not',
        argument: ':where(#yolo)',
        pos: [3, 22],
      },
    ],
    'should tokenize nested pseudo-classes',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('html|*')),
    [
      {
        type: 'universal',
        content: 'html|*',
        namespace: 'html',
        pos: [0, 6],
      },
    ],
    'should tokenize universal selector with namespace',
  );

  assert.deepStrictEqual(
    removeVoids(tokenize('html|p')),
    [
      {
        type: 'type',
        content: 'html|p',
        namespace: 'html',
        name: 'p',
        pos: [0, 6],
      },
    ],
    'should tokenize selector with namespace',
  );

  assert.deepStrictEqual(
    // eslint-disable-next-line prettier/prettier
    removeVoids(tokenize('#foo > .bar + div.k1.k2 [id=\'baz\']:hello(2):not(:where(#yolo))::before')),
    [
      {
        type: 'id',
        content: '#foo',
        name: 'foo',
        pos: [0, 4],
      },
      {
        type: 'combinator',
        content: '>',
        pos: [4, 7],
      },
      {
        type: 'class',
        content: '.bar',
        name: 'bar',
        pos: [7, 11],
      },
      {
        type: 'combinator',
        content: '+',
        pos: [11, 14],
      },
      {
        type: 'type',
        content: 'div',
        name: 'div',
        pos: [14, 17],
      },
      {
        type: 'class',
        content: '.k1',
        name: 'k1',
        pos: [17, 20],
      },
      {
        type: 'class',
        content: '.k2',
        name: 'k2',
        pos: [20, 23],
      },
      {
        type: 'combinator',
        content: ' ',
        pos: [23, 24],
      },
      {
        type: 'attribute',
        // eslint-disable-next-line prettier/prettier
          content: '[id=\'baz\']',
        name: 'id',
        operator: '=',
        // eslint-disable-next-line prettier/prettier
          value: '\'baz\'',
        pos: [24, 34],
      },
      {
        type: 'pseudo-class',
        content: ':hello(2)',
        name: 'hello',
        argument: '2',
        pos: [34, 43],
      },
      {
        type: 'pseudo-class',
        content: ':not(:where(#yolo))',
        name: 'not',
        argument: ':where(#yolo)',
        pos: [43, 62],
      },
      {
        type: 'pseudo-element',
        content: '::before',
        name: 'before',
        pos: [62, 70],
      },
    ],
    'should tokenize a complex selector',
  );
});
