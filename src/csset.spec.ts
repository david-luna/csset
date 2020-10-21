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
    });
  });
});
