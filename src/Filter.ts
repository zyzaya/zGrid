export default class Filter {
  oninput: (event: InputEvent, value: string) => void;

  constructor(parent: HTMLDivElement) {
    let container = document.createElement('div')
    container.classList.add('zgrid_filter_container')
    
    let input = document.createElement('input')
    input.classList.add('zgrid_filter');
    input.type = 'text'
    input.placeholder = 'Type a keyword...'
    input.oninput = (e: InputEvent) => {
      if (this.oninput != undefined) this.oninput(e, input.value);
    }

    container.appendChild(input)
    parent.appendChild(container);
  }
}