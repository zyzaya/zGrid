an expansion of the functionality of a html table

- columns
	- dynamically definable by user
	- resizable by end user
	- sort ascending/descending
	- filter by conditions
		- optional search box
	- selection
		- optional
	- intelligently changes when
		- adding data
		- removing data
		- filtering
		- sorting
	- pagination

- data
	- dynamically modifiable, entries can be added or removed client side
	- can be (re)populated by a request to a server

**questions**

- how would server side pagination work with dynamically modifiable entries?

for example if you were to get the first five of an alphabetically sorted list
and all five started with A, then added a new entry that started with Z. What happens?
Redoing the server request would exclude the newly added entry in its calculations.

assume client side pagination
all data is loaded locally
	data is sectioned and first n entries are displayed
	a new entry is appended to existing data
	a)
		entry is integrated into existing data
		data is resorted and sectioned
		page is changed to that of new entry
	b)
		entry is added (but not integrated) to existing data
		entry is displayed as is (ignoring pagination, sorting, and filtering)
		entry is sorted into data the next time the user triggers a sort, page change, or filter
	b) is better. a) causes actions to occur outside of the users actions

assume server side pagination
	request is sent to server for first n entries
	server responds with n entries, becoming local data
	local data (n entries) is displayed
	a new entry is appended to existing local data
	b)
		entry is added (but not integrated) to existing data
		data is displayed as is (ignoring pagination, sorting, and filtering)
		user triggers a sort/page change/ or filter
		b.1)
			request is sent to server for first n entries
			server responds with n entries, becoming local data
			existing local only entries are appended but not integrated to existing data

- lifecycle
	1. define configurations (columns, selectable, callbacks, sortable, resizable, pagination, styling)
	2. populate with data (server request, local data structure)
		- setFilter(string or column: string or function) (set by ui or programmatically)
		- sort(column, ascending) (set by ui or programmatically)
		- limit (set by configuration programmatically)
		- loadData(filter, sort, entries)
	3. user interacts with display of data
		- which entries are displayed (pagination pages, filtering)
		- how the entries are displayed (sorting, selecting, resizing columns)
	4. user (end user or zGrid user) manipulates the data
		- add entries
		- remove entries