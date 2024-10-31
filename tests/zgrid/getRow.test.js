/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('getRow', () => {
  let configuration, obj_row, arr_row;
  beforeEach(() => {
    ({ configuration } = Setup());
    obj_row = {
      id: 1,
      'First Name': 'John',
      'Last Name': 'Smith',
      Email: 'fake@email.ca',
    };
    arr_row = [2, 'Jane', 'Doe', 'jane.doe@fake.com'];
    configuration.data = [obj_row, arr_row];
  });

  test('returns undefined when no row has id', () => {
    let grid = new zGrid(configuration);
    expect(grid.getRow('99')).toBe(undefined);
  });

  test('returns correct info when grid is configured as array', () => {
    configuration.data = [arr_row];
    let grid = new zGrid(configuration);
    expect(grid.getRow(arr_row[0])).toStrictEqual({
      id: arr_row[0],
      'First Name': arr_row[1],
      'Last Name': arr_row[2],
      Email: arr_row[3],
    });
  });

  test('returns correct info when grid is configured as object', () => {
    configuration.data = [obj_row];
    let grid = new zGrid(configuration);
    expect(grid.getRow(obj_row['id'])).toStrictEqual(obj_row);
  });

  test('modified retrieved data doesnt modify actual data', () => {
    let grid = new zGrid(configuration);
    let row = grid.getRow(obj_row['id']);
    row.email = 'modified';
    expect(grid.getRow(obj_row['id'])).toStrictEqual(obj_row);
  });
});
