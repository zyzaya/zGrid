/**
 * @jest-environment jsdom
 */
import Pages from '../../Pages';

describe('Pages', () => {
  let parent;
  let pages;
  beforeEach(() => {
    parent = document.createElement('div');
    pages = new Pages(parent);
  });

  test('set total pages', () => {
    pages.totalPages = 10;
    expect(pages.totalPages).toBe(10);
  });

  test('set total pages in constructor', () => {
    pages = new Pages(parent, 10);
    expect(pages.totalPages).toBe(10);
  });
  // set/get page
  // next page, previous page
});
