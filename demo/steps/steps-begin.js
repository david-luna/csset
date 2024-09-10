/* eslint-disable no-undef */

/** @type {import('./runner').Step[]} */
export const STEPS_BEGIN = [
  {
    comments: [
      'Welcome to Csset demo page!',
      '',
      'The following snippets will show you how to use the',
      'library and the table on the left will display a visual',
      'representation of the results of the different set',
      'operations.',
    ],
  },
  {
    comments: ['These are the cells with class quadrant-one'],
    code: () => {
      return new Csset('.quadrant-one');
    },
  },
  {
    comments: ['These are the cells with class quadrant-two'],
    code: () => {
      return new Csset('.quadrant-two');
    },
  },
  {
    comments: ['These are the cells with class quadrant-three'],
    code: () => {
      return new Csset('.quadrant-three');
    },
  },
  {
    comments: ['These are the cells with class quadrant-four'],
    code: () => {
      return new Csset('.quadrant-four');
    },
  },
  {
    comments: ['These are the cells with class circle'],
    code: () => {
      return new Csset('.circle');
    },
  },
  {
    comments: ['These are the cells with class diamond'],
    code: () => {
      return new Csset('.diamond');
    },
  },
  {
    comments: ['Cells also contain a d-row attribute with the', 'row number they have'],
    code: () => {
      return new Csset('[d-row=5]');
    },
  },
  {
    comments: ['And contain a d-col attribute with the', 'column number they have'],
    code: () => {
      return new Csset('[d-col=50]');
    },
  },
  {
    comments: ['Each cell of the grid has its number in a d-sum attribute'],
    code: () => {
      return new Csset('[d-sum=50]');
    },
  },
  {
    comments: ['Add the cell has marked if its odd number'],
    code: () => {
      return new Csset('[d-odd=true]');
    },
  },
  {
    comments: ['Or even number'],
    code: () => {
      return new Csset('[d-even=true]');
    },
  },
];
