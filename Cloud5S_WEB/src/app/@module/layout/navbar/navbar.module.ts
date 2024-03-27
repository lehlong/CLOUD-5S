import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NzBreadCrumbModule,
    TranslateModule.forChild(),
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
