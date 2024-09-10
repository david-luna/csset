/* eslint-disable no-undef */

/** @type {import('./runner').Step[]} */
export const STEPS_INTERSECTION = [
  {
    // eslint-disable-next-line prettier/prettier
    comments: [
      'Time to move to another common operation in sets which is',
      'the intersection operation.',
    ],
  },
  {
    comments: ['Intersection returns a set which all elements are', 'from both sets'],
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const diamond = new Csset('.diamond');

      return quadrantOne.intersection(diamond);
    },
  },
  {
    comments: ['This is another example of intersection'],
    code: () => {
      const quadrantOne = new Csset('.quadrant-four');
      const diamond = new Csset('.circle');

      return quadrantOne.intersection(diamond);
    },
  },
  {
    comments: ['Like unions you can calculate intersection for', 'more than two sets'],
    code: () => {
      const quadrantOne = new Csset('.quadrant-one');
      const even = new Csset('[d-even=true]');
      const diamond = new Csset('.diamond');

      return quadrantOne.intersection(even).intersection(diamond);
    },
  },
];
