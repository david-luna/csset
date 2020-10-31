import { Csset } from './csset';
import { operationSymbols } from '../test/utils';

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

        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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

        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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
        
      
        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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
        
      
        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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
        
      
        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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
        
      
        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
      });

      test('should compare properly with edge cases combinators', () => {
        console.log('should compare properly with edge cases combinators');
        
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
        
      
        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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

        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
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

        data.forEach( d => {
          const set1 = new Csset(d.sel1);
          const set2 = new Csset(d.sel2);
          const result = `${set1} ${operationSymbols.supersetOf} ${set2} => ${set1.supersetOf(set2)}`;
          const expected = `${set1} ${operationSymbols.supersetOf} ${set2} => ${d.expected}`;
  
          expect(result).toEqual(expected);
        })
      });
    });
  });
});
