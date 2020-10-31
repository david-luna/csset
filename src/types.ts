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


// AST types (TODO: remove???)
enum CssTypes {
  Combinator,
  Space,
  Selector,
  SimpleSelector,
  Element,
  Hash,
  Class,
  Attribute,
  Pseudo,
}
interface CssSelector {
  type: CssTypes.Selector;
  simple: CssSimpleSelector;
  combinator: string | undefined;
  selector: CssSelector | undefined;
}

interface CssSimpleSelector {
  type: CssTypes.SimpleSelector;
  element: CssElement;
  hash: CssHash;
  classes: CssClass[];
  attributes: CssAttribute[];
}

interface CssElement {
  type: CssTypes.Element
  value: string;
}

interface CssHash {
  type: CssTypes.Hash;
  value: string;
}

interface CssClass {
  type: CssTypes.Class;
  value: string;
}

interface CssAttribute {
  type: CssTypes.Attribute;
  name: string;
  matcher: string | undefined;
  value: string | undefined;
}
