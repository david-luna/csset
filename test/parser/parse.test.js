import assert from 'node:assert';
import { test } from 'node:test';

import { parse } from '../../lib/parser/parse.js';

test('parse', () => {
  // eslint-disable-next-line prettier/prettier
  const ast = parse('#foo > .bar + div.k1.k2 [id=\'baz\']:hello(2):not(:where(#yolo))::before');

  assert.deepStrictEqual(
    JSON.parse(JSON.stringify(ast)),
    {
      type: 'complex',
      combinator: ' ',
      left: {
        type: 'complex',
        combinator: '+',
        left: {
          type: 'complex',
          combinator: '>',
          left: {
            type: 'id',
            content: '#foo',
            name: 'foo',
            pos: [0, 4],
          },
          right: {
            type: 'class',
            content: '.bar',
            name: 'bar',
            pos: [7, 11],
          },
        },
        right: {
          type: 'compound',
          list: [
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
          ],
        },
      },
      right: {
        type: 'compound',
        list: [
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
            subtree: {
              type: 'pseudo-class',
              content: ':where(#yolo)',
              name: 'where',
              argument: '#yolo',
              pos: [0, 13],
              subtree: {
                type: 'id',
                content: '#yolo',
                name: 'yolo',
                pos: [0, 5],
              },
            },
          },
          {
            type: 'pseudo-element',
            content: '::before',
            name: 'before',
            pos: [62, 70],
          },
        ],
      },
    },
    'should parse a complex selector',
  );
});
