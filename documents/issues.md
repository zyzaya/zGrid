# TODO Issues
  9. initializing with a parent of size 0 (for example a newly created, isolated div), then reconfiguring the parent will cause resizing to break. renderHeader is not called, meaning the widths of the headers are set to 0px until attempting to resize
  11. pagination buttons highlight when selected styling isn't removed when unselected
  12. on initial load, pagination buttons are not displayed correctly - [1, 2, 3, 4, etc] instead of [1, 2, 3, ..., 15]
  13. 
# Fixed Issues
  1. ~~cant actually use zGrid as a module~~
  2. ~~configure with empty data. reconfigure - filling in data. sort. causes error.~~ The cause was different, described in issue#3
  3. ~~null values for data entries cause errors on sort.~~
  7. ~~custom className tr is only affecting header tr elements~~
  8. ~~sorting by one column, then sorting by a different column doesn't reset the visual indication of the previously sorted column~~
  6. ~~onClick callback col parameter is including hidden columns.~~
  5. ~~setting the value of a data entry to a function breaks onClick callback. The value is stored as a function, when structuredClone is called it tries to clone a function - which causes a DOMException.~~
  4. ~~issue#3 still exists if data from that column is left out.~~
  10. ~~setting a column value to 0 (as an integer), causing the column to be set instead to an empty string.~~