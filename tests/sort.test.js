/**
 * @jest-environment jsdom
 */
import zGrid from '../src/zGrid';
import { faker } from '@faker-js/faker';

describe('Sort', () => {
  let data = [];
  let configuration = {};
  let parent;
  let compare = (a, b) => {
    let a_rev = a.split('').reverse().join('');
    let b_rev = b.split('').reverse().join('');
    return a_rev.localeCompare(b_rev);
  };

  faker.seed(96);
  beforeEach(() => {
    data = [];
    parent = document.createElement('div');
    for (let i = 0; i < 10; i++) {
      data.push({
        'First Name': faker.person.firstName(),
        'Last Name': faker.person.lastName(),
        Email: faker.internet.email(),
      });
    }

    configuration = {
      parent: parent,
      columns: ['First Name', 'Last Name', 'Email'],
      data: data,
    };
  });

  test('no args means no sort', () => {
    let grid = new zGrid(configuration);
    grid.sort();
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  test('throws error if invalid column', () => {
    let grid = new zGrid(configuration);
    expect(() => {
      grid.sort('invalid column');
    }).toThrow(RangeError);
  });

  test('ascending must be a boolean', () => {
    let grid = new zGrid(configuration);
    expect(() => {
      grid.sort('First Name', []);
    }).toThrow(TypeError);
  });

  test('default sort is ascending', () => {
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    data.sort((a, b) => a['First Name'].localeCompare(b['First Name']));
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  test('can sort descending by column', () => {
    let grid = new zGrid(configuration);
    grid.sort('First Name', false);
    data
      .sort((a, b) => a['First Name'].localeCompare(b['First Name']))
      .reverse();
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  test('can set how a single column is sorted', () => {
    let columns = [
      {
        name: 'First Name',
        sort: compare,
      },
      'Last Name',
      'Email',
    ];
    configuration.columns = columns;
    let grid = new zGrid(configuration);
    grid.sort('First Name');
    data.sort((a, b) => compare(a['First Name'], b['First Name']));
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  test('can sort descending when sorting a column by function', () => {
    let columns = [
      {
        name: 'First Name',
        sort: compare,
      },
      'Last Name',
      'Email',
    ];
    configuration.columns = columns;
    let grid = new zGrid(configuration);
    grid.sort('First Name', false);
    data.sort((a, b) => compare(a['First Name'], b['First Name'])).reverse();
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  test('can sort by a function', () => {
    let compare = (a, b) => {
      let a_rev = a['Email'].split('').reverse().join('');
      let b_rev = b['Email'].split('').reverse().join('');
      return a_rev.localeCompare(b_rev);
    };
    let grid = new zGrid(configuration);
    grid.sort(compare);
    data.sort(compare);
    grid.getData().forEach((e, i) => {
      expect(e).toStrictEqual(data[i]);
    });
  });

  describe('onSort', () => {
    test('onSort triggers callback', () => {
      let callback = jest.fn();
      configuration.onSort = callback;
      let grid = new zGrid(configuration);
      let header = Array.from(
        parent.getElementsByClassName('zgrid_title')
      ).find((e) => {
        return e.innerText === 'First Name';
      });
      header.click();

      expect(callback).toHaveBeenCalled();
    });

    test('onSort passes column name and ascending to callback', () => {
      let callback = jest.fn();
      configuration.onSort = callback;
      let grid = new zGrid(configuration);
      let header = Array.from(
        parent.getElementsByClassName('zgrid_title')
      ).find((e) => {
        return e.innerText === 'First Name';
      });
      header.click();
      header.click();
      header.click();

      expect(callback).toHaveBeenNthCalledWith(1, 'First Name', true);
      expect(callback).toHaveBeenNthCalledWith(2, 'First Name', false);
    });

    test('reconfigure onsort', () => {
      let grid = new zGrid(configuration);
      let callback = jest.fn();
      grid.reconfigure({ onSort: callback });

      let header = Array.from(
        parent.getElementsByClassName('zgrid_title')
      ).find((e) => {
        return e.innerText === 'First Name';
      });
      header.click();

      expect(callback).toHaveBeenCalledWith('First Name', true);
    });
  });
});
