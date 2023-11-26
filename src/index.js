import zGrid from './zGrid';
import { faker } from '@faker-js/faker';
var container = document.getElementById('container');
faker.seed(96);
var testData = [];
for (var i = 0; i < 10; i++) {
    var record = {
        id: faker.string.numeric(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
    };
    testData.push(record);
}
console.log(testData);
var grid = new zGrid({
    parent: container,
    columns: ['ID', 'First Name', 'Last Name', 'Phone Number', 'Email'],
    data: testData,
});
grid.render();
