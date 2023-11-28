export default class HeaderCell {
  private element: HTMLTableCellElement;
  private title: HTMLDivElement;
  private sortAscending: HTMLButtonElement;
  private sortDescending: HTMLButtonElement;

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
    this.sortDescending = document.createElement('button')
    this.sortDescending.classList.add('zgrid_sort_button')
    this.sortDescending.innerText = "▼"

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
}