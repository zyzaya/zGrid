import CustomClassNames from "./CustomClassNames";

export default class Pages {
  onpagechange: (page: number) => void;
  private buttons: HTMLButtonElement[];
  // private previous: HTMLButtonElement;
  // private next: HTMLButtonElement;

  private maxPages: number;
  private currentPage: number;
  private currentClassName: string;
  
  constructor(parent: HTMLDivElement, pages = 1) {
    let container = document.createElement('div')
    CustomClassNames.setElement('paginationContainer', container)
    CustomClassNames.addDefaultName('paginationContainer', 'zgrid_pages_container')

    let previous = document.createElement('button')
    CustomClassNames.setElement('paginationPrevious', previous)
    CustomClassNames.addDefaultName('paginationPrevious', 'zgrid_page_button')
    previous.innerText = 'Previous'
    previous.onclick = () => this.previousPage();
    container.appendChild(previous)

    CustomClassNames.addDefaultName('paginationCurrent', 'zgrid_page_button')
    CustomClassNames.addDefaultName('paginationCurrent', 'zgrid_current_page')

    this.buttons = [];

    for (let i = 0; i < 7; i++) {
      this.buttons[i] = document.createElement('button')
      CustomClassNames.setElement(`paginationButtons${i}`, this.buttons[i])
      CustomClassNames.addDefaultName(`paginationButtons${i}`, 'zgrid_page_button')
      this.buttons[i].innerText = `${i + 1}`
      container.appendChild(this.buttons[i]);
    }

    let next = document.createElement('button')
    CustomClassNames.setElement('paginationPrevious', next)
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
        CustomClassNames.setElement('paginationCurrent', undefined)
        CustomClassNames.setElement(`paginationButtons${i}`, this.buttons[i])
      } else {
        this.buttons[i].onclick = (e) => {
          this.page = newPage;
        }
        if (newPage == p) {
          CustomClassNames.setElement(`paginationButtons${i}`, undefined)
          CustomClassNames.setElement('paginationCurrent', this.buttons[i])
        } else {
          CustomClassNames.setElement('paginationCurrent', undefined)
          CustomClassNames.setElement(`paginationButtons${i}`, this.buttons[i])
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

  // public setClassNames(classNames: {
  //   paginationContainer?: string,
  //   paginationButton?: string,
  //   paginationPrevious?: string,
  //   paginationCurrent?: string,
  //   paginationNext?: string
  // }) {
  //   this.container.className = '';
  //   this.container.classList.add('zgrid_pages_container')
  //   if (classNames.paginationContainer)
  //     this.container.classList.add(classNames.paginationContainer)
  //   this.previous.className = '';
  //   this.previous.classList.add('zgrid_page_button')
  //   this.next.className = '';
  //   this.next.classList.add('zgrid_page_button')
  //   this.buttons.forEach((b) => {
  //     b.className = '';
  //     b.classList.add('zgrid_page_button')
  //     if (classNames.paginationButton)
  //       b.classList.add(classNames.paginationButton)
  //   })
  //   if (classNames.paginationButton) {
  //     this.previous.classList.add(classNames.paginationButton)
  //     this.next.classList.add(classNames.paginationButton)
  //   }
  //   if (classNames.paginationPrevious)
  //     this.previous.classList.add(classNames.paginationPrevious)
  //   if (classNames.paginationNext)
  //     this.next.classList.add(classNames.paginationNext)
  //   let current = this.buttons[this.currentPage]
  //   current.className = '';
  //   current.classList.add('zgrid_page_button');
  //   current.classList.add('zgrid_current_page');
  //   if (classNames.paginationButton)
  //     current.classList.add(classNames.paginationButton)
  //   if (classNames.paginationCurrent)
  //     current.classList.add(classNames.paginationCurrent)
  // }
}