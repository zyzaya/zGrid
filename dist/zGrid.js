/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CustomClassNames.ts":
/*!*********************************!*\
  !*** ./src/CustomClassNames.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var CustomClassNames = /** @class */ (function () {
    function CustomClassNames() {
    }
    CustomClassNames.clearRecords = function () {
        this.data = [];
    };
    CustomClassNames.updateClassList = function (id) {
        var record = this.getRecord(id);
        record.elements.forEach(function (e) {
            e.className = '';
            record.default.forEach(function (n) { return e.classList.add(n); });
            record.custom.forEach(function (n) { return e.classList.add(n); });
        });
    };
    CustomClassNames.addElement = function (id, element) {
        var record = this.getRecord(id);
        if (record.elements.includes(element))
            return;
        record.elements.push(element);
        this.updateClassList(id);
    };
    CustomClassNames.removeElement = function (id, element) {
        var record = this.getRecord(id);
        record.elements = record.elements.filter(function (e) { return e !== element; });
        this.updateClassList(id);
    };
    CustomClassNames.clearElements = function (id) {
        var record = this.getRecord(id);
        record.elements = [];
    };
    CustomClassNames.getRecord = function (id) {
        var record = this.data.find(function (e) { return e.id === id; });
        if (record === undefined) {
            record = {
                id: id,
                elements: [],
                default: [],
                custom: []
            };
            this.data.push(record);
        }
        return record;
    };
    CustomClassNames.addDefaultName = function (id, name) {
        if (name === undefined)
            return;
        var record = this.getRecord(id);
        if (!record.default.includes(name)) {
            record.default.push(name);
            this.updateClassList(id);
        }
    };
    CustomClassNames.removeDefaultName = function (id, name) {
        if (name === undefined)
            return;
        var record = this.getRecord(id);
        record.default = record.default.filter(function (n) { return n !== name; });
        this.updateClassList(id);
    };
    CustomClassNames.clearDefaultNames = function (id) {
        var record = this.getRecord(id);
        record.default = [];
        this.updateClassList(id);
    };
    CustomClassNames.addCustomName = function (id, name) {
        if (name === undefined)
            return;
        var record = this.getRecord(id);
        if (!record.custom.includes(name)) {
            record.custom.push(name);
            this.updateClassList(id);
        }
    };
    CustomClassNames.removeCustomName = function (id, name) {
        if (name === undefined)
            return;
        var record = this.getRecord(id);
        record.custom = record.custom.filter(function (n) { return n !== name; });
        this.updateClassList(id);
    };
    CustomClassNames.clearCustomNames = function (id) {
        var record = this.getRecord(id);
        record.custom = [];
        this.updateClassList(id);
    };
    CustomClassNames.data = [];
    return CustomClassNames;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomClassNames);


/***/ }),

/***/ "./src/Filter.ts":
/*!***********************!*\
  !*** ./src/Filter.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomClassNames */ "./src/CustomClassNames.ts");

var Filter = /** @class */ (function () {
    function Filter(parent) {
        var _this = this;
        this.container = document.createElement('div');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('filterContainer', this.container);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('filterContainer', 'zgrid_filter_container');
        var input = document.createElement('input');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('filter', input);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('filter', 'zgrid_filter');
        input.type = 'text';
        input.placeholder = 'Type a keyword...';
        input.oninput = function (e) {
            if (_this.oninput != undefined)
                _this.oninput(e, input.value);
        };
        this.container.appendChild(input);
        parent.appendChild(this.container);
    }
    Object.defineProperty(Filter.prototype, "visible", {
        get: function () {
            return this.container.classList.contains('zgrid_hidden');
        },
        set: function (v) {
            if (v)
                this.container.classList.remove('zgrid_hidden');
            else
                this.container.classList.add('zgrid_hidden');
        },
        enumerable: false,
        configurable: true
    });
    return Filter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Filter);


/***/ }),

/***/ "./src/HeaderCell.ts":
/*!***************************!*\
  !*** ./src/HeaderCell.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomClassNames */ "./src/CustomClassNames.ts");

