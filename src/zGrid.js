var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export default function createzGrid(args) {
    var currentPage = 1;
    function configureParent() {
        if (args.parent === null) {
            throw new TypeError('Parent cannot be null');
        }
        else if (args.parent === undefined) {
            throw new TypeError('Parent cannot be undefined');
        }
        else if (!(args.parent instanceof HTMLElement)) {
            throw new TypeError('Parent must be HTMLElement');
        }
        else if (args.parent.hasChildNodes()) {
            throw new TypeError('Parent must not have child nodes');
        }
        return args.parent;
    }
    function configureColumns() {
        if (args.columns === null) {
            throw new TypeError('Columns cannot be null');
        }
        else if (args.columns === undefined) {
            throw new TypeError('Columns cannot be undefined');
        }
        else if (!Array.isArray(args.columns)) {
            throw new TypeError('Columns must be array or object');
        }
        else if (args.columns.length < 1) {
            throw new Error('Columns length must be at least 1');
        }
        var columns = [];
        columns = args.columns.map(function (e) {
            var col;
            if (typeof e === 'string') {
                col = {
                    name: e,
                    sort: true,
                    hide: false
                };
            }
            else if (typeof e === 'object') {
                if (e.name === undefined) {
                    throw new TypeError('Column requires a name');
                }
                col = {
                    name: e.name,
                    sort: e.sort === undefined ? true : e.sort,
                    hide: e.hide === undefined ? false : e.hide,
                };
            }
            return col;
        });
        return columns;
    }
    function configureData(columns) {
        var data;
        if (!Array.isArray(args.data)) {
            throw new TypeError('Data must be an array');
        }
        data = args.data.map(function (e) {
            var row = {};
            if (Array.isArray(e)) {
                columns.forEach(function (c, i) {
                    row[c.name] = e[i];
                });
            }
            else if (typeof e === 'object') {
                row = __assign({}, e);
            }
            else {
                throw new TypeError('Data elements must be string or object');
            }
            return row;
        });
        return data;
    }
    function configurePagination() {
        var pagination;
        if (!args.pagination) {
            pagination = false;
        }
        else if (typeof args.pagination === 'number' && args.pagination > 0) {
            pagination = args.pagination;
        }
        else {
            throw new TypeError('Pagination must be a number greater than 0');
        }
        return pagination;
    }
    function configureFilter() {
        var filter;
        if (!args.filter) {
            filter = '';
        }
        else if (typeof args.filter === 'string' || typeof args.filter === 'function') {
            configuration.filter = filter;
        }
        else {
            throw new TypeError('Filter must be a string or function');
        }
        return filter;
    }
    var columns = configureColumns();
    var configuration = {
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
    var getRow = function (index) {
        if (index < 0) {
            throw new RangeError('index cannot be less than zero');
        }
        else if (index >= configuration.data.length) {
            throw new RangeError('index cannot be greater than or equal to the number of rows');
        }
        return __assign({}, configuration.data[index]);
    };
    var getData = function () {
        var ret = [];
        var page = [];
        var filtered = [];
        // filter
        if (configuration.filter) {
            if (typeof configuration.filter === 'string') {
                var filter_1 = configuration.filter;
                filtered = configuration.data.filter(function (r) {
                    return configuration.columns.some(function (c) {
                        return r[c.name].includes(filter_1);
                    });
                });
            }
            else if (typeof configuration.filter === 'function') {
                var filter_2 = configuration.filter;
                filtered = configuration.data.filter(function (r) {
                    var entry;
                    configuration.columns.forEach(function (c) { return (entry[c.name] = r[c.name]); });
                    return filter_2(entry);
                });
            }
        }
        else {
            filtered = configuration.data;
        }
        // sorting
        if (configuration.sort) {
            if (typeof configuration.sort === 'function') {
                filtered.sort(configuration.sort);
            }
            else if (typeof configuration.sort === 'object') {
                var col_name_1 = configuration.sort.column;
                var col_config = configuration.columns.find(function (e) { return e.name === col_name_1; });
                if (typeof col_config.sort === 'function') {
                    var col_sort_1 = col_config.sort;
                    filtered.sort(function (a, b) { return col_sort_1(a[col_name_1], b[col_name_1]); });
                }
                else {
                    filtered.sort(function (a, b) { return a[col_name_1].localeCompare(b[col_name_1]); });
                }
                if (!configuration.sort.ascending)
                    filtered.reverse();
            }
        }
        // pagination
        if (configuration.pagination) {
            var start = (currentPage - 1) * configuration.pagination;
            var end = start + configuration.pagination;
            page = filtered.slice(start, end);
        }
        else {
            page = filtered;
        }
        page.forEach(function (e, i) {
            ret.push(__assign({}, e));
        });
        return ret;
    };
    var getPage = function () {
        return currentPage;
    };
    var setPage = function (page) {
        if (!(typeof page === 'number' && page > 0)) {
            throw new TypeError('Page must be a postive number');
        }
        currentPage = page;
    };
    var setFilter = function (filter) {
        var f = filter === undefined ? '' : filter;
        if (typeof filter === 'string' || typeof filter === 'function') {
            configuration.filter = f;
        }
        else {
            throw new TypeError('Filter must be a string or function');
        }
    };
    var sort = function (column, ascending) {
        if (column === undefined && ascending === undefined) {
            configuration.sort = false;
        }
        else if (typeof column === 'function') {
            configuration.sort = column;
        }
        else {
            var col = configuration.columns.find(function (e) { return e.name === column; });
            if (col === undefined) {
                throw new RangeError("No column named '".concat(column, "'"));
            }
            else if (ascending && typeof ascending !== 'boolean') {
                throw new TypeError('Ascending must be boolean');
            }
            else {
                configuration.sort = {
                    column: column,
                    ascending: ascending === undefined ? true : ascending,
                };
            }
        }
    };
    var render = function () {
        var table = document.createElement('table');
        var head = document.createElement('thead');
        var body = document.createElement('tbody');
        var headerRow = document.createElement('tr');
        configuration.columns.forEach(function (c) {
            var title = document.createElement('th');
            title.innerText = c.name;
            headerRow.appendChild(title);
        });
        head.appendChild(headerRow);
        table.appendChild(head);
        // add data
        configuration.data.forEach(function (d) {
            var row = document.createElement('tr');
            configuration.columns.forEach(function (c) {
                var cell = document.createElement('td');
                cell.innerText = d[c.name];
                row.appendChild(cell);
            });
            body.appendChild(row);
        });
        table.appendChild(body);
        configuration.parent.appendChild(table);
    };
    var obj = {
        getRow: getRow,
        getData: getData,
        getPage: getPage,
        setPage: setPage,
        setFilter: setFilter,
        render: render
    };
    return obj;
}
