type IdTokenProps = {
    type: 'id';
    name: string;
};
type UniversalTokenProps = {
    type: 'universal';
};
type TypeTokenProps = {
    type: 'type';
    name: string;
};
type ClassTokenProps = {
    type: 'class';
    name: string;
};
type AttributeTokenProps = {
    type: 'attribute';
    name: string;
    operator: string;
    value: string;
    caseSensitive?: 'i' | 's';
};
type PseudoClassTokenProps = {
    type: 'pseudo-class';
    name: string;
    argument: string;
    subtree?: AST;
};
type PseudoElementTokenProps = {
    type: 'pseudo-element';
    name: string;
};
type CommaTokenProps = {
    type: 'comma';
    content: ',';
};
type CombinatorTokenProps = {
    type: 'combinator';
};
type GenericToken = {
    content: string;
    namespace?: string;
    pos: [number, number];
};
type IdToken = GenericToken & IdTokenProps;
type UniversalToken = GenericToken & UniversalTokenProps;
type TypeToken = GenericToken & TypeTokenProps;
type ClassToken = GenericToken & ClassTokenProps;
type AttributeToken = GenericToken & AttributeTokenProps;
type PseudoClassToken = GenericToken & PseudoClassTokenProps;
type PseudoElementToken = GenericToken & PseudoElementTokenProps;
type CommaToken = GenericToken & CommaTokenProps;
type CombinatorToken = GenericToken & CombinatorTokenProps;
type Token = IdToken | UniversalToken | TypeToken | ClassToken | AttributeToken | PseudoClassToken | PseudoElementToken | CommaToken | CombinatorToken;
type Complex = {
    type: 'complex';
    combinator: string;
    right: AST;
    left: AST;
};
type Compound = {
    type: 'compound';
    list: Token[];
};
type List = {
    type: 'list';
    list: AST[];
};
type AST = Complex | Compound | List | Token;
