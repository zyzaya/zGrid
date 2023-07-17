export default function zGrid(configuration) {
  // columns = ['name1', 'name2', 'etc']
  // data = [[], [], []]
  // create html table with columns as defined by configuration.columns
  let table = document.createElement('table');
  let head = document.createElement('thead');
  let body = document.createElement('tbody');
  let headerRow = document.createElement('tr');
  // configuration
  if (configuration.parent === null) {
    throw new TypeError('Parent cannot be null');
  } else if (configuration.parent === undefined) {
    throw new TypeError('Parent cannot be undefined');
  } else if (!(configuration.parent instanceof HTMLElement)) {
    throw new TypeError('Parent must be HTMLElement');
  } else if (configuration.parent.hasChildNodes()) {
    throw new TypeError('Parent must not have child nodes');
  }
  // columns
  if (configuration.columns === null) {
    throw new TypeError('Columns cannot be null');
  } else if (configuration.columns === undefined) {
    throw new TypeError('Columns cannot be undefined');
  } else if (
    !(
      Array.isArray(configuration.columns) ||
      typeof configuration.columns !== 'object'
    )
  ) {
    throw new TypeError('Columns must be array or object');
  } else if (configuration.columns.length < 1) {
    throw new Error('Columns length must be at least 1');
  }
  configuration.columns.forEach((c) => {
    let title = document.createElement('th');
    title.innerText = c;
    headerRow.appendChild(title);
  });
  head.appendChild(headerRow);
  table.appendChild(head);
  // add data
  configuration.data.forEach((d) => {
    let row = document.createElement('tr');
    d.forEach((c) => {
      let cell = document.createElement('td');
      cell.innerText = c;
      row.appendChild(cell);
    });
    body.appendChild(row);
  });
  table.appendChild(body);

  configuration.parent.appendChild(table);
  let obj = {};

  return obj;
}
