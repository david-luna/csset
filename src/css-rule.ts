import { CssAttribute } from './css-attribute';

export class CssRule {
  private _id      : string;
  private _element : string;
  classes : Set<string> = new Set();
  attribs : Map<string, CssAttribute> = new Map();

  set id(id: string) {
    if (this._id) {
      throw SyntaxError(`Identifier already se to ${this.id}.`)
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
    return this._element;
  }


  addAttribute(attribute: string) {
    const nextAttribute = new CssAttribute(attribute);
    const prevAttribute = this.attribs.get(nextAttribute.name)

    if (prevAttribute) {
      const mergedAttribute = prevAttribute.intersection(nextAttribute);

      if (mergedAttribute === void 0) {
        throw new TypeError(`The selector defines an empty set.`);
      } else {
        this.attribs.set(prevAttribute.name, mergedAttribute);
      }
    } else {
      this.attribs.set(nextAttribute.name, nextAttribute);
    }
  }
}
