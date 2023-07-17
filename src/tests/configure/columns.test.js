/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe.only('Columns', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['one', 'two'],
      data: [],
    };
  });

  test('is null', () => {
    configuration.columns = null;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is undefined', () => {
    configuration.columns = undefined;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is not array', () => {
    configuration.columns = {};
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is empty', () => {
    configuration.columns = [];
    expect(() => {
      zGrid(configuration);
    }).toThrow(Error);
  });

  test('is valid', () => {
    expect(() => {
      zGrid(configuration);
    }).not.toThrow(Error);
  });
});

describe('getColumn', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['one', 'two'],
      data: [],
    };
  });

  test('index less than zero', () => {
    let grid = zGrid(configuration);
    expect(() => {
      grid.getColumn(-1);
    }).toThrow(RangeError);
  });

  test('index greater than or equal to length', () => {
    let grid = zGrid(configuration);
    expect(() => {
      grid.getColumn(2);
    }).toThrow(RangeError);
  });

  test('returns object with name, hidden, and sorting properties', () => {
    let grid = zGrid(configuration);
    expect(grid.getColumn(1)).toBe({
      name: 'one',
      sorting: true,
      hidden: false,
    });
  });
});
