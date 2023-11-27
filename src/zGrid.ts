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
  visible: boolean;
}

type Configuration = {
  parent: HTMLElement
  columns: Array<ColumnConfiguration | string>
  data?: Array<Record<string, string> | Array<string>>
  pagination?: false | number;
  filter?: string | FilterCallback;
}

export default class zGrid {
  private currentPage = 1;
  private parent: HTMLElement;
  private columns: Array<ColumnConfiguration>;
  private data: Array<Record<string, string>>;
  private pagination: false | number;
  private filter: string | FilterCallback;
  private sortConfig: false | SortOptions | CompareRows;

  /**
   * 
   * @param {Configuration} config 
   * A configuration object defining how the grid 
   * functions and the data it contains. It contains the following options:
   * @param config.parent
   * An HTMLElement that is the container to the grid.
   * It cannot have any child elements.
   * @param config.columns
   * An array defining the columns. Elements of the array can be a string,
   * representing the columns names. Or an object with the following properties: 
   * name - a string that is the column name
   * sort - undefined or a compare function describing how the column should be sorted
   * visible - a boolean describing if the column is displayed. Defaults to true.
   */
  constructor(config: Configuration) {
    this.parent = this.configureParent(config);
    this.columns = this.configureColumns(config);
    this.data = this.configureData(config);
    this.pagination = this.configurePagination(config);
    this.filter = this.configureFilter(config);
  }

  private configureParent(args: Configuration): HTMLElement {
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

  private configureColumns(args: Configuration): Array<ColumnConfiguration> {
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
          visible: true
        }
      } else if (typeof e === 'object') {
        if (e.name === undefined) {
          throw new TypeError('Column requires a name');
        }
        col = {
          name: e.name,
          sort: e.sort === undefined ? true : e.sort,
          visible: e.visible === undefined ? true : e.visible,
        }
      }
      return col;
    });
    return columns;
  }

  private configureData(args: Configuration): Array<Record<string, string>> {
    let data: Array<Record<string, string>>
    if (!Array.isArray(args.data)) {
      throw new TypeError('Data must be an array');
    }

    data = args.data.map((e) => {
      let row: Record<string, string> = {};
      if (Array.isArray(e)) {
        this.columns.forEach((c, i) => {
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

  private configurePagination(args: Configuration): false | number {
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

  private configureFilter(args: Configuration): string | FilterCallback {
    let filter: string | FilterCallback;
    if (!args.filter) {
      filter = '';
    } else if (typeof args.filter === 'string' || typeof args.filter === 'function') {
      filter = args.filter;
    } else {
      throw new TypeError('Filter must be a string or function');
    }
    return filter;
  }

  public getRow(index: number): Record<string, string>  {
    if (index < 0) {
      throw new RangeError('index cannot be less than zero');
    } else if (index >= this.data.length) {
      throw new RangeError(
        'index cannot be greater than or equal to the number of rows'
      );
    }
    return {
      ...this.data[index],
    };
  };

  public getData(): Array<Record<string, string>> {
    let ret: Array<Record<string, string>> = [];
    let page = [];
    let filtered: Array<Record<string, string>> = [];
    // filter
    if (this.filter) {
      if (typeof this.filter === 'string') {
        let filter = this.filter
        filtered = this.data.filter((r) => {
          return this.columns.some((c) =>
            r[c.name].includes(filter)
          );
        });
      } else if (typeof this.filter === 'function') {
        let filter = this.filter
        filtered = this.data.filter((r) => {
          let entry: Record<string, string> = {};
          this.columns.forEach((c) => (entry[c.name] = r[c.name]));
          return filter(entry);
        });
      }
    } else {
      filtered = this.data;
    }
    // sorting
    if (this.sortConfig) {
      if (typeof this.sortConfig === 'function') {
        filtered.sort(this.sortConfig);
      } else if (typeof this.sortConfig === 'object') {
        let col_name = this.sortConfig.column;
        let col_config = this.columns.find((e) => e.name === col_name);
        if (typeof col_config.sort === 'function') {
          let col_sort = col_config.sort;
          filtered.sort((a, b) => col_sort(a[col_name], b[col_name]));
        } else {
          filtered.sort((a, b) => a[col_name].localeCompare(b[col_name]));
        }
        if (!this.sortConfig.ascending) filtered.reverse();
      }
    }
    // pagination
    if (this.pagination) {
      let start = (this.currentPage - 1) * this.pagination;
      let end = start + this.pagination;
      page = filtered.slice(start, end);
    } else {
      page = filtered;
    }
    page.forEach((e, i) => {
      ret.push({ ...e });
    });
    return ret;
  };

  get page() {
    return this.currentPage;
  };

  set page(page: number) {
    if (!(typeof page === 'number' && page > 0)) {
      throw new TypeError('Page must be a postive number');
    }
    this.currentPage = page;
  };

  public setFilter(filter?: string | FilterCallback) {
    let f = filter === undefined ? '' : filter;
    if (typeof filter === 'string' || typeof filter === 'function') {
      this.filter = f;
    } else {
      throw new TypeError('Filter must be a string or function')
    }
  };

  /**
   * Clears any existing sort.
   */
  public sort(): void;
  /**
   * Clears any existing sort when sort is set to false.
   * @param sort
   */
  public sort(sort: false): void;
  /**
   * Defines a compare function to sort the data by.
   * @param sort 
   */
  public sort(sort: CompareRows): void;
  /**
   * Sorts the data by the named column
   * @param {string} column The name of the column to sort by.
   */
  public sort(column: string): void;
  /**
   * Sorts the data by the named column
   * @param column The name of the column to sort by.
   * @param ascending Whether to sort in ascending or descending order. 
   */
  public sort(column: string, ascending: boolean): void;
  public sort(column?: string | false | CompareRows, ascending: boolean = true) {
    if (column == undefined || column == false) {
      this.sortConfig = false;
    } else if (typeof column === 'function') {
      this.sortConfig = column;
    } else {
      let col = this.columns.find((e) => e.name === column);
      if (col === undefined) {
        throw new RangeError(`No column named '${column}'`);
      } else if (ascending && typeof ascending !== 'boolean') {
        throw new TypeError('Ascending must be boolean');
      } else {
        this.sortConfig = {
          column: column,
          ascending: ascending,
        };
      }
    }
  };

  public render() {
    let table = document.createElement('table');
    let head = document.createElement('thead');
    let body = document.createElement('tbody');
    let headerRow = document.createElement('tr');
    this.columns.forEach((c) => {
      let title = document.createElement('th');
      title.innerText = c.name;
      headerRow.appendChild(title);
    });
    head.appendChild(headerRow);
    table.appendChild(head);
    // add data
    console.log(this.data)
    this.data.forEach((d) => {
      let row = document.createElement('tr');
      this.columns.forEach((c) => {
        let cell = document.createElement('td');
        cell.innerText = d[c.name];
        row.appendChild(cell);
      });
      body.appendChild(row);
    });
    table.appendChild(body);

    this.parent.appendChild(table);
  };
}