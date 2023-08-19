```js
let grid = zGrid(configuration)
```

**configuration** is an object with the following properties:

- parent (required)
- columns (required)*
- data
- pagination
- filter



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

**filter:** *sets parameters to display only certain rows*
- **default:** ''
- can be a string or a function
- if a string it will only display rows that contain that string
~~~js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: ['First Name', 'Last Name', 'Email'],
	data: [],
	filter: 'example'
});
~~~
- if a function then each element will be passed to that function (in the same format as **getData**). if the function returns true it that element will be displayed, otherwise it wont
~~~js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: ['First Name', 'Last Name', 'Email'],
	data: [],
	filter: (row) => {
		return row['First Name'].toUpperCase() === row['First Name'];
	},
});
~~~
- the filter can also be set with the setFilter function
~~~js
grid.setFilter('example');
grid.setFilter((row) => {
	return row['First Name'].toUpperCase() === row['First Name'];
});
~~~