import { CssPrefixMatcher } from "./prefix-matcher";
import { checkOperation, matcherFrom } from './test-utils';


describe('prefix matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssPrefixMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')        , expected: false },
        { matcher: matcherFrom('=value')  , expected: true },
        { matcher: matcherFrom('=Xvalue') , expected: false },
        { matcher: matcherFrom('=valueX') , expected: true },
        { matcher: matcherFrom('^=value') , expected: true },
        { matcher: matcherFrom('^=Xvalue'), expected: false },
        { matcher: matcherFrom('^=valueX'), expected: true },
        { matcher: matcherFrom('$=value') , expected: false },
        { matcher: matcherFrom('$=Xvalue'), expected: false },
        { matcher: matcherFrom('$=valueX'), expected: false },
        { matcher: matcherFrom('*=value') , expected: false },
        { matcher: matcherFrom('*=Xvalue'), expected: false },
        { matcher: matcherFrom('*=valueX'), expected: false },
        { matcher: matcherFrom('~=value') , expected: false },
        { matcher: matcherFrom('~=Xvalue'), expected: false },
        { matcher: matcherFrom('~=valueX'), expected: false },
        { matcher: matcherFrom('|=value') , expected: true },
        { matcher: matcherFrom('|=Xvalue'), expected: false },
        { matcher: matcherFrom('|=valueX'), expected: true },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssPrefixMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')        , expected: '' },
        { matcher: matcherFrom('=value')  , expected: '^="value"' },
        { matcher: matcherFrom('=Xvalue') , expected: '*="value"' },
        { matcher: matcherFrom('=valueX') , expected: '^="value"' },
        { matcher: matcherFrom('^=value') , expected: '^="value"' },
        { matcher: matcherFrom('^=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('^=valueX'), expected: '^="value"' },
        { matcher: matcherFrom('$=value') , expected: '*="value"' },
        { matcher: matcherFrom('$=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('$=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('*=value') , expected: '*="value"' },
        { matcher: matcherFrom('*=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('*=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('~=value') , expected: '*="value"' },
        { matcher: matcherFrom('~=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('~=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('|=value') , expected: '^="value"' },
        { matcher: matcherFrom('|=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('|=valueX'), expected: '^="value"' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
