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