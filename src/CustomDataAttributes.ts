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
      for (const data in e.dataset) delete e.dataset[data]
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