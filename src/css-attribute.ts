import { CssAttributeMatcher } from './types';

const matchers = '^$~|*'.split('');

export class CssAttribute {
  name   : string;
  matcher: CssAttributeMatcher;
  value  : string;

  constructor ( attr: string ) {
    const parts   = attr.slice(1,-1).split('=');
    const nameRx  = /^[^\t\n\f \/>"'=]+$/;
    const matchRx = /[\^\$~\|\*]/;
    const valueRx = /^('|")[^'"]+\1$|^[^'"]+$/;
    const matchEx = matchRx.exec(parts[0]);

    let name    = matchEx ? parts[0].slice(0, -1) : parts[0];
    let value   = parts[1] || '';
    let matcher = ((matchEx && matchEx[0]) || (value ? '=' : '')) as CssAttributeMatcher;

    if (!nameRx.test(name)) {
      throw new SyntaxError(`Invalid atrribute name in ${attr}`);
    }
    if (matcher !== CssAttributeMatcher.Presence && !valueRx.test(value)) {
      throw new SyntaxError(`Invalid atrribute value in ${attr}`);
    }

    value = value.replace(/^["']|["']$/g, '');

    this.name    = name;
    this.matcher = matcher;
    this.value   = value;
  }

  contains ( attr: CssAttribute ): boolean {
    if (
      this.name !== attr.name ||
      this.matcher !== attr.matcher ||
      this.value.length > attr.value.length
    ) {
      return false;
    }

    if (
      this.matcher === CssAttributeMatcher.Prefix ||
      this.matcher === CssAttributeMatcher.Subcode
    ) {
      return attr.value.startsWith(this.value);
    }

    if ( this.matcher === CssAttributeMatcher.Suffix ) {
      return attr.value.endsWith(this.value);
    }

    // Remaining case is equal or occurence matchers
    return attr.value === this.value;
  }

  toString(): string {
    if (this.matcher === CssAttributeMatcher.Presence) {
      return `[${this.name}]`;
    }
    return  `[${this.name}${this.matcher.replace('=', '')}="${this.value}"]`;
  }
}