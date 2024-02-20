type Record = {
  id: string;
  element?: HTMLElement;
  names: Array<string>;
}

export default class CustomClassNames {
  private static data: Array<Record> = [];

  static updateClassList(id: string) {
    let record = this.getRecord(id);
    if (record.element === undefined) return
    record.element.className = '';
    record.names.forEach((n) => record.element.classList.add(n))
  }

  static setElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    record.element = element;
  }

  static getRecord(id: string): Record {
    let record = this.data.find((e) => e.id === id)
    if (record === undefined) {
      record = {
        id: id,
        names: [],
      }
      this.data.push(record)
    }
    return record
  }

  static addCustomName(id: string, name: string) {
    let record = this.getRecord(id);
    if (!record.names.includes(name)) {
      record.names.push(name)
      this.updateClassList(id);
    }
  }

  static removeCustomName(id: string, name: string) {
    let record = this.getRecord(id);
    record.names = record.names.filter((n) => n !== name)
    this.updateClassList(id);
  }
}