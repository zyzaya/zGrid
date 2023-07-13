export default function zGrid(configuration) {
  // columns = ['name1', 'name2', 'etc']
  // data = [[], [], []]
  // create html table with columns as defined by configuration.columns
  let table = document.createElement('table');
  let head = document.createElement('thead');
  let body = document.createElement('tbody');
  let headerRow = document.createElement('tr');
  configuration.columns.forEach((c) => {
    let title = document.createElement('td');
    title.innerText = c;
    headerRow.appendChild(title);
  });
  head.appendChild(headerRow);
  table.appendChild(head);
  // add data
  // configuration.data.forEach((d))

  let obj = {};

  return obj;
}
