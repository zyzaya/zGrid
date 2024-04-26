/**
 * @jest-environment jsdom
 */
import CustomHTML from '../src/CustomHTML';

describe('Custom CSS', () => {
  beforeEach(() => {
    document.body.replaceChildren();
    CustomHTML.clearRecords();
  });

  test('adding undefined as name does nothing', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addDefaultName('filter', undefined);
    expect(element.classList.contains('undefined')).toBe(false);
  });

  test('adding custom names before setting element', () => {
    CustomHTML.addDefaultName('filter', 'defaultName');
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    expect(element.classList.contains('defaultName')).toBe(true);
  });

  test('adding default name adds class to element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addDefaultName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(true);
  });

  test('removing default name removes class from element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addDefaultName('filter', 'customName');
    CustomHTML.removeDefaultName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(false);
  });

  test('clearDefaultNames', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addDefaultName('filter', 'custom1');
    CustomHTML.addDefaultName('filter', 'custom2');
    CustomHTML.clearDefaultNames('filter');
    expect(element.classList.contains('custom1')).toBe(false);
    expect(element.classList.contains('custom2')).toBe(false);
  });

  test('clearing default names doesnt clear custom', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addCustomName('filter', 'custom1');
    CustomHTML.clearDefaultNames('filter');
    expect(element.classList.contains('custom1')).toBe(true);
  });

  test('adding custom name adds class to element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(true);
  });

  test('removing custom name removes class from element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addCustomName('filter', 'customName');
    CustomHTML.removeCustomName('filter', 'customName');
    expect(element.classList.contains('customName')).toBe(false);
  });

  test('clearing custom names', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addCustomName('filter', 'custom1');
    CustomHTML.addCustomName('filter', 'custom2');
    CustomHTML.clearCustomNames('filter');
    expect(element.classList.contains('custom1')).toBe(false);
    expect(element.classList.contains('custom2')).toBe(false);
  });

  test('clearing custom names doesnt clear default', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addDefaultName('filter', 'custom1');
    CustomHTML.clearCustomNames('filter');
    expect(element.classList.contains('custom1')).toBe(true);
  });

  test('remove element', () => {
    let element = document.createElement('div');
    document.body.appendChild(element);
    CustomHTML.addElement('filter', element);
    CustomHTML.addDefaultName('filter', 'custom1');
    expect(element.classList.contains('custom1')).toBe(true);
    CustomHTML.removeElement('filter', element);
    CustomHTML.addDefaultName('filter', 'custom2');
    expect(element.classList.contains('custom2')).toBe(false);
  });

  test('clear elements', () => {
    for (let i = 0; i < 3; i++) {
      let element = document.createElement('div');
      document.body.appendChild(element);
      CustomHTML.addElement('filter', element);
    }
    CustomHTML.addDefaultName('filter', 'custom1');
    let ui = document.getElementsByClassName('custom1');
    expect(ui.length).toBe(3);
    CustomHTML.clearElements('filter');
    CustomHTML.addDefaultName('filter', 'custom2');
    expect(document.getElementsByClassName('custom2').length).toBe(0);
  });
});
