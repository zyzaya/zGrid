/**
 * @jest-environment jsdom
 */
import { zGrid } from '../../src/zGrid';
import Setup from '../setup';

describe('setCell', () => {
  let configuration;
  beforeEach(() => {
    configuration = Setup().configuration;
  });

  test('modify data of existing cell', () => {
    let grid = new zGrid(configuration);
    grid.setCell(0, 'Email', 'mail');
    expect(grid.getRow(0)['Email']).toBe('mail');
  });

  test('throws error if row does not exist', () => {
    let grid = new zGrid(configuration);
    expect(() =>
      grid.setCell(configuration.data.length + 1, 'Email', 'mail')
    ).toThrow(RangeError);
  });

  test('throws error if column does not exist', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell(0, 'Mid', 'z')).toThrow(RangeError);
  });

  test('throws error if id is set to invalid value', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell(0, 'id', null)).toThrow(TypeError);
  });

  test('throws error if id already exists', () => {
    let grid = new zGrid(configuration);
    expect(() => grid.setCell(0, 'id', 1)).toThrow(Error);
  });
});
