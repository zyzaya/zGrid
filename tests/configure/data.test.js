/**
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';
import Setup from '../setup';

describe('Data', () => {
  let configuration, parent;
  beforeEach(() => {
    ({ parent, configuration } = Setup());
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
    expect(() => {
      new zGrid(configuration);
    }).not.toThrow(Error);
  });

  test('null values for data, when configured using an object, doesnt cause error', () => {
    configuration.data = [
      {
        id: 1,
        'First Name': null,
      },
      {
        id: 2,
        'First Name': null,
      },
    ];
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('null values for data, when configure using an array, doesnt cause error', () => {
    configuration.data = [
      [1, null, null, null],
      [2, null, null, null],
    ];
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('empty values for data, when configured using an object, doesnt cause an error', () => {
    configuration.data = [
      {
        id: 1,
        'Last Name': 'first',
        Email: 'first',
      },
      {
        id: 2,
        'Last Name': 'second',
        Email: 'second',
      },
    ];
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('empty values for data, when configured using an array, doesnt cause an error', () => {
    configuration.data = [
      [1, 'first', 'first'],
      [2, 'second', 'second'],
    ];
    let grid = new zGrid(configuration);
    grid.sort('Email');
    expect(() => grid.getData()).not.toThrow(Error);
  });

  test('0 (as an integer) values remain as an integer when configured using an array', () => {
    configuration.data = [
      [1, 0, 0, 0],
      [2, 0, 0, 0],
    ];
    let grid = new zGrid(configuration);
    grid.getData().forEach((r) => {
      for (const [k, v] of Object.entries(r)) {
        if (k !== 'id') expect(v).toBe(0);
      }
    });
  });

  test('0 (as an integer) values are remain as an integer when configuring using an object', () => {
    configuration.data = [
      {
        id: 1,
        'First Name': 0,
        'Last Name': 0,
        Email: 0,
      },
    ];
    let grid = new zGrid(configuration);
    grid.getData().forEach((r) => {
      for (const [k, v] of Object.entries(r)) {
        if (k !== 'id') expect(v).toBe(0);
      }
    });
  });

  test('can set value to an array', () => {
    let email_array = [1, 2, 3];
    configuration.data = [
      {
        id: 1,
        'First Name': 2,
        'Last Name': 3,
        Email: email_array,
      },
    ];
    let grid = new zGrid(configuration);
    expect(grid.getRow(1)['Email']).toStrictEqual(email_array);
  });

  test('throw error when no id is defined using object configuration', () => {
    let grid = new zGrid(configuration);
    let data = [
      {
        'First Name': 'first',
        'Last Name': 'last',
        Email: 'mail',
      },
    ];

    expect(() => grid.reconfigure({ data: data })).toThrow(Error);
  });

  test('id column is always first column', () => {
    configuration.data = [[1, 'first', 'last', 'mail']];
    let grid = new zGrid(configuration);
    expect(grid.getData()[0].id).toBe(1);
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
        id: 1,
        'First Name': 'fire',
        'Last Name': 'last',
        Email: 'mail',
      },
      {
        id: 1,
        'First Name': 'second',
        'Last Name': 'last2',
        Email: 'mail',
      },
    ];
    expect(() => grid.reconfigure({ data: data })).toThrow(Error);
  });

  test('throws error when duplicate ids using array configuration', () => {
    let grid = new zGrid(configuration);
    let data = [
      [1, 'fire', 'last', 'mail'],
      [1, 'second', 'last2', 'mail2'],
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
          id: 1,
          'First Name': 'John',
          'Last Name': 'Smith',
          Email: 'fake@email.ca',
        },
        [2, 'Jane', 'Doe', 'jane.doe@fake.com'],
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
        id: 1,
        'First Name': 'John',
        'Last Name': 'Smith',
        Email: 'fake@email.ca',
      },
      {
        id: 2,
        'First Name': 'Jane',
        'Last Name': 'Doe',
        Email: 'jane.doe@fake.com',
      },
    ];
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(expected);
  });
});
