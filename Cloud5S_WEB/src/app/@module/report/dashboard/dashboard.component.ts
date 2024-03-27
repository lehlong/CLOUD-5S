import {Component} from '@angular/core';
import {AccountService} from 'src/app/services/AD/account.service';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _as: AccountService, private globalService: GlobalService) {}
  ngOnInit(): void {
    this.updateRights();
  }

  updateRights() {
    const userInfo = this.globalService.getUserInfo();
    this._as
      .getRightOfUser({
        username: userInfo?.userName,
      })
      .subscribe(({data}: any) => {
        this.globalService.setRightData(JSON.stringify(data));
      });
  }
}
