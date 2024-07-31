import CustomClassNames from "./CustomClassNames";
import CustomDataAttributes from "./CustomDataAttributes";
import Filter from "./Filter";
import HeaderCell from "./HeaderCell";
import Pages from "./Pages";

type FilterCallback = (row: Record<string, string>) => boolean;
type CompareEntries = (a: string, b: string) => number;
type CompareRows = (a: Record<string, string>, b: Record<string, string>) => number

type SortOptions = {
  column: string
  ascending: boolean
}

type ElementNames = {
  filterContainer?: string | [string, string];
  filter?: string | [string, string];
  paginationContainer?: string | [string, string];
  paginationInfo?: string | [string, string];
  paginationButton?: string | [string, string];
  paginationPrevious?: string | [string, string];
  paginationCurrent?: string | [string, string];
  paginationNext?: string | [string, string];
  table?: string | [string, string];
  tr?: string | [string, string];
  th?: string | [string, string];
  thead?: string | [string, string];
  tbody?: string | [string, string];
  td?: string | [string, string];
}

type ColumnConfiguration = {
  /**
   * The identifier of the column. Used to indicate
   * the column when configuring the grid.
   */
  id: string;
  /**
   * The displayed name of the column
   * Default is the same as id.
   */
  name?: string;
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
   * Extra values or values with a key that doesn't match a column are ignored. 
   * If additional columns are added later these values can still be displayed,
   * but only if they have a key.
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
  /**
   * Indicates if the default search box elements should be displayed.
   * Default value is true.
   */
  searchbox?: boolean;
  /**
   * Fires when the value of the filter is changed through the ui.
   * Does not trigger if the filter is changed programmatically.
   * @param value The value the filter is set to
   */
  onFilter?: (value: string) => void;
  /**
   * Fires when the page is changed through the ui.
   * Does not trigger if the page is changed programmatically.
   * @param page The current page
   */
  onPageChange?: (page: number) => void;
  /**
   * Fires when the data is sorted through the ui.
   * Does not trigger if the data is sorted programmatically.
   * @param column The column the data is sorted by.
   * @param ascending If the data is sorted in ascending order
   */
  onSort?: (column: string, ascending: boolean) => void;
  /**
   * Fires when the user clicks on one of the cells of the table. 
   * @param column The column that was clicked. Left most column is 0, than 1, etc. Only visible columns are counted.
   * @param row The row that was clicked. Top column is 0, then 1 below that, etc. Only visible rows are counted.
   * @param columnName The name, as defined in the configuration, of the column clicked.
   * @param data The row, as key-value pairs. Key is the name of the column, value is the value of the record for that column. This includes hidden columns.
   */
  onClick?: (column: number, row: number, columnName: string, data: Record<string, string>) => void;
  className?: ElementNames,
  dataAttribute?: ElementNames,
}

class zGrid {
  private currentPage = 1;
  private columns: Array<ColumnConfiguration>;
  private data: Array<Record<string, string>>;
  private pagination: false | number;
  private filter: string | FilterCallback;
  private showFilter: boolean;
  private sortConfig: false | SortOptions | CompareRows;

  private parent: HTMLElement;
  private body: HTMLTableSectionElement;
  private head: HTMLTableSectionElement;
  private ui_filter: Filter;
  private ui_pages: Pages;
  private pages_info: HTMLDivElement;
  private pages_info_container: HTMLDivElement;

  private onFilter: (value: string) => void;
  private onPageChange: (page: number) => void;
  private onSort: (column: string, ascending: boolean) => void;
  private onClick: (column: number, row: number, columnName: string, data: Record<string, string>) => void;

  private className: ElementNames;
  private dataAttribute: ElementNames;
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
    this.parent = this.configureParent(config.parent);
    this.columns = this.configureColumns(config.columns);
    this.data = this.configureData(config.data);
    this.pagination = this.configurePagination(config.pagination);
    this.filter = this.configureFilter(config.filter);
    this.showFilter = config.searchbox === undefined ? true : false;
    this.onFilter = config.onFilter;
    this.onPageChange = config.onPageChange;
    this.onSort = config.onSort;
    this.onClick = config.onClick;

