/**
 * @jest-environment jsdom
 */
import CustomClassNames from '../CustomClassNames';

describe('Custom CSS', () => {
  test('adding name adds class to element', () => {
    let custom = new CustomClassNames();
    let element = document.createElement('div');
    document.body.appendChild(element);
    custom.setElement('filter', element);
    custom.addCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(true);
  });

  test('removing name removes class from element', () => {
    let custom = new CustomClassNames();
    let element = document.createElement('div');
    document.body.appendChild(element);
    custom.setElement('filter', element);
    custom.addCustomName('filter', 'customName');
    custom.removeCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(false);
  });
});
