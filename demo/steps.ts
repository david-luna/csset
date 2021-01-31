interface Step {
  comment: string;
  code: () => unknown;
}

declare var createSet: (selector: string) => unknown;

export const STEPS: Step[] = [
  {
    comment: "These are the cells with class quadrant-one",
    code: () => {
      return createSet('.quadrant-one');
    }
  },
  {
    comment: "These are the cells with class quadrant-two",
    code: () => {
      return createSet('.quadrant-two');
    }
  },
  {
    comment: "These are the cells with class quadrant-three",
    code: () => {
      return createSet('.quadrant-three');
    }
  },
  {
    comment: "These are the cells with class quadrant-four",
    code: () => {
      return createSet('.quadrant-four');
    }
  },
  {
    comment: "These are the cells with class circle",
    code: () => {
      return createSet('.circle');
    }
  },
  {
    comment: "These are the cells with class diamond",
    code: () => {
      return createSet('.diamond');
    }
  },
  {
    comment: "Cells also contain a d-row attribute with the row number they have",
    code: () => {
      return createSet('[d-row=5]');
    }
  },
  {
    comment: "And contain a d-col attribute with the column number they have",
    code: () => {
      return createSet('[d-col=50]');
    }
  },
  {
    comment: "Each cell of the grid has its number in a d-sum attribute",
    code: () => {
      return createSet('[d-sum=50]');
    }
  },
  {
    comment: "Add the cell has marked if its odd number",
    code: () => {
      return createSet('[d-odd=true]');
    }
  },
  {
    comment: "Or even number",
    code: () => {
      return createSet('[d-even=true]');
    }
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

  const source = step.code.toString();
  const cssSet = eval(`(${source})()`);
  const styleText = `${cssSet}{ background-color: ${getRandomColor()}; }`;

  const linesOfCode = source.split('\n').slice(1, -1).map(line => {
    return line.replace(/return /g, '').replace(/createSet/g, 'new Csset');
  });

  codeElem.innerText = linesOfCode.join('\n');
  styeElem.innerText = styleText;

}
