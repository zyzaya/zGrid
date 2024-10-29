import { zGrid } from '../../dist/zGrid';
import { faker } from '@faker-js/faker';
import '../../dist/zgrid_default'
import './style';

let container = document.getElementById('container1');
if (!container) throw new Error('cannot find container1')

faker.seed(96);

type testRecord = {
  'id': string;
  'First Name': string;
  'last_name': string;
  'Phone Number': string;
  'Email': string;
}

let testData: testRecord[] = [];

for (let i = 0; i < 100; i++) {
  let record = {
    'id': i.toString(),
    'First Name': faker.person.firstName(),
    'last_name': faker.person.lastName(),
    'Phone Number': faker.phone.number(),
    'Email': faker.internet.email(),
  };
  testData.push(record);
}

let columns = [
  [
    {
      id: 'id',
      visible: true
    }, 
    'First Name', 
    {
      id: 'last_name',
      name: 'Last Name',
      sort: false
    },
    'Phone Number',
    'Email'
  ],
  [
    {
      id: 'id',
      visible: false,
    },
    'First Name', 
    {
      id: 'last_name',
      name: 'Last Name',
      sort: false
    },
    'Phone Number',
    'Email'
  ]
]

let grid = new zGrid({
  parent: container,
  columns: columns[0],
  data: testData,
  pagination: 7,
  className: {
    filter: 'custom_filter',
    filterContainer: 'custom_filterContainer',
    tr: 'custom_tr'
  },
  dataAttribute: {
    tr: { attribute: 'value'},
    td: { cell: 'value'}
  },
  onClick: (col, row, name, data) => {
    console.log(`${col}, ${row}, ${name}`)
    console.log(data);
  }
});
// switch parent
let current = 1;
let toggle = document.getElementById('switch');
if (!toggle) throw new Error('cannot find switch element')
toggle.onclick = (e) => {
  current = current === 1 ? 2 : 1
  let newContainer = document.getElementById(`container${current}`)
  if (!newContainer) throw new Error(`cannot find container${current}`)
  grid.reconfigure({
    parent: newContainer,
  })
}
// switch headers
let currentHeader = 0
let headerToggle = document.getElementById('headerToggle')

if (!headerToggle) throw new Error('cannot find header toggle element')
headerToggle.onclick = (e) => {
  currentHeader = currentHeader === 0 ? 1 : 0;
  grid.reconfigure({ columns: columns[currentHeader]})
}
// input test
let input = document.getElementById('input') as HTMLInputElement;
if (!input) throw new Error('cannot find input element')
input.onchange = (event) => {
  let value = input.value
  let data = grid.getRow("0");
  data['First Name'] = value;
  grid.setRow("0", data)
}

console.log(testData)