import zGrid from '../dist/zGrid';
import '../dist/zgrid_default';

let container = document.getElementById('container');
let grid = new zGrid({
  parent: container,
  columns: [
    {
      name: 'ID',
      visible: false,
    },
    'First Name',
    'Phone Number',
    'Email',
  ],
  data: [],
  pagination: 7,
});
