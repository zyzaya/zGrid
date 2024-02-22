/**
 * @jest-environment jsdom
 */
import Pages from '../../src/Pages';

describe('Pages', () => {
  let parent;
  let pages;
  beforeEach(() => {
    parent = document.createElement('div');
    pages = new Pages(parent, 10);
  });

  test('set total pages', () => {
    pages.totalPages = 10;
    expect(pages.totalPages).toBe(10);
  });

  test('set total pages in constructor', () => {
    pages = new Pages(parent, 10);
    expect(pages.totalPages).toBe(10);
  });

  test('page starts at 1', () => {
    expect(pages.page).toBe(1);
  });

  test('set page', () => {
    pages.page = 7;
    expect(pages.page).toBe(7);
  });

  test('setting page below zero throws error', () => {
    expect(() => {
      pages.page = -1;
    }).toThrow(RangeError);
  });

  test('setting page above total pages throws error', () => {
    expect(() => {
      pages.page = 11;
    }).toThrow(RangeError);
  });

  test('next page', () => {
    pages.page = 2;
    pages.nextPage();
    expect(pages.page).toBe(3);
  });

  test('next page does nothing when on last page', () => {
    pages.page = 10;
    pages.nextPage();
    expect(pages.page).toBe(10);
  });

  test('previous page', () => {
    pages.page = 2;
    pages.previousPage();
    expect(pages.page).toBe(1);
  });

  test('previous page does nothing when on first page', () => {
    pages.page = 1;
    pages.previousPage();
    expect(pages.page).toBe(1);
  });
});
