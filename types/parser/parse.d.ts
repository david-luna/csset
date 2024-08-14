/**
 * Parse a CSS selector
 * @param {string} selector The selector to parse
 * @param {Partial<ParseOptions>} options The parse options. Default is {recursive: true, list: true}
 * @returns {AST | null}
 */
export function parse(selector: string, options?: Partial<ParseOptions>): AST | null;
export type ParseOptions = {
    /**
     * Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
     */
    recursive: boolean;
    /**
     * Whether this can be a selector list (A, B, C etc). Defaults to true.
     */
    list: boolean;
};
