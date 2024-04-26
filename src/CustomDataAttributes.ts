import CustomHTML from "./CustomHTML";

type Record = {
  id: string;
  elements: Array<HTMLElement>;
  default: Array<any>;
  custom: Array<any>
}

export default class CustomDataAttributes extends CustomHTML {
  public static data: Array<Record> = [];

  static updateHTML(id: string): void {
    let record = this.getRecord(id);
    record.elements.forEach((e) => {
      e.className = '';
      record.default.forEach((n) => e.classList.add(n))
      record.custom.forEach((n) => e.classList.add(n))
    })
  }
}