import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
declare function MessageErrorSystem(response: any): any;
declare function ShowLoading(): any;
declare function HideLoading(): any;

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    ShowLoading();
    let params = request.params;
    for (const key of request.params.keys()) {
      if (
        params.get(key) === undefined ||
        params.get(key) === null ||
        params.get(key) === 'undefined' ||
        params.get(key) === 'null'
      ) {
        params = params.set(key, '');
      }
    }
    const token = localStorage.getItem('jwt');
    var headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Language: `${localStorage.getItem('lang')}`,
    });
    request = request.clone({ params, headers });

    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          HideLoading();
          if (error.error instanceof ErrorEvent) {
            console.log(error);
            MessageErrorSystem(error);
          } else {
            MessageErrorSystem(error);
            console.log(error);
          }
          return throwError('Error');
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            HideLoading();
          }
          return evt;
        })
      );
  }
}
