import { CssSuffixMatcher } from "../../src/matchers/suffix-matcher";
import { checkOperation, matcherFrom } from './test-utils';


describe('suffix matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssSuffixMatcher('value');

      const dataset = [
        { matcher: matcherFrom('')        , expected: false },
        // Combinations of equals
        { matcher: matcherFrom('=value')   , expected: true },
        { matcher: matcherFrom('=Xvalue')  , expected: true },
        { matcher: matcherFrom('=valueX')  , expected: false },
        { matcher: matcherFrom('=XvalueX') , expected: false },
        { matcher: matcherFrom('=XXXXXXX') , expected: false },
        { matcher: matcherFrom('=XXaluXX') , expected: false },
        // Combinations of prefix
        { matcher: matcherFrom('^=value')  , expected: false },
        { matcher: matcherFrom('^=Xvalue') , expected: false },
        { matcher: matcherFrom('^=valueX') , expected: false },
        { matcher: matcherFrom('^=XvalueX'), expected: false },
        { matcher: matcherFrom('^=XXXXXXX'), expected: false },
        { matcher: matcherFrom('^=XXaluXX'), expected: false },
        // Combinations of suffix
        { matcher: matcherFrom('$=value')  , expected: true },
        { matcher: matcherFrom('$=Xvalue') , expected: true },
        { matcher: matcherFrom('$=valueX') , expected: false },
        { matcher: matcherFrom('$=XvalueX'), expected: false },
        { matcher: matcherFrom('$=XXXXXXX'), expected: false },
        { matcher: matcherFrom('$=XXaluXX'), expected: false },
        // Combinations of contains
        { matcher: matcherFrom('*=value')  , expected: false },
        { matcher: matcherFrom('*=Xvalue') , expected: false },
        { matcher: matcherFrom('*=valueX') , expected: false },
        { matcher: matcherFrom('*=XvalueX'), expected: false },
        { matcher: matcherFrom('*=XXXXXXX'), expected: false },
        { matcher: matcherFrom('*=XXaluXX'), expected: false },
        // Combinations of occurence
        { matcher: matcherFrom('~=value')  , expected: false },
        { matcher: matcherFrom('~=Xvalue') , expected: false },
        { matcher: matcherFrom('~=valueX') , expected: false },
        { matcher: matcherFrom('~=XvalueX'), expected: false },
        { matcher: matcherFrom('~=XXXXXXX'), expected: false },
        { matcher: matcherFrom('~=XXaluXX'), expected: false },
        // Combinations of prefix
        { matcher: matcherFrom('|=value')  , expected: false },
        { matcher: matcherFrom('|=Xvalue') , expected: false },
        { matcher: matcherFrom('|=valueX') , expected: false },
        { matcher: matcherFrom('|=XvalueX'), expected: false },
        { matcher: matcherFrom('|=XXXXXXX'), expected: false },
        { matcher: matcherFrom('|=XXaluXX'), expected: false },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssSuffixMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')        , expected: '' },
        // Combinations of equal
        { matcher: matcherFrom('=value')   , expected: '$="value"' },
        { matcher: matcherFrom('=Xvalue')  , expected: '$="value"' },
        { matcher: matcherFrom('=valueX')  , expected: '*="value"' },
        { matcher: matcherFrom('=XvalueX') , expected: '*="value"' },
        { matcher: matcherFrom('=XXXXXXX') , expected: 'null' },
        { matcher: matcherFrom('=XXaluXX') , expected: '*="alu"' },
        // Combinations of prefix
        { matcher: matcherFrom('^=value')  , expected: '*="value"' },
        { matcher: matcherFrom('^=Xvalue') , expected: '*="value"' },
        { matcher: matcherFrom('^=valueX') , expected: '*="value"' },
        { matcher: matcherFrom('^=XvalueX'), expected: '*="value"' },
        { matcher: matcherFrom('^=XXXXXXX'), expected: 'null' },
        { matcher: matcherFrom('^=XXaluXX'), expected: '*="alu"' },
        // Combinations of suffix
        { matcher: matcherFrom('$=value')  , expected: '$="value"' },
        { matcher: matcherFrom('$=Xvalue') , expected: '$="value"' },
        { matcher: matcherFrom('$=valueX') , expected: '*="value"' },
        { matcher: matcherFrom('$=XvalueX'), expected: '*="value"' },
        { matcher: matcherFrom('$=XXXXXXX'), expected: 'null' },
        { matcher: matcherFrom('$=XXaluXX'), expected: '*="alu"' },
        // Combinations of contains
        { matcher: matcherFrom('*=value')  , expected: '*="value"' },
        { matcher: matcherFrom('*=Xvalue') , expected: '*="value"' },
        { matcher: matcherFrom('*=valueX') , expected: '*="value"' },
        { matcher: matcherFrom('*=XvalueX'), expected: '*="value"' },
        { matcher: matcherFrom('*=XXXXXXX'), expected: 'null' },
        { matcher: matcherFrom('*=XXaluXX'), expected: '*="alu"' },
        // Combinations of occurrence
        { matcher: matcherFrom('~=value')  , expected: '*="value"' },
        { matcher: matcherFrom('~=Xvalue') , expected: '*="value"' },
        { matcher: matcherFrom('~=valueX') , expected: '*="value"' },
        { matcher: matcherFrom('~=XvalueX'), expected: '*="value"' },
        { matcher: matcherFrom('~=XXXXXXX'), expected: 'null' },
        { matcher: matcherFrom('~=XXaluXX'), expected: '*="alu"' },
        // Combinations of prefix
        { matcher: matcherFrom('|=value')  , expected: '*="value"' },
        { matcher: matcherFrom('|=Xvalue') , expected: '*="value"' },
        { matcher: matcherFrom('|=valueX') , expected: '*="value"' },
        { matcher: matcherFrom('|=XvalueX'), expected: '*="value"' },
        { matcher: matcherFrom('|=XXXXXXX'), expected: 'null' },
        { matcher: matcherFrom('|=XXaluXX'), expected: '*="alu"' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
