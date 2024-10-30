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
export default class CustomDataAttributes extends CustomHTML {
  public static data: Array<Record> = [];

  static removeHTML(id: string, element: HTMLElement) {
    let record = this.getRecord(id);
    record.default.forEach((n) => {
      let d = Array.isArray(n) ? n[0] : n;
      delete element.dataset[d]
    })
    record.custom.forEach((n) => {
      let d = Array.isArray(n) ? n[0] : n;
      delete element.dataset[d]
    })
  }

  static updateHTML(id: string): void {
    let record = this.getRecord(id);
    record.elements.forEach((e) => {
      record.default.forEach((n) => {
        let d = Array.isArray(n) ? n[0] : n;
        let v = Array.isArray(n) ? n[1] : "";
        e.dataset[d] = v;
      })
      record.custom.forEach((n) => {
        let d = Array.isArray(n) ? n[0] : n;
        let v = Array.isArray(n) ? n[1] : "";
        e.dataset[d] = v;
      })
    })
  }
}