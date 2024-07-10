import { Pagination } from '../../common/common-entities/entity';
import { PaginationTypeEnum } from '../../enums/enums';

export class TablePagination implements Pagination {
    pageIndex: number;
    pageSize: number;
    length: number;
    pageSizes: number[];

    readonly DEFAULT_PAGE_SIZES = [10, 20, 30, 40];
    readonly DEFAULT_PAGE_SIZE = 10;

    constructor(pageIndex = 0, length = 0) {
        this.pageIndex = pageIndex;
        this.length = length;
        this.pageSize = this.DEFAULT_PAGE_SIZE;
        this.pageSizes = this.DEFAULT_PAGE_SIZES;
    }
}

export class CardPagination implements Pagination {
    pageIndex: number;
    pageSize: number;
    length: number;
    pageSizes: number[];

    readonly DEFAULT_PAGE_SIZES = [30, 60, 90, 120];
    readonly DEFAULT_PAGE_SIZE = 30;

    constructor(pageIndex = 0, length = 0) {
        this.pageIndex = pageIndex;
        this.length = length;
        this.pageSize = this.DEFAULT_PAGE_SIZE;
        this.pageSizes = this.DEFAULT_PAGE_SIZES;
    }
}

export function paginationFactory(type: string): Pagination {
    if (type === PaginationTypeEnum.card) {
        return new CardPagination();
    } else {
        return new TablePagination();
    }
}
