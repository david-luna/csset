enum CssTokenType {
  Element,
  Identifier,
  Classname,
  Attribute,
  Pseudo,
}

type CssToken = {
  type: CssTokenType,
  value: string,
};

export class CssParser {
  constructor(private css: string) {}

  next(): { done: boolean, value: CssToken } {
    this.css = this.css.trim();
    
  }
}