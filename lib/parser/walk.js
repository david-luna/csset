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
export function walk(node, callback, o, parent) {
  if (!node) {
    return;
  }

  if (node.type === 'complex') {
    walk(node.left, callback, o, node);
    walk(node.right, callback, o, node);
  } else if (node.type === 'compound' || node.type === 'list') {
    for (const n of node.list) {
      walk(n, callback, o, node);
    }
  } else if (node.type === 'pseudo-class' && node.subtree && o && o.subtree) {
    walk(node.subtree, callback, o, node);
  }

  callback(node, parent);
}
