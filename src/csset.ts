import { CssSelector } from './css-selector';

export class Csset {
  // These properties are exclusive if one is set the other is undefined
  selector: CssSelector;
  subsets : Csset[];

  /**
   * Parses the given selector filing up its private properties with metadata
   * @param selector the selector string
   */
  constructor (selector: string) {
    // TODO: this is error prone since attr values may contain this char
    if (selector.indexOf(',') !== -1) {
      this.subsets = selector.split(',').map((sel) => new Csset(sel));
    } else {
      this.selector = new CssSelector(selector);
    }
  }

  /**
   * Returns true if this set contains the one passed as parameter
   * @param set the set to check with
   */
  supersetOf(set: Csset): boolean {
    // Case 1: both do not contain subsets (list of rules with values)
    if (this.selector && set.selector) {
      return this.selector.supersetOf(set.selector);
    }

    // Case 2: both do contain subsets (all subsets must be contained)
    if (this.subsets?.length && set.subsets?.length) {
      let index = set.subsets.length;

      while(index--) {
        const containerIndex = this.subsets.findIndex(s => s.supersetOf(set.subsets[index]));

        if (containerIndex === -1) {
          return false;
        }
      }
      return true;
    }
    // Case 3: this does not & received Csset does (all subsets must be contained)
    if (this.selector && set.subsets?.length) {
      let index = set.subsets.length;

      while(index--) {
        if (!this.supersetOf(set.subsets[index])) {
          return false;
        }
      }
      return true;
    }

    // Case 4: this does & received Csset does not (one of my subsets must contain)
    if (this.subsets?.length && set.selector) {
      let index = this.subsets.length;

      while(index--) {
        if (this.subsets[index].supersetOf(set)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Returns true if this set is contained the one passed as parameter
   * @param set the set to check with
   */
  subsetOf(set: Csset): boolean {
    return set.supersetOf(this);
  }

  /**
   * Returns a new CSS set which is the union of this one and the passed as parameter
   * @param set the other CSS set to be united with
   */
  union(set: Csset): Csset {
    if (this.supersetOf(set)) {
      return this;
    }

    if (this.subsetOf(set)) {
      return set;
    }

    // If one of the sets does not have subsets just return a set with all
    // if (this.layers || set.layers) {
    if (this.selector || set.selector) {
      return new Csset(`${this},${set}`);
    }

    // Make union of subsets if possible
    const equalSets = this.subsets.filter(thisSet => set.subsets.some(otherSet => `${thisSet}` === `${otherSet}`));
    const uniqueOne = this.subsets.filter(s => !s.subsetOf(set));
    const uniqueTwo = set.subsets.filter(s => !s.subsetOf(this));
    
    const equSelector = equalSets.map(s => `${s}`).join(',');
    const oneSelector = uniqueOne.map(s => `${s}`).join(',');
    const twoSelector = uniqueTwo.map(s => `${s}`).join(',');

    return new Csset(`${equSelector},${oneSelector},${twoSelector}`);
  }

  /**
   * Returns a new CSS set which is the intersection of this one and the passed as parameter
   * or void if the intersection is an empty set
   * @param set the other CSS set to be united with
   */
  intersection(set: Csset): Csset | void {
    if (this.supersetOf(set)) {
      return set;
    }

    if (this.subsetOf(set)) {
      return this;
    }

    // If non of them has subsets means they're just single selectors so there is no
    // selector to represent intersection
    // if (this.layers && set.layers) {
    if (this.selector && set.selector) {
      return void 0;
    }

    // Make intersection of subsets if possible
    // 1st attempt brute force (intersecting every set with others)
    // const oneSets = this.layers ? [this] : this.subsets;
    // const twoSets = set.layers ? [set] : set.subsets;
    const oneSets = this.selector ? [this] : this.subsets;
    const twoSets = set.selector ? [set] : set.subsets;
    const intersections = oneSets
      .map((setOne) => { return twoSets.map((setTwo) => setOne.intersection(setTwo));})
      .reduce((flat, val) => flat.concat(val), [])
      .filter((val) => !!val)
      .map((val) => `${val}`);

    if (intersections.length) {
      return new Csset(`${intersections.join(',')}`);
    }

    return void 0;
  }

  toString(): string {
    if (this.selector) {
      return `${this.selector}`;
    }

    return this.subsets.map(s => `${s}`).join(',');
  }
}
