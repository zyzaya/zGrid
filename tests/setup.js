import { faker } from '@faker-js/faker';

export default function Setup() {
  let obj = {};
  obj.parent = document.createElement('div');
  obj.data = [];
  obj.markedEmail = [];
  obj.markedFirstNames = [];
  obj.markedLastNames = [];
  for (let i = 0; i < 10; i++) {
    let entry = {
      id: i,
      'First Name': faker.person.firstName(),
      'Last Name': faker.person.lastName(),
      Email: faker.internet.email(),
    };

    if (i % 2 == 0) {
      entry['Email'] = faker.internet.email({ provider: 'example.test ' });
      obj.markedEmail.push(entry);
    }
    if (i % 4 == 0) {
      entry['First Name'] += 'HWAF';
      obj.markedFirstNames.push(entry);
    }
    if (i % 5 == 0) {
      entry['Last Name'] += 'DWAL';
      obj.markedLastNames.push(entry);
    }

    obj.data.push(entry);
  }
  obj.configuration = {
    parent: obj.parent,
    columns: ['First Name', 'Last Name', 'Email'],
    data: obj.data,
  };
  return obj;
}
