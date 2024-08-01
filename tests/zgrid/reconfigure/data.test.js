/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../../src/zGrid';

describe('Reconfigure Data', () => {
  let configuration = {};
  let parent;
  beforeEach(() => {
    parent = document.createElement('div');
    configuration = {
      parent: parent,
      columns: ['first name', 'last name', 'email'],
      data: [],
    };
  });

  test('reconfiguring data', () => {
    let grid = new zGrid(configuration);
    let data = [
      {
        id: '1',
        'first name': 'first',
        'last name': 'last',
        email: 'email@email.ca',
      },
      {
        id: '2',
        'first name': 'Jane',
        'last name': 'Smith',
        email: 'janesmith@some.thing',
      },
    ];
    grid.reconfigure({
      data: data,
    });
    expect(grid.getData()).toStrictEqual(data);
  });

  test('reconfiguring data updates ui', () => {
    let grid = new zGrid(configuration);
    let data = [
      {
        id: '1',
        'first name': 'first',
        'last name': 'last',
        email: 'email@email.ca',
      },
      {
        id: '2',
        'first name': 'Jane',
        'last name': 'Smith',
        email: 'janesmith@some.thing',
      },
    ];
    grid.reconfigure({
      data: data,
    });
    let cells = parent.getElementsByClassName('zgrid_cell');
    expect(cells.length).toBe(6);
  });
});
