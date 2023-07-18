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
    configuration.data = [
      { 'First Name': 'John', 'Last Name': 'Smith', Email: 'fake@email.ca' },
      ['Jane', 'Doe', 'jane.doe@fake.com'],
    ];
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

  test('returns correct info when grid is configured as array', () => {
    configuration.data = [['Jane', 'Doe', 'jane.doe@fake.com']];
    let grid = zGrid(configuration);
    expect(grid.getRow(0)).toStrictEqual({
      'First Name': 'Jane',
      'Last Name': 'Doe',
      Email: 'jane.doe@fake.com',
    });
  });

  test('returns correct info when grid is configured as object', () => {
    configuration.data = [
      { 'First Name': 'John', 'Last Name': 'Smith', Email: 'fake@email.ca' },
    ];
    let grid = zGrid(configuration);
    expect(grid.getRow(0)).toStrictEqual(configuration.data[0]);
  });
});

describe('getData', () => {
  let configuration = {};
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['First Name', 'Last Name', 'Email'],
      data: [
        {
          'First Name': 'John',
          'Last Name': 'Smith',
          Email: 'fake@email.ca',
        },
        ['Jane', 'Doe', 'jane.doe@fake.com'],
      ],
    };
  });

  test('modifying the return object does not modify original data', () => {
    let grid = zGrid(configuration);
    let data = grid.getData();
    data[0]['First Name'] = 'Jelly';
    expect(grid.getData()[0]['First Name']).toBe('John');
    expect(grid.getData()[0]['First Name']).not.toBe('Jelly');
  });

  test('returns data', () => {
    let expected = [
      {
        'First Name': 'John',
        'Last Name': 'Smith',
        Email: 'fake@email.ca',
      },
      {
        'First Name': 'Jane',
        'Last Name': 'Doe',
        Email: 'jane.doe@fake.com',
      },
    ];
    let grid = zGrid(configuration);
    expect(grid.getData()).toStrictEqual(expected);
  });
});
