import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {LayoutComponent} from 'src/app/@module/layout/layout.component';
import {AuthGuard} from 'src/app/guards/auth-guard.service';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {ViewDocxComponent} from './@module/view/view-docx/view-docx.component';
import {OtpIndexComponent} from './authentication/otp/otp-index/otp-index.component';
import {PasswordRetrievalIndexComponent} from './authentication/password-retrieval/password-retrieval-index/password-retrieval-index.component';
const routes: Routes = [
  {path: 'view-file/:id', component: ViewDocxComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'password-retrieval', component: PasswordRetrievalIndexComponent},
  {path: 'otp-code', component: OtpIndexComponent},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/@module/layout/layout.module').then((m) => m.LayoutModule),
      },
    ],
  },
  {path: '**', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
