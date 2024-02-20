/**
 * @jest-environment jsdom
 */
import CustomClassNames from '../CustomClassNames';

describe('Custom CSS', () => {
  test('adding name adds class to element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(true);
  });

  test('removing name removes class from element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addCustomName('filter', 'customName');
    CustomClassNames.removeCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(false);
  });
});
