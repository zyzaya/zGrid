/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';

describe('setRow', () => {
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

  test('modify data of existing row using object', () => {
    let modified = {
      id: '1',
      'First Name': 'first',
      'Last Name': 'last',
      Email: 'mail',
    };

    let grid = new zGrid(configuration);
    grid.setRow('1', modified);
    expect(grid.getRow('1')).toStrictEqual(modified);
  });
});
