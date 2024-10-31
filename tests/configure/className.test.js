/***
 * @jest-environment jsdom
 */
import CustomClassNames from '../../src/CustomClassNames';
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('ClassName', () => {
  let configuration, data, parent;
  beforeEach(() => {
    CustomClassNames.data = [];
    ({ configuration, data, parent } = Setup());
  });

  test('an invalid className throws an error', () => {
    configuration.className = {
      filterContainer: 'custom filterContainer',
    };
    expect(() => {
      let grid = new zGrid(configuration);
    }).not.toThrow(DOMException);
  });

  test('filterContainer', () => {
    configuration.className = {
      filterContainer: 'filterContainer_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('filterContainer_custom');
    expect(ui.length).toBe(1);
  });

  test('filter', () => {
    configuration.className = {
      filter: 'filter_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('filter_custom');
    expect(ui.length).toBe(1);
  });

  test('paginationContainer', () => {
    configuration.className = {
      paginationContainer: 'paginationContainer_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationContainer_custom');
    expect(ui.length).toBe(1);
  });

  test('paginationInfo', () => {
    configuration.className = {
      paginationInfo: 'paginationInfo_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationInfo_custom');
    expect(ui.length).toBe(1);
  });

  test('paginationButton', () => {
    configuration.className = {
      paginationButton: 'paginationButton_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationButton_custom');
    expect(ui.length).toBe(9);
  });

  test('paginationPrevious', () => {
    configuration.className = {
      paginationPrevious: 'paginationPrevious_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationPrevious_custom');
    expect(ui.length).toBe(1);
  });

  test('paginationCurrent', () => {
    configuration.className = {
      paginationCurrent: 'paginationCurrent_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationCurrent_custom');
    expect(ui.length).toBe(1);
  });

  test('paginationNext', () => {
    configuration.className = {
      paginationNext: 'paginationNext_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('paginationNext_custom');
    expect(ui.length).toBe(1);
  });

  test('table', () => {
    configuration.className = {
      table: 'table_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('table_custom');
    expect(ui.length).toBe(1);
  });

  test('tr', () => {
    configuration.className = {
      tr: 'tr_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('tr_custom');
    expect(ui.length).toBe(11);
  });

  test('th', () => {
    configuration.className = {
      th: 'th_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('th_custom');
    expect(ui.length).toBe(3);
  });

  test('thead', () => {
    configuration.className = {
      thead: 'thead_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('thead_custom');
    expect(ui.length).toBe(1);
  });

  test('tbody', () => {
    configuration.className = {
      tbody: 'tbody_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('tbody_custom');
    expect(ui.length).toBe(1);
  });

  test('td', () => {
    configuration.className = {
      td: 'td_custom',
    };
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('td_custom');
    expect(ui.length).toBe(30);
  });

  test('selected', () => {
    configuration.className = {
      selected: 'selected_custom',
    };
    let grid = new zGrid(configuration);
    grid.setSelected(configuration.data[0].id);
    let ui = parent.getElementsByClassName('selected_custom');
    expect(ui.length).toBe(1);
  });
});
