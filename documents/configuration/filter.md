**filter:** 
- default: an empty string
- defines conditions to hide or display certain rows
- string: only display rows that have a cell that contains that string
~~~js
let grid = zGrid({
	filter: 'example'
});
~~~
- function: a filter function that passes a row (in the same format as **getData**). If it returns true the row will be displayed. If false that row will not be displayed.
~~~js
let grid = zGrid({
	filter: (row) => {
		return row['First Name'].toUpperCase() === row['First Name'];
	},
});