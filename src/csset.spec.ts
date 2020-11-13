import { Csset } from './csset';
import { operationSymbols } from '../test/utils';

interface TestItem {
  sel1: string;
  sel2: string
  expected: string | boolean;
}

const runExpectations = (testSet: TestItem[], operation: string) => {
  let method: 'supersetOf' | 'subsetOf' | 'union' | 'intersection';
  
  switch(operation) {
    case operationSymbols.supersetOf:
      method = 'supersetOf';
      break;
    case operationSymbols.subsetOf:
      method = 'subsetOf';
      break;
    case operationSymbols.union:
      method = 'union';
      break;
    case operationSymbols.intersection:
      method = 'intersection';
      break;
  }

  testSet.forEach( item => {
    const set1 = new Csset(item.sel1);
    const set2 = new Csset(item.sel2);
    const result = `${set1} ${operation} ${set2} => ${set1[method](set2)}`;
    const expected = `${set1} ${operation} ${set2} => ${item.expected}`;

    expect(result).toEqual(expected);
  });
}


describe('Csset', () => {

  describe('constructor', () => {
    test('should parse the selector', () => {
      const selectors = [
        '*',
        'div#id.class1.class2[attr1=val1][attr2=val2]',
        'div p > a.active',
        'div > p + span > a#id',
        'div > section p ~ span',
        'div > section p ~ span, div > p',
      ];
    
      selectors.forEach(sel => {
        const set = new Csset(sel);
    
        expect(set).toBeDefined();
      })
    });
  });


  describe('supersetOf', () => {
    describe('without subsets', () => {
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
          }
        ];

        runExpectations(data, operationSymbols.supersetOf);
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
          }
        ];

        runExpectations(data, operationSymbols.supersetOf);
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
          }
        ];
        
      
        runExpectations(data, operationSymbols.supersetOf);
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
      });
    });

    describe('with subsets in 1st selector', () => {
      test('should be superset if one of its subsets is', () => {
        const data = [
          {
            sel1: 'div, a, p, span',
            sel2: 'div > p + span > a#id ~ p',
            expected: true,
          },
          {
            sel1: 'section, span > a ~ p, article, nav.hidden',
            sel2: 'div > p + span > a#id ~ p',
            expected: true,
          },
          {
            sel1: 'div, p, span',
            sel2: 'div > p + span > a',
            expected: false,
          }
        ];

        runExpectations(data, operationSymbols.supersetOf);
      });
    });

    describe('with subsets in 2nd selector', () => {
      test('should be superset if it is for all subsets in 2nd selector', () => {
        const data = [
          {
            sel1: 'div',
            sel2: 'div, div.class1, div#id',
            expected: true,
          },
          {
            sel1: '*',
            sel2: 'section, span > a ~ p, article, nav.hidden',
            expected: true,
          },
          {
            sel1: 'div',
            sel2: 'div, p, span',
            expected: false,
          }
        ];

        runExpectations(data, operationSymbols.supersetOf);
      });
    });

    describe('with subsets in both selectors', () => {
      test('should be superset if it is for all subsets in 2nd selector', () => {
        const data = [
          {
            sel1: '#id, span, .class1',
            sel2: 'span, a.class1, div#id',
            expected: true,
          },
          {
            sel1: '*, div',
            sel2: 'section, span > a ~ p, article, nav.hidden',
            expected: true,
          },
          {
            sel1: 'div, p#id',
            sel2: 'div, p, span',
            expected: false,
          }
        ];

        runExpectations(data, operationSymbols.supersetOf);
      });
    });
  });

  describe('union', () => {
    test('should return one set if is superset of the other', () => {
      const data = [
        {
          sel1: 'div, p, aside, section',
          sel2: 'div, p, section.class',
          expected: 'div,p,aside,section',
        },
        {
          sel1: 'div, p, section.class',
          sel2: 'div, p, aside, section',
          expected: 'div,p,aside,section',
        },
      ];

      runExpectations(data, operationSymbols.union);
    });

    test('should remove rules that are subset of others', () => {
      const data = [
        {
          sel1: 'div, p, aside, section.class',
          sel2: 'div, p#id, span, a, section',
          expected: 'div,p,aside,span,a,section',
        },
      ];

      runExpectations(data, operationSymbols.union);
    });

    test('should do union based on attributes in subsets', () => {
      const data = [
        {
          sel1: 'div, p, section[attr^=val]',
          sel2: 'div, p#id, a, section[attr=value]',
          expected: 'div,p,section[attr^="val"],a',
        },
      ];

      runExpectations(data, operationSymbols.union);
    });
  });

  describe('intersection', () => {
    test('should return one set if is subset of the other', () => {
      const data = [
        {
          sel1: 'div, p, aside, section',
          sel2: 'div, p, section.class',
          expected: 'div,p,section.class',
        },
        {
          sel1: 'a, section.class',
          sel2: 'div > p, a, section',
          expected: 'a,section.class',
        },
      ];

      runExpectations(data, operationSymbols.intersection);
    });

    test('should return intersections between two sets', () => {
      const data = [
        {
          sel1: 'div, p.class, aside, section',
          sel2: 'div.class, p, section.class',
          expected: 'div.class,p.class,section.class',
        },
        {
          sel1: 'section[attr], aside, div, a',
          sel2: 'section, aside, div[attr], span , a[attr]',
          expected: 'section[attr],aside,div[attr],a[attr]',
        },
      ];

      runExpectations(data, operationSymbols.intersection);
    });

    test('should return undefined if there is no intersection', () => {
      const data = [
        {
          sel1: 'div, p, aside, section',
          sel2: 'span, a, quote',
          expected: 'undefined',
        },
        {
          sel1: 'div[attr=a], p, aside, section',
          sel2: 'div[attr=b], span, a, quote',
          expected: 'undefined',
        },
      ];

      runExpectations(data, operationSymbols.intersection);
    });
  })
});
