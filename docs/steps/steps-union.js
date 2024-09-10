/* eslint-disable no-undef */

/** @type {import('./runner').Step[]} */
export const STEPS_UNION = [
  {
    // eslint-disable-next-line prettier/prettier
    comments: [
      'Now that we are familiar with the playground let\'s see',
      'the union operation.',
    ],
  },
  {
    comments: ['Union is a straight forward method used to join sets'],
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const quadrantTwo = new Csset('.quadrant-two');

      return quadrantOne.union(quadrantTwo);
    },
  },
  {
    comments: ['You can do an union of many sets'],
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const quadrantTwo = new Csset('.quadrant-two');
      const circle = new Csset('.circle');

      return quadrantOne.union(quadrantTwo).union(circle);
    },
  },
];
