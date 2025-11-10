// MIT License

// Copyright (c) 2020 Lea Verou

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
