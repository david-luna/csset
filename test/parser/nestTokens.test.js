import assert from 'node:assert';
import { test } from 'node:test';

import { nestTokens } from '../../lib/parser/nestTokens.js';

test('nestTokens', () => {
  /** @type {Record<string, Token>} */
  const tokensRecord = {
    id: { type: 'id', content: '#test', name: 'test', pos: [0, 1] },
    comma: { type: 'comma', content: ',', pos: [0, 1] },
    clazz: { type: 'class', content: '.class', name: 'class', pos: [0, 1] },
    combinator: { type: 'combinator', content: '>', pos: [0, 1] },
  };

  assert.strictEqual(nestTokens([]), null, 'should return null if tokens is empty');

  assert.throws(() => nestTokens([tokensRecord.comma]), 'should throw error if 1st token is comma');

  assert.throws(
    () => nestTokens([tokensRecord.id, tokensRecord.comma, tokensRecord.comma]),
    'should throw error if there are 2 consecutive commas',
  );

  assert.throws(
    () => nestTokens([tokensRecord.id, tokensRecord.comma]),
    'should throw error if there is a trailing comma',
  );

  assert.deepStrictEqual(
    nestTokens([tokensRecord.id, tokensRecord.comma, tokensRecord.clazz]),
    { type: 'list', list: [tokensRecord.id, tokensRecord.clazz] },
    'should return an list object when selectors separated by comma',
  );

  assert.strictEqual(
    nestTokens([], { list: false }),
    null,
    'should return NULL when list option is false and no tokens passed',
  );

  assert.deepStrictEqual(
    nestTokens([tokensRecord.clazz, tokensRecord.combinator, tokensRecord.id], { list: false }),
    { type: 'complex', combinator: tokensRecord.combinator.content, left: tokensRecord.clazz, right: tokensRecord.id },
    'should return a complex AST when list option is false and there is a combinator',
  );

  assert.strictEqual(
    nestTokens([tokensRecord.clazz], { list: false }),
    tokensRecord.clazz,
    'should return a simple token when we only pass this one',
  );
});
