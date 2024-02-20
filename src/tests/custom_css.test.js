/**
 * @jest-environment jsdom
 */
import CustomClassNames from '../CustomClassNames';

describe('Custom CSS', () => {
  test('Throws error with invalid id', () => {
    let custom = new CustomClassNames();
    let element = document.createElement('div');
    expect(() => {
      custom.setElement('invalid name', element);
    }).toThrow(TypeError);
  });
});
