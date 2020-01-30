import { CssPresenceMatcher } from "./presence-matcher";
import { checkOperation, matcherFrom } from './test-utils';


describe('presence matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssPresenceMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')        , expected: true },
        { matcher: matcherFrom('=value')  , expected: true },
        { matcher: matcherFrom('=Xvalue') , expected: true },
        { matcher: matcherFrom('=valueX') , expected: true },
        { matcher: matcherFrom('=XvalueX'), expected: true },
        { matcher: matcherFrom('=XXXXXXX'), expected: true },
        { matcher: matcherFrom('=XXaluXX'), expected: true },
        // Combinations of prefix
        { matcher: matcherFrom('^=value') , expected: true },
        { matcher: matcherFrom('^=Xvalue'), expected: true },
        { matcher: matcherFrom('^=valueX'), expected: true },
        { matcher: matcherFrom('=XvalueX'), expected: true },
        { matcher: matcherFrom('=XXXXXXX'), expected: true },
        { matcher: matcherFrom('=XXaluXX'), expected: true },
        // Combinations of prefix
        { matcher: matcherFrom('$=value') , expected: true },
        { matcher: matcherFrom('$=Xvalue'), expected: true },
        { matcher: matcherFrom('$=valueX'), expected: true },
        { matcher: matcherFrom('=XvalueX'), expected: true },
        { matcher: matcherFrom('=XXXXXXX'), expected: true },
        { matcher: matcherFrom('=XXaluXX'), expected: true },
        // Combinations of prefix
        { matcher: matcherFrom('*=value') , expected: true },
        { matcher: matcherFrom('*=Xvalue'), expected: true },
        { matcher: matcherFrom('*=valueX'), expected: true },
        { matcher: matcherFrom('=XvalueX'), expected: true },
        { matcher: matcherFrom('=XXXXXXX'), expected: true },
        { matcher: matcherFrom('=XXaluXX'), expected: true },
        // Combinations of prefix
        { matcher: matcherFrom('~=value') , expected: true },
        { matcher: matcherFrom('~=Xvalue'), expected: true },
        { matcher: matcherFrom('~=valueX'), expected: true },
        { matcher: matcherFrom('=XvalueX'), expected: true },
        { matcher: matcherFrom('=XXXXXXX'), expected: true },
        { matcher: matcherFrom('=XXaluXX'), expected: true },
        // Combinations of prefix
        { matcher: matcherFrom('|=value') , expected: true },
        { matcher: matcherFrom('|=Xvalue'), expected: true },
        { matcher: matcherFrom('|=valueX'), expected: true },
        { matcher: matcherFrom('=XvalueX'), expected: true },
        { matcher: matcherFrom('=XXXXXXX'), expected: true },
        { matcher: matcherFrom('=XXaluXX'), expected: true },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssPresenceMatcher('');
      const dataset = [
        { matcher: matcherFrom('')        , expected: '' },
        // Combinations of equal
        { matcher: matcherFrom('=value')   , expected: '' },
        { matcher: matcherFrom('=Xvalue')  , expected: '' },
        { matcher: matcherFrom('=valueX')  , expected: '' },
        { matcher: matcherFrom('=XvalueX') , expected: '' },
        { matcher: matcherFrom('=XXXXXXX') , expected: '' },
        { matcher: matcherFrom('=XXaluXX') , expected: '' },
        // Combinations of prefix
        { matcher: matcherFrom('^=value')  , expected: '' },
        { matcher: matcherFrom('^=Xvalue') , expected: '' },
        { matcher: matcherFrom('^=valueX') , expected: '' },
        { matcher: matcherFrom('^XvalueX') , expected: '' },
        { matcher: matcherFrom('^XXXXXXX') , expected: '' },
        { matcher: matcherFrom('^XXaluXX') , expected: '' },
        // Combinations of suffix
        { matcher: matcherFrom('$=value')  , expected: '' },
        { matcher: matcherFrom('$=Xvalue') , expected: '' },
        { matcher: matcherFrom('$=valueX') , expected: '' },
        { matcher: matcherFrom('$=XvalueX'), expected: '' },
        { matcher: matcherFrom('$=XXXXXXX'), expected: '' },
        { matcher: matcherFrom('$=XXaluXX'), expected: '' },
        // Combinations of contains
        { matcher: matcherFrom('*=value')  , expected: '' },
        { matcher: matcherFrom('*=Xvalue') , expected: '' },
        { matcher: matcherFrom('*=valueX') , expected: '' },
        { matcher: matcherFrom('*=XvalueX'), expected: '' },
        { matcher: matcherFrom('*=XXXXXXX'), expected: '' },
        { matcher: matcherFrom('*=XXaluXX'), expected: '' },
        // Combinations of occurrence
        { matcher: matcherFrom('~=value')  , expected: '' },
        { matcher: matcherFrom('~=Xvalue') , expected: '' },
        { matcher: matcherFrom('~=valueX') , expected: '' },
        { matcher: matcherFrom('~=XvalueX'), expected: '' },
        { matcher: matcherFrom('~=XXXXXXX'), expected: '' },
        { matcher: matcherFrom('~=XXaluXX'), expected: '' },
        // Combinations of subcode
        { matcher: matcherFrom('|=value')  , expected: '' },
        { matcher: matcherFrom('|=Xvalue') , expected: '' },
        { matcher: matcherFrom('|=valueX') , expected: '' },
        { matcher: matcherFrom('|=XvalueX'), expected: '' },
        { matcher: matcherFrom('|=XXXXXXX'), expected: '' },
        { matcher: matcherFrom('|=XXaluXX'), expected: '' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
