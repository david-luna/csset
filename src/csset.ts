import { CssAttribute } from './types';

export class Csset {
  element  : string                    = '*';
  attribs  : Map<string, CssAttribute> = new Map();
  classes  : Map<string, boolean>      = new Map();
  children : Csset[]                   = [];
  offspring: Csset | undefined;

  /**
   * Parses the given selector filing up its private properties with metadata
   * @param selector the selector string
   */
  constructor (selector: string) {
    const elemRx = /^[^\.\[]+/;
    const attrRx = /^\[[^\]]\]/;
    const clasRx = /^\.[^\]\.]/;
  }


  /**
   * Returns true if this set is contained the one passed as parameter
   * @param set the set to check with
   */
  subset(set: Csset): boolean {
    return false;
  }

  /**
   * Returns true if this set contains the one passed as parameter
   * @param set the set to check with
   */
  superset(set: Csset): boolean {
    return set.subset(this);
  }
}