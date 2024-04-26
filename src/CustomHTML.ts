type Record = {
  id: string;
  elements: Array<HTMLElement>;
  default: Array<string>;
  custom: Array<string>
}

/**
 * @internal
 */
export default class CustomHTML {
  public static data: Array<Record> = [];

  static clearRecords() {
    this.data = [];
  }

  static updateClassList(id: string) {
    let record = this.getRecord(id);
    record.elements.forEach((e) => {
      e.className = '';
      record.default.forEach((n) => e.classList.add(n))
      record.custom.forEach((n) => e.classList.add(n))
    })
  }

  static addElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    if (record.elements.includes(element)) return;
    record.elements.push(element)
    this.updateClassList(id)
  }

  static removeElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    record.elements = record.elements.filter((e) => e !== element)
    this.updateClassList(id)
  }

  static clearElements(id: string) {
    let record = this.getRecord(id);
    record.elements = [];
  }

  static getRecord(id: string): Record {
    let record = this.data.find((e) => e.id === id)
    if (record === undefined) {
      record = {
        id: id,
        elements: [],
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