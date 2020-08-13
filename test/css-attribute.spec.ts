import { CssAttribute } from "../src/css-attribute";
import { intersectionReduce, operationSymbols } from "./test-utils";

const selectorToArray = (s: string): string[] => {
  const matchRx  = /[\*\^\$\|~]=|=/;
  const selector = s.replace(/^\[|\]$/g, '');
  const matcher  = matchRx.exec(selector);
  const params: string[] = [];

  if (matcher) {
    const matchStr = matcher[0];
    const index    = selector.indexOf(matchStr);

    params.push(selector.slice(0, index));
    params.push(matchStr);
    params.push(selector.slice(index + matchStr.length));
  } else {
    params.push(selector);
  }

  return params;
};

const selectorsArrayToCssAttribute = (selectors: string[]): CssAttribute => {
  const attrParams = selectors.map(selectorToArray);
  const attrName = attrParams[0][0];

  return attrParams.reduce((attr, params) => {
    return attr.intersection(new CssAttribute(params)) as CssAttribute;
  }, new CssAttribute([attrName]))
};

describe('serialisation', () => {
  test.only('should return the same string in all cases', () => {
    const dataSet = [
      {
        params  : selectorToArray('[attr=value]'),
        expected: '[attr="value"]',
      },
      {
        params  : selectorToArray('[attr^=value]'),
        expected: '[attr^="value"]',
      },
      {
        params  : selectorToArray('[attr$=value]'),
        expected: '[attr$="value"]',
      },
      {
        params  : selectorToArray('[attr*=value]'),
        expected: '[attr*="value"]',
      },
      {
        params  : selectorToArray('[attr|=value]'),
        expected: '[attr|="value"]',
      },
      {
        params  : selectorToArray('[attr~=value]'),
        expected: '[attr~="value"]',
      },
    ];
    
    dataSet.forEach((data) => {
      const attr = new CssAttribute(data.params);
      expect(`${attr}`).toEqual(data.expected);
    });
  });
});

