/**
 * @jest-environment jsdom
 */
import Pages from '../../Pages'

describe('Pages', () => {
  let parent;
  let pages;
  beforeEach(() => {
    parent = document.createElement('div')
    pages = new Pages(parent);
  }

  //
})