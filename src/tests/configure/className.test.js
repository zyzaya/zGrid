/***
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';
import { faker } from '@faker-js/faker';

describe('ClassName', () => {
  let configuration = {};
  let data = [];
  let parent;
  faker.seed(96);
  beforeEach(() => {
    data = [];
    parent = document.createElement('div');
    for (let i = 0; i < 10; i++) {
      data.push({
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

  test('an invalid className throws an error', () => {
    configuration.className = {
      filterContainer: 'custom filterContainer',
    };
    expect(() => {
      let grid = new zGrid(configuration);
      grid.render();
    }).not.toThrow(DOMException);
  });
});
