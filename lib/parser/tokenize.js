import { gobbleParens } from './gobbleParens.js';
import { TOKENS, TOKENS_FOR_RESTORE, TOKENS_WITH_PARENS, TOKENS_WITH_STRINGS, TRIM_TOKENS } from './tokens.js';
// import { Token } from './types';

// type Grammar = Record<string, RegExp>;
// type StringWithOffset = { str: string; start: number };
/**
 * @typedef {Record<string, RegExp>} Grammar
 * @typedef {{ str: string; start: number }} StringWithOffset
 */

/**
 * @param {unknown} input
 * @returns {input is Token}
 */
function isTokenType(input) {
  return typeof input == 'object';
}

/**
 * @param {Array<string | Token>} tokens
 * @param {StringWithOffset[]} strings
 * @param {RegExp} regex
 * @param {Set<string>} types
 */
function restoreNested(tokens, strings, regex, types) {
  for (const str of strings) {
    for (const token of tokens) {
      if (isTokenType(token) && types.has(token.type) && token.pos[0] < str.start && str.start < token.pos[1]) {
        const { content } = token;
        token.content = token.content.replace(regex, str.str);

        // actually changed?
        if (token.content !== content) {
          // Re-evaluate groups
          const groupsRegexp = TOKENS_FOR_RESTORE[token.type];
          groupsRegexp.lastIndex = 0;
          const match = groupsRegexp.exec(token.content);
          const groups = match && match.groups;
          Object.assign(token, groups);
        }
      }
    }
  }
}

/**
 *
 * @param {string} text
 * @param {Grammar} grammar
 * @returns {Array<Token | string>}
 */
export function tokenizeBy(text, grammar) {
  if (!text) {
    return [];
  }

  /** @type {Array<Token | string>} */
  const strarr = [text];

  for (const token in grammar) {
    const pattern = grammar[token];

    // Don’t cache length as it changes during the loop
    for (let i = 0; i < strarr.length; i++) {
      const str = strarr[i];

      if (typeof str === 'string') {
        pattern.lastIndex = 0;

        const match = pattern.exec(str);

        if (match) {
          const from = match.index - 1;
          /** @type {Array<Token | string>} */
          const args = [];
          const content = match[0];

          const before = str.slice(0, from + 1);
          if (before) {
            args.push(before);
          }

          // @ts-ignore
          args.push({ type: token, content, ...match.groups });

          const after = str.slice(from + content.length + 1);
          if (after) {
            args.push(after);
          }

          strarr.splice(i, 1, ...args);
        }
      }
    }
  }

  let offset = 0;
  for (let i = 0; i < strarr.length; i++) {
    const token = strarr[i];
    const length = isTokenType(token) ? token.content.length : token.length;

    if (isTokenType(token)) {
      token.pos = [offset, offset + length];

      if (TRIM_TOKENS.has(token.type)) {
        token.content = token.content.trim() || ' ';
      }
    }

    offset += length;
  }

  return strarr;
}

/**
 * @param {string} input
 * @returns {Array<Token | string> | null}
 */
export function tokenize(input) {
  if (!input) {
    return null;
  }

  let selector = input.trim(); // prevent leading/trailing whitespace be interpreted as combinators

  // Replace strings with whitespace strings (to preserve offsets)
  // https://github.com/LeaVerou/parsel/pull/16
  /** @type {StringWithOffset[]}*/
  const strings = [];
  selector = selector.replace(
    /(?:"((?:[^"\\]|\\.)*)")|(?:'((?:[^'\\]|\\.)*)')/g,
    (str, contentDouble, contentSingle, start) => {
      strings.push({ str, start });
      const content = contentDouble === void 0 ? contentSingle : contentDouble;
      // eslint-disable-next-line prettier/prettier
      const quote = (contentDouble === void 0) ? '\'' : '"';
      return quote + '§'.repeat(content.length) + quote;
    },
  );

  // Now that strings are out of the way, extract parens and replace them with parens with whitespace (to preserve offsets)
  /** @type {StringWithOffset[]}*/
  const parens = [];
  let offset = 0;
  let start;

  while ((start = selector.indexOf('(', offset)) > -1) {
    const str = gobbleParens(selector, start);
    parens.push({ str, start });
    selector =
      selector.substring(0, start) + '(' + '¶'.repeat(str.length - 2) + ')' + selector.substring(start + str.length);
    offset = start + str.length;
  }

  // Now we have no nested structures and we can parse with regexes
  const tokens = tokenizeBy(selector, TOKENS);

  // Now restore parens and strings in reverse order
  restoreNested(tokens, parens, /\(¶+\)/, TOKENS_WITH_PARENS);
  restoreNested(tokens, strings, /(['"])§+?\1/, TOKENS_WITH_STRINGS);

  return tokens;
}
