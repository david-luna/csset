import { CssAttributeMatcher } from "../src/css-attribute-matcher";
import { CssMatcherFactory } from '../src/matchers/css-matcher-factory';

type MatcherTestSet = {
  matcher: string,
  expected: boolean | string,
};
type MatcherOperations = 'supersetOf' | 'subsetOf' | 'union' | 'intersection';

export const operationSymbols: any = {
  supersetOf  : "\u2283",
  union       : "\u222A",
  intersection: "\u2229",
};

export const checkOperation = (matcher: CssAttributeMatcher, op: MatcherOperations): (...a: any[]) => void => {
  return (dataset: MatcherTestSet[]) => {
    dataset.forEach((data) => {
      const testMatcher = CssMatcherFactory.create(data.matcher);
      const symbol  = operationSymbols[op];
      const result  = `${matcher} ${symbol} ${data.matcher} <=> ${matcher[op](testMatcher)}`;
      const message = `${matcher} ${symbol} ${data.matcher} <=> ${data.expected}`;

      expect(result).toEqual(message);
    });
  }
}
