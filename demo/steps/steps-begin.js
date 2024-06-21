/* eslint-disable no-undef */
// @ts-nocheck

/** @type {import('./runner').Step[]} */
export const STEPS_BEGIN = [
  {
    comment: 'These are the cells with class quadrant-one',
    code: () => {
      return new Csset('.quadrant-one');
    },
  },
  {
    comment: 'These are the cells with class quadrant-two',
    code: () => {
      return new Csset('.quadrant-two');
    },
  },
  {
    comment: 'These are the cells with class quadrant-three',
    code: () => {
      return new Csset('.quadrant-three');
    },
  },
  {
    comment: 'These are the cells with class quadrant-four',
    code: () => {
      return new Csset('.quadrant-four');
    },
  },
  {
    comment: 'These are the cells with class circle',
    code: () => {
      return new Csset('.circle');
    },
  },
  {
    comment: 'These are the cells with class diamond',
    code: () => {
      return new Csset('.diamond');
    },
  },
  {
    comment: 'Cells also contain a d-row attribute with the row number they have',
    code: () => {
      return new Csset('[d-row=5]');
    },
  },
  {
    comment: 'And contain a d-col attribute with the column number they have',
    code: () => {
      return new Csset('[d-col=50]');
    },
  },
  {
    comment: 'Each cell of the grid has its number in a d-sum attribute',
    code: () => {
      return new Csset('[d-sum=50]');
    },
  },
  {
    comment: 'Add the cell has marked if its odd number',
    code: () => {
      return new Csset('[d-odd=true]');
    },
  },
  {
    comment: 'Or even number',
    code: () => {
      return new Csset('[d-even=true]');
    },
  },
];
