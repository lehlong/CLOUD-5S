import {BaseFilter} from '../Common/base.filter';

export class CustomerCareFilter extends BaseFilter {
    orderCode!: string ;
    careDate!: string ;
    careContent!: string ;
    PartnerCode!: string;
    id!:string;
}
export class CustomerCareEditFilter extends BaseFilter {
    orderCode!: string ;
    careDate!: string ;
    careContent!: string ;
    PartnerCode!: string;
    id!:string;
    code!: string
}
