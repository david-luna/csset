import { CssSuffixMatcher } from "./suffix-matcher";
import { checkOperation, matcherFrom } from './test-utils';


describe('suffix matcher', () => {
  describe('supersetOf', () => {
    test('supersetOf should work with same value and other types', () => {
      const matcher = new CssSuffixMatcher('value');

      const dataset = [
        { matcher: matcherFrom('')        , expected: false },
        { matcher: matcherFrom('=value')  , expected: true },
        { matcher: matcherFrom('=Xvalue') , expected: true },
        { matcher: matcherFrom('=valueX') , expected: false },
        { matcher: matcherFrom('^=value') , expected: false },
        { matcher: matcherFrom('^=Xvalue'), expected: false },
        { matcher: matcherFrom('^=valueX'), expected: false },
        { matcher: matcherFrom('$=value') , expected: true },
        { matcher: matcherFrom('$=Xvalue'), expected: true },
        { matcher: matcherFrom('$=valueX'), expected: false },
        { matcher: matcherFrom('*=value') , expected: false },
        { matcher: matcherFrom('*=Xvalue'), expected: false },
        { matcher: matcherFrom('*=valueX'), expected: false },
        { matcher: matcherFrom('~=value') , expected: false },
        { matcher: matcherFrom('~=Xvalue'), expected: false },
        { matcher: matcherFrom('~=valueX'), expected: false },
        { matcher: matcherFrom('|=value') , expected: false },
        { matcher: matcherFrom('|=Xvalue'), expected: false },
        { matcher: matcherFrom('|=valueX'), expected: false },
      ];

      checkOperation(matcher, 'supersetOf')(dataset);
    });
  });

  describe('union', () => {
    test('union should work with same other types', () => {
      const matcher = new CssSuffixMatcher('value');
      const dataset = [
        { matcher: matcherFrom('')        , expected: '' },
        { matcher: matcherFrom('=value')  , expected: '$="value"' },
        { matcher: matcherFrom('=Xvalue') , expected: '$="value"' },
        { matcher: matcherFrom('=valueX') , expected: '*="value"' },
        { matcher: matcherFrom('^=value') , expected: '*="value"' },
        { matcher: matcherFrom('^=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('^=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('$=value') , expected: '$="value"' },
        { matcher: matcherFrom('$=Xvalue'), expected: '$="value"' },
        { matcher: matcherFrom('$=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('*=value') , expected: '*="value"' },
        { matcher: matcherFrom('*=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('*=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('~=value') , expected: '*="value"' },
        { matcher: matcherFrom('~=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('~=valueX'), expected: '*="value"' },
        { matcher: matcherFrom('|=value') , expected: '*="value"' },
        { matcher: matcherFrom('|=Xvalue'), expected: '*="value"' },
        { matcher: matcherFrom('|=valueX'), expected: '*="value"' },
      ];

      checkOperation(matcher, 'union')(dataset);
    });
  });
});
