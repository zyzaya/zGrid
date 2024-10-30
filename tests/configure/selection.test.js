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

  test('can set selection', () => {
    let selected = 0;
    configuration.selection = true;
    let grid = new zGrid(configuration);
    grid.setSelected(selected);
    expect(grid.getSelected(selected)).toStrictEqual(data[selected]);
  });

  test('reconfigure selection', () => {
    let selected = 0;
    configuration.selection = false;
    let grid = new zGrid(configuration);
    grid.setSelected(selected);
    expect(grid.getSelected(selected)).toBe(null);
    grid.reconfigure({ selection: true });
    expect(grid.getSelected(selected)).toStrictEqual(data[selected]);
  });
});
