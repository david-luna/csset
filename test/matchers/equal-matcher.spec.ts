import { CssEqualMatcher } from "../../src/matchers/equal-matcher";
import { checkOperation } from '../test-utils';


describe('equal matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssEqualMatcher('value');
      const dataset = [
        { matcher: ''         , expected: false },
        // Combinations of equal
        { matcher: '=value'   , expected: true },
        { matcher: '=Xvalue'  , expected: false },
        { matcher: '=valueX'  , expected: false },
        { matcher: '=XvalueX' , expected: false },
        { matcher: '=XXXXXXX' , expected: false },
        { matcher: '=XXaluXX' , expected: false },
        // Combinations of prefix
        { matcher: '^=value'  , expected: false },
        { matcher: '^=Xvalue' , expected: false },
        { matcher: '^=valueX' , expected: false },
        { matcher: '^=XvalueX', expected: false },
        { matcher: '^=XXXXXXX', expected: false },
        { matcher: '^=XXaluXX', expected: false },
        // Combinations of suffix
        { matcher: '$=value'  , expected: false },
        { matcher: '$=Xvalue' , expected: false },
        { matcher: '$=valueX' , expected: false },
        { matcher: '$=XvalueX', expected: false },
        { matcher: '$=XXXXXXX', expected: false },
        { matcher: '$=XXaluXX', expected: false },
        // Combinations of contains
        { matcher: '*=value'  , expected: false },
        { matcher: '*=Xvalue' , expected: false },
        { matcher: '*=valueX' , expected: false },
        { matcher: '*=XvalueX', expected: false },
        { matcher: '*=XXXXXXX', expected: false },
        { matcher: '*=XXaluXX', expected: false },
        // Combinations of occurence
        { matcher: '~=value'  , expected: false },
        { matcher: '~=Xvalue' , expected: false },
        { matcher: '~=valueX' , expected: false },
        { matcher: '~=XvalueX', expected: false },
        { matcher: '~=XXXXXXX', expected: false },
        { matcher: '~=XXaluXX', expected: false },
        // Combinations of subcode
        { matcher: '|=value'  , expected: false },
        { matcher: '|=Xvalue' , expected: false },
        { matcher: '|=valueX' , expected: false },
        { matcher: '|=XvalueX', expected: false },
        { matcher: '|=XXXXXXX', expected: false },
        { matcher: '|=XXaluXX', expected: false },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same or other types', () => {
      const matcher = new CssEqualMatcher('value');
      const dataset = [
        { matcher: ''        , expected: '' },
        // Combinations of equal
        { matcher: '=value'   , expected: '="value"' },
        { matcher: '=Xvalue'  , expected: 'null' },
        { matcher: '=valueX'  , expected: 'null' },
        { matcher: '=XvalueX' , expected: 'null' },
        { matcher: '=XXXXXXX' , expected: 'null' },
        { matcher: '=XXaluXX' , expected: 'null' },
        // Combinations of prefix
        { matcher: '^=value'  , expected: '^="value"' },
        { matcher: '^=Xvalue' , expected: 'null' },
        { matcher: '^=valueX' , expected: 'null' },
        { matcher: '^=XvalueX', expected: 'null' },
        { matcher: '^=XXXXXXX', expected: 'null' },
        { matcher: '^=XXaluXX', expected: 'null' },
        // Combinations of suffix
        { matcher: '$=value'  , expected: '$="value"' },
        { matcher: '$=Xvalue' , expected: 'null' },
        { matcher: '$=valueX' , expected: 'null' },
        { matcher: '$=XvalueX', expected: 'null' },
        { matcher: '$=XXXXXXX', expected: 'null' },
        { matcher: '$=XXaluXX', expected: 'null' },
        // Combinations of contains
        { matcher: '*=value'  , expected: '*="value"' },
        { matcher: '*=Xvalue' , expected: 'null' },
        { matcher: '*=valueX' , expected: 'null' },
        { matcher: '*=XvalueX', expected: 'null' },
        { matcher: '*=XXXXXXX', expected: 'null' },
        { matcher: '*=XXaluXX', expected: 'null' },
        // Combinations of occurence
        { matcher: '~=value'  , expected: '~="value"' },
        { matcher: '~=Xvalue' , expected: 'null' },
        { matcher: '~=valueX' , expected: 'null' },
        { matcher: '~=XvalueX', expected: 'null' },
        { matcher: '~=XXXXXXX', expected: 'null' },
        { matcher: '~=XXaluXX', expected: 'null' },
        // Combinations of subcode
        { matcher: '|=value'  , expected: '|="value"' },
        { matcher: '|=Xvalue' , expected: 'null' },
        { matcher: '|=valueX' , expected: 'null' },
        { matcher: '|=XvalueX', expected: 'null' },
        { matcher: '|=XXXXXXX', expected: 'null' },
        { matcher: '|=XXaluXX', expected: 'null' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });

  describe('intersection', () => {
    test('intersection should work with same or other types', () => {
      const matcher = new CssEqualMatcher('value');
      const dataset = [
        { matcher: ''        , expected: '="value"' },
        // Combinations of equal
        { matcher: '=value'   , expected: '="value"' },
        { matcher: '=Xvalue'  , expected: 'undefined' },
        { matcher: '=valueX'  , expected: 'undefined' },
        { matcher: '=XvalueX' , expected: 'undefined' },
        { matcher: '=XXXXXXX' , expected: 'undefined' },
        { matcher: '=XXaluXX' , expected: 'undefined' },
        // Combinations of prefix
        { matcher: '^=value'  , expected: '="value"' },
        { matcher: '^=Xvalue' , expected: 'undefined' },
        { matcher: '^=valueX' , expected: 'undefined' },
        { matcher: '^=XvalueX', expected: 'undefined' },
        { matcher: '^=XXXXXXX', expected: 'undefined' },
        { matcher: '^=XXaluXX', expected: 'undefined' },
        // Combinations of suffix
        { matcher: '$=value'  , expected: '="value"' },
        { matcher: '$=Xvalue' , expected: 'undefined' },
        { matcher: '$=valueX' , expected: 'undefined' },
        { matcher: '$=XvalueX', expected: 'undefined' },
        { matcher: '$=XXXXXXX', expected: 'undefined' },
        { matcher: '$=XXaluXX', expected: 'undefined' },
        // Combinations of contains
        { matcher: '*=value'  , expected: '="value"' },
        { matcher: '*=Xvalue' , expected: 'undefined' },
        { matcher: '*=valueX' , expected: 'undefined' },
        { matcher: '*=XvalueX', expected: 'undefined' },
        { matcher: '*=XXXXXXX', expected: 'undefined' },
        { matcher: '*=XXaluXX', expected: 'undefined' },
        // Combinations of occurence
        { matcher: '~=value'  , expected: '="value"' },
        { matcher: '~=Xvalue' , expected: 'undefined' },
        { matcher: '~=valueX' , expected: 'undefined' },
        { matcher: '~=XvalueX', expected: 'undefined' },
        { matcher: '~=XXXXXXX', expected: 'undefined' },
        { matcher: '~=XXaluXX', expected: 'undefined' },
        // Combinations of subcode
        { matcher: '|=value'  , expected: '="value"' },
        { matcher: '|=Xvalue' , expected: 'undefined' },
        { matcher: '|=valueX' , expected: 'undefined' },
        { matcher: '|=XvalueX', expected: 'undefined' },
        { matcher: '|=XXXXXXX', expected: 'undefined' },
        { matcher: '|=XXaluXX', expected: 'undefined' },
      ];

      checkOperation(matcher, 'intersection')(dataset);
    });
  });
});
