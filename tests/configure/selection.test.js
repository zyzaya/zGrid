/***
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';
import Setup from '../setup';

describe('selection', () => {
  let configuration, data, parent;
  beforeEach(() => {
    ({ configuration, data, parent } = Setup());
  });

  test('can set selection', () => {
    let selected = 0;
    configuration.selection = true;
    let grid = new zGrid(configuration);
    grid.setSelected(selected);
    expect(grid.getSelected(selected)).toStrictEqual(data[selected]);
  });

  test('reconfigure selection', () => {
    let selected = 0;
    configuration.selection = false;
    let grid = new zGrid(configuration);
    grid.setSelected(selected);
    expect(grid.getSelected(selected)).toBe(null);
    grid.reconfigure({ selection: true });
    expect(grid.getSelected(selected)).toStrictEqual(data[selected]);
  });
});
