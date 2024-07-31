/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';

describe('getRow', () => {
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
    configuration.data = [['2', 'Jane', 'Doe', 'jane.doe@fake.com']];
    let grid = new zGrid(configuration);
    expect(grid.getRow(0)).toStrictEqual({
      id: '2',
      'First Name': 'Jane',
      'Last Name': 'Doe',
      Email: 'jane.doe@fake.com',
    });
  });

  test('returns correct info when grid is configured as object', () => {
    configuration.data = [
      {
        id: '1',
        'First Name': 'John',
        'Last Name': 'Smith',
        Email: 'fake@email.ca',
      },
    ];
    let grid = new zGrid(configuration);
    expect(grid.getRow(0)).toStrictEqual(configuration.data[0]);
  });
});
