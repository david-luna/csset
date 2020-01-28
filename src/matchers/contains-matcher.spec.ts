import { CssContainsMatcher } from "./contains-matcher";
import { checkOperation, matcherFrom } from './test-utils';


describe('contains matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with other types', () => {
      const matcher = new CssContainsMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')        , expected: false },
        { matcher: matcherFrom('=value')  , expected: true },
        { matcher: matcherFrom('=Xvalue') , expected: true },
        { matcher: matcherFrom('=valueX') , expected: true },
        { matcher: matcherFrom('^=value') , expected: true },
        { matcher: matcherFrom('^=Xvalue'), expected: true },
        { matcher: matcherFrom('^=valueX'), expected: true },
        { matcher: matcherFrom('$=value') , expected: true },
        { matcher: matcherFrom('$=Xvalue'), expected: true },
        { matcher: matcherFrom('$=valueX'), expected: true },
        { matcher: matcherFrom('*=value') , expected: true },
        { matcher: matcherFrom('*=Xvalue'), expected: true },
        { matcher: matcherFrom('*=valueX'), expected: true },
        { matcher: matcherFrom('~=value') , expected: true },
        { matcher: matcherFrom('~=Xvalue'), expected: true },
        { matcher: matcherFrom('~=valueX'), expected: true },
        { matcher: matcherFrom('|=value') , expected: true },
        { matcher: matcherFrom('|=Xvalue'), expected: true },
        { matcher: matcherFrom('|=valueX'), expected: true },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssContainsMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')          , expected: '' },
        // Combinations of equal
        { matcher: matcherFrom('=value')    , expected: '*="value"' },
        { matcher: matcherFrom('=Xvalue')   , expected: '*="value"' },
        { matcher: matcherFrom('=valueX')   , expected: '*="value"' },
        { matcher: matcherFrom('=XvalueX')  , expected: '*="value"' },
        { matcher: matcherFrom('=XXXXXXX')  , expected: 'null' },
        { matcher: matcherFrom('=XXaluXX')  , expected: '*="alu"' },
        // Combinations of prefix
        { matcher: matcherFrom('^=value')   , expected: '*="value"' },
        { matcher: matcherFrom('^=Xvalue')  , expected: '*="value"' },
        { matcher: matcherFrom('^=valueX')  , expected: '*="value"' },
        { matcher: matcherFrom('^=XvalueX') , expected: '*="value"' },
        { matcher: matcherFrom('^=XXXXXXX') , expected: 'null' },
        { matcher: matcherFrom('^=XXaluXX') , expected: '*="alu"' },
        // Combinations of suffix
        { matcher: matcherFrom('$=value')   , expected: '*="value"' },
        { matcher: matcherFrom('$=Xvalue')  , expected: '*="value"' },
        { matcher: matcherFrom('$=valueX')  , expected: '*="value"' },
        { matcher: matcherFrom('$=XvalueX') , expected: '*="value"' },
        { matcher: matcherFrom('$=XXXXXXX') , expected: 'null' },
        { matcher: matcherFrom('$=XXaluXX') , expected: '*="alu"' },
        // Combinations of contains
        { matcher: matcherFrom('*=value')   , expected: '*="value"' },
        { matcher: matcherFrom('*=Xvalue')  , expected: '*="value"' },
        { matcher: matcherFrom('*=valueX')  , expected: '*="value"' },
        { matcher: matcherFrom('*=XvalueX') , expected: '*="value"' },
        { matcher: matcherFrom('*=XXXXXXX') , expected: 'null' },
        { matcher: matcherFrom('*=XXaluXX') , expected: '*="alu"' },
        // Combinations of occurence
        { matcher: matcherFrom('~=value')   , expected: '*="value"' },
        { matcher: matcherFrom('~=Xvalue')  , expected: '*="value"' },
        { matcher: matcherFrom('~=valueX')  , expected: '*="value"' },
        { matcher: matcherFrom('~=XvalueX') , expected: '*="value"' },
        { matcher: matcherFrom('~=XXXXXXX') , expected: 'null' },
        { matcher: matcherFrom('~=XXaluXX') , expected: '*="alu"' },
        // Combinations of subcode
        { matcher: matcherFrom('|=value')   , expected: '*="value"' },
        { matcher: matcherFrom('|=Xvalue')  , expected: '*="value"' },
        { matcher: matcherFrom('|=valueX')  , expected: '*="value"' },
        { matcher: matcherFrom('|=XvalueX') , expected: '*="value"' },
        { matcher: matcherFrom('|=XXXXXXX') , expected: 'null' },
        { matcher: matcherFrom('|=XXaluXX') , expected: '*="alu"' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
