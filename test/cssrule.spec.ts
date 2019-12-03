import { CssRule } from '../src/cssrule';
import { CssAttribute, CssAttributeMatcher } from '../src/types';

describe('constructor', () => {
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
    ];
  
    badSelectors.forEach((sel) => {
      expect(() => new CssRule(sel)).toThrow(SyntaxError)
      
    });
  });
  
  test('should create the instance when the selector is wrong', () => {
    const selector = `elem#id.class1[attr1*="value1"].class2[attr2$='value2suff'][attr2^='value2pref']`;
    const cssrule = new CssRule(selector);
    const attribs = cssrule.attributes;
    const classes = cssrule.classes;
    const attr1 = attribs.get('attr1');
    const attr2 = attribs.get('attr2');

    console.log(attr2);
    
  
    expect(cssrule.id).toEqual('#id');
    expect(classes.has('class1')).toBeTruthy();
    expect(classes.has('class2')).toBeTruthy();
    expect(attribs.has('attr1')).toBeTruthy();
    expect(attribs.has('attr2')).toBeTruthy();
    expect(attr1).toEqual(new Set([{
      name   : 'attr1',
      matcher: CssAttributeMatcher.Contains,
      value  : 'value1'
    }]));
    expect(attr2).toEqual(new Set([
      {
        name   : 'attr2',
        matcher: CssAttributeMatcher.Suffix,
        value  : 'value2suff'
      },
      {
        name   : 'attr2',
        matcher: CssAttributeMatcher.Prefix,
        value  : 'value2pref'
      }
    ]));
  })
});


