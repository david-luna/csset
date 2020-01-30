import { CssSuffixMatcher } from "../../src/matchers/suffix-matcher";
import { checkOperation, matcherFrom } from '../test-utils';


describe('suffix matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssSuffixMatcher('value');

      const dataset = [
        { matcher: ''       , expected: false },
        // Combinations of equals
        { matcher: '=value'  , expected: true },
        { matcher: '=Xvalue' , expected: true },
        { matcher: '=valueX' , expected: false },
        { matcher: '=XvalueX', expected: false },
        { matcher: '=XXXXXXX', expected: false },
        { matcher: '=XXaluXX', expected: false },
        // Combinations of prefix
        { matcher: '^=value' , expected: false },
        { matcher: '^=Xvalue', expected: false },
        { matcher: '^=valueX', expected: false },
        { matcher: '^=XvalueX', expected: false },
        { matcher: '^=XXXXXXX', expected: false },
        { matcher: '^=XXaluXX', expected: false },
        // Combinations of suffix
        { matcher: '$=value' , expected: true },
        { matcher: '$=Xvalue', expected: true },
        { matcher: '$=valueX', expected: false },
        { matcher: '$=XvalueX', expected: false },
        { matcher: '$=XXXXXXX', expected: false },
        { matcher: '$=XXaluXX', expected: false },
        // Combinations of contains
        { matcher: '*=value' , expected: false },
        { matcher: '*=Xvalue', expected: false },
        { matcher: '*=valueX', expected: false },
        { matcher: '*=XvalueX', expected: false },
        { matcher: '*=XXXXXXX', expected: false },
        { matcher: '*=XXaluXX', expected: false },
        // Combinations of occurence
        { matcher: '~=value' , expected: false },
        { matcher: '~=Xvalue', expected: false },
        { matcher: '~=valueX', expected: false },
        { matcher: '~=XvalueX', expected: false },
        { matcher: '~=XXXXXXX', expected: false },
        { matcher: '~=XXaluXX', expected: false },
        // Combinations of prefix
        { matcher: '|=value' , expected: false },
        { matcher: '|=Xvalue', expected: false },
        { matcher: '|=valueX', expected: false },
        { matcher: '|=XvalueX', expected: false },
        { matcher: '|=XXXXXXX', expected: false },
        { matcher: '|=XXaluXX', expected: false },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssSuffixMatcher('value');
      const dataset = [
        { matcher: ''       , expected: '' },
        // Combinations of equal
        { matcher: '=value'  , expected: '$="value"' },
        { matcher: '=Xvalue' , expected: '$="value"' },
        { matcher: '=valueX' , expected: '*="value"' },
        { matcher: '=XvalueX', expected: '*="value"' },
        { matcher: '=XXXXXXX', expected: 'null' },
        { matcher: '=XXaluXX', expected: '*="alu"' },
        // Combinations of prefix
        { matcher: '^=value' , expected: '*="value"' },
        { matcher: '^=Xvalue', expected: '*="value"' },
        { matcher: '^=valueX', expected: '*="value"' },
        { matcher: '^=XvalueX', expected: '*="value"' },
        { matcher: '^=XXXXXXX', expected: 'null' },
        { matcher: '^=XXaluXX', expected: '*="alu"' },
        // Combinations of suffix
        { matcher: '$=value' , expected: '$="value"' },
        { matcher: '$=Xvalue', expected: '$="value"' },
        { matcher: '$=valueX', expected: '*="value"' },
        { matcher: '$=XvalueX', expected: '*="value"' },
        { matcher: '$=XXXXXXX', expected: 'null' },
        { matcher: '$=XXaluXX', expected: '*="alu"' },
        // Combinations of contains
        { matcher: '*=value' , expected: '*="value"' },
        { matcher: '*=Xvalue', expected: '*="value"' },
        { matcher: '*=valueX', expected: '*="value"' },
        { matcher: '*=XvalueX', expected: '*="value"' },
        { matcher: '*=XXXXXXX', expected: 'null' },
        { matcher: '*=XXaluXX', expected: '*="alu"' },
        // Combinations of occurrence
        { matcher: '~=value' , expected: '*="value"' },
        { matcher: '~=Xvalue', expected: '*="value"' },
        { matcher: '~=valueX', expected: '*="value"' },
        { matcher: '~=XvalueX', expected: '*="value"' },
        { matcher: '~=XXXXXXX', expected: 'null' },
        { matcher: '~=XXaluXX', expected: '*="alu"' },
        // Combinations of prefix
        { matcher: '|=value' , expected: '*="value"' },
        { matcher: '|=Xvalue', expected: '*="value"' },
        { matcher: '|=valueX', expected: '*="value"' },
        { matcher: '|=XvalueX', expected: '*="value"' },
        { matcher: '|=XXXXXXX', expected: 'null' },
        { matcher: '|=XXaluXX', expected: '*="alu"' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
