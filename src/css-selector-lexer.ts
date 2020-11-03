// TODO: use lexer & grammar from
// https://www.w3.org/TR/CSS22/grammar.html
// use following tool to work with regex
// https://regex101.com/
// TODO: use this npm lib
// npm install parsel-js
import { CssTokenType, CssToken } from "./types";

const CSS_TOKEN_MATCHERS = [
  {
    type: CssTokenType.Element,
    rx:/^(-?[_a-z][_a-z0-9-]*|\*)/i,
  },
  {
    type: CssTokenType.Id,
    rx:/^#(-?[_a-z][_a-z0-9-]*)/i
  },
  {
    type: CssTokenType.Class,
    rx:/^\.(-?[_a-z][_a-z0-9-]*)/i
  },
  {
    type: CssTokenType.Attribute,
    rx:/^\[(-?[_a-z][_a-z0-9-]*)(?:([\^\$\*\|~]?=)?([_a-z0-9\u0080-\uFFFF]+|"[^"]*"|'[^']*'))?\]/i
  },
  {
    type: CssTokenType.Combinator,
    rx:/^(?:\s*)([~>\+])(?:\s*)/
  },
  {
    type: CssTokenType.Separator,
    rx:/^(?:\s*)(,)(?:\s*)/
  },
  {
    type: CssTokenType.Space,
    rx:/^(\s+)/
  },
];


export class CssSelectorLexer {

  private selector: string;
  private position: number = 0;

  constructor (selector: string) {
    this.selector = selector.trim();
  }

  nextToken(): CssToken | undefined {
    if (this.selector === '') {
      return void 0;
    }

    const sel     = this.selector;
    const pos     = this.position;
    const matcher = CSS_TOKEN_MATCHERS.find((t) => t.rx.test(sel));
    let execArray: RegExpExecArray | null | undefined;

    execArray = matcher && matcher.rx.exec(sel);

    if (matcher && execArray) {
      const [full, ...partials] = execArray;
      this.selector = sel.replace(full, '');
      this.position = pos + full.length;

      return {
        type    : matcher.type,
        values  : this.sanitizeValues(partials),
        position: pos,
        length  : full.length
      };
    }

    // We reached an part where we cannot parse the selector
    this.selector = '';

    return {
      type    : CssTokenType.Unknown,
      values  : [sel],
      position: pos,
      length  : sel.length,
    }
  }

  private sanitizeValues(values: string[]): string[] {
    return values.filter(value => !!value).map(value => {
      const isQuotedString = /^('|")[^'"]+\1$/.test(value);
      
      return isQuotedString ? value.slice(1, -1) : value;
    });
  }
}
