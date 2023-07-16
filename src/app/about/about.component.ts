import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  privateAccess: boolean = false;

  userName:any = "";
  constructor(private sharedService: SharedService){}

  ngOnInit(): void {
    this.sharedService.userData.subscribe(obj=>{
      if(Object.keys(obj)?.length){
        this.privateAccess = obj['access'];
        this.userName= obj['username'];
      }
    })
  }
}
