/**
 * @class
 */
export class Csset {
    /**
     * @param {string} input
     */
    constructor(input: string);
    /** @type {boolean} */
    empty: boolean;
    /** @type {Array<import('./css-selector').CssSelector>} */
    selectors: Array<import('./css-selector').CssSelector>;
    /**
     * @param {Csset} other
     * @returns {boolean}
     */
    supersetOf(other: Csset): boolean;
    /**
     * @param {Csset} other
     * @returns {boolean}
     */
    subsetOf(other: Csset): boolean;
    /**
     * @param {Csset} other
     * @returns {Csset}
     */
    union(other: Csset): Csset;
    /**
     * @param {Csset} other
     * @returns {Csset | undefined}
     */
    intersection(other: Csset): Csset | undefined;
    /**
     * @returns {string}
     */
    toString(): string;
}
