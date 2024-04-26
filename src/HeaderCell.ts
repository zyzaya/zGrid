import CustomClassNames from "./CustomClassNames";
import CustomDataAttributes from "./CustomDataAttributes";

type Sort = "ascending" | "descending" | "none";

/**
 * @internal
 */
export default class HeaderCell {
  private element: HTMLTableCellElement;
  private title: HTMLDivElement;
  private buttonContainer: HTMLDivElement;
  private sortAscending: HTMLButtonElement;
  private sortDescending: HTMLButtonElement;
  private resize: HTMLButtonElement;
  private current_sort: Sort = "none";
  private sort_enabled: boolean = true;
  private resizing: boolean = false;
  onsort: (sort: Sort) => void
  onresize: (width: number, change: number) => void;

  constructor(parent: HTMLTableRowElement) {
    this.element = document.createElement('th');
    CustomClassNames.addElement('th', this.element)
    CustomClassNames.addCustomName('th', 'zgrid_header')
    CustomDataAttributes.addElement('th', this.element)

    let container = document.createElement('div')
    container.classList.add('zgrid_header_content')

    this.title = document.createElement('div')
    this.title.classList.add('zgrid_title')

    this.setupSorting()
    this.setupResizing();
      
    container.appendChild(this.title)
    container.appendChild(this.buttonContainer);
    container.appendChild(this.resize);

    this.element.appendChild(container);
    parent.appendChild(this.element)
  }

  private setupSorting() {
    this.buttonContainer = document.createElement('div')
    this.buttonContainer.classList.add('zgrid_sort_button_container')
    
    this.sortAscending = document.createElement('button')
    this.sortAscending.classList.add('zgrid_sort_button')
    this.sortAscending.innerText = "▲"
    this.sortAscending.onclick = (e) => {
      if (!this.sort_enabled || this.resizing) return

      this.sort = this.current_sort === "ascending" ? "none" : "ascending"
      if (this.onsort !== undefined) this.onsort(this.current_sort)
      e.stopPropagation()
    }
    this.sortDescending = document.createElement('button')
    this.sortDescending.classList.add('zgrid_sort_button')
    this.sortDescending.innerText = "▼"
    this.sortDescending.onclick = (e) => {
      if (!this.sort_enabled || this.resizing) return

      this.sort = this.sort === "descending" ? "none" : "descending"
      if (this.onsort !== undefined) this.onsort(this.sort)
      e.stopPropagation()
    }

    this.title.onclick = (e) => {
      if (!this.sort_enabled || this.resizing) return
      
      if (this.sort === "none") this.sort = "ascending"
      else if (this.sort === "ascending") this.sort = "descending"
      else if (this.sort === "descending") this.sort = "none"
      if (this.onsort !== undefined) this.onsort(this.sort)
    }
    this.buttonContainer.appendChild(this.sortAscending)
    this.buttonContainer.appendChild(this.sortDescending)
  }

  private setupResizing() {
    this.resize = document.createElement('button')
    let x = 0
    let width = 0;
    document.addEventListener('mousemove', (e) => {
      if (!this.resizing) return
      let dx = e.clientX - x;
      let new_width = width + dx;
      if (new_width < 0) {
        new_width = 0;
        dx = new_width - width;
      }
      this.element.style.width = `${new_width}px`
      x = e.clientX;
      width = new_width;
      if (this.onresize != undefined) this.onresize(width, dx)
    })
    document.addEventListener('mouseup', (e) => {
      if (!this.resizing) return
      this.resizing = false
    })
    this.resize.onmousedown = (e) => {
      this.resizing = true
      x = e.clientX;
      width = this.element.offsetWidth;
      e.stopPropagation()
    }
    this.resize.classList.add('zgrid_column_resize');
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

  get width(): number {
    return parseFloat(this.element.style.width)
  }

  enableSort(enable: boolean) {
    if (enable) this.buttonContainer.classList.remove("zgrid_hidden")
    else this.buttonContainer.classList.add("zgrid_hidden")
    this.sort_enabled = enable;
  }
}