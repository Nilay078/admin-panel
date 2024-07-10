import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../common/common-entities/entity';

@Component({
    selector: 'app-mat-pagination',
    templateUrl: './mat-pagination.component.html',
})
export class MatPaginationComponent {
    @Input() pagination!: Pagination;
    @Output() changedPagination = new EventEmitter();

    paginationChange(pageEvent: PageEvent) {
        this.pagination.pageIndex = pageEvent.pageIndex;
        this.pagination.pageSize = pageEvent.pageSize;
        this.changedPagination.emit(this.pagination);
    }
}
