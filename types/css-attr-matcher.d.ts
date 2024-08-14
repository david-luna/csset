/**
 * @param {import('./symbols').MatcherSymbol} symbol
 * @param {string} value
 * @return {CssAttrMatcher}
 */
export function createMatcher(symbol: import('./symbols').MatcherSymbol, value: string): CssAttrMatcher;
/** @class */
declare class CssAttrMatcher {
    constructor(value: any);
    /** @type {string} */
    value: string;
    /** @type {import('./symbols').MatcherSymbol} */
    symbol: import('./symbols').MatcherSymbol;
    /**
     * @param {CssAttrMatcher} other
     * @returns {boolean}
     */
    supersetOf(other: CssAttrMatcher): boolean;
    /**
     * @param {CssAttrMatcher} other
     * @returns {boolean}
     */
    subsetOf(other: CssAttrMatcher): boolean;
    /**
     * @param {CssAttrMatcher} other
     * @returns {CssAttrMatcher | null}
     */
    union(other: CssAttrMatcher): CssAttrMatcher | null;
    /**
     * @param {CssAttrMatcher} other
     * @returns {CssAttrMatcher | null | undefined}
     */
    intersection(other: CssAttrMatcher): CssAttrMatcher | null | undefined;
    /**
     * @returns {string}
     */
    toString(): string;
}
export {};
