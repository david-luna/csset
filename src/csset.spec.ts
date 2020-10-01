import { Csset } from './csset';

test('should integrate', () => {
  expect(new Csset('*')).toBeDefined();
})