/***
 * @jest-environment jsdom
 */
import zGrid from '../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Filter', () => {
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

  test('default is no filter', () => {
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(data);
  });

  test('basic filter only includes elements that contain value', () => {
    let grid = new zGrid(configuration);
    grid.setFilter('example.test');
    expect(grid.getData()).toStrictEqual(markedEmail);
  });

  test('can filter with a function', () => {
    let grid = new zGrid(configuration);
    let filter = jest.fn();
    grid.setFilter(filter);
    let filtered_data = grid.getData();
    expect(filter).toHaveBeenCalledTimes(data.length);
    for (let i = 0; i < data.length; i++) {
      expect(filter).toHaveBeenCalledWith(data[i]);
    }
  });

  test('accepts a function that passes each element', () => {
    let grid = new zGrid(configuration);
    let filter = jest.fn();
    grid.setFilter(filter);
    grid.getData();
    expect(filter).toHaveBeenCalledTimes(data.length);
    for (let i = 0; i < data.length; i++) {
      expect(filter).toHaveBeenCalledWith(data[i]);
    }
  });

  test('can set filter through configuration', () => {
    configuration.filter = 'example.test';
    let grid = new zGrid(configuration);
    expect(grid.getData()).toStrictEqual(markedEmail);
  });

  test('filter ignores unused column data', () => {
    let entry = {
      'First Name': faker.person.firstName(),
      'Last Name': faker.person.lastName(),
      Email: faker.internet.email(),
      Useless: 'example',
    };
    configuration.data.push(entry);
    let grid = new zGrid(configuration);
    grid.setFilter('example');
    expect(grid.getData().some((e) => e['Useless'])).toBe(false);
  });

  test('filter function does not provide unused column data', () => {
    let entry = {
      'First Name': faker.person.firstName(),
      'Last Name': faker.person.lastName(),
      Email: faker.internet.email(),
      Useless: 'example',
    };

    configuration.data.push(entry);
    let grid = new zGrid(configuration);
    const filter = jest.fn();
    grid.setFilter(filter);
    grid.getData();
    expect(filter).not.toHaveBeenCalledWith(entry);
  });

  test('onFilter', () => {
    let callback = jest.fn();
    configuration.onFilter = callback;

    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('zgrid_filter')[0];

    ui.dispatchEvent(new InputEvent('input', { bubbles: true }));
    expect(callback).toHaveBeenCalled();
  });

  test('onFilter callback is given newly set filter', () => {
    let callback = jest.fn();
    configuration.onFilter = callback;
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('zgrid_filter')[0];

    ui.value = 'newfilter';
    ui.dispatchEvent(
      new InputEvent('input', { bubbles: true, data: 'newfilter' })
    );
    expect(callback).toHaveBeenCalledWith('newfilter');
  });

  describe('Reconfigure', () => {
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
        expect(
          cells.find((c) => c.innerText === e['Email'])
        ).not.toBeUndefined();
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
});
