import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  constructor(
    private _router: ActivatedRoute,
    private _navRouter: Router,
  ) {}
  ngOnInit(): void {
    this._router.queryParams.subscribe((res:any) => {
      switch (res.result) {
        case "401-Unauthorized":
          this.createResult = "Không được phép truy cập";
          this.createResultButton = "Trở về trang chủ";
          this.createResultImage = "/assets/img/401.png";
          break;
        case "403-Forbidden":
          this.createResult = "Không có quyền truy cập";
          this.createResultButton = "Trở về trang chủ";
          this.createResultImage = "/assets/img/403.png";
          break;
        case "404-Not-found":
          this.createResult = "Không tìm thấy trang";
          this.createResultButton = "Trở về trang chủ";
          this.createResultImage = "/assets/img/404.png";
          break;
        case "500-Internal-server-error":
          this.createResult = "Hệ thống đang xảy ra sự cố";
          this.createResultButton = "Trở về trang chủ";
          this.createResultImage = "/assets/img/500.png";
          break;
        default:
          this.createResult = "Không tìm thấy trang";
          this.createResultButton = "Trở về trang chủ";
          this.createResultImage = "/assets/img/404.png";
          break;
      }
    });
  }
  createResult: String = '';
  createResultButton: String = '';
  createResultImage: String = '';
  changePageAction() {
    this._navRouter.navigate(["/report/dashboard"]);
  }
}
