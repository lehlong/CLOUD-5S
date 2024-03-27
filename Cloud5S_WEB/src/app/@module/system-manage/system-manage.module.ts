import {NgModule} from '@angular/core';
import {SystemManageRoutingModule} from './system-manage-routing.module';
import {SharedModule} from '../share.modules';
import {AccountGroupIndexComponent} from './account-group/account-group-index/account-group-index.component';
import {AccountGroupEditComponent} from './account-group/account-group-edit/account-group-edit.component';
import {AccountGroupCreateComponent} from './account-group/account-group-create/account-group-create.component';
import {AccountIndexComponent} from './account/account-index/account-index.component';
import {AccountEditComponent} from './account/account-edit/account-edit.component';
import {AccountCreateComponent} from './account/account-create/account-create.component';
import {MenuIndexComponent} from './menu/menu-index/menu-index.component';
import {MenuEditComponent} from './menu/menu-edit/menu-edit.component';
import {MenuCreateComponent} from './menu/menu-create/menu-create.component';
import {RightIndexComponent} from './role/role-index/right-index.component';
import {RightEditComponent} from './role/right-edit/right-edit.component';
import {RightCreateComponent} from './role/right-create/right-create.component';
import {TotalReportIndexComponent} from './total-report/total-report-index/total-report-index.component';
import { MessageManagementIndexComponent } from './message-management/message-management-index/message-management-index.component';
import { MessageManagementCreateComponent } from './message-management/message-management-create/message-management-create.component';
import { SystemParameterComponent } from './system-parameter/system-parameter/system-parameter.component';
import { BusinessCreateComponent } from './business/business-create/business-create.component';
import { BusinessIndexComponent } from './business/business-index/business-index.component';
import { BusinessEditComponent } from './business/business-edit/business-edit.component';
import { OrganizeIndexComponent } from './organize/organize-index/organize-index.component';
import { OrganizeEditComponent } from './organize/organize-edit/organize-edit.component';
import { OrganizeCreateComponent } from './organize/organize-create/organize-create.component';

@NgModule({
  declarations: [
    AccountGroupIndexComponent,
    AccountGroupEditComponent,
    AccountGroupCreateComponent,
    AccountIndexComponent,
    AccountEditComponent,
    AccountCreateComponent,
    MenuIndexComponent,
    MenuEditComponent,
    MenuCreateComponent,
    RightIndexComponent,
    RightEditComponent,
    RightCreateComponent,
    TotalReportIndexComponent,
    MessageManagementIndexComponent,
    MessageManagementCreateComponent,
    SystemParameterComponent,
    BusinessCreateComponent,
    BusinessIndexComponent,
    BusinessEditComponent,
    OrganizeIndexComponent,
    OrganizeEditComponent,
    OrganizeCreateComponent,
  ],
  imports: [SystemManageRoutingModule, SharedModule],
})
export class SystemManageModule {}
