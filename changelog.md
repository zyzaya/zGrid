# v1.3.4 - November 10, 2026
- add usage documentation

# v1.3.3 - Novemeber 09, 2024
- fix issue#24. onPageChange is fired prior to page being changed.

# v1.3.2 - November 07, 2024
- fix issue#23. Filtering such that the resulting total pages is less than the current page causes an error.

# v1.3.1 - November 06, 2024
- implement feature#14. Added totalPages, to get total number of pages

- fix issue#19. Pagination button don't display properly when there are seven or fewer pages.
- fix issue#21. Custom css classes for paginationButton were not being added to all page buttons.
- fix issue#22. Added id to filter input element


# v1.3.0 - October 31, 2024
- implement feature#7. Added getRawData, to get unmodified dataset
- implement feature#11. Added selection functionality. 
  - selection configuration option. Enables or disables selecttions
  - setSelected. Sets the selected row.
  - getSelected. Gets the data of the selected row.
  - selected className. Sets custom css class for selected row.
  - selected dataAttribute. Sets custom data attributes for selected row.
- implement feature#12. Allow column values to be types other than strings


- fix issue#15. sorting when clicking a header is done incorrectly in specific circumstances
- fix issue#16. onSort callback isn't called when switching to unsorted
- fix issue#17. resizing columns can increase total size of zgrid
- fix issue#18. sorting is broken when column values are not strings


# v1.2.2 - August 06, 2024
- fix issue#14. onclick would give the incorrect data after changing data such that number of visible rows is reduced.

# v1.2.1 - August 06, 2024
- fix issue#13. It was possible to prevent a cell onclick event from firing by modified zgrid data just before clicking a cell.
- unused are now hidden instead of removed

# v1.2.0 - August 01, 2024
- implement feature#8. Modified the way that zgrid displays elements after a reconfigure. It no longer fully recreates all table elements, now reusing existing elements and only creating or deleting as needed.
- added id column. All rows now require a unique, non null, non empty string id value. When configuring a row using an array the first value of the array is the value of the id. When configuring using an object, the key 'id' is used to set the id value.
- added CRUD functions for row data, using the id column:
  - added addRow
  - added getRow
  - added setRow
  - added removeRow
- added getCell
- feature#5. Modified custom dataAttributes to allow for multiple attributes.

- fix issue#11. Styling indication of the current page wasn't being removed when changing pages.
- fix issue#12. On initial load pagination buttons weren't being displayed properly.

# v1.1.1 - July 29, 2024
- fix issue#10. Setting the value of a cell to 0 would prevent it from being displayed.

# v1.1.0 - April 27, 2024
- implement feature#4. Add ability to attach custom data-attributes to html elements.

- fix issue#7. Custom tr className was only affecting header tr elements.
- fix issue#8. Sorting by one column, then sorting by a different column doesn't reset the visual indication of the perviously sorted column.
- fix issue#6. column parameter value (indicating the column that was clicked) of onclick callback was including hidden columns.
- fix issue#5. Data entries could be set to a function - breaking the onclick callback. An error is now thrown if attempting to set a data entry to a function.
- fix issue#3. When setting data entries using an object format, undefined data was not stored properly, causing an error when sorting. Additionally entires for columns not yet defines were not tracked.

# v1.0.1 - February 24, 2024
- fix issue#3. Explicitly setting data values as null caused error when sorting.

- implement feature#2. Column name renamed to column id. Column name now refers to the displayed name of a column.

# v1.0.0 - February 22, 2024
v1.0.0 complete