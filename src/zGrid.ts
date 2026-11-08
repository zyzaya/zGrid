import CustomClassNames from "./CustomClassNames";
import CustomDataAttributes from "./CustomDataAttributes";
import Filter from "./Filter";
import HeaderCell from "./HeaderCell";
import Pages from "./Pages";

type Row = Record<string, any>
type FilterCallback = (row: Row) => boolean;
type CompareEntries = (a: string, b: string) => number;
type CompareRows = (a: Row, b: Row) => number

type SortOptions = {
  column: string
  ascending: boolean
}

type CustomClassElementNames = {
  filterContainer?: string;
  filter?: string;
  paginationContainer?: string;
  paginationInfo?: string;
  paginationButton?: string;
  paginationPrevious?: string;
  paginationCurrent?: string;
  paginationNext?: string;
  table?: string;
  tr?: string;
  th?: string;
  thead?: string;
  tbody?: string;
  td?: string;
  selected?: string;
}

type CustomDataAttributeElementNames = {
  filterContainer?: Record<string, string>;
  filter?: Record<string, string>;
  paginationContainer?: Record<string, string>;
  paginationInfo?: Record<string, string>;
  paginationButton?: Record<string, string>;
  paginationPrevious?: Record<string, string>;
  paginationCurrent?: Record<string, string>;
  paginationNext?: Record<string, string>;
  table?: Record<string, string>;
  tr?: Record<string, string>;
  th?: Record<string, string>;
  thead?: Record<string, string>;
  tbody?: Record<string, string>;
  td?: Record<string, string>;
  selected?: Record<string, string>;
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
  data?: Array<Row | Array<string>>
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
   * Enables or disables selections
   * Default value is true.
   */
  selection?: boolean;
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
   * @param column The id of the column the data is sorted by.
   * @param ascending If the data is sorted in ascending order. Null if the data is switched to unsorted
   */
  onSort?: (column: string, ascending: boolean) => void;
  /**
   * Fires when the user clicks on one of the cells of the table. 
   * @param column The column that was clicked. Left most column is 0, than 1, etc. Only visible columns are counted.
   * @param row The row that was clicked. Top column is 0, then 1 below that, etc. Only visible rows are counted.
   * @param columnName The name, as defined in the configuration, of the column clicked.
   * @param data The row, as key-value pairs. Key is the name of the column, value is the value of the record for that column. This includes hidden columns.
   */
  onClick?: (column: number, row: number, columnName: string, data: Row) => void;
  className?: CustomClassElementNames,
  dataAttribute?: CustomDataAttributeElementNames,
}

class zGrid {
  private currentPage = 1;
  private columns: Array<ColumnConfiguration>;
  private data: Array<Row>;
  private displayed_data: Array<Row>;
  private pagination: false | number;
  private filter: string | FilterCallback;
  private selection: boolean;
  private selected: any;
  private showFilter: boolean;
  private sortConfig: false | SortOptions | CompareRows;

  private header_cells: Array<HeaderCell>;
  private parent: HTMLElement;
  private body!: HTMLTableSectionElement;
  private head!: HTMLTableSectionElement;
  private ui_filter!: Filter;
  private ui_pages!: Pages;
  private ui_header_row!: HTMLTableRowElement;
  private pages_info!: HTMLDivElement;
  private pages_info_container!: HTMLDivElement;
  
  private onFilter?: (value: string) => void;
  private onPageChange?: (page: number) => void;
  private onSort?: (column: string, ascending: boolean) => void;
  private onClick?: (column: number, row: number, columnName: string, data: Row) => void;

  private className: CustomClassElementNames;
  private dataAttribute: CustomDataAttributeElementNames;
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
    this.showFilter = config.searchbox === undefined ? true : !!config.searchbox;
    this.selection = config.selection === undefined ? true : !!config.selection;
    this.selected = null;

    this.header_cells = [];
    
    this.displayed_data = [];
    this.sortConfig = false;

    this.onFilter = config.onFilter;
    this.onPageChange = config.onPageChange;
    this.onSort = config.onSort;
    this.onClick = config.onClick;

