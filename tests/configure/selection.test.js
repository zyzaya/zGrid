/***
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('selection', () => {
  let configuration = {};
  let data = [];
  let parent;
  faker.seed(96);
  beforeEach(() => {
    data = [];
    parent = document.createElement('div');
    for (let i = 0; i < 10; i++) {
      data.push({
        id: i,
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

  test('can only be boolean or null', () => {
    configuration.selection = 'error';
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('can set selection', () => {
    let selected = 0;
    configuration.selection = true;
    grid = new zGrid(configuration);
    grid.setSelection(selected);
    expect(grid.getSelection(selected)).toStrictEqual(
      data.find((e) => e.id === selected)
    );
  });
});
