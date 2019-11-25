import { AttributeMatcher, CssAttribute } from './types';


export class CssRule {
  element: string;
  attribs: Map<string, CssAttribute>;
  classes: Map<string, boolean>;

  constructor (selector: string) {
    this.attribs = new Map();
    this.classes = new Map();

    while (selector.length) {

    }
  }

  private extractElement(s: string): string {
    const elemRx = /^[^\.\[]+/;
    const [elem, rest] = this.extractToken(s, elemRx);

    this.element = elem;

    return rest;
  }

  private extractClass(s: string): string {
    const classRx = /^\.[^\]\.]+/;
    const [clazz, rest] = this.extractToken(s, classRx);

    if (clazz !== '') {
      this.classes.set(clazz, true);
    }

    return rest;
  }

  private extractAttribute(s: string): string {
    const attrRx = /^\[[^\]]+\]/;
    const [attr, rest] = this.extractToken(s, attrRx);

    if (attr !== '') {
      const parts = attr.slice(1, -1).split('=');
      const mChar = parts[0].slice(-1);
      let name, matcher;

      switch (mChar) {
        case AttributeMatcher.Prefix:
        case AttributeMatcher.Suffix:
        case AttributeMatcher.Contains:
        case AttributeMatcher.Subcode:
        case AttributeMatcher.Occurrence:
          name    = parts[0].slice(0,-1); 
          matcher = mChar;
          break;
        default:
          name    = parts[0];
          matcher = parts.length < 2 ? AttributeMatcher.Presence : AttributeMatcher.Equal;
      }
      this.attribs.set(name, { name, matcher, value: parts[1] })
    }

    return rest;
  }


  private extractToken(s: string, rx: RegExp): [string, string] {
    const result = rx.exec(s);

    return [
      result ? result[0]: '',
      result ? s.replace(rx, '') : s,
    ];
  }
}