import { tokenize, Token } from 'parsel-ts';
import { CssSelector } from './css-selector';

export class Csset {
  selectors: CssSelector[];

  /**
   * Parses the given selector filing up its private properties with metadata
   * @param selector the selector string
   */
  constructor(selector: string) {
    const tokenList = this.getTokens(selector);
    this.selectors = [];
    let tokenGroup = [] as Token[];
    let currentToken = tokenList.shift();

    while (currentToken) {
      if (currentToken.type === 'comma') {
        this.selectors.push(new CssSelector(tokenGroup));
        tokenGroup = [];
      } else {
        tokenGroup.push(currentToken);
      }
      currentToken = tokenList.shift();
    }
    // Last group must be pushed
    this.selectors.push(new CssSelector(tokenGroup));
  }

  /**
   * Returns true if this set contains the one passed as parameter
   * @param set the set to check with
   */
  supersetOf(set: Csset): boolean {
    let index = set.selectors.length;

    while (index--) {
      const containerIndex = this.selectors.findIndex((s) => s.supersetOf(set.selectors[index]));

      if (containerIndex === -1) {
        return false;
      }
    }
    return true;
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

    // Make union of selectors if possible
    const equalSel = this.selectors.filter((thisSel) =>
      set.selectors.some((otherSel) => `${thisSel}` === `${otherSel}`),
    );
    const uniqueOne = this.selectors.filter((thisSel) => !set.selectors.some((otherSel) => thisSel.subsetOf(otherSel)));
    const uniqueTwo = set.selectors.filter((otherSel) => !this.selectors.some((thisSel) => otherSel.subsetOf(thisSel)));
    const allSelectors = equalSel.concat(uniqueOne, uniqueTwo);

    return new Csset(`${allSelectors.map((s) => s.toString()).join(',')}`);
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

    // Make intersection of selectors if possible
    // 1st attempt brute force (intersecting every set with others)
    const intersections = this.selectors
      .map((thisSel) => set.selectors.map((otherSel) => thisSel.intersection(otherSel)))
      .reduce((flat, val) => flat.concat(val), [])
      .filter((val) => !!val)
      .map((val) => `${val}`);

    if (intersections.length) {
      return new Csset(`${intersections.join(',')}`);
    }

    return void 0;
  }

  toString(): string {
    return this.selectors.map((s) => `${s}`).join(',');
  }

  private getTokens(selector: string): Token[] {
    let tokens;

    try {
      tokens = tokenize(selector);
    } catch (error) {
      throw SyntaxError(`${error}`);
    }

    if (!tokens) {
      throw SyntaxError(`Selector ${selector} cannot be parsed.`);
    }

    const unknownToken = tokens.find((t) => typeof t === 'string');
    if (unknownToken) {
      throw SyntaxError(`Unknown Token ${unknownToken} in selector ${selector}`);
    }

    return tokens as Token[];
  }
}
