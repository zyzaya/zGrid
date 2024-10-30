# TODO Issues
  17. improve how column resizing functions: prevent resizing from increasing total size of grid
  18. sorting is broken when the value of the column is not a string
  19. 
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
  11. ~~pagination buttons highlight when selected styling isn't removed when unselected~~
  12. ~~on initial load, pagination buttons are not displayed correctly - [1, 2, 3, 4, etc] instead of [1, 2, 3, ..., 15]~~
  13. ~~causing a call to renderData just before a row onclick will prevent the onclick event from firing. This can be reproduced by having a text input that on its onchange event is fired modifies zgrid data (ex through setRow). When the input losing focus by clicking on a row, zgrid data is updated but the onclick event is not fired.~~
  14. ~~onclick, after reducing the number of rows, gives the incorrect data~~
  15. ~~sorting when clicking on a header is done incorrectly. to reproduce:~~
    1. ~~create a new zgrid with a visible column~~
    2. ~~reconfigure zgrid, adding an additional column, and ~~
    making the initial column not visible
    3. ~~sort by the second (visible) column by clicking on the header. This causes zgrid to be sorted by the invisible column instead of the one the user clicked on.~~
    16. onSort callback isn't called when switching to unsorted
    9. initializing with a parent of size 0 (for example a newly created, isolated div), then reconfiguring the parent will cause resizing to break. renderHeader is not called, meaning the widths of the headers are set to 0px until attempting to resize. 24-07-01: I can no longer reproduce this.