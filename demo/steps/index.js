import { STEPS_BEGIN } from './steps-begin.js';
import { STEPS_UNION } from './steps-union.js';
import { STEPS_INTERSECTION } from './steps-intersection.js';

export * from './runner.js';
// eslint-disable-next-line prettier/prettier
export const STEPS = [
  ...STEPS_BEGIN,
  ...STEPS_UNION,
  ...STEPS_INTERSECTION,
];
