export default class Pages {
  onpagechange: (page: number) => void;
  private container: HTMLDivElement;
  private maxPages: number;
  private currentPage: number;

  constructor(parent: HTMLDivElement, pages = 1) {
    this.container = document.createElement('div')
    this.container.classList.add('zgrid_pages_container')

    this.totalPages = pages;

    parent.appendChild(this.container)
  }

  set totalPages(pages: number) {
    if (pages === this.maxPages) return;
    
    this.maxPages = pages;

    let previous = document.createElement('button')
    previous.classList.add('zgrid_page_button')
    previous.innerText = 'Previous'
    this.container.appendChild(previous)
    
    for (let i = 1; i <= pages; i++) {
      let button = document.createElement('button')
      button.classList.add('zgrid_page_button')
      button.innerText = `${i}`
      button.onclick = (e) => {
        this.page = i;
      }
      this.container.appendChild(button)
    }

    let next = document.createElement('button')
    next.classList.add('zgrid_page_button')
    next.innerText = 'Next'
    this.container.appendChild(next);
  }

  get totalPages(): number {
    return this.maxPages
  }

  set page(p: number) {
    console.log(`setting page to ${p}`)
  }
}