/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../../src/zGrid';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

// jest doesn't seem to be aware of structuredClone
// the following has some limitations,
// - Recursive data structures: JSON.stringify() will throw when you give it a recursive data structure. This can happen quite easily when working with linked lists or trees.
// - Built-in types: JSON.stringify() will throw if the value contains other JS built-ins like Map, Set, Date, RegExp or ArrayBuffer.
// - Functions: JSON.stringify() will quietly discard functions.
// but none are relevant to onclick
global.structuredClone = (v) => JSON.parse(JSON.stringify(v));

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

  test.only('onclick gives correct values after modifying data', async () => {
    configuration.data = [
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
    configuration.onClick = (c, ro, cn, data) => {
      expect(data.id).toBe('2');
    };
    let grid = new zGrid(configuration);
    grid.removeRow('1');
    let cell = parent.querySelector('.zgrid_cell');
    await user.click(cell);
  });
});
