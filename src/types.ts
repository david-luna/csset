export enum CssTokenType {
  Void,
  Id,
  Element,
  Class,
  Attribute,
  Space,
  Combinator,
  Separator,
  Unknown,
}
export interface CssToken {
  type    : CssTokenType,
  values  : string[];
  position: number;
  length  : number;
}

export enum CssMatcherSymbol {
  Presence   = '',
  Equal      = '=',
  Prefix     = '^',
  Suffix     = '$',
  Contains   = '*',
  Subcode    = '|',
  Occurrence = '~',
}

export const enum CombinatorValues {
  ADJACENT   = '+',
  SIBLING    = '~',
  DESCENDANT = ' ',
  CHILD      = '>',
  NONE       = '',
}
