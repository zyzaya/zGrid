/**
 * @jest-environment jsdom
 */
import zGrid from '../zGrid';
import { faker, fakerTR } from '@faker-js/faker';

describe.skip('Displayed Data', () => {
  let data = [];
  let configuration = {};
  faker.seed(96);
  let markedEmail = [];
  beforeEach(() => {
    data = [];

    for (let i = 0; i < 10; i++) {
      let entry = {
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      };

      if (i % 2 == 0) {
        entry['Email'] = faker.internet.email({ provider: 'example.test ' });
        markedEmail.push(entry);
      }

      data.push(entry);
    }

    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('Sort + Pagination + Filter', () => {
    // filter by example.test, sort by first name, 3 units per page
    let result = data.filter((e) => e['Email'].includes('example.test'));
    result.sort((a, b) => a['First Name'].localeCompare(b['First Name']));
    result = result.slice(0, 3);
    configuration.pagination = 3;
    let grid = zGrid(configuration);
    grid.setFilter('example.test');
    grid.sort('First Name');

    expect(grid.getData()).toStrictEqual(result);
  });

  test('Sort + Pagination', () => {
    // sort by first name, 3 units per page
    let result = [...data].sort((a, b) =>
      a['First Name'].localeCompare(b['First Name'])
    );
    result = result.slice(0, 3);
    configuration.pagination = 3;
    let grid = zGrid(configuration);
    grid.sort('First Name');

    expect(grid.getData()).toStrictEqual(result);
  });

  test('Sort + Filter', () => {
    // sort by first name, filter by example.test
    let result = data.filter((e) => e['Email'].includes('example.test'));
    result.sort((a, b) => a['First Name'].localeCompare(b['First Name']));
    let grid = zGrid(configuration);
    grid.setFilter('example.test');
    grid.sort('First Name');

    expect(grid.getData()).toStrictEqual(result);
  });

  test('Pagination + Filter', () => {
    // filter by example.test, 3 units per page
    let result = data.filter((e) => e['Email'].includes('example.test'));
    result = result.slice(0, 3);
    configuration.pagination = 3;
    let grid = zGrid(configuration);
    grid.setFilter('example.test');

    expect(grid.getData()).toStrictEqual(result);
  });
});
