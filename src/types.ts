export enum AttributeMatcher {
  Presence   = '',
  Equal      = '=',
  StartsWith = '^',
  EndsWith   = '$',
  Contains   = '~'
}

export interface CssAttribute {
  name   : string;
  matcher: AttributeMatcher;
  value? : string;
}
