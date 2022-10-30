import { CssContainsMatcher } from './contains-matcher';
import { checkMatcherOperation } from '../../test/utils';

describe('contains matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with other types', () => {
      const matcher = new CssContainsMatcher('value');
      const dataset = [
        { matcher: '', expected: false },
        // Combinations of equal
        { matcher: '=value', expected: true },
        { matcher: '=Xvalue', expected: true },
        { matcher: '=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: false },
        { matcher: '=XXaluXX', expected: false },
        // Combinations of prefix
        { matcher: '^=value', expected: true },
        { matcher: '^=Xvalue', expected: true },
        { matcher: '^=valueX', expected: true },
        { matcher: '^=XvalueX', expected: true },
        { matcher: '^=XXXXXXX', expected: false },
        { matcher: '^=XXaluXX', expected: false },
        // Combinations of suffix
        { matcher: '$=value', expected: true },
        { matcher: '$=Xvalue', expected: true },
        { matcher: '$=valueX', expected: true },
        { matcher: '$=XvalueX', expected: true },
        { matcher: '$=XXXXXXX', expected: false },
        { matcher: '$=XXaluXX', expected: false },
        // Combinations of contains
        { matcher: '*=value', expected: true },
        { matcher: '*=Xvalue', expected: true },
        { matcher: '*=valueX', expected: true },
        { matcher: '*=XvalueX', expected: true },
        { matcher: '*=XXXXXXX', expected: false },
        { matcher: '*=XXaluXX', expected: false },
        // Combinations of occurence
        { matcher: '~=value', expected: true },
        { matcher: '~=Xvalue', expected: true },
        { matcher: '~=valueX', expected: true },
        { matcher: '~=XvalueX', expected: true },
        { matcher: '~=XXXXXXX', expected: false },
        { matcher: '~=XXaluXX', expected: false },
        // Combinations of subcode
        { matcher: '|=value', expected: true },
        { matcher: '|=Xvalue', expected: true },
        { matcher: '|=valueX', expected: true },
        { matcher: '|=XvalueX', expected: true },
        { matcher: '|=XXXXXXX', expected: false },
        { matcher: '|=XXaluXX', expected: false },
      ];

      checkMatcherOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same or other types', () => {
      const matcher = new CssContainsMatcher('value');
      const dataset = [
        { matcher: '', expected: '' },
        // Combinations of equal
        { matcher: '=value', expected: '*="value"' },
        { matcher: '=Xvalue', expected: '*="value"' },
        { matcher: '=valueX', expected: '*="value"' },
        { matcher: '=XvalueX', expected: '*="value"' },
        { matcher: '=XXXXXXX', expected: 'null' },
        { matcher: '=XXaluXX', expected: 'null' },
        // Combinations of prefix
        { matcher: '^=value', expected: '*="value"' },
        { matcher: '^=Xvalue', expected: '*="value"' },
        { matcher: '^=valueX', expected: '*="value"' },
        { matcher: '^=XvalueX', expected: '*="value"' },
        { matcher: '^=XXXXXXX', expected: 'null' },
        { matcher: '^=XXaluXX', expected: 'null' },
        // Combinations of suffix
        { matcher: '$=value', expected: '*="value"' },
        { matcher: '$=Xvalue', expected: '*="value"' },
        { matcher: '$=valueX', expected: '*="value"' },
        { matcher: '$=XvalueX', expected: '*="value"' },
        { matcher: '$=XXXXXXX', expected: 'null' },
        { matcher: '$=XXaluXX', expected: 'null' },
        // Combinations of contains
        { matcher: '*=value', expected: '*="value"' },
        { matcher: '*=Xvalue', expected: '*="value"' },
        { matcher: '*=valueX', expected: '*="value"' },
        { matcher: '*=XvalueX', expected: '*="value"' },
        { matcher: '*=XXXXXXX', expected: 'null' },
        { matcher: '*=XXaluXX', expected: 'null' },
        // Combinations of occurence
        { matcher: '~=value', expected: '*="value"' },
        { matcher: '~=Xvalue', expected: '*="value"' },
        { matcher: '~=valueX', expected: '*="value"' },
        { matcher: '~=XvalueX', expected: '*="value"' },
        { matcher: '~=XXXXXXX', expected: 'null' },
        { matcher: '~=XXaluXX', expected: 'null' },
        // Combinations of subcode
        { matcher: '|=value', expected: '*="value"' },
        { matcher: '|=Xvalue', expected: '*="value"' },
        { matcher: '|=valueX', expected: '*="value"' },
        { matcher: '|=XvalueX', expected: '*="value"' },
        { matcher: '|=XXXXXXX', expected: 'null' },
        { matcher: '|=XXaluXX', expected: 'null' },
      ];

      checkMatcherOperation(matcher, 'union')(dataset);
    });
  });

  describe('intersection', () => {
    test('intersection should work with same or other types', () => {
      const matcher = new CssContainsMatcher('value');
      const dataset = [
        { matcher: '', expected: '*="value"' },
        // Combinations of equal
        { matcher: '=value', expected: '="value"' },
        { matcher: '=Xvalue', expected: '="Xvalue"' },
        { matcher: '=valueX', expected: '="valueX"' },
        { matcher: '=XvalueX', expected: '="XvalueX"' },
        { matcher: '=XXXXXXX', expected: 'undefined' },
        { matcher: '=XXaluXX', expected: 'undefined' },
        // Combinations of prefix
        { matcher: '^=value', expected: '^="value"' },
        { matcher: '^=Xvalue', expected: '^="Xvalue"' },
        { matcher: '^=valueX', expected: '^="valueX"' },
        { matcher: '^=XvalueX', expected: '^="XvalueX"' },
        { matcher: '^=XXXXXXX', expected: 'null' },
        { matcher: '^=XXaluXX', expected: 'null' },
        // Combinations of suffix
        { matcher: '$=value', expected: '$="value"' },
        { matcher: '$=Xvalue', expected: '$="Xvalue"' },
        { matcher: '$=valueX', expected: '$="valueX"' },
        { matcher: '$=XvalueX', expected: '$="XvalueX"' },
        { matcher: '$=XXXXXXX', expected: 'null' },
        { matcher: '$=XXaluXX', expected: 'null' },
        // Combinations of contains
        { matcher: '*=value', expected: '*="value"' },
        { matcher: '*=Xvalue', expected: '*="Xvalue"' },
        { matcher: '*=valueX', expected: '*="valueX"' },
        { matcher: '*=XvalueX', expected: '*="XvalueX"' },
        { matcher: '*=XXXXXXX', expected: 'null' },
        { matcher: '*=XXaluXX', expected: 'null' },
        // Combinations of occurence
        { matcher: '~=value', expected: '~="value"' },
        { matcher: '~=Xvalue', expected: '~="Xvalue"' },
        { matcher: '~=valueX', expected: '~="valueX"' },
        { matcher: '~=XvalueX', expected: '~="XvalueX"' },
        { matcher: '~=XXXXXXX', expected: 'null' },
        { matcher: '~=XXaluXX', expected: 'null' },
        // Combinations of subcode
        { matcher: '|=value', expected: '|="value"' },
        { matcher: '|=Xvalue', expected: '|="Xvalue"' },
        { matcher: '|=valueX', expected: '|="valueX"' },
        { matcher: '|=XvalueX', expected: '|="XvalueX"' },
        { matcher: '|=XXXXXXX', expected: 'null' },
        { matcher: '|=XXaluXX', expected: 'null' },
      ];

      checkMatcherOperation(matcher, 'intersection')(dataset);
    });
  });
});
