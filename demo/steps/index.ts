import { STEPS_BEGIN } from './steps-begin';
import { STEPS_UNION } from './steps-union';
import { STEPS_INTERSECTION } from './steps-intersection';

export * from './runner';
export const STEPS = [
  ...STEPS_BEGIN,
  ...STEPS_UNION,
  ...STEPS_INTERSECTION,
];