    this.configureUI()
    this.configureClassName(config.className)
    this.configureDataAttributes(config.dataAttribute)
    this.render();
  }

  private configureParent(parent: HTMLElement): HTMLElement {
    if (parent === null) {
      throw new TypeError('Parent cannot be null');
    } else if (parent === undefined) {
      throw new TypeError('Parent cannot be undefined');
    } else if (!(parent instanceof HTMLElement)) {
      throw new TypeError('Parent must be HTMLElement');
    } else if (parent.hasChildNodes()) {
      throw new TypeError('Parent must not have child nodes');
    }
    return parent;
  }

  private configureColumns(columns: Array<ColumnConfiguration | string>): Array<ColumnConfiguration> {
    if (columns === null) {
      throw new TypeError('Columns cannot be null');
    } else if (columns === undefined) {
      throw new TypeError('Columns cannot be undefined');
    } else if (!Array.isArray(columns)) {
      throw new TypeError('Columns must be array or object');
    } else if (columns.length < 1) {
      throw new Error('Columns length must be at least 1');
    }
    let ret: Array<ColumnConfiguration> = [];
    let hasIdColumn = false;
    ret = columns.map((e) => {
      let col: ColumnConfiguration;
      if (typeof e === 'string') {
        col = {
          id: e,
          name: e,
          sort: true,
          visible: true
        }
      } else if (typeof e === 'object') {
        if (e.id === undefined) {
          throw new TypeError('Column requires an id');
        }
        if (e.id === 'id') hasIdColumn = true
        col = {
          id: e.id,
          name: e.name === undefined ? e.id : e.name,
          sort: e.sort === undefined ? true : e.sort,
          visible: e.visible === undefined ? true : e.visible,
        }
      }
      return col;
    });
    if (hasIdColumn) {
      let index = ret.findIndex((c) => c.id === 'id')
      ret.unshift(ret.splice(index, 1)[0])
    } else {
      ret.unshift({
        id: 'id',
        name: 'id',
        sort: true,
        visible: false
      })
    }
    return ret;
  }

  private configureData(data: Array<Record<string, string> | Array<string>>): Array<Record<string, string>> {
    let ret: Array<Record<string, string>>
    if (!Array.isArray(data)) {
      throw new TypeError('Data must be an array');
    }
    let ids: String[] = [];

    ret = data.map((e) => {
      let row: Record<string, string> = {};
      if (Array.isArray(e)) {
        this.columns.forEach((c, i) => {
          let value = e[i] === null || e[i] === undefined ? '' : e[i];
          row[c.id] = value.toString();
        });
      } else if (typeof e === 'object') {
        // existing columns
        this.columns.forEach((c, i) => {
          let value = e[c.id] === null || e[c.id] === undefined ? '' : e[c.id];
          row[c.id] = value.toString();
        })
        // extra entries
        for (const [k, v] of Object.entries(e)) {
          if (this.columns.find((c) => c.id === k) === undefined) {
            let value = v === null || v === undefined ? '' : v;
            row[k] = value.toString();
          }
        }
      } else {
        throw new TypeError('Data elements must be string or object');
      }
      if (row.id === '') {
        throw new Error('All rows must define an id')
      } else {
        ids.push(row.id)
      }
      return row;
    });
    // unique ids
    if (new Set(ids).size !== ids.length) {
      throw new Error('ids must be unique')
    }

    return ret;
  }

  private configurePagination(pagination: false | number): false | number {
    let ret: false | number;
    if (!pagination) {
      ret = false;
    } else if (typeof pagination === 'number' && pagination > 0) {
      ret = pagination;
    } else {
      throw new TypeError('Pagination must be a number greater than 0');
    }
    return ret;
  }

  private configureFilter(filter: string | FilterCallback): string | FilterCallback {
    let ret: string | FilterCallback;
    if (!filter) {
      ret = '';
    } else if (typeof filter === 'string' || typeof filter === 'function') {
      ret = filter;
    } else {
      throw new TypeError('Filter must be a string or function');
    }
    return ret;
  }

  private configureClassName(className: ElementNames) {
    this.className = className === undefined ? {} : className;
    for (const [key, value] of Object.entries(this.className)) {
      let v = Array.isArray(value) ? value[0] : value;
      if (!/^-?[_a-zA-Z]+[_a-zA-Z0-9-]$/.test(v))
        throw new Error(`Invalid css class name (${value})`)
      
      CustomClassNames.clearCustomNames(key)
      CustomClassNames.addCustomName(key, v)
    };
    
    let pB = this.className.paginationButton;
    pB = Array.isArray(pB) ? pB[0] : pB;
    CustomClassNames.addCustomName('paginationNext', pB)
    CustomClassNames.addCustomName('paginationPrevious', pB)
    CustomClassNames.addCustomName('paginationCurrent', pB)
  }

  private configureDataAttributes(dataAttribute: ElementNames) {
    this.dataAttribute = dataAttribute === undefined ? {} : dataAttribute;
    for (const [key, value] of Object.entries(this.dataAttribute)) {
      let v = Array.isArray(value) ? value[0] : value;
      if (!/^\S+$/.test(v))
        throw new Error(`Invalid data attribute (${v})`)
      
      CustomDataAttributes.clearCustomNames(key)
      CustomDataAttributes.addCustomName(key, value)
    };

    let pB = this.dataAttribute.paginationButton;
    CustomDataAttributes.addCustomName('paginationNext', pB)
    CustomDataAttributes.addCustomName('paginationPrevious', pB)
    CustomDataAttributes.addCustomName('paginationCurrent', pB)
  }

  private configureUI() {
    this.body = document.createElement('tbody');
    CustomClassNames.addElement('tbody', this.body)
    CustomDataAttributes.addElement('tbody', this.body)
    let container = document.createElement('div')
    container.classList.add('zgrid_container')
    let table = document.createElement('table')
    CustomClassNames.addElement('table', table)
    CustomClassNames.addDefaultName('table', 'zgrid_table')
    CustomDataAttributes.addElement('table', table)
    this.head = document.createElement('thead')
    CustomClassNames.addElement('thead', this.head)
    CustomDataAttributes.addElement('thead', this.head)
    // filter
    this.ui_filter = new Filter(container)
    this.ui_filter.visible = this.showFilter
    this.ui_filter.oninput = (_, v) => {
      this.reconfigure({
        filter: v,
      })
      // callback
      if (this.onFilter != undefined) this.onFilter(v);
      // modify data & pageui
      this.renderData();
    }
    // header
    // this.createHeader(head);
    table.appendChild(this.head);
    // data
    table.appendChild(this.body)
    container.appendChild(table)
    // pages
    this.pages_info_container = document.createElement('div')
    this.pages_info_container.classList.add('zgrid_pages_info_container')
    if (!this.pagination)
      this.pages_info_container.classList.add('zgrid_hidden')

    this.pages_info = document.createElement('div')
    CustomClassNames.addElement('paginationInfo', this.pages_info)
    CustomClassNames.addDefaultName('paginationInfo', 'zgrid_pages_info')
    CustomDataAttributes.addElement('paginationInfo', this.pages_info)
    this.pages_info_container.appendChild(this.pages_info)

    this.ui_pages = new Pages(this.pages_info_container)
    this.ui_pages.page = 1
    this.ui_pages.onpagechange = (p) => {
      if (p === this.currentPage) return;
      if (this.onPageChange !== undefined) this.onPageChange(p);
      this.currentPage = p;
      this.renderData();
    }
    container.appendChild(this.pages_info_container)

    this.parent.appendChild(container)
  }

  public reconfigure(config: Partial<Configuration>) {
    if (config.parent !== undefined) {
      let old_parent = this.parent
      this.parent = this.configureParent(config.parent)
      this.parent.appendChild(old_parent.firstChild)
    }
    if (config.columns !== undefined) {
      this.columns = this.configureColumns(config.columns)
      // reset sort if sorting by a removed column
      if (this.sortConfig && typeof this.sortConfig !== 'function') {
        let sort = this.sortConfig.column
        if (!this.columns.some((e) => e.id === sort))
          this.sort();
      }
      this.render();
    }
    if (config.data !== undefined) {
      this.data = this.configureData(config.data)
      this.renderData();
    }
    if (config.pagination !== undefined) {
      this.pagination = this.configurePagination(config.pagination)
      if (this.pagination) this.pages_info_container.classList.remove('zgrid_hidden')
      else this.pages_info_container.classList.add('zgrid_hidden')
      this.renderData();
    }
    if (config.filter !== undefined) {
      this.filter = this.configureFilter(config.filter)
      this.renderData()
    }
    if (config.searchbox !== undefined) {
      this.showFilter = config.searchbox
      this.ui_filter.visible = this.showFilter;
    }
    if (config.onFilter !== undefined) this.onFilter = config.onFilter
    if (config.onPageChange !== undefined) this.onPageChange = config.onPageChange
    if (config.onSort !== undefined) this.onSort = config.onSort;
    if (config.onClick !== undefined) this.onClick = config.onClick;
  }
