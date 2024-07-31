/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';

describe('setRow', () => {
  let configuration = {};
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: [
        {
          id: '1',
          'First Name': 'John',
          'Last Name': 'Smith',
          Email: 'fake@email.ca',
        },
        ['2', 'Jane', 'Doe', 'jane.doe@fake.com'],
      ],
    };
  });

  test('modify data of existing row using object', () => {
    let modified = {
      id: '1',
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    };

    let grid = new zGrid(configuration);
    grid.setRow('1', modified);
    expect(grid.getRow('1')).toStrictEqual(modified);
  });

  test('modify data of existing row using array', () => {
    let modified = {
      id: '1',
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    };
    let grid = new zGrid(configuration);
    grid.setRow('1', ['1', 'first', 'last', 'mail']);
    expect(grid.getRow('1')).toStrictEqual(modified);
  });

  test('throws element if data is not array or object', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setRow('1', 15)).toThrow(TypeError);
  });

  test('a row keeps its original id if it is not modified', () => {
    let modified = {
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    };
    let grid = new zGrid(configuration);
    grid.setRow('1', modified);
    modified.id = '1';
    expect(grid.getRow('1')).toStrictEqual(modified);
  });

  test('cannot change a rows id to an already used id', () => {});
});
