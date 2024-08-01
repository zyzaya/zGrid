/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Reconfigure filter', () => {
  let data = [];
  let configuration = {};
  let markedEmail = [];
  let markedFirstNames = [];
  let markedLastNames = [];
  let parent;
  faker.seed(96);
  beforeEach(() => {
    data = [];
    markedEmail = [];
    markedFirstNames = [];
    markedLastNames = [];
    parent = document.createElement('div');

    for (let i = 0; i < 10; i++) {
      let entry = {
        id: i.toString(),
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      };
      if (i % 2 == 0) {
        entry['Email'] = faker.internet.email({ provider: 'example.test' });
        markedEmail.push(entry);
      }
      if (i % 4 == 0) {
        entry['First Name'] += 'HWAF';
        markedFirstNames.push(entry);
      }
      if (i % 5 == 0) {
        entry['Last Name'] += 'DWAL';
        markedLastNames.push(entry);
      }
      data.push(entry);
    }

    configuration = {
      parent: parent,
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('reconfigure filter', () => {
    let grid = new zGrid(configuration);
    grid.reconfigure({ filter: 'example.test' });
    expect(grid.getData()).toStrictEqual(markedEmail);
  });

  test('reconfigure filter updates ui', () => {
    let grid = new zGrid(configuration);
    grid.setFilter('DWAL');
    let cells = Array.from(parent.getElementsByClassName('zgrid_cell'));
    markedLastNames.forEach((e) => {
      expect(cells.find((c) => c.innerText === e['Email'])).not.toBeUndefined();
    });
  });

  test('reconfigure onFilter', () => {
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('zgrid_filter')[0];
    let callback = jest.fn();

    grid.reconfigure({ onFilter: callback });
    ui.value = 'newfilter';
    ui.dispatchEvent(
      new InputEvent('input', { bubbles: true, data: 'newfilter' })
    );
    expect(callback).toHaveBeenCalledWith('newfilter');
  });
});
