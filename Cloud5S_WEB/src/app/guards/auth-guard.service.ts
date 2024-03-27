import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}
  canActivate() {
    //lấy Token jwt hiện có trong bộ nhớ Session
    const token = localStorage.getItem('jwt');

    //Kiểm tra xem Token đã hết hạn hay chưa và nếu Token hết hạn thì chuyển hướng đến trang đăng nhập và trả về false
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['Login']);
    return false;
  }
}
