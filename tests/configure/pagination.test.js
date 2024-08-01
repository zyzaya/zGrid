/***
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Pagination', () => {
  let data = [];
  let configuration = {};
  let parent;
  faker.seed(96);
  beforeEach(() => {
    data = [];
    parent = document.createElement('div');
    for (let i = 0; i < 10; i++) {
      data.push({
        id: i.toString(),
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      });
    }

    configuration = {
      parent: parent,
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('cannot be negative integer', () => {
    configuration.pagination = -1;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('can only be falsey or positive integer', () => {
    configuration.pagination = 'This is invalid';
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('unset pagination is no pagination', () => {
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data);
  });

  test('pagination of 5 shows first 5 elements', () => {
    configuration.pagination = 5;
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data.slice(0, 5));
  });

  describe('onPageChange', () => {
    test('next page triggers callback', () => {
      let callback = jest.fn();
      configuration.onPageChange = callback;
      configuration.pagination = 2;
      let grid = new zGrid(configuration);
      grid.page = 1;

      let next = Array.from(
        parent.getElementsByClassName('zgrid_page_button')
      ).find((e) => {
        return e.innerText.toLowerCase() === 'next';
      });
      next.click();

      expect(callback).toHaveBeenCalledWith(2);
    });

    test('previous page triggers callback', () => {
      let callback = jest.fn();
      configuration.onPageChange = callback;
      configuration.pagination = 2;
      let grid = new zGrid(configuration);
      grid.page = 2;

      let prev = Array.from(
        parent.getElementsByClassName('zgrid_page_button')
      ).find((e) => {
        return e.innerText.toLowerCase() === 'previous';
      });
      prev.click();

      expect(callback).toHaveBeenCalledWith(1);
    });

    test('page button triggers callback', () => {
      let callback = jest.fn();
      configuration.onPageChange = callback;
      configuration.pagination = 2;
      let grid = new zGrid(configuration);
      grid.page = 1;

      let three = Array.from(
        parent.getElementsByClassName('zgrid_page_button')
      ).find((e) => {
        return e.innerText === '3';
      });
      three.click();

      expect(callback).toHaveBeenCalledWith(3);
    });
  });
});

// set page (get page + 1), set page (get page -1), set page, get page, last page, setpage(0)
describe('setPage', () => {
  let data = [];
  let configuration = {};
  let parent;
  beforeEach(() => {
    data = [];
    parent = document.createElement('div');
    for (let i = 0; i < 10; i++) {
      data.push({
        id: i.toString(),
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      });
    }

    configuration = {
      parent: parent,
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('cannot set page to more than the number of pages', () => {
    configuration.pagination = 5;
    let grid = new zGrid(configuration);

    expect(() => {
      grid.page = 3;
    }).toThrow(RangeError);
  });

  test('starts on page 1', () => {
    configuration.pagination = 2;
    let grid = new zGrid(configuration);
    expect(grid.page).toBe(1);
  });

  test('changing page changes available data', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.page = 2;
    expect(grid.page).toBe(2);
    expect(grid.getData()).toStrictEqual(data.slice(3, 6));
  });

  test('last page is remaining data', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    grid.page = 4;
    expect(grid.getData()).toStrictEqual([data[data.length - 1]]);
  });

  test('negative page', () => {
    configuration.pagination = 4;
    let grid = new zGrid(configuration);
    expect(() => {
      grid.page = -1;
    }).toThrow(TypeError);
  });

  test('page that is not a number', () => {
    configuration.pagination = 4;
    let grid = new zGrid(configuration);
    expect(() => {
      grid.page = [];
    }).toThrow(TypeError);
  });

  test('pagination value determines number of records per page', () => {
    configuration.pagination = 2;
    let grid = new zGrid(configuration);
    expect(grid.getData().length).toBe(2);
  });

  test('changing page updates ui', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    let cells = parent.getElementsByClassName('zgrid_cell');
    grid.page = 4;
    expect(cells.length).toBe(3);
  });
});
