/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Columns', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['one', 'two'],
      data: [],
    };
  });

  test('is null', () => {
    configuration.columns = null;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is undefined', () => {
    configuration.columns = undefined;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is not array or object', () => {
    configuration.columns = 'This is not an array or object';
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is empty', () => {
    configuration.columns = [];
    expect(() => {
      zGrid(configuration);
    }).toThrow(Error);
  });

  test('is valid array', () => {
    expect(() => {
      zGrid(configuration);
    }).not.toThrow(Error);
  });

  test('is valid object', () => {
    configuration.columns = {};
    expect(() => {
      zGrid(configuration);
    }).not.toThrow(Error);
  });
});
