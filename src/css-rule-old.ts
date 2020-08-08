import {
  CssToken,
  CssAttribute,
  CssTokeType,
  CssMatcherSymbol
} from './types';

const CSS_TOKEN_MATCHERS = [
  { rx:/^[^\.\[#]+/  , type: CssTokeType.Element },
  { rx:/^#[^\.\[#]+/ , type: CssTokeType.Id },
  { rx:/^\.[^\[\.#]+/, type: CssTokeType.Class },
  { rx:/^\[[^\]]+\]/ , type: CssTokeType.Attribute },
];


export class CssRuleOld {
  selector: string;
  id      : string;
  element : string;
  classes : Set<string>;
  attribs : Map<string, CssAttribute>;

  constructor (selector: string) {
    this.parse(selector);
  }

  equals ( rule: CssRule ): boolean {
    return `${this}` === `${rule}`;
  }

  contains ( rule: CssRule ): boolean {
    // Element
    if (this.element !== '*' && this.element !== rule.element) {
      return false;
    }

    // ID
    if (this.id && this.id !== rule.id) {
      return false;
    }

    // classes
    for (let c of this.classes) {
      if (!rule.classes.has(c)) {
        return false;
      }
    }

    // Attributes
    // TODO: check with values for different matchers

    return true;
  }

  toString(): string {
    const classes = Array.from(this.classes).sort();
    const attribs = Array.from(this.attribs.keys()).sort().map(n => this.attribs.get(n)) as CssAttribute[];

    const strClasses = classes.map(n => `.${n}`);
    const strAttribs = attribs.map(a => `[${a.name}${a.matcher ? a.matcher + '="' + a.value + '"': ''}]`)

    return `${this.element}${this.id}${strClasses.join('')}${strAttribs.join('')}`;
  }

  private parse ( selector: string ) {
    if (!selector) {
      throw SyntaxError(`Selector cannot be empty.`);
    }

    this.selector = '';
    this.attribs  = new Map();
    this.classes  = new Set();

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
      this.selector += token.value;

      let next = this.extractToken(rest);
      token = next[0];
      rest  = next[1];
    }

    if (!this.selector) {
      throw SyntaxError(`Selector ${selector} cannot be parsed.`);
    }
  }

  private setId( id: string ) {
    if (this.id) {
      throw SyntaxError(`Identifier already se to ${this.id}.`)
    }
    this.id = id;
  }

  private setElement ( elem: string ) {
    if(this.attribs.size) {
      throw SyntaxError(`Elements cannot be defined after attributes.`);
    }
    this.element = elem;
  }

  private addClass ( clazz: string ) {
    const classRegex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
    const className  = clazz.slice(1);

    if (!classRegex.test(className)) {
      throw new SyntaxError(`Invalid class name ${className}`);
    }

    this.classes.add(className);
  }

  private addAttribute ( attr: string ) {
    const attribNext = this.getAttributeValue(attr);
    const attribKey  = `${attribNext.name}${attribNext.matcher}`;
    const attribCurr = this.attribs.get(attribKey) as CssAttribute;

    if (attribCurr) {
      const nextVal = `${attribNext.value}`;
      const currVal = `${attribCurr.value}`;

      switch (attribCurr.matcher) {
        case CssMatcherSymbol.Presence:
        case CssMatcherSymbol.Equal:
          if ( nextVal !== currVal) {
            throw SyntaxError(`Attribute ${attribNext.name} cannot equal to ${nextVal} and ${currVal} at the same time`);
          }
          break;
        case CssMatcherSymbol.Prefix:
          let mergedPref = nextVal.startsWith(currVal) ? nextVal : currVal.startsWith(nextVal) ? currVal : null;

          if (!mergedPref) {
            throw SyntaxError(`Attribute ${attribNext.name} cannot start with ${nextVal} and ${currVal} at the same time`);
          }
          attribNext.value = mergedPref;
          break;
        case CssMatcherSymbol.Suffix:
          let mergedSuff = nextVal.endsWith(currVal) ? nextVal : currVal.endsWith(nextVal) ? currVal : null;

          if (!mergedSuff) {
            throw SyntaxError(`Attribute ${attribNext.name} cannot end with ${nextVal} and ${currVal} at the same time`);
          }
          attribNext.value = mergedSuff;
          break;
        case CssMatcherSymbol.Subcode:
            if ( nextVal !== currVal) {
              throw SyntaxError(`Attribute ${attribNext.name} cannot have ${nextVal} and ${currVal} as subcode at the same time`);
            }
            break;
        case CssMatcherSymbol.Contains:
        case CssMatcherSymbol.Occurrence:
          // TODO: here an attr may contain both values or have different occurrences
          // now doing nothing the value is replaced
        default:
      }
    }

    this.attribs.set(attribKey, attribNext);
  }

  private getAttributeValue ( attr: string ): CssAttribute {
    const parts   = attr.slice(1,-1).split('=');
    const nameRx  = /^[^\t\n\f \/>"'=]+$/;
    const matchRx = /[\^\$~\|\*]/;
    const valueRx = /^('|")[^'"]+\1$|^[^'"]+$/;
    const matchEx = matchRx.exec(parts[0]);

    let name    = matchEx ? parts[0].slice(0, -1) : parts[0];
    let value   = parts[1] || '';
    let matcher = ((matchEx && matchEx[0]) || (value ? '=' : '')) as CssMatcherSymbol;

    if (!nameRx.test(name)) {
      throw new SyntaxError(`Invalid atrribute name in ${attr}`);
    }
    if (matcher !== CssMatcherSymbol.Presence && !valueRx.test(value)) {
      throw new SyntaxError(`Invalid atrribute value in ${attr}`);
    }

    value = value.replace(/^["']|["']$/g, '');

    return { name, matcher, value };
  }

  private extractToken ( selector: string ): [CssToken, string] {
    const matcher = CSS_TOKEN_MATCHERS.find((t) => t.rx.test(selector));
    let execArray: RegExpExecArray | null | undefined;
    let token    : CssToken;
    let rest     : string;

    token     = { type: CssTokeType.Void, value: '' };
    rest      = selector;
    execArray = matcher && matcher.rx.exec(selector);

    if (matcher && execArray) {
      token = { type: matcher.type, value: execArray[0] };
      rest  = selector.replace(execArray[0], '');
    }

    return [token, rest];
  }
}