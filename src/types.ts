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

export enum AttributeMatcher {
  Presence   = '',
  Equal      = '=',
  Prefix     = '^',
  Suffix     = '$',
  Contains   = '~',
  Subcode    = '|',
  Occurrence = '*',
}

export interface CssAttribute {
  name   : string;
  matcher: AttributeMatcher;
  value? : string;
}
