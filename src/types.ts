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
