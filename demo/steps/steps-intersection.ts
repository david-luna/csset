import { Step } from './types';

declare var Csset: any;

export const STEPS_INTERSECTION: Step[] = [
  {
    comment: "Intersection returns a set which all elements are from both sets",
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const rhombus = new Csset('.rhombus');

      return quadrantOne.intersection(rhombus);
    }
  },
];
