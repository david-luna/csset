/**
 * @typedef {Object} WalkOptions
 * @property {boolean} subtree
 */
/**
 * @callback WalkCallback
 * @param {AST} n
 * @param {AST} [p]
 * @returns {undefined}
 */
/**
 * Traverse an AST (or part thereof), in depth-first order
 * @param {AST | undefined} node
 * @param {WalkCallback} callback
 * @param {WalkOptions} [o]
 * @param {AST} [parent]
 * @returns
 */
export function walk(node: AST | undefined, callback: WalkCallback, o?: WalkOptions, parent?: AST): void;
export type WalkOptions = {
    subtree: boolean;
};
export type WalkCallback = (n: AST, p?: AST) => undefined;
