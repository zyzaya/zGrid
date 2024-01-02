/**
 * @jest-environment jsdom
 */
import Filter from '../../Filter';

describe.only('Filter', () => {
  let parent;
  let filter;
  beforeEach(() => {
    parent = document.createElement('div');
    filter = new Filter(parent);
  });

  test('creation', () => {
    expect(parent.children.length).toBe(1);
  });

  test('visible', () => {
    filter.visible = false;
    expect(parent.firstChild.classList.contains('zgrid_hidden')).toBe(true);
    filter.visible = true;
    expect(parent.firstChild.classList.contains('zgrid_hidden')).toBe(false);
  });
});
