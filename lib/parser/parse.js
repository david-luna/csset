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

import { nestTokens } from './nestTokens.js';
import { tokenize } from './tokenize.js';
import { RECURSIVE_PSEUDO_CLASSES, RECURSIVE_PSEUDO_CLASSES_ARGS } from './tokens.js';
import { walk } from './walk.js';

/**
 * @typedef {Object} ParseOptions
 * @property {boolean} recursive Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
 * @property {boolean} list Whether this can be a selector list (A, B, C etc). Defaults to true.
 */

/** @type {ParseOptions} */
const DEFAULT_PARSE_OPTIONS = {
  recursive: true,
  list: true,
};

/**
 * Parse a CSS selector
 * @param {string} selector The selector to parse
 * @param {Partial<ParseOptions>} options The parse options. Default is {recursive: true, list: true}
 * @returns {AST | null}
 */
export function parse(selector, options = {}) {
  const { recursive, list } = Object.assign({}, DEFAULT_PARSE_OPTIONS, options);
  const tokens = tokenize(selector);

  if (!tokens) {
    return null;
  }
  // eslint-disable-next-line prettier/prettier
  const ast = nestTokens(/** @type {Array<Token>}*/(tokens), { list });

  if (recursive) {
    walk(ast, (node) => {
      if (node.type === 'pseudo-class' && node.argument) {
        if (RECURSIVE_PSEUDO_CLASSES.has(node.name)) {
          let argument = node.argument;
          const childArg = RECURSIVE_PSEUDO_CLASSES_ARGS[node.name];
          if (childArg) {
            const match = childArg.exec(argument);
            if (!match) {
              return;
            }

            Object.assign(node, match.groups);
            argument = match.groups ? match.groups.subtree : '';
          }
          if (argument) {
            node.subtree = parse(argument, { recursive: true, list: true });
          }
        }
      }
    });
  }

  return ast;
}
