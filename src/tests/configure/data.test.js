/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Data', () => {
  let configuration = {};
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['first name', 'last name', 'email'],
      data: [],
    };
  });
});
