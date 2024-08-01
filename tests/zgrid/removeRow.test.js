/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';

describe('removeRow', () => {
  let configuration = {};
  let data = [
    {
      id: '1',
      'First Name': 'John',
      'Last Name': 'Smith',
      Email: 'fake@email.ca',
    },
    ['2', 'Jane', 'Doe', 'jane.doe@fake.com'],
  ];
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('can remove row', () => {
    let grid = new zGrid(configuration);
    grid.removeRow('1');
    expect(grid.getRow('1')).toBe(undefined);
    expect(grid.getData().length).toBe(1);
  });

  test('removed row is returned', () => {
    let grid = new zGrid(configuration);
    expect(grid.removeRow('1')).toStrictEqual(data[0]);
  });

  test('undefined is returned when there is no matching row', () => {
    let grid = new zGrid(configuration);
    expect(grid.removeRow('3')).toBe(undefined);
    expect(grid.getData().length).toBe(2);
  });
});
