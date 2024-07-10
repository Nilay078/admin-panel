export interface Entity {
    id: number;
}

export interface KeyValue {
    key: number;
    value: string;
}

export interface Key_Value_String {
    key: string;
    value: string;
}

export interface Pagination {
    pageIndex: number;
    pageSize: number;
    length: number;
    pageSizes: number[];
}

export interface FileView {
    fileId: string;
    name: string;
    caption: string;
    fileType: string;
}
