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
      {
        id: '1',
        'First Name': 'John',
        'Last Name': 'Smith',
        Email: 'fake@email.ca',
      },
      ['2', 'Jane', 'Doe', 'jane.doe@fake.com'],
    ];
    expect(() => {
      new zGrid(configuration);
    }).not.toThrow(Error);
  });

  test('null values for data, when configured using an object, doesnt cause error', () => {
    configuration.data = [
      {
        id: '1',
        'first name': null,
      },
      {
        id: '2',
        'first name': null,
      },
    ];
    let grid = new zGrid(configuration);
    grid.sort('first name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('null values for data, when configure using an array, doesnt cause error', () => {
    configuration.data = [
      ['1', null, null, null],
      ['2', null, null, null],
    ];
    let grid = new zGrid(configuration);
    grid.sort('first name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('empty values for data, when configured using an object, doesnt cause an error', () => {
    configuration.data = [
      {
        id: '1',
        'last name': 'first',
        email: 'first',
      },
      {
        id: '2',
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
      ['1', 'first', 'first'],
      ['2', 'second', 'second'],
    ];
    let grid = new zGrid(configuration);
    grid.sort('email');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('0 (as an integer) values are properly set to 0 (string) when configured using an array', () => {
    configuration.data = [
      [1, 0, 0, 0],
      [2, 0, 0, 0],
    ];
    let grid = new zGrid(configuration);
    grid.getData().forEach((r) => {
      for (const [k, v] of Object.entries(r)) {
        if (k !== 'id') expect(v).toBe('0');
      }
    });
  });

  test('0 (as an integer) values are properly set to 0 (string) when configuring using an object', () => {
    configuration.data = [
      {
        id: '1',
        'first name': 0,
        'last name': 0,
        email: 0,
      },
    ];
    let grid = new zGrid(configuration);
    grid.getData().forEach((r) => {
      for (const [k, v] of Object.entries(r)) {
        if (k !== 'id') expect(v).toBe('0');
      }
    });
  });

  test('throw error when no id is defined using object configuration', () => {
    let grid = new zGrid(configuration);
    let data = [
      {
        'first name': 'first',
        'last name': 'last',
        email: 'mail',
      },
    ];

    expect(() => grid.reconfigure({ data: data })).toThrow(Error);
  });

  test('id column is always first column', () => {
    configuration.data = [['1', 'first', 'last', 'mail']];
    let grid = new zGrid(configuration);
    expect(grid.getData()[0].id).toBe('1');
  });

  test('throws error when no id is defined using array configuration', () => {
    let grid = new zGrid(configuration);
    let data = [[]];
    expect(() => grid.reconfigure({ data: data })).toThrow(Error);
  });

  test('throws error when duplicate ids using object configuration', () => {
    let grid = new zGrid(configuration);
    let data = [
      {
        id: '1',
        'first name': 'fire',
        'last name': 'last',
        email: 'mail',
      },
      {
        id: '1',
        'first name': 'second',
        'last name': 'last2',
        email: 'mail',
      },
    ];
    expect(() => grid.reconfigure({ data: data })).toThrow(Error);
  });

  test('throws error when duplicate ids using array configuration', () => {
    let grid = new zGrid(configuration);
    let data = [
      ['1', 'fire', 'last', 'mail'],
      ['1', 'second', 'last2', 'mail2'],
    ];
    expect(() => grid.reconfigure({ data: data })).toThrow(Error);
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
          id: '1',
          'First Name': 'John',
          'Last Name': 'Smith',
          Email: 'fake@email.ca',
        },
        ['2', 'Jane', 'Doe', 'jane.doe@fake.com'],
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
        id: '1',
        'First Name': 'John',
        'Last Name': 'Smith',
        Email: 'fake@email.ca',
      },
      {
        id: '2',
        'First Name': 'Jane',
        'Last Name': 'Doe',
        Email: 'jane.doe@fake.com',
      },
    ];
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(expected);
  });
});
