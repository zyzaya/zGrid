export default class Filter {
    oninput: (event: InputEvent, value: string) => void;
    private container;
    constructor(parent: HTMLDivElement);
    set visible(v: boolean);
    get visible(): boolean;
}
