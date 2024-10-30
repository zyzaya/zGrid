type Record = {
  id: string;
  elements: Array<HTMLElement>;
  default: Array<any>;
  custom: Array<any>
}

/**
 * @internal
 */
export default class CustomHTML {
  public static data: Array<Record> = [];

  static clearRecords() {
    this.data = [];
  }

  static updateHTML(id: string) {}

  static addElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    if (record.elements.includes(element)) return;
    record.elements.push(element)
    this.updateHTML(id)
  }

  static removeElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    record.elements = record.elements.filter((e) => e !== element)
    this.updateHTML(id)
  }

  static clearElements(id: string) {
    let record = this.getRecord(id);
    record.elements = [];
    this.updateHTML(id);
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

  static addDefaultName(id: string, name: any) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    if (!record.default.includes(name)) {
      record.default.push(name);
      this.updateHTML(id);
    }
  }

  static removeDefaultName(id: string, name: any) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    record.default = record.default.filter((n) => n !== name)
    this.updateHTML(id);
  }

  static clearDefaultNames(id: string) {
    let record = this.getRecord(id);
    record.default = [];
    this.updateHTML(id);
  }

  static addCustomName(id: string, name: any) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    if (!record.custom.includes(name)) {
      record.custom.push(name)
      this.updateHTML(id);
    }
  }

  static removeCustomName(id: string, name: any) {
    if (name === undefined) return;
    let record = this.getRecord(id);
    record.custom = record.custom.filter((n) => n !== name)
    this.updateHTML(id);
  }

  static clearCustomNames(id: string) {
    let record = this.getRecord(id);
    record.custom = [];
    this.updateHTML(id);
  }
}