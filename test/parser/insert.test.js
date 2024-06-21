import assert from 'node:assert';
import { test } from 'node:test';

import { insert } from '../../lib/parser/insert.js';

test('insert', () => {
  const target = { a: 1, c: 3 };
  const props = [];

  insert(target, { property: 'b', value: 2, before: 'c' });

  for (const p in target) {
    props.push(p);
  }

  assert.deepStrictEqual(props, ['a', 'b', 'c'], 'props are ordered properly');
  assert.deepStrictEqual(
    target,
    {
      a: 1,
      b: 2,
      c: 3,
    },
    'new property is inserted',
  );
});
