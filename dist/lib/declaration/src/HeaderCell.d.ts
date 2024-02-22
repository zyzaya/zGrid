type Sort = "ascending" | "descending" | "none";
export default class HeaderCell {
    private element;
    private title;
    private buttonContainer;
    private sortAscending;
    private sortDescending;
    private resize;
    private current_sort;
    private sort_enabled;
    private resizing;
    onsort: (sort: Sort) => void;
    onresize: (width: number, change: number) => void;
    constructor(parent: HTMLTableRowElement);
    private setupSorting;
    private setupResizing;
    set innerText(text: string);
    set sort(sort: Sort);
    get sort(): Sort;
    set width(w: number | undefined);
    get width(): number;
    enableSort(enable: boolean): void;
}
export {};
