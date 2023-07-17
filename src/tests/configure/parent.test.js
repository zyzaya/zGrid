/**
 * @jest-environment jsdom
 */
import zGrid from '../../zGrid';

describe('Parent', () => {
  test('Parent is not defined', () => {
    let configuration = {
      parent: null,
    };
    expect(zGrid(configuration)).toThrow(Error);
  });

  test('Parent is not an html element', () => {
    let confiugration = {
      parent: document.createElement('div'),
    };
    expect(zGrid(configuration).not.toThrow(Error));
  });
});
