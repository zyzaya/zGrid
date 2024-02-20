type Record = {
  id: string;
  element?: HTMLElement;
  names: Array<string>;
}

export default class CustomClassNames {
  private data: Array<Record>
  constructor() {
    this.data = [];
  }

  updateClassList(id: string) {
    let record = this.getRecord(id);
    if (record.element === undefined) return
    record.element.className = '';
    record.names.forEach((n) => record.element.classList.add(n))
  }

  setElement(id: string, element: HTMLElement) {
    let record = this.getRecord(id)
    record.element = element;
  }

  getRecord(id: string): Record {
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

  addCustomName(id: string, name: string) {
    let record = this.getRecord(id);
    if (!record.names.includes(name)) {
      record.names.push(name)
      this.updateClassList(id);
    }
  }

  removeCustomName(id: string, name: string) {
    let record = this.getRecord(id);
    record.names = record.names.filter((n) => n !== name)
    this.updateClassList(id);
  }
}