import { CssToken, AttributeMatcher, CssAttribute, CssTokeType } from './types';

const CSS_TOKEN_MATCHERS = [
  { rx:/^[^\.\[#]+/  , type: CssTokeType.Element },
  { rx:/^#[^\.\[#]+/ , type: CssTokeType.Id },
  { rx:/^\.[^\[\.#]+/, type: CssTokeType.Class },
  { rx:/^\[[^\]]+\]/ , type: CssTokeType.Attribute },
];


export class CssRule {
  private _selector: string;
  private _id      : string;
  private _element : string;
  private _attribs : Map<string, CssAttribute>;
  private _classes : Map<string, boolean>;

  get selector(): string {
    return this._selector;
  }
  get id(): string {
    return this._id;
  }
  get element(): string {
    return this._element;
  }
  get attributes(): Map<string, CssAttribute> {
    return new Map(this._attribs);
  }
  get classes(): Map<string, boolean> {
    return new Map(this._classes);
  }

  constructor (selector: string) {
    if (!selector) {
      throw SyntaxError(`Selector cannot be empty.`);
    }

    this._selector = '';
    this._attribs  = new Map();
    this._classes  = new Map();

    let [token, rest] = this.extractToken(selector);

    while (token.type !== CssTokeType.Void) {
      switch(token.type) {
        case CssTokeType.Id:
          this.setId(token.value);
          break;
        case CssTokeType.Element:
          this.setElement(token.value);
          break;
        case CssTokeType.Class:
          this.addClass(token.value);
          break;
        case CssTokeType.Attribute:
          this.addAttribute(token.value);
          break;
      }

      let next = this.extractToken(rest);
      token = next[0];
      rest  = next[1];
      this._selector += token.value;
    }

    if (!this._selector) {
      throw SyntaxError(`Selector ${selector} cannot be parsed.`);
    }
  }

  private setId(id: string) {
    if (this._id) {
      throw SyntaxError(`Identifier already se to ${this.id}.`)
    }
    this._id = id;
  }

  private setElement(elem: string) {
    if(this._attribs.size) {
      throw SyntaxError(`Elements cannot be defined after attributes.`);
    }
    this._element = elem;
  }

  private addClass(clazz: string) {
    const classRegex = /-?[_a-zA-Z]+[_a-zA-Z0-9-]*/;
    const className  = clazz.slice(1);

    if (!classRegex.test(className)) {
      throw new SyntaxError(`Invalid class name ${className}`);
    }

    this._classes.set(className, true);
  }

  private addAttribute(attr: string) {
    const parts   = attr.slice(1,-1).split('=');
    const nameRx  = /^[^\t\n\f \/>"'=]+$/;
    const matchRx = /[\^\$~\|\*]/;
    const valueRx = /^('|")[^'"]+\1$/;
    const matchEx = matchRx.exec(parts[0]);

    let name    = matchEx ? parts[0].slice(0, -1) : parts[0];
    let matcher = ((matchEx && matchEx[0]) || '') as AttributeMatcher;
    let value   = parts[1] || '';

    if (!nameRx.test(name)) {
      throw new SyntaxError(`Invalid atrribute name ${name}`);
    }
    if (!valueRx.test(value)) {
      throw new SyntaxError(`Invalid atrribute value ${value}`);
    }

    value = value.replace(/^["']|["']$/g, '');

    this._attribs.set(name, { name, matcher, value });
  }

  private extractToken(selector: string): [CssToken, string] {
    const matcher = CSS_TOKEN_MATCHERS.find((t) => t.rx.test(selector));
    let execArray: RegExpExecArray | null | undefined;
    let token: CssToken;
    let rest: string;

    token     = { type: CssTokeType.Void, value: '' };
    rest      = selector;
    execArray = matcher && matcher.rx.exec(selector);

    if (matcher && execArray) {
      token = { type: matcher.type, value: execArray[0] };
      rest  = selector.replace(execArray[0], '');
    }

    console.log(token, rest)
    return [token, rest];
  }
}