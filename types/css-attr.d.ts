/**
 * @typedef {ReturnType<import('./css-attr-matcher').createMatcher>} AttrMatcher
 */
/**
 * @class
 */
export class CssAttr {
    /**
     * @param {string} name
     */
    constructor(name: string);
    /** @type {string} */
    name: string;
    /** @type {Array<AttrMatcher>} */
    matchers: Array<AttrMatcher>;
    /** @type {boolean} */
    empty: boolean;
    /**
     * TODO: explain about intersections
     * @param {import('./symbols').MatcherSymbol} symbol
     * @param {string} value
     */
    addMatcher(symbol: import('./symbols').MatcherSymbol, value: string): void;
    /**
     * @param {CssAttr} other
     * @returns {boolean}
     */
    supersetOf(other: CssAttr): boolean;
    /**
     * @param {CssAttr} other
     * @returns {boolean}
     */
    subsetOf(other: CssAttr): boolean;
    /**
     * @param {CssAttr} other
     * @returns {CssAttr | null}
     */
    union(other: CssAttr): CssAttr | null;
    /**
     * @param {CssAttr} other
     * @returns {CssAttr}
     */
    intersection(other: CssAttr): CssAttr;
    /**
     * @returns {string}
     */
    toString(): string;
}
export type AttrMatcher = ReturnType<typeof createMatcher>;
import { createMatcher } from './css-attr-matcher.js';
