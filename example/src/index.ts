import zGrid from '../../dist/zGrid';
import { faker } from '@faker-js/faker';
import '../../dist/zgrid_default'
import './style';

let container = document.getElementById('container1');
if (!container) throw new Error('cannot find container1')

faker.seed(96);

type testRecord = {
  'ID': string;
  'First Name': string;
  'Last Name': string;
  'Phone Number': string;
  'Email': string;
}

let testData: testRecord[] = [];

for (let i = 0; i < 100; i++) {
  let record = {
    'ID': faker.string.numeric(),
    'First Name': faker.person.firstName(),
    'Last Name': faker.person.lastName(),
    'Phone Number': faker.phone.number(),
    'Email': faker.internet.email(),
  };
  testData.push(record);
}

let grid = new zGrid({
  parent: container,
  columns: [
    {
      name: 'ID',
      visible: false
    }, 
    'First Name', 
    {
      name: 'Last Name',
      sort: false
    },
    'Phone Number',
    'Email'],
  data: testData,
  pagination: 7,
  className: {
    filter: 'custom_filter',
    filterContainer: 'custom_filterContainer'
  },
  onClick: (col, row, name, data) => {
    console.log(`${col}, ${row}, ${name}`)
    console.log(data);
  }
});

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

console.log(testData)