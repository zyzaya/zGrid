/***
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';
import { faker } from '@faker-js/faker';

describe('Pagination', () => {
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
