/**
 * @typedef {Object} Step
 * @property {string[]} comments
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
export function runStep(step, codeElem, styeElem) {
  // Reset the style element
  styeElem.innerText = '';

  // Get comments
  const snippet = step.comments.map((c) => `// ${c}`);

  // Add code & execute
  const source = step.code?.toString();
  if (source) {
    const src = source.split('\n').map((line, idx) => {
      return idx > 0 ? line.replace('    ', '') : line;
    });
    snippet.push(...src);

    // Change color if returned expression is a Csset
    const evalResult = eval(`(${source})()`);
    const styleText = `${evalResult}{ background-color: ${getRandomColor()}; }`;

    if (isCsset(evalResult)) {
      styeElem.innerText = styleText;
      snippet.push(`\n// selector: ${evalResult}`);
    }
    // else {
    //   styeElem.innerText = '';
    // }
  }
  // Add snipped into code window & highlight
  codeElem.innerHTML = snippet.join('\n');
  // eslint-disable-next-line no-undef
  Prism.highlightElement(codeElem);
}
