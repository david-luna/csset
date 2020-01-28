import { CssAttributeMatcher } from "../css-attribute-matcher";
import { CssMatcherFactory } from './css-matcher-factory';

type MatcherTestSet = {
  matcher: CssAttributeMatcher,
  expected: boolean | string,
};
type MatcherOperations = 'supersetOf' | 'subsetOf' | 'union'; // | 'intersection';

export const operationSymbols: any = {
  supersetOf  : "\u2283",
  union       : "\u222A",
  intersection: "\u2229",
};

export const matcherFrom = (s: string): CssAttributeMatcher => {
  return CssMatcherFactory.create(s);
}

export const checkOperation = (matcher: CssAttributeMatcher, op: MatcherOperations): (...a: any[]) => void => {
  return (dataset: MatcherTestSet[]) => {
    dataset.forEach((data) => {
      const symbol  = operationSymbols[op];
      const result  = `${matcher} ${symbol} ${data.matcher} = ${matcher[op](data.matcher)}`;
      const message = `${matcher} ${symbol} ${data.matcher} = ${data.expected}`;

      expect(result).toEqual(message);
    });
  }
}
