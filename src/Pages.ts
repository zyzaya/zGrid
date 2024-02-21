import CustomClassNames from "./CustomClassNames";

export default class Pages {
  onpagechange: (page: number) => void;
  private buttons: HTMLButtonElement[];

  private maxPages: number;
  private currentPage: number;
  
  constructor(parent: HTMLDivElement, pages = 1) {
    let container = document.createElement('div')
    CustomClassNames.addElement('paginationContainer', container)
    CustomClassNames.addDefaultName('paginationContainer', 'zgrid_pages_container')

    let previous = document.createElement('button')
    CustomClassNames.addElement('paginationPrevious', previous)
    CustomClassNames.addDefaultName('paginationPrevious', 'zgrid_page_button')
    previous.innerText = 'Previous'
    previous.onclick = () => this.previousPage();
    container.appendChild(previous)

    CustomClassNames.addDefaultName('paginationCurrent', 'zgrid_page_button')
    CustomClassNames.addDefaultName('paginationCurrent', 'zgrid_current_page')

    this.buttons = [];

    for (let i = 0; i < 7; i++) {
      this.buttons[i] = document.createElement('button')
      CustomClassNames.addElement(`paginationButton`, this.buttons[i])
      
      this.buttons[i].innerText = `${i + 1}`
      container.appendChild(this.buttons[i]);
    }
    CustomClassNames.addDefaultName(`paginationButton`, 'zgrid_page_button')

    let next = document.createElement('button')
    CustomClassNames.addElement('paginationNext', next)
    CustomClassNames.addDefaultName('paginationNext', 'zgrid_page_button')
    next.innerText = 'Next'
    next.onclick = (e) => this.nextPage();
    container.appendChild(next);

    parent.appendChild(container)

    this.totalPages = pages;
    this.page = 1;
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
  }

  get totalPages(): number {
    return this.maxPages
  }

  set page(p: number) {
    if (p < 0) {
      throw new RangeError(`page (${p}) cannot be less than zero`)
    } else if (p > this.maxPages) {
      throw new RangeError(`page (${p}) cannot be greater than the total number of pages (${this.maxPages})`)
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
        CustomClassNames.removeElement('paginationCurrent', this.buttons[i])
        CustomClassNames.addElement(`paginationButton`, this.buttons[i])
      } else {
        this.buttons[i].onclick = (e) => {
          this.page = newPage;
        }
        if (newPage == p) {
          CustomClassNames.removeElement(`paginationButtons`, this.buttons[i])
          CustomClassNames.addElement('paginationCurrent', this.buttons[i])
        } else {
          CustomClassNames.addElement(`paginationButton`, this.buttons[i])
        }
      }
    }
    this.currentPage = p;
    if (this.onpagechange !== undefined) this.onpagechange(p);
  }

  get page():number {
    return this.currentPage;
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