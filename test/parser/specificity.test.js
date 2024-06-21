import assert from 'node:assert';
import { test } from 'node:test';

import { specificity } from '../../lib/parser/specificity.js';

test('specificity', () => {
  // eslint-disable-next-line prettier/prettier
  const selector = '#foo > .bar + div.k1.k2 [id=\'baz\']:hello(2):not(:where(#yolo))::before';

  assert.deepStrictEqual(specificity(selector), [1, 5, 2]);
});
