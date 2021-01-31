import { STEPS_INTRO } from './steps-intro';
import { STEPS_UNION } from './steps-union';

export * from './runner';
export const STEPS = [
  ...STEPS_INTRO,
  ...STEPS_UNION,
];
