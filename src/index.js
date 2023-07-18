import zGrid from './zGrid';
import { faker } from '@faker-js/faker';

let container = document.getElementById('container');

faker.seed(96);
let testData = [];
for (let i = 0; i < 10; i++) {
  testData.push([
    faker.string.numeric(4),
    faker.person.firstName(),
    faker.person.lastName(),
    faker.phone.number(),
    faker.internet.email(),
  ]);
}

console.log(testData);

let grid = zGrid({
  parent: container,
  columns: ['ID', 'First Name', 'Last Name', 'Phone Number', 'Email'],
  data: testData,
});

grid.render();
