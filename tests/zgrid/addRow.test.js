/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('addRow', () => {
  let data, configuration, parent, new_row;
  beforeEach(() => {
    ({ data, configuration, parent } = Setup());
    new_row = {
      id: data.length + 1,
      'First Name': 'Third',
      'Last Name': 'Name',
      Email: 'third@email.ca',
    };
  });

  test('can add row as an object', () => {
    let grid = new zGrid(configuration);
    grid.addRow(new_row);
    expect(grid.getRow(new_row.id)).toStrictEqual(new_row);
  });

  test('can add row as an array', () => {
    let grid = new zGrid(configuration);
    grid.addRow(Object.values(new_row));
    expect(grid.getRow(new_row.id)).toStrictEqual(new_row);
  });

  test('throws error if no id is set', () => {
    let grid = new zGrid(configuration);
    expect(() => {
      grid.addRow({
        'First Name': 'Third',
        'Last Name': 'Name',
        Email: 'third@email.ca',
      });
    }).toThrow(Error);
  });

  test('throws error if id is not unique', () => {
    let grid = new zGrid(configuration);
    expect(() => {
      grid.addRow([1, 'Third', 'Name', 'third@email.ca']);
    }).toThrow(Error);
  });
});
