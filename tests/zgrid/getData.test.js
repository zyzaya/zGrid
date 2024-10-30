/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('Displayed Data', () => {
  let data, configuration, parent, markedEmail;
  beforeEach(() => {
    data = [];
    ({ data, configuration, parent, markedEmail } = Setup());
  });

  test('Sort + Pagination + Filter', () => {
    // filter by example.test, sort by first name, 3 units per page
    let result = data.filter((e) => e['Email'].includes('example.test'));
    result.sort((a, b) => a['First Name'].localeCompare(b['First Name']));
    result = result.slice(0, 3);
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.setFilter('example.test');
    grid.sort('First Name');

    expect(grid.getData()).toStrictEqual(result);
  });

  test('Sort + Pagination', () => {
    // sort by first name, 3 units per page
    let result = [...data].sort((a, b) =>
      a['First Name'].localeCompare(b['First Name'])
    );
    result = result.slice(0, 3);
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.sort('First Name');

    expect(grid.getData()).toStrictEqual(result);
  });

  test('Sort + Filter', () => {
    // sort by first name, filter by example.test
    let result = data.filter((e) => e['Email'].includes('example.test'));
    result.sort((a, b) => a['First Name'].localeCompare(b['First Name']));
    let grid = new zGrid(configuration);
    grid.setFilter('example.test');
    grid.sort('First Name');

    expect(grid.getData()).toStrictEqual(result);
  });

  test('Pagination + Filter', () => {
    // filter by example.test, 3 units per page
    let result = data.filter((e) => e['Email'].includes('example.test'));
    result = result.slice(0, 3);
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.setFilter('example.test');

    expect(grid.getData()).toStrictEqual(result);
  });
});
