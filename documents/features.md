# TODO Features
  1. make into functional npm module
  10. use userEvent to more fully test user interactions. 
  13. add a configuration option to pagination to allow the enabling of the following feature: allow the user to select how many elements are displayed per page.
  14. add way of getting total pages.
  15. 
# Completed Features
  2. ~~add ability to separate column identifier and displayed column name~~
  4. ~~add ability to set html data attribues~~
  3. ~~add missing classnames to ClassNames type is zGrid.ts~~
  8. modify the way zgrid reconfigures: 
  - when doing zgrid.reconfigure({data: data}), make is so that only changed elements are modified.
  - do not fully recreate elements. reuse existing, creating/deleting only as necessary
  - add some form of unique identifier to rows, and allow for the modification of a single row at a time
  9. ~~improve speed of reconfigure~~
  6. ~~implement an easier way to modify the data, currently the only way to change the values of a single row is to use reconfigure and change the entire dataset~~
  5. ~~add ability to configure an element to have multiple attributes~~
  7. ~~add a way to get the unmodified dataset.~~
  12. ~~allow for column values to be types other than strings~~
  11. ~~selections~~