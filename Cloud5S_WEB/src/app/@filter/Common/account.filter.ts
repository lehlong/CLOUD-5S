import {EROLE_CODES} from 'src/app/utils/constant/index';

export class AccountFilter {
  currentPage: number = 1;
  pageSize: number = 20;
  keyWord: string = '';
  companyCode: string | null = null;
  isActive: boolean | string = '';
}

export interface optionsGroup {
  id: string;
  name: string;
}

export class AccountGetAllFilter {
  GroupId: string = '';
  RoleCode: string = EROLE_CODES['LAI_XE'];
  KeyWord: string = '';
}
