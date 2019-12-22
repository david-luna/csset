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
      { attr1: '[attr]'        , attr2: '[attr]'               , includes: true },
      { attr1: '[att]'         , attr2: '[attr]'               , includes: false },
      { attr1: '[attr=value]'  , attr2: '[attr=value]'         , includes: true },
      { attr1: '[attr=value]'  , attr2: '[attr=valu€]'         , includes: false },
      { attr1: '[attr^=value]' , attr2: '[attr^=value]'        , includes: true },
      { attr1: '[attr^=value]' , attr2: '[attr^=valuelong]'    , includes: true },
      { attr1: '[attr^=value]' , attr2: '[attr^=wrongvalue]'   , includes: false },
      { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , includes: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , includes: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , includes: false },
      { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , includes: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , includes: true },
      { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , includes: false },
      { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , includes: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', includes: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , includes: false },
      { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , includes: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', includes: true },
      { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , includes: false },
      { attr1: '[attr|=value]' , attr2: '[attr|=value]'        , includes: true },
      { attr1: '[attr|=value]' , attr2: '[attr|=valuelong]'    , includes: false },
      { attr1: '[attr|=value]' , attr2: '[attr|=wrongvalue]'   , includes: false },
      { attr1: '[attr~=value]' , attr2: '[attr~=value]'        , includes: true },
      { attr1: '[attr~=value]' , attr2: '[attr~=valu€]'        , includes: false },
      { attr1: '[attr~=value]' , attr2: '[attr~=wrongvalue]'   , includes: false },
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('presence type should work with other types', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr]'       , includes: true },
      { attr1: '[attr]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr]', attr2: '[attr^=value]', includes: true },
      { attr1: '[attr]', attr2: '[attr$=value]', includes: true },
      { attr1: '[attr]', attr2: '[attr*=value]', includes: true },
      { attr1: '[attr]', attr2: '[attr~=value]', includes: true },
      { attr1: '[attr]', attr2: '[attr|=value]', includes: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('equals type should work with other types', () => {
    const dataset = [
      { attr1: '[attr=value]', attr2: '[attr]'       , includes: false },
      { attr1: '[attr=value]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr=value]', attr2: '[attr^=value]', includes: false },
      { attr1: '[attr=value]', attr2: '[attr$=value]', includes: false },
      { attr1: '[attr=value]', attr2: '[attr*=value]', includes: false },
      { attr1: '[attr=value]', attr2: '[attr~=value]', includes: false },
      { attr1: '[attr=value]', attr2: '[attr|=value]', includes: false },
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('prefix type should work with other types', () => {
    const dataset = [
      { attr1: '[attr^=value]', attr2: '[attr]'       , includes: false },
      { attr1: '[attr^=value]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr^=value]', attr2: '[attr^=value]', includes: true },
      { attr1: '[attr^=value]', attr2: '[attr$=value]', includes: false },
      { attr1: '[attr^=value]', attr2: '[attr*=value]', includes: false },
      { attr1: '[attr^=value]', attr2: '[attr~=value]', includes: false },
      { attr1: '[attr^=value]', attr2: '[attr|=value]', includes: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('suffix type should work with other types', () => {
    const dataset = [
      { attr1: '[attr$=value]', attr2: '[attr]'       , includes: false },
      { attr1: '[attr$=value]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr$=value]', attr2: '[attr^=value]', includes: false },
      { attr1: '[attr$=value]', attr2: '[attr$=value]', includes: true },
      { attr1: '[attr$=value]', attr2: '[attr*=value]', includes: false },
      { attr1: '[attr$=value]', attr2: '[attr~=value]', includes: false },
      { attr1: '[attr$=value]', attr2: '[attr|=value]', includes: false },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('contains type should work with other types', () => {
    const dataset = [
      { attr1: '[attr*=value]', attr2: '[attr]'       , includes: false },
      { attr1: '[attr*=value]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr*=value]', attr2: '[attr^=value]', includes: true },
      { attr1: '[attr*=value]', attr2: '[attr$=value]', includes: true },
      { attr1: '[attr*=value]', attr2: '[attr*=value]', includes: true },
      { attr1: '[attr*=value]', attr2: '[attr~=value]', includes: true },
      { attr1: '[attr*=value]', attr2: '[attr|=value]', includes: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('ocurrence type should work with other types', () => {
    const dataset = [
      { attr1: '[attr~=value]', attr2: '[attr]'       , includes: false },
      { attr1: '[attr~=value]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr~=value]', attr2: '[attr^=value]', includes: false },
      { attr1: '[attr~=value]', attr2: '[attr$=value]', includes: false },
      { attr1: '[attr~=value]', attr2: '[attr*=value]', includes: false },
      { attr1: '[attr~=value]', attr2: '[attr~=value]', includes: true },
      { attr1: '[attr~=value]', attr2: '[attr|=value]', includes: false },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });

  test('subcode type should work with other types', () => {
    const dataset = [
      { attr1: '[attr|=value]', attr2: '[attr]'       , includes: false },
      { attr1: '[attr|=value]', attr2: '[attr=value]' , includes: true },
      { attr1: '[attr|=value]', attr2: '[attr^=value]', includes: true },
      { attr1: '[attr|=value]', attr2: '[attr$=value]', includes: false },
      { attr1: '[attr|=value]', attr2: '[attr*=value]', includes: false },
      { attr1: '[attr|=value]', attr2: '[attr~=value]', includes: false },
      { attr1: '[attr|=value]', attr2: '[attr|=value]', includes: true },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const message  = `${attr1} contains ${attr2} ? ${attr1.includes(attr2)}`;
      const expected = `${attr1} contains ${attr2} ? ${data.includes}`;
      expect(message).toEqual(expected);
    });
  });
});

describe('union', ()=>{
  test('should return the union regardles of the order', () => {
    const dataset = [
      { attr1: '[attr]', attr2: '[attr=value]'  , union: '[attr]' },
      { attr1: '[attr]', attr2: '[attr^=value]' , union: '[attr]' },
      { attr1: '[attr]', attr2: '[attr$=value]' , union: '[attr]' },
      { attr1: '[attr]', attr2: '[attr*=value]' , union: '[attr]' },
      { attr1: '[attr]', attr2: '[attr|=value]' , union: '[attr]' },
      { attr1: '[attr]', attr2: '[attr~=value]' , union: '[attr]' },
      { attr1: '[attr=value]', attr2: '[attr=value]'  , union: '[attr="value"]' },
      { attr1: '[attr=value]', attr2: '[attr^=value]'  , union: '[attr^="value"]' },
      { attr1: '[attr=value]', attr2: '[attr$=value]'  , union: '[attr$="value"]' },
      { attr1: '[attr=value]', attr2: '[attr*=value]'  , union: '[attr*="value"]' },
      { attr1: '[attr=value]', attr2: '[attr|=value]'  , union: '[attr|="value"]' },
      { attr1: '[attr=value]', attr2: '[attr~=value]'  , union: '[attr~="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr^=value]'  , union: '[attr^="value"]' },
      { attr1: '[attr^=value]', attr2: '[attr^=value]'  , union: '[attr^="value"]' },
      
    ];

    dataset.forEach((data) => {
      const attr1    = new CssAttribute(data.attr1);
      const attr2    = new CssAttribute(data.attr2);
      const union1   = attr1.union(attr2)
      const union2   = attr2.union(attr1)
      const equals   = `${union1}` === `${union2}`;
      const message  = `${attr1} U ${attr2} === ${attr2} U ${attr1} => ${equals} (${union1})`;
      const expected = `${attr1} U ${attr2} === ${attr2} U ${attr1} => true (${data.union})`;
      expect(message).toEqual(expected);
    });
  });
})
