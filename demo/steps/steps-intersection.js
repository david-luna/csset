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
];
