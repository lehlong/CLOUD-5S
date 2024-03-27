import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {BehaviorSubject} from 'rxjs';
import { CommonService } from '../Common/common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  URL_SIGNALR = `${environment.baseApiUrl.replace('/api/', '')}/tracking`;
  hubLocationMessage = 'Location';
  hubTrackingMessage = 'Tracking';
  hubLocation: BehaviorSubject<string>;
  hubTracking: BehaviorSubject<string>;

  hubUrl: string = '';
  connection: any = null;
  constructor(
    private _commonService: CommonService
  ) {
    this.hubUrl = this.URL_SIGNALR;
    this.hubLocation = new BehaviorSubject<string>('');
    this.hubTracking = new BehaviorSubject<string>('');
  }

  getOrderTracking(params?: any) {
    return this._commonService.getRequest(`Order/Tracking`, params);
  }

  getTrackingLocation(params?: any) {
    return this._commonService.getRequest(`Tracking/Location`, params);
  }

  getTrackingStationLocation() {
    return this._commonService.getRequest(`Tracking/StationLocation`);
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      if(this.connection) {
        await this.connection.stop();
      }
      const token = localStorage.getItem('jwt') || 'null';
      const options: signalR.IHttpConnectionOptions = {
        accessTokenFactory: () => {
          return token;
        },
        transport: signalR.HttpTransportType.ServerSentEvents,
      };

      this.connection = new signalR.HubConnectionBuilder().withUrl(this.hubUrl, options).build();
      
      await this.connection.start();
      this.setSignalrClientMethods();
    } catch (error) {
      console.log('error: ', error);
      if(error == 'Error: Unauthorized') {
      } else {
        console.log(`SignalR connection error: ${error}`);
      }
    }
  }

  private setSignalrClientMethods(): void {
    this.connection.on(this.hubLocationMessage, (message: string) => {
      this.hubLocation.next(message);
    });
    this.connection.on(this.hubTrackingMessage, (message: string) => {
      this.hubTracking.next(message);
    });
  }
}
