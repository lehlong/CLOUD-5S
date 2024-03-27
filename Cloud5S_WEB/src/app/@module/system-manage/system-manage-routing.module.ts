import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountGroupIndexComponent} from '../system-manage/account-group/account-group-index/account-group-index.component';
import {AccountIndexComponent} from './account/account-index/account-index.component';
import {MenuIndexComponent} from './menu/menu-index/menu-index.component';
import {RightIndexComponent} from './role/role-index/right-index.component';
import {TotalReportIndexComponent} from './total-report/total-report-index/total-report-index.component';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {MessageManagementIndexComponent} from './message-management/message-management-index/message-management-index.component';
import {SystemParameterComponent} from './system-parameter/system-parameter/system-parameter.component';
import { BusinessIndexComponent } from './business/business-index/business-index.component';
import { OrganizeIndexComponent } from './organize/organize-index/organize-index.component';
const routes: Routes = [
  {path: 'account', component: AccountIndexComponent},
  {path: 'account-group', component: AccountGroupIndexComponent},
  {path: 'menu', component: MenuIndexComponent},
  {path: 'role', component: RightIndexComponent},
  {path: 'total-report', component: TotalReportIndexComponent},
  {path: 'message-management', component: MessageManagementIndexComponent},
  {path: 'system-parameter', component: SystemParameterComponent},
  {path: 'business', component: BusinessIndexComponent},
  {path: 'organize', component: OrganizeIndexComponent},

  {path: '**', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManageRoutingModule {}
