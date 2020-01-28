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
      const matcher = new CssPresenceMatcher('');
      const dataset = [
        { matcher: matcherFrom('')        , expected: '' },
        { matcher: matcherFrom('=value')  , expected: '' },
        { matcher: matcherFrom('=Xvalue') , expected: '' },
        { matcher: matcherFrom('=valueX') , expected: '' },
        { matcher: matcherFrom('^=value') , expected: '' },
        { matcher: matcherFrom('^=Xvalue'), expected: '' },
        { matcher: matcherFrom('^=valueX'), expected: '' },
        { matcher: matcherFrom('$=value') , expected: '' },
        { matcher: matcherFrom('$=Xvalue'), expected: '' },
        { matcher: matcherFrom('$=valueX'), expected: '' },
        { matcher: matcherFrom('*=value') , expected: '' },
        { matcher: matcherFrom('*=Xvalue'), expected: '' },
        { matcher: matcherFrom('*=valueX'), expected: '' },
        { matcher: matcherFrom('~=value') , expected: '' },
        { matcher: matcherFrom('~=Xvalue'), expected: '' },
        { matcher: matcherFrom('~=valueX'), expected: '' },
        { matcher: matcherFrom('|=value') , expected: '' },
        { matcher: matcherFrom('|=Xvalue'), expected: '' },
        { matcher: matcherFrom('|=valueX'), expected: '' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
