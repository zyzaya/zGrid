/**
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';
import Setup from '../setup';

describe('removeRow', () => {
  let configuration, data;
  beforeEach(() => {
    ({ configuration, data } = Setup());
  });

  test('can remove row', () => {
    let grid = new zGrid(configuration);
    grid.removeRow(data[0]['id']);
    expect(grid.getRow(data[0]['id'])).toBe(null);
    expect(grid.getData().length).toBe(data.length - 1);
  });

  test('removed row is returned', () => {
    let grid = new zGrid(configuration);
    expect(grid.removeRow(data[0]['id'])).toStrictEqual(data[0]);
  });

  test('null is returned when there is no matching row', () => {
    let grid = new zGrid(configuration);
    expect(grid.removeRow(data.length + 1)).toBe(null);
    expect(grid.getData().length).toBe(data.length);
  });
});