/**
 * Gets the data of a specific row
 * @param id The value of the id column
 * @returns An object representing the found row, or undefined if no row is found
 */
  public getRow(id: string): Record<string, string>  {
    let row = this.data.find((e) => e.id === id)
    return row === undefined ? row : {...row}
  }
  public setRow(id: string, data: Record<string, string> | Array<string>) {
    // what should this do if no row can be found? error
    let row = this.data.find((e) => e.id === id)
    if (Array.isArray(data)) {
      this.columns.forEach((c, i) => {
        let value = data[i] === null || data[i] === undefined ? '' : data[i];
        row[c.id] = value.toString();
      })
    } else if (typeof data === 'object') {
      // existing columns
      this.columns.forEach((c, i) => {
        let value = data[c.id] === null || data[c.id] === undefined ? '' : data[c.id]
        row[c.id] = value.toString();
      })
      // extra entries
      for (const [k, v] of Object.entries(data)) {
        if (this.columns.find((c) => c.id === k) === undefined) {
          let value = v === null || v === undefined ? '' : v;
          row[k] = value.toString();
        }
      }
    }
  }
  public setCell(row: string, column: string, value: string) {

  }
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
            r[c.id].toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          );
        });
      } else if (typeof this.filter === 'function') {
        let filter = this.filter
        filtered = this.data.filter((r) => {
          let entry: Record<string, string> = {};
          this.columns.forEach((c) => (entry[c.id] = r[c.id]));
          return filter(entry);
        });
      }
    } else {
      filtered = [...this.data];
    }
    // sorting
    if (this.sortConfig) {
      if (typeof this.sortConfig === 'function') {
        filtered.sort(this.sortConfig);
      } else if (typeof this.sortConfig === 'object') {
        let col_name = this.sortConfig.column;
        let col_config = this.columns.find((e) => e.id === col_name);
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
      let page_count = Math.ceil(filtered.length / this.pagination)
      this.ui_pages.totalPages = page_count === 0 ? 1 : page_count
      if (this.currentPage > this.ui_pages.totalPages) {
        this.currentPage = this.ui_pages.totalPages
        this.ui_pages.page = this.currentPage;
      }
      let start = (this.currentPage - 1) * this.pagination;
      let end = start + this.pagination;
      page = filtered.slice(start, end);
      this.pages_info.innerText = `Showing ${page.length === 0 ? 0 : start + 1} to ${start + page.length} of ${filtered.length} results`
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
    this.ui_pages.page = page;
    this.renderData()
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
   * Sorts data by using the given compare function.
   * @param sort
   * A compare function that takes
   * two rows (a, b) as parameters and returns 0, >0, or <0. 
   * 
   * return value | sort order |
   * :----------- | ---------- |
   * \> 0         | sort a after b, e.g. b, a |
   * \< 0         | sort b after a, e.g. a, b |
   * === 0        | keep original order of a and b |
   */
  public sort(sort: CompareRows): void;
  /**
   * Sorts the data by the named column. If the configuration for that
   * column has a sort function that function is used to sort it. Otherwise it uses
   * Javascript's localeCompare.
   * @param column The name of the column to sort by.
   */
  public sort(column: string): void;
  /**
      * Sorts the data by the named column. If the configuration for that
   * column has a sort function that function is used to sort it. Otherwise it uses
   * Javascript's localeCompare.
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
      let col = this.columns.find((e) => e.id === column);
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

  private render() {               
    this.renderHeader()  
    this.renderData();
  };

  private renderHeader() {
    this.head.replaceChildren();
    CustomClassNames.clearElements('th')
    CustomDataAttributes.clearElements('th')

    let headerRow = document.createElement('tr');
    CustomClassNames.clearElements('tr')
    CustomClassNames.addElement('tr', headerRow)
    CustomDataAttributes.clearElements('tr')
    CustomDataAttributes.addElement('tr', headerRow)
    let col_count = this.columns.filter((c) => c.visible).length
    let prev: HeaderCell = undefined;
    let titles: Array<HeaderCell> = [];
    this.columns.forEach((config) => {
      if (config.visible === false) return;

      let title = new HeaderCell(headerRow);
      titles.push(title)
      title.width = this.head.clientWidth / col_count
      title.onsort = (sort) => {
        titles.forEach((t) => {
          if (t !== title) t.sort ='none'
        })
        if (sort === "none") {
          this.sort(false)
        } else {
          let ascending = sort === "ascending"
          this.sort(config.id, ascending)
          if (this.onSort !== undefined) this.onSort(config.id, ascending)
        }
        this.renderData()
      }
      if (prev !== undefined) {
        prev.onresize = (width, change) => {
          title.width = title.width - change;
        }
      }
      prev = title
      
      if (typeof this.sortConfig === "object" && this.sortConfig.column === config.id) {
        title.sort = this.sortConfig.ascending ? "ascending" : "descending"
      }
      
      if (config !== undefined) {
        if (config.sort === false) title.enableSort(false);
      }
      title.innerText = config.name;
    });
    this.head.appendChild(headerRow);
  }

  private renderData() {
    this.body.replaceChildren()
    CustomClassNames.clearElements('td')
    CustomDataAttributes.clearElements('td')
    this.getData().forEach((d, r_i) => {
      let row = document.createElement('tr');
      CustomClassNames.addElement('tr', row)
      CustomClassNames.addDefaultName('tr', 'zgrid_row')
      CustomDataAttributes.addElement('tr', row)
      
      let visible_columns = this.columns.filter((c) => {
        let config = this.columns.find((e) => e.id === c.id)
        return config.visible
      })

      visible_columns.forEach((c, c_i) => {
        let cell = document.createElement('td');
        CustomClassNames.addElement('td', cell)
        CustomClassNames.addDefaultName('td', 'zgrid_cell')
        CustomDataAttributes.addElement('td', cell)
        cell.onclick = () => {
          if (!this.onClick) return
          this.onClick(c_i, r_i, c.id, structuredClone(d))
        }
        cell.classList.add('zgrid_cell');
        cell.innerText = d[c.id];
        row.appendChild(cell);
      });
      this.body.appendChild(row);
    });
  }
}

export { zGrid }