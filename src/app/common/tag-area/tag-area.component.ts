import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-area',
  templateUrl: './tag-area.component.html',
  styleUrls: ['./tag-area.component.css']
})
export class TagAreaComponent {

  @Input() options : any[];
  // options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  filteredOptions = [];
  users = []
  inpVal = "";

  constructor(){}
  ngOnInit(): void {

  }

  showAutocompleteOptions(data:any) {
    let value = data.target.value;

    if (value.includes('@')) {
      let val = value.split('@')[1];
      if(val){

        this.filteredOptions = this.options.filter(item=> item.includes(val));
      }else{
        this.filteredOptions = this.options
      }
    } else {
      this.filteredOptions = [];
    }
  }

  onOptionSelected(data){
    let val = data.option.value
    this.inpVal = "";
    console.log("data: ", data.option.value);
    this.users.push(val);
  }
}
