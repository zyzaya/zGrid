/***
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';
import { faker } from '@faker-js/faker';

describe('Pagination', () => {
  let data = [];
  let configuration = {};
  faker.seed(96);
  beforeEach(() => {
    data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      });
    }

    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('cannot be negative integer', () => {
    configuration.pagination = -1;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('can only be falsey or positive integer', () => {
    configuration.pagination = 'This is invalid';
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('unset pagination is no pagination', () => {
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data);
  });

  test('pagination of 5 shows first 5 elements', () => {
    configuration.pagination = 5;
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data.slice(0, 5));
  });
});

// set page (get page + 1), set page (get page -1), set page, get page, last page, setpage(0)
describe('setPage', () => {
  let data = [];
  let configuration = {};
  beforeEach(() => {
    data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      });
    }

    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('starts on page 1', () => {
    let grid = new zGrid(configuration);
    expect(grid.page).toBe(1);
  });

  test('changing page changes available data', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.page = 2;
    expect(grid.page).toBe(2);
    expect(grid.getData()).toStrictEqual(data.slice(3, 6));
  });

  test('last page is remainaining data', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.page = 4;
    expect(grid.getData()).toStrictEqual([data[data.length - 1]]);
  });

  test('negative page', () => {
    configuration.pagination = 4;
    let grid = new zGrid(configuration);
    expect(() => {
      grid.page = -1;
    }).toThrow(TypeError);
  });

  test('page that is not a number', () => {
    configuration.pagination = 4;
    let grid = new zGrid(configuration);
    expect(() => {
      grid.page = [];
    }).toThrow(TypeError);
  });

  test('pagination value determines number of records per page', () => {
    configuration.pagination = 2;
    let grid = new zGrid(configuration);
    expect(grid.getData().length).toBe(2);
  });
});
