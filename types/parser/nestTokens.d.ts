/**
 * Converts a flat list of tokens into a tree of complex & compound selectors
 * @param {Array<Token>} tokens
 * @param {NestTokensOptions} options
 * @returns {AST | null}
 */
export function nestTokens(tokens: Array<Token>, options?: NestTokensOptions): AST | null;
export type NestTokensOptions = {
    list: boolean;
};
