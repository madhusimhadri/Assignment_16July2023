import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('logoutUser') logOutPopup!: TemplateRef<any>;
  privateAccess: boolean = false;
  private destroy$ = new Subject();
  userName:any = "";

  constructor(private router:Router, private sharedService: SharedService, private dialog: MatDialog ){}

  loginUser(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.sharedService.userData.pipe(takeUntil(this.destroy$)).subscribe
    (obj=>{
      if(obj){
        this.privateAccess = obj['access'];
        this.userName= obj['username'];
      }
    })
  }

  logOut(){
    sessionStorage.removeItem('userData');
    let accessObj = {
      access: false,
      username: ''
    }

    this.sharedService.userData.next(accessObj);
    this.router.navigate(['/home']);
  }

  openlogOut(){;
    this.dialog.open(this.logOutPopup)
  }

  ngOnDestroy(){
    this.destroy$.next(0);
    this.destroy$.complete();
  }

}
