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