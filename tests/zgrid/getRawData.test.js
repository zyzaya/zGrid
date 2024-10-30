/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('getRawData', () => {
  let data, configuration, parent, markedEmail;
  beforeEach(() => {
    data = [];
    ({ data, configuration, parent, markedEmail } = Setup());
  });

  test('gets data', () => {
    let grid = new zGrid(configuration);
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('modified returned object does not change data', () => {
    let grid = new zGrid(configuration);
    let result = grid.getRawData();
    result[0]['First Name'] = '';
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores sort', () => {
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores pagination', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores filter', () => {
    let grid = new zGrid(configuration);
    grid.setFilter('example.test');
    expect(grid.getRawData()).toStrictEqual(data);
  });

  test('ignores sort + pagination + filter', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    grid.setFilter('example.test');
    expect(grid.getRawData()).toStrictEqual(data);
  });
});
