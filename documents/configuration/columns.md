**columns (required):** *information pertaining to columns and how they are displayed*
- can be an array of strings. each values is the title/name of the column
~~~js
let grid = zGrid({
	columns: ['First Name', 'Last Name', 'Email']
})
~~~
- can be an object with the following properties:
- name (required)
- sort
- hide

**Name**
- the displayed value of the column

**Hide**
- default: false
- defines if the column is visible or not

**Sort**
- default: true
- defines if and how the column is sorted
- false: disables sorting for that column
- true: enables sorting for that column alphanumerically
- function: a compare function

~~~js
let grid = zGrid({
	columns: [
		{
			sort: (a, b) => ()
		}
	]
})
~~~