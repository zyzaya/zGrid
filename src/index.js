import zGrid from './zGrid';
import { faker } from '@faker-js/faker';
var container = document.getElementById('container');
faker.seed(96);
var testData;
for (var i = 0; i < 10; i++) {
    var record = void 0;
    record.id = faker.string.numeric();
    record.firstName = faker.person.firstName();
    record.lastName = faker.person.lastName();
    record.phone = faker.phone.number();
    record.email = faker.internet.email();
    testData.push(record);
}
console.log(testData);
var grid = zGrid({
    parent: container,
    columns: ['ID', 'First Name', 'Last Name', 'Phone Number', 'Email'],
    data: testData,
});
grid.render();
