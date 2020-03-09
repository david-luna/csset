import { CssAttribute } from "../src/css-attribute";
import { CssMatcherSymbol } from "../src/types";
import { attrFromArray } from "./test-utils";

type ExpectDataset = { attr1: string, attr2: string, expected: string | boolean };
type AttrOperation = 'includes' | 'union' | 'intersection';

const operationSimbols = {
  includes    : "\u2283",
  union       : "\u222A",
  intersection: "\u2229",
};

// const checkResults = (dataset: ExpectDataset[], operation: AttrOperation): void => {
//   dataset.forEach((data) => {
//     const simbol  = operationSimbols[operation]
//     const attr1   = new CssAttribute(data.attr1);
//     const attr2   = new CssAttribute(data.attr2);
//     const result1 = attr1[operation](attr2)
//     const result2 = attr2[operation](attr1)
//     const result  = `${attr1} ${simbol} ${attr2} = ${result1}`;
//     const message = `${attr1} ${simbol} ${attr2} = ${data.expected}`;
    
//     expect(`${result}`).toEqual(message);
//     if (operation !== 'includes') {
//       expect(`${result1}`).toEqual(`${result2}`);
//     }
//   });
// };


describe('constructor', () => {
  test('should throw SyntaxError when the selector is wrong', () => {
    const selectors = [
      '[attr/value]',
      '[attr="value]',
      '[attr=value"]',
      '[attr=\'value]',
      '[attr=value\']',
    ];
  
    selectors.forEach((sel) => {
      expect(() => new CssAttribute(sel)).toThrow(SyntaxError);
    });
  });

  test('should create the instance when the selector is right', () => {
    const matchers  = ['', '=', '|', '^', '$', '*', '~'] as CssMatcherSymbol[];
    const selectors = [
      '[attr]',
      '[attr=value]' , '[attr=\'value\']' , '[attr="value"]',
      '[attr^=value]', '[attr^=\'value\']', '[attr^="value"]',
      '[attr$=value]', '[attr$=\'value\']', '[attr$="value"]',
      '[attr|=value]', '[attr|=\'value\']', '[attr|="value"]',
      '[attr*=value]', '[attr*=\'value\']', '[attr*="value"]',
      '[attr~=value]', '[attr~=\'value\']', '[attr~="value"]',
    ];
  
    selectors.forEach((sel) => {
      const attr = new CssAttribute(sel);
      const mtch = Array.from(attr.matchers.keys())[0];
      expect(attr.name).toEqual('attr');
      expect(attr.matchers.size).toEqual(1);
      expect(matchers.indexOf(mtch)).not.toEqual(-1);
    });

  });

});


describe('serialisation', () => {
  test('should return the same string in all cases', () => {
    const selectorsEqual = [
      '[attr=value]', '[attr=\'value\']', '[attr="value"]',
    ];
    const selectorsPrefix = [
      '[attr^=value]', '[attr^=\'value\']', '[attr^="value"]',
    ];
  
    selectorsEqual.forEach((sel) => {
      const attr = new CssAttribute(sel);
      expect(`${attr}`).toEqual('[attr="value"]');
    });
    selectorsPrefix.forEach((sel) => {
      const attr = new CssAttribute(sel);
      expect(`${attr}`).toEqual('[attr^="value"]');
    });
  });
});



describe('composition with intersection operation', () => {
  test('should keep matchers if they cannot intersect', () => {
    const dataset = [
      { selectors: ['[attr^=valueA]', '[attr$=valueB]'], expected: '[attr^="valueA"][attr$="valueB"]' },
    ];
  
    dataset.forEach((data) => {
      const attrs  = data.selectors.map(sel => new CssAttribute(sel));
      const result = attrs.reduce((prev: CssAttribute | null, attr: CssAttribute): CssAttribute => {
        return prev ? prev.intersection(attr) : attr;
      }, null);
      expect(`${result}`).toEqual(data.expected);
    });
  });

  test('should merge matchers if they can intersect', () => {
    const dataset = [
      { selectors: ['[attr^=value]', '[attr^=valueA]'], expected: '[attr^="valueA"]' },
      { selectors: ['[attr*=value]', '[attr^=valueA]'], expected: '[attr^="valueA"]' },
      { selectors: ['[attr]'       , '[attr$=valueA]'], expected: '[attr$="valueA"]' },
    ];
    
  
    dataset.forEach((data) => {
      const attrs  = data.selectors.map(sel => new CssAttribute(sel));
      const result = attrs.reduce((prev: CssAttribute | null, attr: CssAttribute): CssAttribute => {
        return prev ? prev.intersection(attr) : attr;
      }, null);
      expect(`${result}`).toEqual(data.expected);
    });
  });
});

