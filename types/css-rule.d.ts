export class CssRule {
    /** @type {boolean} */
    empty: boolean;
    /** @type {string} */
    id: string;
    /** @type {string} */
    element: string;
    /** @type {Set<string>} */
    classes: Set<string>;
    /** @type {Map<string, import('./css-attr').CssAttr>} */
    attribs: Map<string, import('./css-attr').CssAttr>;
    /**
     * @param {import('./css-attr').CssAttr} attr
     */
    addAttr(attr: import('./css-attr').CssAttr): void;
    /**
     * @param {string} name
     */
    addClass(name: string): void;
    /**
     * @param {CssRule} other
     * @returns {boolean}
     */
    supersetOf(other: CssRule): boolean;
    /**
     * @param {CssRule} other
     * @returns {boolean}
     */
    subsetOf(other: CssRule): boolean;
    /**
     * @param {CssRule} other
     * @returns {Array<CssRule>}
     */
    union(other: CssRule): Array<CssRule>;
    /**
     * @param {CssRule} other
     * @returns {CssRule}
     */
    intersection(other: CssRule): CssRule;
    /**
     * @returns {string}
     */
    toString(): string;
}
