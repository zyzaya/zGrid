/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('addRow', () => {
  let data, configuration, parent;
  beforeEach(() => {
    ({ data, configuration, parent } = Setup());
  });

  test('can add row as an object', () => {
    let grid = new zGrid(configuration);
    let row = {
      id: '3',
      'First Name': 'Third',
      'Last Name': 'Name',
      Email: 'third@email.ca',
    };
    grid.addRow(row);
    expect(grid.getRow('3')).toStrictEqual(row);
  });

  test('can add row as an array', () => {
    let grid = new zGrid(configuration);
    let row = {
      id: '3',
      'First Name': 'Third',
      'Last Name': 'Name',
      Email: 'third@email.ca',
    };
    grid.addRow(['3', 'Third', 'Name', 'third@email.ca']);
    expect(grid.getRow('3')).toStrictEqual(row);
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
      grid.addRow(['1', 'Third', 'Name', 'third@email.ca']);
    }).toThrow(Error);
  });
});
