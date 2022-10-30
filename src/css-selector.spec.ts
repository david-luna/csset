import { CssSelector } from './css-selector';
import { operationSymbols } from '../test/utils';

interface TestItem {
  sel1: string;
  sel2: string;
  expected: string | boolean;
}

const runExpectations = (testSet: TestItem[], operation: string) => {
  let method: 'supersetOf' | 'subsetOf'; // | 'union' | 'intersection';

  switch (operation) {
    case operationSymbols.supersetOf:
      method = 'supersetOf';
      break;
    case operationSymbols.subsetOf:
      method = 'subsetOf';
      break;
    // case operationSymbols.union:
    //   method = 'union';
    //   break;
    // case operationSymbols.intersection:
    //   method = 'intersection';
    //   break;
  }

  testSet.forEach((item) => {
    const selector1 = new CssSelector(item.sel1);
    const selector2 = new CssSelector(item.sel2);
    const result = `${selector1} ${operation} ${selector2} => ${selector1[method](selector2)}`;
    const expected = `${selector1} ${operation} ${selector2} => ${item.expected}`;

    expect(result).toEqual(expected);
  });
};

describe('CssSelector', () => {
  describe('supersetOf', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reverse = (data: any[]) =>
      data.map((d) => ({
        sel1: d.sel2,
        sel2: d.sel1,
        expected: d.expected,
      }));

    test('should return false if 1st set is more specific', () => {
      const data = [
        {
          sel1: 'div > p + span > a#id ~ p',
          sel2: '*',
          expected: false,
        },
        {
          sel1: 'div > a ~ p',
          sel2: 'div > p',
          expected: false,
        },
        {
          sel1: '* > span#id > a',
          sel2: 'span > a',
          expected: false,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });

    test('should compare properly when the rule is less specific', () => {
      const data = [
        {
          sel1: '*',
          sel2: 'div > p + span > a#id ~ p',
          expected: true,
        },
        {
          sel1: 'span > a ~ p',
          sel2: 'div > p + span > a#id ~ p',
          expected: true,
        },
        {
          sel1: 'span#id > a',
          sel2: 'div > p + span > a',
          expected: false,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });

    test('should compare properly for rules with the same combinators', () => {
      const data = [
        {
          sel1: 'div > p + span > a ~ p',
          sel2: 'div > p + span > a#id ~ p',
          expected: true,
        },
        {
          sel1: 'div#id > p + span > a',
          sel2: 'div > p + span > a',
          expected: false,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });

    test('should compare properly for rules with different combinators', () => {
      const data = [
        {
          sel1: 'div p',
          sel2: 'div > p',
          expected: true,
        },
        {
          sel1: 'span ~ a',
          sel2: 'span + a',
          expected: true,
        },
        {
          sel1: 'div > p',
          sel2: 'div p',
          expected: false,
        },
        {
          sel1: 'span + a',
          sel2: 'span ~ a',
          expected: false,
        },
        {
          sel1: 'div div p a',
          sel2: 'div > div p > a',
          expected: true,
        },
        {
          sel1: 'div ~ span ~ a',
          sel2: 'div + span + a',
          expected: true,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });

    test('should compare properly with different hierarchy combinators', () => {
      const data = [
        {
          sel1: 'section > article > h1 > p',
          sel2: 'section article h1 p',
          expected: false,
        },
        {
          sel1: 'section article h1 p',
          sel2: 'section > article > h1 > p',
          expected: true,
        },
        {
          sel1: 'section article h1 p',
          sel2: 'section > article h1 p',
          expected: true,
        },
        {
          sel1: 'section article h1 p',
          sel2: 'section article > h1 p',
          expected: true,
        },
        {
          sel1: 'section article h1 p',
          sel2: 'section article h1 > p',
          expected: true,
        },
        {
          sel1: 'section > article h1 p',
          sel2: 'section article h1 > p',
          expected: false,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });

    test('should compare properly with different sibling combinators', () => {
      const data = [
        {
          sel1: 'section + article + h1 + p',
          sel2: 'section ~ article ~ h1 ~ p',
          expected: false,
        },
        {
          sel1: 'section ~ article ~ h1 ~ p',
          sel2: 'section + article + h1 + p',
          expected: true,
        },
        {
          sel1: 'section ~ article ~ h1 ~ p',
          sel2: 'section + article h1 p',
          expected: false,
        },
        {
          sel1: 'section ~ article ~ h1 ~ p',
          sel2: 'section article + h1 p',
          expected: false,
        },
        {
          sel1: 'section ~ article ~ h1 ~ p',
          sel2: 'section article h1 + p',
          expected: false,
        },
        {
          sel1: 'section + article ~ h1 ~ p',
          sel2: 'section ~ article ~ h1 + p',
          expected: false,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });

    test('should compare properly with edge cases combinators', () => {
      const data = [
        {
          sel1: 'section > article + h1 p > a',
          sel2: 'section article h1 ~ p a',
          expected: false,
        },
        {
          sel1: 'section > article + h1 p > a',
          sel2: 'section article h1 ~ p > a',
          expected: false,
        },
        {
          sel1: 'section > article + h1 p > a',
          sel2: 'section > article h1 + p > a',
          expected: false,
        },
        {
          sel1: 'section + article + h1 + p + a',
          sel2: 'section article h1 p > a',
          expected: false,
        },
        {
          sel1: 'p > section + article + h1 + p + a',
          sel2: 'section article h1 div p > a',
          expected: false,
        },
      ];

      runExpectations(data, operationSymbols.supersetOf);
      runExpectations(reverse(data), operationSymbols.subsetOf);
    });
  });
});
