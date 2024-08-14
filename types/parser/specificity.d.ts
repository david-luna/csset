/**
 * Converts the specificity array to a number
 * @param {[number, number, number]} specificityArr array if specificity weights
 * @param {number} [base] base to calculate the number
 * @returns {number}
 */
export function specificityToNumber(specificityArr: [number, number, number], base?: number): number;
/**
 * @param {string | AST} selector
 * @param {*} param1
 * @returns {[number, number, number] | null}
 */
export function specificity(selector: string | AST, { format }?: any): [number, number, number] | null;
