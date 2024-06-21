// interface PropertyEntry<T> {
//     before: string;
//     property: string;
//     value: T;
//   }

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
