export interface Step {
  comment: string;
  code: () => unknown;
}
