/**
 * @typedef {Object} CombinedRule
 * @property {import('./css-rule').CssRule} rule
 * @property {import('./symbols').CombinatorSymbol} combinator
 */
/**
 * @class
 */
export class CssSelector {
    /** @type {boolean} */
    empty: boolean;
    /** @type {Array<Array<CombinedRule>>} */
    levels: Array<Array<CombinedRule>>;
    /**
     * @param {import('./css-rule').CssRule} rule
     * @param {import('./symbols').CombinatorSymbol} combinator
     */
    addRule(rule: import('./css-rule').CssRule, combinator: import('./symbols').CombinatorSymbol): void;
    /**
     * @param {CssSelector} other
     * @returns {boolean}
     */
    supersetOf(other: CssSelector): boolean;
    /**
     * @param {CssSelector} other
     * @returns {boolean}
     */
    subsetOf(other: CssSelector): boolean;
    /**
     * @param {CssSelector} other
     * @returns {CssSelector}
     */
    intersection(other: CssSelector): CssSelector;
    /**
     * @returns {string}
     */
    toString(): string;
}
export type CombinedRule = {
    rule: import('./css-rule').CssRule;
    combinator: import('./symbols').CombinatorSymbol;
};
