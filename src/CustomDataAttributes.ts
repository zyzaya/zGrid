import CustomHTML from "./CustomHTML";

export default class CustomDataAttributes extends CustomHTML {
  static updateHTML(id: string): void {
    let record = this.getRecord(id);
    record.elements.forEach((e) => {
      e.className = '';
      record.default.forEach((n) => e.classList.add(n))
      record.custom.forEach((n) => e.classList.add(n))
    })
  }
}