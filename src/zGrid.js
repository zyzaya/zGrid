export default function zGrid(args) {
  // columns = ['name1', 'name2', 'etc']
  // data = [[], [], []]
  // create html table with columns as defined by configuration.columns
  let configuration = {};
  let table = document.createElement('table');
  let head = document.createElement('thead');
  let body = document.createElement('tbody');
  let headerRow = document.createElement('tr');
  // configuration
  function configureParent() {
    if (args.parent === null) {
      throw new TypeError('Parent cannot be null');
    } else if (args.parent === undefined) {
      throw new TypeError('Parent cannot be undefined');
    } else if (!(args.parent instanceof HTMLElement)) {
      throw new TypeError('Parent must be HTMLElement');
    } else if (args.parent.hasChildNodes()) {
      throw new TypeError('Parent must not have child nodes');
    }
  }

  function configureColumns() {
    if (args.columns === null) {
      throw new TypeError('Columns cannot be null');
    } else if (args.columns === undefined) {
      throw new TypeError('Columns cannot be undefined');
    } else if (!Array.isArray(args.columns)) {
      throw new TypeError('Columns must be array or object');
    } else if (args.columns.length < 1) {
      throw new Error('Columns length must be at least 1');
    }

    configuration.columns = args.columns.map((e) => {
      let col = {};
      if (typeof e === 'string') {
        col.name = e;
        col.sorting = true;
        col.hidden = false;
      } else if (typeof e === 'object') {
        if (e.name === undefined) {
          throw new TypeError('Column requires a name');
        }
        col.name = e.name;
        col.sorting = e.sorting === undefined ? true : e.sorting;
        col.hidden = e.hidden === undefined ? false : e.hidden;
      }
    });
  }
  // columns

  configureParent();
  configureColumns();

  // configuration.columns.forEach((c) => {
  //   let title = document.createElement('th');
  //   title.innerText = c;
  //   headerRow.appendChild(title);
  // });
  // head.appendChild(headerRow);
  // table.appendChild(head);
  // // add data
  // configuration.data.forEach((d) => {
  //   let row = document.createElement('tr');
  //   d.forEach((c) => {
  //     let cell = document.createElement('td');
  //     cell.innerText = c;
  //     row.appendChild(cell);
  //   });
  //   body.appendChild(row);
  // });
  // table.appendChild(body);

  // configuration.parent.appendChild(table);
  let obj = {};

  obj.getColumn = function (index) {
    console.log(configuration.columns);
  };

  return obj;
}
