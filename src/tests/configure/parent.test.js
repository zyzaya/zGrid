/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Parent', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: [],
      data: [],
    };
  });

  test('Parent is null', () => {
    configuration.parent = null;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent is undefined', () => {
    configuration.parent = undefined;
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent is not an HTMLElement', () => {
    configuration.parent = 'This is not an HTMLElement';
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent has child nodes', () => {
    let child = document.createElement('div');
    configuration.parent.appendChild(child);
    expect(() => {
      zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent is a valid HTMLElement', () => {
    expect(() => {
      zGrid(configuration);
    }).not.toThrow(Error);
  });
});
