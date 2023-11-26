/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Parent', () => {
  let configuration = {};

  beforeEach(() => {
    configuration = {
      parent: document.createElement('div'),
      columns: ['one', 'two'],
      data: [],
    };
  });

  test('Parent is null', () => {
    configuration.parent = null;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent is undefined', () => {
    configuration.parent = undefined;
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent is not an HTMLElement', () => {
    configuration.parent = 'This is not an HTMLElement';
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent has child nodes', () => {
    let child = document.createElement('div');
    configuration.parent.appendChild(child);
    expect(() => {
      new zGrid(configuration);
    }).toThrow(TypeError);
  });

  test('Parent is a valid HTMLElement', () => {
    expect(() => {
      new zGrid(configuration);
    }).not.toThrow(Error);
  });
});
