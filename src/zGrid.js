export default function zGrid(args) {
  let configuration = {};
  let currentPage = 1;
  let filter = '';
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
    configuration.parent = args.parent;
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
      if (Array.isArray(e)) {
        configuration.columns.forEach((c, i) => {
          row[c.name] = e[i];
        });
      } else if (typeof e === 'object') {
        row = { ...e };
      } else {
        throw new TypeError('Data elements must be string or object');
      }
      return row;
    });
  }

  function configurePagination() {
    if (!args.pagination) {
      configuration.pagination = false;
    } else if (typeof args.pagination === 'number' && args.pagination > 0) {
      configuration.pagination = args.pagination;
    } else {
      throw new TypeError('Pagination must be a number greater than 0');
    }
  }

  function configureFilter(filter) {
    if (!filter) {
      configuration.filter = '';
    } else if (typeof filter === 'string' || typeof filter === 'function') {
      configuration.filter = filter;
    } else {
      throw new TypeError('Filter must be a string or function');
    }
  }

  configureParent();
  configureColumns();
  configureData();
  configurePagination();
  configureFilter(args.filter);

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

  obj.getData = function () {
    let ret = [];
    let page = [];
    let filtered = [];
    // filter
    if (configuration.filter) {
      if (typeof configuration.filter === 'string') {
        filtered = configuration.data.filter((r) => {
          return Object.entries(r).some((e) =>
            e[1].includes(configuration.filter)
          );
        });
      } else if (typeof configuration.filter === 'function') {
        filtered = configuration.data.filter((r) =>
          configuration.filter({ ...r })
        );
      }
    } else {
      filtered = configuration.data;
    }
    // pagination
    if (configuration.pagination) {
      let start = (currentPage - 1) * configuration.pagination;
      let end = start + configuration.pagination;
      page = filtered.slice(start, end);
    } else {
      page = filtered;
    }
    page.forEach((e, i) => {
      ret.push({ ...e });
    });
    return ret;
  };

  obj.currentPage = function () {
    return currentPage;
  };

  obj.setPage = function (page) {
    if (!(typeof page === 'number' && page > 0)) {
      throw new TypeError('Page must be a postive number');
    }
    currentPage = page;
  };

  obj.setFilter = function (filter) {
    configureFilter(filter);
  };

  obj.sort = function (column, ascending) {
    if (column === undefined && ascending === undefined) {
      configuration.sort = false;
    } else {
      let col = configuration.columns.find((e) => e.name === column);
      if (col === undefined) {
        throw new RangeError(`No column named '${column}'`);
      } else if (ascending && typeof ascending !== 'boolean') {
        throw new TypeError('Ascending must be boolean');
      } else {
        configuration.sort = {
          column: column,
          ascending: ascending === undefined ? false : ascending,
        };
      }
    }
  };

  obj.render = function () {
    let table = document.createElement('table');
    let head = document.createElement('thead');
    let body = document.createElement('tbody');
    let headerRow = document.createElement('tr');
    configuration.columns.forEach((c) => {
      let title = document.createElement('th');
      title.innerText = c.name;
      headerRow.appendChild(title);
    });
    head.appendChild(headerRow);
    table.appendChild(head);
    // add data
    configuration.data.forEach((d) => {
      let row = document.createElement('tr');
      configuration.columns.forEach((c) => {
        let cell = document.createElement('td');
        cell.innerText = d[c.name];
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
    table.appendChild(body);

    configuration.parent.appendChild(table);
  };

  return obj;
}
