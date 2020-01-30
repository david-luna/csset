import { CssPrefixMatcher } from "../../src/matchers/prefix-matcher";
import { checkOperation, matcherFrom } from '../test-utils';


describe('prefix matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssPrefixMatcher('value');
      const dataset = [
        { matcher: ''        , expected: false },
        // Combinations of equal
        { matcher: '=value'  , expected: true },
        { matcher: '=Xvalue' , expected: false },
        { matcher: '=valueX' , expected: true },
        { matcher: '=XvalueX', expected: false },
        { matcher: '=XXXXXXX', expected: false },
        { matcher: '=XXaluXX', expected: false },
        // Combinations of prefix
        { matcher: '^=value' , expected: true },
        { matcher: '^=Xvalue', expected: false },
        { matcher: '^=valueX', expected: true },
        { matcher: '^=XvalueX', expected: false },
        { matcher: '^=XXXXXXX', expected: false },
        { matcher: '^=XXaluXX', expected: false },
        // Combinations of suffix
        { matcher: '$=value' , expected: false },
        { matcher: '$=Xvalue', expected: false },
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
        // Combinations of subcode
        { matcher: '|=value' , expected: true },
        { matcher: '|=Xvalue', expected: false },
        { matcher: '|=valueX', expected: true },
        { matcher: '|=XvalueX', expected: false },
        { matcher: '|=XXXXXXX', expected: false },
        { matcher: '|=XXaluXX', expected: false },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssPrefixMatcher('value');
      const dataset = [
        { matcher: ''       , expected: '' },
        // Combinations of equal
        { matcher: '=value'  , expected: '^="value"' },
        { matcher: '=Xvalue' , expected: '*="value"' },
        { matcher: '=valueX' , expected: '^="value"' },
        { matcher: '=XvalueX', expected: '*="value"' },
        { matcher: '=XXXXXXX', expected: 'null' },
        { matcher: '=XXaluXX', expected: '*="alu"' },
        // Combinations of prefix
        { matcher: '^=value' , expected: '^="value"' },
        { matcher: '^=Xvalue', expected: '*="value"' },
        { matcher: '^=valueX', expected: '^="value"' },
        { matcher: '^=XvalueX', expected: '*="value"' },
        { matcher: '^=XXXXXXX', expected: 'null' },
        { matcher: '^=XXaluXX', expected: '*="alu"' },
        // Combinations of suffix
        { matcher: '$=value' , expected: '*="value"' },
        { matcher: '$=Xvalue', expected: '*="value"' },
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
        // Combinations of occurence
        { matcher: '~=value' , expected: '*="value"' },
        { matcher: '~=Xvalue', expected: '*="value"' },
        { matcher: '~=valueX', expected: '*="value"' },
        { matcher: '~=XvalueX', expected: '*="value"' },
        { matcher: '~=XXXXXXX', expected: 'null' },
        { matcher: '~=XXaluXX', expected: '*="alu"' },
        // Combinations of subcode
        { matcher: '|=value', expected: '^="value"' },
        { matcher: '|=Xvalue', expected: '*="value"' },
        { matcher: '|=valueX', expected: '^="value"' },
        { matcher: '|=XvalueX', expected: '*="value"' },
        { matcher: '|=XXXXXXX', expected: 'null' },
        { matcher: '|=XXaluXX', expected: '*="alu"' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
