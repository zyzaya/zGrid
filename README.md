A javascript library that allows for the easy creation and manipulation of dynamic data tables.


# Usage

1. [Creating a grid](#creating-a-grid)
2. [Configuring columns](#configuring-columns)
3. [Setting data](#setting-data)
4. [Pagination](#pagination)
5. [Filtering](#filtering)
6. [Sorting](#sorting)
7. [Selections](#selections)
8. [CSS Styles](#css-styles)
9. [HTML Data Attributes](#html-data-attributes)


## Creating a grid

```js
import zgrid from "zgrid"

let grid = zgrid.zGrid.new(configuration)
```

Required configuration values:
- parent: The HTMLElement to display the grid in. Cannot have any child elements.
- columns: An array of string that defines, from left to right, the names of the columns of the table. Alternatively array values can be ColumnConfiguration objects, giving additional configuration options to columns.

Optional configuration values:

| name | default | description |
| ---- | ------- | ----------- |
| data | ```[]``` | set the data of the table|
| pagination | ```false``` | defines how pagination functions in the grid |
| filter | ```""``` | defines conditions to hide or display certain rows |
| selection | ```true``` | enables or disables selections |
| searchbox | ```true``` | enables or disables a searchbox |
| onFilter | ```undefined``` | a callback that fires when the filter is changed through the ui |
| onPageChange | ```undefined``` | a callback that fires when the filter is changed through the ui |
| onSort | ```undefined``` | a callback that fires when data is sorted through the ui |
| onClick | ```undefined``` | a callback that fires when the user clicks on one of cells in the table |
| className | | used to add CSS classes to zgrid HTML elements |
| dataAttribute | | used to add HTML data attributes to zgrid html elements |

```js
import zgrid from "zgrid"

let grid = zgrid.zGrid.new({
  parent: container,
  columns: ["First Name", "Last Name", "Email"]
})
```

At any time the configuration options of the grid can be changed using reconfigure. This takes the same options as the costructor

```js
grid.reconfigure({
  columns: ["First Name", "Middle Initial", "Last Name", "Phone Number"]
})
```
## Configuring columns

Columns are configured using the ```columns``` configuration option when creating a new grid or by using reconfigure.

It accepts an array where each element of the array is a column. The first element in the array is the left-most column and the last element is the right-most column. Each element of the array is a ColumnConfiguration object with the following values

The first column is an id column used to uniquely identify each row. This column is not visible by default.

| name | default | description |
| ---- | ------- | ----------- | 
| id | n/a| The identifier of the column, used to indicate the column when configuring and manipulating the grid. Must be unique.|
| name | the same as id | The display name of the column |
| sort | true | How sorting functions for the column |
| visible | true | Ff the column should be displayed |

Alternatively elements of the ```columns``` configuration option can be strings. This sets the ```id``` value of the column to the value of the string and all other options to their defaults

```js
let grid = zgrid.zGrid.new({
  parent: container,
  columns: [
    "First Name",
    {
      id: "last",
      name: "Last Name",
      sort: false
    },
    {
      id: "Email",
      visible: false
    }
  ]
})
```

## Setting data

Data can be set using the ```data``` configuration option when creating a new grid or by using reconfigure.

It accepts an array where each element of the array is a row. Rows can be described in two ways. 

The first is as an array of strings where each string is a column with the first element being the leftmost column. 

The second is as an object of key-value pairs. The key is the id of the column as defined in the column configuration. The value is a string that is displayed in the cell. If not defined the column will be an empty string

Extra values or values with a key that doesn't match a column are ignored. This data is kept and if additional columns are added later these later these values can still be displayed. The reverse is true as well - if a column is removed the data isn't removed. It remains and will be displayed again if the column is re-added.

All rows must have a value for the id column.

```js
let grid = zgrid.zGrid.new({
  parent: container,
  columns: ["First Name", "Last Name", "Email"]
  data: [
    [1, "Jon", "Doe", "jondoe@email.ca"],
    // "Last Name" will be set to ""
    {
      id: 2,
      "First Name": "Jane",
      "Email:" "xxjanexx@gmail.com"
    }
  ]
})
```
Data can manipulated using ```setCell```, ```setRow```, ```addRow```, or ```removeRow```.

## Pagination
Pagination can be enabled through configuration option to limit how many rows are displayed at once. When displayed all rows are displayed on the same page. The pagination configuration option accepts false or a positive numerical value. When false pagination is disabled, when a number it defines how many rows are displayed per page.

## Filtering
A searchbox can be enabled or disabled on the UI with the searchbox configuration option. When enabled and the user types a value into the searchbox, the displayed rows are limited to those that contain a cell with the value that the user entered.

The displayed rows can also be limited programmatically using the ```filter``` configuration option. ```filter``` accepts either a string or a callback.

When the value is a string the filter functions the same as the searchbox ui - only rows that contain a cell with the entered value are displayed. 

When the value is a callback each row is passed to the callback. If it returns true that row is displayed. If the callback returns false the row is not displayed.

The ```filter``` configuration can also be set using ```setFilter```. When the grid is filtered this way the ```onFilter``` callback is not triggered.


```js
// Only rows with the "First Name" column set to "Jon" are displayed
grid.setFilter((row ) => row["First Name"] === "Jon" )
// Clears the filter
grid.setFilter()
```

## Sorting
By default sorting is enabled on each column. The user can click the header of a column and cycle between the default order, sort ascending, and sort descending.

By default a column is sorted using javascript ```<``` and ```>``` operators to compare values in each row. It is possible to apply a custom sort by setting the ```sort``` value on the ```columns``` configuration for that column.

```js
let customSort = (a, b) => a.localeCompare(b)

let grid = zgrid.zGrid.new({
  parent: container,
  columns: [
    "Name", 
    {
      id: "City",
      // set the city column to be sorted using localeCompare
      sort: customSort
    }
  ]
  data: [
    ["Jon", "Doe", "jondoe@email.ca"],
  ]
})
```

The grid can also be sorted programmatically using ```sort```. When the grid is sorted this way the ```onSort``` callback is not triggered.

```js
// Clears any existing sort
grid.sort()
// Sorts using a function
grid.sort((a, b) => a["City"].localeCompare(b["City"]))
// Sorts by the named column as defined in the configuration for that column
grid.sort("City")
// Sorts descending by the named column as defined in the configuration for that column
grid.sort("City", false)
```
## Selections
By default zGrid tracks when the user selects - in other words clicks on - a row. This behaviour can be disabled using the ```selection``` configuration option.

The selected row can be obtained using ```grid.getSelected()```.
The selected row can be set programmatically using ```setSelected()```

```js
// Gets the currently selected row. Retuurns null if no row is selected
grid.getSelected()
// Sets the currently selected row by its id column.
grid.setSelected(1)
```

By default the UI will display which row is selected.

## CSS Styles
zGrid come with a default style sheet:

```js
import "zgrid/dist/zgrid_default.css"
```

It is possible to add CSS classes to zGrid HTML elements using the ```className``` configuration option. This an object of key-value pairs where each key is the name of an HTMLElement within the grid and the value is a class name.

```js
grid.reconfigure({
  className: {
    // adds custom_filter as a css class to searchbox input element
    filter: 'custom_filter',
    // adds custom_tr and red as a css class to all tr elements of the grid
    tr: 'custom_tr',
    // adds custom_selected as a css class to the tr element of the selected row
    selected: 'custom_selected'
  }
})
```

The available values for the ``className`` configuration option are:

- filterContainer
- filter
- paginationContainer
- paginationInfo
- paginationButton
- paginationPrevious
- paginationCurrent
- paginationNext
- table
- tr
- th
- thead
- tbody
- td
- selected

## HTML Data Attributes
It is possible to add HTML data-attributes to zGrid HTML elements using the ```dataAttribute``` configuration option. This an object of key-value pairs where each key is the name of an HTMLElement within the grid and the value is a key-value pair defnining the name and value of the data attribute.

```js
grid.reconfigure({
  dataAttribute: {
    // adds data-status="blue" to the searchbox input element
    filter: {status: "blue"},
  }
})
```

The available values for the ``dataAttribute`` configuration option are:

- filterContainer
- filter
- paginationContainer
- paginationInfo
- paginationButton
- paginationPrevious
- paginationCurrent
- paginationNext
- table
- tr
- th
- thead
- tbody
- td
- selected

# Developing

## versioning
*loosely uses semvar (https://semver.org/)*

- *MAJOR.MINOR.PATCH*
- *PATCH* must be incremented if only backwards compatible bugfixes are introduced. A bugfix is defined as an internal change that fixes incorrect behaviour.
- *MINOR* must be incremented if new, backwards compatible functionality is introduced. 
  - It must be incremented if any public functionality is marked as deprecated. 
  - It may be incremented if substantial new functionality or improvements are introduced to private code. 
  - It may also include PATCH level changes. 
  - PATCH version must be reset to 0 when MINOR version is incremented.
- *MAJOR* must be incremented if any backwards incompatible changes are introduced 
  - It may also include MINOR and PATCH level changes.
  - MINOR and PATCH versions must be reset to 0 when MAJOR version is incremented.  

## git branches
- *main* - only contains snapshots of release versions
- *develop* - represents a state with the latest delivered development changes
- *feature* - used when developing a new feature or enhancement. Named as feature#-name. # is only added if applicable
- *issue* - used when fixing an existing issue. Named as issue#-summary

- *tag* - git tag vX.X.X
- *update package.json* - version

## test
```npm run test```

## build
**build zGrid:**

```npx webpack --config-name='build'```
  - creates dist files
  - can delete all .d.ts files except zGrid.d.ts

**build example:**

```npx webpack --config-name='example'```

  - builds example site in './example/dist'
  - uses dist files, so build zgrid first