    this.className = {};
    this.dataAttribute = {};
    CustomClassNames.addDefaultName('tr', 'zgrid_row')
    CustomClassNames.addDefaultName('td', 'zgrid_cell')
    CustomClassNames.addDefaultName('selected', 'zgrid_selected')
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
      } else {
        throw new Error('Unknown column configuration format');
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

  private initializeRow(data: Row | Array<string>): Row {
    let row: Row = {}
    if (Array.isArray(data)) {
      this.columns.forEach((c, i) => {
        this.columns.forEach((c, i) => {
          let value = data[i] === null || data[i] === undefined ? '' : data[i];
          row[c.id] = value;
        });
      })
    } else if (typeof data === 'object') {
      // existing columns
      this.columns.forEach((c, i) => {
        let value = data[c.id] === null || data[c.id] === undefined ? '' : data[c.id];
        row[c.id] = value;
      })
      // extra entries
      for (const [k, v] of Object.entries(data)) {
        if (this.columns.find((c) => c.id === k) === undefined) {
          let value = v === null || v === undefined ? '' : v;
          row[k] = value;
        }
      }
    } else {
      throw new TypeError('data must be string or object')
    }
    if (row.id === '') throw new Error('rows must define an id')

    return row;
  }

  private configureData(data: Array<Row | Array<string>> | undefined): Array<Row> {
    let ret: Array<Row>
    if (data === undefined) ret = [];
    else if (!Array.isArray(data))
      throw new TypeError('Data must be an array');
    else {
      let ids: String[] = [];
      ret = data.map((e) => {
        let row = this.initializeRow(e);
        ids.push(row.id)
        return row;
      });
      // unique ids
      if (new Set(ids).size !== ids.length)
        throw new Error('ids must be unique')
    }
    
    return ret;
  }

  private configurePagination(pagination: false | number | undefined): false | number {
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

  private configureFilter(filter: string | FilterCallback | undefined): string | FilterCallback {
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

  private configureClassName(className: CustomClassElementNames | undefined) {
    this.className = className === undefined ? {} : className;
    CustomClassNames.clearCustomNames('paginationNext')
    CustomClassNames.clearCustomNames('paginationPrevious')
    let pB = this.className.paginationButton;
    if (pB !== undefined) {
      if (!/^-?[_a-zA-Z]+[_a-zA-Z0-9-]$/.test(pB))
        throw new Error(`Invalid css class name (${pB})`)
      CustomClassNames.addCustomName('paginationNext', pB)
      CustomClassNames.addCustomName('paginationPrevious', pB)
    }
    
    for (const [key, value] of Object.entries(this.className)) {
      if (!/^-?[_a-zA-Z]+[_a-zA-Z0-9-]$/.test(value))
        throw new Error(`Invalid css class name (${value})`)
      
      CustomClassNames.clearCustomNames(key)
      CustomClassNames.addCustomName(key, value)
    };
  }

  private configureDataAttributes(dataAttribute: CustomDataAttributeElementNames | undefined) {
    this.dataAttribute = dataAttribute === undefined ? {} : dataAttribute;
    CustomDataAttributes.clearCustomNames('paginationNext')
    CustomDataAttributes.clearCustomNames('paginationPrevious')
    CustomDataAttributes.clearCustomNames('paginationCurrent')
    let pB = this.dataAttribute.paginationButton;
    if (pB !== undefined) {
      for (const [name, value] of Object.entries(pB)) {
        if (!/^\S+$/.test(value))
          throw new Error(`Invalid data attribute (${value})`)
        
        CustomDataAttributes.addCustomName('paginationNext', [name, value])
        CustomDataAttributes.addCustomName('paginationPrevious', [name, value])
        CustomDataAttributes.addCustomName('paginationCurrent', [name, value])
      }
    }
    // every element
    for (const [element, attributes] of Object.entries(this.dataAttribute)) {
      // multiple attributes per element
      CustomDataAttributes.clearCustomNames(element)
      for (const [name, value] of Object.entries(attributes)) {
        if (!/^\S+$/.test(value))
          throw new Error(`Invalid data attribute (${value})`)
        
        CustomDataAttributes.addCustomName(element, [name, value])
      }
    };
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
    this.ui_header_row = document.createElement('tr');
    CustomClassNames.addElement('tr', this.ui_header_row)
    CustomDataAttributes.addElement('tr', this.ui_header_row)
    this.head.appendChild(this.ui_header_row)
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
      this.currentPage = p;
      this.renderData();
      if (this.onPageChange !== undefined) this.onPageChange(p);
    }
    container.appendChild(this.pages_info_container)

    this.parent.appendChild(container)
  }

  public reconfigure(config: Partial<Configuration>) {
    let shouldRender = false;
    let shouldRenderData = false;

    if (config.parent !== undefined) {
      let old_parent = this.parent
      let firstChild = old_parent.firstChild
      this.parent = this.configureParent(config.parent)
      if (firstChild !== null) this.parent.appendChild(firstChild)
    }
    if (config.columns !== undefined) {
      this.columns = this.configureColumns(config.columns)
      // reset sort if sorting by a removed column
      if (this.sortConfig && typeof this.sortConfig !== 'function') {
        let sort = this.sortConfig.column
        if (!this.columns.some((e) => e.id === sort))
          this.sort();
      }
      shouldRender = true;
    }
    if (config.data !== undefined) {
      this.data = this.configureData(config.data)
      shouldRenderData = true;
    }
    if (config.pagination !== undefined) {
      this.pagination = this.configurePagination(config.pagination)
      if (this.pagination) this.pages_info_container.classList.remove('zgrid_hidden')
      else this.pages_info_container.classList.add('zgrid_hidden')
      shouldRenderData = true;
    }
    if (config.filter !== undefined) {
      this.filter = this.configureFilter(config.filter)
      shouldRenderData = true;
    }
    if (config.searchbox !== undefined) {
      this.showFilter = !!config.searchbox;
      this.ui_filter.visible = this.showFilter;
    }
    if (config.selection !== undefined) this.selection = !!config.selection
    if (config.onFilter !== undefined) this.onFilter = config.onFilter
    if (config.onPageChange !== undefined) this.onPageChange = config.onPageChange
    if (config.onSort !== undefined) this.onSort = config.onSort;
    if (config.onClick !== undefined) this.onClick = config.onClick;

    if (shouldRender) this.render();
    else if (shouldRenderData) this.renderData();
  }
  /**
   * Sets the selected row
   * @param id The id value of the row to select
   * @returns The data of the row selected, or null or no row matches the id
   */
  public setSelected(id: any): Row | null {
    let row = this.data.find((e) => e.id === id)
    if (row === undefined) return null;
    // set visual selection
    // how to find row
    // add select row element to CustomClassNames(selection)
    // have default name of selection      
    if (id === this.selected) return this.selection ? row : null
    this.selected = id;
    this.renderData()
    return row;
  }
  /**
   * Gets the selected row.
   * @returns The data of the currently selected row or null if no row is selected
   */
  public getSelected(): Row | null {
    if (!this.selection || this.selected === null) return null;
    let row = this.data.find((e) => e.id === this.selected)
    return row === undefined ? null : row;
  }
  /**
   * Adds a row with the specified data
   * @param data The data of the row, in the same format as configuration
   */
  public addRow(data: Row | Array<string>) {
    let row = this.initializeRow(data);
    let ids = this.data.map((r) => r.id)
    if (ids.includes(row.id)) throw new Error('ids must be unique');
    this.data.push(row);
    this.renderData();
  }
  /**
   * Gets the data of a specific row
   * @param id The value of the id column
   * @returns An object representing the found row, or null if no row is found
   */
  public getRow(id: any): Row | null  {
    let row = this.data.find((e) => e.id === id)
    return row === undefined ? null : {...row}
  }
  /**
   * Modifies the data in a single row
   * @param id The id of row to change
   * @param data The data to set the row to in the same format as configuration
   * with the exception that if no id is defined it will keep its original id
   */
  public setRow(id: any, data: Row | Array<string>) {
    let index = this.data.findIndex((e) => e.id === id)
    if (index === -1) throw new RangeError(`No row found with id: ${id}`)
    if (!Array.isArray(data) && typeof data === 'object' && data.id === undefined)
        data.id = this.data[index].id
    let row = this.initializeRow(data);
    let ids = this.data.map((r, i) => i === index ? undefined : r.id)
    if (ids.includes(row.id)) throw new Error('ids must be unique')
    this.data[index] = this.initializeRow(data);
    this.renderData();
  }
  /**
   * Removes a row
   * @param id  The value of the id column
   * @returns The data of the row as key/value pairs where the 
   * keys are column ids, and the values are what is in the column.
   * If no row is found returns null.
   */
  public removeRow(id: any): Row | null {
    let row = this.getRow(id);
    if (row !== undefined) 
    {
      this.data = this.data.filter((r) => r.id !== id)
      this.renderData()
    }
    return row;
  }
  /**
   * Changes the value of a specific cell
   * @param id The value of the id column of the row to change
   * @param column The column id of the cell to change
   * @param value The value to change the cell to
   */
  public setCell(id: any, column: string, value: string) { 
    let row = this.data.find((e) => e.id === id);
    if (row === undefined) throw new RangeError(`No row found with id: ${id}`);
    if (this.columns.find((c) => c.id === column) === undefined)
      throw new RangeError(`No column found with id: ${column}`)
    if (column === 'id') {
      if (value === undefined || value === null || value === '')
        throw new TypeError('id must be a non null, non empty string')
      let ids = this.data.map((r) => r.id);
      if (ids.includes(value))
        throw new Error('ids must be unique');
    }
    row[column] = value;
    this.renderData();
  }
  /**
   * Gets the data stored in zgrid, ignoring filter
   * sorting, and pagination
   * @returns An array of objects. Each element of the array is a single row.
   * The objects are key-value pairs where the key is the name of a column and
   * the value is what is in that cell
   */
  public getRawData(): Array<Row> {
    let ret:Array<Row> = [];
    this.data.forEach((r) => ret.push({...r}))
    return ret
  }
  /**
   * Gets the currently displayed data, after filtering
   * sorting, and pagination are applied.
   * @returns An array of objects. Each element of the array is a single row.
   * The objects are key-value pairs where the key is the name of a column and
   * the value is what is in that cell.
   */
  public getData(): Array<Row> {
    let ret:Array<Row> = [];
    this.displayed_data.forEach((r) => ret.push({...r}))
    return ret
  };

  get totalPages() {
    return this.ui_pages.totalPages;
  }

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
      this.renderData();
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
   * Javascript's comparison operators.
   * @param column The name of the column to sort by.
   */
  public sort(column: string): void;
  /**
      * Sorts the data by the named column. If the configuration for that
   * column has a sort function that function is used to sort it. Otherwise it uses
   * Javascript's comparison operators.
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
    this.render();
  };

  private updateDisplayedData() {
    let ret: Array<Row> = [];
    let page = [];
    let filtered: Array<Row> = [];
    // filter
    if (this.filter) {
      if (typeof this.filter === 'string') {
        let filter = this.filter
        filtered = this.data.filter((r) => {
          return this.columns.some((c) =>
            r[c.id] === filter ||
            (typeof r[c.id] === 'string' && r[c.id].toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
          );
        });
      } else if (typeof this.filter === 'function') {
        let filter = this.filter
        filtered = this.data.filter((r) => {
          let entry: Row = {};
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
        if (col_config !== undefined && typeof col_config.sort === 'function') {
          let col_sort = col_config.sort;
          filtered.sort((a, b) => col_sort(a[col_name], b[col_name]));
        } else {
          filtered.sort((a, b) => {
            if (a[col_name] < b[col_name]) return -1;
            else if (a[col_name] > b[col_name]) return 1;
            return 0;
          });
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
    this.displayed_data = ret;
  }

  private render() {               
    this.renderHeader()  
    this.renderData();
  };

  private renderHeader() {
    let col_count = this.columns.filter((c) => c.visible).length
    let prev: HeaderCell = undefined;
    // remove unused header cells
    if (col_count < this.header_cells.length) {
      let removed = this.header_cells.splice(col_count - 1);
      removed.forEach((c) => c.remove())
    }
    let max_existing = this.header_cells.length
    let existing_index = 0;
    this.columns.forEach((config) => {
      if (config.visible === false) return;
      let title: HeaderCell;
      // use existing header cells
      if (existing_index < max_existing) {
        title = this.header_cells[existing_index]
        existing_index += 1;
      } else {
        title = new HeaderCell(this.ui_header_row)
        this.header_cells.push(title)
      }
      title.onsort = (sort) => {
        // reset all other header cells
        this.header_cells.forEach((t) => {
          if (t !== title) t.sort = 'none'
        })
        // set sort
        if (sort === "none")
        {
          this.sort(false)
          if (this.onSort !== undefined) this.onSort(config.id, null)
        } else {
          let ascending = sort === "ascending"
          this.sort(config.id, ascending)
          if (this.onSort !== undefined) this.onSort(config.id, ascending)
        }
        this.renderData()
      }
      title.width = 100 / col_count
      // resize modification
      if (prev !== undefined) {
        prev.onresize = function(change) {
          change = change / 5
          if (title.width - change > 5 && this.width + change > 5) {
            title.width = title.width - change;
            this.width = this.width + change
          }
        }
      }
      prev = title
      if (typeof this.sortConfig === "object" && this.sortConfig.column === config.id) {
        title.sort = this.sortConfig.ascending ? "ascending" : "descending"
      }
      if (config.sort === false) title.enableSort(false);
      title.innerText = config.name;
    });
  }

  private renderData() {
    this.updateDisplayedData()
    let data = this.displayed_data;
    let visible_columns = this.columns.filter((c) => {
      let config = this.columns.find((e) => e.id === c.id)
      return config.visible
    })
    
    let existing_rows = Array.from(this.body.querySelectorAll('tr'))
    let existing_rows_count = existing_rows.length
    let existing_rows_index = 0;
    // remove unused row elements
    if (data.length < existing_rows_count) {
      let removed = existing_rows.splice(data.length);
      removed.forEach((r) => r.classList.add('zgrid_hidden'))
    }
    CustomClassNames.clearElements('selected')
    CustomDataAttributes.clearElements('selected')
    data.forEach((d, r_i) => {
      let row: HTMLTableRowElement;
      let existing_cells: HTMLTableCellElement[];
      let existing_cols_count = 0;
      let existing_cols_index = 0;
      if (existing_rows_index < existing_rows_count) {
        row = existing_rows[existing_rows_index]
        row.classList.remove('zgrid_hidden')
        existing_rows_index += 1;
        existing_cells = Array.from(row.querySelectorAll('td'))
        existing_cols_count = existing_cells.length
        // remove unused cell elements
        if (visible_columns.length < existing_cells.length) {
          let removed = existing_cells.splice(visible_columns.length)
          removed.forEach((c) => c.classList.add('zgrid_hidden'))
        }
      } else {
        row = document.createElement('tr')
        CustomClassNames.addElement('tr', row)
        CustomDataAttributes.addElement('tr', row)
        this.body.appendChild(row);
      }
      row.onclick = () => { 
        if (this.selection) this.setSelected(d.id)
      }
      if (this.selection && this.selected === d.id) {
        CustomClassNames.addElement('selected', row)
        CustomDataAttributes.addElement('selected', row)
      }

      visible_columns.forEach((c, c_i) => {
        let cell: HTMLTableCellElement;
        if (existing_cols_index < existing_cols_count) {
          cell = existing_cells[existing_cols_index]
          cell.classList.remove('zgrid_hidden')
          existing_cols_index += 1;
        } else {
          cell = document.createElement('td');
          CustomClassNames.addElement('td', cell)
          CustomDataAttributes.addElement('td', cell)
          row.appendChild(cell);
        }
        cell.onclick = () => {
          if (!this.onClick) return
          this.onClick(c_i, r_i, c.id, structuredClone(d))
        }
        cell.innerText = d[c.id].toString();
      });
    });
  }
}

export { zGrid }