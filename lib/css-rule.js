import { EMPTY_SET } from './symbols.js';

export class CssRule {
  /** @type {boolean} */
  empty = false;
  /** @type {string} */
  id = '';
  /** @type {string} */
  element = '*';
  /** @type {Set<string>} */
  classes = new Set();
  /** @type {Map<string, import('./css-attr').CssAttr>} */
  attribs = new Map();

  /**
   * @param {import('./css-attr').CssAttr} attr
   */
  addAttr(attr) {
    const prevAttr = this.attribs.get(attr.name);
    const nextAttr = prevAttr ? prevAttr.intersection(attr) : attr;

    if (nextAttr.empty) {
      this.empty = true;
    }
    this.attribs.set(attr.name, nextAttr);
  }

  /**
   * @param {string} name
   */
  addClass(name) {
    this.classes.add(name);
  }

  /**
   * @param {CssRule} other
   * @returns {boolean}
   */
  supersetOf(other) {
    // Element is not the wildcard and different from the other
    if (this.element !== '*' && this.element !== other.element) {
      return false;
    }

    // Different IDs
    if (this.id && this.id !== other.id) {
      return false;
    }

    // Other rule must have all classes of this one
    for (const c of this.classes) {
      if (!other.classes.has(c)) {
        return false;
      }
    }

    // Other rule must have less or equal attributes to be a subset
    if (this.attribs.size > other.attribs.size) {
      return false;
    }

    // Attribs of this rule must be defined on the other and also be a superset
    for (const attr of this.attribs.values()) {
      const otherAttr = other.attribs.get(attr.name);

      // attrib should be defined in both and include
      if (otherAttr && !attr.supersetOf(otherAttr)) {
        return false;
      } else if (!otherAttr) {
        return false;
      }
    }

    return true;
  }

  /**
   * @param {CssRule} other
   * @returns {boolean}
   */
  subsetOf(other) {
    return other.supersetOf(this);
  }

  /**
   * @param {CssRule} other
   * @returns {Array<CssRule>}
   */
  union(other) {
    if (this.supersetOf(other)) {
      return [this];
    }
    if (this.subsetOf(other)) {
      return [other];
    }
    return [this, other];
  }

  /**
   * @param {CssRule} other
   * @returns {CssRule}
   */
  intersection(other) {
    const result = new CssRule();

    // Basic checks for emptyness
    // - different IDs
    // - different elements and none is '*'
    if (
      (this.id && other.id && this.id !== other.id) ||
      (this.element !== other.element && this.element !== '*' && other.element !== '*')
    ) {
      result.empty = true;
      return result;
    }

    // Set the basic props
    result.id = this.id || other.id;
    result.element = this.element === '*' || other.element === '*' ? '*' : this.element;

    // Classes
    this.classes.forEach((c) => result.addClass(c));
    other.classes.forEach((c) => result.addClass(c));

    // Attribs
    this.attribs.forEach((attr) => result.addAttr(attr));
    other.attribs.forEach((attr) => result.addAttr(attr));

    return result;
  }

  /**
   * @returns {string}
   */
  toString() {
    if (this.empty) {
      return EMPTY_SET;
    }

    const classes = Array.from(this.classes).sort();
    const attribs = Array.from(this.attribs.keys())
      .sort()
      .map((n) => this.attribs.get(n));

    const strClasses = classes.map((n) => `.${n}`);
    const strAttribs = attribs.map((a) => `${a}`);
    const strId = this.id ? `#${this.id}` : '';

    return `${this.element}${strId}${strClasses.join('')}${strAttribs.join('')}`;
  }
}
