import { CssAttribute } from "../src/css-attribute";
import { CssAttributeMatcher } from "../src/types";

describe('constructor', () => {
  test('should throw SyntaxError when the selector is wrong', () => {
    const selectors = [
      '[attr$value]',
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
    const matchers  = ['', '=', '|', '^', '$', '*', '~'] as CssAttributeMatcher[];
    const selectors = [
      '[attr=value]', '[attr=\'value\']', '[attr="value"]',
      '[attr^=value]', '[attr^=\'value\']', '[attr^="value"]',
      '[attr$=value]', '[attr$=\'value\']', '[attr$="value"]',
      '[attr|=value]', '[attr|=\'value\']', '[attr|="value"]',
      '[attr*=value]', '[attr*=\'value\']', '[attr*="value"]',
      '[attr~=value]', '[attr~=\'value\']', '[attr~="value"]',
    ];
  
    selectors.forEach((sel) => {
      const attr = new CssAttribute(sel);
      expect(attr.name).toEqual('attr');
      expect(attr.value).toEqual('value');
      expect(matchers.indexOf(attr.matcher)).not.toEqual(-1);
    });

    expect(new CssAttribute('[attr]')).toEqual({ selector: '[attr]', name: 'attr', matcher: '', value: '' });
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

describe('includes', () => {
  test('should work with the same type', () => {
    const dataset = [
      { attr1: '[attr]'        , attr2: '[attr]'               , expected: true },
      { attr1: '[att]'         , attr2: '[attr]'               , expected: false },
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

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('presence type should work with other types', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr]'       , expected: true },
      { attr1: '[attr]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr]', attr2: '[attr^=value]', expected: true },
      { attr1: '[attr]', attr2: '[attr$=value]', expected: true },
      { attr1: '[attr]', attr2: '[attr*=value]', expected: true },
      { attr1: '[attr]', attr2: '[attr~=value]', expected: true },
      { attr1: '[attr]', attr2: '[attr|=value]', expected: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('equals type should work with other types', () => {
    const dataset = [
      { attr1: '[attr=value]', attr2: '[attr]'       , expected: false },
      { attr1: '[attr=value]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr=value]', attr2: '[attr^=value]', expected: false },
      { attr1: '[attr=value]', attr2: '[attr$=value]', expected: false },
      { attr1: '[attr=value]', attr2: '[attr*=value]', expected: false },
      { attr1: '[attr=value]', attr2: '[attr~=value]', expected: false },
      { attr1: '[attr=value]', attr2: '[attr|=value]', expected: false },
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('prefix type should work with other types', () => {
    const dataset = [
      { attr1: '[attr^=value]', attr2: '[attr]'       , expected: false },
      { attr1: '[attr^=value]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr^=value]', attr2: '[attr^=value]', expected: true },
      { attr1: '[attr^=value]', attr2: '[attr$=value]', expected: false },
      { attr1: '[attr^=value]', attr2: '[attr*=value]', expected: false },
      { attr1: '[attr^=value]', attr2: '[attr~=value]', expected: false },
      { attr1: '[attr^=value]', attr2: '[attr|=value]', expected: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('suffix type should work with other types', () => {
    const dataset = [
      { attr1: '[attr$=value]', attr2: '[attr]'       , expected: false },
      { attr1: '[attr$=value]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr$=value]', attr2: '[attr^=value]', expected: false },
      { attr1: '[attr$=value]', attr2: '[attr$=value]', expected: true },
      { attr1: '[attr$=value]', attr2: '[attr*=value]', expected: false },
      { attr1: '[attr$=value]', attr2: '[attr~=value]', expected: false },
      { attr1: '[attr$=value]', attr2: '[attr|=value]', expected: false },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('contains type should work with other types', () => {
    const dataset = [
      { attr1: '[attr*=value]', attr2: '[attr]'       , expected: false },
      { attr1: '[attr*=value]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr*=value]', attr2: '[attr^=value]', expected: true },
      { attr1: '[attr*=value]', attr2: '[attr$=value]', expected: true },
      { attr1: '[attr*=value]', attr2: '[attr*=value]', expected: true },
      { attr1: '[attr*=value]', attr2: '[attr~=value]', expected: true },
      { attr1: '[attr*=value]', attr2: '[attr|=value]', expected: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('ocurrence type should work with other types', () => {
    const dataset = [
      { attr1: '[attr~=value]', attr2: '[attr]'       , expected: false },
      { attr1: '[attr~=value]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr~=value]', attr2: '[attr^=value]', expected: false },
      { attr1: '[attr~=value]', attr2: '[attr$=value]', expected: false },
      { attr1: '[attr~=value]', attr2: '[attr*=value]', expected: false },
      { attr1: '[attr~=value]', attr2: '[attr~=value]', expected: true },
      { attr1: '[attr~=value]', attr2: '[attr|=value]', expected: false },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });

  test('subcode type should work with other types', () => {
    const dataset = [
      { attr1: '[attr|=value]', attr2: '[attr]'       , expected: false },
      { attr1: '[attr|=value]', attr2: '[attr=value]' , expected: true },
      { attr1: '[attr|=value]', attr2: '[attr^=value]', expected: false },
      { attr1: '[attr|=value]', attr2: '[attr$=value]', expected: false },
      { attr1: '[attr|=value]', attr2: '[attr*=value]', expected: false },
      { attr1: '[attr|=value]', attr2: '[attr~=value]', expected: false },
      { attr1: '[attr|=value]', attr2: '[attr|=value]', expected: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.expected}`;
      expect(message).toEqual(expected);
    });
  });
});

describe('union', () => {
  test('should return the union regardless of the order', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr=value]'  , expected: '[attr]' },
      { attr1: '[attr]', attr2: '[attr^=value]' , expected: '[attr]' },
      { attr1: '[attr]', attr2: '[attr$=value]' , expected: '[attr]' },
      { attr1: '[attr]', attr2: '[attr*=value]' , expected: '[attr]' },
      { attr1: '[attr]', attr2: '[attr|=value]' , expected: '[attr]' },
      { attr1: '[attr]', attr2: '[attr~=value]' , expected: '[attr]' },
      { attr1: '[attr=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr^=value]'  , expected: '[attr^="value"]' },
      { attr1: '[attr=value]', attr2: '[attr$=value]'  , expected: '[attr$="value"]' },
      { attr1: '[attr=value]', attr2: '[attr*=value]'  , expected: '[attr*="value"]' },
      { attr1: '[attr=value]', attr2: '[attr|=value]'  , expected: '[attr|="value"]' },
      { attr1: '[attr=value]', attr2: '[attr~=value]'  , expected: '[attr~="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr^=value]' , expected: '[attr^="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr$=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr|=value]' , expected: '[attr^="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr*=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr|=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr*=value]', attr2: '[attr|=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr*=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr|=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
    ];

    dataset.forEach((data) => {
      const attr1  = new CssAttribute(data.attr1);
      const attr2  = new CssAttribute(data.attr2);
      const union1 = attr1.union(attr2)
      const union2 = attr2.union(attr1)
      const result  = `${attr1} u ${attr2} = ${union1}`;
      const message = `${attr1} u ${attr2} = ${data.expected}`;
      
      expect(`${result}`).toEqual(message);
      expect(`${union1}`).toEqual(`${union2}`);
    });
  });

  test('should return null if the union is not possible', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr2]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr=two]'   , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr^=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr$=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr*=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr|=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr~=two]'  , expected: 'null' },
    ];

    dataset.forEach((data) => {
      const attr1  = new CssAttribute(data.attr1);
      const attr2  = new CssAttribute(data.attr2);
      const union1 = attr1.union(attr2)
      const union2 = attr2.union(attr1)
      const result  = `${attr1} u ${attr2} = ${union1}`;
      const message = `${attr1} u ${attr2} = ${data.expected}`;
      
      expect(`${result}`).toEqual(message);
      expect(`${union1}`).toEqual(`${union2}`);
    });
  });
})


describe('intersection', () => {
  test('should return the intersection regardless of the order', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr=value]'  , expected: '[attr="value"]' },
      { attr1: '[attr]', attr2: '[attr^=value]' , expected: '[attr^="value"]' },
      { attr1: '[attr]', attr2: '[attr$=value]' , expected: '[attr$="value"]' },
      { attr1: '[attr]', attr2: '[attr*=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr]', attr2: '[attr|=value]' , expected: '[attr|="value"]' },
      { attr1: '[attr]', attr2: '[attr~=value]' , expected: '[attr~="value"]' },
      { attr1: '[attr=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr^=value]'  , expected: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr$=value]'  , expected: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr*=value]'  , expected: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr|=value]'  , expected: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr~=value]'  , expected: '[attr="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr^=value]' , expected: '[attr^="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr^=value2]', expected: '[attr^="value2"]' },
      { attr1: '[attr^=value]', attr2: '[attr$=value]' , expected: '[attr="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr|=value]' , expected: '[attr|="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr~=value]' , expected: '[attr="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr$=value]' , expected: '[attr$="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr$=2value]' , expected: '[attr$="2value"]' },
      { attr1: '[attr$=value]', attr2: '[attr*=value]' , expected: '[attr$="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr|=value]' , expected: '[attr="value"]' },
      { attr1: '[attr$=value]', attr2: '[attr~=value]' , expected: '[attr="value"]' },
      { attr1: '[attr*=value]', attr2: '[attr*=value]' , expected: '[attr*="value"]' },
      { attr1: '[attr*=value]', attr2: '[attr*=1value2]', expected: '[attr*="1value2"]' },
      { attr1: '[attr*=value]', attr2: '[attr|=value]' , expected: '[attr|="value"]' },
      { attr1: '[attr*=value]', attr2: '[attr~=value]' , expected: '[attr~="value"]' },
      { attr1: '[attr|=value]', attr2: '[attr|=value]' , expected: '[attr|="value"]' },
      { attr1: '[attr|=value]', attr2: '[attr~=value]' , expected: '[attr="value"]' },
      { attr1: '[attr~=value]', attr2: '[attr~=value]' , expected: '[attr~="value"]' },
    ];

    dataset.forEach((data) => {
      const attr1  = new CssAttribute(data.attr1);
      const attr2  = new CssAttribute(data.attr2);
      const intersection1 = attr1.intersection(attr2)
      const intersection2 = attr2.intersection(attr1)
      const result  = `${attr1} \u2229 ${attr2} = ${intersection1}`;
      const message = `${attr1} \u2229 ${attr2} = ${data.expected}`;
      
      expect(`${result}`).toEqual(message);
      expect(`${intersection1}`).toEqual(`${intersection2}`);
    });
  });

  test.skip('should return null if the intersection is not possible', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr2]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr=two]'   , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr^=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr$=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr*=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr|=two]'  , expected: 'null' },
      { attr1: '[attr=one]', attr2: '[attr~=two]'  , expected: 'null' },
    ];

    dataset.forEach((data) => {
      const attr1  = new CssAttribute(data.attr1);
      const attr2  = new CssAttribute(data.attr2);
      const union1 = attr1.intersection(attr2)
      const union2 = attr2.intersection(attr1)
      expect(`${union1}`).toEqual(data.expected);
      expect(`${union2}`).toEqual(data.expected);
    });
  });
})
