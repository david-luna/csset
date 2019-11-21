import { Csset } from '../src/csset';

test('should integrate', () => {
  expect(new Csset('*')).toBeDefined();
})