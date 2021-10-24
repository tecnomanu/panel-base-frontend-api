import {Component, Input, Output, EventEmitter} from '@angular/core';

import 'style-loader!./checkmark-success.scss';

@Component({
  selector: 'checkmark-success',
  template: `
            <div class="container" [class.active]="show">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
            </div>
            `
})
export class CheckmarkComponent {
  @Input() type= "success";
  @Input() show= false;
  @Output() onComplete = new EventEmitter<any>();

  constructor () {
    
  }
  
  ngOnChanges(){
    if(this.show){
      setTimeout(()=>{
        this.onComplete.emit();
      },2500);
    }
  }
}