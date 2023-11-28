import zGrid from './zGrid';
import { faker } from '@faker-js/faker';

let container = document.getElementById('container1');

faker.seed(96);

type testRecord = {
  'ID': string;
  'First Name': string;
  'Last Name': string;
  'Phone Number': string;
  'Email': string;
}

let testData: testRecord[] = [];

for (let i = 0; i < 10; i++) {
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
      name: 'ID'
    }, 
    'First Name', 
    {
      name: 'Last Name',
      sort: false
    },
    'Phone Number',
    'Email'],
  data: testData,
});

let current = 1;
let toggle = document.getElementById('switch');
toggle.onclick = (e) => {
  current = current === 1 ? 2 : 1
  console.log(current)
  grid.reconfigure({
    parent: document.getElementById(`container${current}`),
  })
  grid.render()
}



grid.sort((a, b) => { return 0 })
grid.sort('ID', false)
grid.render();
