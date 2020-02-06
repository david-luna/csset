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

      if ( op !== operationSymbols.supersetOf ) {
        const result  = `${matcher} ${symbol} ${data.matcher} <=> ${matcher[op](testMatcher)}`;
        const message = `${matcher} ${symbol} ${data.matcher} <=> ${data.expected}`;
        expect(result).toEqual(message);
      } else {
        const directOperation  = `${matcher[op](testMatcher)}`;
        const inverseOperation = `${testMatcher[op](matcher)}`;
        const directResult     = `(direct)  ${matcher} ${symbol} ${data.matcher} <=> ${directOperation}`;
        const inverseResult    = `(inverse) ${data.matcher} ${symbol} ${matcher} <=> ${inverseOperation}`;
        const directMessage    = `(direct)  ${matcher} ${symbol} ${data.matcher} <=> ${data.expected}`;
        const inverseMessage   = `(inverse) ${data.matcher} ${symbol} ${matcher} <=> ${data.expected}`;

        expect(directResult).toEqual(directMessage);
        expect(inverseResult).toEqual(inverseMessage);
      }
    });
  }
}
