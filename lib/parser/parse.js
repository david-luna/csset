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
