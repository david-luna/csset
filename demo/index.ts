import { Csset } from '../src/csset';
import { setPlayground } from './playground';
import { STEPS, runStep } from './steps';

declare var hljs: any;

(window as any).Csset = Csset;
// (window as any).createSet = (sel: string) => new Csset(sel);

// Where to put step info
const commentArea = document.querySelector('#comment') as HTMLParagraphElement;
const styleArea = document.querySelector('#style') as HTMLStyleElement;
const codeArea = document.querySelector('#code') as HTMLPreElement;
// Control
const nextButton = document.querySelector('#next') as HTMLButtonElement;


// Prepare the playground
// Size MUST be odd number
const playgroundSize = 101;
const playground = document.querySelector('#playground');
setPlayground(playground as HTMLTableElement, playgroundSize);

let index = 0;

nextButton.addEventListener('click', () => {
  if (nextButton.innerText === 'Restart') {
    window.location.reload();
    return;
  }

  const step = STEPS[index++];

  // Put comment and display snippet
  runStep(step, commentArea, codeArea, styleArea);
  hljs.highlightBlock(codeArea);

  if (index >= STEPS.length) {
    nextButton.innerText = 'Restart';
  }
});