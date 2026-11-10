/**
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';
import Setup from '../setup';

describe('setRow', () => {
  let configuration, modified, data;
  beforeEach(() => {
    ({ configuration, data } = Setup());
    modified = {
      id: data.length + 1,
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    };
  });

  test('modify data of existing row using object', () => {
    let grid = new zGrid(configuration);
    grid.setRow(0, modified);
    expect(grid.getRow(modified.id)).toStrictEqual(modified);
  });

  test('modify data of existing row using array', () => {
    let grid = new zGrid(configuration);
    grid.setRow(0, Object.values(modified));
    expect(grid.getRow(modified.id)).toStrictEqual(modified);
  });

  test('throws error if data is not array or object', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setRow(0, 15)).toThrow(TypeError);
  });

  test('throws error if row does not exist', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setRow(data.length + 1, ['1', 'f', 'l', 'e'])).toThrow(
      RangeError
    );
  });

  test('a row keeps its original id if it is not modified', () => {
    let grid = new zGrid(configuration);
    grid.setRow(0, {
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    });
    modified.id = 0;
    expect(grid.getRow(0)).toStrictEqual(modified);
  });

  test('cannot change a rows id to an already used id', () => {
    let new_mod = {
      id: 1,
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    };
    let grid = new zGrid(configuration);
    expect(() => grid.setRow(0, new_mod)).toThrow(Error);
  });
});
