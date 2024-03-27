import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {BehaviorSubject} from 'rxjs';
import { CommonService } from 'src/app/services/Common/common.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RefreshOrderBatchServiceService {
  URL_SIGNALR = `${environment.baseApiUrl.replace('/api/', '')}/user`;
  hubReceiveMessage = 'ORDER_BATCH';
  hubReceive: BehaviorSubject<string>;

  hubSecondTimeMessage = 'ReceiveMessageRefresh';
  hubSecondTimeReceive: BehaviorSubject<string>;

  hubUrl: string = '';
  connection: any = null;
  constructor(
    private _commonService: CommonService
  ) {
    this.hubUrl = this.URL_SIGNALR;
    this.hubReceive = new BehaviorSubject<string>('');
    this.hubSecondTimeReceive = new BehaviorSubject<string>('');
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
    this.connection.on(this.hubSecondTimeMessage, (message: string) => {
      this.hubSecondTimeReceive.next(message);
    });
  }
}
