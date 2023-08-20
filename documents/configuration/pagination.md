**pagination:**
- default: false
- defines how pages function in the table
- false: pagination is disabled and all values are displayed on a single page
- number: defines how many rows are displayed per page. Must be positive.
~~~js
let grid = zGrid({
	pagination: 5,
});
~~~