**getData**
- applies filter, sorting, and pagination
**format**
- an array of objects.
- each object represents a row
- each object is a key-value pair. The key is the column title, the value what is in the cell
```js
let grid = zGrid({
    columns: ['First Name', 'Last Name', 'Email']
})

[
    {
        'First Name':'John',
        'Last Name': 'Doe',
        'Email': 'john@fake.email',
    }, // row
]
```
