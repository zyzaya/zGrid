```js
let grid = zGrid(configuration)

let grid = zGrid({
	parent: htmlElement,
	columns: [],
	data: [],
	pagination: false,
	filter: false,
})
```

**configuration** is an object with the following properties:

- parent (required)
- columns (required)*
- data
- pagination
- filter

```js
let container = document.getElementById('container');

let grid = zGrid({
  parent: container,
  columns: ['ID', 'First Name', 'Last Name', 'Phone Number', 'Email'],
  data: [
    [2498, 'Reanna', 'Turner', '751.504.5257 x0239', 'Efrem32@yahoo.com'],
    [3512, 'Alfreda', 'Jacobi', '788-669-9266', 'Natasha89gmail.com'],
    {
      'ID': 5096,
      'First Name': 'Christa',
      'Last Name': 'Yost',
      'Phone Number': '1-505-323-4082 x6083',
      Email: 'Ebba42@gmail.com'
    }
  ],
  pagination: 5,
})
```



