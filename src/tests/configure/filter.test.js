/***
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';
import { faker } from '@faker-js/faker';

describe('Filter', () => {
  let data = [];
  let configuration = {};
  let markedEmail = [];
  let markedFirstNames = [];
  let markedLastNames = [];
  faker.seed(96);
  beforeEach(() => {
    data = [];
    markedEmail = [];
    markedFirstNames = [];
    markedLastNames = [];

    for (let i = 0; i < 10; i++) {
      let email = faker.internet.email();
      let first = faker.person.firstName();
      let last = faker.person.lastName();
      let entry = {
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      };
      if (i % 2 == 0) {
        entry.email = faker.internet.email({ provider: 'example.test' });
        markedEmail.push(entry);
      }
      if (i % 4 == 0) {
        entry['First Name'] += 'HWAF';
        markedFirstNames.push(entry);
      }
      if (i % 5 == 0) {
        entry['Last Name'] += 'DWAL';
        markedLastNames.push(entry);
      }
      data.push(entry);
    }

    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('default is no filter', () => {
    let grid = zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data);
  });

  test('basic filter only includes elements that contain value', () => {
    let grid = zGrid(configuration);
    grid.setFilter('example.test');
    expect(grid.getData()).toStrictEqual(markedEmail);
  });

  test('can filter with a function', () => {
    let grid = zGrid(configuration);
    data[0].name = data[0].name.toUpperCase();
    data[1].name = data[1].name.toUpperCase();
    grid.setFilter((element) => {
      element.name.toUpperCase() === element.name;
    });
    expect(grid.getData()).toStrictEqual(data.slice(0, 2));
  });

  test('accepts a function that passes each element', () => {
    let grid = zGrid(configuration);
    grid.setFilter((e) => {
      data = data.filter(
        (d) =>
          d['First Name'] == e['First Name'] &&
          d['Last Name'] == d['Last Name'] &&
          e.email == d.email
      );
      return true;
    });
    expect(data.length).toBe(0);
  });
});
