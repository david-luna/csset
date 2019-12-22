import { CssRule } from '../src/css-rule';
import { CssAttributeMatcher } from '../src/types';

describe.skip('constructor', () => {
  test('should throw SyntaxError when the selector is wrong', () => {
    const badSelectors: string[] = [
      // Empty
      '',
      // ID not unique
      '#id1#id2', 'elem#id1.class#id2',
      // Element misplaced
      '[attr]elem',
      // Attributes with bad syntax
      '[attr$value]', '[attr/value]',
      '[attr="value]', '[attr=value"]', '[attr=\'value]', '[attr=value\']',
      // Classes with bad syntax
      '.=class', '.&class', '.%class', '.class=', '.class&', '.class%',
      // Attributes with incopatible values
      'elem[attr1=value1][attr1=value2]',
      'elem[attr1^=prefix1][attr1^=prefix2]',
      'elem[attr1$=suffix1][attr1$=suffix2]',
      'elem[attr1|=subcode1][attr1|=subcode2]',
    ];
  
    badSelectors.forEach((sel) => {
      expect(() => console.log(new CssRule(sel))).toThrow(SyntaxError);
    });
  });
  
  test('should create the instance when the selector is right', () => {
    const selector = `elem#id.class1[attr1*="value1"].class2[attr2$='value2suff'][attr2^='value2pref']`;
    const cssrule = new CssRule(selector);
    const attribs = cssrule.attributes;
    const classes = cssrule.classes;
    const attr1   = attribs.get('attr1*');
    const attr21  = attribs.get('attr2$');
    const attr22  = attribs.get('attr2^');

    expect(cssrule.id).toEqual('#id');
    expect(classes.has('class1')).toBeTruthy();
    expect(classes.has('class2')).toBeTruthy();
    expect(attribs.has('attr1*')).toBeTruthy();
    expect(attribs.has('attr2$')).toBeTruthy();
    expect(attribs.has('attr2^')).toBeTruthy();
    expect(attr1).toEqual({
      name   : 'attr1',
      matcher: CssAttributeMatcher.Contains,
      value  : 'value1'
    });
    expect(attr21).toEqual({
      name   : 'attr2',
      matcher: CssAttributeMatcher.Suffix,
      value  : 'value2suff'
    });
    expect(attr22).toEqual({
      name   : 'attr2',
      matcher: CssAttributeMatcher.Prefix,
      value  : 'value2pref'
    });
  })
});


describe.skip('serialisation', () => {
  test('should contain the original selector and provide a canonical form', () => {
    const selector = `elem#id.class1[attr1*="value1"].class2[attr2$='value2suff'][attr2^='value2pref']`;
    const expected = `elem#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    const cssrule = new CssRule(selector);
    
    expect(cssrule.selector).toEqual(selector);
    expect(`${cssrule}`).toEqual(expected); 
  })

  test('should merge prefix & suffix different values if they are contained', () => {
    const selector = `elem#id.class1.class2[attr1^="pref"][attr1^='prefix_value'][attr2$="value"][attr2$='suffix_value']`;
    const expected = `elem#id.class1.class2[attr1^="prefix_value"][attr2$="suffix_value"]`;
    const cssrule = new CssRule(selector);
    
    expect(cssrule.selector).toEqual(selector);
    expect(`${cssrule}`).toEqual(expected); 
  })
});

describe.skip('equals', () => {
  test('should be equal regardless of the order', () => {
    const selector1 = `div#id.class1[attr1*="value1"].class2[attr2$='value2suff'][attr2^='value2pref']`;
    const selector2 = `div#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    
    expect(cssrule1.equals(cssrule2)).toBeTruthy();
  })

  test('should be different if different element', () => {
    const selector1 = `div#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    const selector2 = `p#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    
    expect(cssrule1.equals(cssrule2)).toBeFalsy();
  })

  test('should be different if different id', () => {
    const selector1 = `div#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    const selector2 = `div#id2.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    
    expect(cssrule1.equals(cssrule2)).toBeFalsy();
  })

  test('should be different if missing classes', () => {
    const selector1 = `div#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    const selector2 = `div#id.class1[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);

    expect(cssrule1.equals(cssrule2)).toBeFalsy();
  })

  test('should be different if missing attributes', () => {
    const selector1 = `div#id.class1.class2[attr1*="value1"][attr2$="value2suff"][attr2^="value2pref"]`;
    const selector2 = `div#id.class1.class2[attr2$="value2suff"][attr2^="value2pref"]`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);

    expect(cssrule1.equals(cssrule2)).toBeFalsy();
  })
});

