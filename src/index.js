import zGrid from './zGrid';

let container = document.getElementById('container');
let grid = zGrid({
  parent: container,
  columns: ['ID', 'First Name', 'Last Name', 'Phone Number'],
  data: [['1', 'Riley', 'Sherlock', '555']],
});
