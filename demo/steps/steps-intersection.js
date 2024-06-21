/* eslint-disable no-undef */
// @ts-nocheck

/** @type {import('./runner').Step[]} */
export const STEPS_INTERSECTION = [
  {
    comment: 'Intersection returns a set which all elements are from both sets',
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const rhombus = new Csset('.rhombus');

      return quadrantOne.intersection(rhombus);
    },
  },
];
