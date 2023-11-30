type Sort = "ascending" | "descending" | "none";

export default class HeaderCell {
  private element: HTMLTableCellElement;
  private title: HTMLDivElement;
  private buttonContainer: HTMLDivElement;
  private sortAscending: HTMLButtonElement;
  private sortDescending: HTMLButtonElement;
  private current_sort: Sort = "none";
  private sort_enabled: boolean = true;
  private resizing: boolean = false;
  onsort: (sort: Sort) => void
  onresize: (width: number) => void;

  constructor(parent: HTMLTableRowElement) {
    this.element = document.createElement('th');
    this.element.classList.add('zgrid_header');

    let container = document.createElement('div')
    container.classList.add('zgrid_header_content')

    this.title = document.createElement('div')
    this.title.classList.add('zgrid_title')

    this.buttonContainer = document.createElement('div')
    this.buttonContainer.classList.add('zgrid_sort_button_container')
    this.sortAscending = document.createElement('button')
    this.sortAscending.classList.add('zgrid_sort_button')
    this.sortAscending.innerText = "▲"
    this.sortAscending.onclick = (e) => {
      if (!this.sort_enabled) return

      this.sort = this.current_sort === "ascending" ? "none" : "ascending"
      if (this.onsort !== undefined) this.onsort(this.current_sort)
      e.stopPropagation()
    }
    this.sortDescending = document.createElement('button')
    this.sortDescending.classList.add('zgrid_sort_button')
    this.sortDescending.innerText = "▼"
    this.sortDescending.onclick = (e) => {
      if (!this.sort_enabled) return

      this.sort = this.sort === "descending" ? "none" : "descending"
      if (this.onsort !== undefined) this.onsort(this.sort)
      e.stopPropagation()
    }

    this.element.onclick = (e) => {
      if (!this.sort_enabled) return
      
      if (this.sort === "none") this.sort = "ascending"
      else if (this.sort === "ascending") this.sort = "descending"
      else if (this.sort === "descending") this.sort = "none"
      if (this.onsort !== undefined) this.onsort(this.sort)
    }
    this.buttonContainer.appendChild(this.sortAscending)
    this.buttonContainer.appendChild(this.sortDescending)
    
    let resize = document.createElement('button');
    let x = 0
    let width = 0;
    document.addEventListener('mousemove', (e) => {
      if (!this.resizing) return
      let dx = e.clientX - x;
      this.element.style.width = `${width + dx}px`
      if (this.onresize != undefined) this.onresize(width + dx)
    })
    document.addEventListener('mouseup', (e) => {
      this.resizing = false
    })
    resize.onmousedown = (e) => {
      this.resizing = true
      x = e.clientX;
      width = this.element.offsetWidth;
    }
    resize.classList.add('zgrid_column_resize');

    container.appendChild(this.title)
    container.appendChild(this.buttonContainer);
    container.appendChild(resize);

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

  set width(w: number | undefined) {
    if (w === undefined) this.element.style.width = '';
    else this.element.style.width = `${w}px`
  }

  enableSort(enable: boolean) {
    if (enable) this.buttonContainer.classList.remove("zgrid_hidden")
    else this.buttonContainer.classList.add("zgrid_hidden")
    this.sort_enabled = enable;
  }
}