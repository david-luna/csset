/**
 *
 * @param {string} text
 * @param {Grammar} grammar
 * @returns {Array<Token | string>}
 */
export function tokenizeBy(text: string, grammar: Grammar): Array<Token | string>;
/**
 * @param {string} input
 * @returns {Array<Token | string> | null}
 */
export function tokenize(input: string): Array<Token | string> | null;
export type Grammar = Record<string, RegExp>;
export type StringWithOffset = {
    str: string;
    start: number;
};
