/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('Select', () => {
  let data, configuration, parent;
  beforeEach(() => {
    ({ data, configuration, parent } = Setup());
    configuration.columns = [
      { id: 'id', visible: true },
      'First Name',
      'Last Name',
      'Email',
    ];
  });

  test('click row sets selection', () => {
    configuration.selection = true;
    let grid = new zGrid(configuration);
    let row = parent.querySelector(`tbody > .zgrid_row:first-child`);
    row.click();
    expect(grid.getSelected()).toStrictEqual(data[0]);
  });

  test('setting filter such that selection is no longer visible doesnt lose selection', () => {
    configuration.selection = true;
    let grid = new zGrid(configuration);
    let id = data[0].id;
    grid.setSelected(id);
    grid.setFilter((row) => row.id !== id);
    expect(parent.querySelector('.zgrid_selected')).toBeNull();
    expect(grid.getSelected()).toStrictEqual(data[0]);
    grid.setFilter('');
    expect(parent.querySelector('.zgrid_selected')).not.toBeNull();
  });

  test('visual selection is maintained after sorting', () => {
    configuration.selection = true;
    let grid = new zGrid(configuration);
    let id = data[0].id;
    grid.setSelected(id);
    grid.sort('id', false);
    let row = parent.querySelector('.zgrid_selected');
    expect(row).not.toBeNull();
    expect(row.children[0].innerText).toBe('0');
  });
});