var HeaderCell = /** @class */ (function () {
    function HeaderCell(parent) {
        this.current_sort = "none";
        this.sort_enabled = true;
        this.resizing = false;
        this.element = document.createElement('th');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('th', this.element);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addCustomName('th', 'zgrid_header');
        var container = document.createElement('div');
        container.classList.add('zgrid_header_content');
        this.title = document.createElement('div');
        this.title.classList.add('zgrid_title');
        this.setupSorting();
        this.setupResizing();
        container.appendChild(this.title);
        container.appendChild(this.buttonContainer);
        container.appendChild(this.resize);
        this.element.appendChild(container);
        parent.appendChild(this.element);
    }
    HeaderCell.prototype.setupSorting = function () {
        var _this = this;
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.classList.add('zgrid_sort_button_container');
        this.sortAscending = document.createElement('button');
        this.sortAscending.classList.add('zgrid_sort_button');
        this.sortAscending.innerText = "▲";
        this.sortAscending.onclick = function (e) {
            if (!_this.sort_enabled || _this.resizing)
                return;
            _this.sort = _this.current_sort === "ascending" ? "none" : "ascending";
            if (_this.onsort !== undefined)
                _this.onsort(_this.current_sort);
            e.stopPropagation();
        };
        this.sortDescending = document.createElement('button');
        this.sortDescending.classList.add('zgrid_sort_button');
        this.sortDescending.innerText = "▼";
        this.sortDescending.onclick = function (e) {
            if (!_this.sort_enabled || _this.resizing)
                return;
            _this.sort = _this.sort === "descending" ? "none" : "descending";
            if (_this.onsort !== undefined)
                _this.onsort(_this.sort);
            e.stopPropagation();
        };
        this.title.onclick = function (e) {
            if (!_this.sort_enabled || _this.resizing)
                return;
            if (_this.sort === "none")
                _this.sort = "ascending";
            else if (_this.sort === "ascending")
                _this.sort = "descending";
            else if (_this.sort === "descending")
                _this.sort = "none";
            if (_this.onsort !== undefined)
                _this.onsort(_this.sort);
        };
        this.buttonContainer.appendChild(this.sortAscending);
        this.buttonContainer.appendChild(this.sortDescending);
    };
    HeaderCell.prototype.setupResizing = function () {
        var _this = this;
        this.resize = document.createElement('button');
        var x = 0;
        var width = 0;
        document.addEventListener('mousemove', function (e) {
            if (!_this.resizing)
                return;
            var dx = e.clientX - x;
            var new_width = width + dx;
            if (new_width < 0) {
                new_width = 0;
                dx = new_width - width;
            }
            _this.element.style.width = "".concat(new_width, "px");
            x = e.clientX;
            width = new_width;
            if (_this.onresize != undefined)
                _this.onresize(width, dx);
        });
        document.addEventListener('mouseup', function (e) {
            if (!_this.resizing)
                return;
            _this.resizing = false;
        });
        this.resize.onmousedown = function (e) {
            _this.resizing = true;
            x = e.clientX;
            width = _this.element.offsetWidth;
            e.stopPropagation();
        };
        this.resize.classList.add('zgrid_column_resize');
    };
    Object.defineProperty(HeaderCell.prototype, "innerText", {
        set: function (text) {
            this.title.innerText = text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeaderCell.prototype, "sort", {
        get: function () {
            return this.current_sort;
        },
        set: function (sort) {
            var active_class = 'zgrid_sort_button_active';
            if (sort === "none") {
                this.sortAscending.classList.remove(active_class);
                this.sortDescending.classList.remove(active_class);
            }
            else if (sort === "ascending") {
                this.sortAscending.classList.add(active_class);
                this.sortDescending.classList.remove(active_class);
            }
            else if (sort === "descending") {
                this.sortAscending.classList.remove(active_class);
                this.sortDescending.classList.add(active_class);
            }
            this.current_sort = sort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HeaderCell.prototype, "width", {
        get: function () {
            return parseFloat(this.element.style.width);
        },
        set: function (w) {
            if (w === undefined)
                this.element.style.width = '';
            else
                this.element.style.width = "".concat(w, "px");
        },
        enumerable: false,
        configurable: true
    });
    HeaderCell.prototype.enableSort = function (enable) {
        if (enable)
            this.buttonContainer.classList.remove("zgrid_hidden");
        else
            this.buttonContainer.classList.add("zgrid_hidden");
        this.sort_enabled = enable;
    };
    return HeaderCell;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderCell);


/***/ }),

/***/ "./src/Pages.ts":
/*!**********************!*\
  !*** ./src/Pages.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomClassNames */ "./src/CustomClassNames.ts");

var Pages = /** @class */ (function () {
    function Pages(parent, pages) {
        var _this = this;
        if (pages === void 0) { pages = 1; }
        var container = document.createElement('div');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('paginationContainer', container);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('paginationContainer', 'zgrid_pages_container');
        var previous = document.createElement('button');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('paginationPrevious', previous);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('paginationPrevious', 'zgrid_page_button');
        previous.innerText = 'Previous';
        previous.onclick = function () { return _this.previousPage(); };
        container.appendChild(previous);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('paginationCurrent', 'zgrid_page_button');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('paginationCurrent', 'zgrid_current_page');
        this.buttons = [];
        for (var i = 0; i < 7; i++) {
            this.buttons[i] = document.createElement('button');
            _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement("paginationButton", this.buttons[i]);
            this.buttons[i].innerText = "".concat(i + 1);
            container.appendChild(this.buttons[i]);
        }
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName("paginationButton", 'zgrid_page_button');
        var next = document.createElement('button');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('paginationNext', next);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('paginationNext', 'zgrid_page_button');
        next.innerText = 'Next';
        next.onclick = function (e) { return _this.nextPage(); };
        container.appendChild(next);
        parent.appendChild(container);
        this.totalPages = pages;
        this.page = 1;
    }
    Object.defineProperty(Pages.prototype, "totalPages", {
        get: function () {
            return this.maxPages;
        },
        set: function (pages) {
            if (pages === this.maxPages)
                return;
            if (pages <= 7) {
                for (var i = pages; i < 7; i++) {
                    this.buttons[i].classList.add('zgrid_hidden');
                }
            }
            else {
                for (var i = 0; i < 7; i++) {
                    this.buttons[i].classList.remove('zgrid_hidden');
                }
            }
            this.maxPages = pages;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pages.prototype, "page", {
        get: function () {
            return this.currentPage;
        },
        set: function (p) {
            var _this = this;
            if (p < 0) {
                throw new RangeError("page (".concat(p, ") cannot be less than zero"));
            }
            else if (p > this.maxPages) {
                throw new RangeError("page (".concat(p, ") cannot be greater than the total number of pages (").concat(this.maxPages, ")"));
            }
            var _loop_1 = function (i) {
                var newPage;
                if (this_1.maxPages <= 7) {
                    newPage = i + 1;
                }
                else if (i == 0) {
                    newPage = 1;
                }
                else if ((i == 1 && p > 4)
                    || (i == this_1.buttons.length - 2 && p < this_1.maxPages - 3)) {
                    newPage = undefined;
                }
                else if (i == this_1.buttons.length - 1) {
                    newPage = this_1.maxPages;
                }
                else {
                    var adjust = p <= 4 ? 4 : p;
                    adjust = p >= this_1.maxPages - 3 ? this_1.maxPages - 3 : adjust;
                    newPage = adjust + (i - 3);
                }
                this_1.buttons[i].innerText = "".concat(newPage ? newPage : '...');
                if (newPage === undefined) {
                    this_1.buttons[i].onclick = undefined;
                    _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].removeElement('paginationCurrent', this_1.buttons[i]);
                    _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement("paginationButton", this_1.buttons[i]);
                }
                else {
                    this_1.buttons[i].onclick = function (e) {
                        _this.page = newPage;
                    };
                    if (newPage == p) {
                        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].removeElement("paginationButtons", this_1.buttons[i]);
                        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('paginationCurrent', this_1.buttons[i]);
                    }
                    else {
                        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement("paginationButton", this_1.buttons[i]);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.buttons.length; i++) {
                _loop_1(i);
            }
            this.currentPage = p;
            if (this.onpagechange !== undefined)
                this.onpagechange(p);
        },
        enumerable: false,
        configurable: true
    });
    Pages.prototype.nextPage = function () {
        if (this.currentPage == this.maxPages)
            return;
        this.page = this.currentPage + 1;
    };
    Pages.prototype.previousPage = function () {
        if (this.currentPage == 1)
            return;
        this.page = this.currentPage - 1;
    };
    return Pages;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pages);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/zGrid.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomClassNames */ "./src/CustomClassNames.ts");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter */ "./src/Filter.ts");
/* harmony import */ var _HeaderCell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HeaderCell */ "./src/HeaderCell.ts");
/* harmony import */ var _Pages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages */ "./src/Pages.ts");
var __assign = (undefined && undefined.__assign) || function () {
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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var zGrid = /** @class */ (function () {
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
    function zGrid(config) {
        this.currentPage = 1;
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
        this.configureUI();
        this.configureClassName(config.className);
        this.render();
    }
    zGrid.prototype.configureParent = function (parent) {
        if (parent === null) {
            throw new TypeError('Parent cannot be null');
        }
        else if (parent === undefined) {
            throw new TypeError('Parent cannot be undefined');
        }
        else if (!(parent instanceof HTMLElement)) {
            throw new TypeError('Parent must be HTMLElement');
        }
        else if (parent.hasChildNodes()) {
            throw new TypeError('Parent must not have child nodes');
        }
        return parent;
    };
    zGrid.prototype.configureColumns = function (columns) {
        if (columns === null) {
            throw new TypeError('Columns cannot be null');
        }
        else if (columns === undefined) {
            throw new TypeError('Columns cannot be undefined');
        }
        else if (!Array.isArray(columns)) {
            throw new TypeError('Columns must be array or object');
        }
        else if (columns.length < 1) {
            throw new Error('Columns length must be at least 1');
        }
        var ret = [];
        ret = columns.map(function (e) {
            var col;
            if (typeof e === 'string') {
                col = {
                    name: e,
                    sort: true,
                    visible: true
                };
            }
            else if (typeof e === 'object') {
                if (e.name === undefined) {
                    throw new TypeError('Column requires a name');
                }
                col = {
                    name: e.name,
                    sort: e.sort === undefined ? true : e.sort,
                    visible: e.visible === undefined ? true : e.visible,
                };
            }
            return col;
        });
        return ret;
    };
    zGrid.prototype.configureData = function (data) {
        var _this = this;
        var ret;
        if (!Array.isArray(data)) {
            throw new TypeError('Data must be an array');
        }
        ret = data.map(function (e) {
            var row = {};
            if (Array.isArray(e)) {
                _this.columns.forEach(function (c, i) {
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
        return ret;
    };
    zGrid.prototype.configurePagination = function (pagination) {
        var ret;
        if (!pagination) {
            ret = false;
        }
        else if (typeof pagination === 'number' && pagination > 0) {
            ret = pagination;
        }
        else {
            throw new TypeError('Pagination must be a number greater than 0');
        }
        return ret;
    };
    zGrid.prototype.configureFilter = function (filter) {
        var ret;
        if (!filter) {
            ret = '';
        }
        else if (typeof filter === 'string' || typeof filter === 'function') {
            ret = filter;
        }
        else {
            throw new TypeError('Filter must be a string or function');
        }
        return ret;
    };
    zGrid.prototype.configureClassName = function (className) {
        this.className = className === undefined ? {} : className;
        for (var _i = 0, _a = Object.entries(this.className); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (!/^-?[_a-zA-Z]+[_a-zA-Z0-9-]$/.test(value))
                throw new Error("Invalid css class name (".concat(value, ")"));
            _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].clearCustomNames(key);
            _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addCustomName(key, value);
        }
        ;
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addCustomName('paginationNext', this.className.paginationButton);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addCustomName('paginationPrevious', this.className.paginationButton);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addCustomName('paginationCurrent', this.className.paginationButton);
    };
    zGrid.prototype.configureUI = function () {
        var _this = this;
        this.body = document.createElement('tbody');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('tbody', this.body);
        var container = document.createElement('div');
        container.classList.add('zgrid_container');
        var table = document.createElement('table');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('table', table);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('table', 'zgrid_table');
        this.head = document.createElement('thead');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('thead', this.head);
        // filter
        this.ui_filter = new _Filter__WEBPACK_IMPORTED_MODULE_1__["default"](container);
        this.ui_filter.visible = this.showFilter;
        this.ui_filter.oninput = function (_, v) {
            _this.reconfigure({
                filter: v,
            });
            // callback
            if (_this.onFilter != undefined)
                _this.onFilter(v);
            // modify data & pageui
            _this.renderData();
        };
        // header
        // this.createHeader(head);
        table.appendChild(this.head);
        // data
        table.appendChild(this.body);
        container.appendChild(table);
        // pages
        this.pages_info_container = document.createElement('div');
        this.pages_info_container.classList.add('zgrid_pages_info_container');
        if (!this.pagination)
            this.pages_info_container.classList.add('zgrid_hidden');
        this.pages_info = document.createElement('div');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('paginationInfo', this.pages_info);
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('paginationInfo', 'zgrid_pages_info');
        this.pages_info_container.appendChild(this.pages_info);
        this.ui_pages = new _Pages__WEBPACK_IMPORTED_MODULE_3__["default"](this.pages_info_container);
        this.ui_pages.page = 1;
        this.ui_pages.onpagechange = function (p) {
            if (p === _this.currentPage)
                return;
            if (_this.onPageChange !== undefined)
                _this.onPageChange(p);
            _this.currentPage = p;
            _this.renderData();
        };
        container.appendChild(this.pages_info_container);
        this.parent.appendChild(container);
    };
    zGrid.prototype.reconfigure = function (config) {
        if (config.parent !== undefined) {
            var old_parent = this.parent;
            this.parent = this.configureParent(config.parent);
            this.parent.appendChild(old_parent.firstChild);
        }
        if (config.columns !== undefined) {
            this.columns = this.configureColumns(config.columns);
            // reset sort if sorting by a removed column
            if (this.sortConfig && typeof this.sortConfig !== 'function') {
                var sort_1 = this.sortConfig.column;
                if (!this.columns.some(function (e) { return e.name === sort_1; }))
                    this.sort();
            }
            this.render();
        }
        if (config.data !== undefined) {
            this.data = this.configureData(config.data);
            this.renderData();
        }
        if (config.pagination !== undefined) {
            this.pagination = this.configurePagination(config.pagination);
            if (this.pagination)
                this.pages_info_container.classList.remove('zgrid_hidden');
            else
                this.pages_info_container.classList.add('zgrid_hidden');
            this.renderData();
        }
        if (config.filter !== undefined) {
            this.filter = this.configureFilter(config.filter);
            this.renderData();
        }
        if (config.searchbox !== undefined) {
            this.showFilter = config.searchbox;
            this.ui_filter.visible = this.showFilter;
        }
        if (config.onFilter !== undefined)
            this.onFilter = config.onFilter;
        if (config.onPageChange !== undefined)
            this.onPageChange = config.onPageChange;
        if (config.onSort !== undefined)
            this.onSort = config.onSort;
        if (config.onClick !== undefined)
            this.onClick = config.onClick;
    };
    zGrid.prototype.getRow = function (index) {
        if (index < 0) {
            throw new RangeError('index cannot be less than zero');
        }
        else if (index >= this.data.length) {
            throw new RangeError('index cannot be greater than or equal to the number of rows');
        }
        return __assign({}, this.data[index]);
    };
    ;
    /**
     * Gets the currently displayed data, after filtering
     * sorting, and pagination are applied.
     * @returns An array of objects. Each element of the array is a single row.
     * The objects are key-value pairs where the key is the name of a column and
     * the value is what is in that cell.
     */
    zGrid.prototype.getData = function () {
        var _this = this;
        var ret = [];
        var page = [];
        var filtered = [];
        // filter
        if (this.filter) {
            if (typeof this.filter === 'string') {
                var filter_1 = this.filter;
                filtered = this.data.filter(function (r) {
                    return _this.columns.some(function (c) {
                        return r[c.name].toLocaleLowerCase().includes(filter_1.toLocaleLowerCase());
                    });
                });
            }
            else if (typeof this.filter === 'function') {
                var filter_2 = this.filter;
                filtered = this.data.filter(function (r) {
                    var entry = {};
                    _this.columns.forEach(function (c) { return (entry[c.name] = r[c.name]); });
                    return filter_2(entry);
                });
            }
        }
        else {
            filtered = __spreadArray([], this.data, true);
        }
        // sorting
        if (this.sortConfig) {
            if (typeof this.sortConfig === 'function') {
                filtered.sort(this.sortConfig);
            }
            else if (typeof this.sortConfig === 'object') {
                var col_name_1 = this.sortConfig.column;
                var col_config = this.columns.find(function (e) { return e.name === col_name_1; });
                if (typeof col_config.sort === 'function') {
                    var col_sort_1 = col_config.sort;
                    filtered.sort(function (a, b) { return col_sort_1(a[col_name_1], b[col_name_1]); });
                }
                else {
                    filtered.sort(function (a, b) { return a[col_name_1].localeCompare(b[col_name_1]); });
                }
                if (!this.sortConfig.ascending)
                    filtered.reverse();
            }
        }
        // pagination
        if (this.pagination) {
            var page_count = Math.ceil(filtered.length / this.pagination);
            this.ui_pages.totalPages = page_count === 0 ? 1 : page_count;
            if (this.currentPage > this.ui_pages.totalPages) {
                this.currentPage = this.ui_pages.totalPages;
                this.ui_pages.page = this.currentPage;
            }
            var start = (this.currentPage - 1) * this.pagination;
            var end = start + this.pagination;
            page = filtered.slice(start, end);
            this.pages_info.innerText = "Showing ".concat(page.length === 0 ? 0 : start + 1, " to ").concat(start + page.length, " of ").concat(filtered.length, " results");
        }
        else {
            page = filtered;
        }
        page.forEach(function (e, i) {
            ret.push(__assign({}, e));
        });
        return ret;
    };
    ;
    Object.defineProperty(zGrid.prototype, "page", {
        get: function () {
            return this.currentPage;
        },
        set: function (page) {
            if (!(typeof page === 'number' && page > 0)) {
                throw new TypeError('Page must be a postive number');
            }
            this.currentPage = page;
            this.ui_pages.page = page;
            this.renderData();
        },
        enumerable: false,
        configurable: true
    });
    ;
    ;
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
    zGrid.prototype.setFilter = function (filter) {
        var f = filter === undefined ? '' : filter;
        if (typeof filter === 'string' || typeof filter === 'function') {
            this.filter = f;
        }
        else {
            throw new TypeError('Filter must be a string or function');
        }
    };
    ;
    zGrid.prototype.sort = function (column, ascending) {
        if (ascending === void 0) { ascending = true; }
        if (column == undefined || column == false) {
            this.sortConfig = false;
        }
        else if (typeof column === 'function') {
            this.sortConfig = column;
        }
        else {
            var col = this.columns.find(function (e) { return e.name === column; });
            if (col === undefined) {
                throw new RangeError("No column named '".concat(column, "'"));
            }
            else if (ascending && typeof ascending !== 'boolean') {
                throw new TypeError('Ascending must be boolean');
            }
            else {
                this.sortConfig = {
                    column: column,
                    ascending: ascending,
                };
            }
        }
    };
    ;
    zGrid.prototype.render = function () {
        this.renderHeader();
        this.renderData();
    };
    ;
    zGrid.prototype.renderHeader = function () {
        var _this = this;
        this.head.replaceChildren();
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].clearElements('th');
        var headerRow = document.createElement('tr');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].clearElements('tr');
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('tr', headerRow);
        var col_count = this.columns.filter(function (c) { return c.visible; }).length;
        var prev = undefined;
        this.columns.forEach(function (config) {
            if (config.visible === false)
                return;
            var title = new _HeaderCell__WEBPACK_IMPORTED_MODULE_2__["default"](headerRow);
            title.width = _this.head.clientWidth / col_count;
            title.onsort = function (sort) {
                if (sort === "none") {
                    _this.sort(false);
                }
                else {
                    var ascending = sort === "ascending";
                    _this.sort(config.name, ascending);
                    if (_this.onSort !== undefined)
                        _this.onSort(config.name, ascending);
                }
                _this.renderData();
            };
            if (prev !== undefined) {
                prev.onresize = function (width, change) {
                    title.width = title.width - change;
                };
            }
            prev = title;
            if (typeof _this.sortConfig === "object" && _this.sortConfig.column === config.name) {
                title.sort = _this.sortConfig.ascending ? "ascending" : "descending";
            }
            if (config !== undefined) {
                if (config.sort === false)
                    title.enableSort(false);
            }
            title.innerText = config.name;
        });
        this.head.appendChild(headerRow);
    };
    zGrid.prototype.renderData = function () {
        var _this = this;
        this.body.replaceChildren();
        _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].clearElements('td');
        this.getData().forEach(function (d, r_i) {
            var row = document.createElement('tr');
            row.classList.add('zgrid_row');
            _this.columns.forEach(function (c, c_i) {
                var config = _this.columns.find(function (e) { return e.name === c.name; });
                if (config.visible === false)
                    return;
                var cell = document.createElement('td');
                _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addElement('td', cell);
                _CustomClassNames__WEBPACK_IMPORTED_MODULE_0__["default"].addDefaultName('td', 'zgrid_cell');
                cell.onclick = function () {
                    if (!_this.onClick)
                        return;
                    _this.onClick(c_i, r_i, c.name, structuredClone(d));
                };
                cell.classList.add('zgrid_cell');
                cell.innerText = d[c.name];
                row.appendChild(cell);
            });
            _this.body.appendChild(row);
        });
    };
    return zGrid;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (zGrid);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiekdyaWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCw0QkFBNEI7QUFDOUUsaURBQWlELDRCQUE0QjtBQUM3RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsdUJBQXVCO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFCQUFxQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsb0JBQW9CO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsb0JBQW9CO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxnQkFBZ0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGa0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFnQjtBQUN4QixRQUFRLHlEQUFnQjtBQUN4QjtBQUNBLFFBQVEseURBQWdCO0FBQ3hCLFFBQVEseURBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEM0QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFnQjtBQUN4QixRQUFRLHlEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkp3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxn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Q0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELDJCQUEyQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBZ0I7QUFDeEI7QUFDQSxRQUFRLHlEQUFnQjtBQUN4QixRQUFRLHlEQUFnQjtBQUN4QiwyREFBMkQsbUJBQW1CO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1EQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsMkJBQTJCO0FBQzFGO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5REFBZ0I7QUFDaEMsZ0JBQWdCLHlEQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsS0FBSyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vemdyaWQvLi9zcmMvQ3VzdG9tQ2xhc3NOYW1lcy50cyIsIndlYnBhY2s6Ly96Z3JpZC8uL3NyYy9GaWx0ZXIudHMiLCJ3ZWJwYWNrOi8vemdyaWQvLi9zcmMvSGVhZGVyQ2VsbC50cyIsIndlYnBhY2s6Ly96Z3JpZC8uL3NyYy9QYWdlcy50cyIsIndlYnBhY2s6Ly96Z3JpZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly96Z3JpZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vemdyaWQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly96Z3JpZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3pncmlkLy4vc3JjL3pHcmlkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBDdXN0b21DbGFzc05hbWVzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEN1c3RvbUNsYXNzTmFtZXMoKSB7XG4gICAgfVxuICAgIEN1c3RvbUNsYXNzTmFtZXMuY2xlYXJSZWNvcmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB9O1xuICAgIEN1c3RvbUNsYXNzTmFtZXMudXBkYXRlQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciByZWNvcmQgPSB0aGlzLmdldFJlY29yZChpZCk7XG4gICAgICAgIHJlY29yZC5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgcmVjb3JkLmRlZmF1bHQuZm9yRWFjaChmdW5jdGlvbiAobikgeyByZXR1cm4gZS5jbGFzc0xpc3QuYWRkKG4pOyB9KTtcbiAgICAgICAgICAgIHJlY29yZC5jdXN0b20uZm9yRWFjaChmdW5jdGlvbiAobikgeyByZXR1cm4gZS5jbGFzc0xpc3QuYWRkKG4pOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDdXN0b21DbGFzc05hbWVzLmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoaWQsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMuZ2V0UmVjb3JkKGlkKTtcbiAgICAgICAgaWYgKHJlY29yZC5lbGVtZW50cy5pbmNsdWRlcyhlbGVtZW50KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmVjb3JkLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NMaXN0KGlkKTtcbiAgICB9O1xuICAgIEN1c3RvbUNsYXNzTmFtZXMucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uIChpZCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgcmVjb3JkID0gdGhpcy5nZXRSZWNvcmQoaWQpO1xuICAgICAgICByZWNvcmQuZWxlbWVudHMgPSByZWNvcmQuZWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBlbGVtZW50OyB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc0xpc3QoaWQpO1xuICAgIH07XG4gICAgQ3VzdG9tQ2xhc3NOYW1lcy5jbGVhckVsZW1lbnRzID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciByZWNvcmQgPSB0aGlzLmdldFJlY29yZChpZCk7XG4gICAgICAgIHJlY29yZC5lbGVtZW50cyA9IFtdO1xuICAgIH07XG4gICAgQ3VzdG9tQ2xhc3NOYW1lcy5nZXRSZWNvcmQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMuZGF0YS5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmlkID09PSBpZDsgfSk7XG4gICAgICAgIGlmIChyZWNvcmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVjb3JkID0ge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBlbGVtZW50czogW10sXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICAgICAgY3VzdG9tOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICB9O1xuICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRGVmYXVsdE5hbWUgPSBmdW5jdGlvbiAoaWQsIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMuZ2V0UmVjb3JkKGlkKTtcbiAgICAgICAgaWYgKCFyZWNvcmQuZGVmYXVsdC5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgcmVjb3JkLmRlZmF1bHQucHVzaChuYW1lKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3NMaXN0KGlkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ3VzdG9tQ2xhc3NOYW1lcy5yZW1vdmVEZWZhdWx0TmFtZSA9IGZ1bmN0aW9uIChpZCwgbmFtZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgcmVjb3JkID0gdGhpcy5nZXRSZWNvcmQoaWQpO1xuICAgICAgICByZWNvcmQuZGVmYXVsdCA9IHJlY29yZC5kZWZhdWx0LmZpbHRlcihmdW5jdGlvbiAobikgeyByZXR1cm4gbiAhPT0gbmFtZTsgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NMaXN0KGlkKTtcbiAgICB9O1xuICAgIEN1c3RvbUNsYXNzTmFtZXMuY2xlYXJEZWZhdWx0TmFtZXMgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMuZ2V0UmVjb3JkKGlkKTtcbiAgICAgICAgcmVjb3JkLmRlZmF1bHQgPSBbXTtcbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc0xpc3QoaWQpO1xuICAgIH07XG4gICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRDdXN0b21OYW1lID0gZnVuY3Rpb24gKGlkLCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciByZWNvcmQgPSB0aGlzLmdldFJlY29yZChpZCk7XG4gICAgICAgIGlmICghcmVjb3JkLmN1c3RvbS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgcmVjb3JkLmN1c3RvbS5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDbGFzc0xpc3QoaWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDdXN0b21DbGFzc05hbWVzLnJlbW92ZUN1c3RvbU5hbWUgPSBmdW5jdGlvbiAoaWQsIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRoaXMuZ2V0UmVjb3JkKGlkKTtcbiAgICAgICAgcmVjb3JkLmN1c3RvbSA9IHJlY29yZC5jdXN0b20uZmlsdGVyKGZ1bmN0aW9uIChuKSB7IHJldHVybiBuICE9PSBuYW1lOyB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc0xpc3QoaWQpO1xuICAgIH07XG4gICAgQ3VzdG9tQ2xhc3NOYW1lcy5jbGVhckN1c3RvbU5hbWVzID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciByZWNvcmQgPSB0aGlzLmdldFJlY29yZChpZCk7XG4gICAgICAgIHJlY29yZC5jdXN0b20gPSBbXTtcbiAgICAgICAgdGhpcy51cGRhdGVDbGFzc0xpc3QoaWQpO1xuICAgIH07XG4gICAgQ3VzdG9tQ2xhc3NOYW1lcy5kYXRhID0gW107XG4gICAgcmV0dXJuIEN1c3RvbUNsYXNzTmFtZXM7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tQ2xhc3NOYW1lcztcbiIsImltcG9ydCBDdXN0b21DbGFzc05hbWVzIGZyb20gXCIuL0N1c3RvbUNsYXNzTmFtZXNcIjtcbnZhciBGaWx0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmlsdGVyKHBhcmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZEVsZW1lbnQoJ2ZpbHRlckNvbnRhaW5lcicsIHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGREZWZhdWx0TmFtZSgnZmlsdGVyQ29udGFpbmVyJywgJ3pncmlkX2ZpbHRlcl9jb250YWluZXInKTtcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KCdmaWx0ZXInLCBpbnB1dCk7XG4gICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRGVmYXVsdE5hbWUoJ2ZpbHRlcicsICd6Z3JpZF9maWx0ZXInKTtcbiAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXQucGxhY2Vob2xkZXIgPSAnVHlwZSBhIGtleXdvcmQuLi4nO1xuICAgICAgICBpbnB1dC5vbmlucHV0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vbmlucHV0ICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBfdGhpcy5vbmlucHV0KGUsIGlucHV0LnZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRmlsdGVyLnByb3RvdHlwZSwgXCJ2aXNpYmxlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCd6Z3JpZF9oaWRkZW4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKHYpXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnemdyaWRfaGlkZGVuJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnemdyaWRfaGlkZGVuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gRmlsdGVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEZpbHRlcjtcbiIsImltcG9ydCBDdXN0b21DbGFzc05hbWVzIGZyb20gXCIuL0N1c3RvbUNsYXNzTmFtZXNcIjtcbnZhciBIZWFkZXJDZWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEhlYWRlckNlbGwocGFyZW50KSB7XG4gICAgICAgIHRoaXMuY3VycmVudF9zb3J0ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuc29ydF9lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZEVsZW1lbnQoJ3RoJywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRDdXN0b21OYW1lKCd0aCcsICd6Z3JpZF9oZWFkZXInKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnemdyaWRfaGVhZGVyX2NvbnRlbnQnKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ3pncmlkX3RpdGxlJyk7XG4gICAgICAgIHRoaXMuc2V0dXBTb3J0aW5nKCk7XG4gICAgICAgIHRoaXMuc2V0dXBSZXNpemluZygpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbkNvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlc2l6ZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gICAgSGVhZGVyQ2VsbC5wcm90b3R5cGUuc2V0dXBTb3J0aW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd6Z3JpZF9zb3J0X2J1dHRvbl9jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5zb3J0QXNjZW5kaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuc29ydEFzY2VuZGluZy5jbGFzc0xpc3QuYWRkKCd6Z3JpZF9zb3J0X2J1dHRvbicpO1xuICAgICAgICB0aGlzLnNvcnRBc2NlbmRpbmcuaW5uZXJUZXh0ID0gXCLilrJcIjtcbiAgICAgICAgdGhpcy5zb3J0QXNjZW5kaW5nLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5zb3J0X2VuYWJsZWQgfHwgX3RoaXMucmVzaXppbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgX3RoaXMuc29ydCA9IF90aGlzLmN1cnJlbnRfc29ydCA9PT0gXCJhc2NlbmRpbmdcIiA/IFwibm9uZVwiIDogXCJhc2NlbmRpbmdcIjtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vbnNvcnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBfdGhpcy5vbnNvcnQoX3RoaXMuY3VycmVudF9zb3J0KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc29ydERlc2NlbmRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5zb3J0RGVzY2VuZGluZy5jbGFzc0xpc3QuYWRkKCd6Z3JpZF9zb3J0X2J1dHRvbicpO1xuICAgICAgICB0aGlzLnNvcnREZXNjZW5kaW5nLmlubmVyVGV4dCA9IFwi4pa8XCI7XG4gICAgICAgIHRoaXMuc29ydERlc2NlbmRpbmcub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLnNvcnRfZW5hYmxlZCB8fCBfdGhpcy5yZXNpemluZylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBfdGhpcy5zb3J0ID0gX3RoaXMuc29ydCA9PT0gXCJkZXNjZW5kaW5nXCIgPyBcIm5vbmVcIiA6IFwiZGVzY2VuZGluZ1wiO1xuICAgICAgICAgICAgaWYgKF90aGlzLm9uc29ydCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIF90aGlzLm9uc29ydChfdGhpcy5zb3J0KTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGl0bGUub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLnNvcnRfZW5hYmxlZCB8fCBfdGhpcy5yZXNpemluZylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoX3RoaXMuc29ydCA9PT0gXCJub25lXCIpXG4gICAgICAgICAgICAgICAgX3RoaXMuc29ydCA9IFwiYXNjZW5kaW5nXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChfdGhpcy5zb3J0ID09PSBcImFzY2VuZGluZ1wiKVxuICAgICAgICAgICAgICAgIF90aGlzLnNvcnQgPSBcImRlc2NlbmRpbmdcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLnNvcnQgPT09IFwiZGVzY2VuZGluZ1wiKVxuICAgICAgICAgICAgICAgIF90aGlzLnNvcnQgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vbnNvcnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBfdGhpcy5vbnNvcnQoX3RoaXMuc29ydCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuc29ydEFzY2VuZGluZyk7XG4gICAgICAgIHRoaXMuYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuc29ydERlc2NlbmRpbmcpO1xuICAgIH07XG4gICAgSGVhZGVyQ2VsbC5wcm90b3R5cGUuc2V0dXBSZXNpemluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5yZXNpemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdmFyIHggPSAwO1xuICAgICAgICB2YXIgd2lkdGggPSAwO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5yZXNpemluZylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgZHggPSBlLmNsaWVudFggLSB4O1xuICAgICAgICAgICAgdmFyIG5ld193aWR0aCA9IHdpZHRoICsgZHg7XG4gICAgICAgICAgICBpZiAobmV3X3dpZHRoIDwgMCkge1xuICAgICAgICAgICAgICAgIG5ld193aWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgZHggPSBuZXdfd2lkdGggLSB3aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdChuZXdfd2lkdGgsIFwicHhcIik7XG4gICAgICAgICAgICB4ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgd2lkdGggPSBuZXdfd2lkdGg7XG4gICAgICAgICAgICBpZiAoX3RoaXMub25yZXNpemUgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIF90aGlzLm9ucmVzaXplKHdpZHRoLCBkeCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMucmVzaXppbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgX3RoaXMucmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzaXplLm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIF90aGlzLnJlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICB3aWR0aCA9IF90aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2l6ZS5jbGFzc0xpc3QuYWRkKCd6Z3JpZF9jb2x1bW5fcmVzaXplJyk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSGVhZGVyQ2VsbC5wcm90b3R5cGUsIFwiaW5uZXJUZXh0XCIsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgdGhpcy50aXRsZS5pbm5lclRleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhlYWRlckNlbGwucHJvdG90eXBlLCBcInNvcnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRfc29ydDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc29ydCkge1xuICAgICAgICAgICAgdmFyIGFjdGl2ZV9jbGFzcyA9ICd6Z3JpZF9zb3J0X2J1dHRvbl9hY3RpdmUnO1xuICAgICAgICAgICAgaWYgKHNvcnQgPT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0QXNjZW5kaW5nLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlX2NsYXNzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnREZXNjZW5kaW5nLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlX2NsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNvcnQgPT09IFwiYXNjZW5kaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBc2NlbmRpbmcuY2xhc3NMaXN0LmFkZChhY3RpdmVfY2xhc3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydERlc2NlbmRpbmcuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVfY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc29ydCA9PT0gXCJkZXNjZW5kaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBc2NlbmRpbmcuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVfY2xhc3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydERlc2NlbmRpbmcuY2xhc3NMaXN0LmFkZChhY3RpdmVfY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50X3NvcnQgPSBzb3J0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhlYWRlckNlbGwucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh3KSB7XG4gICAgICAgICAgICBpZiAodyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiXCIuY29uY2F0KHcsIFwicHhcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBIZWFkZXJDZWxsLnByb3RvdHlwZS5lbmFibGVTb3J0ID0gZnVuY3Rpb24gKGVuYWJsZSkge1xuICAgICAgICBpZiAoZW5hYmxlKVxuICAgICAgICAgICAgdGhpcy5idXR0b25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInpncmlkX2hpZGRlblwiKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5idXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInpncmlkX2hpZGRlblwiKTtcbiAgICAgICAgdGhpcy5zb3J0X2VuYWJsZWQgPSBlbmFibGU7XG4gICAgfTtcbiAgICByZXR1cm4gSGVhZGVyQ2VsbDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBIZWFkZXJDZWxsO1xuIiwiaW1wb3J0IEN1c3RvbUNsYXNzTmFtZXMgZnJvbSBcIi4vQ3VzdG9tQ2xhc3NOYW1lc1wiO1xudmFyIFBhZ2VzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhZ2VzKHBhcmVudCwgcGFnZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHBhZ2VzID09PSB2b2lkIDApIHsgcGFnZXMgPSAxOyB9XG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KCdwYWdpbmF0aW9uQ29udGFpbmVyJywgY29udGFpbmVyKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGREZWZhdWx0TmFtZSgncGFnaW5hdGlvbkNvbnRhaW5lcicsICd6Z3JpZF9wYWdlc19jb250YWluZXInKTtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRWxlbWVudCgncGFnaW5hdGlvblByZXZpb3VzJywgcHJldmlvdXMpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZERlZmF1bHROYW1lKCdwYWdpbmF0aW9uUHJldmlvdXMnLCAnemdyaWRfcGFnZV9idXR0b24nKTtcbiAgICAgICAgcHJldmlvdXMuaW5uZXJUZXh0ID0gJ1ByZXZpb3VzJztcbiAgICAgICAgcHJldmlvdXMub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnByZXZpb3VzUGFnZSgpOyB9O1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJldmlvdXMpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZERlZmF1bHROYW1lKCdwYWdpbmF0aW9uQ3VycmVudCcsICd6Z3JpZF9wYWdlX2J1dHRvbicpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZERlZmF1bHROYW1lKCdwYWdpbmF0aW9uQ3VycmVudCcsICd6Z3JpZF9jdXJyZW50X3BhZ2UnKTtcbiAgICAgICAgdGhpcy5idXR0b25zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRWxlbWVudChcInBhZ2luYXRpb25CdXR0b25cIiwgdGhpcy5idXR0b25zW2ldKTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS5pbm5lclRleHQgPSBcIlwiLmNvbmNhdChpICsgMSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25zW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZERlZmF1bHROYW1lKFwicGFnaW5hdGlvbkJ1dHRvblwiLCAnemdyaWRfcGFnZV9idXR0b24nKTtcbiAgICAgICAgdmFyIG5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KCdwYWdpbmF0aW9uTmV4dCcsIG5leHQpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZERlZmF1bHROYW1lKCdwYWdpbmF0aW9uTmV4dCcsICd6Z3JpZF9wYWdlX2J1dHRvbicpO1xuICAgICAgICBuZXh0LmlubmVyVGV4dCA9ICdOZXh0JztcbiAgICAgICAgbmV4dC5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLm5leHRQYWdlKCk7IH07XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0KTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMudG90YWxQYWdlcyA9IHBhZ2VzO1xuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGFnZXMucHJvdG90eXBlLCBcInRvdGFsUGFnZXNcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1heFBhZ2VzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwYWdlcykge1xuICAgICAgICAgICAgaWYgKHBhZ2VzID09PSB0aGlzLm1heFBhZ2VzKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChwYWdlcyA8PSA3KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHBhZ2VzOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS5jbGFzc0xpc3QuYWRkKCd6Z3JpZF9oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnemdyaWRfaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXhQYWdlcyA9IHBhZ2VzO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFBhZ2VzLnByb3RvdHlwZSwgXCJwYWdlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmIChwIDwgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwicGFnZSAoXCIuY29uY2F0KHAsIFwiKSBjYW5ub3QgYmUgbGVzcyB0aGFuIHplcm9cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocCA+IHRoaXMubWF4UGFnZXMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInBhZ2UgKFwiLmNvbmNhdChwLCBcIikgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiB0aGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzIChcIikuY29uY2F0KHRoaXMubWF4UGFnZXMsIFwiKVwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhZ2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNfMS5tYXhQYWdlcyA8PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BhZ2UgPSBpICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BhZ2UgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgoaSA9PSAxICYmIHAgPiA0KVxuICAgICAgICAgICAgICAgICAgICB8fCAoaSA9PSB0aGlzXzEuYnV0dG9ucy5sZW5ndGggLSAyICYmIHAgPCB0aGlzXzEubWF4UGFnZXMgLSAzKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdQYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpID09IHRoaXNfMS5idXR0b25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UGFnZSA9IHRoaXNfMS5tYXhQYWdlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGp1c3QgPSBwIDw9IDQgPyA0IDogcDtcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0ID0gcCA+PSB0aGlzXzEubWF4UGFnZXMgLSAzID8gdGhpc18xLm1heFBhZ2VzIC0gMyA6IGFkanVzdDtcbiAgICAgICAgICAgICAgICAgICAgbmV3UGFnZSA9IGFkanVzdCArIChpIC0gMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXNfMS5idXR0b25zW2ldLmlubmVyVGV4dCA9IFwiXCIuY29uY2F0KG5ld1BhZ2UgPyBuZXdQYWdlIDogJy4uLicpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdQYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc18xLmJ1dHRvbnNbaV0ub25jbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5yZW1vdmVFbGVtZW50KCdwYWdpbmF0aW9uQ3VycmVudCcsIHRoaXNfMS5idXR0b25zW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KFwicGFnaW5hdGlvbkJ1dHRvblwiLCB0aGlzXzEuYnV0dG9uc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzXzEuYnV0dG9uc1tpXS5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnBhZ2UgPSBuZXdQYWdlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3UGFnZSA9PSBwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdXN0b21DbGFzc05hbWVzLnJlbW92ZUVsZW1lbnQoXCJwYWdpbmF0aW9uQnV0dG9uc1wiLCB0aGlzXzEuYnV0dG9uc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZEVsZW1lbnQoJ3BhZ2luYXRpb25DdXJyZW50JywgdGhpc18xLmJ1dHRvbnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KFwicGFnaW5hdGlvbkJ1dHRvblwiLCB0aGlzXzEuYnV0dG9uc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcDtcbiAgICAgICAgICAgIGlmICh0aGlzLm9ucGFnZWNoYW5nZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMub25wYWdlY2hhbmdlKHApO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgUGFnZXMucHJvdG90eXBlLm5leHRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSB0aGlzLm1heFBhZ2VzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlICsgMTtcbiAgICB9O1xuICAgIFBhZ2VzLnByb3RvdHlwZS5wcmV2aW91c1BhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09IDEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucGFnZSA9IHRoaXMuY3VycmVudFBhZ2UgLSAxO1xuICAgIH07XG4gICAgcmV0dXJuIFBhZ2VzO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFBhZ2VzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuaW1wb3J0IEN1c3RvbUNsYXNzTmFtZXMgZnJvbSBcIi4vQ3VzdG9tQ2xhc3NOYW1lc1wiO1xuaW1wb3J0IEZpbHRlciBmcm9tIFwiLi9GaWx0ZXJcIjtcbmltcG9ydCBIZWFkZXJDZWxsIGZyb20gXCIuL0hlYWRlckNlbGxcIjtcbmltcG9ydCBQYWdlcyBmcm9tIFwiLi9QYWdlc1wiO1xudmFyIHpHcmlkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDb25maWd1cmF0aW9ufSBjb25maWdcbiAgICAgKiBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGRlZmluaW5nIGhvdyB0aGUgZ3JpZFxuICAgICAqIGZ1bmN0aW9ucyBhbmQgdGhlIGRhdGEgaXQgY29udGFpbnMuXG4gICAgICogQHBhcmFtIGNvbmZpZy5wYXJlbnQgVGhlIEhUTUxFbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGdyaWRcbiAgICAgKiBAcGFyYW0gY29uZmlnLmNvbHVtbnMgVGhlIGNvbHVtbnMgdGhhdCB0aGUgZ3JpZCBjb250YWluc1xuICAgICAqIEBwYXJhbSBjb25maWcuZGF0YSBUaGUgZGF0YSB3aXRoaW4gdGhlIGdyaWRcbiAgICAgKiBAcGFyYW0gY29uZmlnLnBhZ2luYXRpb24gSG93IHRoZSBncmlkIGhhbmRsZXMgcGFnaW5hdGlvblxuICAgICAqIEBwYXJhbSBjb25maWcuZmlsdGVyIEhvdyB0aGUgZ3JpZCBpcyBmaWx0ZXJlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHpHcmlkKGNvbmZpZykge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLmNvbmZpZ3VyZVBhcmVudChjb25maWcucGFyZW50KTtcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5jb25maWd1cmVDb2x1bW5zKGNvbmZpZy5jb2x1bW5zKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5jb25maWd1cmVEYXRhKGNvbmZpZy5kYXRhKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gdGhpcy5jb25maWd1cmVQYWdpbmF0aW9uKGNvbmZpZy5wYWdpbmF0aW9uKTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzLmNvbmZpZ3VyZUZpbHRlcihjb25maWcuZmlsdGVyKTtcbiAgICAgICAgdGhpcy5zaG93RmlsdGVyID0gY29uZmlnLnNlYXJjaGJveCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLm9uRmlsdGVyID0gY29uZmlnLm9uRmlsdGVyO1xuICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZSA9IGNvbmZpZy5vblBhZ2VDaGFuZ2U7XG4gICAgICAgIHRoaXMub25Tb3J0ID0gY29uZmlnLm9uU29ydDtcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gY29uZmlnLm9uQ2xpY2s7XG4gICAgICAgIHRoaXMuY29uZmlndXJlVUkoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmVDbGFzc05hbWUoY29uZmlnLmNsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHpHcmlkLnByb3RvdHlwZS5jb25maWd1cmVQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhcmVudCBjYW5ub3QgYmUgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJlbnQgY2Fubm90IGJlIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEocGFyZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJlbnQgbXVzdCBiZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcmVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhcmVudCBtdXN0IG5vdCBoYXZlIGNoaWxkIG5vZGVzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9O1xuICAgIHpHcmlkLnByb3RvdHlwZS5jb25maWd1cmVDb2x1bW5zID0gZnVuY3Rpb24gKGNvbHVtbnMpIHtcbiAgICAgICAgaWYgKGNvbHVtbnMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbHVtbnMgY2Fubm90IGJlIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbHVtbnMgY2Fubm90IGJlIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGNvbHVtbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb2x1bW5zIG11c3QgYmUgYXJyYXkgb3Igb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sdW1ucy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbHVtbnMgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgMScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgcmV0ID0gY29sdW1ucy5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBjb2w7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY29sID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBlLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmIChlLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb2x1bW4gcmVxdWlyZXMgYSBuYW1lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBlLnNvcnQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBlLnNvcnQsXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGUudmlzaWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGUudmlzaWJsZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICB6R3JpZC5wcm90b3R5cGUuY29uZmlndXJlRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGF0YSBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0ID0gZGF0YS5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSB7fTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGUpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd1tjLm5hbWVdID0gZVtpXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHJvdyA9IF9fYXNzaWduKHt9LCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RhdGEgZWxlbWVudHMgbXVzdCBiZSBzdHJpbmcgb3Igb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIHpHcmlkLnByb3RvdHlwZS5jb25maWd1cmVQYWdpbmF0aW9uID0gZnVuY3Rpb24gKHBhZ2luYXRpb24pIHtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgaWYgKCFwYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcGFnaW5hdGlvbiA9PT0gJ251bWJlcicgJiYgcGFnaW5hdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHJldCA9IHBhZ2luYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYWdpbmF0aW9uIG11c3QgYmUgYSBudW1iZXIgZ3JlYXRlciB0aGFuIDAnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgekdyaWQucHJvdG90eXBlLmNvbmZpZ3VyZUZpbHRlciA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldCA9IGZpbHRlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpbHRlciBtdXN0IGJlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIHpHcmlkLnByb3RvdHlwZS5jb25maWd1cmVDbGFzc05hbWUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2xhc3NOYW1lID09PSB1bmRlZmluZWQgPyB7fSA6IGNsYXNzTmFtZTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5lbnRyaWVzKHRoaXMuY2xhc3NOYW1lKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9hW19pXSwga2V5ID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICBpZiAoIS9eLT9bX2EtekEtWl0rW19hLXpBLVowLTktXSQvLnRlc3QodmFsdWUpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY3NzIGNsYXNzIG5hbWUgKFwiLmNvbmNhdCh2YWx1ZSwgXCIpXCIpKTtcbiAgICAgICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuY2xlYXJDdXN0b21OYW1lcyhrZXkpO1xuICAgICAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRDdXN0b21OYW1lKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRDdXN0b21OYW1lKCdwYWdpbmF0aW9uTmV4dCcsIHRoaXMuY2xhc3NOYW1lLnBhZ2luYXRpb25CdXR0b24pO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZEN1c3RvbU5hbWUoJ3BhZ2luYXRpb25QcmV2aW91cycsIHRoaXMuY2xhc3NOYW1lLnBhZ2luYXRpb25CdXR0b24pO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZEN1c3RvbU5hbWUoJ3BhZ2luYXRpb25DdXJyZW50JywgdGhpcy5jbGFzc05hbWUucGFnaW5hdGlvbkJ1dHRvbik7XG4gICAgfTtcbiAgICB6R3JpZC5wcm90b3R5cGUuY29uZmlndXJlVUkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRWxlbWVudCgndGJvZHknLCB0aGlzLmJvZHkpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd6Z3JpZF9jb250YWluZXInKTtcbiAgICAgICAgdmFyIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KCd0YWJsZScsIHRhYmxlKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGREZWZhdWx0TmFtZSgndGFibGUnLCAnemdyaWRfdGFibGUnKTtcbiAgICAgICAgdGhpcy5oZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KCd0aGVhZCcsIHRoaXMuaGVhZCk7XG4gICAgICAgIC8vIGZpbHRlclxuICAgICAgICB0aGlzLnVpX2ZpbHRlciA9IG5ldyBGaWx0ZXIoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy51aV9maWx0ZXIudmlzaWJsZSA9IHRoaXMuc2hvd0ZpbHRlcjtcbiAgICAgICAgdGhpcy51aV9maWx0ZXIub25pbnB1dCA9IGZ1bmN0aW9uIChfLCB2KSB7XG4gICAgICAgICAgICBfdGhpcy5yZWNvbmZpZ3VyZSh7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiB2LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgaWYgKF90aGlzLm9uRmlsdGVyICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkZpbHRlcih2KTtcbiAgICAgICAgICAgIC8vIG1vZGlmeSBkYXRhICYgcGFnZXVpXG4gICAgICAgICAgICBfdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGhlYWRlclxuICAgICAgICAvLyB0aGlzLmNyZWF0ZUhlYWRlcihoZWFkKTtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGhpcy5oZWFkKTtcbiAgICAgICAgLy8gZGF0YVxuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICAgICAgICAvLyBwYWdlc1xuICAgICAgICB0aGlzLnBhZ2VzX2luZm9fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucGFnZXNfaW5mb19jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnemdyaWRfcGFnZXNfaW5mb19jb250YWluZXInKTtcbiAgICAgICAgaWYgKCF0aGlzLnBhZ2luYXRpb24pXG4gICAgICAgICAgICB0aGlzLnBhZ2VzX2luZm9fY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3pncmlkX2hpZGRlbicpO1xuICAgICAgICB0aGlzLnBhZ2VzX2luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgQ3VzdG9tQ2xhc3NOYW1lcy5hZGRFbGVtZW50KCdwYWdpbmF0aW9uSW5mbycsIHRoaXMucGFnZXNfaW5mbyk7XG4gICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRGVmYXVsdE5hbWUoJ3BhZ2luYXRpb25JbmZvJywgJ3pncmlkX3BhZ2VzX2luZm8nKTtcbiAgICAgICAgdGhpcy5wYWdlc19pbmZvX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnBhZ2VzX2luZm8pO1xuICAgICAgICB0aGlzLnVpX3BhZ2VzID0gbmV3IFBhZ2VzKHRoaXMucGFnZXNfaW5mb19jb250YWluZXIpO1xuICAgICAgICB0aGlzLnVpX3BhZ2VzLnBhZ2UgPSAxO1xuICAgICAgICB0aGlzLnVpX3BhZ2VzLm9ucGFnZWNoYW5nZSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICBpZiAocCA9PT0gX3RoaXMuY3VycmVudFBhZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKF90aGlzLm9uUGFnZUNoYW5nZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIF90aGlzLm9uUGFnZUNoYW5nZShwKTtcbiAgICAgICAgICAgIF90aGlzLmN1cnJlbnRQYWdlID0gcDtcbiAgICAgICAgICAgIF90aGlzLnJlbmRlckRhdGEoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucGFnZXNfaW5mb19jb250YWluZXIpO1xuICAgICAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIH07XG4gICAgekdyaWQucHJvdG90eXBlLnJlY29uZmlndXJlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLnBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgb2xkX3BhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLmNvbmZpZ3VyZVBhcmVudChjb25maWcucGFyZW50KTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKG9sZF9wYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5jb2x1bW5zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuY29uZmlndXJlQ29sdW1ucyhjb25maWcuY29sdW1ucyk7XG4gICAgICAgICAgICAvLyByZXNldCBzb3J0IGlmIHNvcnRpbmcgYnkgYSByZW1vdmVkIGNvbHVtblxuICAgICAgICAgICAgaWYgKHRoaXMuc29ydENvbmZpZyAmJiB0eXBlb2YgdGhpcy5zb3J0Q29uZmlnICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNvcnRfMSA9IHRoaXMuc29ydENvbmZpZy5jb2x1bW47XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbHVtbnMuc29tZShmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSBzb3J0XzE7IH0pKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuY29uZmlndXJlRGF0YShjb25maWcuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnBhZ2luYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gdGhpcy5jb25maWd1cmVQYWdpbmF0aW9uKGNvbmZpZy5wYWdpbmF0aW9uKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlc19pbmZvX2NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd6Z3JpZF9oaWRkZW4nKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VzX2luZm9fY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3pncmlkX2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5maWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSB0aGlzLmNvbmZpZ3VyZUZpbHRlcihjb25maWcuZmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuc2VhcmNoYm94ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZpbHRlciA9IGNvbmZpZy5zZWFyY2hib3g7XG4gICAgICAgICAgICB0aGlzLnVpX2ZpbHRlci52aXNpYmxlID0gdGhpcy5zaG93RmlsdGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcub25GaWx0ZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMub25GaWx0ZXIgPSBjb25maWcub25GaWx0ZXI7XG4gICAgICAgIGlmIChjb25maWcub25QYWdlQ2hhbmdlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZSA9IGNvbmZpZy5vblBhZ2VDaGFuZ2U7XG4gICAgICAgIGlmIChjb25maWcub25Tb3J0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLm9uU29ydCA9IGNvbmZpZy5vblNvcnQ7XG4gICAgICAgIGlmIChjb25maWcub25DbGljayAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrID0gY29uZmlnLm9uQ2xpY2s7XG4gICAgfTtcbiAgICB6R3JpZC5wcm90b3R5cGUuZ2V0Um93ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdpbmRleCBjYW5ub3QgYmUgbGVzcyB0aGFuIHplcm8nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA+PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignaW5kZXggY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHJvd3MnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX19hc3NpZ24oe30sIHRoaXMuZGF0YVtpbmRleF0pO1xuICAgIH07XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgZGF0YSwgYWZ0ZXIgZmlsdGVyaW5nXG4gICAgICogc29ydGluZywgYW5kIHBhZ2luYXRpb24gYXJlIGFwcGxpZWQuXG4gICAgICogQHJldHVybnMgQW4gYXJyYXkgb2Ygb2JqZWN0cy4gRWFjaCBlbGVtZW50IG9mIHRoZSBhcnJheSBpcyBhIHNpbmdsZSByb3cuXG4gICAgICogVGhlIG9iamVjdHMgYXJlIGtleS12YWx1ZSBwYWlycyB3aGVyZSB0aGUga2V5IGlzIHRoZSBuYW1lIG9mIGEgY29sdW1uIGFuZFxuICAgICAqIHRoZSB2YWx1ZSBpcyB3aGF0IGlzIGluIHRoYXQgY2VsbC5cbiAgICAgKi9cbiAgICB6R3JpZC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICB2YXIgcGFnZSA9IFtdO1xuICAgICAgICB2YXIgZmlsdGVyZWQgPSBbXTtcbiAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpbHRlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyXzEgPSB0aGlzLmZpbHRlcjtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZCA9IHRoaXMuZGF0YS5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbHVtbnMuc29tZShmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJbYy5uYW1lXS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlcl8xLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJfMiA9IHRoaXMuZmlsdGVyO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkID0gdGhpcy5kYXRhLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiAoZW50cnlbYy5uYW1lXSA9IHJbYy5uYW1lXSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyXzIoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZmlsdGVyZWQgPSBfX3NwcmVhZEFycmF5KFtdLCB0aGlzLmRhdGEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNvcnRpbmdcbiAgICAgICAgaWYgKHRoaXMuc29ydENvbmZpZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNvcnRDb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZC5zb3J0KHRoaXMuc29ydENvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy5zb3J0Q29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHZhciBjb2xfbmFtZV8xID0gdGhpcy5zb3J0Q29uZmlnLmNvbHVtbjtcbiAgICAgICAgICAgICAgICB2YXIgY29sX2NvbmZpZyA9IHRoaXMuY29sdW1ucy5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09IGNvbF9uYW1lXzE7IH0pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29sX2NvbmZpZy5zb3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xfc29ydF8xID0gY29sX2NvbmZpZy5zb3J0O1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBjb2xfc29ydF8xKGFbY29sX25hbWVfMV0sIGJbY29sX25hbWVfMV0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbY29sX25hbWVfMV0ubG9jYWxlQ29tcGFyZShiW2NvbF9uYW1lXzFdKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zb3J0Q29uZmlnLmFzY2VuZGluZylcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWQucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhZ2luYXRpb25cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgdmFyIHBhZ2VfY291bnQgPSBNYXRoLmNlaWwoZmlsdGVyZWQubGVuZ3RoIC8gdGhpcy5wYWdpbmF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMudWlfcGFnZXMudG90YWxQYWdlcyA9IHBhZ2VfY291bnQgPT09IDAgPyAxIDogcGFnZV9jb3VudDtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID4gdGhpcy51aV9wYWdlcy50b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMudWlfcGFnZXMudG90YWxQYWdlcztcbiAgICAgICAgICAgICAgICB0aGlzLnVpX3BhZ2VzLnBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gKHRoaXMuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMucGFnaW5hdGlvbjtcbiAgICAgICAgICAgIHZhciBlbmQgPSBzdGFydCArIHRoaXMucGFnaW5hdGlvbjtcbiAgICAgICAgICAgIHBhZ2UgPSBmaWx0ZXJlZC5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgICAgIHRoaXMucGFnZXNfaW5mby5pbm5lclRleHQgPSBcIlNob3dpbmcgXCIuY29uY2F0KHBhZ2UubGVuZ3RoID09PSAwID8gMCA6IHN0YXJ0ICsgMSwgXCIgdG8gXCIpLmNvbmNhdChzdGFydCArIHBhZ2UubGVuZ3RoLCBcIiBvZiBcIikuY29uY2F0KGZpbHRlcmVkLmxlbmd0aCwgXCIgcmVzdWx0c1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2UgPSBmaWx0ZXJlZDtcbiAgICAgICAgfVxuICAgICAgICBwYWdlLmZvckVhY2goZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgIHJldC5wdXNoKF9fYXNzaWduKHt9LCBlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh6R3JpZC5wcm90b3R5cGUsIFwicGFnZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgICAgIGlmICghKHR5cGVvZiBwYWdlID09PSAnbnVtYmVyJyAmJiBwYWdlID4gMCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYWdlIG11c3QgYmUgYSBwb3N0aXZlIG51bWJlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICB0aGlzLnVpX3BhZ2VzLnBhZ2UgPSBwYWdlO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICA7XG4gICAgO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgY29uZGl0aW9ucyB0byBoaWRlIG9yIGRpc3BsYXkgY2VydGFpbiByb3dzXG4gICAgICogQHBhcmFtIGZpbHRlciBIb3cgdG8gZmlsdGVyIHRoZSBkYXRhXG4gICAgICpcbiAgICAgKiAtICoqc3RyaW5nKio6IE9ubHkgZGlzcGxheXMgcm93cyB0aGF0IGhhdmUgYSBjZWxsIHRoYXQgY29udGFpbnNcbiAgICAgKiB0aGF0IHN0cmluZ1xuICAgICAqIC0gKipGaWx0ZXJDYWxsYmFjayoqOiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHJvdyBhcyBhbiBhcmd1bWVudCBhbmQgcmV0dXJucyBhIGJvb2xlYW4uXG4gICAgICogSWYgdHJ1ZSB0aGF0IHJvdyB3aWxsIGJlIGRpc3BsYXllZCwgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgaGlkZGVuLiBUaGUgcm93XG4gICAgICogYXJndW1lbnQgaXMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSBjb2x1bW4gbmFtZXMgYW5kIHRoZSB2YWx1ZXMgYXJlXG4gICAgICogdGhlIGVudHJpZXMgaW4gdGhhdCBjb2x1bW4uXG4gICAgICovXG4gICAgekdyaWQucHJvdG90eXBlLnNldEZpbHRlciA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgdmFyIGYgPSBmaWx0ZXIgPT09IHVuZGVmaW5lZCA/ICcnIDogZmlsdGVyO1xuICAgICAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSBmO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlsdGVyIG11c3QgYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgO1xuICAgIHpHcmlkLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gKGNvbHVtbiwgYXNjZW5kaW5nKSB7XG4gICAgICAgIGlmIChhc2NlbmRpbmcgPT09IHZvaWQgMCkgeyBhc2NlbmRpbmcgPSB0cnVlOyB9XG4gICAgICAgIGlmIChjb2x1bW4gPT0gdW5kZWZpbmVkIHx8IGNvbHVtbiA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0Q29uZmlnID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNvbHVtbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zb3J0Q29uZmlnID0gY29sdW1uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvbCA9IHRoaXMuY29sdW1ucy5maW5kKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09IGNvbHVtbjsgfSk7XG4gICAgICAgICAgICBpZiAoY29sID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIk5vIGNvbHVtbiBuYW1lZCAnXCIuY29uY2F0KGNvbHVtbiwgXCInXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFzY2VuZGluZyAmJiB0eXBlb2YgYXNjZW5kaW5nICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBc2NlbmRpbmcgbXVzdCBiZSBib29sZWFuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc6IGFzY2VuZGluZyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICA7XG4gICAgekdyaWQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJIZWFkZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfTtcbiAgICA7XG4gICAgekdyaWQucHJvdG90eXBlLnJlbmRlckhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5oZWFkLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmNsZWFyRWxlbWVudHMoJ3RoJyk7XG4gICAgICAgIHZhciBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmNsZWFyRWxlbWVudHMoJ3RyJyk7XG4gICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRWxlbWVudCgndHInLCBoZWFkZXJSb3cpO1xuICAgICAgICB2YXIgY29sX2NvdW50ID0gdGhpcy5jb2x1bW5zLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy52aXNpYmxlOyB9KS5sZW5ndGg7XG4gICAgICAgIHZhciBwcmV2ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnZpc2libGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IG5ldyBIZWFkZXJDZWxsKGhlYWRlclJvdyk7XG4gICAgICAgICAgICB0aXRsZS53aWR0aCA9IF90aGlzLmhlYWQuY2xpZW50V2lkdGggLyBjb2xfY291bnQ7XG4gICAgICAgICAgICB0aXRsZS5vbnNvcnQgPSBmdW5jdGlvbiAoc29ydCkge1xuICAgICAgICAgICAgICAgIGlmIChzb3J0ID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb3J0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhc2NlbmRpbmcgPSBzb3J0ID09PSBcImFzY2VuZGluZ1wiO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zb3J0KGNvbmZpZy5uYW1lLCBhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub25Tb3J0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblNvcnQoY29uZmlnLm5hbWUsIGFzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlckRhdGEoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocHJldiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcHJldi5vbnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLndpZHRoID0gdGl0bGUud2lkdGggLSBjaGFuZ2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXYgPSB0aXRsZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMuc29ydENvbmZpZyA9PT0gXCJvYmplY3RcIiAmJiBfdGhpcy5zb3J0Q29uZmlnLmNvbHVtbiA9PT0gY29uZmlnLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aXRsZS5zb3J0ID0gX3RoaXMuc29ydENvbmZpZy5hc2NlbmRpbmcgPyBcImFzY2VuZGluZ1wiIDogXCJkZXNjZW5kaW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnNvcnQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICB0aXRsZS5lbmFibGVTb3J0KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpdGxlLmlubmVyVGV4dCA9IGNvbmZpZy5uYW1lO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oZWFkLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG4gICAgfTtcbiAgICB6R3JpZC5wcm90b3R5cGUucmVuZGVyRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5ib2R5LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICBDdXN0b21DbGFzc05hbWVzLmNsZWFyRWxlbWVudHMoJ3RkJyk7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSgpLmZvckVhY2goZnVuY3Rpb24gKGQsIHJfaSkge1xuICAgICAgICAgICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgnemdyaWRfcm93Jyk7XG4gICAgICAgICAgICBfdGhpcy5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGMsIGNfaSkge1xuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSBfdGhpcy5jb2x1bW5zLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gYy5uYW1lOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnZpc2libGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgICAgIEN1c3RvbUNsYXNzTmFtZXMuYWRkRWxlbWVudCgndGQnLCBjZWxsKTtcbiAgICAgICAgICAgICAgICBDdXN0b21DbGFzc05hbWVzLmFkZERlZmF1bHROYW1lKCd0ZCcsICd6Z3JpZF9jZWxsJyk7XG4gICAgICAgICAgICAgICAgY2VsbC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm9uQ2xpY2spXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9uQ2xpY2soY19pLCByX2ksIGMubmFtZSwgc3RydWN0dXJlZENsb25lKGQpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnemdyaWRfY2VsbCcpO1xuICAgICAgICAgICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gZFtjLm5hbWVdO1xuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuYm9keS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB6R3JpZDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCB6R3JpZDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==