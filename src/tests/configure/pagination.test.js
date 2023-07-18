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
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('can only be falsey or positive integer', () => {
    configuration.pagination = 'This is invalid';
    expect(() => {
      zGrid(() => {
        zGrid(configuration);
      }).toThrow(TypeError);
    });
  });

  test('unset pagination is no pagination', () => {
    let grid = zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data);
  });

  test('pagination of 5 shows first 5 elements', () => {
    configuration.pagination = 5;
    let grid = zGrid(configuration);
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
    let grid = zGrid(configuration);
    expect(grid.currentPage()).toBe(1);
  });

  test('changing page changes available data', () => {
    configuration.pagination = 3;
    let grid = zGrid(configuration);
    grid.setPage(2);
    expect(grid.currentPage()).toBe(2);
    expect(grid.getData()).toStrictEqual(data.slice(3, 6));
  });

  test('last page is remainaining data', () => {
    configuration.pagination = 3;
    let grid = zGrid(configuration);
    grid.setPage(4);
    expect(grid.getData()).toStrictEqual([data[data.length - 1]]);
  });
});
