// import { AST, Token } from './types';

// export interface NestTokensOptions {
//   list: boolean;
// }
/**
 * @typedef {Object} NestTokensOptions
 * @property {boolean} list
 */

/** @type {NestTokensOptions} */
const DEFAULT_NEST_OPTIONS = {
  list: true,
};

/**
 * Converts a flat list of tokens into a tree of complex & compound selectors
 * @param {Array<Token>} tokens
 * @param {NestTokensOptions} options
 * @returns {AST | null}
 */
export function nestTokens(tokens, options = DEFAULT_NEST_OPTIONS) {
  const { list } = options;
  if (list && tokens.find((t) => t.type === 'comma')) {
    /** @type {Array<AST | null>} */
    const selectors = [];
    /** @type {Array<Token>} */
    const temp = [];

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'comma') {
        if (temp.length === 0) {
          throw new Error('Incorrect comma at ' + i);
        }

        selectors.push(nestTokens(temp, { list: false }));
        temp.length = 0;
      } else {
        temp.push(tokens[i]);
      }
    }

    if (temp.length === 0) {
      throw new Error('Trailing comma');
    } else {
      selectors.push(nestTokens(temp, { list: false }));
    }

    return { type: 'list', list: selectors };
  }

  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];

    if (token.type === 'combinator') {
      const left = tokens.slice(0, i);
      const right = tokens.slice(i + 1);

      return {
        type: 'complex',
        combinator: token.content,
        left: nestTokens(left),
        right: nestTokens(right),
      };
    }
  }

  if (tokens.length === 0) {
    return null;
  }

  // If we're here, there are no combinators, so it's just a list
  return tokens.length === 1
    ? tokens[0]
    : {
        type: 'compound',
        list: [...tokens], // clone to avoid pointers messing up the AST
      };
}
