import { CssPresenceMatcher } from "../../src/matchers/presence-matcher";
import { checkOperation } from '../test-utils';


describe('presence matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssPresenceMatcher('value');
      const dataset = [
        { matcher: ''       , expected: true },
        { matcher: '=value' , expected: true },
        { matcher: '=Xvalue', expected: true },
        { matcher: '=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: true },
        { matcher: '=XXaluXX', expected: true },
        // Combinations of prefix
        { matcher: '^=value', expected: true },
        { matcher: '^=Xvalue', expected: true },
        { matcher: '^=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: true },
        { matcher: '=XXaluXX', expected: true },
        // Combinations of prefix
        { matcher: '$=value', expected: true },
        { matcher: '$=Xvalue', expected: true },
        { matcher: '$=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: true },
        { matcher: '=XXaluXX', expected: true },
        // Combinations of prefix
        { matcher: '*=value', expected: true },
        { matcher: '*=Xvalue', expected: true },
        { matcher: '*=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: true },
        { matcher: '=XXaluXX', expected: true },
        // Combinations of prefix
        { matcher: '~=value', expected: true },
        { matcher: '~=Xvalue', expected: true },
        { matcher: '~=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: true },
        { matcher: '=XXaluXX', expected: true },
        // Combinations of prefix
        { matcher: '|=value', expected: true },
        { matcher: '|=Xvalue', expected: true },
        { matcher: '|=valueX', expected: true },
        { matcher: '=XvalueX', expected: true },
        { matcher: '=XXXXXXX', expected: true },
        { matcher: '=XXaluXX', expected: true },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same or other types', () => {
      const matcher = new CssPresenceMatcher('');
      const dataset = [
        { matcher: ''       , expected: '' },
        // Combinations of equal
        { matcher: '=value'   , expected: '' },
        { matcher: '=Xvalue'  , expected: '' },
        { matcher: '=valueX'  , expected: '' },
        { matcher: '=XvalueX' , expected: '' },
        { matcher: '=XXXXXXX' , expected: '' },
        { matcher: '=XXaluXX' , expected: '' },
        // Combinations of prefix
        { matcher: '^=value'  , expected: '' },
        { matcher: '^=Xvalue' , expected: '' },
        { matcher: '^=valueX' , expected: '' },
        { matcher: '^=XvalueX', expected: '' },
        { matcher: '^=XXXXXXX', expected: '' },
        { matcher: '^=XXaluXX', expected: '' },
        // Combinations of suffix
        { matcher: '$=value'  , expected: '' },
        { matcher: '$=Xvalue' , expected: '' },
        { matcher: '$=valueX' , expected: '' },
        { matcher: '$=XvalueX', expected: '' },
        { matcher: '$=XXXXXXX', expected: '' },
        { matcher: '$=XXaluXX', expected: '' },
        // Combinations of contains
        { matcher: '*=value'  , expected: '' },
        { matcher: '*=Xvalue' , expected: '' },
        { matcher: '*=valueX' , expected: '' },
        { matcher: '*=XvalueX', expected: '' },
        { matcher: '*=XXXXXXX', expected: '' },
        { matcher: '*=XXaluXX', expected: '' },
        // Combinations of occurrence
        { matcher: '~=value'  , expected: '' },
        { matcher: '~=Xvalue' , expected: '' },
        { matcher: '~=valueX' , expected: '' },
        { matcher: '~=XvalueX', expected: '' },
        { matcher: '~=XXXXXXX', expected: '' },
        { matcher: '~=XXaluXX', expected: '' },
        // Combinations of subcode
        { matcher: '|=value'  , expected: '' },
        { matcher: '|=Xvalue' , expected: '' },
        { matcher: '|=valueX' , expected: '' },
        { matcher: '|=XvalueX', expected: '' },
        { matcher: '|=XXXXXXX', expected: '' },
        { matcher: '|=XXaluXX', expected: '' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });

  describe('intersection', () => {
    test('intersection should work with same or other types', () => {
      const matcher = new CssPresenceMatcher('');
      const dataset = [
        { matcher: ''       , expected: '' },
        // Combinations of equal
        { matcher: '=value'  , expected: '="value"' },
        { matcher: '=Xvalue' , expected: '="Xvalue"' },
        { matcher: '=valueX' , expected: '="valueX"' },
        { matcher: '=XvalueX', expected: '="XvalueX"' },
        { matcher: '=XXXXXXX', expected: '="XXXXXXX"' },
        { matcher: '=XXaluXX', expected: '="XXaluXX"' },
        // Combinations of prefix
        { matcher: '^=value'  , expected: '^="value"' },
        { matcher: '^=Xvalue' , expected: '^="Xvalue"' },
        { matcher: '^=valueX' , expected: '^="valueX"' },
        { matcher: '^=XvalueX', expected: '^="XvalueX"' },
        { matcher: '^=XXXXXXX', expected: '^="XXXXXXX"' },
        { matcher: '^=XXaluXX', expected: '^="XXaluXX"' },
        // Combinations of suffix
        { matcher: '$=value'  , expected: '$="value"' },
        { matcher: '$=Xvalue' , expected: '$="Xvalue"' },
        { matcher: '$=valueX' , expected: '$="valueX"' },
        { matcher: '$=XvalueX', expected: '$="XvalueX"' },
        { matcher: '$=XXXXXXX', expected: '$="XXXXXXX"' },
        { matcher: '$=XXaluXX', expected: '$="XXaluXX"' },
        // Combinations of contains
        { matcher: '*=value'  , expected: '*="value"' },
        { matcher: '*=Xvalue' , expected: '*="Xvalue"' },
        { matcher: '*=valueX' , expected: '*="valueX"' },
        { matcher: '*=XvalueX', expected: '*="XvalueX"' },
        { matcher: '*=XXXXXXX', expected: '*="XXXXXXX"' },
        { matcher: '*=XXaluXX', expected: '*="XXaluXX"' },
        // Combinations of occurrence
        { matcher: '~=value'  , expected: '~="value"' },
        { matcher: '~=Xvalue' , expected: '~="Xvalue"' },
        { matcher: '~=valueX' , expected: '~="valueX"' },
        { matcher: '~=XvalueX', expected: '~="XvalueX"' },
        { matcher: '~=XXXXXXX', expected: '~="XXXXXXX"' },
        { matcher: '~=XXaluXX', expected: '~="XXaluXX"' },
        // Combinations of subcode
        { matcher: '|=value'  , expected: '|="value"' },
        { matcher: '|=Xvalue' , expected: '|="Xvalue"' },
        { matcher: '|=valueX' , expected: '|="valueX"' },
        { matcher: '|=XvalueX', expected: '|="XvalueX"' },
        { matcher: '|=XXXXXXX', expected: '|="XXXXXXX"' },
        { matcher: '|=XXaluXX', expected: '|="XXaluXX"' },
      ];

      checkOperation(matcher, 'intersection')(dataset);
    });
  });
});
