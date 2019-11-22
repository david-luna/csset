// Types & enums
enum AttributeMatcher {
  Presence   = '',
  Equal      = '=',
  StartsWith = '^',
  EndsWith   = '$',
  Contains   = '~'
}

interface CssAttribute {
  name   : string;
  matcher: AttributeMatcher;
  value? : string;
}


export class Csset {
  private element: string         = '*';
  private attribs: CssAttribute[] = [];
  private classes: string[]       = [];
  private subsets: Csset[] = [];

  /**
   * Parses the given selector filing up its private properties with metadata
   * @param selector the selector string
   */
  constructor (private selector: string) {}


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