import zGrid from './zGrid';
import { faker } from '@faker-js/faker';

let container = document.getElementById('container');

faker.seed(96);

type testRecord = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

let testData: testRecord[] = [];

for (let i = 0; i < 10; i++) {
  let record = {
    id: faker.string.numeric(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
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
