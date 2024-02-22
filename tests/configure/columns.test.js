/**
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';

describe('Columns', () => {
  let configuration = {};
  let parent;

  beforeEach(() => {
    parent = document.createElement('div');

    configuration = {
      parent: parent,
      columns: ['one', { name: 'two' }],
      data: [],
    };
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

  describe('Reconfigure', () => {
    test('reconfiguring columns', () => {
      let grid = new zGrid(configuration);
      let newColumns = ['two', { name: 'three' }];
      expect(() => {
        grid.reconfigure({
          columns: newColumns,
        });
      }).not.toThrow(Error);
    });

    test('changes available columns', () => {
      configuration.data = [{ one: 'a', two: 'b', three: 'c' }];
      configuration.columns = ['one', 'two'];
      let grid = new zGrid(configuration);
      let data = grid.getData();
      expect(() => {
        grid.sort('one');
      }).not.toThrow(Error);
      grid.reconfigure({
        columns: ['two', 'three'],
      });
      expect(() => {
        grid.sort('one');
      }).toThrow(Error);
    });

    test('removing column currently sorted by clears sort', () => {
      let data = [
        {
          a: '1',
          b: '2',
          c: '3',
        },
        {
          a: '2',
          b: '1',
          c: '2',
        },
        {
          a: '3',
          b: '3',
          c: '1',
        },
      ];
      configuration.data = data;
      configuration.columns = ['a', 'b'];
      let grid = new zGrid(configuration);
      grid.sort('a');
      grid.reconfigure({
        columns: ['b', 'c'],
      });
      grid.getData().forEach((e, i) => {
        expect(e).toStrictEqual(data[i]);
      });
    });

    test('changes ui', () => {
      configuration.columns = ['one', 'two', 'three'];
      let grid = new zGrid(configuration);
      let ui = parent.getElementsByClassName('zgrid_header');
      expect(ui.length).toBe(3);
      grid.reconfigure({
        columns: ['one'],
      });
      ui = parent.getElementsByClassName('zgrid_header');
      expect(ui.length).toBe(1);
    });
  });
});
