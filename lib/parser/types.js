/**
 * @typedef {Object} IdTokenProps
 * @property {'id'} type
 * @property {string} name
 */
/**
 * @typedef {Object} UniversalTokenProps
 * @property {'universal'} type
 */
/**
 * @typedef {Object} TypeTokenProps
 * @property {'type'} type
 * @property {string} name
 */
/**
 * @typedef {Object} ClassTokenProps
 * @property {'class'} type
 * @property {string} name
 */
/**
 * @typedef {Object} AttributeTokenProps
 * @property {'attribute'} type
 * @property {string} name
 * @property {string} operator
 * @property {string} value
 * @property {'i' | 's'} [caseSensitive]
 */
/**
 * @typedef {Object} PseudoClassTokenProps
 * @property {'pseudo-class'} type
 * @property {string} name
 * @property {string} argument
 * @property {AST} [subtree]
 */
/**
 * @typedef {Object} PseudoElementTokenProps
 * @property {'pseudo-element'} type
 * @property {string} name
 */
/**
 * @typedef {Object} CommaTokenProps
 * @property {'comma'} type
 * @property {','} content
 */
/**
 * @typedef {Object} CombinatorTokenProps
 * @property {'combinator'} type
 */

/**
 * @typedef {Object} GenericToken
 * @property {string} content
 * @property {string} [namespace]
 * @property {[number, number]} pos
 */
/**
 * @typedef {GenericToken & IdTokenProps} IdToken
 * @typedef {GenericToken & UniversalTokenProps} UniversalToken
 * @typedef {GenericToken & TypeTokenProps} TypeToken
 * @typedef {GenericToken & ClassTokenProps} ClassToken
 * @typedef {GenericToken & AttributeTokenProps} AttributeToken
 * @typedef {GenericToken & PseudoClassTokenProps} PseudoClassToken
 * @typedef {GenericToken & PseudoElementTokenProps} PseudoElementToken
 * @typedef {GenericToken & CommaTokenProps} CommaToken
 * @typedef {GenericToken & CombinatorTokenProps} CombinatorToken
 *
 * @typedef {IdToken | UniversalToken | TypeToken | ClassToken | AttributeToken | PseudoClassToken | PseudoElementToken | CommaToken | CombinatorToken} Token
 */

/**
 * @typedef {Object} Complex
 * @property {'complex'} type
 * @property {string} combinator
 * @property {AST} right
 * @property {AST} left
 */
/**
 * @typedef {Object} Compound
 * @property {'compound'} type
 * @property {Token[]} list
 */
/**
 * @typedef {Object} List
 * @property {'list'} type
 * @property {AST[]} list
 */
/**
 * @typedef {Complex | Compound | List | Token} AST
 */
