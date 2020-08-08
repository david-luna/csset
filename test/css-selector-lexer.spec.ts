import { CssSelectorLexer } from "../src/css-selector-lexer";
import { CssToken, CssTokenType } from "../src/types";


const tokenize = (selector: string): CssToken[] => {
  const lexer = new CssSelectorLexer(selector);
  const tokens: CssToken[] = [];
  let token;

  while (token = lexer.nextToken()) {
    tokens.push(token);
  }

  return tokens;
};

describe('tokenization', () => {
  test('should work for element selectors', () => {
    expect(tokenize('div')).toEqual([
      {
        type    : CssTokenType.Element,
        values  : ['div'],
        position: 0,
        length  : 3,
      }
    ]);

    expect(tokenize('custom-element')).toEqual([
      {
        type    : CssTokenType.Element,
        values  : ['custom-element'],
        position: 0,
        length  : 14,
      }
    ]);

    expect(tokenize('*')).toEqual([
      {
        type    : CssTokenType.Element,
        values  : ['*'],
        position: 0,
        length  : 1,
      }
    ]);
  });

  test('should work for ID selectors', () => {
    expect(tokenize('#my-id')).toEqual([
      {
        type    : CssTokenType.Id,
        values  : ['my-id'],
        position: 0,
        length  : 6,
      }
    ]);
  });

  test('should work for class selectors', () => {
    expect(tokenize('.myClass')).toEqual([
      {
        type    : CssTokenType.Class,
        values  : ['myClass'],
        position: 0,
        length  : 8,
      }
    ]);
  });

  test('should work for attribute selectors', () => {
    expect(tokenize('[attr]')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr'],
        position: 0,
        length  : 6,
      }
    ]);

    expect(tokenize('[attr=value]')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr', '=', 'value'],
        position: 0,
        length  : 12,
      }
    ]);

    expect(tokenize('[attr="value"]')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr', '=', '"value"'],
        position: 0,
        length  : 14,
      }
    ]);

    expect(tokenize('[attr=\'value\']')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr', '=', '\'value\''],
        position: 0,
        length  : 14,
      }
    ]);

    expect(tokenize('[attr^=value]')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr', '^=', 'value'],
        position: 0,
        length  : 13,
      }
    ]);

    expect(tokenize('[attr$=value]')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr', '$=', 'value'],
        position: 0,
        length  : 13,
      }
    ]);

    expect(tokenize('[attr*=value]')).toEqual([
      {
        type    : CssTokenType.Attribute,
        values  : ['attr', '*=', 'value'],
        position: 0,
        length  : 13,
      }
    ]);
  });

  test('should work for a combination of all', () => {
    const selector = `a#linkId.linkClass1.link-Class2[attr1='v1']._linkClass3[attr2="v2"]`;

    expect(tokenize(selector)).toEqual([
      {
        type    : CssTokenType.Element,
        values  : ['a'],
        position: 0,
        length  : 1,
      },
      {
        type    : CssTokenType.Id,
        values  : ['linkId'],
        position: 1,
        length  : 7,
      },
      {
        type    : CssTokenType.Class,
        values  : ['linkClass1'],
        position: 8,
        length  : 11,
      },
      {
        type    : CssTokenType.Class,
        values  : ['link-Class2'],
        position: 19,
        length  : 12,
      },
      {
        type    : CssTokenType.Attribute,
        values  : ['attr1', '=', '\'v1\''],
        position: 31,
        length  : 12,
      },
      {
        type    : CssTokenType.Class,
        values  : ['_linkClass3'],
        position: 43,
        length  : 12,
      },
      {
        type    : CssTokenType.Attribute,
        values  : ['attr2', '=', '"v2"'],
        position: 55,
        length  : 12,
      },
    ]);
  });

  test('should work with spaces and combinators', () => {
    const selector = `section > div h1 + p  >  span ~ a`;

    expect(tokenize(selector)).toEqual([
      {
        type    : CssTokenType.Element,
        values  : ['section'],
        position: 0,
        length  : 7,
      },
      {
        type    : CssTokenType.Combinator,
        values  : ['>'],
        position: 7,
        length  : 3,
      },
      {
        type    : CssTokenType.Element,
        values  : ['div'],
        position: 10,
        length  : 3,
      },
      {
        type    : CssTokenType.Space,
        values  : [' '],
        position: 13,
        length  : 1,
      },
      {
        type    : CssTokenType.Element,
        values  : ['h1'],
        position: 14,
        length  : 2,
      },
      {
        type    : CssTokenType.Combinator,
        values  : ['+'],
        position: 16,
        length  : 3,
      },
      {
        type    : CssTokenType.Element,
        values  : ['p'],
        position: 19,
        length  : 1,
      },
      {
        type    : CssTokenType.Combinator,
        values  : ['>'],
        position: 20,
        length  : 5,
      },
      {
        type    : CssTokenType.Element,
        values  : ['span'],
        position: 25,
        length  : 4,
      },
      {
        type    : CssTokenType.Combinator,
        values  : ['~'],
        position: 29,
        length  : 3,
      },
      {
        type    : CssTokenType.Element,
        values  : ['a'],
        position: 32,
        length  : 1,
      },
    ]);
  });
});