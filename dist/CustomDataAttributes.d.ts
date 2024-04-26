import CustomHTML from "./CustomHTML";
type Record = {
    id: string;
    elements: Array<HTMLElement>;
    default: Array<any>;
    custom: Array<any>;
};
export default class CustomDataAttributes extends CustomHTML {
    static data: Array<Record>;
    static updateHTML(id: string): void;
}
export {};
