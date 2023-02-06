/* eslint-disable no-shadow */
export enum CssMatcherSymbol {
  Presence = '',
  Equal = '=',
  Prefix = '^',
  Suffix = '$',
  Contains = '*',
  SubCode = '|',
  Occurrence = '~',
}

export const enum Combinators {
  ADJACENT = '+',
  SIBLING = '~',
  DESCENDANT = ' ',
  CHILD = '>',
  NONE = '',
}
