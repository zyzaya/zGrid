/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';
import { faker } from '@faker-js/faker';

describe.only('Sort', () => {
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

  test('no args means no sort', () => {
    let grid = zGrid(configuration);
    grid.sort();
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  test('throws error if invalid column', () => {
    let grid = zGrid(configuration);
    expect(grid.sort('invalid column')).toThrow(TypeError);
  });

  test('default sort is ascending', () => {});

  test('can sort descending by column', () => {});
});
