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
 * Gets a substring from index to the closing of the 1st parentesis group
 * - if no parentesis are present it returns the whole substring from index
 * - if a parentesis has no pair (opening or closing) it throws an error
 *
 * @param {string} text the text where to extract the string between parens
 * @param {number} index the index where to start looking
 * @returns {string} substring from index until the last parens closes
 */
export function gobbleParens(text, index) {
  let str = '';
  let i = index;
  /** @type {string[]} */
  const stack = [];

  for (; i < text.length; i++) {
    const char = text[i];

    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.length > 0) {
        stack.pop();
      } else {
        throw new Error('Closing paren without opening paren at ' + i);
      }
    }

    str += char;

    if (stack.length === 0) {
      return str;
    }
  }

  throw new Error('Opening paren without closing paren');
}
