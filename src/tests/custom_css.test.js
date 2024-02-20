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

  test('clearDefaultNames', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addDefaultName('filter', 'custom1');
    CustomClassNames.addDefaultName('filter', 'custom2');
    CustomClassNames.clearDefaultNames('filter');
    expect(element.classList.contains('custom1')).toBe(false);
    expect(element.classList.contains('custom2')).toBe(false);
  });

  test('clearing default names doesnt clear custom', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addCustomName('filter', 'custom1');
    CustomClassNames.clearDefaultNames('filter');
    expect(element.classList.contains('custom1')).toBe(true);
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

  test('clearing custom names', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addCustomName('filter', 'custom1');
    CustomClassNames.addCustomName('filter', 'custom2');
    CustomClassNames.clearCustomNames('filter');
    expect(element.classList.contains('custom1')).toBe(false);
    expect(element.classList.contains('custom2')).toBe(false);
  });

  test('clearing custom names doesnt clear default', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomClassNames.setElement('filter', element);
    CustomClassNames.addDefaultName('filter', 'custom1');
    CustomClassNames.clearCustomNames('filter');
    expect(element.classList.contains('custom1')).toBe(true);
  });
});
