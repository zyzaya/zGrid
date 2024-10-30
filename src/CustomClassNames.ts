import CustomHTML from "./CustomHTML";

type Record = {
  id: string;
  elements: Array<HTMLElement>;
  default: Array<any>;
  custom: Array<any>
}

/**
 * @internal
 */
export default class CustomClassNames extends CustomHTML {
  public static data: Array<Record> = [];
  
  static removeHTML(id: string, element: HTMLElement) {
    let record = this.getRecord(id);
    record.default.forEach((n) => element.classList.remove(n))
    record.custom.forEach((n) => element.classList.remove(n))
  }

  static updateHTML(id: string): void {
    let record = this.getRecord(id);
    record.elements.forEach((e) => {
      e.className = '';
      record.default.forEach((n) => e.classList.add(n))
      record.custom.forEach((n) => e.classList.add(n))
    })
  }
}