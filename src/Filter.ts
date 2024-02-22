import CustomClassNames from "./CustomClassNames";

/**
 * @internal
 */
export default class Filter {
  oninput: (event: InputEvent, value: string) => void;

  private container: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.container = document.createElement('div')
    CustomClassNames.addElement('filterContainer', this.container)
    CustomClassNames.addDefaultName('filterContainer', 'zgrid_filter_container')

    let input = document.createElement('input')
    CustomClassNames.addElement('filter', input)
    CustomClassNames.addDefaultName('filter', 'zgrid_filter')
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
}