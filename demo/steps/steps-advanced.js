/* eslint-disable no-undef */

/** @type {import('./runner').Step[]} */
export const STEPS_ADVANCED = [
  {
    comment: 'You can combine union and instersections',
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const quadrantFour = new Csset('.quadrant-four');
      const circle = new Csset('.circle');

      return quadrantOne.union(quadrantFour).intersection(circle);
    },
  },
];
