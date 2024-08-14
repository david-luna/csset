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
export function insert<T>(target: Record<string, T>, entry: PropertyEntry<T>): undefined;
/**
 * <T>
 */
export type PropertyEntry<T> = {
    before: string;
    property: string;
    value: T;
};
