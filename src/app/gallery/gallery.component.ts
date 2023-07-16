import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../common/shared.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  userNames = [];

  privateAccess: boolean = false;

  private destroy$ = new Subject();
  userName: any = '';
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.sharedService.userData
      .pipe(takeUntil(this.destroy$))
      .subscribe((obj) => {
        if (obj) {
          this.privateAccess = obj['access'];
          this.userName = obj['username'];
          if (!this.privateAccess) {
            this.router.navigate(['/404']);
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}
