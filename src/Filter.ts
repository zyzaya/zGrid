export default class Filter {

  constructor(parent: HTMLDivElement) {
    let container = document.createElement('div')
    container.classList.add('zgrid_filter_container')
    
    let input = document.createElement('input')
    input.classList.add('zgrid_filter');
    input.type = 'text'
    input.placeholder = 'Type a keyword...'
    
    container.appendChild(input)
    parent.appendChild(container);
  }
}