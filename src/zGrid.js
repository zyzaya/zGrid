export default function zGrid(configuration) {
  // columns = ['name1', 'name2', 'etc']
  // data = [[], [], []]
  // create html table with columns as defined by configuration.columns
  let table = document.createElement('table');
  let head = document.createElement('thead');
  let body = document.createElement('tbody');
  let headerRow = document.createElement('tr');
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
