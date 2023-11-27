/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Columns', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
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
  });
});
