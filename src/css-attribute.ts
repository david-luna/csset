import { CssMatcherSymbol } from './types';
import { CssAttributeMatcher } from './css-attribute-matcher';
import { CssMatcherFactory } from './matchers/css-matcher-factory';

const regexs: { [type: string]: RegExp }  = {
  bounds : /^\[[^\]]+\]$/,
  name   : /^[^\t\n\f \/>"'=]+$/,
  matcher: /[\^\$~\|\*]/,
  value  : /^('|")[^'"]+\1$|^[^'"]+$/,
}

export class CssAttribute {

  name    : string;
  matchers: Map<CssMatcherSymbol, CssAttributeMatcher[]>;

  constructor ( selector: string ) {

    if ( !regexs.bounds.test(selector) ) {
      throw new SyntaxError(`Missing atrribute bounds in ${selector}`);
    }

    const equalIndex = selector.indexOf('=');
    const hasValue   = equalIndex !== -1;
    const hasMatcher = hasValue && regexs.matcher.test(selector.charAt(equalIndex - 1));
    const splitIndex = hasMatcher ? equalIndex - 1 : (hasValue ? equalIndex : -1);
    let name, rest;

    if ( splitIndex !== -1 ) {
      name = selector.substring(1, splitIndex);
      rest = selector.substring(splitIndex, selector.length - 1);
    } else {
      name = selector.slice(1, -1);
      rest = '';
    }

    if ( !regexs.name.test(name) ) {
      throw new SyntaxError(`Invalid atrribute name in ${selector}`);
    }

    const matcher = CssMatcherFactory.create(rest);
    this.matchers = new Map([[matcher.symbol, [matcher]]]);
    this.name     = name;
  }

  intersection( attr: CssAttribute ): CssAttribute {
    const cloned = new CssAttribute(`[${this.name}]`);
    const thisMatchers = [...this.matchers.values()].reduce((p,c) => p.concat(c), []);
    const attrMatchers = [...attr.matchers.values()].reduce((p,c) => p.concat(c), []);
    
    console.log(`thisMatchers`, thisMatchers);
    console.log(`attrMatchers`, attrMatchers);
    
    attrMatchers.forEach(attrMatcher => {
      const index = thisMatchers.findIndex(thisMatcher => thisMatcher.intersection(attrMatcher));

      if ( index !== -1 ) {
        const newMatcher = thisMatchers[index].intersection(attrMatcher) as string;

        thisMatchers.splice(index, 1);
        thisMatchers.push(CssMatcherFactory.create(newMatcher));
      } else {
        thisMatchers.push(attrMatcher);
      }
    });
     cloned.matchers = new Map();
     thisMatchers.forEach(m => {
       const list = cloned.matchers.get(m.symbol) || [];
       cloned.matchers.set(m.symbol, list.concat([m]));
     });

    return cloned;
  }

  toString(): string {
    let selector = '';

    for ( let matchers of this.matchers.values() ) {
      selector += matchers.reduce((prev, matcher) => `${prev}[${this.name}${matcher}]`, '');
    }

    return selector;
  }

  private clone(): CssAttribute {
    const cloned = new CssAttribute(`[${this.name}]`);

    for(let entry of this.matchers.entries() ) {
      cloned.matchers.set(entry[0], entry[1].slice())
    }

    return cloned;
  }
}