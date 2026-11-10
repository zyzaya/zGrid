/**
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';
import Setup from '../setup';

describe('Columns', () => {
  let configuration, parent;

  beforeEach(() => {
    ({ parent, configuration } = Setup());
  });

  test('is null', () => {
    configuration.columns = null;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is undefined', () => {
    configuration.columns = undefined;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is not array', () => {
    configuration.columns = {};
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is empty', () => {
    configuration.columns = [];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(Error);
  });

  test('has elements that are neither string nor object', () => {
    configuration.columns = [[], 1];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('object element has no name', () => {
    configuration.columns = ['one', {}];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is valid', () => {
    expect(() => {
      new zGrid(configuration);
    }).not.toThrow(Error);
  });

  test('name sets visual name', () => {
    configuration.columns = [
      {
        id: 'first_name',
        name: 'First Name',
      },
    ];
    let grid = new zGrid(configuration);
    let ui = Array.from(parent.getElementsByClassName('zgrid_title'));
    expect(ui.filter((e) => e.innerText === 'First Name').length).toBe(1);
  });

  test('has an id column if not explicitly set', () => {
    configuration.data = [{ id: 1, one: 1 }];
    let grid = new zGrid(configuration);
    expect(grid.getData()[0].id).not.toBe(undefined);
  });

  test('can configure id column', () => {
    configuration.columns = [
      {
        id: 'id',
        name: 'id',
        visible: true,
      },
      {
        id: 'first_name',
        name: 'First Name',
      },
    ];
    let grid = new zGrid(configuration);
    let ui = Array.from(parent.getElementsByClassName('zgrid_title'));
    expect(ui.filter((e) => e.innerText === 'id').length).toBe(1);
  });
});
