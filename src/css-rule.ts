import { CssAttribute } from './css-attribute';

export class CssRule {
  private _id      : string;
  private _element : string;
  classes : Set<string> = new Set();
  attribs : Map<string, CssAttribute> = new Map();

  set id(id: string) {
    if (this._id) {
      throw SyntaxError(`Identifier already set to ${this.id}.`)
    }
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set element(element: string) {
    if(this.attribs.size) {
      throw SyntaxError(`Elements cannot be defined after attributes.`);
    }
    this._element = element;
  }
  get element(): string {
    return this._element || '*';
  }

  addAttribute(attribute: CssAttribute) {
    const prevAttribute = this.attribs.get(attribute.name)

    if (prevAttribute) {
      const mergedAttribute = prevAttribute.intersection(attribute);

      if (mergedAttribute === void 0) {
        throw new TypeError(`The selector defines an empty set.`);
      } else {
        this.attribs.set(prevAttribute.name, mergedAttribute);
      }
    } else {
      this.attribs.set(attribute.name, attribute);
    }
  }

  addClass ( className: string ) {
    this.classes.add(className);
  }

  equals ( rule: CssRule ): boolean {
    return `${this}` === `${rule}`;
  }

  supersetOf ( rule: CssRule ): boolean {
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
    // More attribs mean more specific so it cannot be superset
    if (this.attribs.size > rule.attribs.size) {
      return false
    }
    // Check attributes
    for (let attr of this.attribs.values()) {
      const ruleAttr = rule.attribs.get(attr.name);

      // attrib should be defined in both and include 
      if (ruleAttr && !attr.supersetOf(ruleAttr)) {
        return false;
      } else if (!ruleAttr) {
        return false;
      }
    }

    return true;
  }

  subsetOf ( rule: CssRule ): boolean {
    return rule.supersetOf(this);
  }

  union( rule: CssRule ): CssRule[] {
    const union = this.supersetOf(rule) ? [this] :
                  rule.supersetOf(this) ? [rule] : [this, rule];

    return union;
  }

  intersection( rule: CssRule ): CssRule | void {
    if (this.id && rule.id && this.id !== rule.id) {
      return void 0;
    }
    if (this.element !== rule.element && this.element !== '*' && rule.element !== '*') {
      return void 0;
    }
    const intersection = new CssRule();

    intersection.id = this.id || rule.id;
    
    if (this.element !== '*') {
      intersection.element = this.element;
    }

    this.classes.forEach(cls => intersection.addClass(cls));
    rule.classes.forEach(cls => intersection.addClass(cls));

    try {
      this.attribs.forEach(attr => intersection.addAttribute(attr));
      rule.attribs.forEach(attr => intersection.addAttribute(attr));
    } catch (error) {
      return void 0;
    }

    return intersection;
  }

  toString(): string {
    const classes = Array.from(this.classes).sort();
    const attribs = Array.from(this.attribs.keys()).sort().map(n => this.attribs.get(n)) as CssAttribute[];

    const strClasses = classes.map(n => `.${n}`);
    const strAttribs = attribs.map(a => `${a}`);
    const strId = this.id ? `#${this.id}` : '';

    return `${this.element}${strId}${strClasses.join('')}${strAttribs.join('')}`;
  }
}
