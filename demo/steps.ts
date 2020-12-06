interface Step {
  comment: string;
  snippet: string;
}

export const STEPS: Step[] = [
  {
    comment: "These are the cells with class quadrant-one",
    snippet: `return createSet('.quadrant-one')`,
  },
  {
    comment: "These are the cells with class quadrant-two",
    snippet: `return createSet('.quadrant-two')`,
  },
  {
    comment: "These are the cells with class quadrant-three",
    snippet: `return createSet('.quadrant-three')`,
  },
  {
    comment: "These are the cells with class quadrant-four",
    snippet: `return createSet('.quadrant-four')`,
  },
  {
    comment: "These are the cells with class circle",
    snippet: `return createSet('.circle')`,
  },
  {
    comment: "These are the cells with class diamond",
    snippet: `return createSet('.diamond')`,
  },
  {
    comment: "Cells also contain a d-row attribute with the row number they have",
    snippet: `return createSet('[d-row=5]')`,
  },
  {
    comment: "And contain a d-col attribute with the column number they have",
    snippet: `return createSet('[d-col=50]')`,
  },
  {
    comment: "Each cell of the grid has its number in a d-sum attribute",
    snippet: `return createSet('[d-sum=50]')`,
  },
  {
    comment: "Add the cell has marked if its odd number",
    snippet: `return createSet('[d-odd=true]')`,
  },
  {
    comment: "Or even number",
    snippet: `return createSet('[d-even=true]')`,
  },
];

function getRandomColor(): string {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function executeStep(
  step: Step,
  commentElem: HTMLElement,
  codeElem: HTMLElement,
  styeElem: HTMLElement
): void {
  // Put comment and display snippet
  commentElem.innerText = step.comment;
  codeElem.innerText = step.snippet.replace(/return /g, '').replace(/createSet/g, 'new Csset');

  // Execute and override styles
  const source = `(function (){${step.snippet}})()`;
  const cssSet = eval(source);
  const styleText = `${cssSet}{ background-color: ${getRandomColor()}; }`;


  styeElem.innerText = styleText;
}
