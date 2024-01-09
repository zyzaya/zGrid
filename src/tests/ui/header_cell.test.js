/**
 * @jest-environment jsdom
 */
import HeaderCell from '../../HeaderCell';

describe('HeaderCell', () => {
  let parent;
  let header;
  beforeEach(() => {
    parent = document.createElement('tr');
    header = new HeaderCell(parent);
  });

  // sort: modifies active class, modifies sort
  test('setting sort sets active button', () => {
    header.sort = 'ascending';
    expect(
      parent.getElementsByClassName('zgrid_sort_button_active').length
    ).toBe(1);
  });

  test('unsetting sort clears active buttons', () => {
    header.sort = 'ascending';
    header.sort = 'none';
    console.log();
    expect(
      parent.getElementsByClassName('zgrid_sort_button_active').length
    ).toBe(0);
  });

  // width: sets element width
  // enableSort: hides element(s)
});
