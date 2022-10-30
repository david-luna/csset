import { CssAttributeMatcher } from './css-attribute-matcher';
import { CssMatcherFactory } from './matchers/css-matcher-factory';

export class CssAttribute {
  name: string;
  matchers: CssAttributeMatcher[] = [];

  constructor([name, symbol, value]: string[]) {
    this.name = name;
    symbol = symbol || '';
    value = value;

    const matcher = CssMatcherFactory.create(`${symbol}${value}`);
    let intersection;

    for (let i = 0; i < this.matchers.length; i++) {
      intersection = matcher.intersection(this.matchers[i]);

      if (intersection) {
        this.matchers[i] = CssMatcherFactory.create(intersection);
        break;
      }
    }

    if (!intersection) {
      this.matchers.push(matcher);
    }
  }

  supersetOf(attr: CssAttribute): boolean {
    const thisMatchers = this.matchers;
    const attrMatchers = attr.matchers;

    // To be a superset all matchers in this
    // - must be a superset of at least one attrMatcher
    // - must not have a void intersection with any attrMatcher
    for (const matcher of thisMatchers) {
      const supersetIndex = attrMatchers.findIndex((attrMatcher) => matcher.supersetOf(attrMatcher));
      const voidIndex = attrMatchers.findIndex((attrMatcher) => matcher.intersection(attrMatcher) === void 0);

      if (supersetIndex === -1 || voidIndex !== -1) {
        return false;
      }
    }

    return true;
  }

  subsetOf(attr: CssAttribute): boolean {
    return attr.supersetOf(this);
  }

  union(attr: CssAttribute): CssAttribute | null {
    const union = this.supersetOf(attr) ? this : attr.supersetOf(this) ? attr : null;

    return union;
  }

  intersection(attr: CssAttribute): CssAttribute | void {
    if (this.supersetOf(attr)) {
      return attr;
    }

    if (attr.supersetOf(this)) {
      return this;
    }

    const thisMatchers = this.matchers;
    const attrMatchers = attr.matchers;
    const intersectionMatchers: CssAttributeMatcher[] = [];

    for (const matcher of thisMatchers) {
      const voidIndex = attrMatchers.findIndex((attrMatcher) => matcher.intersection(attrMatcher) === void 0);

      if (voidIndex !== -1) {
        return void 0;
      }

      const intersectIndex = attrMatchers.findIndex((attrMatcher) => !!matcher.intersection(attrMatcher));

      if (intersectIndex !== -1) {
        const matcherString = matcher.intersection(attrMatchers[intersectIndex]);

        intersectionMatchers.push(CssMatcherFactory.create(`${matcherString}`));
        attrMatchers.splice(intersectIndex, 1);
      } else {
        intersectionMatchers.push(matcher);
      }
    }

    for (const matcher of attrMatchers) {
      intersectionMatchers.push(matcher);
    }

    const intersectionAttr = new CssAttribute([this.name]);
    intersectionAttr.matchers = intersectionMatchers;

    return intersectionAttr;
  }

  toString(): string {
    return this.matchers
      .map((matcher) => `${matcher}`)
      .sort()
      .reduce((prev, matcher) => `${prev}[${this.name}${matcher}]`, '');
  }
}
