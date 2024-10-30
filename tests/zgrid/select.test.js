/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Select', () => {
  // 3. sorting maintains the correctly displayed selection
  let data = [];
  let configuration;
  let parent;
  faker.seed(96);
  beforeEach(() => {
    parent = document.createElement('div');
    data = [];
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
      columns: [
        { id: 'id', visible: true },
        'First Name',
        'Last Name',
        'Email',
      ],
      data: data,
    };
  });

  test('click row sets selection', () => {
    configuration.selection = true;
    let grid = new zGrid(configuration);
    let row = parent.querySelector(`tbody > .zgrid_row:first-child`);
    row.click();
    expect(grid.getSelected()).toStrictEqual(data[0]);
  });

  test('setting filter such that selection is no longer visible doesnt lose selection', () => {
    configuration.selection = true;
    let grid = new zGrid(configuration);
    let id = data[0].id;
    grid.setSelected(id);
    grid.setFilter((row) => {
      console.log(`${row.id}, ${id}`);
      return row.id !== id;
    });
    expect(parent.querySelector('.zgrid_selected')).toBeNull();
    expect(grid.getSelection()).toStrictEqual(data[0]);
    grid.setFilter('');
    expect(parent.querySelector('.zgrid_selected')).not.toBeNull();
  });

  test('visual selection is maintained after sorting', () => {
    configuration.selection = true;
    let grid = new zGrid(configuration);
    let id = data[0].id;
    grid.setSelected(id);
    grid.sort('id', false);
    let row = parent.querySelector('.zgrid_selected');
    expect(row).not.toBeNull();
    expect(row.children[0].innerText).toBe('0');
  });
});
