import { Step } from './types';

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function isCsset(source: any): boolean {
  return source?.__proto__?.constructor?.name === 'Csset';
}

// eslint-disable-next-line prettier/prettier
export function runStep(
  step: Step,
  commentElem: HTMLElement,
  codeElem: HTMLElement,
  styeElem: HTMLElement
): void {
  // Put comment
  commentElem.innerText = step.comment;

  // Show code
  const source = step.code.toString();
  const linesOfCode = source
    .split('\n')
    .slice(1, -1)
    .map((line) => {
      return line.replace(/return /g, '');
    });

  codeElem.innerText = linesOfCode.join('\n');

  // Change color if returned expression is a Csset
  const evalResult = eval(`(${source})()`);
  const styleText = `${evalResult}{ background-color: ${getRandomColor()}; }`;

  if (isCsset(evalResult)) {
    styeElem.innerText = styleText;
  } else {
    styeElem.innerText = '';
  }
}
