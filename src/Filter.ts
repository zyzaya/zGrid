import CustomClassNames from "./CustomClassNames";

export default class Filter {
  oninput: (event: InputEvent, value: string) => void;

  private container: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.container = document.createElement('div')
    CustomClassNames.setElement('filterContainer', this.container)
    CustomClassNames.addCustomName('filterContainer', 'zgrid_filter_container')

    let input = document.createElement('input')
    CustomClassNames.setElement('filter', input)
    CustomClassNames.addCustomName('filter', 'zgrid_filter')
    input.type = 'text'
    input.placeholder = 'Type a keyword...'
    input.oninput = (e: InputEvent) => {
      if (this.oninput != undefined) this.oninput(e, input.value);
    }

    this.container.appendChild(input)
    parent.appendChild(this.container);
  }

  set visible(v: boolean) {
    if (v) this.container.classList.remove('zgrid_hidden')
    else this.container.classList.add('zgrid_hidden')
  }

  get visible(): boolean {
    return this.container.classList.contains('zgrid_hidden')
  }

  // setClassNames(classNames: {filterContainer?: string, filter?: string}) {
  //   this.container.className = '';
  //   this.container.classList.add('zgrid_filter_container')
  //   if (classNames.filterContainer)
  //     this.container.classList.add(classNames.filterContainer)
  //   this.input.className = '';
  //   this.input.classList.add('zgrid_filter');
  //   if (classNames.filter)
  //     this.input.classList.add(classNames.filter)
  // }
}