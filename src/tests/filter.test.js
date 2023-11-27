/***
 * @jest-environment jsdom
 */
import zGrid from '../zGrid';
import { faker } from '@faker-js/faker';

describe('Filter', () => {
  let data = [];
  let configuration = {};
  let markedEmail = [];
  let markedFirstNames = [];
  let markedLastNames = [];
  faker.seed(96);
  beforeEach(() => {
    data = [];
    markedEmail = [];
    markedFirstNames = [];
    markedLastNames = [];

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
      parent: document.createElement('div'),
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

  describe('Reconfigure', () => {
    test('reconfigure filter', () => {
      let grid = new zGrid(configuration);
      grid.reconfigure({ filter: 'example.test' });
      expect(grid.getData()).toStrictEqual(markedEmail);
    });
  });
});
