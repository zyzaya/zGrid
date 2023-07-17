/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Data', () => {
  let configuration = {};
  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['first name', 'last name', 'email'],
      data: [],
    };
  });

  test('is null', () => {
    configuration.data = null;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is undefined', () => {
    configuration.data = undefined;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is not an array', () => {
    configuration.data = {};
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('has elements that are neither array nor object', () => {
    configuration.data = [false, 1];
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('is valid', () => {
    expect(() => {
      zGrid(configuration);
    }).not.toThrow(Error);
  });
});
