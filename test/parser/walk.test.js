// import { Complex, List } from './types';
// import { walk, WalkOptions } from './walk';

import assert from 'node:assert';
import { mock, test } from 'node:test';

import { walk } from '../../lib/parser/walk.js';

test('walk', () => {
  let callbackSpy = mock.fn();

  //   afterEach(() => {
  //     jest.resetAllMocks();
  //   });

  walk(void 0, (callbackSpy = mock.fn()));
  assert.strictEqual(callbackSpy.mock.callCount(), 0, 'should return void if no node passed');

  /** @type {Complex} */
  // @ts-ignore
  const complexNode = { type: 'complex', left: {}, right: {} };
  walk(complexNode, (callbackSpy = mock.fn()));

  assert.strictEqual(callbackSpy.mock.callCount(), 3, 'should visit all nodes');
  assert.deepStrictEqual(callbackSpy.mock.calls[0].arguments, [complexNode.left, complexNode], 'should visit left');
  assert.deepStrictEqual(callbackSpy.mock.calls[1].arguments, [complexNode.right, complexNode], 'should visit right');
  assert.deepStrictEqual(callbackSpy.mock.calls[2].arguments, [complexNode, undefined], 'should visit root');

  /** @type {List} */
  // @ts-ignore
  const listNode = { type: 'list', list: [{}, {}] };
  walk(listNode, (callbackSpy = mock.fn()));

  assert.strictEqual(callbackSpy.mock.callCount(), 3, 'should visit all nodes');
  assert.deepStrictEqual(
    callbackSpy.mock.calls[0].arguments,
    [listNode.list[0], listNode],
    'should visit 1ts lits item',
  );
  assert.deepStrictEqual(
    callbackSpy.mock.calls[1].arguments,
    [listNode.list[1], listNode],
    'should visit 2nd list item',
  );
  assert.deepStrictEqual(callbackSpy.mock.calls[2].arguments, [listNode, undefined], 'should visit root');

  /** @type {List} */
  // @ts-ignore
  const compoundNode = { type: 'compound', list: [{}, {}] };
  walk(compoundNode, (callbackSpy = mock.fn()));
  assert.strictEqual(callbackSpy.mock.callCount(), 3, 'should visit all nodes');
  assert.deepStrictEqual(
    callbackSpy.mock.calls[0].arguments,
    [compoundNode.list[0], compoundNode],
    'should visit 1ts lits item',
  );
  assert.deepStrictEqual(
    callbackSpy.mock.calls[1].arguments,
    [compoundNode.list[1], compoundNode],
    'should visit 2nd list item',
  );
  assert.deepStrictEqual(callbackSpy.mock.calls[2].arguments, [compoundNode, undefined], 'should visit root');

  /** @type {any} */
  const nodeWithSubtree = { type: 'pseudo-class', subtree: {} };
  walk(nodeWithSubtree, (callbackSpy = mock.fn()), { subtree: true });

  assert.strictEqual(callbackSpy.mock.callCount(), 2, 'should visit all nodes');
  assert.deepStrictEqual(
    callbackSpy.mock.calls[0].arguments,
    [nodeWithSubtree.subtree, nodeWithSubtree],
    'should visit subtree',
  );
  assert.deepStrictEqual(
    callbackSpy.mock.calls[1].arguments,
    [nodeWithSubtree, undefined],
    'should visit root of subtree',
  );

  walk(nodeWithSubtree, (callbackSpy = mock.fn()));

  assert.strictEqual(callbackSpy.mock.callCount(), 1, 'should visit all nodes');
  assert.deepStrictEqual(callbackSpy.mock.calls[0].arguments, [nodeWithSubtree, undefined], 'should visit subtree');
});
