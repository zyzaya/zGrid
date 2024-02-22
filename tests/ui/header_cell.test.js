/**
 * @jest-environment jsdom
 */
import HeaderCell from '../../src/HeaderCell';

describe('HeaderCell', () => {
  let parent;
  let header;
  beforeEach(() => {
    parent = document.createElement('tr');
    header = new HeaderCell(parent);
  });

  test('setting sort sets active button', () => {
    header.sort = 'ascending';
    expect(
      parent.getElementsByClassName('zgrid_sort_button_active').length
    ).toBe(1);
  });

  test('unsetting sort clears active buttons', () => {
    header.sort = 'ascending';
    header.sort = 'none';
    expect(
      parent.getElementsByClassName('zgrid_sort_button_active').length
    ).toBe(0);
  });

  test('setting width', () => {
    header.width = 24;
    expect(header.width).toBe(24);
  });

  test('unsetting width', () => {
    header.width = undefined;
    expect(header.width).toBeDefined();
  });

  test('disabled sort', () => {
    header.enableSort(false);
    expect(parent.getElementsByClassName('zgrid_hidden').length).toBe(1);
  });

  test('enabling sort', () => {
    header.enableSort(false);
    header.enableSort(true);
    expect(parent.getElementsByClassName('zgrid_hidden').length).toBe(0);
  });
});
