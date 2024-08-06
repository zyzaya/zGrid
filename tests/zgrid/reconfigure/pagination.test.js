/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Reconfigure Pagination', () => {
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

  test('reconfiguring pagination', () => {
    configuration.pagination = 3;
    let grid = new zGrid(configuration);
    expect(grid.getData().length).toBe(3);
    grid.reconfigure({
      pagination: 10,
    });
    expect(grid.getData().length).toBe(10);
  });

  test('reconfiguring pagination updates ui', () => {
    // 10 records. 1 per page. 1st page. 1 row visible
    configuration.pagination = false;
    let grid = new zGrid(configuration);
    grid.reconfigure({
      pagination: 1,
    });
    let rows = parent.querySelectorAll('tbody > .zgrid_row:not(.zgrid_hidden)');
    expect(rows.length).toBe(1);
  });

  test('reconfigure onPageChange', () => {
    let callback = jest.fn();
    configuration.pagination = 2;
    let grid = new zGrid(configuration);
    grid.reconfigure({ onPageChange: callback });
    grid.page = 1;
    let next = Array.from(
      parent.getElementsByClassName('zgrid_page_button')
    ).find((e) => {
      return e.innerText.toLowerCase() === 'next';
    });
    next.click();
    expect(callback).toHaveBeenCalledWith(2);
  });
});
