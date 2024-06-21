import assert from 'node:assert';
import { test } from 'node:test';

import { gobbleParens } from '../../lib/parser/gobbleParens.js';

test('gobbleParens', () => {
  const text = 'div[a=1][b=2]:where(p > a), textarea.editable:not(h1:where(quote))';

  assert.strictEqual(
    gobbleParens(text, 0),
    'd',
    'should return one char if in the index there is no opening parentesis',
  );

  assert.strictEqual(
    gobbleParens(text, text.indexOf('(')),
    '(p > a)',
    'should return the complete parentesis with whatever is inside',
  );

  assert.strictEqual(
    gobbleParens(text, text.indexOf('(h1')),
    '(h1:where(quote))',
    'should return the complete parentesis with nested parentesis',
  );

  assert.throws(() => gobbleParens('(div > p', 0), 'should throw if missing closing parentesis');

  assert.throws(() => gobbleParens('(div > p)', 8), 'should throw if missing closing parentesis');
});
