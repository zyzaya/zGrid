export default class Pages {
    onpagechange: (page: number) => void;
    private buttons;
    private maxPages;
    private currentPage;
    constructor(parent: HTMLDivElement, pages?: number);
    set totalPages(pages: number);
    get totalPages(): number;
    set page(p: number);
    get page(): number;
    nextPage(): void;
    previousPage(): void;
}
