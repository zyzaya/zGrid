type Record = {
    id: string;
    elements: Array<HTMLElement>;
    default: Array<string>;
    custom: Array<string>;
};
export default class CustomClassNames {
    static data: Array<Record>;
    static clearRecords(): void;
    static updateClassList(id: string): void;
    static addElement(id: string, element: HTMLElement): void;
    static removeElement(id: string, element: HTMLElement): void;
    static clearElements(id: string): void;
    static getRecord(id: string): Record;
    static addDefaultName(id: string, name: string): void;
    static removeDefaultName(id: string, name: string): void;
    static clearDefaultNames(id: string): void;
    static addCustomName(id: string, name: string): void;
    static removeCustomName(id: string, name: string): void;
    static clearCustomNames(id: string): void;
}
export {};
