import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {BehaviorSubject} from 'rxjs';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  URL_SIGNALR = `${environment.baseApiUrl.replace('/api/', '')}/refresh`;
  hubReceiveMessage = 'ReceiveMessageRefresh';
  hubReceive: BehaviorSubject<string>;
  hubUrl: string = '';
  connection: any = null;
  constructor(
    private _commonService: CommonService
  ) {
    this.hubUrl = this.URL_SIGNALR;
    this.hubReceive = new BehaviorSubject<string>('');
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
    this.connection.on(this.hubReceiveMessage, (message: string) => {
      this.hubReceive.next(message);
    });
  }
}
