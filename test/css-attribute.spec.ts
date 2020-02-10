import { CssAttribute } from "../src/css-attribute";
import { CssMatcherSymbol } from "../src/types";

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
      '[attr=value]', '[attr=\'value\']', '[attr="value"]',
      '[attr^=value]', '[attr^=\'value\']', '[attr^="value"]',
      '[attr$=value]', '[attr$=\'value\']', '[attr$="value"]',
      '[attr|=value]', '[attr|=\'value\']', '[attr|="value"]',
      '[attr*=value]', '[attr*=\'value\']', '[attr*="value"]',
      '[attr~=value]', '[attr~=\'value\']', '[attr~="value"]',
    ];
  
    selectors.forEach((sel) => {
      const attr = new CssAttribute(sel);
      const mtch = Array.from (attr.matchers.keys())[0];
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

// describe.skip('includes', () => {
//   const checkIncludesResults = (dataset: ExpectDataset[]) => checkResults(dataset, 'includes');

//   test('should work with the same type', () => {
//     const dataset = [
//       { attr1: '[attr]'        , attr2: '[attr]'               , expected: true },
//       { attr1: '[att]'         , attr2: '[attr]'               , expected: false },
//       { attr1: '[attr=value]'  , attr2: '[attr=value]'         , expected: true },
//       { attr1: '[attr=value]'  , attr2: '[attr=valu€]'         , expected: false },
//       { attr1: '[attr^=value]' , attr2: '[attr^=value]'        , expected: true },
//       { attr1: '[attr^=value]' , attr2: '[attr^=valuelong]'    , expected: true },
//       { attr1: '[attr^=value]' , attr2: '[attr^=wrongvalue]'   , expected: false },
//       { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , expected: true },
//       { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , expected: true },
//       { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , expected: false },
//       { attr1: '[attr$=value]' , attr2: '[attr$=value]'        , expected: true },
//       { attr1: '[attr$=value]' , attr2: '[attr$=longvalue]'    , expected: true },
//       { attr1: '[attr$=value]' , attr2: '[attr$=valuewrong]'   , expected: false },
//       { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , expected: true },
//       { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', expected: true },
//       { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , expected: false },
//       { attr1: '[attr*=value]' , attr2: '[attr*=value]'        , expected: true },
//       { attr1: '[attr*=value]' , attr2: '[attr*=longvaluelong]', expected: true },
//       { attr1: '[attr*=value]' , attr2: '[attr*=valu€]'        , expected: false },
//       { attr1: '[attr|=value]' , attr2: '[attr|=value]'        , expected: true },
//       { attr1: '[attr|=value]' , attr2: '[attr|=valuelong]'    , expected: false },
//       { attr1: '[attr|=value]' , attr2: '[attr|=wrongvalue]'   , expected: false },
//       { attr1: '[attr~=value]' , attr2: '[attr~=value]'        , expected: true },
//       { attr1: '[attr~=value]' , attr2: '[attr~=valu€]'        , expected: false },
//       { attr1: '[attr~=value]' , attr2: '[attr~=wrongvalue]'   , expected: false },
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('presence type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr]', attr2: '[attr]'       , expected: true },
//       { attr1: '[attr]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr]', attr2: '[attr^=value]', expected: true },
//       { attr1: '[attr]', attr2: '[attr$=value]', expected: true },
//       { attr1: '[attr]', attr2: '[attr*=value]', expected: true },
//       { attr1: '[attr]', attr2: '[attr~=value]', expected: true },
//       { attr1: '[attr]', attr2: '[attr|=value]', expected: true },
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('equals type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr=value]', attr2: '[attr]'       , expected: false },
//       { attr1: '[attr=value]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr=value]', attr2: '[attr^=value]', expected: false },
//       { attr1: '[attr=value]', attr2: '[attr$=value]', expected: false },
//       { attr1: '[attr=value]', attr2: '[attr*=value]', expected: false },
//       { attr1: '[attr=value]', attr2: '[attr~=value]', expected: false },
//       { attr1: '[attr=value]', attr2: '[attr|=value]', expected: false },
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('prefix type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr^=value]', attr2: '[attr]'       , expected: false },
//       { attr1: '[attr^=value]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr^=value]', attr2: '[attr^=value]', expected: true },
//       { attr1: '[attr^=value]', attr2: '[attr$=value]', expected: false },
//       { attr1: '[attr^=value]', attr2: '[attr*=value]', expected: false },
//       { attr1: '[attr^=value]', attr2: '[attr~=value]', expected: false },
//       { attr1: '[attr^=value]', attr2: '[attr|=value]', expected: true },
      
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('suffix type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr$=value]', attr2: '[attr]'       , expected: false },
//       { attr1: '[attr$=value]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr$=value]', attr2: '[attr^=value]', expected: false },
//       { attr1: '[attr$=value]', attr2: '[attr$=value]', expected: true },
//       { attr1: '[attr$=value]', attr2: '[attr*=value]', expected: false },
//       { attr1: '[attr$=value]', attr2: '[attr~=value]', expected: false },
//       { attr1: '[attr$=value]', attr2: '[attr|=value]', expected: false },
      
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('contains type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr*=value]', attr2: '[attr]'       , expected: false },
//       { attr1: '[attr*=value]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr*=value]', attr2: '[attr^=value]', expected: true },
//       { attr1: '[attr*=value]', attr2: '[attr$=value]', expected: true },
//       { attr1: '[attr*=value]', attr2: '[attr*=value]', expected: true },
//       { attr1: '[attr*=value]', attr2: '[attr~=value]', expected: true },
//       { attr1: '[attr*=value]', attr2: '[attr|=value]', expected: true },
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('ocurrence type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr~=value]', attr2: '[attr]'       , expected: false },
//       { attr1: '[attr~=value]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr~=value]', attr2: '[attr^=value]', expected: false },
//       { attr1: '[attr~=value]', attr2: '[attr$=value]', expected: false },
//       { attr1: '[attr~=value]', attr2: '[attr*=value]', expected: false },
//       { attr1: '[attr~=value]', attr2: '[attr~=value]', expected: true },
//       { attr1: '[attr~=value]', attr2: '[attr|=value]', expected: false },
//     ];

//     checkIncludesResults(dataset);
//   });

//   test('subcode type should work with other types', () => {
//     const dataset = [
//       { attr1: '[attr|=value]', attr2: '[attr]'       , expected: false },
//       { attr1: '[attr|=value]', attr2: '[attr=value]' , expected: true },
//       { attr1: '[attr|=value]', attr2: '[attr^=value]', expected: false },
//       { attr1: '[attr|=value]', attr2: '[attr$=value]', expected: false },
//       { attr1: '[attr|=value]', attr2: '[attr*=value]', expected: false },
//       { attr1: '[attr|=value]', attr2: '[attr~=value]', expected: false },
//       { attr1: '[attr|=value]', attr2: '[attr|=value]', expected: true },
//     ];

//     checkIncludesResults(dataset);
//   });
// });

// describe.skip('union', () => {
//   const checkUnionResults = (dataset: ExpectDataset[]) => checkResults(dataset, 'union');

//   test('should return the union regardless of the order', () => {
//     const dataset = [
//       { attr1: '[attr]', attr2: '[attr=value]'  , expected: '[attr]' },
//       { attr1: '[attr]', attr2: '[attr^=value]' , expected: '[attr]' },
//       { attr1: '[attr]', attr2: '[attr$=value]' , expected: '[attr]' },
//       { attr1: '[attr]', attr2: '[attr*=value]' , expected: '[attr]' },
//       { attr1: '[attr]', attr2: '[attr|=value]' , expected: '[attr]' },
//       { attr1: '[attr]', attr2: '[attr~=value]' , expected: '[attr]' },
//       { attr1: '[attr=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr^=value]'  , expected: '[attr^="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr$=value]'  , expected: '[attr$="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr*=value]'  , expected: '[attr*="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr|=value]'  , expected: '[attr|="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr~=value]'  , expected: '[attr~="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr^=value]' , expected: '[attr^="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr$=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr|=value]' , expected: '[attr^="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr*=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr|=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr|=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr~=value]' , expected: '[attr*="value"]' },
//     ];

//     checkUnionResults(dataset)
//   });

//   test('should return null if the union is not possible', () => {
//     const dataset = [
//       { attr1: '[attr]', attr2: '[attr2]'  , expected: 'null' },
//       { attr1: '[attr=one]', attr2: '[attr=two]'   , expected: 'null' },
//       { attr1: '[attr=one]', attr2: '[attr^=two]'  , expected: 'null' },
//       { attr1: '[attr=one]', attr2: '[attr$=two]'  , expected: 'null' },
//       { attr1: '[attr=one]', attr2: '[attr*=two]'  , expected: 'null' },
//       { attr1: '[attr=one]', attr2: '[attr|=two]'  , expected: 'null' },
//       { attr1: '[attr=one]', attr2: '[attr~=two]'  , expected: 'null' },
//     ];

//     dataset.forEach((data) => {
//       const attr1  = new CssAttribute(data.attr1);
//       const attr2  = new CssAttribute(data.attr2);
//       const union1 = attr1.union(attr2)
//       const union2 = attr2.union(attr1)
//       const result  = `${attr1} u ${attr2} = ${union1}`;
//       const message = `${attr1} u ${attr2} = ${data.expected}`;
      
//       expect(`${result}`).toEqual(message);
//       expect(`${union1}`).toEqual(`${union2}`);
//     });
//   });
// })

// describe.skip('intersection', () => {
//   const checkIntersectionResults = (dataset: ExpectDataset[]) => checkResults(dataset, 'intersection');

//   test('should do the instersection for presence attribute matcher', () => {
//     const dataset = [
//       { attr1: '[attr]', attr2: '[attr2]'       , expected: 'null' },
//       { attr1: '[attr]', attr2: '[attr=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr]', attr2: '[attr^=value]' , expected: '[attr^="value"]' },
//       { attr1: '[attr]', attr2: '[attr$=value]' , expected: '[attr$="value"]' },
//       { attr1: '[attr]', attr2: '[attr*=value]' , expected: '[attr*="value"]' },
//       { attr1: '[attr]', attr2: '[attr|=value]' , expected: '[attr|="value"]' },
//       { attr1: '[attr]', attr2: '[attr~=value]' , expected: '[attr~="value"]' },
//     ];

//     checkResults(dataset, 'intersection');
//   });

//   test('should do the instersection for equal attribute matcher', () => {
//     const dataset = [
//       // Presence
//       { attr1: '[attr=value]', attr2: '[attr]'         , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attrX]'        , expected: 'null' },
//       // Equals =
//       { attr1: '[attr=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr=XXXXX]'   , expected: 'null' },
//       // Prefix ^
//       { attr1: '[attr=value]', attr2: '[attr^=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr^=valueX]' , expected: 'null' },
//       { attr1: '[attr=value]', attr2: '[attr^=Xvalue]' , expected: 'null' },
//       // Suffix $
//       { attr1: '[attr=value]', attr2: '[attr$=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr$=valueX]' , expected: 'null' },
//       { attr1: '[attr=value]', attr2: '[attr$=Xvalue]' , expected: 'null' },
//       // Contains *
//       { attr1: '[attr=value]', attr2: '[attr*=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr*=valueX]' , expected: 'null' },
//       { attr1: '[attr=value]', attr2: '[attr*=Xvalue]' , expected: 'null' },
//       // Subcode |
//       { attr1: '[attr=value]', attr2: '[attr|=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr|=valueX]' , expected: 'null' },
//       { attr1: '[attr=value]', attr2: '[attr|=Xvalue]' , expected: 'null' },
//       // Occurence ~
//       { attr1: '[attr=value]', attr2: '[attr~=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr=value]', attr2: '[attr~=valueX]' , expected: 'null' },
//       { attr1: '[attr=value]', attr2: '[attr~=Xvalue]' , expected: 'null' },
//     ];

//     checkIntersectionResults(dataset);
//   });

  

//   test('should do the instersection for prefix matcher', () => {
//     const dataset = [
//       // Presence
//       { attr1: '[attr^=value]', attr2: '[attr]'         , expected: '[attr^="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attrX]'        , expected: 'null' },
//       // Equals =
//       { attr1: '[attr^=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr=XXXXX]'   , expected: 'null' },
//       // Prefix ^
//       { attr1: '[attr^=value]', attr2: '[attr^=value]'  , expected: '[attr^="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr^=valueX]' , expected: '[attr^="valueX"]' },
//       { attr1: '[attr^=value]', attr2: '[attr^=Xvalue]' , expected: 'null' },
//       // Suffix $
//       { attr1: '[attr^=value]', attr2: '[attr$=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr$=valueX]' , expected: '[attr="valueX"]' },
//       { attr1: '[attr^=value]', attr2: '[attr$=Xvalue]' , expected: 'null' },
//       // Contains *
//       { attr1: '[attr^=value]', attr2: '[attr*=value]'  , expected: '[attr^="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr*=valueX]' , expected: '[attr^="valueX"]' }, // ???
//       { attr1: '[attr^=value]', attr2: '[attr*=Xvalue]' , expected: 'null' },
//       // Subcode |
//       { attr1: '[attr^=value]', attr2: '[attr|=value]'  , expected: '[attr|="value"]' },
//       { attr1: '[attr^=value]', attr2: '[attr|=valueX]' , expected: '[attr|="valueX"]' }, // ???
//       { attr1: '[attr^=value]', attr2: '[attr|=Xvalue]' , expected: 'null' },
//       // Occurence ~
//       { attr1: '[attr^=value]', attr2: '[attr~=value]'  , expected: '[attr="value"]' },
//       // { attr1: '[attr^=value]', attr2: '[attr~=valueX]' , expected: '[attr="valueX"]' }, // ???
//       { attr1: '[attr^=value]', attr2: '[attr~=Xvalue]' , expected: 'null' },
//     ];

//     checkIntersectionResults(dataset);
//   });

//   test('should do the instersection for suffix matcher', () => {
//     const dataset = [
//       // Presence
//       { attr1: '[attr$=value]', attr2: '[attr]'         , expected: '[attr$="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attrX]'        , expected: 'null' },
//       // Equals =
//       { attr1: '[attr$=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr=XXXXX]'   , expected: 'null' },
//       // Prefix ^
//       { attr1: '[attr$=value]', attr2: '[attr^=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr^=valueX]' , expected: 'null' },
//       // { attr1: '[attr$=value]', attr2: '[attr^=Xvalue]' , expected: '[attr="valueX"]' }, // ???
//       // Suffix $
//       { attr1: '[attr$=value]', attr2: '[attr$=value]'  , expected: '[attr$="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr$=valueX]' , expected: 'null' },
//       { attr1: '[attr$=value]', attr2: '[attr$=Xvalue]' , expected: '[attr$="Xvalue"]' },
//       // Contains *
//       { attr1: '[attr$=value]', attr2: '[attr*=value]'  , expected: '[attr$="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr*=valueX]' , expected: 'null' },
//       // { attr1: '[attr$=value]', attr2: '[attr*=Xvalue]' , expected: '[attr$="Xvalue"]' }, // ???
//       // Subcode |
//       { attr1: '[attr$=value]', attr2: '[attr|=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr|=valueX]' , expected: 'null' },
//       // { attr1: '[attr$=value]', attr2: '[attr|=Xvalue]' , expected: '[attr="Xvalue"]' }, // ???
//       // Occurence ~
//       { attr1: '[attr$=value]', attr2: '[attr~=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr$=value]', attr2: '[attr~=valueX]' , expected: 'null' },
//       // { attr1: '[attr$=value]', attr2: '[attr~=Xvalue]' , expected: '[attr="Xvalue"]' }, // ???
//     ];

//     checkIntersectionResults(dataset);
//   });

//   test('should do the instersection for contains matcher', () => {
//     const dataset = [
//       // Presence
//       { attr1: '[attr*=value]', attr2: '[attr]'         , expected: '[attr*="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attrX]'        , expected: 'null' },
//       // Equals =
//       { attr1: '[attr*=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr=XXXXX]'   , expected: 'null' },
//       // Prefix ^
//       { attr1: '[attr*=value]', attr2: '[attr^=value]'  , expected: '[attr^="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr^=valueX]' , expected: '[attr^="valueX"]' },
//       { attr1: '[attr*=value]', attr2: '[attr^=Xvalue]' , expected: '[attr^="Xvalue"]' },
//       // Suffix $
//       { attr1: '[attr*=value]', attr2: '[attr$=value]'  , expected: '[attr$="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr$=valueX]' , expected: '[attr$="valueX"]' },
//       { attr1: '[attr*=value]', attr2: '[attr$=Xvalue]' , expected: '[attr$="Xvalue"]' },
//       // Contains *
//       { attr1: '[attr*=value]', attr2: '[attr*=value]'  , expected: '[attr*="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr*=valueX]' , expected: '[attr*="valueX"]' },
//       { attr1: '[attr*=value]', attr2: '[attr*=Xvalue]' , expected: '[attr*="Xvalue"]' },
//       // Subcode |
//       { attr1: '[attr*=value]', attr2: '[attr|=value]'  , expected: '[attr|="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr|=valueX]' , expected: '[attr|="valueX"]' },
//       { attr1: '[attr*=value]', attr2: '[attr|=Xvalue]' , expected: '[attr|="Xvalue"]' },
//       // Occurence ~
//       { attr1: '[attr*=value]', attr2: '[attr~=value]'  , expected: '[attr~="value"]' },
//       { attr1: '[attr*=value]', attr2: '[attr~=valueX]' , expected: '[attr~="valueX"]' },
//       { attr1: '[attr*=value]', attr2: '[attr~=Xvalue]' , expected: '[attr~="Xvalue"]' },
//     ];

//     checkIntersectionResults(dataset);
//   });

//   test('should do the instersection for subcode matcher', () => {
//     const dataset = [
//       // Presence
//       { attr1: '[attr|=value]', attr2: '[attr]'         , expected: '[attr|="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attrX]'        , expected: 'null' },
//       // Equals =
//       { attr1: '[attr|=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr=XXXXX]'   , expected: 'null' },
//       // Prefix ^
//       { attr1: '[attr|=value]', attr2: '[attr^=value]'  , expected: '[attr|="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr^=valueX]' , expected: 'null' },
//       { attr1: '[attr|=value]', attr2: '[attr^=Xvalue]' , expected: 'null' },
//       // Suffix $
//       { attr1: '[attr|=value]', attr2: '[attr$=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr$=valueX]' , expected: 'null' },
//       { attr1: '[attr|=value]', attr2: '[attr$=Xvalue]' , expected: 'null' },
//       // Contains *
//       { attr1: '[attr|=value]', attr2: '[attr*=value]'  , expected: '[attr|="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr*=valueX]' , expected: 'null' },
//       { attr1: '[attr|=value]', attr2: '[attr*=Xvalue]' , expected: 'null' },
//       // Subcode |
//       { attr1: '[attr|=value]', attr2: '[attr|=value]'  , expected: '[attr|="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr|=valueX]' , expected: 'null' },
//       { attr1: '[attr|=value]', attr2: '[attr|=Xvalue]' , expected: 'null' },
//       // Occurence ~
//       { attr1: '[attr|=value]', attr2: '[attr~=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr|=value]', attr2: '[attr~=valueX]' , expected: 'null' },
//       { attr1: '[attr|=value]', attr2: '[attr~=Xvalue]' , expected: 'null' },
//     ];

//     checkIntersectionResults(dataset);
//   });

//   test('should do the instersection for occurrence matcher', () => {
//     const dataset = [
//       // Presence
//       { attr1: '[attr~=value]', attr2: '[attr]'         , expected: '[attr~="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attrX]'        , expected: 'null' },
//       // Equals =
//       { attr1: '[attr~=value]', attr2: '[attr=value]'   , expected: '[attr="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attr=XXXXX]'   , expected: 'null' },
//       // Prefix ^
//       { attr1: '[attr~=value]', attr2: '[attr^=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attr^=valueX]' , expected: 'null' },
//       { attr1: '[attr~=value]', attr2: '[attr^=Xvalue]' , expected: 'null' },
//       // Suffix $
//       { attr1: '[attr~=value]', attr2: '[attr$=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attr$=valueX]' , expected: 'null' },
//       { attr1: '[attr~=value]', attr2: '[attr$=Xvalue]' , expected: 'null' },
//       // Contains *
//       { attr1: '[attr~=value]', attr2: '[attr*=value]'  , expected: '[attr~="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attr*=valueX]' , expected: 'null' },
//       { attr1: '[attr~=value]', attr2: '[attr*=Xvalue]' , expected: 'null' },
//       // Subcode |
//       { attr1: '[attr~=value]', attr2: '[attr|=value]'  , expected: '[attr="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attr|=valueX]' , expected: 'null' },
//       { attr1: '[attr~=value]', attr2: '[attr|=Xvalue]' , expected: 'null' },
//       // Occurence ~
//       { attr1: '[attr~=value]', attr2: '[attr~=value]'  , expected: '[attr~="value"]' },
//       { attr1: '[attr~=value]', attr2: '[attr~=valueX]' , expected: 'null' },
//       { attr1: '[attr~=value]', attr2: '[attr~=Xvalue]' , expected: 'null' },
//     ];

//     checkIntersectionResults(dataset);
//   });
// })
