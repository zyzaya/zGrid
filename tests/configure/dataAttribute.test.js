/***
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('DataAttributes', () => {
  let configuration = {};
  let data = [];
  let parent;
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

  test('an invalid data attribute throws an error', () => {
    configuration.dataAttribute = {
      filterContainer: ['invalid value', 'value'],
    };
    expect(() => {
      let grid = new zGrid(configuration);
    }).toThrow(Error);
  });
});
