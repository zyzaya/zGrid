/**
 * @jest-environment jsdom
 */
import zGrid from '../../../src/zGrid';
import Setup from '../../setup';

describe('Reconfigure filter', () => {
  let configuration,
    data,
    parent,
    markedEmail,
    markedFirstNames,
    markedLastNames;

  beforeEach(() => {
    ({
      configuration,
      data,
      parent,
      markedEmail,
      markedFirstNames,
      markedLastNames,
    } = Setup());
  });

  test('reconfigure filter', () => {
    let grid = new zGrid(configuration);
    grid.reconfigure({ filter: 'example.test' });
    expect(grid.getData()).toStrictEqual(markedEmail);
  });

  test('reconfigure filter updates ui', () => {
    let grid = new zGrid(configuration);
    grid.setFilter('DWAL');
    let cells = Array.from(parent.getElementsByClassName('zgrid_cell'));
    markedLastNames.forEach((e) => {
      expect(cells.find((c) => c.innerText === e['Email'])).not.toBeUndefined();
    });
  });

  test('reconfigure onFilter', () => {
    let grid = new zGrid(configuration);
    let ui = parent.getElementsByClassName('zgrid_filter')[0];
    let callback = jest.fn();

    grid.reconfigure({ onFilter: callback });
    ui.value = 'newfilter';
    ui.dispatchEvent(
      new InputEvent('input', { bubbles: true, data: 'newfilter' })
    );
    expect(callback).toHaveBeenCalledWith('newfilter');
  });
});
