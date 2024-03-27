import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgCacheRouteReuseModule} from 'ng-cache-route-reuse';
import {JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './authentication/login/login.component';
import {HeaderInterceptor} from './services/Common/header-interceptor.service';
import {AuthGuard} from 'src/app/guards/auth-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HandleResponse} from 'src/app/utils/utils';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {AuthenticationModule} from 'src/app/authentication/authentication.module';
import {BrowserModule} from '@angular/platform-browser';
import {NzImageService} from 'ng-zorro-antd/image';
import {ViewDocxComponent} from './@module/view/view-docx/view-docx.component';
import {PasswordRetrievalIndexComponent} from './authentication/password-retrieval/password-retrieval-index/password-retrieval-index.component';
import {OtpIndexComponent} from './authentication/otp/otp-index/otp-index.component';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, LoginComponent, ViewDocxComponent, PasswordRetrievalIndexComponent, OtpIndexComponent],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:4008/'],
        disallowedRoutes: [],
      },
    }),
    NgCacheRouteReuseModule,

    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('language') || 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    HandleResponse,
    AuthGuard,
    NzImageService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {provide: NZ_I18N, useValue: en_US},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://localhost:4008/api/LanguageTranslate/GetLang/', '.json');
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
