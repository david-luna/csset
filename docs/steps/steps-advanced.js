/* eslint-disable no-undef */

/** @type {import('./runner').Step[]} */
export const STEPS_ADVANCED = [
  {
    // eslint-disable-next-line prettier/prettier
    comments: [
      'Now that we saw the basics we can go for more advanced',
      'examples.',
    ],
  },
  {
    comments: ['You can combine union and instersections'],
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const quadrantFour = new Csset('.quadrant-four');
      const circle = new Csset('.circle');

      return quadrantOne.union(quadrantFour).intersection(circle);
    },
  },
];
