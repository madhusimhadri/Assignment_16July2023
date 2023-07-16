import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../common/shared.service';
import { HomeService } from './home.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userNames = [];

  privateAccess: boolean = false;
  private destroy$ = new Subject();
  userName: any = '';
  constructor(
    private homeService: HomeService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.parseOptions();
    this.sharedService.userData.subscribe((obj) => {
      if (Object.keys(obj)?.length) {
        this.privateAccess = obj['access'];
        this.userName = obj['username'];
      }
    });
  }

  parseOptions() {
    let opAr = [];
    this.homeService.getUserData().subscribe((res) => {
      res.forEach((item) => {
        opAr.push(item['username']);
      });
      this.userNames = opAr;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}
