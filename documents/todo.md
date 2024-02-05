- callbacks
  - on filter ✓
  - on page change ✓
  - on sort ✓
  - on click
- user defined styling
  - className
    - filter_container ✓
    - filter ✓
    - table
    - th
    - thead
    - tbody
    - tr
    - td
    - pagination_container
    - pagination_info
    - pagination_button
    - pagination_previous
    - pagination_current
    - pagination_next
- selections
- data populated by server request?

render
- displays or hides filter ui depending on configuration
    || can be done on (re)configure: configuration.searchbox 
- creates/rebuilds header ui
    || can be done on (re)configure: configuration.columns, configuration.data?
- applies filter/sort/pagination to data
    || can be done on re(configure): 
      configuration.data, configuration.columns, configuration.filter, configuration.pagination
- creates/rebuilds data ui
    || can be done on re(configure):
      same as modify data
- modified current page of pages ui
- displays/hides pagination ui depending on configuration
    || can be done on (re)configure: configuration.pagination
non render
- create container, table, 
- create 

render
- immediate response
vs
- upon called