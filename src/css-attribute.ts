import { CssMatcherSymbol } from './types';

const logger = (att1: CssAttribute, att2: CssAttribute) : (...args:any[]) => void => {
  if (att1.matcher === '^' && att2.matcher ==='$') {
    return (...args) => console.log(args);
  }
  // console.log('/dev/null');
  return () => void 0;
};

const sameMatchers = (matchers: CssMatcherSymbol[], expected: CssMatcherSymbol[]) => {
  const sortedMatchers = matchers.sort();
  const sortedExpected = expected.sort();

  return sortedMatchers.reduce((same, matcher, index) => {
    return same && matcher === sortedExpected[index];
  }, true);
};

export class CssAttribute {
  selector: string;
  name    : string;
  matcher : CssMatcherSymbol;
  value   : string;

  constructor ( sel: string ) {
    const parts   = sel.slice(1,-1).split('=');
    const nameRx  = /^[^\t\n\f \/>"'=]+$/;
    const matchRx = /[\^\$~\|\*]/;
    const valueRx = /^('|")[^'"]+\1$|^[^'"]+$/;
    const matchEx = matchRx.exec(parts[0]);

    let name    = matchEx ? parts[0].slice(0, -1) : parts[0];
    let value   = parts[1] || '';
    let matcher = ((matchEx && matchEx[0]) || (value ? '=' : '')) as CssMatcherSymbol;

    if (!nameRx.test(name)) {
      throw new SyntaxError(`Invalid atrribute name in ${sel}`);
    }
    if (matcher !== CssMatcherSymbol.Presence && !valueRx.test(value)) {
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
      case CssMatcherSymbol.Presence:
        return true;
      case CssMatcherSymbol.Equal:
        return this.equalIncludes(attr);
      case CssMatcherSymbol.Prefix:
        return this.prefixIncludes(attr);
      case CssMatcherSymbol.Suffix:
        return this.suffixIncludes(attr);
      case CssMatcherSymbol.Contains:
        return this.containsIncludes(attr);
      case CssMatcherSymbol.Subcode:
        return this.subcodeIncludes(attr);
      case CssMatcherSymbol.Occurrence:
        return this.occurrenceIncludes(attr);
    }
  }

  union ( attr: CssAttribute ): CssAttribute | null {
    if ( this.name !== attr.name ) {
       return null;
    }

    // Sepcial case where each includes the other
    const matchers = [CssMatcherSymbol.Prefix, CssMatcherSymbol.Subcode];
    if (
      this.value === attr.value &&
      matchers.indexOf(this.matcher) !== -1 &&
      matchers.indexOf(attr.matcher) !== -1
    ) {
      return this.matcher === CssMatcherSymbol.Prefix ? this : attr;
    }

    if ( this.includes(attr) ) {
      return this;
    }

    if ( attr.includes(this) ) {
      return attr;
    }

    if ( this.value.indexOf(attr.value) !== -1 ) {
      return new CssAttribute(`[${this.name}*="${attr.value}"]`);
    }

    if ( attr.value.indexOf(this.value) !== -1 ) {
      return new CssAttribute(`[${this.name}*="${this.value}"]`);
    }

    return null;
  }

  intersection ( attr: CssAttribute ): CssAttribute | null {
    if ( this.name !== attr.name ) {
       return null;
    }

    const log = logger(this, attr);

    // Sepcial cases where
    // 1. starting and ending with the same vale
    // 2. starting and occurence with the same vale
    if (
      this.value === attr.value &&
      (
        sameMatchers([this.matcher, attr.matcher], [CssMatcherSymbol.Prefix, CssMatcherSymbol.Suffix]) ||
        sameMatchers([this.matcher, attr.matcher], [CssMatcherSymbol.Prefix, CssMatcherSymbol.Occurrence]) ||
        sameMatchers([this.matcher, attr.matcher], [CssMatcherSymbol.Subcode, CssMatcherSymbol.Suffix]) ||
        sameMatchers([this.matcher, attr.matcher], [CssMatcherSymbol.Suffix, CssMatcherSymbol.Occurrence]) ||
        sameMatchers([this.matcher, attr.matcher], [CssMatcherSymbol.Subcode, CssMatcherSymbol.Occurrence])
      )
    ) {
      return new CssAttribute(`[${this.name}="${this.value}"]`);
    }

    if (
      (attr.value.startsWith(this.value) &&
      this.matcher === CssMatcherSymbol.Prefix &&
      attr.matcher === CssMatcherSymbol.Suffix) ||
      (this.value.startsWith(attr.value) &&
      this.matcher === CssMatcherSymbol.Suffix &&
      attr.matcher === CssMatcherSymbol.Prefix)
    ) {
      const value = this.matcher === CssMatcherSymbol.Prefix ? attr.value : this.value;
      return new CssAttribute(`[${this.name}="${value}"]`);
    }

    if ( this.includes(attr) ) {
      log(`${this} \u2283 ${attr}`);
      return attr;
    }

    if ( attr.includes(this) ) {
      log(`${this} \u2282 ${attr}`);
      return this;
    }

    log(`${this} nothing ${attr}`);

    return null;
  }

  toString(): string {
    if (this.matcher === CssMatcherSymbol.Presence) {
      return `[${this.name}]`;
    }
    return  `[${this.name}${this.matcher.replace('=', '')}="${this.value}"]`;
  }

  private equalIncludes ( attr: CssAttribute ): boolean {
    return attr.matcher === CssMatcherSymbol.Equal && this.value === attr.value;
  }

  private prefixIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssMatcherSymbol.Prefix ||
      attr.matcher === CssMatcherSymbol.Subcode ||
      attr.matcher === CssMatcherSymbol.Equal
    ) {
      return attr.value.startsWith(this.value);
    }

    return false;
  }

  private suffixIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssMatcherSymbol.Suffix ||
      attr.matcher === CssMatcherSymbol.Equal
    ) {
      return attr.value.endsWith(this.value);
    }

    return false;
  }

  private containsIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssMatcherSymbol.Prefix ||
      attr.matcher === CssMatcherSymbol.Suffix ||
      attr.matcher === CssMatcherSymbol.Subcode ||
      attr.matcher === CssMatcherSymbol.Occurrence ||
      attr.matcher === CssMatcherSymbol.Contains ||
      attr.matcher === CssMatcherSymbol.Equal
    ) {
      return attr.value.indexOf(this.value) !== -1;
    }

    return false;
  }

  private subcodeIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssMatcherSymbol.Subcode ||
      attr.matcher === CssMatcherSymbol.Equal
    ) {
      return attr.value === this.value;
    }

    return false;
  }

  private occurrenceIncludes ( attr: CssAttribute ): boolean {
    if (
      attr.matcher === CssMatcherSymbol.Occurrence ||
      attr.matcher === CssMatcherSymbol.Equal
    ) {
      return attr.value === this.value;
    }

    return false;
  }
}