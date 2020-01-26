export enum CssTokeType {
  Void,
  Id,
  Element,
  Class,
  Attribute
}
export interface CssToken {
  type : CssTokeType,
  value: string;
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

export interface CssAttribute {
  name   : string;
  matcher: CssMatcherSymbol;
  value? : string;
}
