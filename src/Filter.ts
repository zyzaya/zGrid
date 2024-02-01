export default class Filter {
  oninput: (event: InputEvent, value: string) => void;

  private container: HTMLDivElement;
  private input: HTMLInputElement;

  constructor(parent: HTMLDivElement) {
    this.container = document.createElement('div')
    this.container.classList.add('zgrid_filter_container')
    
    this.input = document.createElement('input')
    this.input.classList.add('zgrid_filter');
    this.input.type = 'text'
    this.input.placeholder = 'Type a keyword...'
    this.input.oninput = (e: InputEvent) => {
      if (this.oninput != undefined) this.oninput(e, this.input.value);
    }

    this.container.appendChild(this.input)
    parent.appendChild(this.container);
  }

  set visible(v: boolean) {
    if (v) this.container.classList.remove('zgrid_hidden')
    else this.container.classList.add('zgrid_hidden')
  }

  get visible(): boolean {
    return this.container.classList.contains('zgrid_hidden')
  }

  setClassNames(classNames: {filterContainer?: string, filter?: string}) {
    this.container.className = '';
    this.container.classList.add('zgrid_filter_container')
    if (classNames.filterContainer)
      this.container.classList.add(classNames.filterContainer)
    this.input.className = '';
    this.input.classList.add('zgrid_filter');
    if (classNames.filter)
      this.input.classList.add(classNames.filter)
  }
}