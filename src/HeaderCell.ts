type Sort = "ascending" | "descending" | "none";

export default class HeaderCell {
  private element: HTMLTableCellElement;
  private title: HTMLDivElement;
  private sortAscending: HTMLButtonElement;
  private sortDescending: HTMLButtonElement;
  private current_sort: Sort = "none";
  private onsort: (sort: Sort) => {}

  constructor(parent: HTMLTableRowElement) {
    this.element = document.createElement('th');
    this.element.classList.add('zgrid_header');

    let container = document.createElement('div')
    container.classList.add('zgrid_header_content')

    this.title = document.createElement('div')
    this.title.classList.add('zgrid_title')

    let button_container = document.createElement('div')
    button_container.classList.add('zgrid_sort_button_container')
    this.sortAscending = document.createElement('button')
    this.sortAscending.classList.add('zgrid_sort_button')
    this.sortAscending.innerText = "▲"
    this.sortAscending.onclick = (e) => {
      this.sort = this.current_sort === "ascending" ? "none" : "ascending"
      if (this.onsort !== undefined) this.onsort(this.current_sort)
      e.stopPropagation()
    }
    this.sortDescending = document.createElement('button')
    this.sortDescending.classList.add('zgrid_sort_button')
    this.sortDescending.innerText = "▼"
    this.sortDescending.onclick = (e) => {
      this.sort = this.sort === "descending" ? "none" : "descending"
      if (this.onsort !== undefined) this.onsort(this.sort)
      e.stopPropagation()
    }

    this.element.onclick = (e) => {
      if (this.sort === "none") this.sort = "ascending"
      else if (this.sort === "ascending") this.sort = "descending"
      else if (this.sort === "descending") this.sort = "none"
      if (this.onsort !== undefined) this.onsort(this.sort)
    }
    button_container.appendChild(this.sortAscending)
    button_container.appendChild(this.sortDescending)
    
    container.appendChild(this.title)
    container.appendChild(button_container);
    
    this.element.appendChild(container);
    parent.appendChild(this.element)
  }

  set innerText(text: string) {
    this.title.innerText = text;
  }

  set sort(sort: Sort) {
    let active_class = 'zgrid_sort_button_active'
    if (sort === "none") {
      this.sortAscending.classList.remove(active_class)
      this.sortDescending.classList.remove(active_class)
    }
    else if (sort === "ascending") {
      this.sortAscending.classList.add(active_class)
      this.sortDescending.classList.remove(active_class)
    }
    else if (sort === "descending") {
      this.sortAscending.classList.remove(active_class)
      this.sortDescending.classList.add(active_class)
    }
    this.current_sort = sort
  }

  get sort() {
    return this.current_sort;
  }
}