/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';

describe('Data', () => {
  let configuration = {};
  let parent;
  beforeEach(() => {
    parent = document.createElement('div');
    configuration = {
      parent: parent,
      columns: ['first name', 'last name', 'email'],
      data: [],
    };
  });

  test('is not an array', () => {
    configuration.data = {};
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('has elements that are neither array nor object', () => {
    configuration.data = [false, 1];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is valid', () => {
    configuration.data = [
      { 'First Name': 'John', 'Last Name': 'Smith', Email: 'fake@email.ca' },
      ['Jane', 'Doe', 'jane.doe@fake.com'],
    ];
    expect(() => {
      new zGrid(configuration);
    }).not.toThrow(Error);
  });

  describe('Reconfigure', () => {
    test('reconfiguring data', () => {
      let grid = new zGrid(configuration);
      let data = [
        {
          'first name': 'first',
          'last name': 'last',
          email: 'email@email.ca',
        },
        {
          'first name': 'Jane',
          'last name': 'Smith',
          email: 'janesmith@some.thing',
        },
      ];
      grid.reconfigure({
        data: data,
      });
      expect(grid.getData()).toStrictEqual(data);
    });

    test('reconfiguring data updates ui', () => {
      let grid = new zGrid(configuration);
      let data = [
        {
          'first name': 'first',
          'last name': 'last',
          email: 'email@email.ca',
        },
        {
          'first name': 'Jane',
          'last name': 'Smith',
          email: 'janesmith@some.thing',
        },
      ];
      grid.reconfigure({
        data: data,
      });
      let cells = parent.getElementsByClassName('zgrid_cell');
      expect(cells.length).toBe(6);
    });
  });

  test('null values for data, when configured using an object, doesnt cause error', () => {
    configuration.data = [
      {
        'first name': null,
      },
      {
        'first name': null,
      },
    ];
    let grid = new zGrid(configuration);
    grid.sort('first name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('null values for data, when configure using an array, doesnt cause error', () => {
    configuration.data = [
      [null, null, null],
      [null, null, null],
    ];
    let grid = new zGrid(configuration);
    grid.sort('first name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('empty values for data, when configured using an object, doesnt cause an error', () => {
    configuration.data = [
      {
        'last name': 'first',
        email: 'first',
      },
      {
        'last name': 'second',
        email: 'second',
      },
    ];
    let grid = new zGrid(configuration);
    grid.sort('first name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('empty values for data, when configured using an array, doesnt cause an error', () => {
    configuration.data = [
      ['first', 'first'],
      ['second', 'second'],
    ];
    let grid = new zGrid(configuration);
    grid.sort('email');
    expect(() => grid.getData()).not.toThrow(Error);
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
    let grid = new zGrid(configuration);
    expect(() => {
      grid.getRow(-1);
    }).toThrow(RangeError);
  });

  test('index greater than or equal to number of rows', () => {
    let grid = new zGrid(configuration);
    expect(() => {
      grid.getRow(2);
    }).toThrow(RangeError);
  });

  test('returns correct info when grid is configured as array', () => {
    configuration.data = [['Jane', 'Doe', 'jane.doe@fake.com']];
    let grid = new zGrid(configuration);
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
    let grid = new zGrid(configuration);
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
    let grid = new zGrid(configuration);
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
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(expected);
  });
});
