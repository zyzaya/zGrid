/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Data', () => {
  let configuration = {};
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['first name', 'last name', 'email'],
      data: [],
    };
  });

  test('is not an array', () => {
    configuration.data = {};
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('has elements that are neither array nor object', () => {
    configuration.data = [false, 1];
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is valid', () => {
    expect(() => {
      zGrid(configuration);
    }).not.toThrow(Error);
  });
});

describe('getRow', () => {
  let configuration = {};
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: [
        { 'First Name': 'John', 'Last Name': 'Smith', Email: 'fake@email.ca' },
        ['Jane', 'Doe', 'jane.doe@fake.com'],
      ],
    };
  });

  test('index less than zero', () => {
    let grid = zGrid(configuration);
    expect(() => {
      grid.getRow(-1);
    }).toThrow(RangeError);
  });

  test('index greater than or equal to number of rows', () => {
    let grid = zGrid(configuration);
    expect(() => {
      grid.getRow(2);
    }).toThrow(RangeError);
  });

  test('returns correct row info', () => {
    let grid = zGrid(configuration);
    expect(grid.getRow(0)).toStrictEqual(configuration.data[0]);
  });
});
