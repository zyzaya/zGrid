/**
 * @jest-environment jsdom
 */
import CustomClassNames from '../CustomClassNames';

describe('Custom CSS', () => {
  beforeEach(() => {
    document.body.replaceChildren();
    CustomClassNames.clearRecords();
  });

  test('adding custom names before setting element', () => {
    CustomClassNames.addDefaultName('filter', 'defaultName');
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    expect(element.classList.contains('defaultName')).toBe(true);
  });

  test('adding default name adds class to element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addDefaultName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(true);
  });

  test('removing default name removes class from element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addDefaultName('filter', 'customName');
    CustomClassNames.removeDefaultName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(false);
  });

  test('adding custom name adds class to element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(true);
  });

  test('removing custom name removes class from element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addCustomName('filter', 'customName');
    CustomClassNames.removeCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(false);
  });
});
