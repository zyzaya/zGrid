import CustomClassNames from "./CustomClassNames";
import CustomDataAttributes from "./CustomDataAttributes";

/**
 * @internal
 */
export default class Pages {
  onpagechange?: (page: number) => void;
  private buttons: HTMLButtonElement[];

  private maxPages: number;
  private currentPage: number;
  
  constructor(parent: HTMLDivElement, pages = 1) {
    let container = document.createElement('div')
    CustomClassNames.addElement('paginationContainer', container)
    CustomClassNames.addDefaultName('paginationContainer', 'zgrid_pages_container')
    CustomDataAttributes.addElement('paginationContainer', container)

    let previous = document.createElement('button')
    CustomClassNames.addElement('paginationPrevious', previous)
    CustomClassNames.addDefaultName('paginationPrevious', 'zgrid_page_button')
    CustomDataAttributes.addElement('paginationPrevious', previous)
    previous.innerText = 'Previous'
    previous.onclick = () => this.previousPage();
    container.appendChild(previous)

    CustomClassNames.addDefaultName('paginationCurrent', 'zgrid_current_page')

    this.buttons = [];

    for (let i = 0; i < 7; i++) {
      this.buttons[i] = document.createElement('button')
      CustomClassNames.addElement(`paginationButton`, this.buttons[i])
      CustomDataAttributes.addElement('paginationButton', this.buttons[i])

      this.buttons[i].innerText = `${i + 1}`
      container.appendChild(this.buttons[i]);
    }
    CustomClassNames.addDefaultName(`paginationButton`, 'zgrid_page_button')

    let next = document.createElement('button')
    CustomClassNames.addElement('paginationNext', next)
    CustomClassNames.addDefaultName('paginationNext', 'zgrid_page_button')
    CustomDataAttributes.addElement('paginationNext', next)
    next.innerText = 'Next'
    next.onclick = (e) => this.nextPage();
    container.appendChild(next);

    parent.appendChild(container)

    this.currentPage = 1;
    this.totalPages = pages;
    this.maxPages = pages;
  }

  set totalPages(pages: number) {
    if (pages === this.maxPages) return;

    for(let i = 0; i < 7; i++) {
      if (pages <= 7 && i >= pages) {
        this.buttons[i].classList.add('zgrid_hidden')
      } else {
        this.buttons[i].classList.remove('zgrid_hidden')
      }
    }
    this.maxPages = pages;
    this.page = this.currentPage > pages ? pages : this.currentPage;
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
        this.buttons[i].onclick = null;
        CustomClassNames.removeElement('paginationCurrent', this.buttons[i])
        CustomDataAttributes.removeElement('paginationCurrent', this.buttons[i])
        CustomDataAttributes.addElement('paginationCurrent', this.buttons[i])
      } else {
        this.buttons[i].onclick = (e) => {
          this.page = newPage;
        }
        if (newPage == p) {
          // current page, so add current_page styling
          CustomClassNames.addElement('paginationCurrent', this.buttons[i])
          CustomDataAttributes.addElement('paginationCurrent', this.buttons[i])
        } else {
          // not current page, so remove current_page styling
          CustomClassNames.removeElement('paginationCurrent', this.buttons[i])
          CustomDataAttributes.removeElement('paginationCurrent', this.buttons[i])
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