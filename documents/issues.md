# TODO Issues
  4. issue#3 still exists if data from that column is left out.
  5. setting the value of a data entry to a function breaks onClick callback. The value is stored as a function, when structuredClone is called it tries to clone a function - which causes a DOMException.
  6. onClick callback col parameter is including hidden columns.
# Fixed Issues
  1. ~~cant actually use zGrid as a module~~
  2. ~~configure with empty data. reconfigure - filling in data. sort. causes error.~~ The cause was different, described in issue#3
  3. ~~null values for data entries cause errors on sort.~~
  7. ~~custom className tr is only affecting header tr elements~~
  8. ~~sorting by one column, then sorting by a different column doesn't reset the visual indication of the previously sorted column~~