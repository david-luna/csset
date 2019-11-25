import { CssAttribute } from './types';

export class Csset {
  element  : string;
  attribs  : Map<string, CssAttribute>;
  classes  : Map<string, boolean>;
  children : Csset[];
  offspring: Csset;

  /**
   * Parses the given selector filing up its private properties with metadata
   * @param selector the selector string
   */
  constructor (selector: string) {
    
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