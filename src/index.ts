import zGrid from './zGrid';
import { faker } from '@faker-js/faker';

let container = document.getElementById('container');

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

console.log(testData);

let grid = new zGrid({
  parent: container,
  columns: ['ID', 'First Name', 'Last Name', 'Phone Number', 'Email'],
  data: testData,
});

grid.render();
