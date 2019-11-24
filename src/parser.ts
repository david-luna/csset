import { CssAttribute } from './types';

export enum CssTokenType {
  Element,
  Class,
  Attribute,
  Pseudo,
}

export interface CssToken {
  type: CssTokenType,
  value: string,
}


const extract = (s: string, rx: RegExp): { match: string, rest: string } => {
  const result = rx.exec(s);

  return {
    match: result ? result[0]: '',
    rest : result ? s.replace(rx, '') : s,
  };
}

const elemRx = /^[^\.\[]+/;
const attrRx = /^\[[^\]]\]/;
const clasRx = /^\.[^\]\.]/;

export const parseCss = (css: string) => {

}