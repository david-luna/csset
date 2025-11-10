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
 * @template T
 * @typedef {Object} PropertyEntry<T>
 * @property {string} before
 * @property {string} property
 * @property {T} value
 */

/**
 * @template T
 * Inserts a property before another in an object literal without breaking references to it
 *
 * @param {Record<string, T>} target the target record
 * @param {PropertyEntry<T>} entry the entry info with property, value and before which property has to go
 * @returns {undefined}
 */
export function insert(target, entry) {
  /** @type {Record<string, T>} */
  const temp = {};
  const { before, property, value } = entry;
  let found = false;

  for (const p in target) {
    if (p === before) {
      found = true;
    }

    if (found) {
      temp[p] = target[p];
      delete target[p];
    }
  }

  Object.assign(target, { [property]: value, ...temp });
}
