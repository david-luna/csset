/* eslint-disable no-undef */

import { Csset } from '../lib/csset.js';
import { setPlayground } from './playground.js';
import { STEPS, runStep } from './steps/index.js';

window.Csset = Csset;

// Where to put step info
const styleArea = document.querySelector('#style');
const codeArea = document.querySelector('#code');
// Control
const nextButton = document.querySelector('#next');

// Prepare the playground
// Size MUST be odd number
const playgroundSize = 51;
const playground = document.querySelector('#playground');
setPlayground(playground, playgroundSize);

let index = 0;

nextButton.addEventListener('click', () => {
  if (nextButton.innerText === 'Restart') {
    window.location.reload();
    return;
  }

  const step = STEPS[index++];

  // Put comment and display snippet
  runStep(step, codeArea, styleArea);
  Prism.highlightElement(codeArea);
  // Prism.highlightAll();

  if (index >= STEPS.length) {
    nextButton.innerText = 'Restart';
  }
});
