import { parse } from './parse.js';
import { RECURSIVE_PSEUDO_CLASSES } from './tokens.js';
import { walk } from './walk.js';

/**
 *
 * @param {Array<number>} arr
 * @returns {number}
 */
function maxIndexOf(arr) {
  let max = arr[0];
  let ret = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      ret = i;
      max = arr[i];
    }
  }

  return arr.length === 0 ? -1 : ret;
}

/**
 * Converts the specificity array to a number
 * @param {[number, number, number]} specificityArr array if specificity weights
 * @param {number} [base] base to calculate the number
 * @returns {number}
 */
export function specificityToNumber(specificityArr, base) {
  const b = base || Math.max(...specificityArr) + 1;

  return specificityArr[0] * b ** 2 + specificityArr[1] * b + specificityArr[2];
}

/**
 * @param {string | AST} selector
 * @param {*} param1
 * @returns {[number, number, number] | null}
 */
// eslint-disable-next-line no-unused-vars
export function specificity(selector, { format = 'array' } = {}) {
  const ast = typeof selector === 'object' ? selector : parse(selector, { recursive: true });

  if (!ast) {
    return null;
  }

  if (ast.type === 'list') {
    // Return max specificity
    let base = 10;
    const specificities = ast.list.map((s) => {
      const sp = specificity(s) || [0, 0, 0];
      base = Math.max(base, ...sp);
      return sp;
    });
    const numbers = specificities.map((s) => specificityToNumber(s, base));
    const i = maxIndexOf(numbers);
    return specificities[i];
  }

  /** @type {[number, number, number]} */
  const ret = [0, 0, 0];

  walk(ast, (node) => {
    if (node.type === 'id') {
      ret[0]++;
    } else if (node.type === 'class' || node.type === 'attribute') {
      ret[1]++;
    } else if ((node.type === 'type' && node.content !== '*') || node.type === 'pseudo-element') {
      ret[2]++;
    } else if (node.type === 'pseudo-class' && node.name !== 'where') {
      if (RECURSIVE_PSEUDO_CLASSES.has(node.name) && node.subtree) {
        // Max of argument list
        const sub = specificity(node.subtree) || [];
        sub.forEach((s, i) => (ret[i] += s));
      } else {
        ret[1]++;
      }
    }
  });

  return ret;
}
