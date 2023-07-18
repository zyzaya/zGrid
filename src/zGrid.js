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
      return col;
    });
  }

  function configureData() {
    if (!Array.isArray(args.data)) {
      throw new TypeError('Data must be an array');
    }

    configuration.data = args.data.map((e) => {
      let row = {};
      if (typeof e === 'string') {
      } else if (typeof e === 'object') {
      } else {
        throw new TypeError('Data elements must be string or object');
      }
    });
  }

  configureParent();
  configureColumns();
  configureData();

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
    if (index < 0) {
      throw new RangeError('index cannot be less than zero');
    } else if (index >= configuration.columns.length) {
      throw new RangeError(
        'index cannot be greater than or equal to the number of columns'
      );
    }
    return {
      name: configuration.columns[index].name,
      sorting: configuration.columns[index].sorting,
      hidden: configuration.columns[index].hidden,
    };
  };

  obj.getRow = function (index) {
    if (index < 0) {
      throw new RangeError('index cannot be less than zero');
    } else if (index >= configuration.data.length) {
      throw new RangeError(
        'index cannot be greater than or equal to the number of rows'
      );
    }
    return {
      ...configuration.data[index],
    };
  };

  return obj;
}
