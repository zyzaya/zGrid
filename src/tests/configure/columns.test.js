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
});

// describe('getColumn', () => {
//   let configuration = {};

//   beforeEach(() => {
//     configuration = {
//       parent: document.createElement('div'),
//       columns: ['one', 'two'],
//       data: [],
//     };
//   });

//   test('index less than zero', () => {
//     let grid = zGrid(configuration);
//     expect(() => {
//       grid.getColumn(-1);
//     }).toThrow(RangeError);
//   });

//   test('index greater than or equal to length', () => {
//     let grid = zGrid(configuration);
//     expect(() => {
//       grid.getColumn(2);
//     }).toThrow(RangeError);
//   });

//   test('name is set', () => {
//     configuration.columns = ['one', { name: 'two' }];
//     let grid = zGrid(configuration);
//     expect(grid.getColumn(0).name).toBe('one');
//     expect(grid.getColumn(1).name).toBe('two');
//   });

//   test('sort is set', () => {
//     configuration.columns = ['one', { name: 'two', sort: false }];
//     let grid = zGrid(configuration);
//     expect(grid.getColumn(1).sort).toBe(false);
//   });

//   test('hidden is set', () => {
//     configuration.columns = ['one', { name: 'two', hidden: true }];
//     let grid = zGrid(configuration);
//     expect(grid.getColumn(1).hidden).toBe(true);
//   });

//   test('default sort is true', () => {
//     configuration.columns = ['one'];
//     let grid = zGrid(configuration);
//     expect(grid.getColumn(0).sort).toBe(true);
//   });

//   test('default hidden is false', () => {
//     configuration.columns = ['one'];
//     let grid = zGrid(configuration);
//     expect(grid.getColumn(0).hidden).toBe(false);
//   });

//   test('returns object with name, hidden, and sort properties', () => {
//     configuration.columns = ['one'];
//     let grid = zGrid(configuration);
//     expect(grid.getColumn(0)).toStrictEqual({
//       name: 'one',
//       sort: true,
//       hidden: false,
//     });
//   });
// });
