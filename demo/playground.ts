// Divide the grid in 4 quadrants
function markQuadrant(td: HTMLTableCellElement, row: number, col: number, size: number): void {
  const middle = Math.floor(size / 2);
  let quadrant = '';

  if (row < middle) {
    quadrant = col < middle ? 'one' : col > middle ? 'two' : '';
  } else if (row > middle) {
    quadrant = col < middle ? 'three' : col > middle ? 'four' : '';
  }

  if (quadrant) {
    td.classList.add(`quadrant-${quadrant}`);
  }
}

// Put a rhombus in the middle
function markRhombus(td: HTMLTableCellElement, row: number, col: number, size: number): void {
  const diff = row < size / 2 ? row : size - row - 1;
  const high = size / 2 + diff;
  const low = size / 2 - diff - 1;

  if (low <= col && col <= high) {
    td.classList.add('diamond');
  }
}

// Also a circle
function markCircle(td: HTMLTableCellElement, row: number, col: number, size: number): void {
  const radius = Math.floor(size / 2);
  const center = { x: radius, y: radius };
  const distance = Math.sqrt(Math.pow(Math.abs(center.x - col), 2) + Math.pow(Math.abs(center.y - row), 2));

  if (distance <= radius) {
    td.classList.add('circle');
  }
}

// man function which creates the playground grid
export function setPlayground(table: HTMLTableElement, size: number): void {
  for (let row = 0; row < size; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < size; col++) {
      const td = document.createElement('td');
      const sum = row * size + col;

      td.setAttribute('class', 'tile');
      td.setAttribute('d-row', `${row}`);
      td.setAttribute('d-col', `${col}`);
      td.setAttribute('d-sum', `${sum}`);
      td.setAttribute('d-odd', `${sum % 2 === 0}`);
      td.setAttribute('d-even', `${sum % 2 === 1}`);
      // td.innerText = `${sum}`;

      markQuadrant(td, row, col, size);
      markCircle(td, row, col, size);
      markRhombus(td, row, col, size);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}
