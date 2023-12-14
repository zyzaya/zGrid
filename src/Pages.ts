export default class Pages {
  onpagechange: (page: number) => void;
  private container: HTMLDivElement;
  private maxPages: number;
  private currentPage: number;
  private buttons: HTMLButtonElement[];

  constructor(parent: HTMLDivElement, pages = 1) {
    this.container = document.createElement('div')
    this.container.classList.add('zgrid_pages_container')

    let previous = document.createElement('button')
    previous.classList.add('zgrid_page_button')
    previous.innerText = 'Previous'
    previous.onclick = () => this.previousPage();
    this.container.appendChild(previous)
    

    this.buttons = [];

    for (let i = 0; i < 7; i++) {
      this.buttons[i] = document.createElement('button')
      this.buttons[i].classList.add('zgrid_page_button')
      this.buttons[i].innerText = `${i + 1}`
      this.container.appendChild(this.buttons[i]);
    }

    let next = document.createElement('button')
    next.classList.add('zgrid_page_button')
    next.innerText = 'Next'
    next.onclick = (e) => this.nextPage();
    this.container.appendChild(next);

    parent.appendChild(this.container)

    this.currentPage = 1;
    this.totalPages = pages;
  }

  set totalPages(pages: number) {
    if (pages === this.maxPages) return;

    if (pages <= 7) {
      for (let i = pages; i < 7; i++) {
        this.buttons[i].classList.add('zgrid_hidden')
      }
    } else {
      for (let i = 0; i < 7; i++) {
        this.buttons[i].classList.remove('zgrid_hidden')
      }
    }
    this.maxPages = pages;
    this.page = this.currentPage;
  }

  get totalPages(): number {
    return this.maxPages
  }

  set page(p: number) {
    if (p <= 0) {
      throw new RangeError('page cannot be less than zero')
    } else if (p > this.maxPages) {
      throw new RangeError(`page cannot be greater than the total number of pages ${this.maxPages}`)
    } else if (this.currentPage = p) {
      return;
    }
    
    for (let i = 0; i < this.buttons.length; i++) {
      let newPage: number | undefined;
      if (this.maxPages <= 7) {
        newPage = i + 1
      } else if (i == 0) {
        newPage = 1
      } else if ((i == 1 && p > 4)
            || (i == this.buttons.length - 2 && p < this.maxPages - 3)) {
        newPage = undefined
      } else if (i == this.buttons.length - 1) {
        newPage = this.maxPages
      } else {
        let adjust = p <= 4 ? 4 : p
        adjust = p >= this.maxPages - 3 ? this.maxPages - 3 : adjust;
        newPage = adjust + (i - 3);
      }
      this.buttons[i].innerText = `${newPage ? newPage : '...'}`
      if (newPage === undefined) {
        this.buttons[i].onclick = undefined;
        this.buttons[i].classList.remove('zgrid_current_page')
      } else {
        this.buttons[i].onclick = (e) => {
          this.page = newPage;
        }
        if (newPage == p) {
          this.buttons[i].classList.add('zgrid_current_page')
        } else {
          this.buttons[i].classList.remove('zgrid_current_page')
        }
      }
    }
    this.currentPage = p;
    if (this.onpagechange !== undefined) this.onpagechange(p);
  }

  public nextPage(): void {
    if (this.currentPage == this.maxPages) return
    this.page = this.currentPage + 1
  }

  public previousPage(): void {
    if (this.currentPage == 1) return
    this.page = this.currentPage - 1
  }
}