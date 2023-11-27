type FilterCallback = (row: Record<string, string>) => boolean;
type CompareEntries = (a: string, b: string) => number;
type CompareRows = (a: Record<string, string>, b: Record<string, string>) => number

type SortOptions = {
  column: string
  ascending: boolean
}

type ColumnConfiguration = {
  /**
   * The name of the column
   */
  name: string;
  /**
   * When set to a boolean it defines if the grid can (or cannot)
   * be sorted by that column
   * Default value is true.
   * 
   * Alternatively it can be set to a compare function that takes
   * two rows (a, b) as parameters and returns 0, >0, or <0. 
   * 
   * return value | sort order |
   * :----------- | ---------- |
   * \> 0         | sort a after b, e.g. b, a |
   * \< 0         | sort b after a, e.g. a, b |
   * === 0        | keep original order of a and b |
   * 
   */
  sort?: boolean | CompareEntries;
  /**
   * If the column should be displayed.
   * Defaults value is true.
   */
  visible?: boolean;
}

type Configuration = {
  /**
   * Contains the grid. Cannot have any child elements.
   */
  parent: HTMLElement
  /**
   * Defines the columns of the grid.
   */
  columns: Array<ColumnConfiguration | string>
  /**
   * Defines what is displayed in the cells of the table.
   * Default value is an empty array.
   * 
   * An array where each element is a row. Rows can be described using either
   * an array or an object.
   * 
   * - **array**: Defines the row as an array of strings. Each
   * string is a column and will be in the same order that the column headings
   * are defined in.
   * - **object**: Defines the row using key-value pairs. The key is the name of the
   * column as defined in the column configuration. The value is a string that is
   * displayed in the cell
   * 
   * Extra values or values with a key that doesn't match a column are ignored. If
   * additional columns are added later these values can still be displayed
   * 
   * Values that are not explicitly defined are set to an empty string.
   */
  data?: Array<Record<string, string> | Array<string>>
  /**
   * Defines how pagination functions in the grid.
   * Default value is false.
   * 
   * - **false**: pagination is disabled and all values are displayed
   * on a single page.
   * - **number**: defines how many rows are displayed per page.
   * Must be positive.
   */
  pagination?: false | number;
  /**
   * Defines conditions to hide or display certain rows
   * Default value is an empty string.
   * 
   * - **string**: only displays rows that have a cell that contains that string
   * - **FilterCallback**: a function that accepts a row as an argument and returns a boolean.
   * If true that row will be displayed, otherwise it will be hidden. The row
   * argument is an object where the keys are column names and the values are 
   * the entries in that column.
   */
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
   * functions and the data it contains.
   * @param config.parent The HTMLElement that contains the grid
   * @param config.columns The columns that the grid contains
   * @param config.data The data within the grid
   * @param config.pagination How the grid handles pagination
   * @param config.filter How the grid is filtered
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
  /**
   * Gets the currently displayed data, after filtering
   * sorting, and pagination are applied.
   * @returns An array of objects. Each element of the array is a single row.
   * The objects are key-value pairs where the key is the name of a column and
   * the value is what is in that cell.
   */
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
  /**
   * Defines conditions to hide or display certain rows 
   * @param filter How to filter the data 
   * 
   * - **string**: Only displays rows that have a cell that contains
   * that string
   * - **FilterCallback**: a function that accepts a row as an argument and returns a boolean.
   * If true that row will be displayed, otherwise it will be hidden. The row
   * argument is an object where the keys are column names and the values are 
   * the entries in that column.
   */
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