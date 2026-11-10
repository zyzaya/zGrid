/**
 * @jest-environment jsdom
 */
import zGrid from '../../../src/zGrid';
import Setup from '../../setup';

describe('Reconfigure Pagination', () => {
  let data, configuration, parent;
  beforeEach(() => {
    ({ data, configuration, parent } = Setup());
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
