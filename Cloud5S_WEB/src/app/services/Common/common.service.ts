import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from 'src/environments/environment';
import {TranferObject} from 'src/app/models/Common/tranfer-object.model';
import {share} from 'rxjs';
import {METHOD} from 'src/app/utils/constant/index';
import {HandleResponse} from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private handleResponse: HandleResponse) {}

  getFileRequest(url: string, params?: any): Observable<Blob> {
    const tranferObject = this.http.get(this.apiUrl + url, {params: params, responseType: 'blob'}).pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.GET);
      },
    });
    return tranferObject;
  }

  getRequest(url: string, params?: any): Observable<TranferObject> {
    var tranferObject = this.http.get<TranferObject>(this.apiUrl + url, {params: params}).pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.GET);
      },
    });
    return tranferObject;
  }

  postRequest(url: string, request: any, showMessage: boolean = true): Observable<TranferObject> {
    console.log('request: ', request);
    console.log(typeof request);
    var tranferObject = this.http.post<TranferObject>(this.apiUrl + url, request).pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        if (showMessage) {
          this.handleResponse.showMessage(response, METHOD.POST);
        }
      },
    });
    return tranferObject;
  }

  uploadRequest(url: string, file: File, params?: any): Observable<TranferObject> {
    const formData = new FormData();
    formData.append('file', file);
    const urlWithParams = this.buildUrlWithParams(url, params);
    const tranferObject = this.http.post<TranferObject>(urlWithParams, formData).pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.UPLOAD);
      },
    });

    return tranferObject;
  }
  uploadFilesRequest(url: string, files: FileList, params?: any): Observable<TranferObject> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const urlWithParams = this.buildUrlWithParams(url, params);
    const tranferObject = this.http.post<TranferObject>(urlWithParams, formData).pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.UPLOAD);
      },
    });

    return tranferObject;
  }

  private buildUrlWithParams(url: string, params: any): string {
    let fullUrl = this.apiUrl + url;

    if (params) {
      const queryParams = new URLSearchParams();
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams.append(key, params[key]);
        }
      }

      // Thêm các tham số vào URL
      if (queryParams.toString()) {
        fullUrl += '?' + queryParams.toString();
      }
    }

    return fullUrl;
  }

  putRequest(url: string, request: any): Observable<TranferObject> {
    var tranferObject = this.http.put<TranferObject>(this.apiUrl + url, request).pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.PUT);
      },
    });
    return tranferObject;
  }

  deleteRequest(url: string, request: any = {}, params?: any): Observable<TranferObject> {
    var tranferObject = this.http
      .delete<TranferObject>(this.apiUrl + url, {body: request, params: params})
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.DELETE);
      },
    });
    return tranferObject;
  }
}
