/**
 * Gets a substring from index to the closing of the 1st parentesis group
 * - if no parentesis are present it returns the whole substring from index
 * - if a parentesis has no pair (opening or closing) it throws an error
 *
 * @param {string} text the text where to extract the string between parens
 * @param {number} index the index where to start looking
 * @returns {string} substring from index until the last parens closes
 */
export function gobbleParens(text: string, index: number): string;
