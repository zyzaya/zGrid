/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../../src/zGrid';

describe('Reconfigure parent', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['one', 'two'],
      data: [],
    };
  });

  test('Reconfiguring parent', () => {
    let grid = new zGrid(configuration);
    expect(() => {
      grid.reconfigure({
        parent: document.createElement('div'),
      });
    }).not.toThrow(Error);
  });

  test('Reconfiguring invalid parent', () => {
    let grid = new zGrid(configuration);
    let newParent = document.createElement('div');
    let child = document.createElement('div');
    newParent.appendChild(child);
    expect(() => {
      grid.reconfigure({
        parent: newParent,
      });
    }).toThrow(Error);
  });

  test('Renders in reconfigured parent', () => {
    let grid = new zGrid(configuration);
    let newParent = document.createElement('div');
    grid.reconfigure({
      parent: newParent,
    });
    grid.render();
    expect(newParent.children.length).not.toBe(0);
  });
});
