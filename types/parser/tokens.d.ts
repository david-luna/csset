export const TOKENS: {
    attribute: RegExp;
    id: RegExp;
    class: RegExp;
    comma: RegExp;
    combinator: RegExp;
    'pseudo-element': RegExp;
    'pseudo-class': RegExp;
    universal: RegExp;
    type: RegExp;
};
export const TOKENS_WITH_PARENS: Set<string>;
export const TOKENS_WITH_STRINGS: Set<string>;
export const TRIM_TOKENS: Set<string>;
export const RECURSIVE_PSEUDO_CLASSES: Set<string>;
/** @type {Record<string, RegExp>} */
export const RECURSIVE_PSEUDO_CLASSES_ARGS: Record<string, RegExp>;
export const TOKENS_FOR_RESTORE: {
    attribute: RegExp;
    id: RegExp;
    class: RegExp;
    comma: RegExp;
    combinator: RegExp;
    'pseudo-element': RegExp;
    'pseudo-class': RegExp;
    universal: RegExp;
    type: RegExp;
};
