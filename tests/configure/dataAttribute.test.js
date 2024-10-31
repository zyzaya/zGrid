/***
 * @jest-environment jsdom
 */
import CustomClassNames from '../../src/CustomClassNames';
import CustomDataAttributes from '../../src/CustomDataAttributes';
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('DataAttributes', () => {
  let configuration, data, parent;

  beforeEach(() => {
    CustomDataAttributes.data = [];
    ({ configuration, data, parent } = Setup());
  });

  test('an invalid data attribute throws an error', () => {
    configuration.dataAttribute = {
      filterContainer: { invalid: 'invalid value' },
    };
    expect(() => {
      let grid = new zGrid(configuration);
    }).toThrow(Error);
  });

  test('filterContainer', () => {
    configuration.dataAttribute = {
      filterContainer: { attribute: 'value' },
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
      filter: { attribute: 'value' },
    };
    configuration.className = { filter: 'filter_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('filter_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('paginationContainer', () => {
    configuration.dataAttribute = {
      paginationContainer: { attribute: 'value' },
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
      paginationInfo: { attribute: 'value' },
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
      paginationButton: { attribute: 'value' },
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
      paginationPrevious: { attribute: 'value' },
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
      paginationCurrent: { attribute: 'value' },
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
      paginationNext: { attribute: 'value' },
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
      table: { attribute: 'value' },
    };
    configuration.className = { table: 'table_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('table_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('tr', () => {
    configuration.dataAttribute = {
      tr: { attribute: 'value' },
    };
    configuration.className = { tr: 'tr_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('tr_custom');
    expect(ui.length).toBe(11);
    for (let i = 0; i < ui.length; i++) {
      expect(ui[i].dataset.attribute).toBe('value');
    }
  });

  test('th', () => {
    configuration.dataAttribute = {
      th: { attribute: 'value' },
    };
    configuration.className = { th: 'th_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('th_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('thead', () => {
    configuration.dataAttribute = {
      thead: { attribute: 'value' },
    };
    configuration.className = { thead: 'thead_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('thead_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('tbody', () => {
    configuration.dataAttribute = {
      tbody: { attribute: 'value' },
    };
    configuration.className = { tbody: 'tbody_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('tbody_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('td', () => {
    configuration.dataAttribute = {
      td: { attribute: 'value' },
    };
    configuration.className = { td: 'td_custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('td_custom');
    expect(ui[0].dataset.attribute).toBe('value');
  });

  test('multiple data attributes', () => {
    configuration.dataAttribute = {
      tbody: { first: 'one', second: 'two' },
    };
    configuration.className = { tbody: 'custom' };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('custom');
    expect(ui[0].dataset.first).toBe('one');
    expect(ui[0].dataset.second).toBe('two');
  });
});
