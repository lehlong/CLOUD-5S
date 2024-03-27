export interface Pagination {
  CurrentPage: number;
  TotalPage: number;
  PageSize: number;
  KeyWord: string;
  TotalRecord: number;
  Data?: object;
}

export class PaginationResult {
  currentPage: number = 0;
  totalPage: number = 0;
  pageSize: number = 0;
  keyWord: string = '';
  totalRecord: number = 0;
  data?: any;
}
