/***
 * @jest-environment jsdom
 */
import zGrid from '../../src/zGrid';
import Setup from '../setup';

describe('setFilter', () => {
  let configuration,
    data,
    parent,
    markedEmail,
    markedFirstNames,
    markedLastNames;

  beforeEach(() => {
    ({
      configuration,
      data,
      parent,
      markedEmail,
      markedFirstNames,
      markedLastNames,
    } = Setup());
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
    expect(filter).toHaveBeenCalledTimes(data.length);
    for (let i = 0; i < data.length; i++) {
      expect(filter).toHaveBeenCalledWith(data[i]);
    }
  });

  test('accepts a function that passes each element', () => {
    let grid = new zGrid(configuration);
    let filter = jest.fn();
    grid.setFilter(filter);
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
      id: 'identifier',
      'First Name': '',
      'Last Name': '',
      Email: '',
      Useless: 'example',
    };
    configuration.data.push(entry);
    let grid = new zGrid(configuration);
    grid.setFilter('example');
    expect(grid.getData().some((e) => e['Useless'])).toBe(false);
  });

  test('filter function does not provide unused column data', () => {
    let entry = {
      id: 'identifier',
      'First Name': '',
      'Last Name': '',
      Email: '',
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
});
