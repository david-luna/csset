import { Step } from './types';

declare var Csset: any;

export const STEPS_UNION: Step[] = [
  {
    comment: "Union is a straight forward method used to join sets",
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const quadrantTwo = new Csset('.quadrant-two');

      return quadrantOne.union(quadrantTwo);
    }
  },
  {
    comment: "You can do an union of many sets",
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const quadrantTwo = new Csset('.quadrant-two');
      const circle = new Csset('.circle');

      return quadrantOne.union(quadrantTwo).union(circle);
    }
  },
  
];
