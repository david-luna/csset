/**
 * @typedef {Object} Step
 * @property {string} comment
 * @property {() => unknown} code
 */

/**
 * @returns {string}
 */
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * @param {any} source
 * @returns {boolean}
 */
function isCsset(source) {
  return source?.__proto__?.constructor?.name === 'Csset';
}

/**
 * @param {Step} step
 * @param {HTMLElement} commentElem
 * @param {HTMLElement} codeElem
 * @param {HTMLElement} styeElem
 */
// eslint-disable-next-line prettier/prettier
export function runStep(step, commentElem, codeElem, styeElem) {
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
