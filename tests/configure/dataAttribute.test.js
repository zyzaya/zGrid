/***
 * @jest-environment jsdom
 */
import CustomClassNames from '../../src/CustomClassNames';
import CustomDataAttributes from '../../src/CustomDataAttributes';
import { zGrid } from '../../src/zGrid';
import { faker } from '@faker-js/faker';

describe('DataAttributes', () => {
  let configuration = {};
  let data = [];
  let parent;
  faker.seed(96);
  beforeEach(() => {
    CustomDataAttributes.data = [];
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

  test('filterContainer', () => {
    configuration.dataAttribute = {
      filterContainer: ['attribute', 'value'],
    };
    configuration.className = {
      filterContainer: 'filterContainer_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('filterContainer_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('filter', () => {
    configuration.dataAttribute = {
      filter: ['attribute', 'value'],
    };
    configuration.className = {
      filter: 'filter_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('filter_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('paginationContainer', () => {
    configuration.dataAttribute = {
      paginationContainer: ['attribute', 'value'],
    };
    configuration.className = {
      paginationContainer: 'paginationContainer_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationContainer_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('paginationInfo', () => {
    configuration.dataAttribute = {
      paginationInfo: ['attribute', 'value'],
    };
    configuration.className = {
      paginationInfo: 'paginationInfo_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationInfo_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('paginationButton', () => {
    configuration.dataAttribute = {
      paginationButton: ['attribute', 'value'],
    };
    configuration.className = {
      paginationButton: 'paginationButton_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationButton_custom');
    expect(ui.length).toBe(9);
    for (let i = 0; i < ui.length; i++) {
      expect(ui[i].dataset.attribute).toBe('value');
    }
  });

  test('paginationPrevious', () => {
    configuration.dataAttribute = {
      paginationPrevious: ['attribute', 'value'],
    };
    configuration.className = {
      paginationPrevious: 'paginationPrevious_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationPrevious_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('paginationCurrent', () => {
    configuration.dataAttribute = {
      paginationCurrent: ['attribute', 'value'],
    };
    configuration.className = {
      paginationCurrent: 'paginationCurrent_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationCurrent_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('paginationNext', () => {
    configuration.dataAttribute = {
      paginationNext: ['attribute', 'value'],
    };
    configuration.className = {
      paginationNext: 'paginationNext_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationNext_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('table', () => {
    configuration.dataAttribute = {
      table: ['attribute', 'value'],
    };
    configuration.className = {
      table: 'table_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('table_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('tr', () => {
    configuration.dataAttribute = {
      tr: ['attribute', 'value'],
    };
    configuration.className = {
      tr: 'tr_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('tr_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });
});