describe.skip('contains', () => {
  test('should contain if equal', () => {
    const selector1 = `div#id.class1.class2`;
    const selector2 = `div#id.class1.class2`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should contain if not has id', () => {
    const selector1 = `div.class1.class2`;
    const selector2 = `div#id.class1.class2`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should NOT contain if ID is different', () => {
    const selector1 = `div#id2.class1.class2`;
    const selector2 = `div#id.class1.class2`;
    
    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    
    expect(cssrule1.contains(cssrule2)).toBeFalsy();
  })

  test('should contain if element is *', () => {
    const selector1 = `*#id.class1.class2`;
    const selector2 = `div#id.class1.class2`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should contain if has less classes', () => {
    const selector1 = `div#id.class1`;
    const selector2 = `div#id.class1.class2`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should NOT contain if has more classes', () => {
    const selector1 = `div#id.class1.class2.class3`;
    const selector2 = `div#id.class1.class2`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeFalsy();
  })

  test('should NOT contain if has different classes', () => {
    const selector1 = `div#id.klass1`;
    const selector2 = `div#id.class1.class2`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeFalsy();
  })

  test('should contain if check for the same attribute', () => {
    const selector1 = `div#id.class1[attr]`;
    const selector2 = `div#id.class1[attr]`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should contain if check for less attributes', () => {
    const selector1 = `div#id.class1[attr]`;
    const selector2 = `div#id.class1[attr][attr2]`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should NOT contain if check for different attributes', () => {
    const selector1 = `div#id.class1[attr][attr3]`;
    const selector2 = `div#id.class1[attr][attr2]`;

    const cssrule1 = new CssRule(selector1);
    const cssrule2 = new CssRule(selector2);
    expect(cssrule1.contains(cssrule2)).toBeTruthy();
  })

  test('should contain if check attribute is more generic (presence agains others)', () => {
    const selector1 = `div#id.class1[attr]`;
    const selectors = [
      { sel: `div#id.class1[attr=value]`, res: true },
      { sel: `div#id.class1[attr^=value]`, res: true },
      { sel: `div#id.class1[attr$=value]`, res: true },
      { sel: `div#id.class1[attr*=value]`, res: true },
      { sel: `div#id.class1[attr|=value]`, res: true },
      { sel: `div#id.class1[attr~=value]`, res: true },
    ];

    const cssrule1 = new CssRule(selector1);
    
    selectors.forEach((item) => {
      expect(cssrule1.contains(new CssRule(item.sel))).toEqual(item.res);
    });
  })

  test('attribute prefix should contain only subcode and others with same prefix or longer', () => {
    const selector1 = `div#id.class1[attr^=value]`;
    const selectors = [
      { sel: `div#id.class1[attr]`        , res: false },
      { sel: `div#id.class1[attr=value]`  , res: false },
      { sel: `div#id.class1[attr^=value]` , res: true },
      { sel: `div#id.class1[attr^=value2]`, res: true },
      { sel: `div#id.class1[attr$=value]` , res: false },
      { sel: `div#id.class1[attr*=value]` , res: false },
      { sel: `div#id.class1[attr|=value]` , res: true },
      { sel: `div#id.class1[attr~=value]` , res: false },
    ];

    const cssrule1 = new CssRule(selector1);
    
    selectors.forEach((item) => {
      expect(cssrule1.contains(new CssRule(item.sel))).toEqual(item.res);
    });
  })

  test('attribute suffix mathcher should contain only others with same suffix or longer', () => {
    const selector1 = `div#id.class1[attr$=value]`;
    const selectors = [
      { sel: `div#id.class1[attr]`        , res: false },
      { sel: `div#id.class1[attr=value]`  , res: false },
      { sel: `div#id.class1[attr^=value]` , res: false },
      { sel: `div#id.class1[attr$=value]` , res: true },
      { sel: `div#id.class1[attr$=2value]`, res: true },
      { sel: `div#id.class1[attr*=value]` , res: false },
      { sel: `div#id.class1[attr|=value]` , res: false },
      { sel: `div#id.class1[attr~=value]` , res: false },
    ];

    const cssrule1 = new CssRule(selector1);
    
    selectors.forEach((item) => {
      expect(cssrule1.contains(new CssRule(item.sel))).toEqual(item.res);
    });
  })

  test('attribute contains matcher should contain all others with same value or onger but not presence', () => {
    const selector1 = `div#id.class1[attr*=value]`;
    const selectors = [
      { sel: `div#id.class1[attr]`           , res: false },
      { sel: `div#id.class1[attr=value]`     , res: true },
      { sel: `div#id.class1[attr=valuelong]` , res: true },
      { sel: `div#id.class1[attr^=value]`    , res: true },
      { sel: `div#id.class1[attr^=valuelong]`, res: true },
      { sel: `div#id.class1[attr$=value]`    , res: true },
      { sel: `div#id.class1[attr$=valuelong]`, res: true },
      { sel: `div#id.class1[attr*=value]`    , res: true },
      { sel: `div#id.class1[attr*=valuelong]`, res: true },
      { sel: `div#id.class1[attr|=value]`    , res: true },
      { sel: `div#id.class1[attr|=valuelong]`, res: true },
      { sel: `div#id.class1[attr~=value]`    , res: true },
      { sel: `div#id.class1[attr~=valuelong]`, res: true },
    ];

    const cssrule1 = new CssRule(selector1);
    
    selectors.forEach((item) => {
      expect(cssrule1.contains(new CssRule(item.sel))).toEqual(item.res);
    });
  })

  
});