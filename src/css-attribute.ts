import { CssAttributeMatcher } from './types';

export class CssAttribute {
  selector: string;
  name    : string;
  matcher : CssAttributeMatcher;
  value   : string;

  constructor ( sel: string ) {
    const parts   = sel.slice(1,-1).split('=');
    const nameRx  = /^[^\t\n\f \/>"'=]+$/;
    const matchRx = /[\^\$~\|\*]/;
    const valueRx = /^('|")[^'"]+\1$|^[^'"]+$/;
    const matchEx = matchRx.exec(parts[0]);

    let name    = matchEx ? parts[0].slice(0, -1) : parts[0];
    let value   = parts[1] || '';
    let matcher = ((matchEx && matchEx[0]) || (value ? '=' : '')) as CssAttributeMatcher;

    if (!nameRx.test(name)) {
      throw new SyntaxError(`Invalid atrribute name in ${sel}`);
    }
    if (matcher !== CssAttributeMatcher.Presence && !valueRx.test(value)) {
      throw new SyntaxError(`Invalid atrribute value in ${sel}`);
    }

    value = value.replace(/^["']|["']$/g, '');

    this.selector = sel;
    this.name     = name;
    this.matcher  = matcher;
    this.value    = value;
  }

  includes ( attr: CssAttribute ): boolean {
    if ( this.name !== attr.name ) {
      return false;
    }

    switch (this.matcher) {
      case CssAttributeMatcher.Presence:
        return true;
      case CssAttributeMatcher.Equal:
        return this.equalIncludes(attr);
      case CssAttributeMatcher.Prefix:
        return this.prefixIncludes(attr);
      case CssAttributeMatcher.Suffix:
        return this.suffixIncludes(attr);
      case CssAttributeMatcher.Contains:
        return this.containsIncludes(attr);
      case CssAttributeMatcher.Subcode:
        return this.subcodeIncludes(attr);
      case CssAttributeMatcher.Occurrence:
        return this.occurrenceIncludes(attr);
    }
  }

  union ( attr: CssAttribute ): CssAttribute | void {
    if ( this.includes(attr) ) {
      return this;
    }

    if ( attr.includes(this) ) {
      return attr;
    }

    if (
      this.matcher === CssAttributeMatcher.Contains ||
      this.value.indexOf(attr.value) !== -1
    ) {
      return new CssAttribute(`${this.name}*="${attr.value}"`);
    }

    if (
      attr.matcher === CssAttributeMatcher.Contains ||
      attr.value.indexOf(this.value) !== -1
    ) {
      return new CssAttribute(`${attr.name}*="${this.value}"`);
    }

    return void 0;
  }

  toString(): string {
    if (this.matcher === CssAttributeMatcher.Presence) {
      return `[${this.name}]`;
    }
    return  `[${this.name}${this.matcher.replace('=', '')}="${this.value}"]`;
  }

  private equalIncludes ( attr: CssAttribute ): boolean {
    return attr.matcher === CssAttributeMatcher.Equal && this.value === attr.value;
  }

  private prefixIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssAttributeMatcher.Prefix ||
      attr.matcher === CssAttributeMatcher.Subcode ||
      attr.matcher === CssAttributeMatcher.Equal
    ) {
      return attr.value.startsWith(this.value);
    }

    return false;
  }

  private suffixIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssAttributeMatcher.Suffix ||
      attr.matcher === CssAttributeMatcher.Equal
    ) {
      return attr.value.endsWith(this.value);
    }

    return false;
  }

  private containsIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssAttributeMatcher.Prefix ||
      attr.matcher === CssAttributeMatcher.Suffix ||
      attr.matcher === CssAttributeMatcher.Subcode ||
      attr.matcher === CssAttributeMatcher.Occurrence ||
      attr.matcher === CssAttributeMatcher.Contains ||
      attr.matcher === CssAttributeMatcher.Equal
    ) {
      return attr.value.indexOf(this.value) !== -1;
    }

    return false;
  }

  private subcodeIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssAttributeMatcher.Prefix ||
      attr.matcher === CssAttributeMatcher.Subcode ||
      attr.matcher === CssAttributeMatcher.Equal
    ) {
      return attr.value === this.value;
    }

    return false;
  }

  private occurrenceIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssAttributeMatcher.Occurrence ||
      attr.matcher === CssAttributeMatcher.Equal
    ) {
      return attr.value === this.value;
    }

    return false;
  }
}