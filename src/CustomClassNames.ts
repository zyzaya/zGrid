type ClassName = 
  "filterContainer" | 
  "filter" | 
  "paginationContainer" |
  "paginationInfo" |
  "paginationButton" |
  "paginationPrevious" |
  "paginationCurrent" |
  "paginationNext"

type Record = {
  id: ClassName;
  element: HTMLElement;
  defaults?: Array<String>;
  custom?: Array<string>;
}

let validNames = [
  "filterContainer",
  "filter",
  "paginationContainer",
  "paginationInfo",
  "paginationButton",
  "paginationPrevious",
  "paginationCurrent",
  "paginationNext"
]

export default class CustomClassNames {
  private data: Array<Record>
  constructor() {
    this.data = [];
  }

  setElement(id: ClassName, element: HTMLElement) {
    if (!validNames.includes(id))
      throw new TypeError(`Invalid id ${id}. Must be one of ${validNames.join(', ')}`)
    
    let record = this.data.find((e) => e.id === id)
    if (record === undefined) {
      record = {
        id: id,
        element: element,
      }
      this.data.push(record)
    } else {
      record.element = element;
    }
  }

  addDefaultName(id: ClassName, name: string) {

  }

  removeDefaultName(id: ClassName, name: string) {

  }

  addCustomName(id: ClassName, name: string) {

  }

  removeCustomName(id: ClassName, name: string) {

  }
}