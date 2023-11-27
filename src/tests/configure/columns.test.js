/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Columns', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['one', { name: 'two' }],
      data: [],
    };
  });

  test('is null', () => {
    configuration.columns = null;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is undefined', () => {
    configuration.columns = undefined;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is not array', () => {
    configuration.columns = {};
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is empty', () => {
    configuration.columns = [];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(Error);
  });

  test('has elements that are neither string nor object', () => {
    configuration.columns = [[], 1];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('object element has no name', () => {
    configuration.columns = ['one', {}];
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is valid', () => {
    expect(() => {
      new zGrid(configuration);
    }).not.toThrow(Error);
  });
});
