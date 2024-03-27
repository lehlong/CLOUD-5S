import {BaseFilter} from '../Common/base.filter';
export class InsertFilter {
  pId: string | null = null;
  type: string = '';
  content: string = '';
  attachmentId: string | null = null;
  referenceId: string = '';
}

export class GetAllByReferenceFilter {
  refId: string | null = null;
  currentPage: number = 1;
  pageSize: number = 10;
  keyWord: string = '';
}
