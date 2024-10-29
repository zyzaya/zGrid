/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('getRawData', () => {
  let data = [];
  let configuration = {};
  faker.seed(96);
  let markedEmail = [];
  beforeEach(() => {
    data = [];

    for (let i = 0; i < 10; i++) {
      let entry = {
        id: i.toString(),
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
  test('gets data', () => {
    let grid = new zGrid(configuration);
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('modified returned object does not change data', () => {
    let grid = new zGrid(configuration);
    let result = grid.getRawData();
    result[0]['First Name'] = '';
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores sort', () => {
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores pagination', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores filter', () => {
    let grid = new zGrid(configuration);
    grid.setFilter('example.test');
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores sort + pagination + filter', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    grid.setFilter('example.test');
    expect(grid.getRawData()).toStrictEqual(data);
  });
});
