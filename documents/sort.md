**column configuration**
*determines how the rows are sorted when sorting a column*
~~~js
let grid = zGrid({
	parent: document.createElement('div'),
	columns: [{
		name: 'First Name',
		sort: false,
	}]
})
~~~

```js
grid.sort(column, ascending);
grid.sort((row) => ());
```

- no arguments, or a single falsey argument clears the current sort
- **column:** *the name of the column to sort by. If a compare functions was configured for that column it will be used.*
- **ascending:** *a boolean that determines if the rows will be sorted normally or in reverse*

*what happens if you attempt to programmatically sort by a column that has sorting disabled? overrides