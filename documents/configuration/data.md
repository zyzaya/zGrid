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