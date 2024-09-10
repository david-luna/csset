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
