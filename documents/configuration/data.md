**data:** 
- default: an empty array
- defines what is displayed in the cells of the table
- array: each element defines a row of the table. The elements can be arrays or objects
**elements:**
- default: empty array
- array: an array of strings. Each string is a column and will be in the same order that the column headings are defined.
~~~js
let grid = zGrid({
	columns: ['First Name', 'Last Name', 'Email]
	data: [
		['John', 'Smith', 'fake@email.ca']
	]
})
~~~
- object: defines the row using key-value pairs. The key is the name of the column as defined in the **column** configuration. The value is a string that defines what is in the cell
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
  ],
});
~~~
- extra values or values with a key that doesn't match a column are ignored. If additional column are added these values can still be displayed
- values that are not explicitly defined are set to an empty string