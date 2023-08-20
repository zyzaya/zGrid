

```js
let grid = zGrid(configuration)
```
**configuration** is an object with the following properties:

**parent (required):** *the html element that the table is contained in.*
- must not have child elements

**columns (required):** *information pertaining to columns and how they are displayed*
- is an Array that contains strings or objects.
- strings defined the title and name of that column
~~~js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: ['First Name', 'Last Name', 'Email'],
})
~~~
- objects provide additional configuration options
~~~js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: [{
		name: 'First Name',
		sort: false,
	}],
})
~~~
- **name (required):** the displayed title of the column
- **sort:** if the column can be sorted, and how it is sorted
	- **default:** true
	- can be a compare function
```js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: [{
		name: 'First Name',
		sort: (a, b) => {
			if (a > b) {
				return 1;
			} else if (b > a) {
				return -1;
			} else {
				return 0;
			}
		},
	}],
})
```
**data:** *the information displayed in the columns and rows of the table*
- **default**: an empty array
- an Array whose elements are either an Array of Strings or an Object of key-value pairs where the key is the column name and the value is data
~~~js
let grid = zGrid({
  parent: document.createElement('div'),
  columns: ['First Name', 'Last Name', 'Email'],
  data: [
	{
	  'First Name': 'John',
	  'Last Name': 'Smith',
	  Email: 'fake@email.ca',
	},
	['Jane', 'Doe', 'jane.doe@fake.com'],
  ],
});
~~~
- when the row is defined as an array of strings, the order of the values determines which column it belongs to.
- if a row has more values than the number of columns the additional values are ignored (unless total number of defined columns changes)
- if a row has fewer values than the number of columns the missing values are set to an empty string.
**pagination:** *settings that define how pages function in the table.*
- **default:** false
- when set to false all values are displayed on a single page.
- a number greater than zero that defines how rows per page the data is split into
~~~js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: ['First Name', 'Last Name', 'Email'],
	data: [],
	pagination: 5,
});
~~~