describe('supersetOf', () => {
  test('should work with simple matchers', () => {
    const dataset = [
      { attr1: '[attr]'        , attr2: '[attr]'               , expected: true },
      { attr1: '[attr=value]'  , attr2: '[attr=value]'         , expected: true },
      { attr1: '[attr=value]'  , attr2: '[attr=valu€]'         , expected: false },
      { attr1: '[attr^=value]' , attr2: '[attr^=value]'        , expected: true },
      { attr1: '[attr^=value]' , attr2: '[attr^=valuelong]'    , expected: true },
      { attr1: '[attr^=value]' , attr2: '[attr^=wrongvalue]'   , expected: false },
      { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , expected: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , expected: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , expected: false },
      { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , expected: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , expected: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , expected: false },
      { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , expected: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', expected: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , expected: false },
      { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , expected: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', expected: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , expected: false },
      { attr1: '[attr|=value]' , attr2: '[attr|=value]'        , expected: true },
      { attr1: '[attr|=value]' , attr2: '[attr|=valuelong]'    , expected: false },
      { attr1: '[attr|=value]' , attr2: '[attr|=wrongvalue]'   , expected: false },
      { attr1: '[attr~=value]' , attr2: '[attr~=value]'        , expected: true },
      { attr1: '[attr~=value]' , attr2: '[attr~=valu€]'        , expected: false },
      { attr1: '[attr~=value]' , attr2: '[attr~=wrongvalue]'   , expected: false },
    ];

    dataset.map(d => {
      return { ...d, attr1: new CssAttribute(d.attr1), attr2: new CssAttribute(d.attr2) };
    }).forEach(d => {
      const expected = `${d.attr1} \u2283 ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} \u2283 ${d.attr2} <=> ${d.attr1.supersetOf(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });

  test('should work with multiple matchers', () => {
    const dataset = [
      { 
        attr1: ['[attr]', '[attr^=test]'],
        attr2: ['[attr]', '[attr=test]'],
        expected: true
      },
      { 
        attr1: ['[attr$=test]', '[attr^=test]'],
        attr2: ['[attr=test]'],
        expected: true
      },
      { 
        attr1: ['[attr^=test]', '[attr*=value]'],
        attr2: ['[attr=value]'],
        expected: false
      },
    ];

    dataset.map(d => {
      return {
        ...d,
        attr1: attrFromArray(d.attr1),
        attr2: attrFromArray(d.attr2),
      };
    }).forEach(d => {
      const expected = `${d.attr1} \u2283 ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} \u2283 ${d.attr2} <=> ${d.attr1.supersetOf(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });

  test('should merge matchers if they can intersect', () => {
    const dataset = [
      { selectors: ['[attr^=value]', '[attr^=valueA]'], expected: '[attr^="valueA"]' },
      { selectors: ['[attr*=value]', '[attr^=valueA]'], expected: '[attr^="valueA"]' },
      { selectors: ['[attr]'       , '[attr$=valueA]'], expected: '[attr$="valueA"]' },
    ];
    
  
    dataset.forEach((data) => {
      const attrs  = data.selectors.map(sel => new CssAttribute(sel));
      const result = attrs.reduce((prev: CssAttribute | null, attr: CssAttribute): CssAttribute => {
        return prev ? prev.intersection(attr) : attr;
      }, null);
      expect(`${result}`).toEqual(data.expected);
    });
  });


});
