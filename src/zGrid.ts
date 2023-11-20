type zGrid = {
  getRow: (r: number) => Record<string, string>;
  getData: () => void;
  getPage: () => number;
  setPage: (n: number) => void;
  setFilter: () => void;
  render: () => void
}

let a: string | object;
let b = "this is a string"
if (typeof a === 'string') {
  b.includes(a)
}


type FilterCallback = (row: Record<string, string>) => boolean;
type CompareEntries = (a: string, b: string) => number;
type CompareRows = (a: Record<string, string>, b: Record<string, string>) => number

type SortOptions = {
  column: string
  ascending: boolean
}

type ColumnConfiguration = {
  name: string;
  sort: boolean | CompareEntries;
  hide: boolean;
}

type Configuration = {
  parent: HTMLElement
  columns: Array<ColumnConfiguration> | Array<string>
  data?: Array<Record<string, string>> | Array<Array<string>>
  pagination?: false | number;
  filter?: string | FilterCallback;
}

type InternalConfiguration = {
  parent: HTMLElement;
  columns: Array<ColumnConfiguration>;
  data: Array<Record<string, string>>
  pagination: false | number;
  filter: string | FilterCallback
  sort: false | SortOptions | CompareRows
}

export default function createzGrid(args: Configuration): zGrid {
  
  let currentPage = 1;

  function configureParent(): HTMLElement {
    if (args.parent === null) {
      throw new TypeError('Parent cannot be null');
    } else if (args.parent === undefined) {
      throw new TypeError('Parent cannot be undefined');
    } else if (!(args.parent instanceof HTMLElement)) {
      throw new TypeError('Parent must be HTMLElement');
    } else if (args.parent.hasChildNodes()) {
      throw new TypeError('Parent must not have child nodes');
    }
    return args.parent;
  }

  function configureColumns(): Array<ColumnConfiguration> {
    if (args.columns === null) {
      throw new TypeError('Columns cannot be null');
    } else if (args.columns === undefined) {
      throw new TypeError('Columns cannot be undefined');
    } else if (!Array.isArray(args.columns)) {
      throw new TypeError('Columns must be array or object');
    } else if (args.columns.length < 1) {
      throw new Error('Columns length must be at least 1');
    }
    let columns: Array<ColumnConfiguration> = [];
    columns = args.columns.map((e) => {
      let col: ColumnConfiguration;
      if (typeof e === 'string') {
        col = {
          name: e,
          sort: true,
          hide: false
        }
      } else if (typeof e === 'object') {
        if (e.name === undefined) {
          throw new TypeError('Column requires a name');
        }
        col = {
          name: e.name,
          sort: e.sort === undefined ? true : e.sort,
          hide: e.hide === undefined ? false : e.hide,
        }
      }
      return col;
    });
    return columns;
  }

  function configureData(columns: Array<ColumnConfiguration>): Array<Record<string, string>> {
    let data: Array<Record<string, string>>
    if (!Array.isArray(args.data)) {
      throw new TypeError('Data must be an array');
    }

    data = args.data.map((e) => {
      let row: Record<string, string>;
      if (Array.isArray(e)) {
        columns.forEach((c, i) => {
          row[c.name] = e[i];
        });
      } else if (typeof e === 'object') {
        row = { ...e };
      } else {
        throw new TypeError('Data elements must be string or object');
      }
      return row;
    });
    return data;
  }

  function configurePagination(): false | number {
    let pagination: false | number;
    if (!args.pagination) {
      pagination = false;
    } else if (typeof args.pagination === 'number' && args.pagination > 0) {
      pagination = args.pagination;
    } else {
      throw new TypeError('Pagination must be a number greater than 0');
    }
    return pagination;
  }

  function configureFilter(): string | FilterCallback {
    let filter: string | FilterCallback;
    if (!args.filter) {
      filter = '';
    } else if (typeof args.filter === 'string' || typeof args.filter === 'function') {
      configuration.filter = filter;
    } else {
      throw new TypeError('Filter must be a string or function');
    }
    return filter;
  }

  let columns = configureColumns()

  let configuration: InternalConfiguration = {
    parent: configureParent(),
    columns: columns,
    pagination: configurePagination(),
    data: configureData(columns),
    filter: configureFilter(),
    sort: false,
  };
  // obj.getColumn = function (index) {
  //   if (index < 0) {
  //     throw new RangeError('index cannot be less than zero');
  //   } else if (index >= configuration.columns.length) {
  //     throw new RangeError(
  //       'index cannot be greater than or equal to the number of columns'
  //     );
  //   }
  //   return {
  //     name: configuration.columns[index].name,
  //     sort: configuration.columns[index].sort,
  //     hidden: configuration.columns[index].hidden,
  //   };
  // };

  let getRow = function (index: number): Record<string, string>  {
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

  let getData = function (): Array<Record<string, string>> {
    let ret: Array<Record<string, string>> = [];
    let page = [];
    let filtered: Array<Record<string, string>> = [];
    // filter
    if (configuration.filter) {
      if (typeof configuration.filter === 'string') {
        let filter = configuration.filter
        filtered = configuration.data.filter((r) => {
          return configuration.columns.some((c) =>
            r[c.name].includes(filter)
          );
        });
      } else if (typeof configuration.filter === 'function') {
        let filter = configuration.filter
        filtered = configuration.data.filter((r) => {
          let entry: Record<string, string>;
          configuration.columns.forEach((c) => (entry[c.name] = r[c.name]));
          return filter(entry);
        });
      }
    } else {
      filtered = configuration.data;
    }
    // sorting
    if (configuration.sort) {
      if (typeof configuration.sort === 'function') {
        filtered.sort(configuration.sort);
      } else if (typeof configuration.sort === 'object') {
        let col_name = configuration.sort.column;
        let col_config = configuration.columns.find((e) => e.name === col_name);
        if (typeof col_config.sort === 'function') {
          let col_sort = col_config.sort;
          filtered.sort((a, b) => col_sort(a[col_name], b[col_name]));
        } else {
          filtered.sort((a, b) => a[col_name].localeCompare(b[col_name]));
        }

        if (!configuration.sort.ascending) filtered.reverse();
      }
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

  let currentPage = function () {
    return currentPage;
  };

  let setPage = function (page) {
    if (!(typeof page === 'number' && page > 0)) {
      throw new TypeError('Page must be a postive number');
    }
    currentPage = page;
  };

  let setFilter = function (filter) {
    configureFilter(filter);
  };

  let sort = function (column, ascending) {
    if (column === undefined && ascending === undefined) {
      configuration.sort = false;
    } else if (typeof column === 'function') {
      configuration.sort = column;
    } else {
      let col = configuration.columns.find((e) => e.name === column);
      if (col === undefined) {
        throw new RangeError(`No column named '${column}'`);
      } else if (ascending && typeof ascending !== 'boolean') {
        throw new TypeError('Ascending must be boolean');
      } else {
        configuration.sort = {
          column: column,
          ascending: ascending === undefined ? true : ascending,
        };
      }
    }
  };

  let render = function () {
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

  let obj: zGrid = {
    getRow, getData, getPage, setPage, setFilter, render
  };
  return obj;
}
