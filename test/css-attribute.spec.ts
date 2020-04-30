import { CssAttribute } from "../src/css-attribute";
import { CssMatcherSymbol } from "../src/types";
import { attrFromArray, intersectionReduce } from "./test-utils";

type ExpectDataset = { attr1: string, attr2: string, expected: string | boolean };
type AttrOperation = 'includes' | 'union' | 'intersection';

const operationSimbols = {
  supersetOf  : "\u2283",
  union       : "\u222A",
  intersection: "\u2229",
};

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
      expect(attr.name).toEqual('attr');
      expect(attr.matchers.length).toEqual(1);
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
      const result = intersectionReduce(attrs);
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
      const result = intersectionReduce(attrs);
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
      const expected = `${d.attr1} ${operationSimbols.supersetOf} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSimbols.supersetOf} ${d.attr2} <=> ${d.attr1.supersetOf(d.attr2)}`;

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
      {
        attr1: ['[attr^=start]', '[attr$=end]'],
        attr2: ['[attr^=startlong]', '[attr$=longend]'],
        expected: true
      },
      {
        attr1: ['[attr^=start]', '[attr$=end]'],
        attr2: ['[attr^=startlong]', '[attr~=occurr]', '[attr$=longend]'],
        expected: true
      },
      {
        attr1: ['[attr^=start]', '[attr*=contain]', '[attr$=end]'],
        attr2: ['[attr^=startlong]', '[attr$=longend]'],
        expected: false
      },
      {
        attr1: ['[attr*=contain]'],
        attr2: ['[attr^=startcontaintext]', '[attr$=textcontainend]'],
        expected: true
      },
    ];

    dataset.map(d => {
      return {
        ...d,
        attr1: attrFromArray(d.attr1),
        attr2: attrFromArray(d.attr2),
      };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSimbols.supersetOf} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSimbols.supersetOf} ${d.attr2} <=> ${d.attr1.supersetOf(d.attr2)}`;

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
      const result = intersectionReduce(attrs);
      expect(`${result}`).toEqual(data.expected);
    });
  });
});

describe('union', () => {
  test('should work with simple matchers', () => {
    const dataset = [
      { attr1: '[attr]'        , attr2: '[attr]'               , expected: '[attr]' },
      { attr1: '[attr=value]'  , attr2: '[attr=value]'         , expected: '[attr="value"]' },
      { attr1: '[attr=value]'  , attr2: '[attr=valu€]'         , expected: 'null' },
      { attr1: '[attr^=value]' , attr2: '[attr^=value]'        , expected: '[attr^="value"]' },
      { attr1: '[attr^=value]' , attr2: '[attr^=valuelong]'    , expected: '[attr^="value"]' },
      { attr1: '[attr^=value]' , attr2: '[attr^=wrongvalue]'   , expected: 'null' },
      { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , expected: '[attr$="value"]' },
      { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , expected: '[attr$="value"]' },
      { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , expected: 'null' },
      { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , expected: '[attr*="value"]' },
      { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', expected: '[attr*="value"]' },
      { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , expected: 'null' },
      { attr1: '[attr|=value]' , attr2: '[attr|=value]'        , expected: '[attr|="value"]' },
      { attr1: '[attr|=value]' , attr2: '[attr|=valuelong]'    , expected: 'null' },
      { attr1: '[attr|=value]' , attr2: '[attr|=wrongvalue]'   , expected: 'null' },
      { attr1: '[attr~=value]' , attr2: '[attr~=value]'        , expected: '[attr~="value"]' },
      { attr1: '[attr~=value]' , attr2: '[attr~=valu€]'        , expected: 'null' },
      { attr1: '[attr~=value]' , attr2: '[attr~=wrongvalue]'   , expected: 'null' },
    ];

    dataset.map(d => {
      return { ...d, attr1: new CssAttribute(d.attr1), attr2: new CssAttribute(d.attr2) };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSimbols.union} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSimbols.union} ${d.attr2} <=> ${d.attr1.union(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });

  test('should work with multiple matchers', () => {
    const dataset = [
      {
        attr1: ['[attr]', '[attr^=test]'],
        attr2: ['[attr]', '[attr=test]'],
        expected: '[attr^="test"]'
      },
      {
        attr1: ['[attr$=test]', '[attr^=test]'],
        attr2: ['[attr=test]'],
        expected: '[attr$="test"][attr^="test"]'
      },
      {
        attr1: ['[attr^=test]', '[attr*=value]'],
        attr2: ['[attr=value]'],
        expected: 'null'
      },
      {
        attr1: ['[attr^=start]', '[attr$=end]'],
        attr2: ['[attr^=startlong]', '[attr$=longend]'],
        expected: '[attr^="start"][attr$="end"]'
      },
      {
        attr1: ['[attr^=start]', '[attr$=end]'],
        attr2: ['[attr^=startlong]', '[attr~=occurr]', '[attr$=longend]'],
        expected: '[attr^="start"][attr$="end"]'
      },
      {
        attr1: ['[attr^=start]', '[attr*=contain]', '[attr$=end]'],
        attr2: ['[attr^=startlong]', '[attr$=longend]'],
        expected: '[attr^="start"][attr$="end"]'
      },
      // {
      //   attr1: ['[attr*=contain]'],
      //   attr2: ['[attr^=startcontaintext]', '[attr$=textcontainend]'],
      //   expected: true
      // },
    ];

    dataset.map(d => {
      return {
        ...d,
        attr1: attrFromArray(d.attr1),
        attr2: attrFromArray(d.attr2),
      };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSimbols.union} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSimbols.union} ${d.attr2} <=> ${d.attr1.union(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });
});
