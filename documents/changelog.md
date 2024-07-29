# v1.0.0 - February 22, 2024
v1.0.0 complete
# v1.0.1 - February 24, 2024
- fix issue#3. Explicitly setting data values as null caused error when sorting.

- implement feature#2. Column name renamed to column id. Column name now refers to the displayed name of a column.
# v1.1.0 - April 27, 2024
- implement feature#4. Add ability to attach custom data-attributes to html elements.

- fix issue#7. Custom tr className was only affecting header tr elements.
- fix issue#8. Sorting by one column, then sorting by a different column doesn't reset the visual indication of the perviously sorted column.
- fix issue#6. column parameter value (indicating the column that was clicked) of onclick callback was including hidden columns.
- fix issue#5. Data entries could be set to a function - breaking the onclick callback. An error is now thrown if attempting to set a data entry to a function.
- fix issue#3. When setting data entries using an object format, undefined data was not stored properly, causing an error when sorting. Additionally entires for columns not yet defines were not tracked.

# v1.1.1 - July 29, 2024

- fix issue#10. Setting the value of a cell to 0 would prevent it from being displayed.