describe('composition with intersection operation', () => {
  test('should keep matchers if they cannot intersect', () => {
    const dataset = [
      {
        selectors: [
          ['attr','^=', 'valueA'], ['attr','$=', 'valueB'],
        ],
        expected: '[attr$="valueB"][attr^="valueA"]' },
    ];

    dataset.forEach((data) => {
      const attrs  = data.selectors.map(sel => new CssAttribute(sel));
      const result = intersectionReduce(attrs);
      expect(`${result}`).toEqual(data.expected);
    });
  });

  test('should merge matchers if they can intersect', () => {
    const dataset = [
      {
        selectors: [['attr','^=', 'value'], ['attr','^=', 'valueA']],
        expected: '[attr^="valueA"]'
      },
      {
        selectors: [['attr','*=', 'value'], ['attr','^=', 'valueA']],
        expected: '[attr^="valueA"]'
      },
      {
        selectors: [['attr'], ['attr','$=', 'valueA']],
        expected: '[attr$="valueA"]'
      },
    ];

    dataset.forEach((data) => {
      const attrs  = data.selectors.map(sel => new CssAttribute(sel));
      const result = intersectionReduce(attrs);
      expect(`${result}`).toEqual(data.expected);
    });
  });

  test('should return the same string even if selector has different order', () => {
    const onwards   = ['[attr]','[attr^=start]','[attr$=end]','[attr*=contain]'];
    const backwards = onwards.reverse();
    const arrayToAttr = (arr: string[]): CssAttribute => {
      const cssArr = arr.map(selectorToArray).map(a => new CssAttribute(a));
      let cssAttr  = cssArr.reduce((acc, attr) => {
        return acc.intersection(attr) as CssAttribute;
      });

      return cssAttr;
    };

    const cssAttrOnwards   = arrayToAttr(onwards);
    const cssAttrBackwards = arrayToAttr(backwards);

    
    expect(`${cssAttrOnwards}`).toEqual(`${cssAttrBackwards}`);
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
      const params1 = selectorToArray(d.attr1);
      const params2 = selectorToArray(d.attr2);
      
      return { ...d, attr1: new CssAttribute(params1), attr2: new CssAttribute(params2) };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSymbols.supersetOf} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSymbols.supersetOf} ${d.attr2} <=> ${d.attr1.supersetOf(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });

  test('should work with multiple matchers', () => {
    const dataset = [
      {
        attr1: '[attr][attr^=test]',
        attr2: '[attr][attr=test]',
        expected: true
      },
      {
        attr1: '[attr$=test][attr^=test]',
        attr2: '[attr=test]',
        expected: true
      },
      {
        attr1: '[attr^=test][attr*=value]',
        attr2: '[attr=value]',
        expected: false
      },
      {
        attr1: '[attr^=start][attr$=end]',
        attr2: '[attr^=startlong][attr$=longend]',
        expected: true
      },
      {
        attr1: '[attr^=start][attr$=end]',
        attr2: '[attr^=startlong][attr~=occurr][attr$=longend]',
        expected: true
      },
      {
        attr1: '[attr^=start][attr*=contain][attr$=end]',
        attr2: '[attr^=startlong][attr$=longend]',
        expected: false
      },
      {
        attr1: '[attr*=contain]',
        attr2: '[attr^=startcontaintext][attr$=textcontainend]',
        expected: true
      },
    ];

    dataset.map(d => {
      return {
        ...d,
        attr1: new CssAttribute(selectorToArray(d.attr1)),
        attr2: new CssAttribute(selectorToArray(d.attr2)),
      };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSymbols.supersetOf} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSymbols.supersetOf} ${d.attr2} <=> ${d.attr1.supersetOf(d.attr2)}`;

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
      const attrs  = data.selectors.map(sel => new CssAttribute(selectorToArray(sel)));
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
      const params1 = selectorToArray(d.attr1);
      const params2 = selectorToArray(d.attr2);
      
      return { ...d, attr1: new CssAttribute(params1), attr2: new CssAttribute(params2) };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSymbols.union} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSymbols.union} ${d.attr2} <=> ${d.attr1.union(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });

  test('should work with multiple matchers', () => {
    const dataset = [
      {
        attr1: ['[attr]','[attr^=test]'],
        attr2: ['[attr]','[attr=test]'],
        expected: '[attr^="test"]'
      },
      {
        attr1: ['[attr$=test]','[attr^=test]'],
        attr2: ['[attr=test]'],
        expected: '[attr$="test"][attr^="test"]'
      },
      {
        attr1: ['[attr^=test]','[attr*=value]'],
        attr2: ['[attr=value]'],
        expected: 'null'
      },
      {
        attr1: ['[attr^=start]','[attr$=end]'],
        attr2: ['[attr^=startlong]','[attr$=longend]'],
        expected: '[attr$="end"][attr^="start"]'
      },
      {
        attr1: ['[attr^=start]','[attr$=end]'],
        attr2: ['[attr^=startlong]','[attr~=occurr]','[attr$=longend]'],
        expected: '[attr$="end"][attr^="start"]'
      },
      {
        attr1: ['[attr^=start]','[attr*=contain]','[attr$=end]'],
        attr2: ['[attr^=startlong]','[attr$=longend]'],
        expected: 'null'
      },
    ];

    dataset.map(d => {
      return {
        ...d,
        attr1: selectorsArrayToCssAttribute(d.attr1),
        attr2: selectorsArrayToCssAttribute(d.attr2),
        
      };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSymbols.union} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSymbols.union} ${d.attr2} <=> ${d.attr1.union(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });
});

describe('intersection', () => {
  test('should work with simple matchers', () => {
    const dataset = [
      { attr1: '[attr]'        , attr2: '[attr]'       , expected: '[attr]' },
      { attr1: '[attr=value]'  , attr2: '[attr=valu€]' , expected: 'undefined' },
      { attr1: '[attr=value]'  , attr2: '[attr=value]' , expected: '[attr="value"]' },
      { attr1: '[attr=value]'  , attr2: '[attr$=value]', expected: '[attr="value"]' },
    ];

    dataset.map(d => {
      const params1 = selectorToArray(d.attr1);
      const params2 = selectorToArray(d.attr2);
      
      return { ...d, attr1: new CssAttribute(params1), attr2: new CssAttribute(params2) };
    }).forEach(d => {
      const expected = `${d.attr1} ${operationSymbols.union} ${d.attr2} <=> ${d.expected}`;
      const result = `${d.attr1} ${operationSymbols.union} ${d.attr2} <=> ${d.attr1.intersection(d.attr2)}`;

      expect(result).toEqual(expected);
    });
  });

  test('should concat matchers if there is no intersection between them', () => {
    const cssAttr1 = selectorsArrayToCssAttribute(['[attr^=start]','[attr~=occur]']);
    const cssAttr2 = selectorsArrayToCssAttribute(['[attr*=contain]','[attr$=end]']);
    const expected = new CssAttribute(['[attr^=start]','[attr~=occur]','[attr*=contain]','[attr$=end]']);

    expect(`${cssAttr1.intersection(cssAttr2)}`).toEqual(`${expected}`);
  });

  test('should merge matchers if there is intersection between them', () => {
    // TODO: change values
    const cssAttr1 = selectorsArrayToCssAttribute(['[attr^=start]','[attr*=contain]','[attr$=longend]']);
    const cssAttr2 = selectorsArrayToCssAttribute(['[attr^=startlong]','[attr*=xcontainx]','[attr$=end]']);
    const expected = new CssAttribute(['[attr^=startlong]','[attr*=xcontainx]','[attr$=longend]']);

    expect(`${cssAttr1.intersection(cssAttr2)}`).toEqual(`${expected}`);
  });
});
