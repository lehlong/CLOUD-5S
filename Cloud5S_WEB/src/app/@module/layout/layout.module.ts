import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LayoutRoutes} from './layout.routing';
import {LayoutComponent} from './layout.component';
import {FooterModule} from './footer/footer.module';
import {NavbarModule} from './navbar/navbar.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {SharedModule} from '../share.modules';
@NgModule({
  imports: [
    RouterModule.forChild(LayoutRoutes),
    FooterModule,
    NavbarModule,
    SidebarModule,
    SharedModule
  ],
  declarations: [LayoutComponent],
})
export class LayoutModule {}