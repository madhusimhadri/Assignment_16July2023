import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  accessObj = {
    access: false,
    username: ''
  }
  userData = new BehaviorSubject<any>(this.accessObj);

  constructor() {
    let ud =  sessionStorage.getItem("userData");
    if(ud){
      ud=JSON.parse(sessionStorage.getItem("userData")!);
      this.userData.next(ud);
    }
    else{
      this.userData.next(this.accessObj)
    }
   }


}
