import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginFailed') infoPopup!: TemplateRef<any>;
  @ViewChild('loginSuccess') infoPopup2!: TemplateRef<any>;

  userName: any = '';
  password: any = '';
  userDetails = [];
  userAccessAllowed: boolean = false;

  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.loginService.getUserData().subscribe((res) => {
      console.log(res);

      this.userDetails = res;
    });
  }

  onSubmit() {
    let flag = !!this.userDetails.filter((user) => {
      return (
        this.userName == user['username'] && this.password == user['password']
      );
    }).length;
    if (!flag) {
      this.userAccessAllowed = false;
      this.dialog.open(this.infoPopup);
    } else {
      this.userAccessAllowed = true;
      this.dialog.open(this.infoPopup2);
      let accessObj = {
        access: true,
        username: this.userName,
      }
      sessionStorage.setItem("userData", JSON.stringify(accessObj))
      this.sharedService.userData.next(accessObj);
    }
  }

  takeHome() {
    this.router.navigate(['/home']);
  }
}
