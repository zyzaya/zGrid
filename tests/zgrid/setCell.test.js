/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';

describe('setCell', () => {
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

  test('modify data of existing cell', () => {
    let grid = new zGrid(configuration);
    grid.setCell('1', 'Email', 'mail');
    expect(grid.getRow('1')['Email']).toBe('mail');
  });

  test('throws error if row does not exist', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell('10', 'Email', 'mail')).toThrow(RangeError);
  });

  test('throws error if column does not exist', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell('1', 'Mid', 'z')).toThrow(RangeError);
  });

  test('throws error if id is set to invalid value', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell('1', 'id', null)).toThrow(TypeError);
  });

  test('throws error if id already exists', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell('1', 'id', '2')).toThrow(Error);
  });
});
