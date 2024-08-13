/* eslint-disable no-undef */

/** @type {import('./runner').Step[]} */
export const STEPS_INTERSECTION = [
  {
    comment: 'Intersection returns a set which all elements are from both sets',
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const diamond = new Csset('.diamond');

      return quadrantOne.intersection(diamond);
    },
  },
  {
    comment: 'Like unions you can calculate intersection for more than two sets',
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const even = new Csset('[d-even=true]');
      const diamond = new Csset('.diamond');

      return quadrantOne.intersection(even).intersection(diamond);
    },
  },
  {
    comment: 'A bigger intersection',
    code: () => {
      const quadrantFour = new Csset('.quadrant-four');
      const diamond = new Csset('.diamond');
      let result = quadrantFour;

      for (let i = 0; i < 50; i++) {
        if (i % 2 === 0) {
          const s = new Csset(`[d-col=${i}]`);
          result = result.intersection(s);
        }
      }

      return result.intersection(diamond);
    },
  },
];
