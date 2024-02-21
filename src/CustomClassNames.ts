type Record = {
  id: string;
  element?: HTMLElement;
  default: Array<string>;
  custom: Array<string>
}

export default class CustomClassNames {
  public static data: Array<Record> = [];

  static clearRecords() {
    this.data = [];
  }

  static updateClassList(id: string) {
    let record = this.getRecord(id);
    if (record.element === undefined) return
    record.element.className = '';
    record.default.forEach((n) => record.element.classList.add(n))
    record.custom.forEach((n) => record.element.classList.add(n))
  }

  static setElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    record.element = element;
    this.updateClassList(id)
  }

  static getRecord(id: string): Record {
    let record = this.data.find((e) => e.id === id)
    if (record === undefined) {
      record = {
        id: id,
        default: [],
        custom: []
      }
      this.data.push(record)
    }
    return record
  }

  static addDefaultName(id: string, name: string) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    if (!record.default.includes(name)) {
      record.default.push(name);
      this.updateClassList(id);
    }
  }

  static removeDefaultName(id: string, name: string) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    record.default = record.default.filter((n) => n !== name)
    this.updateClassList(id);
  }

  static clearDefaultNames(id: string) {
    let record = this.getRecord(id);
    record.default = [];
    this.updateClassList(id);
  }

  static addCustomName(id: string, name: string) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    if (!record.custom.includes(name)) {
      record.custom.push(name)
      this.updateClassList(id);
    }
  }

  static removeCustomName(id: string, name: string) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    record.custom = record.custom.filter((n) => n !== name)
    this.updateClassList(id);
  }

  static clearCustomNames(id: string) {
    let record = this.getRecord(id);
    record.custom = [];
    this.updateClassList(id);
  }
}